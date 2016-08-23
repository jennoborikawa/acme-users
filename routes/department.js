var router = require('express').Router(); 
var models = require('../db'); 
var Users = models.Users; 
var Departments = models.Departments; 
module.exports = router; 

// Departments 
router.get('/:departmentId', function(req, res, next){
	
	Promise.all([Departments.getDefault(), Departments.findCurrentDept(req.params.departmentId)])
	.then(function(resultsArr){
		res.render('departments', {
			title: 'Acme Department: ' + resultsArr[1].dataValues.name,
			department: resultsArr[0].dataValues
			// departments: Departments.getDepartments
		}); 
	})
	.catch(function(err){
		console.log('error')
	}); 

})

// New Department 
router.post('/', function(req, res, next){
	Departments.create({
		name: req.body.dept
	})
	//this is where the hook gets called, so you need to return a promise to feed to the .then
	.then(function(newDeptRow){
		res.redirect('/departments/' + newDeptRow.id); 
	})
	.catch(next); 
}); 

// New Employee 
router.post('/:departmentId/employees', function(req, res, next){
	User.create({
		name: req.body.user, 
		departmentId: req.params.departmentId*1 
	})
	.then(function(newEmployee){
		console.log(newEmployee)
		res.redirect('/departments/' + newEmployee.departmentId); 
	})
	.catch(next); 
}); 

// router.delete('/departments/:departmentId/employees/:employeeId', function(req, res, next){

// })

// router.put('/department/:departmentId', function(){

// })




