const express = require('express');
const router = express.Router();
const { getMenus, postMenus, putMenu, deleteMenu } = require('../controllers/menuController');

router.get('/', getMenus)

router.post('/', postMenus)
router.put('/:id', putMenu)
router.delete('/:id', deleteMenu)

module.exports = router;