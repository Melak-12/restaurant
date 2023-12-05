const express = require("express");
const dotenv = require("dotenv");
const colors = require('colors');
const connectDb = require('./config/db')
const cors = require('cors')

const port = process.env.PORT || 5000;
dotenv.config()
connectDb();
const app = express();
app.use(cors({ origin: 'http://localhost:3001'||'https://restaurants-blond-five.vercel.app/' }));
// this are midlewares to use body and json 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/foods', require('./routes/foodRoutes'));
app.use('/api/menus', require('./routes/menuRoutes'))
app.use('/api/users', require('./routes/userRoutes'))
//server r 
app.get('/', (req, res) => {
    res.send("welcome angel")
});

app.listen(port, () => console.log(`Server is started on ${port}`.blue))