var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/hmuser');

module.exports = function(req, res, next){
	var sessionToken = req.headers.authorization

	if(!req.body.user && sessionToken){
		jwt.verify(sessionToken, 'secret', function(err, decoded){
			if(decoded){
				User.findOne({where: {id:decoded.id}}).then(
					function(user){
						req.user = user; 
						next()
					},
					function(){
						res.status(401).send({error: "User is not authorized."})
					}
				);
			} else {
				res.status(401).send({error: "User is not authorized."})
			}
		})
	} else {
		next();
	}
}

