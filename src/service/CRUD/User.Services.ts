import { ObjectId } from 'mongodb';
import { User, UserRepo } from '../../db/repositories/User.Repo';
import { BaseService } from './Base.Services';

export class UserService extends BaseService<UserRepo>{

    constructor() {
        super(UserRepo.getInstance());
    }

    async createUser(username: string, email: string, password: string, firstName: string, lastName: string) {
        const user = new User(username, email, password, firstName, lastName);
        return this.repository.create(user.getUser());
    }

    async getUserById(id: string) {
        return this.repository.find({ _id: new ObjectId(id) });
    }

    async updateUser(id: string, data: Partial<User>) {
        return this.repository.update(id, data);
    }

    async deleteUser(id: string) {
        return this.repository.delete(id);
    }

    async getAllUsers() {
        return this.repository.find({});
    }
}