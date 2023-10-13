'use strict';
module.exports = (sequelize, DataTypes) => {
  const user_cargo = sequelize.define('user_cargo', {
    id_cargo: DataTypes.INTEGER,
    id_user: DataTypes.INTEGER,
  },
  {
     tableName: 'user_cargo',
     timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },   
  {});
 
  user_cargo.associate = function(models) {   

      models.user_cargo.hasMany(models.user, {
      foreignKey: 'id',
      sourceKey: 'id_user',
      as: 'user_cargo' }); 
    
      models.user_cargo.hasMany(models.cargo, {
      foreignKey: 'id',
      sourceKey: 'id_cargo',
      as: 'user_cargo_cargo' });        
    
  };

 
  return user_cargo;
};
