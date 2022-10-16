'use strict';
module.exports = (sequelize, DataTypes ) => {
  const grupo_membros = sequelize.define('grupo_membros', {
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
    nome: DataTypes.STRING,    
    telefone: DataTypes.STRING,
    email: DataTypes.STRING,
    info: DataTypes.STRING,
    status: DataTypes.INTEGER,
    id_grupo: DataTypes.INTEGER,
    id_ministerio: DataTypes.INTEGER,
    data_nascimento:DataTypes.DATE,
    data_conversao:DataTypes.DATE    
  }, {});


  grupo_membros.associate = function(models) {
    // associations can be defined here
    models.grupo_membros.belongsTo(models.grupos, { foreignKey: 'id_grupo' });              
    models.grupo_membros.belongsTo(models.ministerio, { foreignKey: 'id_ministerio' });    
  };
  return grupo_membros;
};