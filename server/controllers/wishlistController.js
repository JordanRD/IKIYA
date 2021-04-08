const { asyncQuery } = require('../helpers/queryHelper')
 
module.exports = {
    addWishlist: async (req, res) => {
        const {id_user,id_product}=req.body
        try {
            const query = [
                'select * from wishlists where id_user=? and id_product=?',
                'insert into wishlists (id_product,id_user) values (?,?)'
            ]
            const [result] = await asyncQuery(query[0], [id_user, id_product])
            if(!result) await asyncQuery(query[1],[id_product, id_user])
            res.status(200).send('success')
        } catch (error) {
            console.log(error)
            res.status(500).send(error.messages||error.sqlMessage||error)
        }
    },
    deleteWishlist: async (req, res) => {
        const {id_user,id_product}=req.query
        try {
            const query = 'delete from wishlists where id_user=? and id_product=?'
            await asyncQuery(query, [id_user, id_product])
            // console.log(req.body)
            res.status(200).send('success')
        } catch (error) {
            console.log(error)
            res.status(500).send(error.messages||error.sqlMessage||error)
        }
    },
}