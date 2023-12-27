import { ObjectId } from 'mongodb';
import { Comment, CommentRepo } from '../../db/repositories/Comment.Repo';
import { BaseService } from './Base.Services';

export class CommentService extends BaseService<CommentRepo>{

    constructor() {
        super(CommentRepo.getInstance());
    }

    async createComment(content: string, authorId: ObjectId, postId: ObjectId) {
        const comment = new Comment(content, authorId, postId);
        return this.repository.create(comment.getComment());
    }

    async getCommentById(id: string) {
        return this.repository.find({ _id: new ObjectId(id) });
    }

    async getCommentByPostId(postId: string) {
        return this.repository.find({ postId: new ObjectId(postId) });
    }

    async updateComment(id: string, data: Partial<Comment>) {
        return this.repository.update(id, data);
    }

    async deleteComment(id: string) {
        return this.repository.delete(id);
    }
}
