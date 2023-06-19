'use strict';
module.exports = (sequelize, DataTypes) => {
  const areas = sequelize.define('areas', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    descricao: DataTypes.STRING,
    tipo: DataTypes.STRING   

  }, 
    {
     tableName: 'areas',
     timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },   
  {});
  
  areas.associate = function(models) {   
  };
  return areas;
};
