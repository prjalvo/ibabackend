'use strict';
module.exports = (sequelize, DataTypes) => {
  const carta_vida = sequelize.define('carta_vida', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    url: DataTypes.STRING,
    texto: DataTypes.STRING,
    imprimiu:DataTypes.INTEGER,
    id_participante:DataTypes.INTEGER,
    
  createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
  },  

  }, 
   
  {});


  
  carta_vida.associate = function(models) {   
  };
  return carta_vida;
};
