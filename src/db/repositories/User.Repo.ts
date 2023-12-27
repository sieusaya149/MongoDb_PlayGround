import { Db, Collection, InsertOneResult,
        InsertManyResult, ObjectId} from 'mongodb';
import { Database } from "../index";
import {UserSchema,
        UserCollection} from "../models/User.schema";
import { createCollection } from '../../helper/createCollection';
import { BaseRepo } from './Base.Repo';
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


export class UserRepo extends BaseRepo<User> {
    private static instance: UserRepo;
    private constructor() {
        super()
        createCollection(this.db, UserCollection, UserSchema)
    }
    public static getInstance(): UserRepo
    {
        if(!UserRepo.instance)
        {
            UserRepo.instance = new UserRepo()
            UserRepo.instance.setCollection(UserCollection)
        }
        return UserRepo.instance
    }
    
}