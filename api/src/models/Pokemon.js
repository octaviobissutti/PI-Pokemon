const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    name: { // pokemon.data.name
      type: DataTypes.STRING,
      allowNull: false,
    },

    id:{ // pokemon.data.id
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    hp: { // pokemon.data.stats[0].base_stat
      type: DataTypes.INTEGER,      
    },

    attack: { // pokemon.data.stats[1].base_stat
      type: DataTypes.INTEGER,      
    },

    defense: { // pokemon.data.stats[2].base_stat
      type: DataTypes.INTEGER,      
    },

    speed: { // pokemon.data.stats[5].base_stat
      type: DataTypes.INTEGER,      
    },

    height: { ////pokemon.data.height
      type: DataTypes.INTEGER,      
    },

    weight: { //pokemon.data.weight
      type: DataTypes.INTEGER,      
    },
    
    image:{
      type: DataTypes.STRING,
    },
  });
};
