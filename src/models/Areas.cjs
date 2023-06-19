'use strict';
module.exports = (sequelize, DataTypes) => {
  const areas = sequelize.define('areas', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    descricao: DataTypes.STRING,
    tipo: DataTypes.STRING   

  }, 
   
  {});
  
  areas.associate = function(models) {   
  };
  return areas;
};
