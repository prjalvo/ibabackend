'use strict';
module.exports = (sequelize, DataTypes) => {
  const visita_distrito = sequelize.define('visita_distrito', {
    id: {type: DataTypes.INTEGER,
    primaryKey: true},
    desc_nome: DataTypes.STRING,
    desc_cargo: DataTypes.STRING,
    desc_celula: DataTypes.STRING, 
    id_lider: DataTypes.INTEGER,
    id_cargo: DataTypes.INTEGER, 
    id_celula: DataTypes.INTEGER,
    JanFevMar: DataTypes.INTEGER,
    AbrMaiJun: DataTypes.INTEGER,
    JulAgoSet: DataTypes.INTEGER,
    OutNovDez: DataTypes.INTEGER,
  },
   {
     tableName: 'visita_distrito',
     timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },                                      
  {});

  visita_distrito.associate = function(models) {     
  };

  return visita_distrito;
};
