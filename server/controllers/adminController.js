const { asyncQuery } = require('../helpers/queryHelper')

module.exports = {
    getAllProduct: async (req, res) => {
        try {
            const { perPage = 7, page = 0, orderBy = 'default', id_category, search } = req.body
            // console.log(req)
            const option = {
                priceAsc: 'p.price ASC',
                priceDesc: 'p.price DESC',
                nameAsc: 'p.name ASC',
                nameDesc: 'p.name DESC',
                latest: 'p.id_product DESC',
                sold: 'st.sold DESC',
                available: 'p.id_product_status ASC',
                notAvailable: 'p.id_product_status DESC',
                default: 'p.id_product',
            }
            let byCategory = ''
            let bySearch = ''
            if (id_category) {
                console.log(id_category)
                byCategory = 'HAVING p.id_category=' + id_category
            }
            if (search) {
                bySearch = `where p.name REGEXP '${search}' or c.category REGEXP '${search}' `
            }

            let order = option[orderBy] || option.default
            const query = [
                ` SELECT
                                    p.*, c.category, pi.image,st.sold
                                FROM
                                    products p 
                                        LEFT JOIN
                                    (SELECT
                                        id_product, sum(qty) sold
                                            FROM
                                                orders o
                                                    JOIN
                                                order_details od ON od.id_order = o.id_order
                                                where o.id_order_status=5
                                            group by od.id_product
                                            ) st
                                        ON st.id_product=p.id_product
                                        JOIN
                                    categories c ON c.id_category = p.id_category
                                        JOIN
                                    (SELECT
                                        id_product, image
                                    FROM
                                        product_images
                                        GROUP BY id_product) pi ON pi.id_product = p.id_product
                                        ${bySearch}
                                GROUP BY p.id_product
                                    ${byCategory}
                                ORDER BY ${order}
                                LIMIT  ?,?`,
                // 'select s.*,ss.name from storages s join stores ss on ss.id_store=s.id_store where s.id_product in(?)'
            ]

            const products = await asyncQuery(query[0], [page * perPage, +perPage])
            res.status(200).send(products)
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    addCategory: async (req, res) => {
        try {
            const query = [
                'insert into categories (category) values(?)',
                'select * from categories'
            ]
            await asyncQuery(query[0], [req.body.category])
            const result = await asyncQuery(query[1])
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    deleteCategory: async ({ params }, res) => {
        try {
            const query = [
                'delete from categories where id_category=?',
                'select * from categories'
            ]
            await asyncQuery(query[0], [params.id_category])
            const result = await asyncQuery(query[1])
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    editCategory: async ({ body }, res) => {
        try {
            const query = [
                'update categories set category=? where id_category=?',
                'select * from categories'
            ]
            await asyncQuery(query[0], [body.category, body.id_category])
            const result = await asyncQuery(query[1])
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const query = 'update products set id_product_status=2 where id_product=?'
            await asyncQuery(query, [req.params.id_product])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    restoreProduct: async (req, res) => {
        try {
            const query = 'update products set id_product_status=1 where id_product=?'
            await asyncQuery(query, [req.params.id_product])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    getProductById: async ({ params: { id_product } }, res) => {
        // console.log(id_user, id_product)
        try {
            const query = [
                `SELECT
                                p.name,description,price,id_category
                            FROM
                                products p
                            WHERE p.id_product=?
                            `,
                'select * from product_images where id_product=?'
            ]
            const [result1] = await asyncQuery(query[0], [id_product])
            const result2 = await asyncQuery(query[1], [id_product])
            // console.log(result3)
            const constructedData = { product: result1, images: result2 }
            res.status(200).send(constructedData)
        } catch (error) {
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    editProduct: async ({ body, files }, res) => {
        try {
            const query = [
                'update products set ? where id_product=?',
                'delete from product_images where id_product_image in(?)',
                'insert into product_images (image,id_product) values ?'
            ]
            const { editedProduct, deletedImages, id_product, } = JSON.parse(body.productData)
            await asyncQuery(query[0], [editedProduct, id_product])
            if (deletedImages.length) {
                await asyncQuery(query[1], [deletedImages, id_product])
            }
            if (files.length) {
                await asyncQuery(query[2], [files.map(
                    item => (['images/products/' + item.filename, id_product])
                )])
            }
            res.status(200).send('success')
        } catch (error) {
            console.log(error)
            res.status(400).send(error.message || error.sqlMessage || error)
        }
    },
    getAllOrder: async ({ params: { id_order_status }, query: { page = 0, perPage = 5, orderBy } }, res) => {
        console.log(page, 'ini', perPage)
        try {
            const orderByOption = {
                latest: 'o.date DESC',
                oldest: 'o.date ASC',
            }
            const query = `
                        SELECT
                            *
                        FROM
                            (select * from orders o
                        WHERE
                            id_order_status =?
                        ORDER BY ${orderByOption[orderBy] || orderByOption.latest}
                            LIMIT ${page * perPage},${perPage}) o
                                join
                            users u on u.id_user = o.id_user
                                JOIN
                            order_details od ON o.id_order = od.id_order
                                JOIN
                            products p ON p.id_product = od.id_product
                                JOIN
                            product_images pi ON pi.id_product = od.id_product
                                JOIN
                            order_status os ON os.id_order_status = o.id_order_status
                        GROUP BY id_order_detail
                        ORDER BY ${orderByOption[orderBy] || orderByOption.latest}
        `
            const result = await asyncQuery(query, [id_order_status])
            // console.log(id_order_status)
            const dataThatWeSend = result.reduce((a, b, _, arr) => {
                const {
                    id_order,
                    date,
                    id_order_status,
                    shipment_fee,
                    payment_method,
                    status,
                    payment_image,
                    message,
                    address_detail,
                    email,
                    city,
                    postal_code,
                    username
                } = b

                const index = a.findIndex(i => i.id_order === id_order)

                // console.log(index)
                if (index === -1) {
                    a.push({
                        id_order,
                        address_detail, city, postal_code,
                        date,
                        id_order_status,
                        username,
                        message,
                        status,
                        email,
                        shipment_fee,
                        payment_method,
                        payment_image,
                        order_details: [],
                        total: shipment_fee
                    })
                    console.log(a, arr)
                    arr.forEach(da => {
                        const { price, name, image, qty, id_order } = da;
                        if (b.id_order === id_order) {
                            a[a.length - 1].order_details.push({ price, name, image, qty, id_order })
                            a[a.length - 1].total += price * qty
                        }
                    })
                }
                return a
            }, [])
            console.log(dataThatWeSend)
            res.status(200).send(dataThatWeSend)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    addProduct: async ({ files, body }, res) => {
        try {
            const { newProduct } = JSON.parse(body.productData)
            const { name, description, id_category, price } = newProduct
            const query = [
                'insert into products (name, description,price,id_category) values(?)',
                'insert into product_images (image,id_product)values(?)'
            ]
            const { insertId } = await asyncQuery(query[0], [[name, description, price, id_category]])
            for await (let { filename } of files) {
                await asyncQuery(query[1], [['images/products/' + filename, insertId]])
            }
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getStores: async (_, res) => {
        try {
            const query = 'select id_store,name from stores'
            const result = await asyncQuery(query)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getStockData: async (req, res) => {
        const { page = 0, perPage = 10, search = '' } = req.query
        // console.log(page,perPage)
        let bySearch = ''
        if (search) bySearch = `WHERE p.name regexp "${search}"`
        try {
            const getProduct = `SELECT p.id_product,name,image from products p join product_images pi on pi.id_product=p.id_product ${bySearch} group by p.id_product limit ?,?`
            const getStorage = 'select stock,purchased_stock,id_product,ss.name store_name,s.id_store  from storages s join stores ss on ss.id_store=s.id_store'
            const products = await asyncQuery(getProduct, [+page * perPage, +perPage])
            const storages = await asyncQuery(getStorage)
            const structuredData = products.map(item => {
                item.storages = []
                storages.forEach(storage => {
                    if (storage.id_product === item.id_product) {
                        item.storages.push(storage)
                    }
                })
                return item;
            })
            res.status(200).send(structuredData)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    editStockData: async (req, res) => {
        const { id_product, id_store, stock } = req.body
        try {
            const query = 'update storages set stock=? where id_product=? and id_store=?'
            await asyncQuery(query, [stock, id_product, id_store])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    deleteStockData: async (req, res) => {
        const { id_product, id_store } = req.query
        try {
            const query = 'delete from storages where id_product=? and id_store=?'
            await asyncQuery(query, [+id_product, +id_store])
            // console.log(req.body)
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    addStockData: async (req, res) => {
        const { stock, id_product, id_store } = req.body
        try {
            const query = 'insert into storages (stock,id_product,id_store) values (?,?,?)'
            await asyncQuery(query, [stock, id_product, id_store])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    getMoveProductData: async (req, res) => {
        try {
            const query = 'select s.name store_name,ss.stock,ss.id_product,ss.id_store from storages ss join stores s on ss.id_store=s.id_store where id_product=? '
            const result = await asyncQuery(query, [req.params.id_product])
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    moveStock: async (req, res) => {
        const { origin, destination, id_product } = req.body
        try {
            if (!origin.id_store || !destination.id_store || !id_product) return res.status(400).send('Unexpected error please try again later')
            const query = 'update storages set stock=? where id_product=? and id_store=?'
            await asyncQuery(query, [origin.stock, id_product, origin.id_store])
            await asyncQuery(query, [destination.stock, id_product, destination.id_store])
            res.status(200).send('success')
        } catch (error) {
            res.status(400).send(error)
        }
    },
    storeDetails: async (req, res) => {
        const { perPage = 10, page = 0, search = '' } = req.query
        let bySearch = ''
        if (search) bySearch = ` where s.name regexp '${search}'`
        try {
            const query = `select s.id_store,s.name store_name,count(ss.id_product) total_product from stores s left join storages ss on ss.id_store=s.id_store ${bySearch} group by s.id_store limit ${page * perPage},${perPage}`
            const result = await asyncQuery(query)
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    storeProductDetails: async (req, res) => {
        const { perPage = 10, page = 0, search = '', id_store } = req.query
        let bySearch = ''
        if (search) bySearch = ` and p.name regexp '${search}'`
        try {
            const query = `
            select p.name,pi.image,ss.stock from storages ss
            join products p on p.id_product=ss.id_product
            join (select * from product_images group by id_product) pi on pi.id_product=p.id_product
            where id_store=? ${bySearch}
            limit ${page * perPage},${perPage}
            `
            const result = await asyncQuery(query, [id_store])
            res.status(200).send(result)
        } catch (error) {
            res.status(400).send(error)
        }
    },
    addStore: async (req, res) => {
        const {lat,lng,store_name}=req.body
        try {
            console.log(req.body)
            const query = `insert into stores (name,lat,lng) values(?,?,?)`
            const resu=await asyncQuery(query, [store_name, lat, lng])
            console.log(resu)
            res.status(200).send('success')
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    }
}


/*
korken 6 3 0 5 0
knopparp 1 7 0 3 0
skurup 4 6 0 4 0
*/
