const express = require("express");
const router = express.Router();
const Item = require("../Models/Item");
// const User= require('../Models/User.js');
// ! MidlleWAres
async function getItem(req, res, next) {
	let item;
	try {
		item = await Item.findById(req.params.id);
		if (item == null) {
			return res.status(404).json({ message: "Cannot find Item" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
	res.item = item;
	next();
}
// * Create Single Item in the menu
router.post("/", async (req, res) => {
	const item = new Item({
		title: req.body.title,
		description: req.body.description,
		price: req.body.price,
		imgURL: req.body.imgURL,
		stock: req.body.stock,
	});
	try {
		const newItem = await item.save();
		res.status(201).json(newItem);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// * Read All Items in the menu
router.get("/", async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// * Read Single Item in the menue
router.get("/:id", getItem, (req, res) => {
	res.json(res.item);
});
// * Update single item in menu
router.patch("/:id", getItem, async (req, res) => {
	for (key in req.body) {
		if (req.body[key]) {
			res.item[key] = req.body[key];
		}
	}
	try {
		const updatedItem = await res.item.save();
		res.json(updatedItem);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
// * Delete Single Item in the menu
router.delete("/:id", getItem, async (req, res) => {
	try {
		await res.item.remove();
		res.json({ message: "Deleted Item from the menu" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
