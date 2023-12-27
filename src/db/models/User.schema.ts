import { Db } from "mongodb";
import { Database } from "..";
export const UserCollection = "users";
export const UserSchema = {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["username", "password", "email", "firstName", "lastName"],
            properties: {
                username: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                password: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                email: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                firstName: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                lastName: {
                    bsonType: "string",
                    description: "must be a string and is required"
                },
                createdAt: {
                    bsonType: "date",
                    description: "must be a date and is required"
                },
                updatedAt: {
                    bsonType: "date",
                    description: "must be a date and is required"
                }
            }
        }
    }
};

// create collections
export async function createUserCollection(db: Db | undefined)
{
    if(!db)
    {
      console.log("db is not connected")
      return
    }
    const cursor = db.listCollections()
    const listCollection = await cursor.toArray()
    const collectionExists = listCollection.some(item => item.name === UserCollection);
    if(collectionExists)
    {
      console.log(`the collection ${UserCollection} exist`)
      return
    }
    db.createCollection(UserCollection, {validator: UserSchema})
    .then(() => console.log(`the collection ${UserCollection} was created`))
    .catch((err) => console.log(`the collection was created faild with ${err}`))
}


