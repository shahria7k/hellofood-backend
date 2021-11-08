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
	address: {
		type: {
			country: {
				type: String,
				required: true,
			},
			state: {
				type: String,
				required: false,
			},
			devision: {
				type: String,
				required: false,
			},
			district: {
				type: String,
				required: true,
			},
			street: {
				type: String,
				required: true,
			},
			post: {
				type: Number,
				required: true,
			},
			phone: {
				type: String,
				required: true,
			},
		},
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
