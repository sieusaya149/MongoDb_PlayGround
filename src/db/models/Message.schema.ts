import { Db } from "mongodb";

export const MessageCollection = "messages";

export const MessageSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["senderId", "receiverId", "content", "createdAt", "updatedAt"],
        properties: {
            senderId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            receiverId: {
                bsonType: "objectId",
                description: "must be an objectId and is required"
            },
            content: {
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
};