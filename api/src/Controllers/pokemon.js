const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { URL, POKEMON, TYPE } = require("../Constants/constants");
const db = require("../db");

async function data() {
  // const arr = await axios.get(`${URL}${POKEMON}`);
  const arr = await axios.get(`${URL}${POKEMON}?offset=0&limit=40`);
  console.log("ESTO ME DEVUELVE LA API: ", arr.data.results);
  return arr.data.results;
}
//https://pokeapi.co/api/v2/pokemon?offset=0&limit=40

async function getAllPokemons(req, res) {
  const name = req.query.name; //Query
  if (name) {
    try {
      const container = [];
      let dbSearch = await Pokemon.findOne({
        //Busco en mi DB.
        where: {
          name: name,
        },
      });
      if (!dbSearch) {
        //Si no lo tengo en mi base de datos lo busco en la api.
        let apiCall = await data();
        console.log("ESTO ME DEVUELVE LA API : ", apiCall.data.results);
        for (let i = 0; i < apiCall.data.results.length; i++) {
          container.push({
            id: pokemon.data.id,
            image: pokemon.data.sprites.other.dream_world.front_default,
            types: type,
            height: pokemon.data.height,
            weight: pokemon.data.weight,
            hp: pokemon.data.stats[0].base_stat,
            attack: pokemon.data.stats[1].base_stat,
            defense: pokemon.data.stats[2].base_stat,
            speed: pokemon.data.stats[5].base_stat,
          });
        }
      }
      return res.json(dbSearch.concat(container));
    } catch (err) {
      console.log(err);
    }
  } else {
    let result = await Pokemon.findAll({
      include: {
        model: Type,
        attributes: ["name", "id"],
        through: {
          attributes: [],
        },
      },
    });
    return res.json(result);
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

async function addPokemon(req, res) {
  const { name, image, types, height, weight, hp, attack, defense, speed } =  req.body;
   
  if (!name) {
    return res.status(400).json({ error: "notNull Violation: It requires a valid name" });
  } else {
    const createPokemon = await Pokemon.create({
      name: name,
      image: image,
      types: types,
      height: height,
      weight: weight,
      hp: hp,
      attack: attack,
      defense: defense,
      speed: speed,
    });
    await createPokemon.setTypes(types); //set método de sequelize para relacionar las tablas. El set pisa los valores anteriores.
    return res.json(createPokemon);
  }
}

module.exports = {
  data,
  getAllPokemons,
  addPokemon,
};
