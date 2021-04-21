const jwt = require('jsonwebtoken');
const { asyncQuery } = require('./queryHelper')
const accessTokenKey = 'secret'
const refreshTokenKey = 'key'
module.exports = {
    createToken: (data, expiresIn = '3m') => jwt.sign(data, accessTokenKey, { expiresIn }),
    createRefreshToken: (data, expiresIn = '7d') => jwt.sign(data, refreshTokenKey, { expiresIn }),
    getAccessToken: async (req, res) => {
        try {
            console.log(req.headers)
            const { id_user, username } = jwt.verify(req.headers['refresh_token'], refreshTokenKey)
            console.log(id_user, username)
            const query = 'select id_user,username from users where id_user=? and username=?'
            const [result] = await asyncQuery(query, [id_user, username])
            console.log(result)
            if (!result) return res.status(401).send('Invalid token')
            const accessToken = jwt.sign({ id_user: result.id_user, username: result.username }, accessTokenKey, { expiresIn: '3m' })
            console.log(accessToken)
            res.status(200).send({ token: accessToken })
        } catch (error) {
            console.log(error)
            res.status(401).send(error.name === 'TokenExpiredError' ? 'Link expired' : error.message)
        }
    },
    verifyToken: async (request, response, next) => {
        const token = request.body.token
        if (!token) return response.status(400).send('no token')
        try {
            // verify
            const result = jwt.verify(token, accessTokenKey)
            request.user = result
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.name === 'TokenExpiredError' ? 'Link expired' : error.message)
        }
    },
    checkToken: (token) => {
        try {
            jwt.verify(token, accessTokenKey)
            return 'success'
        } catch (error) {
            throw error
        }
    },
    userAuthorization: async (request, response, next) => {
        const token = request.headers.authorization
        // console.log(request.headers.authorization)
        if (!token) return response.status(400).send('user not found')
        try {
            const { id_user, username } = jwt.verify(token, accessTokenKey)
            const query = 'select * from users where id_user=? and username=? '
            const [result] = await asyncQuery(query, [id_user, username])
            if (!result) return response.status(400).sendd('user not found')
            if (result.id_active_status !== 1) return response.status(400).sendd('account is not active')
            // console.log(result)
            request.user = result
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.sqlMessage || error.message || error)
        }
    },
    adminAuthorization: async (request, response, next) => {
        const { id_role, id_status } = request.user
        try {
            if (id_role !== 2 || id_status !== 2) return response.status(400).send('not an admin')
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.sqlMessage || error.message || error)
        }
    },
    verifiedUserAuthorization: async (request, response, next) => {
        const { id_status, } = request.user
        try {
            if (id_status !== 2) return response.status(400).send('not a verified user')
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.sqlMessage || error.message || error)
        }
    },
}

