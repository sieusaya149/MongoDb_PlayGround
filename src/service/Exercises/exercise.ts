/*
implement a function that retrieves all posts that have a comment by a specific user.
*/

import { CommentService } from "../CRUD/Comment.Services";
import { PostService } from "../CRUD/Post.Services";

export class Exercise {
    constructor() {
    }

    public async getPostWithComment(postId: string) {
        const postService = new PostService();
        const myPost = await postService.getPostById(postId);

        const commentService = new CommentService();
        const comments = await commentService.getCommentByPostId(postId);

        return {
            ...myPost,
            comments
        }
    }
}