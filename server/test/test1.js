
// const jwt = require('jsonwebtoken')

// let data = { name: 'adi' }

// try {
//     let token = jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRpIiwiaWF0IjoxNjE4MTk0MjY1LCJleHAiOjE2MTgxOTQyNjd9.uJHtjleg5RwzNObY6_8NLMi7fBiOlrtmeMw8zfvKde4', 'adi', { expiresIn: '2s' })
// } catch (error) {
// console.log(error.messages)    
// }
// console.log(token)

// const arr = [111, 333, 555, 666, 777, 999, 444, 888].sort((a, b) => {
//     if(b===555) return 1
//     if (a < b) return -1
//     if(a > b) return 1
// })

// console.log(arr)

// app.post('/upload', upload(), async ({ files, body }, res) => {
//     try {
//         console.log('hai')
//         console.log(files)
//         const product = JSON.parse(body.PRODUCT_DATA)
//         res.status(200).send(product)
//     } catch (error) {
//         res.status(500).send(error)
//     }
// })

// app.get('/verify', async (_, res) => {
//     try {
//         const option = {
//             from: "Ikiya <ikiya@gmail.com>",
//             to: 'jordan.rafelino@gmail.com',
//             subject: 'Email Verification',
//         }
//         const file = fs.readFileSync('./templates/verification.handlebars').toString()
//         const template = handlebars.compile(file)
//         option.html = template({ name: 'jordan', token: 'test398202u' })
//         console.log(option)

//         const info = await transporter.sendMail(option)
//         res.status(200).send(info)

//     } catch (error) {
//         res.status(500).send(error)
//     }
// })


// const
//     cryptojs = require('crypto-js'),
//     jwt = require('jsonwebtoken'),
//     key = 'secret'
//     ;

// const userData = {
//     username: 'jordan',
//     password: cryptojs.HmacMD5('Jordan123', key).toString()
// }

// console.log(userData)

// const codePattern = Math.floor(Math.random() * (userData.password.length - 4))

// console.log(codePattern)

// const getCode = userData.password.substr(codePattern, 4)

// console.log(getCode)

// const slicedData1 = userData.password.substr(0, codePattern)
// const slicedData2 = userData.password.substr(codePattern + 4)

// console.log(slicedData1)
// console.log(slicedData2)

// userData.password = slicedData1 + ';' + slicedData2

// console.log(userData)

// const token = jwt.sign(userData, key)

// console.log(token)

// const decodedToken = jwt.verify(token, key)

// console.log(decodedToken)


// const geoLocation = require('measure-geolocation');
// const stores = [
//     {
//         id_store: 2,
//         lat: -6.9344694,
//         lon: 107.6049539
//     },
//     {
//         id_store: 1,
//         lat: -6.175110,
//         lon: 106.865036
//     },
// ]
// const user = {
//     lat: -6.145827390,
//     lon: 106.856678970,
// }


// let distance = stores.sort((a, b) => {
//     a = geoLocation.getDistanceBetweenLocations({ lat: a.lat, lon: a.lon }, user)
//     b = geoLocation.getDistanceBetweenLocations({ lat: b.lat, lon: b.lon }, user);
//     return a - b
// })
// console.log(distance)

// const order_details = [
//     {
//         id_order_detail: 1,
//         id_order: 1,
//         id_product: 3,
//         qty: 6,
//         price: null
//     },
//     {
//         id_order_detail: 3,
//         id_order: 1,
//         id_product: 11,
//         qty: 3,
//         price: null
//     },
//     {
//         id_order_detail: 5,
//         id_order: 1,
//         id_product: 1,
//         qty: 1,
//         price: null
//     }
// ]
// const storages = [
//     {
//         id_storage: 1,
//         id_store: 1,
//         id_product: 1,
//         stock: 6,
//         purchased_stock: 0
//     },
//     {
//         id_storage: 2,
//         id_store: 2,
//         id_product: 1,
//         stock: 8,
//         purchased_stock: 0
//     },
//     {
//         id_storage: 5,
//         id_store: 1,
//         id_product: 3,
//         stock: 3,
//         purchased_stock: 0
//     },
//     {
//         id_storage: 6,
//         id_store: 2,
//         id_product: 3,
//         stock: 9,
//         purchased_stock: 0
//     },
//     {
//         id_storage: 21,
//         id_store: 1,
//         id_product: 11,
//         stock: 6,
//         purchased_stock: 0
//     },
//     {
//         id_storage: 22,
//         id_store: 2,
//         id_product: 11,
//         stock: 8,
//         purchased_stock: 0
//     }
// ]


// const update = async () => {

//     console.table(storages)
//     for await (let product of order_details) {
//         for await (let storage of storages) {
//             if (storage.id_product === product.id_product && storage.id_store === distance[0].id_store) {
//                 storage.purchased_stock += product.qty
//             }
//         }
//     }

//     const queries = [
//         'update orders set ? where id_order=?',
//         'select * from order_details where id_order=?',
//         'update storages set purchased_stock=purchased_stock+? id_store=? and id_product=?',
//         'select id_product,stock-purchased_stock remain from storages where id_product in(?) and id_store=? having remain <0',
//         'update storages set stock=stock-? where id_store=? and id_product=?',
//         'update storages set stock=stock+? where id_store=? and id_product=?',
//     ]



//     const sisaan = storages.map(({ id_product, stock, purchased_stock }) => ({ id_product, remain: stock - purchased_stock }))
//     for await (let { id_product, remain } of sisaan) {
//         if (remain < 0) {
//             for await (let storage of storages) {
//                 if (storage.id_product === id_product) {
//                     if (distance[1].id_store === storage.id_store) {
//                         console.log(remain)
//                         storage.stock+=remain
//                     }
//                     if (distance[0].id_store === storage.id_store) {
//                         console.log(remain)
//                         storage.stock-=remain
//                     }
//                 }
//             }
//         }
//     }
//     console.table(storages)
// }

// const tes = async () => {
//     let a, b = Array.from({length:100},(_,i)=>i)

//     await b.forEach(async i => {
//         await b.forEach(k => {
//             if (i === 85) a = 'lolo'
//         })
//     })

//     console.log(a)
// }


// tes()

// console.log(storages.find(i=>i.id_product==1))


/*
jkt = 3.384615224948261
bdg = 120.51183831754282
*/


// let product = [
//     { name: 'kursi', id_product: 3 },
//     { name: 'meja', id_product: 4 },
//     { name: 'lemari', id_product: 5 },
// ]

// let storage = [
//     { stock: 4, store: 'JKT', id_product: 3 },
//     { stock: 3, store: 'BDG', id_product: 3 },
//     { stock: 4, store: 'JKT', id_product: 4 },
//     { stock: 3, store: 'JKT', id_product: 5 },
//     { stock: 4, store: 'BDG', id_product: 4 },
//     { stock: 3, store: 'BDG', id_product: 5 },
// ]


// let sss = product.map(item => {
//     item.storages = []
//     storage.forEach(storage => {
//         if (item.id_product === storage.id_product) {
//             item.storages.push(storage)
//         }
//     })
//     return item
// })


// console.log(sss)


// console.log(Math.ceil(38/10))



const stores = [
    { id_store: 1, name: 'JKT' },
    { id_store: 2, name: 'BDG' },
    { id_store: 3, name: 'BSD' },
]

const storages = [
    { id_store: 1, id_product: 1, stock: 3 },
    { id_store: 2, id_product: 1, stock: 4 },
    { id_store: 3, id_product: 1, stock: 6 },// 13
    { id_store: 1, id_product: 2, stock: 5 },
    { id_store: 2, id_product: 2, stock: 2 },
    { id_store: 3, id_product: 2, stock: 3 },// 10
    { id_store: 1, id_product: 3, stock: 5 },
    { id_store: 2, id_product: 3, stock: 4 },
    { id_store: 3, id_product: 3, stock: 3 },// 12
]

const cart = [
    { id_product: 1, qty: 10 },
    { id_product: 2, qty: 7 },
    { id_product: 3, qty: 4 },
]

for (let product of cart) {
    let currentQty = product.qty
    for (let store of stores) {
        if (currentQty > 0) {
            const currentProduct =
                storages.find(
                    stock =>
                        stock.id_product === product.id_product &&
                        stock.id_store === store.id_store
                )
            const tempStock = currentProduct.stock
            storages.find(
                stock =>
                    stock.id_product === product.id_product &&
                    stock.id_store === store.id_store
            ).stock = Math.max(tempStock - currentQty, 0)

            currentQty = Math.max(currentQty - tempStock, 0)
        }
    }
}

console.table(storages)

const confirmOrder = async (req, res) => {
    const { id_order } = req.params
    try {
        const query = [
            'select id_store,lat,lng lon from stores',//# 0
            'select lat,lng lon,username,email from orders o join users u on o.id_user=u.id_user where o.id_order=?',//# 1
            'select * from order_details where id_order=?',//# 2
            'select stock from storages where id_store=? and id_product=?',//# 3
            'update storages set stock=? where id_product=? and id_store=?',//# 4
            'update storages set purchased_stock=purchased_stock-? where id_store=? and id_product=?',//# 5
            'update orders set id_order_status=4 where id_order=?'//# 6
        ]
        const stores = await asyncQuery(query[0])
        const [userCords] = await asyncQuery(query[1], id_order)
        const userCart = await asyncQuery(query[2], id_order)
        const sorted = stores.sort((a, b) => {
            a = geoLocation.getDistanceBetweenLocations(a, userCords)
            b = geoLocation.getDistanceBetweenLocations(b, userCords);
            return a - b
        })
        for await (let cart of userCart) {
            let userQty = cart.qty;
            for await (let store of sorted) {
                if (userQty > 0) {
                    const [selectedStorage] = await asyncQuery(query[3], [store.id_store, cart.id_product])
                    await asyncQuery(query[4], [Math.max(selectedStorage.stock - userQty, 0), cart.id_product, store.id_store])
                    currentQty = Math.max(currentQty - selectedStorage.stock, 0);
                }
            }
            await asyncQuery(query[5], [cart.qty, sorted[0].id_store, cart.id_product])
        }
        await asyncQuery(query[6], [id_order])
        const option = {
            from: 'Ikiya <ikiya@gmail.com>',
            to: userCords.email,
            subject: 'Order Confirmed',
        }
        const html = fs.readFileSync('./templates/orderConfirmed.handlebars').toString()
        const template = handlebars.compile(html)
        option.html = template({ username: userCords.username, id_order })
        transporter.sendMail(option)

        res.status(200).send('success')
    } catch (error) {
        res.status(400).send(error.message || error.sqlMessage || error)
    }
}