module.exports = function(seq, DataTypes){
	var User = seq.define('hmuser', {
		username: DataTypes.STRING,
		passwordhash: DataTypes.STRING
	})
	return User;
}

