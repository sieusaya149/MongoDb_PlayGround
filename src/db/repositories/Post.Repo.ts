import { Db, ObjectId } from 'mongodb';
import { BaseRepo } from './Base.Repo';
import { PostCollection, PostSchema } from '../models/Post.schema';
import { createCollection } from '../../helper/createCollection';

interface IPost {
    _id?: ObjectId;
    title: string;
    content: string;
    authorId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

export class Post implements IPost {
    _id?: ObjectId;
    title: string;
    content: string;
    authorId: ObjectId;
    createdAt: Date;
    updatedAt: Date;
    constructor(title: string, content: string, authorId: ObjectId) {
        this.title = title;
        this.content = content;
        this.authorId = authorId;
        this.createdAt = this.updatedAt = new Date();
    }  
    public getPost(): Post {
        return this;
    }
}

export class PostRepo extends BaseRepo<Post> {
    private static instance: PostRepo;
    private constructor() {
        super()
        createCollection(this.db, PostCollection, PostSchema)
    }
    public static getInstance(): PostRepo
    {
        if(!PostRepo.instance)
        {
            PostRepo.instance = new PostRepo()
            PostRepo.instance.setCollection(PostCollection)
        }
        return PostRepo.instance
    }
    
}