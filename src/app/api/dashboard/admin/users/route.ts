import { NextResponse, type NextRequest } from 'next/server';
import {
    forbidden,
    getApiUser,
    normalizePlan,
    normalizeRole,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { toISOString } from '@/lib/serialize';

export async function GET(request: NextRequest) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'admin') return forbidden();

        const db = await getDb();
        const users = await db
            .collection('user')
            .find({}, { projection: { passwordHash: 0 } })
            .sort({ createdAt: -1 })
            .toArray();

        return NextResponse.json({
            success: true,
            message: 'Users fetched successfully.',
            data: users.map((item) => ({
                _id: String(item._id),
                name: String(item.name ?? ''),
                email: String(item.email ?? ''),
                image: typeof item.image === 'string' ? item.image : '',
                role: normalizeRole(
                    typeof item.role === 'string' ? item.role : undefined,
                ),
                plan: normalizePlan(
                    typeof item.subscriptionPlan === 'string'
                        ? item.subscriptionPlan
                        : typeof item.plan === 'string'
                          ? item.plan
                          : undefined,
                ),
                createdAt: toISOString(item.createdAt),
            })),
        });
    } catch (error) {
        console.error('Get admin users error:', error);
        return serverError();
    }
}
