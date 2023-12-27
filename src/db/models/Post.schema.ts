import { Db } from "mongodb";
import { ObjectId } from "mongodb";

export const PostCollection = "posts";

export const PostSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["title", "content", "authorId", "createdAt", "updatedAt"],
        properties: {
            title: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            content: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            authorId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
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
};
