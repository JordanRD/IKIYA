const db = require('../database')
const util = require('util')
const cryptojs = require('crypto-js')

module.exports = {
    asyncQuery: util.promisify(db.query).bind(db),
    hash: (body) => {
        if (Array.isArray(body)) {
            body=body.map(item => {
                if (item.password) {
                    item.password = cryptojs.HmacMD5(item.password, 'secret').toString()
                }
                return item
            })
        } else if (body?.password) {
            body.password = cryptojs.HmacMD5(body.password, 'secret').toString()
        }
        return body
    }
}


// const hash= (body) => {
//     if (body.password) body.password = cryptojs.HmacMD5(body.password, 'secret').toString()
//     return body
// }
// console.log(hash({password:'Jordan123'}))