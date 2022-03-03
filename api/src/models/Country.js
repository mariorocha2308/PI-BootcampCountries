const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    // charset: 'utf8mb4',
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    imageFlag: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    capital: {      
      type: DataTypes.STRING,
    },

    subregion: {      
      type: DataTypes.STRING,
    },

    area: {      
      type: DataTypes.DOUBLE,
    },

    population: {      
      type: DataTypes.BIGINT,
    },

    //* NEW DATA
    timezones: {
      type: DataTypes.STRING
    },

    languages: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
  });
};
