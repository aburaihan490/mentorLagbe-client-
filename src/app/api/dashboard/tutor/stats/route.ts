import { NextResponse, type NextRequest } from 'next/server';
import {
    forbidden,
    getApiUser,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';

export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'tutor') return forbidden();

        const db = await getDb();
        const email = user.email.trim().toLowerCase();

        const [totalTuitions, activeTuitions, totalApplicants] =
            await Promise.all([
                db.collection('tuitions').countDocuments({ tutorEmail: email }),
                db.collection('tuitions').countDocuments({
                    tutorEmail: email,
                    approvalStatus: 'approved',
                    isActive: true,
                }),
                db.collection('applications').countDocuments({
                    tutorEmail: email,
                }),
            ]);

        return NextResponse.json({
            success: true,
            data: {
                totalTuitions,
                activeTuitions,
                totalApplicants,
                plan: user.plan,
            },
        });
    } catch (error) {
        console.error('Get tutor stats error:', error);
        return serverError();
    }
}
