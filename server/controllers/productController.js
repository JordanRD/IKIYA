const { asyncQuery } = require('../helpers/queryHelper')

module.exports = {
    getAllProduct: async ( req, res) => {
        try {
            const { perPage = 7, page = 0, orderBy = 'default',id_category,search } = req.body
            // console.log(req)
            const option = {
                priceAsc:'p.price ASC',
                priceDesc: 'p.price DESC',
                nameAsc: 'p.name ASC',
                nameDesc: 'p.name DESC',
                default:'p.id_product'
            }
            let byCategory=''
            if (id_category) {
                byCategory='AND p.id_category='+id_category
            }
            let bySearch = ''
            if (search) {
                bySearch = `AND(p.description REGEXP '${search}' or  p.name REGEXP '${search}' or c.category REGEXP '${search}') `
            }
            let order = option[orderBy]||option.default
            const sqlQuery = `  SELECT
                                    SUM(s.stock - s.purchased_stock) total,
                                    p.*,
                                    c.category,
                                    pi.image
                                FROM
                                    storages s
                                        JOIN
                                    products p ON p.id_product = s.id_product
                                        JOIN
                                    categories c ON c.id_category = p.id_category
                                        JOIN
                                    (SELECT
                                        id_product, image
                                    FROM
                                        product_images
                                    GROUP BY id_product) pi ON pi.id_product = p.id_product
                                GROUP BY s.id_product
                                HAVING total > 0 AND p.id_product_status=1 ${byCategory} ${bySearch}
                                ORDER BY ${order}
                                LIMIT  ?,?`

            const result = await asyncQuery(sqlQuery, [page * perPage, +perPage])
            // console.log(result)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    getProductById: async ({ params: { id_product }, query: { id_user } }, res) => {
        console.log(id_user, id_product)
        try {
            const query = [`
                        SELECT
                                p.*, c.category, group_concat(image separator ';') as images
                            FROM
                                products p
                                    JOIN
                                product_images pi USING(id_product)
                                    JOIN
                                categories c USING(id_category)
                            WHERE p.id_product=?
                                group by p.id_product
                            `,
                'select sum(stock-purchased_stock) stock from storages where id_product=?',
                'select qty from orders o join order_details od on od.id_order=o.id_order  where id_user = ? and id_product = ? and id_order_status = 1'
            ]
            

            const [result1] = await asyncQuery(query[0], [id_product])
            const [result2] = await asyncQuery(query[1], [id_product])
            const [result3] = await asyncQuery(query[2], [id_user, id_product])
            // console.log(result3)
            const constructedData = { ...result1, images: result1.images.split(';'), stock: result2.stock - (result3?.qty || 0), onCart: result3?.qty || 0 }
            res.status(200).send(constructedData)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    getCategory: async (_, res) => {
        try {
            const query = 'select * from categories'
            const result = await asyncQuery(query)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    getCarousel: async (_, res) => {
        try {
            const query = `
                        SELECT
                            image,
                            name,
                            description,
                            p.id_product,
                            SUM(stock - purchased_stock) total
                        FROM
                            products p
                                JOIN
                            (SELECT
                                *
                            FROM
                                product_images
                            GROUP BY id_product) pi ON pi.id_product = p.id_product
                                JOIN
                            storages s ON s.id_product = p.id_product
                            group by p.id_product
                            having total>0
                            order by p.price,p.name desc
    `
            const result = await asyncQuery(query)
            res.status(200).send(result.splice(Math.floor(Math.random() * (result.length-3)),5))
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    }
}