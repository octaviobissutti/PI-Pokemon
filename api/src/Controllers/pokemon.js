const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { URL, POKEMON } = require("../Constants/constants");
const db = require("../db");

async function getAllPokemons(req, res) {
    let type;
    let name = req.query.name;
    if(name) {
        var lower = name.toLowerCase();
        try {
            let pokemon = await axios.get(`${URL}${POKEMON}/${lower}`); 
            if(pokemon.data.types.length === 1) {
                type = pokemon.data.types[0].type.name;
            } else {
                type = pokemon.data.types[0].type.name + " " + pokemon.data.types[1].type.name;
            }
            console.log(type);
            var obj = {
                name: pokemon.data.name.charAt(0).toUpperCase() + pokemon.data.name.slice(1),
                id: pokemon.data.id,
                image: pokemon.data.sprites.other.dream_world.front_default,
                types: type,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat
            } 
        } catch (error) {
            const pokemonDb = await Pokemon.findOne({
                where:{
                    name: lower
                },
                include: Type
            })
            if(!pokemonDb) {
                return res.status(404).send({message: 'Bad Request'})
            }
            if(pokemonDb.types.length === 1) {
                type = pokemonDb.types[0].name;
            } else {
                type = pokemonDb.types[0].name + " " + pokemonDb.types[1].name;
            }
            var finalPokemon ={
                name : pokemonDb.name.charAt(0).toUpperCase() + pokemonDb.name.slice(1),
                id: pokemonDb.id,
                types: type,
                height: pokemonDb.height,
                weight: pokemonDb.weight,
                image: "https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg",
                hp: pokemonDb.hp,
                attack: pokemonDb.attack,
                defense: pokemonDb.defense,
                speed: pokemonDb.speed
  
            } 
            return res.send(finalPokemon);
            
        }
        return res.send(obj);
  
    }  else {
        try {
            const pokemon = await axios.get(`${URL}${POKEMON}`);
            const pokemon2 = await axios.get(pokemon.data.next);
            const poke2= pokemon.data.results.concat(pokemon2.data.results);
            const res1 = await Promise.all(poke2.map(async pokemon => {
                let subRequest = await axios.get(pokemon.url)
                if(subRequest.data.types.length === 1) {
                    type = subRequest.data.types[0].type.name;
                } else {
                    type = subRequest.data.types[0].type.name + " " + subRequest.data.types[1].type.name
                }
                return  {
                    name: subRequest.data.name.charAt(0).toUpperCase() + subRequest.data.name.slice(1),
                    image: subRequest.data.sprites.other.dream_world.front_default,
                    id: subRequest.data.id, 
                    types: type
                }
                
            }))
            const pokedb = await Pokemon.findAll({
                include: {
                    attributes: ['name'],
                    model: Type,
                    through: {
                        attributes: [],
                    }
                }
            })
            const pokedb2 = pokedb.reverse().map(result => {
                if(result.types.length === 1) {
                    type = result.types[0].name;
                } else {
                    type = result.types[0].name + " " + result.types[1].name;
                }
                return {
                    name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
                    image: "https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg",
                    id: result.id,
                    types: type,
                }
  
            })
            var result = pokedb2.concat(res1);
        } catch(error) {
            return res.send('ERROR');
        }
    return res.send(result); 
    }
  }
  



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
  getAllPokemons,
  addPokemon,
};
