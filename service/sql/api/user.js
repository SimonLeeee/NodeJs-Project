"use strict";

var pool = require("../sql-root");
var check = require("../validate");

var user = {

	add : function(account, password, repeat, callbak){
		pool.getConnection(function(err, con){
			if(!err){
				console.log("root connect suceessful.");
				if(password === repeat){
					if(check.isAccount(account)){
						if(check.isPassword(password)){
							con.query("INSERT INTO user(account,password) VALUES ('"+account+"','"+password+"');",function(err){
								if(!err){
									callbak("插入用户表成功");
									con.release();
									return;
								}else{
									if(errno===1062){
										callbak("该账号已被注册");
										con.release();
										return;
									}else{
										callbak(err);
										con.release();
										return;
									}
								}
							});
						}else{
							callbak("密码格式不正确");
							con.release();
							return;
						}
					}else{
						callbak("账号格式不正确");
						con.release();
						return;
					}
				}else{
					callbak("两次输入密码不同");
					con.release();
					return;
				}
			}else{
				console.log(err);
				console.log("root connect done.");
			}
			con.release();
		});
	}
}

module.exports = user;
