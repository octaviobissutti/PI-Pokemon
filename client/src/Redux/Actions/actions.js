import {
    GET_POKEMONS,
    GET_TYPES,
    SEARCH_POKEMONS,
    GET_ID,
    ADD_POKEMON
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
        const res = await axios.get("http://localhost:3001/pokemon", pokemon);
        dispatch({
            type: ADD_POKEMON,
            payload: res.data
        });
    } catch(err) {
        console.log(err)
    }
};

export function clearPokemon() {
    return {
        type: SEARCH_POKEMONS,
        payload: undefined
    }
};

