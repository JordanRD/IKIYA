const { asyncQuery, hash } = require('../helpers/queryHelper')
const { validationResult } = require('express-validator')
const transporter = require('../helpers/nodemailerHelper')
const fs = require('fs')
const handlebars = require('handlebars')
const { createToken, checkToken, createRefreshToken } = require('../helpers/jwtHelper')


const cartQuery = `SELECT
                    p.id_product,
                    o.id_order,
                    od.qty,
                    p.name,
                    p.price,
                    ps.stock ,
                    pi.image,
                    p.id_product_status
                FROM
                    order_details od
                        JOIN
                    orders o ON o.id_order = od.id_order
                        JOIN
                    products p ON p.id_product = od.id_product
                        JOIN
                    product_images pi ON pi.id_product = p.id_product
                        JOIN
                    (SELECT
                        id_product, SUM(stock-purchased_stock) stock
                    FROM
                        storages
                    GROUP BY id_product) ps ON ps.id_product = p.id_product
                WHERE
                    o.id_user = ? and o.id_order_status=1
                GROUP BY id_product`

const getWishlist = `
SELECT
    p.id_product,
    p.name,
    p.price,
    pi.image,
    p.id_product_status=1 and ss.total>0 is_available
FROM
    wishlists w
        JOIN
    products p ON p.id_product = w.id_product
        JOIN
    (SELECT
        *
    FROM
        product_images
    GROUP BY id_product) pi ON pi.id_product = w.id_product
        JOIN
    (SELECT
        id_product storage_product,
            SUM(stock - purchased_stock) total
    FROM
        storages
    GROUP BY id_product) ss ON ss.storage_product = p.id_product
    where id_user=? order by is_available desc
`

module.exports = {

    login: async ({ body }, res) => {
        try {
            // console.log(ress)
            const { username, password } = hash(body)
            const query = [
                'select id_user,username,id_status,id_role,email,profile_picture,id_active_status from users where password=? and (username=? or email=?)',
                'select * from address where id_user=?',
            ]

            console.log(password)
            const [result1] = await asyncQuery(query[0], [password, username, username])

            if (!result1) return res.status(400).send('wrong username or password')
            if (result1.id_active_status !== 1) return res.status(400).send('account is not-active')
            const result2 = await asyncQuery(query[1], [result1.id_user])
            const cart = await asyncQuery(cartQuery, [result1.id_user])
            const wishlist = await asyncQuery(getWishlist, [result1.id_user])
            const token = createToken({ id_user: result1.id_user, username: result1.username })
            // console.log(token)
            const refresh_token = createRefreshToken({ id_user: result1.id_user, username: result1.username })
            // console.log(refresh_token)
            res.status(200).send({ ...result1, address: result2, token, cart, wishlist, refresh_token })
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    keepLogin: async ({ user }, res) => {
        try {
            // console.log(user)
            const query = [
                'select id_user,username,id_status,id_role,email,profile_picture,id_active_status from users where id_user=? and username=? ',
                'select * from address where id_user=?',
                'select * from wishlists w join products p on p.id_product=w.id_product join (select * from product_images group by id_product) pi on pi.id_product=w.id_product where id_user=? '
            ]
            // console.log('keeplogin',user)
            const [result1] = await asyncQuery(query[0], [user.id_user, user.username])
            // console.log(result1)
            if (!result1) return res.status(400).send('user not found')
            if (result1.id_active_status !== 1) return res.status(400).send('account is not-active')
            const address = await asyncQuery(query[1], [user.id_user])
            const cart = await asyncQuery(cartQuery, [user.id_user])
            const wishlist = await asyncQuery(getWishlist, [user.id_user])
            // console.log(address)
            res.status(200).send({ ...result1, address, cart, wishlist })
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    forgotPassword: async (req, res) => {
        const { email, username } = req.body
        try {
            const query = 'SELECT username,password FROM users WHERE email=? AND username =?'

            const [result] = await asyncQuery(query, [email, username])
            if (!result) return res.status(400).send(`email for ${username} is not ${email} please use the registered email`)
            // console.log('haha')
            const option = {
                from: 'Ikiya <ikiya@gmail.com>',
                to: email,
                subject: 'Forgot Password',
            }

            const file = fs.readFileSync('./templates/userResetPassword.handlebars').toString()
            const template = handlebars.compile(file)

            const { password } = result

            const random = Math.floor(Math.random() * (password.length - 5))

            const code = password.substr(random, 4)
            const matchPassword = password.substr(0, random) + ';' + password.substr(random + 4)

            console.log(code, matchPassword)

            const token = createToken({ username, password: matchPassword }, '5m')
            option.html = template({ username, code, link: `http://localhost:3000/forgot/${token}` })

            transporter.sendMail(option)

            res.status(200).send(token)
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    resetPassword: async (req, res) => {
        const isValid = validationResult(req)
        try {
            const { username, password } = req.user
            const { code, password: newPassword } = hash(req.body)

            const query = [
                'select * from users where username=? and password=?',
                'update users set password=? where username=?'
            ]
            const [result1] = await asyncQuery(query[0], [username, password.replace(';', code)])
            console.log(code)
            console.log(password)
            console.log(result1)
            if (!result1) return res.status(400).send('Invalid verification code')

            if (!isValid.isEmpty()) return res.status(400).send(isValid.array().map(i => i.msg).join(', '))

            const result2 = await asyncQuery(query[1], [newPassword, username])

            res.status(200).send(result2)

        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || 'something wrong in our server please try again later')
        }
    },
    editAddress: async (req, res) => {
        const { address_detail, id_user, id_address } = req.body
        try {
            const query = 'update address set address_detail=? where id_user=? and id_address=?'
            await asyncQuery(query, [address_detail, id_user, id_address])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    addAddress: async (req, res) => {
        try {
            const { lat, lng, id_user, label, address_detail, postal_code, city } = req.body
            console.log(req.body)
            const query = 'insert into address (label,address_detail,id_user,postal_code,city,lat,lng) values(?)'

            const addAddressInfo = await asyncQuery(query, [[label, address_detail, id_user, postal_code, city, lat, lng]])

            res.status(200).send(addAddressInfo)
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    deleteAddress: async ({ params }, res) => {
        try {
            const query = 'delete from address where id_address = ?'
            const result = await asyncQuery(query, [params.id_address])
            res.status(200).send(result)
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    register: async (req, res) => {
        const isValid = validationResult(req)
        if (!isValid.isEmpty()) return res.status(400).send(isValid.array().map(i => i.msg).join(', '))
        const { username, email, password } = hash(req.body)
        try {
            const query = [
                'select * from users where username =?',
                'insert into users (username,email,password,id_role,id_status) values (?)',
                'select id_user,username,id_status,id_role,email from users where username =?'
            ]
            const [result1] = await asyncQuery(query[0], [username])
            if (result1) return res.status(400).send('Username is taken')
            const result2 = await asyncQuery(query[1], [[username, email, password, 1, 1]])
            if (!result2.insertId) return res.status(400).send('something wrong in our server please try again later')
            const option = {
                from: 'Ikiya <ikiya@gmail.com>',
                to: email,
                subject: 'Verify email address',
            }

            const file = fs.readFileSync('./templates/userVerification.handlebars').toString()
            const template = handlebars.compile(file)
            const token = createToken({ username, password }, '15m')
            option.html = template({ username, password, link: 'http://localhost:3000/verify/' + token })
            transporter.sendMail(option);
            res.status(200).send('Register success! We have sent a verification message please check your email')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    verifyUser: async ({ user }, res) => {
        try {
            const query = 'update users set id_status=2 where username =? and password=?'
            await asyncQuery(query, [user.username, user.password])
            res.status(200).send('You are verified!')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    resendEmailVerification: async ({ body }, res) => {
        try {
            const query = 'select username,password,email from users where username=?'
            const [{ username, password, email }] = await asyncQuery(query, [body.username])
            const option = {
                from: 'Ikiya <ikiya@gmail.com>',
                to: email,
                subject: 'Verify email address',
            }
            const file = fs.readFileSync('./templates/userVerification.handlebars').toString()
            const template = handlebars.compile(file)
            const token = createToken({ username, password }, '15m')
            option.html = template({ username, password, link: 'http://localhost:3000/verify/' + token })
            transporter.sendMail(option);
            res.status(200).send('We have sent an email verification please check your email')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    uploadProfilePicture: async ({ file, body }, res) => {
        try {
            const query = 'update users set profile_picture=? where id_user=?'
            console.log(file)
            res.status(200).send('success')
            await asyncQuery(query, [`images/users/${file.filename}`, body.id_user])
        } catch (error) {
            res.status(200).send(error.message || error.sqlMessage || error);
        }
    },
    deleteProfilePicture: async ({ params }, res) => {
        try {
            const query = 'update users set profile_picture=NULL where id_user=?'
            await asyncQuery(query, [params.id_user])
            res.status(200).send('success')
        } catch (error) {
            res.status(200).send(error.message || error.sqlMessage || error);
        }
    },
    checkToken: async (req, res) => {
        try {
            checkToken(req.params.token)
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error.name)
        }
    },
    deactivateAccount: async (req, res) => {
        try {
            const query='update users set id_active_status=2 where id_user=?'
            await asyncQuery(query,[req.user.id_user])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send('failed')
        }
    }
}

