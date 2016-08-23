"use strict";

var pool = require("../mysql-root");
var check = require("../validate");

var artcle = {
	add : function(title, content, cookies, callback){
		pool.getConnection(function(err, con){
			if(!err){
				con.query("SELECT * FROM user where md5_key='"+cookies+"';", function(msg, sqlData){
					if(msg===null && sqlData.length){
						callback(sqlData, con);
					}else{
						callback("请先登录", con);
					}
				});
				// con.query("INSERT INTO artcle(title, content, user_id) VALUES('"+title+"','"+content+"','"+userId+"');", function(err){
				// 	if(!err){
				// 		callback("success", con);
				// 		return;
				// 	}else if(err.errno === 1452){
				// 		callback("请先登录", con);
				// 		return;
				// 	}
				// 	else{
				// 		callback(err, con);
				// 	}
				// });
			}else{
				console.log(err);
				console.log("root connect done.");
				con.release();
			}
		})
	}
}

module.exports = artcle;