'use strict';
module.exports = (sequelize, DataTypes) => {
  const batismo = sequelize.define('batismo', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    est_c: DataTypes.STRING,    
    idade: DataTypes.INTEGER,    
    telefone: DataTypes.STRING,
    celula: DataTypes.STRING,
    lider: DataTypes.STRING,
    supervisores: DataTypes.STRING,
    ne: DataTypes.STRING,
    turma: DataTypes.STRING,    
  }, {});

  batismo.associate = function(models) {       
  };

  return batismo;
};
