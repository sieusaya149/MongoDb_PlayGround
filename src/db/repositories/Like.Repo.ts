import { Db, ObjectId } from 'mongodb';
import { BaseRepo } from './Base.Repo';
import { LikeCollection, LikeSchema } from '../models/Like.schema';
import {createCollection} from '../../helper/createCollection';
interface ILike {
    _id?: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export class Like implements ILike {
    _id?: ObjectId;
    userId: ObjectId;
    postId: ObjectId;
    createdAt: Date;
    updatedAt: Date;

    constructor(userId: ObjectId, postId: ObjectId) {
        this.userId = userId;
        this.postId = postId;
        this.createdAt = this.updatedAt = new Date();
    }

    public getLike(): Like {
        return this;
    }
}

export class LikeRepo extends BaseRepo<Like> {
    private static instance: LikeRepo;
    private constructor() {
        super();
        createCollection(this.db, LikeCollection, LikeSchema);
    }
    public static getInstance(): LikeRepo {
        if(!LikeRepo.instance) {
            LikeRepo.instance = new LikeRepo();
            LikeRepo.instance.setCollection(LikeCollection);
        }
        return LikeRepo.instance;
    }
}