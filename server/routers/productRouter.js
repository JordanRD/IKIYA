const router = require('express').Router();

const { getAllProduct, getProductById,getCategory,getCarousel } = require('../controllers').productController

router.get('/get/:id_product', getProductById)
router.get('/categories', getCategory)
router.get('/carousel', getCarousel)

router.post('/get', getAllProduct)

module.exports = router