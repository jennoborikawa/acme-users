//model 

var Sequelize = require('sequelize'); 
var db = new Sequelize('postgres://localhost:5432/acme_users_db', {
	logging: false
}); 

// db.authenticate().then(function(result){
//     console.log('here');
// });

var Departments = db.define('departments', {
	name: {
		type: Sequelize.STRING
	}, 
	isDefault: {
		type: Sequelize.BOOLEAN, 
		defaultValue: false
	}
}
, 
{
	hooks: {
		beforeValidate: function(dept){
			//findOne where the isDefault === true. If none, then set current to true
			// console.log(dept);
			return Departments.findOne({
				where: {
					isDefault: true
				}
			})
			.then(function(defaultDept){
				if(defaultDept === null){
					// console.log(dept);
					dept.isDefault = true; 
				}
			})

		}
	}, 

	classMethods: {
		getDefault: function(){
			return Departments.findOne({
				where: {
					isDefault: true
				}
			})
		}, 
		findCurrentDept: function(departmentId){
			return Departments.findOne({
				where: {
					id: departmentId
				}
			})
		}, 

		getDepartments: function(){
			this.findAll({})
			.then(function(departments){
				return departments.dataValues
			})

		}
	}

});


var Users = db.define('users', {
	name: {
		type: Sequelize.STRING, 
		allowNull: false
	}

});

Users.belongsTo(Departments); 

module.exports = {
	Users: Users, 
	Departments: Departments
}; 



// http://stackoverflow.com/questions/37003705/sequelize-defining-a-foreignkey-association-to-another-model-using-targetkey
