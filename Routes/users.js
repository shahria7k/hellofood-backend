const express = require("express");
const router = express.Router();
const User = require("../Models/User.js");

//! Middlewares
//* Get User by ID
async function getUser(req, res, next) {
	let user;
	try {
		user = await User.findById(req.params.id); //! User Id is a hex string
		if (user == null) {
			return res.status(404).json({ message: "Cannot find User" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.user = user;
	next();
}
/**
 *! ROUTES
 ** CRUD OPARATIONS ON USER
 */

//*  Create One User
router.post("/", async (req, res) => {
	const user = new User({
		name: req.body.name,
		email: req.body.email,
		imgURL: req.body.imgURL,
		address: req.body.address,
	});
	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
//*  Read All users
router.get("/", async (req, res) => {
	try {
		const users = await User.find();
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

//* Read one User
router.get("/:id", getUser, (req, res) => {
	res.json(res.user);
});

//* Update One user
router.patch("/:id", getUser, async (req, res) => {
	for (key in req.body) {
		if (req.body[key] != null && res.user.hasOwnProperty(key)) {
			res.user[key] = req.body[key];
		}
	}
	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
//* Delete One User
router.delete("/:id", getUser, async (req, res) => {
	try {
		await res.user.remove();
		res.status(204).json({ message: "Deleted User" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
