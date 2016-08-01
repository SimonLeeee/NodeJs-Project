"use strict";

var validate = {

	isAccount : function(str){
		return /^[a-zA-Z][a-zA-Z0-9]{5,11}$/g.test(str);
	},

	isPassword : function(str){
		return /^[a-zA-Z0-9]{5,11}$/g.test(str);
	}

}

module.exports = validate;