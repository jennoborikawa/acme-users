var express = require('express'); 
var morgan = require('morgan'); 
var swig = require('swig'); 
swig.setDefaults = ({cache: false}); 
var path = require('path'); 
var departmentRouter = require('./routes/department'); 
var bodyParser = require('body-parser'); 

var models = require('./db'); 
var Users = models.Users; 
var Departments = models.Departments; 

var app = express(); 

app.set('view engine', 'html'); 
app.engine('html', swig.renderFile); 

module.exports = app; 


// ROUTING 
// app.use(morgan('dev')); 
app.use(express.static(path.join(__dirname, 'node_modules'))); 
app.use(bodyParser.urlencoded({extended: true})); 

app.use('/departments', departmentRouter); 

app.get('/', function(req, res, next){
	res.render('index', {
		title: 'Acme Home'
	}); 
});




// Users.sync({force: true})
// .then(function(){
// 	return Departments.sync({force: true})
// })
// .then(function(){
// 	app.listen(process.env.PORT, function(){
// 		console.log('listening on port: ' + process.env.PORT); 
// 	}); 
// }); 

