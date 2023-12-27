import { Database} from './db';

let dbInstance: Database | null= null
async function setupConnectionToDb() {
    const dbInstance = Database.getInstance();
    const db = await dbInstance.connect();
}

setupConnectionToDb()

process.on('uncaughtException', async (error) => {
    console.error('Uncaught exception', error);
    await dbInstance!.disconnect();
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled rejection at ', promise, 'reason: ', reason);
    await dbInstance!.disconnect();
    process.exit(1);
});

;