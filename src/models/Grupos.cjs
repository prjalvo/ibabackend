'use strict';
module.exports = (sequelize, DataTypes) => {
  const grupos = sequelize.define('grupos', {
    id: {type: DataTypes.INTEGER,
      primaryKey: true},
  createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
    },  
    descricao: DataTypes.STRING,    
    status: DataTypes.STRING,
    addres: DataTypes.STRING,
    id_tp_grupo: DataTypes.INTEGER,
    id_tp_ferramenta: DataTypes.INTEGER,
    id_lider:DataTypes.INTEGER,    
    id_supervisor:DataTypes.INTEGER,
    id_setor:DataTypes.INTEGER,
    id_area: DataTypes.INTEGER,
    id_distrito: DataTypes.INTEGER,
    id_rede: DataTypes.INTEGER,
    id_membro: DataTypes.INTEGER,
    info: DataTypes.STRING,
    dia_semana:DataTypes.INTEGER,
    faixa_etaria:DataTypes.INTEGER,
    text: DataTypes.STRING,
    data_mult: DataTypes.DATE,
    gd: DataTypes.INTEGER,
    lt: DataTypes.INTEGER,
    ltd: DataTypes.INTEGER,
  }, {});


  grupos.associate = function(models) {
    // associations can be defined here        
    models.grupos.belongsTo(models.tp_ferramentas, { foreignKey: 'id_tp_ferramenta' });  
    models.grupos.belongsTo(models.faixaetaria, { foreignKey: 'faixa_etaria' });  
    models.grupos.belongsTo(models.user, {as:'user_lider',foreignKey: 'id_lider' });  
    models.grupos.belongsTo(models.user, {as:'user_supervisor', foreignKey: 'id_supervisor' });      
    models.grupos.belongsTo(models.user, {as:'user_area', foreignKey: 'id_area' });      
    models.grupos.belongsTo(models.user, {as:'user_distrito', foreignKey: 'id_distrito' });      
    models.grupos.belongsTo(models.user, {as:'user_setor', foreignKey: 'id_setor' });   
    models.grupos.belongsTo(models.user, {as:'user_rede', foreignKey: 'id_rede' });    
  };
  return grupos;
};
