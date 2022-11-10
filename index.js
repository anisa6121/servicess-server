const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// dotenv
require("dotenv").config();

const app = express();
const port = process.env.port || 5000;

// middleware   
app.use(cors());

app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASSWORD);
// mongod


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.yyqnrtj.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverApi: ServerApiVersion.v1,
});
async function run() {
	try {
		// database Name & collection Name
const serviceCollection = client.db("foodService").collection("foodServices");

// review Collection

const reviewCollection = client.db("foodService").collection("reviews");		
		// Jwt Token


app.post("/jwt", (req, res) => {
const user = req.body;
console.log(user);
const token = jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{ expiresIn: "1d" });
	console.log(token);
	res.send({ token });
		});
		// get all data
		app.get("/allServices", async (req, res) => {
			const query = {};
			const cursor = serviceCollection.find(query);
			const services = await cursor.toArray();
			res.send(services);
		});

		// Single Service get

		app.get("/allServices/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id)};

	const singleService = await serviceCollection.findOne(query);

			res.send(singleService);
		});

		// get three data
		app.get("/someServices", async (req, res) => {
			const query = {};
			const cursor = serviceCollection.find(query);
			const services = await cursor.limit(3).toArray();
			res.send(services);
		});

		// Add Service
		app.post("/allServices", async (req, res) => {
			console.log("post Api called");
			const addService = req.body;
			console.log(addService);

			const result = await serviceCollection.insertOne(
				addService
			);
			console.log(result);

			res.send(result);
		});



		// reviews
app.post("/reviews", async (req, res) => {
	const review = req.body;
console.log(review)
	const result = await reviewCollection.insertOne(review);
	res.send(result)
});
		
		//all reviews get

		app.get("/allReviews", async (req, res) => {

		let query = {};
			if (req.query.email) {
				query = {
					email: req.query.email,
				}
				
}
const cursor = reviewCollection.find(query)
const reviews = await cursor.toArray();
res.send(reviews)
});

		
		
		// one id review

	// 	app.get("/allReviews/:id", async (req, res) => {
	// 		const id = req.params.id;
	// 		const query = { serviceId: ObjectId(id) };

	// const singleIdReview = await reviewCollection.findOne(query);

	// 		res.send(singleIdReview);
	// 	});


	// Delete

		app.delete("/allReviews/:id", async (req, res) => {
			const id = req.params.id;
			const query = { _id: ObjectId(id) };
			const result = await reviewCollection.deleteOne(query);

			res.send(result)
	
});
		
	}
    finally {
	}
}

run().catch((err) => console.log(err));


app.get("/", (req, res) => {
	res.send("All Food service is Running");
});


app.listen(port, () => {
	console.log(`Food Server is Running ${port}`);
});