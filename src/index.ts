import { connect, disconnect} from './db';

process.on('uncaughtException', async (error) => {
    console.error('Uncaught exception', error);
    await disconnect();
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled rejection at ', promise, 'reason: ', reason);
    await disconnect();
    process.exit(1);
});

async function setupConnectionToDb() {
    await connect();
}

setupConnectionToDb();