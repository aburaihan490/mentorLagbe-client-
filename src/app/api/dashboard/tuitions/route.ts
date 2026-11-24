import { NextResponse, type NextRequest } from 'next/server';
import {
    badRequest,
    forbidden,
    getApiUser,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { serializeDocument } from '@/lib/serialize';
import { parseTuitionInput } from '@/lib/tuition-input';

/** Tutor: own tuitions. Admin: every tuition (?scope=all). */
export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();

        const scope = request.nextUrl.searchParams.get('scope');
        if (scope === 'all' && user.role !== 'admin') return forbidden();

        if (user.role !== 'tutor' && user.role !== 'admin') {
            return forbidden();
        }

        const db = await getDb();
        const filter =
            user.role === 'admin'
                ? {}
                : { tutorEmail: user.email.trim().toLowerCase() };

        const tuitions = await db
            .collection('tuitions')
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            message: 'Tuitions fetched successfully.',
            data: tuitions.map(serializeDocument),
        });
    } catch (error) {
        console.error('Get dashboard tuitions error:', error);
        return serverError();
    }
}

/** Tutor: create a tuition (pending approval, max 2 on the free plan). */
export async function POST(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'tutor') {
            return forbidden('Only tutors can post tuitions.');
        }

        const body = (await request.json()) as Record<string, unknown>;
        const { value, errors } = parseTuitionInput(body);
        if (!value) return badRequest(errors[0]);

        const db = await getDb();
        const collection = db.collection('tuitions');
        const email = user.email.trim().toLowerCase();

        const existingCount = await collection.countDocuments({
            tutorEmail: email,
        });

        if (user.plan === 'free' && existingCount >= 2) {
            return NextResponse.json(
                {
                    success: false,
                    code: 'PLAN_LIMIT',
                    message:
                        'Free plan tutors can post up to 2 tuitions. Upgrade to Pro for unlimited posts.',
                },
                { status: 403 },
            );
        }

        const tuition = {
            ...value,
            tutorName: user.name,
            tutorEmail: email,
            approvalStatus: 'pending',
            isActive: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await collection.insertOne(tuition);

        return NextResponse.json(
            {
                success: true,
                message:
                    'Tuition posted successfully. It is now pending admin approval.',
                data: serializeDocument({ ...tuition, _id: result.insertedId }),
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Create tuition error:', error);
        return serverError();
    }
}
