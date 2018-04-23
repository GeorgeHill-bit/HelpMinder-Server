var router = require('express').Router();
var sequelize = require('../db.js');
var User = sequelize.import('../models/hmuser.js');
var Log = sequelize.import('../models/hmlog.js');


router.post('/', function(req, res){
	var category = req.body.log.category
	var event = req.body.log.event;
	var due = req.body.log.due;
	var freq = req.body.log.freq;
	var owner = req.body.log.owner;
	var location = req.body.log.location;
	var purpose = req.body.log.purpose;
	var user = req.user;

	Log.create({
		category : category,
		event : event, 
		due : due, 
		freq : freq,
		owner : owner, 
		location: location,
		purpose : purpose,
		createdby: user.id,
		updatedby: user.id


	}).then(
		function createSuccess(log){
			res.json({
				log: log, 
				message: "You created a HelpMinder!!"});
		},
		function createError(err){
			// console.log(err.message);
			res.send(500, err.message)
		}
	);
})

router.get('/', function(req, res){
	var userid = req.user.id;
	// Log.findAll({ where: {updatedby: userid}}).then(
	Log.findAll().then(
			function findAllSuccess(data){
				res.json(data)
				console.log(data)
			},
			function findAllError(err){
				res.send(500, err.message)
			}
		)
})

router.delete('/:id', function(req, res){
	var dataID = req.params.id;

	Log.destroy({ where: {id: dataID }}).then(
		function deleteLogSuccess(data){
			res.send("You removed a helpminder!");
		},
		function deleteLogError(err){
			res.send(500, err.message)
		}
	)
})

router.get('/:id', function(req, res){
	var dataID = req.params.id;
	Log.findOne({ where: {id: dataID }}).then(
		function getSuccess(data){
			res.json(data)
		},

		function getError(err){
			res.send(500, err.message)
		}
	)
})

router.put('/:id', function(req,res){
	var data = req.params.id;
	var category = req.body.log.category
	var event = req.body.log.event;
	var due = req.body.log.due;
	var freq = req.body.log.freq;
	var owner = req.body.log.owner;
	var location = req.body.log.location;
	var purpose = req.body.log.purpose;
	var user = req.user;

	Log.update({ 
		category : category,
		event : event, 
		due : due, 
		freq : freq,
		owner : owner, 
		location: location,
		purpose : purpose,
		updatedby: user.id
	
	}, {where: {id : data}}).then(
		function updateSuccess(updateData){
			res.json(updateData)
		},
		function updateError(err){
			res.send(500, err.message)
		}
	)
})

module.exports = router;
