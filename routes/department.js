var router = require('express').Router(); 
var models = require('../db'); 
var Users = models.Users; 
var Departments = models.Departments; 
var Promise = require('bluebird');
module.exports = router; 

// Departments 
router.get('/:id', function(req, res, next){
	Promise.all([
      Departments.getDefault(),
      Departments.findById(req.params.id, { include: [ Users ] }),
      Departments.findAll()])
	.spread(function(defaultDepartment, department, departments){
		res.render('departments', {
			title: 'Acme Department: ' + department.name,
			department: department,
      departments: departments
		}); 
	})
  .catch(next);
});

// New Department 
router.post('/', function(req, res, next){
	Departments.create({
		name: req.body.dept
	})
	//this is where the hook gets called, so you need to return a promise to feed to the .then
	.then(function(department){
		res.redirect('/departments/' + department.id); 
	})
	.catch(next); 
}); 

// New Employee 
router.post('/:id/employees', function(req, res, next){
	Users.create({
		name: req.body.user, 
		departmentId: req.params.id
	})
	.then(function(employee){
		res.redirect('/departments/' + employee.departmentId); 
	})
	.catch(next); 
}); 

router.delete('/:departmentId/employees/:id', function(req, res, next){
	Users.destroy({
    where: { id: req.params.id }
	})
	.then(function(){
		res.redirect('/departments/' + req.params.departmentId); 
	})
	.catch(next); 
}); 
