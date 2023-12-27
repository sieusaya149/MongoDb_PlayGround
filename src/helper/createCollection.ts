import { Db } from "mongodb";

export async function createCollection(db: Db | undefined, collectionName: string, schema: any) {
    if(!db) {
        console.log("db is not connected");
        return;
    }
    console.log(`creating collection ${collectionName}`);
    const cursor = db.listCollections();
    const listCollection = await cursor.toArray();
    const collectionExists = listCollection.some(item => item.name === collectionName);
    if(collectionExists) {
        console.log(`the collection ${collectionName} exist`);
        return;
    }
    try {
        await db.createCollection(collectionName, {validator: schema})
        console.log(`the collection ${collectionName} was created`)
    } catch (error) {
        console.log(`the collection ${collectionName} was created failed with ${error}`)
    }
}