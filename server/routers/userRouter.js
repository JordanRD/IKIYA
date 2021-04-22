const router = require('express').Router();

const { forgotPassword, resetPassword, login,changeEmail, keepLogin,deactivateAccount, addAddress,checkToken,changePassword,logout, deleteAddress, deleteProfilePicture, resendEmailVerification, uploadProfilePicture, register, verifyUser, editAddress } = require('../controllers').userController
const { editValidator, registerValidator,emailValidator } = require('../validators')
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
router.delete('/logout', logout)

router.patch('/editAddress', editAddress)
router.patch('/deactivate', deactivateAccount)
router.patch('/changePassword', editValidator, changePassword)
router.patch('/changeEmail', emailValidator, changeEmail)


module.exports = router