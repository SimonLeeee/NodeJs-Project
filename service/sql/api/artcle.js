"use strict";

var pool = require("../mysql-root");
var check = require("../validate");

var artcle = {
	add : function(title, content, cookies, callback){
		pool.getConnection(function(err, con){
			if(!err){
				con.query("SELECT * FROM user where md5_key='"+cookies+"';", function(msg, sqlData){
					if(msg===null && sqlData.length){
						var userData = JSON.parse(JSON.stringify(sqlData));
						console.log(userData[0].account)
						con.query("INSERT INTO artcle(title, content, user_id, author) VALUES('"+title+"','"+content+"','"+userData[0].id+"','"+userData[0].account+"');", function(err){
							if(!err){
								callback("success", con);
								return;
							}else{
								callback(err, con);
							}
						});
					}else{
						callback("请先登录", con);
					}
				});
				
			}else{
				console.log(err);
				console.log("root connect done.");
				con.release();
			}
		})
	},

	getList : function(callback){
		pool.getConnection(function(err, con){
			if(!err){
				con.query("SELECT * FROM ARTCLE", function(err, sqlData){
					if(!err){
						var listData = JSON.parse(JSON.stringify(sqlData));
						for(var i in listData){
							listData[i].created_time = listData[i].created_time.replace(/T.*/g,"");
						}
						callback("success", listData, con);
					}else{
						callback(err, con);
					}
				});
			}else{
				console.log(err);
				console.log("root connect done.");
				con.release();
			}
		});
	},

	get : function(id, callback){
		pool.getConnection(function(err, con){
			if(!err){
				con.query("SELECT * FROM ARTCLE where id='"+id+"'", function(err, sqlData){
					if(!err){
						var listData = JSON.parse(JSON.stringify(sqlData));
						for(var i in listData){
							listData[i].created_time = listData[i].created_time.replace(/T.*/g,"");
						}
						callback("success", listData, con);
					}else{
						callback(err, con);
					}
				});
			}else{
				console.log(err);
				console.log("root connect done.");
				con.release();
			}
		});
	}
	
}

module.exports = artcle;