const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config();
require('dotenv').config({path: 'backend/.env'})


const mongoURI = process.env.MONGO_URI;

const connectToMongo = async () => {
    try {
        const conn = await mongoose.connect(mongoURI);
        console.log(`connectes to Mongo Successfully!: ${conn.connection.host}`);
    }catch (error) {
        console.log(error);
        process.exit(1);
      }
}


module.exports = connectToMongo;