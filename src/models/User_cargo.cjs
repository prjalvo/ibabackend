'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_cargo = sequelize.define('user_cargo', {
    id_cargo: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,    
  },    
  {});
 
  user_cargo.associate = function(models) {   
  };
  return user_cargo;
};
