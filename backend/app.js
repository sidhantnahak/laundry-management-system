const express = require('express');
const app = express();
const user=require('./Routes/UserRoute.js')
// const notes=require('./Routes/NotesRoute')
const Laundries=require('./Routes/LaundryRoute.js')
const cors=require('cors')
const cookieparser=require('cookie-parser')
const bodyparser=require('body-parser')
const payment=require('./Routes/PaymentRoute.js')

app.use(express.json())
app.use(cors())
app.use(cookieparser())
app.use(bodyparser.urlencoded({extended:true}))



app.use('/api/v1',user)
app.use('/api/v1',Laundries)
app.use('/api/v1',payment)


module.exports = app