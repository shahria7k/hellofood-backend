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
			customer_id: mongoose.Types.ObjectId(req.body.customer_id),
			cart: products,
			address: req.body.address,
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
// * Read single order by id
router.get("/:id", getOrder, (req, res) => {
	res.json(res.order);
});
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
		res.status(204).json({ message: "Deleted Order" });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});
router.post("/test", (req, res) => {
	console.log(req.body);
	res.json(req.body);
});
module.exports = router;
