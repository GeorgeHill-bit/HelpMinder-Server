const router = require('express').Router();
const sequelize = require('../db.js');
const User = sequelize.import('../models/hmuser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/', function(req, res){

	User.create({
		username : req.body.user.username,
		passwordhash : bcrypt.hashSync(req.body.user.password, 10)
	}).then(
		function createSuccess(user){
			const token = jwt.sign({id:user.id}, 'secret', {expiresIn: 60*60*24})
			res.json({
				user: user,
				message: 'create',
				sessionToken: token
			})
		},
		function createError(err){
			res.json({
				statuscode: 500, 
				error: err.message
			})
		}
	)
})

module.exports = router;