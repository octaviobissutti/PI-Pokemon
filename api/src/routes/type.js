const { Router } = require('express');
const { getAllTypes} = require('../Controllers/type');
const router = Router();


router.get('/', getAllTypes);


module.exports = router;