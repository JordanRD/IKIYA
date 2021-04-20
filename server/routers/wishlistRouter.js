const router = require('express').Router();

const { addWishlist, deleteWishlist } = require('../controllers').wishlistController

router.delete('/delete', deleteWishlist)

router.post('/add', addWishlist)

module.exports = router