const router = require('express').Router();

const { forgotPassword, resetPassword, login, keepLogin, addAddress, deleteAddress, deleteProfilePicture, resendEmailVerification, uploadProfilePicture, register, verifyUser, editAddress } = require('../controllers').userController
const { editValidator, registerValidator } = require('../validators')
const { verifyToken } = require('../helpers/jwtHelper')
const { uploadProfile } = require('../helpers/multerHelper')
router.post('/forgot', forgotPassword)
router.post('/login', login)
router.post('/addAddress', addAddress)
router.delete('/deleteAddress/:id_address', deleteAddress)
router.post('/keepLogin', verifyToken, keepLogin)
router.patch('/reset', editValidator, verifyToken, resetPassword)
router.post('/register', registerValidator, register)
router.patch('/verify', verifyToken, verifyUser)
router.post('/resend', resendEmailVerification)
router.patch('/editAddress', editAddress)
router.post('/uploadProfilePicture', uploadProfile(), uploadProfilePicture)
router.delete('/deleteProfilePicture/:id_user', deleteProfilePicture)
module.exports = router