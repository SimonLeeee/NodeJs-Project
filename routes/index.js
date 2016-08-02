var express = require('express');
var router = express.Router();
var user = require("../service/sql/api/user.js");

//登陆页面
router.get('/', function(req, res, next) {
  res.render('login');
});

//注册页面
router.get("/register", function(req, res, next){
	res.render("register");
});

//登陆请求
router.post("/api/user/login", function(req, res, next){
	user.checkAccount(req.body.account, req.body.password, function(msg, mysqlCon){
		//返回客户端msg
		if(msg === "success"){
			res.render("index");
		}else{
			res.render("./public-model/error", { message : msg, error:{status:"error"} });
		}
		
		//释放mysql连接
		mysqlCon.release();
	})
});

//注册请求
router.post("/api/user/register", function(req, res, next){
	user.add(req.body.account, req.body.password, req.body.repeat, function(msg, mysqlCon){
		//返回客户端msg
		if(msg === "success"){
			res.send(msg);
		}else{
			res.render("./public-model/error", { message : msg, error:{status:"error"} });
		}
		
		//释放mysql连接
		mysqlCon.release();
	});
});

// router.get("/routest", function(req, res ,next){
// 	res.render("index", { title: "This is a Router" });
// });

module.exports = router;
