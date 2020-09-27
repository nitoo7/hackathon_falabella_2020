var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
var { response } = require("../data/sampleData");
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

async function getSku(){
   const data = await client.search({
    index: 'test2',
    body: {
      "query": {
        "match": {
          "product_skuId": "881886505"
        }
      }
    }
  })
  return data.body.hits.hits[0]._source
}

async function getResults(){
  const data = await client.search({
   index: 'test2',
   body: {
    "query": {
      "bool": {
        "should": [
          {
            "multi_match" : {
              "query":      "Medio Pantalones de pijama\"",
              "type":       "cross_fields",
              "fields":     [
                "product.parentCategoryNames"
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

router.get('/getSimilarProducts', async function (req, res, next) {
  //TODO: validate request

  try {
    //TODO: fetch data from elastic and replace sample data
    const { selectedProduct = {}, results = [] } = response
    

    const skuData = await getSku();
    const resultSet = await getResults();
    console.log(resultSet)
    const sortedResults = sortProducts(selectedProduct, results);
    res.status(200).send({selectedProduct: skuData, results: resultSet});
    // res.status(200).send({data: sortProducts});
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
  }

});

module.exports = router;
