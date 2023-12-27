import { Db, ObjectId } from 'mongodb';
import { BaseRepo } from './Base.Repo';
import { CommentCollection, CommentSchema } from '../models/Comment.schema';
import { createCollection } from '../../helper/createCollection';

interface IComment {
    _id?: ObjectId;
    content: string;
    authorId: ObjectId;
    postId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export class Comment implements IComment {
    _id?: ObjectId;
    content: string;
    authorId: ObjectId;
    postId: ObjectId;
    createdAt: Date;
    updatedAt: Date;

    constructor(content: string, authorId: ObjectId, postId: ObjectId) {
        this.content = content;
        this.authorId = authorId;
        this.postId = postId;
        this.createdAt = this.updatedAt = new Date();
    }

    public getComment(): Comment {
        return this;
    }
}

export class CommentRepo extends BaseRepo<Comment> {
    private static instance: CommentRepo;
    private constructor() {
        super();
        createCollection(this.db, CommentCollection, CommentSchema);
    }
    public static getInstance(): CommentRepo {
        if(!CommentRepo.instance) {
            CommentRepo.instance = new CommentRepo();
            CommentRepo.instance.setCollection(CommentCollection);
        }
        return CommentRepo.instance;
    }
}