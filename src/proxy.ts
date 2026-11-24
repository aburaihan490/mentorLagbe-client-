import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';

export async function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // সেশন চেক করা (request.headers ব্যবহার করা ভালো)
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    // ১. ইউজার লগইন করা না থাকলে sign-in পেজে পাঠিয়ে দিবে
    if (!session) {
        return NextResponse.redirect(new URL('/sign-in', request.url));
    }

    // ২. রোল অনুযায়ী রুট প্রোটেকশন (অপশনাল, তবে সিকিউরিটির জন্য জরুরি)
    // ধরে নিচ্ছি session.user.role-এ ইউজারের রোল ('student' | 'tutor' | 'admin') আছে
    const userRole = (session.user as { role?: string })?.role;

    const lowUserRole = userRole?.toLocaleLowerCase();

    if (lowUserRole) {
        // স্টুডেন্ট যেন টিউটর বা অ্যাডমিনের পেজে না যেতে পারে
        if (pathname.startsWith('/student') && lowUserRole !== 'student') {
            return NextResponse.redirect(
                new URL(`/${lowUserRole}/dashboard`, request.url),
            );
        }
        // টিউটর যেন স্টুডেন্ট বা অ্যাডমিনের পেজে না যেতে পারে
        if (pathname.startsWith('/tutor') && lowUserRole !== 'tutor') {
            return NextResponse.redirect(
                new URL(`/${lowUserRole}/dashboard`, request.url),
            );
        }
        // অ্যাডমিন যেন অন্য রোলের পেজে না যেতে পারে
        if (pathname.startsWith('/admin') && lowUserRole !== 'admin') {
            return NextResponse.redirect(
                new URL(`/${lowUserRole}/dashboard`, request.url),
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    // '/student/:path*' দিলে student-এর ভেতরের সব রুট (dashboard, favorites ইত্যাদি) অটোমেটিক প্রোটেক্ট হয়ে যাবে
    matcher: [
        '/dashboard',
        '/student/:path*',
        '/tutor/:path*',
        '/admin/:path*',
    ],
};
