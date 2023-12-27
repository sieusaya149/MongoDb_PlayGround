import { ObjectId } from 'mongodb';
import { Like, LikeRepo } from '../../db/repositories/Like.Repo';
import { BaseService } from './Base.Services';

export class LikeService extends BaseService<LikeRepo>{

    constructor() {
        super(LikeRepo.getInstance());
    }

    async createLike(authorId: ObjectId, postId: ObjectId) {
        const like = new Like(authorId, postId);
        return this.repository.create(like.getLike());
    }

    async getLikeById(id: string) {
        return this.repository.find({ _id: new ObjectId(id) });
    }

    async deleteLike(id: string) {
        return this.repository.delete(id);
    }
}
