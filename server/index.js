require('dotenv').config()

const
    express = require('express'),
    cors = require('cors'),
    app = express(),
    port = 2000
    ;

const db = require('./database')

db.connect(err => (
    err ? console.log('mysql connection failed => ' + err.stack) :
        console.log('connected to mysql => ' + db.threadId)
))

const { userRouter, productRouter, cartRouter, orderRouter, historyRouter,adminRouter,wishlistRouter} = require('./routers')

const {adminAuthorization,verifiedUserAuthorization,userAuthorization}=require('./helpers/jwtHelper')

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/public'))



app.use('/user', userRouter)
app.use('/order', orderRouter)
app.use('/product', productRouter)

app.use(userAuthorization)

app.use('/wishlist', wishlistRouter)

app.use(verifiedUserAuthorization)

app.use('/history', historyRouter)
app.use('/cart', cartRouter)

app.use(adminAuthorization)

app.use('/admin', adminRouter)

app.listen(port, () => console.log('connected to port ', port))
