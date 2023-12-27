import { expect } from 'chai';
import { UserRepo } from '../../src/db/repositories/User.Repo';
import { Database } from '../../src/db';
import { Db, MongoClient } from 'mongodb';
import { UserCollection } from '../../src/db/models/User.schema';

const EXAMPLE_USER = 
{
    user1: {
            username: 'test1',
            password: 'test1',
            email: 'test@test.com',
            firstName: 'Adam1',
            lastName: 'Smith1' 
    },
    user2: {
        username: 'test2',
        password: 'test2',
        email: 'test2@test2.com',
        firstName: 'Jone',
        lastName: 'Kate' 
    },

    user3: {
        username: 'test3',
        password: 'test3',
        email: 'test3@test3.com',
        firstName: 'AD',
        lastName: 'Jones' 
    },

    user4: {
        username: 'test4',
        password: 'test4',
        email: 'test4@test4.com',
        firstName: 'Sion',
        lastName: 'Mhan' 
    },

}
describe('UserRepo', () => {
    let db: Db | undefined;
    let userRepo: UserRepo;

    before(async () => {
        await Database.getInstance().connect();
        db = Database.getInstance().getDb();
        userRepo = UserRepo.getInstance();
    });

    after(async () => {
        if(db)
        {
            await db.collection(UserCollection).drop();
            await Database.getInstance().disconnect()
        }
    });

    describe('create', () => {
        it('should insert a user into the database', async () => {
            expect(db).to.not.be.undefined;
            
            const result = await userRepo.create(EXAMPLE_USER.user1);
            expect(result.acknowledged).to.be.true;
            const insertedUser = db ? await db.collection('users').findOne({ _id: result.insertedId }) : null;
            expect(insertedUser).to.deep.equal({ _id: result.insertedId, ...EXAMPLE_USER.user1 });
        });
    });


    describe('find', () => {
        it('should find a user in the database', async () => {
            const result = await userRepo.create(EXAMPLE_USER.user2);
            const foundUser = await userRepo.find({ _id: result.insertedId });
            expect(foundUser).to.deep.equal([{ _id: result.insertedId, ...EXAMPLE_USER.user2 }]);
        });
    });

    describe('delete', () => {
        it('should delete a user from the database', async () => {
            const foundUser = await userRepo.find({ username: EXAMPLE_USER.user2.username }); 
            console.log(foundUser)  
            const result = await userRepo.delete( foundUser[0]._id );
            expect(result.acknowledged).to.equal(true);
            expect(result.deletedCount).to.equal(1);
            const foundAgain = await userRepo.find({ username: EXAMPLE_USER.user2.username });   
            expect(foundAgain).to.deep.equal([]);
        });
    });
    
    describe('update', () => {
        it('should update a user in the database', async () => {
            const updatedInfor = {
                username: 'updatedTest1',
                password: 'updatedTest1',
                email: 'updatedTest1@test1.com',
                lastName: 'updatedSmith1',
                firstName: 'updatedAdam1',
            };

            const foundUser = await userRepo.find({ username: EXAMPLE_USER.user1.username });   
            const userUpdated = await userRepo.update(foundUser[0]._id, 
                                                      { $set: updatedInfor });
            const foundAgain = await userRepo.find({ _id: foundUser[0]._id });
            expect(foundAgain).to.deep.equal([{ _id: foundUser[0]._id, ...updatedInfor }]);
        });
    });
    

    describe('insertMany', () => {
        it('should insert multiple users into the database', async () => {
            const users = [
                EXAMPLE_USER.user3,
                EXAMPLE_USER.user4,
            ];
            const result = await userRepo.insertMany(users);
            expect(result.insertedCount).to.equal(users.length);
        });
    });
    

    
});