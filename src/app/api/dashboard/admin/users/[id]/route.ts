import { NextResponse, type NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import {
    badRequest,
    forbidden,
    getApiUser,
    notFound,
    serverError,
    unauthorized,
} from '@/lib/api-auth';
import { getDb } from '@/lib/db';
import { normalizeRole, type DashboardRole } from '@/lib/api-auth';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'admin') return forbidden();

        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return badRequest('Invalid user id.');

        if (id === user.id) {
            return badRequest('You cannot change your own role.');
        }

        const body = (await request.json()) as Record<string, unknown>;
        const requestedRole = String(body.role ?? '').toLowerCase();
        const allowedRoles: DashboardRole[] = ['student', 'tutor', 'admin'];

        if (!allowedRoles.includes(requestedRole as DashboardRole)) {
            return badRequest('Role must be student, tutor or admin.');
        }

        const db = await getDb();
        const collection = db.collection('user');
        const filter = { _id: new ObjectId(id) };

        const target = await collection.findOne(filter);
        if (!target) return notFound('User not found.');

        // Keep a consistent lowercase value for the dashboard and proxy.
        await collection.updateOne(filter, {
            $set: { role: normalizeRole(requestedRole), updatedAt: new Date() },
        });

        return NextResponse.json({
            success: true,
            message: `User role updated to ${requestedRole}.`,
            data: {
                _id: id,
                name: String(target.name ?? ''),
                email: String(target.email ?? ''),
                role: requestedRole,
            },
        });
    } catch (error) {
        console.error('Update user role error:', error);
        return serverError();
    }
}
