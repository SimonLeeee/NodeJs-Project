var pool = require("../sql-root");

var user = {

	add : function(account, password, callbak){
		pool.getConnection(function(err, con){
			if(!err){
				console.log("root connect suceessful.");
				con.query("INSERT INTO user(account,password) VALUES ('"+account+"','"+password+"');",function(err){
					!err ? console.log("插入用户表成功") : console.log(err);
				});
			}else{
				console.log(err);
				console.log("root connect done.");
			}
			con.release();
			callbak(!err ? "插入用户表成功" : err);
		});
	}
}

module.exports = user;
