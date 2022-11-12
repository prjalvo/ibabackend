'use strict';
module.exports = (sequelize, DataTypes) => {
  const visit_supervisao = sequelize.define('visit_supervisao', {
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
     id_celula: DataTypes.INTEGER,
     id_lider: DataTypes.INTEGER,
     id_cargo: DataTypes.INTEGER, 
     desc_cargo: DataTypes.STRING,
     desc_celula: DataTypes.STRING,
     desc_nome: DataTypes.STRING,
     mesano: DataTypes.INTEGER,
     visita: DataTypes.INTEGER,
     status: DataTypes.INTEGER
    
    
  }, {});

  visit_supervisao.associate = function(models) {     
  };

  return visit_supervisao;
};
