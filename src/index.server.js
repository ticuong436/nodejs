const express = require('express')
const env = require('dotenv')
const app = express();
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors')
//routes
const authRoute = require('./routes/auth')
const adminRoute = require('./routes/admin/auth')
const categoryRoute = require('./routes/category')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const initialData = require('./routes/admin/initialData')
const page = require('./routes/admin/page')

app.use(express.json())
app.use('/public', express.static(path.join(__dirname, 'uploads')))
app.use(cors())
app.use('/api', authRoute)
app.use('/api', adminRoute)
app.use('/api', categoryRoute)
app.use('/api', productRoute)
app.use('/api', cartRoute)
app.use('/api', initialData)
app.use('/api', page)
//environment variable or you can
env.config()
//mongodb conection 
//mongodb+srv://admin:<password>@cluster0.szply.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.szply.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, {

}).then(() => {
    console.log('Database Connected');
});
// app.use(bodyParser())



app.listen(process.env.POST, () => { console.log(`Server is running post ${process.env.POST} `); })