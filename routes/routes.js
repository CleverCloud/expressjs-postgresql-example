var express = require('express');
var pg = require('../db');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  pg.getVal(res);
});

router.get('/prime', function(req, res) {
  function mySlowFunction(baseNumber) {
    console.time('mySlowFunction');
    let result = 0;	
    for (var i = Math.pow(baseNumber, 7); i >= 0; i--) {
      result += Math.atan(i) * Math.tan(i);
    };
    console.timeEnd('mySlowFunction');
  }

  var numero = mySlowFunction(12); // higher number => more iterations => slower
  res.send(JSON.stringify({status: "ok", value:numero}));
});

router.post('/values', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var val = req.body.value;

  if (val === undefined || val === "") {
    res.send(JSON.stringify({status: "error", value: "Value undefined"}));
    return
  }
  pg.sendVal(val, res);
});

router.delete('/values/:id', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  var uuid = req.params.id;

  if (uuid === undefined || uuid === "") {
    res.send(JSON.stringify({status: "error", value: "UUID undefined"}));
    return
  }
  pg.delVal(uuid);
  res.send(JSON.stringify({status: "ok", value: uuid}));
});

module.exports = router;
