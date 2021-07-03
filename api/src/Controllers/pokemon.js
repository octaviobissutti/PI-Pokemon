const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {URL, POKEMON, TYPE} = require("../Constants/constants");
const db = require("../db");

async function getAllPokemons(req,res) {
  const name = req.query.name; //Query
  if(name) {
      try {
         const container = []; 
         let DB = await Pokemon.findAll({ //Busco en mi DB.
             where:{
                 name: name
             },
             limit: 12
         })    
         if(DB.length < 12) {
         let apiFirst = await axios.get(`${URL}${POKEMON}/${name}`);
         let apiNext = await apiFirst.data.next;
         let api40 = apiFirst.concat(apiNext)
        }
      } catch (err) {
        console.log(err);
        
  } 
  } else {

  }
}


// if(req.query.name){
//   try{
//       buscas en la api
//   } catch(error){
//       buscas en la db
//       retornas lo de la db
//   }
//   retornas lo del "try"
// } else {
//   try{
//       haces las llamadas a la api las concatenas y armas un objeto para traer lo necesario
//       aparte tambien armas una constante para que busque en la db y concatenas los resultados

//   }catch(error) {
//      retornas error 
//   }
//   retornas lo de try que esta bien
// }


/*const pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon');
const pokemon2 = await axios.get(pokemon.data.next);
const poke2= pokemon.data.results.concat(pokemon2.data.results);*/



// if (dbSearch.length < 15) {
//     let apiSearch = await axios.get(`${BASE_URL}${URL_GAME}${DB_APIKEY}${URL_SEARCH}${name}`); 
//     for(let i = 0; i < apiSearch.data.results.length; i++) {
//         arr.push( {
//             id: apiSearch.data.results[i].id, 
//             name: apiSearch.data.results[i].name,
//             image: apiSearch.data.results[i].background_image,
//             genres: apiSearch.data.results[i].genres,
//             rating: apiSearch.data.results[i].rating,
//             platforms: apiSearch.data.results[i].platforms,
//             released: apiSearch.data.results[i].released
//         }
//         )
//     }
//   }
//   return res.json(dbSearch.concat(arr));

// } catch (err) {
//   next(err);
// }
















//const apiFirst = await axios.get(`${URL}${POKEMON}/${name}`);
//const apiNext = await apiFirst.data.next;



module.exports = {
    getAllPokemons
}