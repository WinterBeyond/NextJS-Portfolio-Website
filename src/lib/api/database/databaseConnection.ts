import { MongoClient, Db } from "mongodb";

if (!process.env.MONGODB_URI)
	throw new Error("MONGODB_URI is not configured in environment!");

const client = new MongoClient(process.env.MONGODB_URI);

let isConnected = false;
let cachedDatabase: Db;

client.on("open", () => {
	isConnected = true;
});

client.on("close", () => {
	isConnected = false;
});

export const databaseConnection = async () => {
	if (!isConnected) {
		await client.connect();
		cachedDatabase = client.db(process.env.MONGODB_DATABASE);
		return cachedDatabase;
	}

	return cachedDatabase;
};

export default databaseConnection;
