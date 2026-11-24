import { NextResponse, type NextRequest } from 'next/server';
import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { badRequest, notFound, serverError } from '@/lib/api-auth';

/** Public endpoint used by the "Apply for Tuition" modal. */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as Record<string, unknown>;

        const tuitionId = String(body.tuitionId ?? '').trim();
        const name = String(body.name ?? '').trim();
        const email = String(body.email ?? '')
            .trim()
            .toLowerCase();
        const phone = String(body.phone ?? '').trim();

        if (!ObjectId.isValid(tuitionId)) {
            return badRequest('A valid tuition is required.');
        }
        if (!name || !email || !phone) {
            return badRequest('Name, email and phone are required.');
        }

        const db = await getDb();
        const tuition = await db
            .collection('tuitions')
            .findOne({ _id: new ObjectId(tuitionId) });

        if (!tuition) return notFound('Tuition not found.');

        const application = {
            tuitionId,
            tuitionTitle: String(tuition.title ?? ''),
            tutorEmail: String(tuition.tutorEmail ?? '')
                .trim()
                .toLowerCase(),
            tutorName: String(tuition.tutorName ?? ''),
            ...(typeof body.studentId === 'string' && body.studentId
                ? { studentId: body.studentId }
                : {}),
            name,
            email,
            phone,
            qualification: String(body.qualification ?? ''),
            preferredSchedule: String(body.preferredSchedule ?? ''),
            note: String(body.note ?? body.message ?? ''),
            status: 'pending',
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        const result = await db
            .collection('applications')
            .insertOne(application);

        return NextResponse.json(
            {
                success: true,
                message: 'Application submitted successfully.',
                data: { _id: result.insertedId.toString() },
            },
            { status: 201 },
        );
    } catch (error) {
        console.error('Create application error:', error);
        return serverError();
    }
}
