import {
    GET_POKEMONS,
    GET_TYPES,
    SEARCH_POKEMONS,
    GET_ID,
    ADD_POKEMON
} from '../constants';


const initialState = {
    getPokemons: [],
    getTypes: [],
    searchPokemon: [],
    addPokemon: {},
    getDetails: [],

};

 const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
          return {
            ...state,
            getPokemons: action.payload,
          };
    
        case GET_TYPES:
          return {
            ...state,
            getTypes: action.payload,
          };
    
        case SEARCH_POKEMONS:
          return {
            ...state,
            getPokemons: action.payload,
          };
    
        case ADD_POKEMON:
          return {
            ...state,
            addPokemon: action.payload,
          };
        case GET_ID:
          return {
            ...state,
            getDetails: action.payload,
          };
          default:
            return state;
        }
}

export default rootReducer;