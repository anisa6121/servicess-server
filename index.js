const express = require("express");
const cors = require("cors");
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
		const serviceCollection = client
			.db("foodService")
			.collection("foodServices");

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