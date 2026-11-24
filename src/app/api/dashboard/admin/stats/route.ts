import { NextResponse, type NextRequest } from 'next/server';
import {
    forbidden,
    getApiUser,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { readAmount } from '@/lib/serialize';

export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'admin') return forbidden();

        const db = await getDb();

        const [totalUsers, totalTutors, pendingTuitions, approvedTuitions, payments] =
            await Promise.all([
                db.collection('user').countDocuments({}),
                db.collection('user').countDocuments({
                    role: { $regex: /^tutor$/i },
                }),
                db.collection('tuitions').countDocuments({
                    approvalStatus: 'pending',
                }),
                db.collection('tuitions').countDocuments({
                    approvalStatus: 'approved',
                }),
                db.collection('payments').find({}).toArray(),
            ]);

        const totalRevenue = payments.reduce(
            (sum, payment) =>
                sum +
                readAmount(
                    payment.amountTotal ??
                        payment.amount_total ??
                        payment.amount ??
                        payment.price ??
                        0,
                ),
            0,
        );

        return NextResponse.json({
            success: true,
            data: {
                totalUsers,
                totalTutors,
                pendingTuitions,
                approvedTuitions,
                totalRevenue,
                totalTransactions: payments.length,
            },
        });
    } catch (error) {
        console.error('Get admin stats error:', error);
        return serverError();
    }
}
