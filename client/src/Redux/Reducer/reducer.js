import {
    GET_POKEMONS,
    GET_TYPES,
    SEARCH_POKEMONS,
    GET_ID,
    ADD_POKEMON
} from '../constants';


const initialState = {
    getPokemons: [], //Me traigo los 40 pokemons.
    getTypes: [], //Cargo los 20 tipos.
    searchPokemon: {}, //Busco por query(searchBar).
    addPokemon: [], //Crear nuevo pokemon.
    getDetails: [], //Detalle pokemon.

};

 const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
          return {
            ...state,
            getPokemons: state.addPokemon.concat(action.payload),
          };
    
        case GET_TYPES:
          return {
            ...state,
            getTypes: action.payload,
          };
    
        case SEARCH_POKEMONS:
          return {
            ...state,
            searchPokemon: action.payload,
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