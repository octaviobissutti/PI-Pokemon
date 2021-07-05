const { Router } = require('express');
const { getAllPokemons, data, addPokemon} = require('../Controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);
router.get('/', data);
router.post('/', addPokemon);




module.exports = router;






