import { NextResponse, type NextRequest } from 'next/server';
import {
    forbidden,
    getApiUser,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { serializeDocument } from '@/lib/serialize';

/** Tutor: applicants for own tuitions. Admin: every application. */
export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'tutor' && user.role !== 'admin') return forbidden();

        const db = await getDb();
        const filter =
            user.role === 'tutor'
                ? {
                      tutorEmail: user.email.trim().toLowerCase(),
                  }
                : {};

        const applications = await db
            .collection('applications')
            .find(filter)
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            message: 'Applicants fetched successfully.',
            data: applications.map(serializeDocument),
        });
    } catch (error) {
        console.error('Get applicants error:', error);
        return serverError();
    }
}
