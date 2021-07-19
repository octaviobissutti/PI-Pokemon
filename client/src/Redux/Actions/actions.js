import {
    GET_POKEMONS,
    GET_TYPES,
    SEARCH_POKEMONS,
    GET_ID,
    ADD_POKEMON,
    FILTER_POKEMON
} from '../constants';

import axios from 'axios';

//Obteniendo todos los juegos.
export const getAllPokemons = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:3001/pokemon");
        dispatch({
            type: GET_POKEMONS,
            payload: res.data
        });
    } catch (err) {
        console.log(err) 
    }
 };


 //Obteniendo los types.
export const getAllTypes = () => async (dispatch) => {
    try {
        const res = await axios.get("http://localhost:3001/type");
        dispatch({
            type: GET_TYPES,
            payload: res.data
        });
    } catch (err) {
        console.log(err)
    }
};

//Buscando pokemon por query.
export const getByName = (name) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/pokemon?name=${name}`);
        dispatch({
            type: SEARCH_POKEMONS,
            payload: res.data
        });
    } catch(err) {
        console.log(err)
    }
};

//Buscando pokemon por id.
export const getById = (id) => async (dispatch) => {
    try {
        const res = await axios.get(`http://localhost:3001/pokemon/${id}`);
    dispatch({
        type: GET_ID,
        payload: res.data
    });
    } catch(err) {
    console.log(err)
   } 
};

//Crear pokemon.
export const addPokemon = (pokemon) => async (dispatch) => {
    try {
        const res = await axios.post("http://localhost:3001/pokemon", pokemon);
        dispatch({
            type: ADD_POKEMON,
            payload: res.data
        });
    } catch(err) {
        console.log(err)
    }
};

//Filtrado por api y base de datos.
export const filterPoke = (source, array) => (dispatch) => {
    if(source === 'api') {
        const res = array.filter(c => typeof c.id === 'number')
        dispatch({type: FILTER_POKEMON, payload: [...res]})
       };

    if(source === 'db') {
        const res = array.filter(c => typeof c.id === 'string')
        dispatch({type: FILTER_POKEMON, payload: [...res]})
    };

    if(source === 'all') {
        dispatch({type: FILTER_POKEMON, payload: [...array]})
      };

    if(source === 'null') {
        dispatch({type: FILTER_POKEMON, payload: []})
      };
};

//Ordenamiento alfábetico y por fuerza.
export const orderOption = (option, array) => (dispatch) => {
    if(option === 'az') {
      const one = array.sort((a, b) => {
        const first = a.name;
        const last = b.name;
        if(first < last ){
          return -1;
        } 
        if(first > last) {
          return 1;
        } else {
          return 0;
        }
        
      })
      dispatch({type: FILTER_POKEMON, payload:[...one]})
    }
    if(option === 'za') {
      const two = array.sort((a, b) => {
        const first = a.name;
        const last = b.name;
        if(first > last ){
          return -1;
        } 
        if(first < last) {
          return 1;
        } else {
          return 0;
        }
      }) 
      dispatch({type: FILTER_POKEMON, payload:[...two]}) 
    }
    if(option === 'attack+'){
      const attack = array.sort((a,b) => b.attack - a.attack)
      dispatch({type: FILTER_POKEMON, payload:[...attack]}) 
    }
    
    if(option === 'attack-'){
      const attack = array.sort((a,b) => a.attack - b.attack)
      dispatch({type: FILTER_POKEMON, payload:[...attack]}) 
    }
    if(option === 'null') {
      dispatch({type: FILTER_POKEMON, payload: []})
    }
    
  }


export function clearPokemon() {
    return {
        type: SEARCH_POKEMONS,
        payload: undefined
    }
};

