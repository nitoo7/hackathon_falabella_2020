var express = require('express');
var router = express.Router();
var fetch = require("node-fetch");
const fs = require('fs');
const { writeToPath } = require('@fast-csv/format');

/* GET home page. */
router.get('/', async function (req, res, next) {

  var postData = {
    "action": "getTopFailures",
    "country": "cl",
    "page": 0,
    "limit": 100
  }

  var url = "https://us-east1-falabella-catalyst-bu-prod.cloudfunctions.net/a2ce";
  let arr = []
  let count = 0;

  const repeatedFetch = async () => {
    postData.page = postData.page + 1;
    const fetchFn = async () => {
      let response = {}

      fetch(url, {
        method: 'post',
        body: JSON.stringify(postData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then(res => res.json())
        .then(async json => {
          if (json.response && json.response.data) {
            if (json.response.data.length > 0) {
              response = json.response.data;
              arr = [...arr, ...response]
              response.forEach(element => {
                count = count + element.count
              });
              console.log("fetch successful!, page = ", postData.page)
              await repeatedFetch();
            }
            else {
              const path = `data-2.csv`;
              const data = arr;
              const options = { headers: true, quoteColumns: true };
              writeToPath(path, data, options)
                .on('error', err => {
                  console.error(err);
                  res.send("error writing to file!")
                })
                .on('finish', () => {
                  console.log('Done writing.');
                  res.send("Done")
                });
            }
          }
        })
    }
    await fetchFn();
  }
  await repeatedFetch();
});

module.exports = router;
