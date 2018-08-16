var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render("test1.html");
  // res.render('index', { title: 'Express' });
});
router.get('/three',function (req,res,next) {
    res.render("three.html");
});


module.exports = router;
