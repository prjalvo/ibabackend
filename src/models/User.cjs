'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING,
    verify: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    id_cargo: DataTypes.INTEGER,
    id_area: DataTypes.INTEGER,
    status: DataTypes.INTEGER,
    url_file: DataTypes.STRING,
  }, {});

  user.associate = function(models) {   
    models.user.belongsTo(models.cargo, { foreignKey: 'id_cargo' });
    models.user.hasMany(models.grupos, { foreignKey: 'id' });
    models.user.belongsTo(models.areas, { foreignKey: 'id_area' });
  };

  return user;
};
