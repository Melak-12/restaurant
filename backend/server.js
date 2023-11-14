const express = require("express");
fs
const dotenv = require("dotenv");
const colors = require('colors');
const connectDb = require('./config/db')
const port = process.env.PORT || 5000;
dotenv.config()
connectDb();
const app = express();
// this are midlewares to use body and json 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/menus',require('./routes/menuRoutes'))
//new server  
app.listen(port, () => console.log(`Server is started on ${port}`.blue))