const router = require('express').Router();

const { addWishlist,deleteWishlist } = require('../controllers').wishlistController

router.post('/add', addWishlist)
router.delete('/delete', deleteWishlist)
module.exports = router