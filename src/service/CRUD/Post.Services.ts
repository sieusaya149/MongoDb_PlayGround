import { ObjectId } from 'mongodb';
import { Post, PostRepo } from '../../db/repositories/Post.Repo';
import { BaseService } from './Base.Services';

export class PostService extends BaseService<PostRepo>{

    constructor() {
        super(PostRepo.getInstance());
    }

    async createPost(title: string, content: string, authorId: ObjectId) {
        const newPost = new Post(title, content, authorId);
        return this.repository.create(newPost.getPost());
    }

    async getPostById(id: string) {
        return this.repository.find({ _id: new ObjectId(id) });
    }

    async updatePost(id: string, data: Partial<Post>) {
        return this.repository.update(id, data);
    }

    async deletePost(id: string) {
        return this.repository.delete(id);
    }

    async getAllPosts() {
        return this.repository.find({});
    }
}
