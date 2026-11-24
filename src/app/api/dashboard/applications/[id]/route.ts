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
import { serializeDocument } from '@/lib/serialize';
import type { Document } from 'mongodb';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();
        if (user.role !== 'tutor') {
            return forbidden('Only tutors can manage applicants.');
        }

        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return badRequest('Invalid application id.');

        const body = (await request.json()) as Record<string, unknown>;
        const status = String(body.status ?? '').toLowerCase();
        if (status !== 'accepted' && status !== 'rejected') {
            return badRequest('Status must be accepted or rejected.');
        }

        const db = await getDb();
        const collection = db.collection('applications');
        const filter = { _id: new ObjectId(id) };

        const application = await collection.findOne(filter);
        if (!application) return notFound('Application not found.');

        const isOwner =
            String(application.tutorEmail ?? '')
                .trim()
                .toLowerCase() === user.email.trim().toLowerCase();

        if (!isOwner) {
            return forbidden('You can only manage applicants for your tuitions.');
        }

        await collection.updateOne(filter, {
            $set: { status, updatedAt: new Date() },
        });

        const updated = await collection.findOne(filter);
        return NextResponse.json({
            success: true,
            message: `Applicant ${status} successfully.`,
            data: updated ? serializeDocument(updated as Document) : null,
        });
    } catch (error) {
        console.error('Update application error:', error);
        return serverError();
    }
}
