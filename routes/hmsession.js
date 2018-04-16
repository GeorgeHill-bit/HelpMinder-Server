var router = require('express').Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var sequelize = require('../db.js');
var User = sequelize.import('../models/hmuser.js');

router.post('/', function(req, res){
	console.log(req.body)
	User.findOne({where:{username: req.body.user.username}}).then(
		function(user){
			if(user){
				bcrypt.compare(req.body.user.password, user.passwordhash,function(err, matches){
					if(matches){
						var token = jwt.sign({id: user.id}, 'secret',  {expiresIn:60*60*24});
						res.json({
							user: user,
							message: "User logged in successfully.",
							sessionToken: token
						});
					}else {
						res.status(500).send({error:"User entered wrong password."})
					}
				});
			}else {
				res.status(500).send({error:"User doesn't exist."})
			}
		}, 
		function(err){
			res.json(err);
		}

		)
})

module.exports = router;