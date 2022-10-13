'use strict';
module.exports = (sequelize, DataTypes) => {
  const faixaetaria = sequelize.define('faixaetaria', {
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


  
  faixaetaria.associate = function(models) {   
  };
  return faixaetaria;
};