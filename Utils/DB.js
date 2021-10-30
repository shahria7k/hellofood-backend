require('dotenv').config();
const mongoose= require('mongoose');
const connection =mongoose.createConnection(process.env.DB_URI);

module.exports = connection;