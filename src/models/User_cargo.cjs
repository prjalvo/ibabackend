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
  };
  return user_cargo;
};
