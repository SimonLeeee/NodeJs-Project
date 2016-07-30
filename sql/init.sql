CREATE DATABASE FORUM;

USE FORUM;

CREATE TABLE user(
	id INT NOT NULL AUTO_INCREMENT,
	account CHAR(40) NOT NULL,
	password CHAR(40) NOT NULL,
	PRIMARY KEY ( id )
);

CREATE TABLE artcle(
	id INT NULL AUTO_INCREMENT,
	user_id INT NOT NULL,
	title CHAR(40) NOT NULL,
	content CHAR(40) NOT NULL,
	PRIMARY KEY (id)
);

alter TABLE artcle add constraint FK_ID foreign key(user_id) REFERENCES user(id);
