module.exports = function(sequelize, DataTypes){
	return sequelize.define('hmlog',{
		category: DataTypes.STRING,
		event: DataTypes.STRING,
		due: DataTypes.DATE,
		freq: DataTypes.STRING,
		owner: DataTypes.STRING,
		location: DataTypes.STRING,
		purpose: DataTypes.STRING,
		createdby: DataTypes.INTEGER,
		updatedby: DataTypes.INTEGER
	})
}