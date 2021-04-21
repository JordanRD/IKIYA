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
    addStore,
    deleteStore,
    getAllUsers,
    editUser
} = require('../controllers').adminController

const { uploadProductImages } = require('../helpers/multerHelper')

router.get('/getMoveProduct/:id_product', getMoveProductData)
router.get('/storeProductDetails', storeProductDetails)
router.get('/getProduct/:id_product', getProductById)
router.get('/orders/:id_order_status', getAllOrder)
router.get('/storeDetails',storeDetails)
router.get('/getStock', getStockData)
router.get('/stores', getStores)
router.get('/users', getAllUsers)

router.post('/editProduct', uploadProductImages(), editProduct)
router.post('/addProduct', uploadProductImages(), addProduct)
router.post('/getProduct', getAllProduct)
router.post('/addCategory', addCategory)
router.post('/addStock', addStockData)
router.post('/addStore', addStore)

router.patch('/restoreProduct/:id_product', restoreProduct)
router.patch('/editCategory',editCategory)
router.patch('/editStock', editStockData)
router.patch('/moveStock', moveStock)
router.patch('/editUser', editUser)

router.delete('/deleteCategory/:id_category', deleteCategory)
router.delete('/deleteProduct/:id_product', deleteProduct)
router.delete('/deleteStock', deleteStockData)
router.delete('/deleteStore/:id_store', deleteStore)

module.exports = router