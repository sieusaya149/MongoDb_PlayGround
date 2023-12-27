export const LikeCollection = "likes";

export const LikeSchema = {
    $jsonSchema: {
        bsonType: "object",
        required: ["userId", "postId", "createdAt", "updatedAt"],
        properties: {
            userId: {
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