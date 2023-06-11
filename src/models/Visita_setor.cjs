'use strict';
module.exports = (sequelize, DataTypes) => {
  const visita_setor = sequelize.define('visita_setor', {

    DESC_NOME:DataTypes.STRING,
    desc_cargo:DataTypes.STRING,
    desc_celula:DataTypes.STRING,
    id_lider: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER,
    id_celula: DataTypes.INTEGER,
    Jan:DataTypes.STRING,
    Fev:DataTypes.STRING,
    Mar:DataTypes.STRING,
    Abr:DataTypes.STRING,
    Mai:DataTypes.STRING,
    Jun:DataTypes.STRING,
    Jul:DataTypes.STRING,
    Ago:DataTypes.STRING,
    Sete:DataTypes.STRING,
    Outu:DataTypes.STRING,
    Nov:DataTypes.STRING,
    Dez:DataTypes.STRING,
 
     }, 
   
  {});  

  visita_setor.associate = function(models) {        
  };
  return visita_setor;
};
