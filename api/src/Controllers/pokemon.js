const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { URL, POKEMON } = require("../Constants/constants");
const { v4: uuidv4 } = require('uuid');
const db = require("../db");

async function getAllPokemons(req, res) {
    let name = req.query.name;
    if(name) {
        try {
            var lower = name.toLowerCase();
             const dataBase = await Pokemon.findOne({
                where:{
                    name: lower
                },
                include: [Type]
            });

            if(dataBase) {
                let type = dataBase.types.map((el) => el.name)
                var pokeDb ={
                    name : dataBase.name.charAt(0).toUpperCase() + dataBase.name.slice(1),
                    id: dataBase.id,
                    types: type,
                    height: dataBase.height,
                    weight: dataBase.weight,
                    image: "https://i.pinimg.com/originals/72/e7/8b/72e78b090e58bfd47a49e7e348c00978.jpg",
                    hp: dataBase.hp,
                    attack: dataBase.attack,
                    defense: dataBase.defense,
                    speed: dataBase.speed
      
                } 
                return res.send(pokeDb);
            } else {

                let api = await axios.get(`${URL}${POKEMON}/${lower}`); 
                if(api) {
                    let type2 = api.data.types.map(el => el.type.name);
                    var pokeApi = {
                        name: api.data.name.charAt(0).toUpperCase() + api.data.name.slice(1),
                        id: api.data.id,
                        image: api.data.sprites.other.dream_world.front_default,
                        types: type2,
                        height: api.data.height,
                        weight: api.data.weight,
                        hp: api.data.stats[0].base_stat,
                        attack: api.data.stats[1].base_stat,
                        defense: api.data.stats[2].base_stat,
                        speed: api.data.stats[5].base_stat
                    } 
                    return res.send(pokeApi);
            }
            };
        
        } catch (error) {
         return res.status(404).send({error: "Pokemon not found :("});
        };
  
    }  else {
        try {
             const first = await axios.get(`${URL}${POKEMON}`);
            const next = await axios.get(first.data.next);
            const api40 = first.data.results.concat(next.data.results);
            const response = await Promise.all(api40.map(async pokemon => {
                let url = await axios.get(pokemon.url)
                let type = url.data.types.map(el => el.type.name)
                return  {
                    name: url.data.name.charAt(0).toUpperCase() + url.data.name.slice(1),
                    image: url.data.sprites.other.dream_world.front_default,
                    id: url.data.id, 
                    types: type,
                    attack: url.data.stats[1].base_stat
                }
                
            })); 
            var dataBase = await Pokemon.findAll({
                include: [Type]
            });

             const pokeDb = dataBase.reverse().map(result => {
                let type = result.types.map(el => el.name);
                return {
                    name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
                    image: "https://i.pinimg.com/originals/72/e7/8b/72e78b090e58bfd47a49e7e348c00978.jpg",
                    id: result.id,
                    types: type,
                    attack: result.attack
                }
  
            }); 
            var result = pokeDb.concat(response); 
            let caso  = req.query.caso;
            if(caso) {
                if(caso === 'api') {
                    const api = result.filter(c => typeof c.id === 'number');
                     return res.status(200).json(api);
                  } 
                  if(caso === 'db') {
                   const db = result.filter(c => typeof c.id === 'string');
                    return res.status(200).json(db);
                  }

            }
            if(req.query.type) {
                const allTypes = result.filter(t => t.types.includes(req.query.type))
                return res.status(200).json(allTypes);
            
            }

            return res.send(result);  
        } catch(error) {
            return res.send('ERROR');
        }
    }
  };
  


async function addPokemon(req, res) {
    const id = uuidv4();
    let data = { ...req.body, id }; 
    if (!req.body.name) return res.status(400).send('Name is required');
    try {
        const createdPoke = await Pokemon.create({
            name: data.name,
            hp: parseInt(data.hp),
            attack: parseInt(data.attack),
            defense: parseInt(data.defense),
            speed: parseInt(data.speed),
            height: parseInt(data.height), 
            weight: parseInt(data.weight),
        });
        await createdPoke.setTypes(data.types);       
        return res.json({message: 'Pokemon created succesfully', pokemon: createdPoke});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
};




async function getPokemonById(req, res) {
    let id = req.params.id; 
    if(id) {
        try {
            if(!id.includes('-')) {
                var api = await axios.get(`${URL}${POKEMON}/${id}`);
                let type = api.data.types.map(el => el.type.name);
                var poke = {
                    name: api.data.name,
                    id: api.data.id,
                    image: api.data.sprites.other.dream_world.front_default,
                    types: type,
                    height: api.data.height,
                    weight: api.data.weight,
                    hp: api.data.stats[0].base_stat,
                    attack: api.data.stats[1].base_stat,
                    defense: api.data.stats[2].base_stat,
                    speed: api.data.stats[5].base_stat
                } 
                return res.json(poke);

            } else { 
            
                const dataBase = await Pokemon.findOne({
                    where:{
                        id: id,
                    },
                    include: [Type] 
                })
                let type = dataBase.types.map(el => el.name);
                var finalPokemon ={
                    name : dataBase.name.charAt(0).toUpperCase() + dataBase.name.slice(1),
                    id: dataBase.id,
                    image: "https://i.pinimg.com/originals/72/e7/8b/72e78b090e58bfd47a49e7e348c00978.jpg",
                    types: type,
                    height: dataBase.height,
                    weight: dataBase.weight,
                    hp: dataBase.hp,
                    attack: dataBase.attack,
                    defense: dataBase.defense,
                    speed: dataBase.speed
                } 
                
                if(!dataBase) {
                    return res.status(404).send({message: 'Pokemon not found'})
                }
                return res.send(finalPokemon);
                
            }
           
        } catch (error) {
            return res.status(404).send({message: 'Bad Request'});
        }
    }
};


   

module.exports = {
  getAllPokemons,
  addPokemon,
  getPokemonById,
};
