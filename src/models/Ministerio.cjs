'use strict';
module.exports = (sequelize, DataTypes) => {
  const ministerio = sequelize.define('ministerio', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    descricao: DataTypes.STRING,
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


  
  ministerio.associate = function(models) {   
  };
  return ministerio;
};