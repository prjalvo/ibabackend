'use strict';
module.exports = (sequelize, DataTypes) => {
  const cargo = sequelize.define('cargo', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
      },
      updatedAt: {
          field: 'updated_at',
          type: DataTypes.DATE,
      },      
    descricao: DataTypes.STRING  
  }, 
   
  {});


  
  cargo.associate = function(models) {   
  };
  return cargo;
};