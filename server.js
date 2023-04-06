require("dotenv").config();
const axios= require('axios')
// redeploy
// Setting up server and middlewares
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 5000;
// let count = 0;
// app.use('/', (req, res, next) => {
// 	count++;
// 	console.log(
// 		'count: ' + count,
// 		'Endpoint: ' + req.url,
// 		'method: ' + req.method
// 	);
// 	next();
// });

//connection with DB
const db = require("./Utils/DB");
db.on("error", (error) => {
	console.log(error);
});
db.once("open", () => {
	console.log("Connection to Database");
});

// Routes
const menuRouter = require("./Routes/menu");
const usersRouter = require("./Routes/users");
const orderRouter = require("./Routes/orders");
app.use("/users", usersRouter);
app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.get("/", (req, res) => {
	res.status(200).json({
		API_name: "Hello Food",
		version: "1.0.0",
		schema: {
			"/": "info",
			users: "list of all users",
			"users/:id": "individual users by id",
			menu: "all items in the menue",
			"menu/:id": "individula food item by id",
		},
		developed_by: "https://shahriakhan.me",
	});
});

// Starting Server
app.get("/webhook", async (req, res) => {
	const payload= JSON.stringify({
consignment_id:"DL130721VS8TTJ",
merchant_order_id:"Ts-1234",
order_status:"Received at Last Mile HUB",
order_status_slug:"Received_at_Last_Mile_HUB",
updated_at:"2021-07-14 11:47:22"
})
	let response = await axios.request({
		url: "http://127.0.0.1:4002/shukran-erp-v2/asia-southeast1/APIs/webhook/pathao", 
		method: "POST",
		data: payload, 
		headers: {
			"Content-type": "Application/json",
			"Origin": "X-Pathao",
			"Authorization": "Bearer test-token"
		}
		,
	
	}).then(res => res.data).catch(e => (e.message))
	console.log(response)
	res.json(response)
})
app.listen(port, () => {
	console.log(`app is listening on http://localhost:${port}`);
});

