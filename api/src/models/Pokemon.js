const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
                                                                                  
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull:{
          msg: 'Name is required',
        }
      }
    },

    id:{ 
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },

    hp: { 
      type: DataTypes.INTEGER,      
    },

    attack: { 
      type: DataTypes.INTEGER,      
    },

    defense: { 
      type: DataTypes.INTEGER,      
    },

    speed: { 
      type: DataTypes.INTEGER,      
    },

    height: { 
      type: DataTypes.INTEGER,      
    },

    weight: { 
      type: DataTypes.INTEGER,      
    },
    
    image:{
      type: DataTypes.STRING,
    },

  },
   {timestamps: false},
   {updatedAt: false},
   {createdAt: false}
  );
};

