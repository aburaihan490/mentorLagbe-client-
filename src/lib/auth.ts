import { betterAuth } from 'better-auth';
import { MongoClient } from 'mongodb';
import { mongodbAdapter } from '@better-auth/mongo-adapter';
import { jwt } from 'better-auth/plugins';

const client = new MongoClient(process.env.MONGODB_URL as string);
const db = client.db('mentorlagbe');
export const auth = betterAuth({
    database: mongodbAdapter(db),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false,
    },
    plugins: [jwt()],
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 5 * 60 * 60,
        },
    },
    user: {
        additionalFields: {
            role: {
                type: ['student', 'tutor', 'admin'],
                required: true,
                defaultValue: 'Student',
                input: true,
            },

            subscriptionPlan: {
                type: 'string',
                required: false,
                defaultValue: 'free',
                input: false,
            },
        },
    },
});
