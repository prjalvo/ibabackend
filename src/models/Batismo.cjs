'use strict';
module.exports = (sequelize, DataTypes) => {
  const batismo = sequelize.define('batismo', {
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    est_c: DataTypes.STRING,    
    idade: DataTypes.INTEGER,    
    telefone: DataTypes.STRING,
    celula: DataTypes.STRING,
    lider: DataTypes.STRING,
    supervisores: DataTypes.STRING,
    ne: DataTypes.STRING,
    turma: DataTypes.STRING,    
    curso: DataTypes.INTEGER, 
    inscricao: DataTypes.INTEGER, 
    reuniao: DataTypes.INTEGER, 
  },
  {
     tableName: 'batismo',
     timestamps: false, // Se a view não tiver colunas de data de criação/atualização, desative os timestamps
   },   
                                   
 {});

  batismo.associate = function(models) {       
  };

  return batismo;
};
