const jwt = require('jsonwebtoken');
const { asyncQuery } = require('./queryHelper')
const key = 'secret'
module.exports = {
    createToken: (data,expiresIn='30d') => jwt.sign(data, key,{expiresIn}),
    verifyToken: async (request, response, next) => {
        const token = request.body.token
        if (!token) return response.status(400).send('no token')
        try {
            // verify
            const result = jwt.verify(token, key)
            request.user = result
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.name ==='TokenExpiredError'?'Link expired':error.message)
        }
    },
    checkToken: (token) => {
        try {
            jwt.verify(token, key)
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
            const { id_user, username } = jwt.verify(token, key)
            const query = 'select * from users where id_user=? and username=?'
            const [result] = await asyncQuery(query, [id_user, username])
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

