const mongoose= require('mongoose');
const connection = require('../Utils/DB');
const CategorySchema = new mongoose.Schema({
    title: {
        type:String,
        requried: true,
    },
    description: {
        type: String,
        required: true
    }

})
module.exports= connection.model("Category", CategorySchema);