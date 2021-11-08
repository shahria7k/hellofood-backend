const mongoose = require("mongoose");
const connection = require("../Utils/DB");
const Item = require("../Models/Item");
const Category = require("../Models/Category");
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	joiningDate: {
		type: Date,
		required: true,
		default: Date.now,
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
			Devision: {
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
		required: false,
	},
	isAdmin: {
		type: Boolean,
		required: true,
		default: false,
	},
	imgURL: {
		type: String,
		required: false,
	},
	favItems: {
		type: [
			{
				_id: {
					type: mongoose.Schema.ObjectId,
					ref: Item,
					required: true,
				},
				itemName: {
					type: String,
					required: true,
				},
			},
		],
		required: false,
	},
	favCategories: {
		type: [
			{
				categoryId: {
					type: mongoose.Schema.ObjectId,
					ref: Category,
					required: true,
				},
				categoryName: {
					type: String,
					required: true,
				},
			},
		],
		required: false,
	},
});
module.exports = connection.model("User", UserSchema);
