'use strict';
module.exports = (sequelize, DataTypes) => {
  const visita_area = sequelize.define('visita_area', {
    desc_nome: DataTypes.STRING,
    desc_cargo: DataTypes.STRING,
    desc_celula: DataTypes.STRING, 
    id_lider: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER, 
    id_celula: DataTypes.INTEGER,
    JanFev: DataTypes.INTEGER,
    MarAbr: DataTypes.INTEGER,
    MaiJun: DataTypes.INTEGER,
    JulAgo: DataTypes.INTEGER,
    SetOut: DataTypes.INTEGER,
    NovDez: DataTypes.INTEGER,  
  },
   {
     tableName: 'visita_area',
     timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },                                      
  {});

  visita_area.associate = function(models) {     
  };

  return visita_area;
};
