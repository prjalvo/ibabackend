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
    sexo: DataTypes.STRING,
    nome_conjuque: DataTypes.STRING,
    batizado: DataTypes.INTEGER,
    aspersao: DataTypes.INTEGER,
    nome_pai: DataTypes.STRING,
    nome_mae: DataTypes.STRING,
    estado: DataTypes.STRING,
    discipulado: DataTypes.INTEGER,
    url_diploma: DataTypes.STRING,
    blusa: DataTypes.STRING,
    tipo_curso: DataTypes.STRING,
    tem_celula: DataTypes.INTEGER,
    vida_vitoriosa: DataTypes.INTEGER,
    rede: DataTypes.STRING,
    url_foto: DataTypes.STRING,
    faixa: DataTypes.STRING,
    nome_lider: DataTypes.STRING,
    tel_lider: DataTypes.STRING,
    pais: DataTypes.STRING,
    uf: DataTypes.STRING,
    cidade: DataTypes.STRING,
    cep: DataTypes.STRING,
    rua: DataTypes.STRING,
    numero: DataTypes.STRING,
    complemento: DataTypes.STRING,
    bairro: DataTypes.STRING,
    nascimento: DataTypes.STRING,
    aceite: DataTypes.INTEGER
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
