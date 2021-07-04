const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const {URL, POKEMON, TYPE} = require("../Constants/constants");
const db = require("../db");


async function data() {
  const arr = await axios.get(`${URL}${POKEMON}`);
  console.log('ESTO ME DEVUELVE LA API: ', arr.data.results);
  return arr.data.results;
}

 async function getAllPokemons(req,res) {
//   const name = req.query.name; //Query
//   if(name) {
//       try {
//          const container = []; 
//          let dbSearch = await Pokemon.findAll({ //Busco en mi DB.
//              where:{
//                  name: name
//              }
//          })    
//          if(!dbSearch.length) { //Si no lo tengo en mi base de datos lo busco en la api.
//           let apiFirst = await axios.get(`${URL}${POKEMON}`);
//           let apiNext = await axios.get(apiFirst.data.next);
//           let api40 = apiFirst.data.results.concat(apiNext.data.results);
//           for(let i = 0; i < api40.data.results.length; i++) {
//             container.push({
//               id: pokemon.data.id,
//               image: pokemon.data.sprites.other.dream_world.front_default,
//               types: type,
//               height: pokemon.data.height,
//               weight: pokemon.data.weight,
//               hp: pokemon.data.stats[0].base_stat,
//               attack: pokemon.data.stats[1].base_stat,
//               defense: pokemon.data.stats[2].base_stat,
//               speed: pokemon.data.stats[5].base_stat
//             });
//             }
//         }
//         return res.json(dbSearch.concat(container));
//       } catch (err) {
//         console.log(err);
        
//   } 
//   } else {
//     let result = await Pokemon.findAll({
//       include:{
//         model: Type,
//         attributes: ['name', 'id'],
//         through:{
//           attributes:[],
//         }
//       }
//     })
//     return res.json(result);
//   }
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
    data,
    getAllPokemons
}