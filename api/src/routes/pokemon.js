const { Router } = require('express');
const { getAllPokemons, addPokemon, getPokemonById } = require('../Controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);
router.post('/', addPokemon);
router.get('/:id', getPokemonById); 


module.exports = router;
