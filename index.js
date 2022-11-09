const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");

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
client.connect((err) => {
	const collection = client.db("test").collection("devices");
	// perform actions on the collection object
	client.close();
});


app.get("/", (req, res) => {
	res.send("All Foods Services is Running");
});


app.listen(port, () => {
	console.log(`Food Server is Runn ${port}`);
});