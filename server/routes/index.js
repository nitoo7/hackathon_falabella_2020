var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
const { Client } = require('@elastic/elasticsearch')
var { response } = require("../data/sampleData");

router.get('/getSimilarProducts', function (req, res, next) {
  //TODO: validate request

  try {
    //TODO: fetch data from elastic and replace sample data
    const { selectedProduct = {}, results = [] } = response
    // const sortedResults = sortProducts(selectedProduct, results)



    const client = new Client({ node: 'http://localhost:9200' })

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
        res.status(200).send({ data: result })
        if (err) console.log(err)
      })
    
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
  }

});

module.exports = router;
