import 'server-only';
import { NextResponse, type NextRequest } from 'next/server';
import { auth } from './auth';

export type DashboardRole = 'student' | 'tutor' | 'admin';
export type UserPlan = 'free' | 'pro';

export interface ApiUser {
    id: string;
    name: string;
    email: string;
    role: DashboardRole;
    plan: UserPlan;
}

export const normalizeRole = (role?: string | null): DashboardRole => {
    const value = (role ?? '').toLowerCase();
    if (value === 'tutor' || value === 'admin') return value;
    return 'student';
};

export const normalizePlan = (plan?: string | null): UserPlan =>
    (plan ?? '').toLowerCase() === 'pro' ? 'pro' : 'free';

/** Reads the Better Auth session from an incoming API request. */
export async function getApiUser(
    request: NextRequest,
): Promise<ApiUser | null> {
    const session = await auth.api.getSession({ headers: request.headers });
    if (!session?.user) return null;

    const user = session.user as {
        id: string;
        name: string;
        email: string;
        role?: string | null;
        subscriptionPlan?: string | null;
        plan?: string | null;
    };

    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: normalizeRole(user.role),
        plan: normalizePlan(user.subscriptionPlan ?? user.plan),
    };
}

export const unauthorized = () =>
    NextResponse.json(
        { success: false, message: 'Please sign in to continue.' },
        { status: 401 },
    );

export const forbidden = (
    message = 'You do not have permission to perform this action.',
) => NextResponse.json({ success: false, message }, { status: 403 });

export const badRequest = (message: string) =>
    NextResponse.json({ success: false, message }, { status: 400 });

export const notFound = (message = 'Record not found.') =>
    NextResponse.json({ success: false, message }, { status: 404 });

export const serverError = (message = 'Something went wrong. Please try again.') =>
    NextResponse.json({ success: false, message }, { status: 500 });
