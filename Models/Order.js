const mongoose = require("mongoose");
const connection = require("../Utils/DB");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
	customer_id: {
		type: mongoose.Schema.ObjectId,
		ref: User,
		required: true,
		index: true,
	},
	time: {
		type: Date,
		required: true,
		default: Date.now,
	},
	cart: [
		{
			type: {
				item_name: String,
				_id: {
					type: mongoose.Schema.ObjectId,
					ref: Item,
					required: true,
				},

				quantity: {
					type: Number,
					required: true,
				},
			},
			required: true,
		},
	],
});
module.exports = connection.model("Order", OrderSchema);
