import {MongoClient} from "mongodb";
import uri from "./uri.js";

const client = new MongoClient(uri);

const dbName = "QRCodeProject";

const db = client.db(dbName);
const connectToDB = async () => {
    try {
        await client.connect();
        console.log(`Connected successfully to the database${dbName}`);
    } catch(err) {
        throw new Error(`Failed to connect to the database: ${err.message}`);
    }
}

const main = async () => {
    try {
        await connectToDB();
    } catch(err) {
        console.error(`Error occurred while connecting to the database: ${err.message}`);
    } finally {
        await client.close();
    }
}
main();