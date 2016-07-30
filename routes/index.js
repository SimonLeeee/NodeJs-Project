var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Simon' });
});

router.get("/routest", function(req, res ,next){
	res.render("index", { title: "This is a Router" });
});


module.exports = router;
