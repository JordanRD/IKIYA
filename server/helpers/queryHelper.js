const db=require('../database')
const util = require('util')
const cryptojs=require('crypto-js')

module.exports = {
    asyncQuery: util.promisify(db.query).bind(db),
    hash: (body) => {
        if (body.password) body.password = cryptojs.HmacMD5(body.password, 'secret').toString()
        return body
    }
}


// const hash= (body) => {
//     if (body.password) body.password = cryptojs.HmacMD5(body.password, 'secret').toString()
//     return body
// }
// console.log(hash({password:'Jordan123'}))