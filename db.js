var Sequelize = require('sequelize');
console.log(typeof process.env.DATABASE_URL)

const seq = new Sequelize('helpminder', 'postgres', 'Sidney@31', {
    host: 'localhost', 
    dialect: 'postgres' 
});

seq.authenticate().then(
	function(){
		console.log("You're connected to the HelpMinder database")
	},
	function(err){
		console.log(err)
	}
);

var User = seq.import('./models/hmuser');
var Log = seq.import('./models/hmlog')

seq.sync()
module.exports = seq