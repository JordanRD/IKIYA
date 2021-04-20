const router = require('express').Router();

const { addToCart, editCartQty, } = require('../controllers').cartController


router.patch('/edit', editCartQty)

router.post('/add', addToCart)

module.exports=router