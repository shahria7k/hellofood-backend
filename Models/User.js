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
