const express = require('express');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/products.js');

const app = express();
connectDB();

app.use(express.json());
app.use('/products', productRoutes);

app.listen(3000, () => {
    console.log('server is running on http://localhost:3000');
})
