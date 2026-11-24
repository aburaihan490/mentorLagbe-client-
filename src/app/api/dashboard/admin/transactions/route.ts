import { NextResponse, type NextRequest } from 'next/server';
import {
    forbidden,
    getApiUser,
    normalizeRole,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { readAmount, toISOString } from '@/lib/serialize';
import type { IPayment } from '@/types/payment';

const pickString = (...values: unknown[]): string => {
    for (const value of values) {
        if (typeof value === 'string' && value) return value;
    }
    return '';
};

export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'admin') return forbidden();

        const db = await getDb();
        const payments = await db
            .collection('payments')
            .find({})
            .sort({ createdAt: -1, created: -1 })
            .toArray();

        const data: IPayment[] = payments.map((payment) => {
            const embeddedUser =
                payment.user && typeof payment.user === 'object'
                    ? (payment.user as Record<string, unknown>)
                    : {};

            return {
                _id: String(payment._id),
                userName: pickString(
                    payment.userName,
                    payment.name,
                    embeddedUser.name,
                ),
                email: pickString(
                    payment.email,
                    payment.userEmail,
                    embeddedUser.email,
                ),
                role: normalizeRole(
                    pickString(
                        typeof payment.role === 'string' ? payment.role : '',
                        typeof embeddedUser.role === 'string'
                            ? embeddedUser.role
                            : '',
                    ),
                ),
                planName: pickString(
                    payment.planName,
                    payment.plan,
                    payment.priceId,
                ),
                amount: readAmount(
                    payment.amountTotal ??
                        payment.amount_total ??
                        payment.amount ??
                        payment.price ??
                        0,
                ),
                currency: pickString(payment.currency, 'BDT') || 'BDT',
                transactionId: pickString(
                    payment.transactionId,
                    payment.paymentIntentId,
                    payment.sessionId,
                    String(payment._id),
                ),
                paymentDate: toISOString(
                    payment.paymentDate ??
                        payment.createdAt ??
                        payment.date ??
                        payment.created,
                ),
                status:
                    pickString(payment.status, payment.paymentStatus) ||
                    'completed',
            };
        });

        return NextResponse.json({
            success: true,
            message: 'Transactions fetched successfully.',
            data,
        });
    } catch (error) {
        console.error('Get transactions error:', error);
        return serverError();
    }
}
