'use strict';
module.exports = (sequelize, DataTypes) => {
  const tp_grupos = sequelize.define('tp_grupos', {
    id: {type: DataTypes.INTEGER,
      primaryKey: true},
    descricao: DataTypes.STRING  
  }, {});
  tp_grupos.associate = function(models) {   
  };
  return tp_grupos;
};