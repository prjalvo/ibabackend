'use strict';
module.exports = (sequelize, DataTypes) => {
  const carta_vida = sequelize.define('carta_vida', {
    id: {type: DataTypes.INTEGER,
        primaryKey: true},
    url: DataTypes.STRING,
    texto: DataTypes.STRING,
    relacao: DataTypes.STRING,
    remetente: DataTypes.STRING,
    imprimiu:DataTypes.STRING,
    id_participante:DataTypes.INTEGER,
    
  createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
  },
  updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE,
  },  

  }, 
   {
     tableName: 'carta_vida'    
   },   
  {});
  
  carta_vida.associate = function(models) {
    carta_vida.belongsTo(models.encontrista, { foreignKey: 'id_participante', as: 'encontrista' });
  };
  return carta_vida;
};
