const { body } = require('express-validator')


module.exports = {
    editValidator : [
        body('password')
            .matches(/.{6,}/)
            .withMessage('password length must be at least 6 characters')
            .matches(/[a-z]/)
            .withMessage('password must contain lowercase')
            .matches(/[A-Z]/)
            .withMessage('password must contain uppercase')
            .matches(/^\S+$/)
            .withMessage('password can not contain spaces')
    ],
    emailValidator: [
        body('email')
            .optional()
            .isEmail()
            .withMessage('invalid email'),
    ],
    registerValidator : [
        body('username')
            .matches(/\w{4,}/)
            .withMessage('username can not contain spaces or symbol min 4 characters'),
        body('email')
            .isEmail()
            .withMessage('invalid email'),
        body('password')
            .matches(/.{6,}/)
            .withMessage('password length must be at least 6 characters')
            .matches(/[a-z]/)
            .withMessage('password must contain lowercase')
            .matches(/[A-Z]/)
            .withMessage('password must contain uppercase')
            .matches(/^\S+$/)
            .withMessage('password can not contain spaces')
    ]
}