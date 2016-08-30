//model 

var Sequelize = require('sequelize'); 
//don't hardcode pass as env variables
var db = new Sequelize('postgres://localhost:5432/acme_users_db', {
	logging: false
}); 

// db.authenticate().then(function(result){
//     console.log('here');
// });
//Moduels are singular

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
      .then(function(department){
        if(department)
          return department;
        return Departments.create({
          name: 'Accounting',
          isDefault: true
        });
      });
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
Departments.hasMany(Users);

module.exports = {
	Users: Users, 
	Departments: Departments
}; 



// http://stackoverflow.com/questions/37003705/sequelize-defining-a-foreignkey-association-to-another-model-using-targetkey
