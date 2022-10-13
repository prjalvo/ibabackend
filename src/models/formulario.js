'use strict';
module.exports = (sequelize, DataTypes) => {
  const formularios = sequelize.define('formularios', {
    id: {type: DataTypes.INTEGER,
      primaryKey: true},
      id_celula: DataTypes.INTEGER,
      id_membro: DataTypes.INTEGER,
      membresia: DataTypes.INTEGER,
      data_membresia: DataTypes.DATE,
      batismo: DataTypes.INTEGER,
      data_batismo: DataTypes.DATE,
      lider_celula: DataTypes.INTEGER,
      data_lider_celula: DataTypes.DATE,
      disc_superv: DataTypes.INTEGER,
      data_disc_superv: DataTypes.DATE,
      kids_incl: DataTypes.INTEGER,
      data_kids_incl: DataTypes.DATE,
      intr_b_nt: DataTypes.INTEGER,
      data_intr_b_nt: DataTypes.DATE,
      ant_test: DataTypes.INTEGER,
      data_ant_test: DataTypes.DATE,
      batalha_esp: DataTypes.INTEGER,
      data_batalha_esp: DataTypes.DATE,
      tetelestai: DataTypes.INTEGER,
      data_tetelestai: DataTypes.DATE,
      vida: DataTypes.INTEGER,
      data_vida: DataTypes.DATE,
      tsd: DataTypes.DATE,
      discipulado: DataTypes.INTEGER, 
      data_discipulado: DataTypes.DATE, 
      createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
      },
      updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
      },  
    
  }, {});


  formularios.associate = function(models) {
    // associations can be defined here
    models.formularios.belongsTo(models.grupos, { foreignKey: 'id_celula' });          
    models.formularios.belongsTo(models.grupo_membros, { foreignKey: 'id_membro' });     
  };
  return formularios;
};