const { Router } = require('express');
const { getAllPokemons, data} = require('../Controllers/pokemon');
const router = Router();

router.get('/', getAllPokemons);
router.get('/', data);



module.exports = router;






