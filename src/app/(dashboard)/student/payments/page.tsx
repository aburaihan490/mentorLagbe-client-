'use client';

import { authClient } from '@/lib/auth-client';
import { useEffect, useState } from 'react';

interface Payment {
    _id: string;
    userId: string;
    userEmail: string;
    role: string;
    stripeCustomerId: string;
    stripeCheckoutSessionId: string;
    stripeSubscriptionId: string;
    subscriptionPlan: string;
    amount: number;
    currency: string;
    status: string;
    paymentStatus: string;
    createdAt: string;
    updatedAt: string;
}

interface PaymentSummary {
    totalPaid: number;
    pendingPayments: number;
    thisMonth: number;
}

interface PaymentResponse {
    success: boolean;
    summary: PaymentSummary;
    payments: Payment[];
    message?: string;
}

const PaymentsPage = () => {
    const [payments, setPayments] = useState<Payment[]>([]);

    const [summary, setSummary] = useState<PaymentSummary>({
        totalPaid: 0,
        pendingPayments: 0,
        thisMonth: 0,
    });

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const API_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    useEffect(() => {
        const fetchPayments = async (): Promise<void> => {
            try {
                if (!API_URL) {
                    throw new Error('API URL is not configured');
                }

                const { data, error } = await authClient.token();

                if (error || !data?.token) {
                    throw new Error(error?.message || 'Authentication failed');
                }

                const response = await fetch(
                    `${API_URL}/checkout/get-student-payments`,
                    {
                        headers: {
                            Authorization: `Bearer ${data.token}`,
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const result: PaymentResponse = await response.json();

                if (!result.success) {
                    throw new Error(result.message || 'Something went wrong');
                }

                setPayments(result.payments);
                setSummary(result.summary);
            } catch (error: unknown) {
                console.error('Payment fetch error:', error);

                setError(
                    error instanceof Error
                        ? error.message
                        : 'Something went wrong',
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const formatAmount = (amount: number, currency: string): string => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency.toUpperCase(),
        }).format(amount / 100);
    };

    if (loading) {
        return <div className="p-6">Loading payments...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">{error}</div>;
    }

    return (
        <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-slate-500 text-sm">Total Paid</p>

                    <p className="text-2xl font-bold">
                        {formatAmount(summary.totalPaid, 'usd')}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-slate-500 text-sm">Pending Payments</p>

                    <p className="text-2xl font-bold text-emerald-600">
                        {formatAmount(summary.pendingPayments, 'usd')}
                    </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <p className="text-slate-500 text-sm">This Month</p>

                    <p className="text-2xl font-bold">
                        {formatAmount(summary.thisMonth, 'usd')}
                    </p>
                </div>
            </div>

            {/* Payment History */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Payment History</h2>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b text-left">
                                <th className="p-3">Transaction ID</th>
                                <th className="p-3">Plan</th>
                                <th className="p-3">Amount</th>
                                <th className="p-3">Date</th>
                                <th className="p-3">Status</th>
                            </tr>
                        </thead>

                        <tbody>
                            {payments.length > 0 ? (
                                payments.map((payment) => (
                                    <tr key={payment._id} className="border-b">
                                        <td className="p-3 text-sm">
                                            {payment.stripeCheckoutSessionId}
                                        </td>

                                        <td className="p-3 font-medium">
                                            {payment.subscriptionPlan}
                                        </td>

                                        <td className="p-3">
                                            {formatAmount(
                                                payment.amount,
                                                payment.currency,
                                            )}
                                        </td>

                                        <td className="p-3 text-sm">
                                            {new Date(
                                                payment.createdAt,
                                            ).toLocaleDateString()}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={`text-xs px-2 py-1 rounded ${
                                                    payment.paymentStatus ===
                                                    'paid'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : payment.paymentStatus ===
                                                            'pending'
                                                          ? 'bg-yellow-100 text-yellow-700'
                                                          : 'bg-red-100 text-red-700'
                                                }`}
                                            >
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="text-center p-6 text-slate-500"
                                    >
                                        No payment history found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PaymentsPage;
