var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
const { Client } = require('@elastic/elasticsearch')
const { attributes } = require("../utils/attributes");
const { requestSchema } = require("../schema/request");

const client = new Client({ node: 'http://localhost:9200' })

async function getSku(id) {
  const data = await client.search({
    index: 'heckethon_similar_product',
    body: {
      "query": {
        "match": {
          "product_skuId": id
        }
      }
    }
  })
  return data.body.hits.hits[0]._source
}

async function getResults(attributeList, values, limit) {
  const data = await client.search({
    index: 'heckethon_similar_product',
    body: {
      "from": 0,
      "size": limit + 1,
      "query": {
        "bool": {
          "should": [
            {
              "multi_match": {
                "query": values,
                "type": "cross_fields",
                "fields": [
                  ...attributeList
                ],
                "minimum_should_match": "50%"
              }
            }
          ]
        }
      }
    }
  })
  return data.body.hits.hits
}

router.get('/getSimilarProducts/:id', async function (req, res, next) {

  const skuId = req.params.id;
  let limit = parseInt(req.query.size)
  limit = isNaN(limit) ? 10 : parseInt(limit)
  const { error } = requestSchema.validate({ skuId })
  if (error) {
    res.status(400).send({ error: error })
    return
  }

  try {
    const skuData = await getSku(skuId);
    let attributeList = [
      ...attributes
    ]
    const allKeys = Object.keys(skuData);
    for (const key of allKeys) {
      if (key.startsWith("attr_to_specification")
        ||
        key.startsWith("all_product_attributes")
      ) {
        attributeList = [
          ...attributeList,
          key
        ]
      }
    }
    let values = ""
    for (const key of attributeList) {
      values += skuData[key] ? ` ${skuData[key]}` : ""
    }
    const resultSet = await getResults(attributeList, values, limit);
    let sortedResults = sortProducts(skuData, resultSet.splice(1));
    sortedResults = sortedResults.map((el) => {
      return {
        'productId': el['productId'],
        'skuId': el['skuId'],
        'productName': el['name'],
        'image': el['variantPhotoURL'],
        'coefficient': el['coefficient']
      }
    })
    res.status(200).send({ results: sortedResults, attributes: attributeList });
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
    return
  }

});

module.exports = router;
