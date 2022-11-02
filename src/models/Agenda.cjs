'use strict';
module.exports = (sequelize, DataTypes) => {
  const agendas = sequelize.define('agendas', {

    id: {type: DataTypes.INTEGER,primaryKey: true},
    createdAt: {
          field: 'created_at',
          type: DataTypes.DATE,
      },
      updatedAt: {
          field: 'updated_at',
          type: DataTypes.DATE,
      },            
      title: DataTypes.STRING,  
      location: DataTypes.STRING,  
      id_celula: DataTypes.INTEGER,
      id_lider: DataTypes.INTEGER,
      startDate: DataTypes.DATE,
      endDate: DataTypes.DATE,
      status: DataTypes.INTEGER,
      data_realizada: DataTypes.DATE,
      note: DataTypes.STRING,
     }, 
   
  {});  

  agendas.associate = function(models) {   
    models.agendas.belongsTo(models.user, {as:'user_lider',foreignKey: 'id_lider' }); 
    models.agendas.belongsTo(models.grupos, { foreignKey: 'id_celula' });      
    models.agendas.belongsTo(models.user, {as:'user_colider', foreignKey: 'id_colider' });    
    models.agendas.belongsTo(models.user, {as:'user_supervisor', foreignKey: 'id_supervisor' });      
    models.agendas.belongsTo(models.user, {as:'user_area', foreignKey: 'id_area' });      
    models.agendas.belongsTo(models.user, {as:'user_distrito', foreignKey: 'id_distrito' });      
    models.agendas.belongsTo(models.user, {as:'user_setor', foreignKey: 'id_setor' });     
  };
  return agendas;
};
