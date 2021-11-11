const router = require("express").Router();
const Order = require("../Models/Order");
const mongoose = require("mongoose");
//!  Middlewares
// * Get Order by Id
async function getOrder(req, res, next) {
	let order;
	try {
		order = await Order.findById(req.params.id);
		if (order == null) {
			return res.status(404).json({ message: "Order not found" });
		}
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
	res.order = order;
	next();
}
/**
 *! ROUTES
 ** CRUD OPARATIONS ON USER
 */
// * Creat one order
router.post("/", async (req, res) => {
	try {
		const products = req.body.cart.map((item) => {
			item._id = mongoose.Types.ObjectId(item._id);
			return item;
		});

		const order = new Order({
			email: req.body.email,
			cart: products,
			address: req.body.address,
			phone: req.body.phone,
		});
		const newOrder = await order.save();
		res.status(201).json(newOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
// * Read all Orders
router.get("/", async (req, res) => {
	try {
		const orders = await Order.find();
		res.send(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.get("/myorders", async (req, res) => {
	try {
		const orders = await Order.find({ email: req.query.email });
		res.send(orders);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
// * Read single order by id
router.get("/:id", getOrder, (req, res) => {
	res.json(res.order);
});

// * Read All orders by user email

// * Update single order
router.patch("/:id", getOrder, async (req, res) => {
	if (req.body.cart.length >= 0) {
		const cart = [...req.body.cart];
		cart.forEach((item) => {
			item._id = mongoose.Types.ObjectId(item._id);
		});
		res.order.cart = cart;
	}
	if (req.body.hasOwnProperty("isComplete")) {
		res.order.isComplete = req.body.isComplete;
	}
	if (req.body.hasOwnProperty("isPaid")) {
		res.order.isPaid = req.body.isPaid;
	}
	if (req.body.hasOwnProperty("address")) {
		res.order.address = req.body.address;
	}
	if (req.body.hasOwnProperty("phone")) {
		res.order.phone = req.body.phone;
	}
	try {
		const updateOrder = await res.order.save();
		res.json(updateOrder);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});
//* Delete Single Order
router.delete("/:id", getOrder, async (req, res) => {
	try {
		await res.order.remove();
		res.json({ message: "Deleted Order" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.post("/test", (req, res) => {
	console.log(req.body);
	res.json(req.body);
});
module.exports = router;
