const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { URL, POKEMON } = require("../Constants/constants");
// const { v4: uuidv4 } = require('uuid');
const db = require("../db");

async function getAllPokemons(req, res) {
    let type;
    let name = req.query.name;
    
    if(name) {
        try {
            var lower = name.toLowerCase();
            const dataBase = await Pokemon.findOne({
                where:{
                    name: lower.charAt(0).toUpperCase() + lower.slice(1)
                },
                include: Type
            })
            if(dataBase) {
                if(dataBase.types.length === 1) {
                    type = dataBase.types[0].name;
                } else {
                    type = dataBase.types[0].name + " " + dataBase.types[1].name;
                }
                var pokeDb ={
                    name : dataBase.name.charAt(0).toUpperCase() + dataBase.name.slice(1),
                    id: dataBase.id,
                    types: type,
                    height: dataBase.height,
                    weight: dataBase.weight,
                    image: "https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg",
                    hp: dataBase.hp,
                    attack: dataBase.attack,
                    defense: dataBase.defense,
                    speed: dataBase.speed
      
                } 
                return res.send(pokeDb);
            } else {

                let api = await axios.get(`${URL}${POKEMON}/${lower}`); 
                if(api) {
                    if(api.data.types.length === 1) {
                        type = api.data.types[0].type.name;
                    } else {
                        type = api.data.types[0].type.name + " " + api.data.types[1].type.name;
                    }
                
                    var pokeApi = {
                        name: api.data.name.charAt(0).toUpperCase() + api.data.name.slice(1),
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
                    return res.send(pokeApi);
            }
            }
        
        } catch (error) {
         return res.status(404).send({error: "Pokemon not found :("});
        }
  
    }  else {
        try {
             const first = await axios.get(`${URL}${POKEMON}`);
            const next = await axios.get(first.data.next);
            const api40 = first.data.results.concat(next.data.results);
            const response = await Promise.all(api40.map(async pokemon => {
                let url = await axios.get(pokemon.url)
                if(url.data.types.length === 1) {
                    type = url.data.types[0].type.name;
                } else {
                    type = url.data.types[0].type.name + " " + url.data.types[1].type.name
                }
                return  {
                    name: url.data.name.charAt(0).toUpperCase() + url.data.name.slice(1),
                    image: url.data.sprites.other.dream_world.front_default,
                    id: url.data.id, 
                    types: type
                }
                
            })) 
            var dataBase = await Pokemon.findAll({
                include: {
                    attributes: ['name'],
                    model: Type,
                    through: {
                        attributes: [],
                    }
                }
            })
             const pokeDb = dataBase.reverse().map(result => {
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
            var result = pokeDb.concat(response); 
        } catch(error) {
            return res.send('ERROR');
        }
    return res.send(result);  
    // return res.send(dataBase); 
    }
  }
  

async function addPokemon(req, res) {   
  const { name, image, types, height, weight, hp, attack, defense, speed } =  req.body;
  if (!name) {
    return res.status(400).json({ error: "notNull Violation: It requires a valid name" });
  } 
    try {
        
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
        await createPokemon.addTypes(req.body.types, { through: 'pokemon_type'});
        const pokeType = await Pokemon.findOne({
            where: {name: req.body.name},
            include: Type
        })
        return res.json(pokeType);
    }  catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
  
}


async function getPokemonById(req, res) {
    let type;
    let id = req.params.id; 
    if(id) {
        try {
            if(!id.includes('-')) {
                var api = await axios.get(`${URL}${POKEMON}/${id}`);
                if(api?.data.types.length === 1) {
                    type = api.data.types[0].type.name;
                } else {
                    type = api.data.types[0].type.name + " " + api.data.types[1].type.name;
                }

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
                
                if(!dataBase) {
                    return res.status(404).send({message: 'Pokemon don´t found'})
                }
                return res.send(dataBase);
                
            }
           
        } catch (error) {
            return res.status(404).send({message: 'Bad Request'})
        }
    }
}

// async function dbPokemon(req,res, next){
//     try {
//         const first = await axios.get(`${URL}${POKEMON}`);
//         const second = await axios.get(first.data.next);
//         const api40 = first.data.results.concat(second.data.results);
//         var response = await Promise.all(api40.map(async pokemon => {
//             let url = await axios.get(pokemon.url)
            
//             console.log('RESPONSE: ', response);
//             return  {
//                 name: url.data.name.charAt(0).toUpperCase() + url.data.name.slice(1),
//                 image: url.data.sprites.other.dream_world.front_default,
//                 id: url.data.id, 
//                 types: url.data.types.map(tipo => {
//                     return {name: tipo.type.name}
//                 }),  
//                 height: url.data.height,
//                 weight: url.data.weight,
//                 hp: url.data.stats[0].base_stat,
//                 attack: url.data.stats[1].base_stat,
//                 defense: url.data.stats[2].base_stat,
//                 speed: url.data.stats[5].base_stat
//             }
            
//         }))
//         console.log(response);

//         for(let i of response){
//             const id = uuidv4();
//             var pokeFinal = await Pokemon.create({name: i.name, id:id, image: i.image, api: true, height: i.height, weight: i.weight, hp: i.hp, attack: i.attack, defense: i.defense, speed: i.speed})
//             await pokeFinal.setTypes(i.types.name);
//            /*  if(response.data.types.length === 1) {
//                 await pokeFinal.setTypes(i.types[0].id);  type = api.data.types[0].type.name;
//             } else {
//                 type = api.data.types[0].type.name + " " + api.data.types[1].type.name;
//             } */
//         }

        
//     }catch(error){
//         console.log(error);
//         next(error)
        
//     }
//     return  res.send('pokemon created ok');
   
// }

module.exports = {
  getAllPokemons,
  addPokemon,
  getPokemonById,
//   dbPokemon
};
