import { Db } from "mongodb";
export const UserCollection = "users";
export const UserSchema = {
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
};




