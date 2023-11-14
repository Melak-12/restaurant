const express = require('express');
const router = express.Router();
const { getFoods, postFoods, putFoods, deleteFoods } = require('../controllers/productControllers')
router.get('/', getFoods)

router.post('/', postFoods)
router.put('/:id', putFoods)
router.delete('/:id', deleteFoods)

module.exports = router;