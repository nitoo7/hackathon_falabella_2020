var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
var { response } = require("../data/sampleData");
const { Client } = require('@elastic/elasticsearch')

const client = new Client({ node: 'http://localhost:9200' })

async function getSku(){
  client.search({
    index: 'test2',
    body: {
      "query": {
        "match": {
          "product_skuId": "881886505"
        }
      }
    }
  }, (err, result) => {
    if (err) console.log(err)
    return result;
  })
}

router.get('/getSimilarProducts', async function (req, res, next) {
  //TODO: validate request

  try {
    //TODO: fetch data from elastic and replace sample data
    const { selectedProduct = {}, results = [] } = response
    // const sortedResults = sortProducts(selectedProduct, results)

    const skuData = await getSku();
    res.send(skuData);
    
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
  }

});

module.exports = router;
