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


}, {
	classMethods: {
		getDefault: function(){
			return Departments.findOne({
				where: {
					isDefault: true
				}
			})
		}, 
		getDepartments: function(){
			this.findAll({})
			.then(function(departments){
				return departments.dataValues
			})

		}
	}, 
	instanceMethods: {
		setDefault: function(){
			
			if(this.){

			}
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
