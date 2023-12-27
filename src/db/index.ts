// src/db/index.ts
import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017';

const options = {
};
const client: MongoClient = new MongoClient(uri);

let db: Db;

async function connect() {
    if (db) return db;
    try {
        await client.connect();
        db = client.db(process.env.MONGO_DB || 'test');
        console.log('Connected successfully to MongoDB');
        const serverStatus = await db.command({ serverStatus: 1 });
        console.log('Number of connections:', serverStatus.connections.current);
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

async function disconnect() {
    if (!client) return;
    try {
        await client.close();
        console.log('Disconnected successfully from MongoDB');
    } catch (error) {
        console.error('Failed to disconnect from MongoDB', error);
    }
}
export { connect, disconnect };