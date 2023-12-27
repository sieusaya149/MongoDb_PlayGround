import { Db } from "mongodb";

export const CommentCollection = "comments";

export const CommentSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["content", "authorId", "postId", "createdAt", "updatedAt"],
        properties: {
            content: {
                bsonType: "string",
                description: "must be a string and is required"
            },
            authorId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            postId: {
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