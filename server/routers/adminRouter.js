const router = require('express').Router();

const {
    getAllProduct,
    addCategory,
    deleteProduct,
    deleteCategory,
    restoreProduct,
    getProductById,
    editProduct,
    editCategory,
    getAllOrder,
    getStores,
    addProduct,
    getStockData,
    editStockData,
    deleteStockData,
    addStockData,
    getMoveProductData,
    moveStock,
    storeDetails,
    storeProductDetails,
    addStore
} = require('../controllers').adminController

const { uploadProductImages}=require('../helpers/multerHelper')
router.post('/getProduct', getAllProduct)
router.delete('/deleteProduct/:id_product', deleteProduct)
router.patch('/restoreProduct/:id_product', restoreProduct)
router.post('/addCategory', addCategory)
router.patch('/editCategory',editCategory)
router.delete('/deleteCategory/:id_category', deleteCategory)
router.get('/getProduct/:id_product', getProductById)
router.post('/editProduct', uploadProductImages(), editProduct)
router.post('/addProduct', uploadProductImages(), addProduct)
router.get('/orders/:id_order_status', getAllOrder)
router.get('/stores', getStores)
router.get('/getStock', getStockData)
router.patch('/editStock', editStockData)
router.delete('/deleteStock', deleteStockData)
router.post('/addStock', addStockData)
router.get('/getMoveProduct/:id_product', getMoveProductData)
router.patch('/moveStock', moveStock)
router.get('/storeDetails',storeDetails)
router.get('/storeProductDetails', storeProductDetails)
router.post('/addStore', addStore)
module.exports = router