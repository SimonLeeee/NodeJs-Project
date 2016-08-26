var express = require('express');
var router = express.Router();
var user = require("../service/sql/api/user.js");
var artcle = require("../service/sql/api/artcle.js");

//主页
router.get('/artcle', function(req, res, next){
	artcle.getList(function(msg, sqlData, mysqlCon){
		if(msg === "success"){
			console.log(sqlData.length);
			res.render("index", { listData : sqlData });
		}else{
			res.render("./public-model/error", { message : msg, error:{status:"error"} });
		}
		//释放mysql连接
		mysqlCon.release();
	});
});

//文章内容
router.get("/artcle/:number", function(req, res, next){
	var artcleId = parseInt(req.params.number);
	if(artcleId){
		artcle.get(parseInt(req.params.number), function(msg, sqlData, mysqlCon){
			if(msg === "success" && sqlData[0]!==undefined){
				console.log(sqlData[0]);
				res.render("artcle", { listData : sqlData[0] });
			}else{
				res.render("./public-model/error", { message : "Not Found", error:{status:"error"} });
			}
			//释放mysql连接
			mysqlCon.release();
		});
	}else{
		res.redirect("/artcle");
	}
	
});

//文章发布页面
router.get("/upload", function(req, res, next){
	user.isLogin(req.cookies.q, function(msg, mysqlCon){
		if(msg === "success"){
			res.render('upload');
		}else{
			res.render("./public-model/error", { message : msg, error:{status:"error"} });
		}
	});
});

//登陆页面
router.get('/', function(req, res, next) {
	console.log(req.cookies.q);
  	res.render('login');
});

//注册页面
router.get("/register", function(req, res, next){
	res.render("register");
});

//登陆请求
router.post("/api/user/login", function(req, res, next){
	user.checkAccount(req.body.account, req.body.password, function(msg, mysqlCon, key){
		//返回客户端msg
		if(msg === "success"){
			res.cookie('q',key);
			res.redirect("/artcle");
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

//上传文章
router.post("/api/artcle/upload", function(req, res, next){
	console.log(req.body)
	if(!req.cookies.q){
		res.render("./public-model/error", { message : "请先登录", error:{status:"no login"} });
		return;
	}
	if(!req.body.title || !req.body.content){
		res.render("./public-model/error", { message : "文章信息不完整", error:{status:"info error"} });
		return;
	}
	if(req.cookies.q){
		artcle.add(req.body.title, req.body.content, req.cookies.q,function(msg, mysqlCon){
			if(msg === "success"){
				res.render("./public-model/error", { message : msg, error:{status:"upload success"} });
			}else{
				res.render("./public-model/error", { message : msg, error:{status:"error"} });
			}

			//释放mysql连接
			mysqlCon.release();
		});
	}
	
	
});

module.exports = router;
