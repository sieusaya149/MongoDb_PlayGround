import { Db, ObjectId } from 'mongodb';
import { BaseRepo } from './Base.Repo';
import { createCollection } from '../../helper/createCollection';
import { MessageCollection, MessageSchema } from '../models/Message.schema';

interface IMessage {
    _id?: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

export class Message implements IMessage {
    _id?: ObjectId;
    senderId: ObjectId;
    receiverId: ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;

    constructor(senderId: ObjectId, receiverId: ObjectId, content: string) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.content = content;
        this.createdAt = this.updatedAt = new Date();
    }

    public getMessage(): Message {
        return this;
    }
}

export class MessageRepo extends BaseRepo<Message> {
    private static instance: MessageRepo;
    private constructor() {
        super();
        createCollection(this.db, MessageCollection, MessageSchema);
    }
    public static getInstance(): MessageRepo {
        if(!MessageRepo.instance) {
            MessageRepo.instance = new MessageRepo();
            MessageRepo.instance.setCollection(MessageCollection);
        }
        return MessageRepo.instance;
    }
}