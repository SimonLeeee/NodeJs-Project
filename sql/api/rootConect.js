var mysql = require("mysql");

var client = mysql.createConnection(
	host : "127.0.0.1",
	user : "root",
	password : "",
	database : "forum"
);

client.connect(function(msg){
	if(!msg){
		console.log("root connect suceessful.");
	}else{
		console.log(msg);
		console.log("root connect done.");
	}
});