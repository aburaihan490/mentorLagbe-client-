import React from 'react';
import { XCircle, RefreshCcw, Home, ShieldAlert } from 'lucide-react';
import Link from 'next/link';

const CancelPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-orange-100 px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 text-center border border-red-100">
                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full bg-red-100 flex items-center justify-center">
                        <XCircle className="w-14 h-14 text-red-500" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold text-gray-800 mb-3">
                    Payment Cancelled!
                </h1>

                <p className="text-gray-500 leading-relaxed mb-7">
                    Your payment was not completed. No payment has been
                    processed. You can try again whenever you&apos;re ready.
                </p>

                <div className="bg-orange-50 rounded-2xl p-4 mb-7">
                    <div className="flex items-center justify-center gap-2 text-orange-600 font-semibold">
                        <ShieldAlert size={20} />
                        Payment Not Completed
                    </div>
                    <p className="text-sm text-orange-500 mt-1">
                        Don&apos;t worry! Your account is safe.
                    </p>
                </div>

                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-red-500 mt-5 text-sm font-medium"
                >
                    <Home size={17} />
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default CancelPage;
