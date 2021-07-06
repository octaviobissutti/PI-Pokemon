const { Router } = require('express');
const { getAllPokemons, addPokemon } = require('../Controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);
router.post('/', addPokemon);




module.exports = router;






