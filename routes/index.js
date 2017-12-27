var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(path.join(__dirname+'/index.html'));
  res.render(path.join(__dirname+'/index.html'), { title: 'Ng2MapLinkr' });
});

module.exports = router;
