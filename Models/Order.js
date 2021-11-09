const mongoose = require("mongoose");
const connection = require("../Utils/DB");
const User = require("./User");
const Item = require("./Item");

const OrderSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	address: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	note: {
		type: String,
		required: false,
	},
	time: {
		type: Date,
		required: true,
		default: Date.now,
	},
	isComplete: {
		type: Boolean,
		required: true,
		default: false,
	},
	isPaid: {
		type: Boolean,
		required: true,
		default: false,
	},
	cart: [
		{
			_id: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Item",
				required: true,
			},
			name: {
				type: String,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
			},
			price: {
				type: Number,
				required: true,
			},
		},
	],
});
module.exports = connection.model("Order", OrderSchema);
