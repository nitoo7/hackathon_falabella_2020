var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
const { Client } = require('@elastic/elasticsearch')
const { attributes } = require("../utils/attributes");
const {requestSchema} = require("../schema/request");

const client = new Client({ node: 'http://localhost:9200' })

async function getSku(id){
   const data = await client.search({
    index: 'test2',
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

async function getResults(attributeList, values) {
  const data = await client.search({
    index: 'test2',
    body: {
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
  //TODO: validate request

  const { count = 10 } = req.query;
  const skuId = req.params.id;
  const { error } = requestSchema.validate({ skuId, count })
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
      if (key.startsWith("product.attr.top") || key.startsWith("product.attr.all") ) {
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
    const resultSet = await getResults(attributeList, values);
    // const sortedResults = sortProducts(selectedProduct, results);
    res.status(200).send({selectedProduct: skuData, results: resultSet});
    // res.status(200).send({data: sortProducts});
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
    return
  }

});

module.exports = router;
