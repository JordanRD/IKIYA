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

app.use(cors());
app.use(express.json());

app.use(express.static(__dirname + '/public'))

app.get('/', (_, res) => res.status(200).send('this is home'))

app.use('/user', userRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/order', orderRouter)
app.use('/history', historyRouter)
app.use('/admin', adminRouter)
app.use('/wishlist', wishlistRouter)

app.listen(port, () => console.log('connected to port ', port))
