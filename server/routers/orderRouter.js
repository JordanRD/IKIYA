const router = require('express').Router();

const { checkout, confirmPayment, getPayment, cancelOrder, confirmOrder, completeOrder} = require('../controllers').orderController

const { uploadPayment}=require('../helpers/multerHelper')

const { verifiedUserAuthorization,userAuthorization,adminAuthorization } = require('../helpers/jwtHelper')


router.post('/confirmPayment', uploadPayment(), confirmPayment)
router.get('/getPayment/:id_order', getPayment)

router.use(userAuthorization)
router.use(verifiedUserAuthorization)

router.post('/checkout', checkout)
router.post('/cancelOrder', cancelOrder)
router.post('/complete/:id_order', completeOrder)

router.use(adminAuthorization)

router.post('/confirmOrder/:id_order', confirmOrder)

module.exports=router