var express = require('express');
var router = express.Router();
var user = require("../service/sql/api/user.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get("/register", function(req, res, next){
	res.render("register");
});

router.post("/api/user/register", function(req, res, next){
	user.add(req.body.account, req.body.password, req.body.repeat, function(msg){
		res.send(msg);
	});
});

// router.get("/routest", function(req, res ,next){
// 	res.render("index", { title: "This is a Router" });
// });

module.exports = router;
