import { da } from '@faker-js/faker';
import { Database} from './db';
import { DataServices } from './service/AutogenData/DataServices';
import * as dotenv from 'dotenv'
import { Exercise } from './service/Exercises/exercise';
dotenv.config()

let dbInstance: Database | null= null
async function setupConnectionToDb() {
    const dbInstance = Database.getInstance();
    const db = await dbInstance.connect();
    if(process.env.AUTO_GENERATE_DATA === 'true')
    {
        const dataServices = new DataServices();
        await dataServices.dropDatabase();
        await dataServices.generateUsers(100);
        await dataServices.generatePosts(1, 3);
        await dataServices.generateComments(2);
        await dataServices.generateLikes();
        await dataServices.generateMessages();
    }
    else
    {
        console.log("Data Is Not Generated Automatically - Using Existing Data")
    }

    const exercies = new Exercise()
    const result = await exercies.getPostWithComment('658c42bf609cc7ee114c7e51')
    console.log(result)
}


setupConnectionToDb()

// process.on('uncaughtException', async (error) => {
//     console.error('Uncaught exception', error);
//     await dbInstance!.disconnect();
//     process.exit(1);
// });

// process.on('unhandledRejection', async (reason, promise) => {
//     console.error('Unhandled rejection at ', promise, 'reason: ', reason);
//     await dbInstance!.disconnect();
//     process.exit(1);
// });

