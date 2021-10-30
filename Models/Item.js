const mongoose = require("mongoose");
const connection = require("../Utils/DB");
const Category = require("./Category");
const ItemSchema = new mongoose.Schema({
	title: {
		type: String,
		requried: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	imgURL: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
		default: 0,
	},
	rating: {
		type: Number,
		required: false,
	},
	category: {
		type: {
			name: {
				type: String,
				required: false,
			},
			_id: {
				type: mongoose.Schema.ObjectId,
				ref: Category,
				requried: true,
			},
		},
		required: false,
	},
});
module.exports = connection.model("Item", ItemSchema);
