var express = require('express');
var router = express.Router();
var { sortProducts } = require("../utils/utils");
var { response } = require("../data/sampleData");
var { requestSchema } = require("../schema/request");

router.get('/', function (req, res, next) {
  const { skuId, count = 10 } = req.query;

  const { error } = requestSchema.validate({ skuId, count })
  if (error) {
    res.status(400).send({ error: error })
    return
  }

  try {
    //TODO: fetch data from elastic and replace sample data
    const { selectedProduct = {}, results = [] } = response
    const sortedResults = sortProducts(selectedProduct, results)
    res.status(200).send({ data: sortedResults })
    return
  } catch (err) {
    res.status(500).send({ error: "Some error occured" })
    return
  }

});

module.exports = router;
