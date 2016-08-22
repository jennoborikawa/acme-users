var router = require('express').Router(); 
var models = require('../db'); 
var Users = models.Users; 
var Departments = models.Departments; 
module.exports = router; 

// Departments 
router.get('/:departmentId', function(req, res, next){
	Departments.findOne({
		where: {
			id: req.params.departmentId
		}
	})
	.then(function(department){
		console.log(Departments.getDepartments()); 
		res.render('departments', {
			title: 'Acme Department: ' + department.name,
			departments: Departments.getDepartments
		}); 
	})
})

// New Department 
router.post('/', function(req, res, next){
	Departments.create({
		name: req.body.dept
	})
	.then(function(newDeptRow){
		
	})
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
		res.redirect('/departments/' + newEmployee.departmentId); 
	})
	.catch(next); 
}); 

router.delete('/departments/:departmentId/employees/:employeeId', function(req, res, next){

})

router.put('/department/:departmentId', function(){

})




