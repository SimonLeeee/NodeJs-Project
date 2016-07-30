var mysql = require("mysql");

var client = mysql.createConnection({
	user : "root",
	password : ""
});

client.connect();

client.query("CREATE DATABASE nodejs_db");

createTable(client);
// client.end();

function createTable(client){
	var sql = 
		"CREATE TABLE node_table(" +
			"id INT NOT NULL AUTO_INCREMENT COMMENT," +
			"account VARCHAR(40) NOT NULL COMMENT," +
			"PRIMARY KEY ( 'id' )" +
			");";

	client.query("USE nodejs_db",function(msg){
		if(!msg){
			client.query(sql, function(msg){
				if(msg === null){
					console.log("建表成功");
				}else{
					console.log("(ERROR) : 建表失败", msg);
				}
			});
		}else{
			console.log(msg);
		}
	});
	
}


