const { Router } = require('express');
const { getAllPokemons} = require('../Controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);



module.exports = router;






