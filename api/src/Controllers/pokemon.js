const { Pokemon, Type } = require("../db");
const axios = require("axios");
const { URL, POKEMON } = require("../Constants/constants");
const { v4: uuidv4 } = require('uuid');
const db = require("../db");

async function getAllPokemons(req, res) {
    // let type;
    let name = req.query.name;
    
    if(name) {
        try {
            var lower = name.toLowerCase();
             const dataBase = await Pokemon.findOne({
                where:{
                    name: lower
                },
                include: [Type]
            })

            if(dataBase) {
                // if(dataBase.types.length === 1) {
                //     type = dataBase.types[0].name; 
                // } else {
                //     type = dataBase.types[0].name + " " + dataBase.types[1].name;
                // }
                let type = dataBase.types.map((el) => el.name)
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
                console.log('POKEDB--> ', pokeDb)
                return res.send(pokeDb);
            } else {

                let api = await axios.get(`${URL}${POKEMON}/${lower}`); 
                if(api) {
                    // if(api.data.types.length === 1) {
                    //     type = api.data.types[0].type.name;
                    // } else {
                    //     type = api.data.types[0].type.name + " " + api.data.types[1].type.name;
                    // }
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
                // if(url.data.types.length === 1) {
                //     type = url.data.types[0].type.name;
                // } else {
                //     type = url.data.types[0].type.name + " " + url.data.types[1].type.name
                // }
                let type = url.data.types.map(el => el.type.name)
                return  {
                    name: url.data.name.charAt(0).toUpperCase() + url.data.name.slice(1),
                    image: url.data.sprites.other.dream_world.front_default,
                    id: url.data.id, 
                    types: type,
                    attack: url.data.stats[1].base_stat
                }
                
            })) 
            var dataBase = await Pokemon.findAll({
                include: [Type]
            });

             const pokeDb = dataBase.reverse().map(result => {
                // if(result.types.length === 1) {
                //     type = result.types[0].name;
                // } else {
                //     type = result.types[0].name + " " + result.types[1].name;
                // }
                let type = result.types.map(el => el.name);
                return {
                    name: result.name.charAt(0).toUpperCase() + result.name.slice(1),
                    image: "https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg",
                    id: result.id,
                    types: type,
                    attack: result.attack
                }
  
            }) 
            var result = pokeDb.concat(response); 
            console.log('RESULT: ', result.length);
            let caso  = req.query.caso;
            console.log('REQ.QUERY.CASO : ', req.query.caso);
            if(caso) {
                console.log('CASO :', caso);
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
    // return res.send(dataBase); 
    }
  }
  

// async function addPokemon(req, res) {   
//   const { name, image, types, height, weight, hp, attack, defense, speed } =  req.body;
//   var prueba = [];
//   if (!name) {
//     return res.status(400).json({ error: "notNull Violation: It requires a valid name" });
//   } 
//     try {
        
//         const createPokemon = await Pokemon.create({
//           name: name,
//           image: image,
//           types: types, 
//           height: height,
//           weight: weight,
//           hp: hp,
//           attack: attack,
//           defense: defense,
//           speed: speed,
//         });
        
//         await createPokemon.addTypes(req.body.types, { through: 'pokemon_type'});
//         // await createPokemon.setTypes(types)
//         const pokeType = await Pokemon.findOne({
//             where: {name: req.body.name},
//             include: { model: Type}
//         })
//         return res.json(pokeType);
//     }  catch (error) {
//         console.log(error);
//         res.status(500).send('Internal Server Error')
//     }
  
// };

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
        console.log('CREATEDPOKE: ', createdPoke);
        await createdPoke.setTypes(data.types);
        // await createdPoke.addTypes(req.body.types2, { through: 'pokemon_type' });
       
        return res.json({message: 'Pokemon created succesfully', pokemon: createdPoke});
    }
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error')
    }
};








async function getPokemonById(req, res) {
    // var type;
    let id = req.params.id; 
    if(id) {
        try {
            if(!id.includes('-')) {
                var api = await axios.get(`${URL}${POKEMON}/${id}`);
                // if(api?.data.types.length === 1) {
                //     type = api.data.types[0].type.name;
                // } else {
                //     type = api.data.types[0].type.name + " " + api.data.types[1].type.name;
                // }
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

                // if(dataBase.types.length === 1) {
                //     type = dataBase.types[0].name;
                // } else {
                //     type = dataBase.types[0].name + " " + dataBase.types[1].name;
                // }
                let type = dataBase.types.map(el => el.name);
                var finalPokemon ={
                    name : dataBase.name.charAt(0).toUpperCase() + dataBase.name.slice(1),
                    id: dataBase.id,
                    image: "https://i.playboard.app/p/AAUvwngrNsz0VgH-cA-girh64i7q941e6mxWACzbtr7a0A/default.jpg",
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
