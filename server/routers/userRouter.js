const router = require('express').Router();

const { forgotPassword, resetPassword, login, keepLogin, addAddress,checkToken, deleteAddress, deleteProfilePicture, resendEmailVerification, uploadProfilePicture, register, verifyUser, editAddress } = require('../controllers').userController
const { editValidator, registerValidator } = require('../validators')
const { verifyToken,userAuthorization } = require('../helpers/jwtHelper')
const { uploadProfile } = require('../helpers/multerHelper')

router.post('/register', registerValidator, register)
router.post('/resend', resendEmailVerification)
router.post('/forgot', forgotPassword)
router.post('/login', login)
router.post('/checkToken/:token', checkToken)

router.patch('/reset', editValidator, verifyToken, resetPassword)
router.patch('/verify', verifyToken, verifyUser)

router.use(userAuthorization)

router.post('/uploadProfilePicture', uploadProfile(), uploadProfilePicture)
router.post('/addAddress', addAddress)
router.post('/keepLogin', keepLogin)

router.delete('/deleteProfilePicture/:id_user', deleteProfilePicture)
router.delete('/deleteAddress/:id_address', deleteAddress)

router.patch('/editAddress', editAddress)

module.exports = router