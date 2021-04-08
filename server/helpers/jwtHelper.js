const jwt = require('jsonwebtoken');
const {asyncQuery}=require('./queryHelper')
const key='secret'
module.exports = {
    createToken: data => jwt.sign(data, key),
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
            response.status(400).send(error.message || error)
        }
    },
    userAuthorization: async (request, response, next) => {
        const token = request.headers.Authorization
        if (!token) return response.status(400).send('no token')
        try {
            const {id_user,username} = jwt.verify(token, key)
            const query='select * from users where id_user=? and username=?'
            const result = await asyncQuery(query, [id_user,username])
            request.user = result
            next()
        } catch (error) {
            console.log(error)
            response.status(400).send(error.message || error)
        }
    }
}

