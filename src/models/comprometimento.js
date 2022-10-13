'use strict';
module.exports = (sequelize, DataTypes ) => {
  const comprometimentos = sequelize.define('comprometimentos', {
    id: {type: DataTypes.INTEGER,
      primaryKey: true},   
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },  
    createdAt: {
      field: 'created_at',
      type: DataTypes.DATE,
    },
    data: DataTypes.DATE,     
    id_grupo: DataTypes.INTEGER,
    id_membro: DataTypes.INTEGER,
    evento: DataTypes.STRING,
    participou: DataTypes.INTEGER,

  }, {});


  comprometimentos.associate = function(models) {
    // associations can be defined here
    models.comprometimentos.belongsTo(models.grupos, { foreignKey: 'id_grupo' });              
    models.comprometimentos.belongsTo(models.grupo_membros, { foreignKey: 'id_membro' });    
  };
  return comprometimentos;
};