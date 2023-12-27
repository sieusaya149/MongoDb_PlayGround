import { Db, Collection, InsertOneResult, ObjectId} from 'mongodb';
import { Database } from "../index";
import {createUserCollection,
        UserCollection} from "../models/User.schema";
interface IUser {
    _id?: ObjectId;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export class User implements IUser{
    _id?: ObjectId;
    username: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    updatedAt: Date;
    constructor(username: string, email: string, password: string, firstName: string, lastName: string)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = this.updatedAt = new Date()
    }
    public getUser(): User {
        return this
    }
}


export class UserRepo {
    private static instance: UserRepo
    private userCollection!: Collection
    private db: Db | undefined = Database.getInstance().getDb()
    private constructor() {
        createUserCollection(this.db)
    }
    public static getInstance(): UserRepo
    {
        if(!UserRepo.instance)
        {
            UserRepo.instance = new UserRepo()
            UserRepo.instance.setUserCollection(UserCollection)
        }
        return UserRepo.instance
    }

    private setUserCollection(collectionName: string): Collection | null
    {
        if(!this.db)
        {
            console.log("db is not connected")
            return null
        }
        return this.userCollection = this.db.collection(collectionName)
    }

    public async create(user: object): Promise<InsertOneResult<any>> {
        const result = await this.userCollection.insertOne(user);
        return result;
    }

    public async find(query: Object): Promise<Array<any>> {
        const result = await this.userCollection.find(query).toArray();
        return result;
    }
    
    public async update(id: string, user: Object): Promise<any> {
        const result = await this.userCollection.updateOne({ _id: new ObjectId(id) }, user);
        console.log(result)
        return result
    }
    
    public async delete(id: string): Promise<any> {
        const result = await this.userCollection.deleteOne({ _id: new ObjectId(id) });
        return result
    }
    
}