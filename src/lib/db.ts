import 'server-only';
import { Db, MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URL;

type GlobalWithMongo = typeof globalThis & {
    __mentorLagbeClientPromise?: Promise<MongoClient>;
};

const globalForMongo = globalThis as GlobalWithMongo;

const getClientPromise = (): Promise<MongoClient> => {
    if (!uri) {
        throw new Error('MONGODB_URL is not configured');
    }

    if (!globalForMongo.__mentorLagbeClientPromise) {
        globalForMongo.__mentorLagbeClientPromise = new MongoClient(
            uri,
        ).connect();
    }

    return globalForMongo.__mentorLagbeClientPromise;
};

/** Shared MongoDB connection for the dashboard API routes. */
export async function getDb(): Promise<Db> {
    const client = await getClientPromise();
    return client.db('mentorlagbe');
}
