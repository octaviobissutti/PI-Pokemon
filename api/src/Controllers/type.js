// const { Type } = require("../db");
// const axios = require("axios");

// // async function getAllTypes(req, res) {
// //   let types = await Type.findAll();
// //   return res.status(200).json(types);
// // }

const { Type } = require('../db.js');
const axios = require ('axios');
const { URL, TYPE } = require('../Constants/constants');

async function getAllTypes (req, res) {
    
    const dbTypes =await Type.findAll();
    if(dbTypes.length < 20) {
        try {
            const types = await axios(`${URL}${TYPE}`);
            for(let i in types.data.results){
                await Type.create({name: types.data.results[i].name});
            }
              
         } catch(error) {

           return res.status(404).send('ERROR!')
         }
        } else {
            return res.status(200).json(dbTypes);
        }
}













module.exports = {
  getAllTypes,
};
