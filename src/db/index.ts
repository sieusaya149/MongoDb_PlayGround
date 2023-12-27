// src/db/index.ts
import { Db, MongoClient } from 'mongodb';



export class Database {
    private static instance: Database;
    private db?: Db;
    private client?: MongoClient;
    private uri: string;
    private dbName: string;
    private constructor() {
        this.uri = process.env.MONGO_URI || 'mongodb://localhost:27021';
        this.dbName = process.env.MONGO_DB || 'test';
    }

    public getDb(): Db | undefined {
        return this.db;
    }
    public static getInstance(): Database {
        if (!Database.instance) {
            Database.instance = new Database();
        }
        return Database.instance;
    }

    public async connect(){
        try {
            if(!this.db)
            {
                const connectionOptions = {}
                this.client = new MongoClient(this.uri, connectionOptions);
                await this.client.connect();
                console.log('Connected successfully to MongoDB');
                this.db = this.client.db(process.env.MONGO_DB || 'test');
            }
            const serverStatus = await this.db.command({ serverStatus: 1 });
            console.log('Number of connections:', serverStatus.connections.current);
        } catch (error) {
            console.error('Failed to connect to MongoDB', error);
        }
    }

    public async disconnect() {
        if (!this.client) return;
        try {
            await this.client.close();
            console.log('Disconnected successfully from MongoDB');
        } catch (error) {
            console.error('Failed to disconnect from MongoDB', error);
        }
    }
}