const express = require("express");
const dotenv = require("dotenv");
const colors = require('colors');
const connectDb = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000;
dotenv.config()
connectDb();
const app = express();
app.use(cors({ origin: 'http://localhost:3001' }));
// this are midlewares to use body and json 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/menus', require('./routes/menuRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
//new server  
app.use('/', (req,res)=>{
    res.status(200).send("welcome angel")
});

app.listen(port, () => console.log(`Server is started on ${port}`.blue))