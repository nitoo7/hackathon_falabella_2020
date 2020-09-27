var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
var { response } = require("../data/sampleData");

router.get('/', function (req, res, next) {
  //TODO: validate request

  try {
    //TODO: fetch data from elastic and replace sample data
    const { selectedProduct = {}, results = [] } = response
    const sortedResults = sortProducts(selectedProduct, results)
    res.status(200).send({ data: sortedResults })
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
  }

});

module.exports = router;
