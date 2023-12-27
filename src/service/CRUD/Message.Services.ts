import { ObjectId } from 'mongodb';
import { Message, MessageRepo } from '../../db/repositories/Message.Repo';
import { BaseService } from './Base.Services';

export class MessageService extends BaseService<MessageRepo>{

    constructor() {
        super(MessageRepo.getInstance());
    }

    async createMessage(senderId: ObjectId, receiverId: ObjectId, content: string) {
        const message = new Message(senderId, receiverId, content);
        return this.repository.create(message.getMessage());
    }

    async updateMessage(id: string, data: Partial<Message>) {
        return this.repository.update(id, data);
    }

    async getMessageById(id: string) {
        return this.repository.find({ _id: new ObjectId(id) });
    }

    async deleteMessage(id: string) {
        return this.repository.delete(id);
    }

    async getAllMessages() {
        return this.repository.find({});
    }
}
