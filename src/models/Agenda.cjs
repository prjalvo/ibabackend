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
  };
  return agendas;
};
