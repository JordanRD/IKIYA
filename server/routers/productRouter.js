const router = require('express').Router();

const { getAllProduct, getProductById,getCategory,getCarousel } = require('../controllers').productController

router.post('/get', getAllProduct)
router.get('/get/:id_product', getProductById)
router.get('/categories', getCategory)
router.get('/carousel', getCarousel)
module.exports = router