'use strict';
module.exports = (sequelize, DataTypes) => {
  const visita_setor = sequelize.define('visita_setor', {
    desc_nome: DataTypes.STRING,
    desc_cargo: DataTypes.STRING,
    desc_celula: DataTypes.STRING, 
    id_lider: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER, 
    id_celula: DataTypes.INTEGER,
    Jan: DataTypes.INTEGER,
    Fev: DataTypes.INTEGER,
    Mar: DataTypes.INTEGER,
    Abr: DataTypes.INTEGER,
    Mai: DataTypes.INTEGER,
    Jun: DataTypes.INTEGER,
    Jul: DataTypes.INTEGER,
    Ago: DataTypes.INTEGER,
    Sete: DataTypes.INTEGER,
    Outu: DataTypes.INTEGER,
    Nov: DataTypes.INTEGER,
    Dez: DataTypes.INTEGER,
    ano: DataTypes.INTEGER,
  }, {});

  visita_setor.associate = function(models) {     
  };

  return visita_setor;
};
