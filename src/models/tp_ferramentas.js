'use strict';
module.exports = (sequelize, DataTypes) => {
  const tp_ferramentas = sequelize.define('tp_ferramentas', {
    id: {type: DataTypes.INTEGER,
      primaryKey: true},
      descricao: DataTypes.STRING  
  }, {});
  tp_ferramentas.associate = function(models) {   
  };
  return tp_ferramentas;
};