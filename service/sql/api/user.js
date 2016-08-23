"use strict";

var pool = require("../mysql-root");
var check = require("../validate");
var md5 = require("crypto");
var md5_Key = "!@#$%^&*()_++_)(*&^%$#@!Simon";

var user = {

	add : function(account, password, repeat, callbak){
		pool.getConnection(function(err, con){
			if(!err){
				console.log("root connect suceessful.");
				if(password === repeat){
					if(check.isAccount(account)){
						if(check.isPassword(password)){
							con.query("INSERT INTO user(account,password,md5_key) VALUES ('"+account+"','"+password+"','"+md5.createHmac("md5",md5_Key).update(account+password).digest('hex')+"');",function(err){
								if(!err){
									callbak("success", con);
									return;
								}else{
									if(err.errno===1062){
										callbak("该账号已被注册", con);
										return;
									}else{
										callbak(err, con);
										return;
									}
								}
							});
						}else{
							callbak("密码格式不正确", con);
							return;
						}
					}else{
						callbak("账号格式不正确", con);
						return;
					}
				}else{
					callbak("两次输入密码不同", con);
					return;
				}
			}else{
				console.log(err);
				console.log("root connect done.");
				con.release();
			}
		});
	},

	checkAccount : function(account, password, callbak){
		var key = md5.createHmac("md5",md5_Key).update(account+password).digest("hex")
		pool.getConnection(function(err, con){
			if(!err){
				console.log("root connect suceessful.");
			}else{
				callbak("sql connect done", con);
				return;
			}

			con.query("SELECT * FROM user where md5_key='"+key+"'", function(err, msg){
				if(!err){
					if(msg.length){
						callbak("success", con, key);
					}else{
						callbak("账号或密码错误", con)
					}
				}else{
					callbak(err, con);
				}
			});
		})
	}
}

module.exports = user;
