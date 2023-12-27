import { faker } from '@faker-js/faker';
import { ObjectId } from 'mongodb';
import { UserService } from '../CRUD/User.Services';
import { Database } from '../../db';
import { PostService } from '../CRUD/Post.Services';
import { CommentService } from '../CRUD/Comment.Services';
import { LikeService } from '../CRUD/Like.Services';
import { MessageService } from '../CRUD/Message.Services';
type Relationship = {
    user1: string,
    user2: string,
}

export class DataServices
{
    private userService: UserService = new UserService();
    private postService: PostService = new PostService();
    private commentService: CommentService = new CommentService();
    private likeService: LikeService = new LikeService();
    private messageService: MessageService = new MessageService();
    constructor(){
        
    }

    public async dropDatabase() {
        const db = Database.getInstance().getDb();
        if (!db) return;
        await db.dropDatabase();
    }

    public async generateUsers(n: number) {
        for (let i = 0; i < n; i++) {
            try {
                const username = faker.internet.userName();
                const email = faker.internet.email();
                const password = faker.internet.password();
                const firstName = faker.person.firstName();
                const lastName = faker.person.lastName();
                await this.userService.createUser(username, email, password, firstName, lastName);
            } catch (error) {
                console.log(error);
                throw new Error('Error generating users');
            }
        }
    }
    
    public async generatePosts(minPost: number, maxPost: number) {
        const users = await this.userService.getAllUsers();
        for (let user of users) {
            const numsPost = Math.floor(Math.random() * (maxPost - minPost + 1) + minPost);
            for(let i = 0; i < numsPost; i++)
            {
                try {
                    const title = faker.lorem.sentence();
                    const content = faker.lorem.paragraph();
                    const author = user._id;
                    await this.postService.createPost(title, content, author);
                } catch (error) {
                    console.log(error);
                    throw new Error('Error generating posts');
                }
            }
        }
    }

    public async generateComments(maxComment: number) {
        const posts = await this.postService.getAllPosts();
        for (let post of posts) {
            const numsComment = Math.floor(Math.random() * (maxComment + 1));
            for(let i = 0; i < numsComment; i++)
            {
                try {
                    const content = faker.lorem.lines();
                    const author = new ObjectId(post.author);
                    await this.commentService.createComment(content, author, post._id);
                } catch (error) {
                    console.log(error);
                    throw new Error('Error generating comments');
                }
            }
        }
    }
    // each user can like random posts and maximum of post is half of total posts
    // for example: if total posts is 100, user can like maximum 50 posts
    // and minimum is 0
    public async generateLikes() {
        const users = await this.userService.getAllUsers();
        const posts = await this.postService.getAllPosts();
        for (let user of users) {
            const numsLike = Math.floor(Math.random() * (posts.length / 2 + 1));
            const likedPost = new Set(); // reset the set for each user
            for(let i = 0; i < numsLike; i++)
            {
                try {
                    let indexOfPost = Math.floor(Math.random() * posts.length);
                    while(likedPost.has(indexOfPost))
                    {
                        indexOfPost = Math.floor(Math.random() * posts.length);
                    }
                    likedPost.add(indexOfPost);
                    if(likedPost.size >= posts.length)
                    {
                        throw new Error('Out of index of posts');
                    }
                    const post = posts[indexOfPost];
                    const author = new ObjectId(user._id);
                    await this.likeService.createLike(author, post._id);
                } catch (error) {
                    console.log(error);
                    throw new Error('Error generating likes');
                }
            }
        }
    }

    // betweeb 2 users, each user can send random messages to another user
    // and maximum of messages is from 1 to 100
    public async generateMessages() {
        const relationships = await this.getRelationshipBetween2Users();
        for(let relationship of relationships)
        {
            const numsMessage = Math.floor(Math.random() * 100 + 1);
            for(let i = 0; i < numsMessage; i++)
            {
                try {
                    const content = faker.lorem.lines();
                    const sender = new ObjectId(relationship.user1);
                    const receiver = new ObjectId(relationship.user2);
                    await this.messageService.createMessage(sender, receiver, content);
                } catch (error) {
                    console.log(error);
                    throw new Error('Error generating messages');
                }
            }
        }
    }


    private async getRelationshipBetween2Users(): Promise<Relationship[]>{
        const users = await this.userService.getAllUsers();
        const relationships: Relationship[] = [];
        for(let i = 0; i < users.length; i++)
        {
            const user1 = users[i];
            const numsRelationship = Math.floor(Math.random() * (users.length / 2 + 1));
            const relationship = new Set();
            for(let j = 0; j < numsRelationship; j++)
            {
                let indexOfUser = Math.floor(Math.random() * users.length);
                while(relationship.has(indexOfUser))
                {
                    indexOfUser = Math.floor(Math.random() * users.length);
                }
                relationship.add(indexOfUser);
                if(relationship.size >= users.length)
                {
                    throw new Error('Out of index of users');
                }
                const user2 = users[indexOfUser];
                relationships.push({user1: user1._id, user2: user2._id});
            }
        }
        return relationships;
    }
}

