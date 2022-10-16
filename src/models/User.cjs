'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    id_cargo: DataTypes.INTEGER
  }, {});

  User.associate = function(models) {
    models.user.belongsTo(models.cargo, { foreignKey: 'id_cargo' });
    models.user.hasMany(models.grupos, { foreignKey: 'id' });
  };

  return User;
};
