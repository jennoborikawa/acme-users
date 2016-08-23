var http = require('http'); 
var server = http.createServer(require('./app')); 

var models = require('./db'); 
var Users = models.Users; 
var Departments = models.Departments; 


Users.sync()
.then(function(){
	return Departments.sync()
})
.then(function(){
	server.listen(process.env.PORT, function(){
		console.log('listening on port: ' + process.env.PORT); 
	}); 
}); 


// server.listen(process.env.PORT, function(){
// 		console.log('listening on port: ' + process.env.PORT); 
// 	}); 