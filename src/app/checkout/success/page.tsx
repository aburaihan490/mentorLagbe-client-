'use client';
import { authClient } from '@/lib/auth-client';
import { CheckCircle2, Home, Receipt } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const SuccessPage = () => {
    const { refetch } = authClient.useSession();

    useEffect(() => {
        // সেশন এবং কুকি ক্যাশ জোরপূর্বক আপডেট করার জন্য
        authClient
            .getSession({
                query: { disableCookieCache: true },
            })
            .then(() => {
                refetch();
            });
    }, [refetch]);
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-green-100">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle2 className="w-14 h-14 text-green-600" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Successful!
                </h1>

                <p className="text-gray-500 leading-relaxed mb-7">
                    Congratulations! Your payment has been completed
                    successfully. Your subscription is now being processed.
                </p>

                <div className="bg-green-50 rounded-2xl p-4 mb-7">
                    <div className="flex items-center justify-center gap-2 text-green-700 font-semibold">
                        <Receipt size={20} />
                        Payment Confirmed
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                        Thank you for choosing our service.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-green-600 mt-5 text-sm font-medium"
                >
                    <Home size={17} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default SuccessPage;
