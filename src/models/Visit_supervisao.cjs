'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('visit_supervisao', {
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

  user.associate = function(models) {   
    models.user.belongsTo(models.cargo, { foreignKey: 'id_cargo' });
    models.user.hasMany(models.grupos, { foreignKey: 'id' });
  };

  return user;
};
