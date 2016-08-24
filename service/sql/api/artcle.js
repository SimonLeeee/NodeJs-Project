"use strict";

var pool = require("../mysql-root");
var check = require("../validate");

var artcle = {
	add : function(title, content, cookies, callback){
		pool.getConnection(function(err, con){
			if(!err){
				con.query("SELECT * FROM user where md5_key='"+cookies+"';", function(msg, sqlData){
					if(msg===null && sqlData.length){
						var userId = JSON.parse(JSON.stringify(sqlData));
						con.query("INSERT INTO artcle(title, content, user_id) VALUES('"+title+"','"+content+"','"+userId[0].id+"');", function(err){
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
	}
}

module.exports = artcle;