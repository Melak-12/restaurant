const mongoose = require('mongoose')
const env=require('dotenv')

const connectDb = async () => {
    try {
        // process.env.MONGO_URI
        const conn = await mongoose.connect('mongodb+srv://melak:melak@foodcluster.7gjpwhf.mongodb.net/foodAppDB?retryWrites=true&w=majority');
        console.log(`Mongodb connected successfully on: ${conn.connection.host}`.cyan);
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDb;