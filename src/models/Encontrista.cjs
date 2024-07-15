'use strict';
module.exports = (sequelize, DataTypes) => {
  const encontrista = sequelize.define('encontrista', {
    id: {type: DataTypes.INTEGER,primaryKey: true},
    nome: DataTypes.STRING,   
    data_inscricao: DataTypes.STRING,    
    nome_lider: DataTypes.STRING,    
    flg_envia: DataTypes.STRING,
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
     tableName: 'encontrista',
     //timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },   
  {});
  
  encontrista.associate = function(models) {
    encontrista.hasMany(models.carta_vida, { foreignKey: 'id_participante', as: 'cartas' });
  };
  return encontrista;
};
