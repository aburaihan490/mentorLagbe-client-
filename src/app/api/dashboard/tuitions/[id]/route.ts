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
import { parseTuitionInput } from '@/lib/tuition-input';
import type { Document } from 'mongodb';

type RouteContext = { params: Promise<{ id: string }> };

export async function PATCH(request: NextRequest, context: RouteContext) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();

        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return badRequest('Invalid tuition id.');

        const body = (await request.json()) as Record<string, unknown>;
        const db = await getDb();
        const collection = db.collection('tuitions');
        const filter = { _id: new ObjectId(id) };

        const tuition = await collection.findOne(filter);
        if (!tuition) return notFound('Tuition not found.');

        const isOwner =
            String(tuition.tutorEmail ?? '')
                .trim()
                .toLowerCase() === user.email.trim().toLowerCase();

        // Admin approval flow
        if (body.approvalStatus !== undefined) {
            if (user.role !== 'admin') return forbidden();

            const approvalStatus = String(body.approvalStatus).toLowerCase();
            if (!['approved', 'rejected', 'pending'].includes(approvalStatus)) {
                return badRequest('Invalid approval status.');
            }

            await collection.updateOne(filter, {
                $set: { approvalStatus, updatedAt: new Date() },
            });

            const updated = await collection.findOne(filter);
            return NextResponse.json({
                success: true,
                message: 'Approval status updated successfully.',
                data: updated ? serializeDocument(updated as Document) : null,
            });
        }

        // Tutor: toggle active / closed
        if (body.action === 'toggle') {
            if (!isOwner && user.role !== 'admin') return forbidden();

            await collection.updateOne(filter, {
                $set: {
                    isActive: !tuition.isActive,
                    updatedAt: new Date(),
                },
            });

            const updated = await collection.findOne(filter);
            return NextResponse.json({
                success: true,
                message: 'Tuition status updated successfully.',
                data: updated ? serializeDocument(updated as Document) : null,
            });
        }

        // Tutor: edit tuition details
        if (!isOwner && user.role !== 'admin') {
            return forbidden('You can only edit your own tuitions.');
        }

        const { value, errors } = parseTuitionInput(body);
        if (!value) return badRequest(errors[0]);

        await collection.updateOne(filter, {
            $set: { ...value, updatedAt: new Date() },
        });

        const updated = await collection.findOne(filter);
        return NextResponse.json({
            success: true,
            message: 'Tuition updated successfully.',
            data: updated ? serializeDocument(updated as Document) : null,
        });
    } catch (error) {
        console.error('Update tuition error:', error);
        return serverError();
    }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
    try {
        const user = await getApiUser(request);
        if (!user) return unauthorized();

        const { id } = await context.params;
        if (!ObjectId.isValid(id)) return badRequest('Invalid tuition id.');

        const db = await getDb();
        const collection = db.collection('tuitions');
        const filter = { _id: new ObjectId(id) };

        const tuition = await collection.findOne(filter);
        if (!tuition) return notFound('Tuition not found.');

        const isOwner =
            String(tuition.tutorEmail ?? '')
                .trim()
                .toLowerCase() === user.email.trim().toLowerCase();

        if (!isOwner && user.role !== 'admin') {
            return forbidden('You can only delete your own tuitions.');
        }

        await collection.deleteOne(filter);

        return NextResponse.json({
            success: true,
            message: 'Tuition deleted successfully.',
        });
    } catch (error) {
        console.error('Delete tuition error:', error);
        return serverError();
    }
}
