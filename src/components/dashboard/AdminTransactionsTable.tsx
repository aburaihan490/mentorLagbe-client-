'use client';

import { useCallback, useEffect, useState } from 'react';
import { CreditCard, ReceiptText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { capitalize, formatDate } from '@/lib/format';
import { EmptyState, PageHeader, StatsCards } from './StatsCards';
import { StatusBadge } from './StatusBadge';
import { authClient } from '@/lib/auth-client';

export interface ITransaction {
    _id: string;
    userId?: string;
    userEmail?: string;
    role?: 'student' | 'teacher';
    subscriptionPlan?: 'free' | 'premium';
    amount?: number;
    currency?: string;
    paymentStatus?: 'paid' | 'unpaid' | 'pending' | 'failed' | string;
    status?: 'active' | 'inactive' | 'canceled' | 'past_due' | string;
    stripeCustomerId?: string;
    stripeSubscriptionId?: string;
    stripeCheckoutSessionId?: string;
    createdAt?: string;
    updatedAt?: string;
}

interface ITransactionStats {
    totalRevenue: number;
    totalTransactions: number;
    pendingPayments: number;
    pendingAmount: number;
    thisMonth: number;
}

interface ITransactionResponse {
    success: boolean;
    message: string;
    stats: ITransactionStats;
    data: ITransaction[];
}

const formatUSD = (amount: number = 0) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

const AdminTransactionsTable = () => {
    const [payments, setPayments] = useState<ITransaction[]>([]);

    const [summary, setSummary] = useState<ITransactionStats>({
        totalRevenue: 0,
        totalTransactions: 0,
        pendingPayments: 0,
        pendingAmount: 0,
        thisMonth: 0,
    });

    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            setLoading(true);

            const { data, error } = await authClient.token();

            if (error || !data?.token) {
                throw new Error(error?.message || 'Authentication failed');
            }

            const backendUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

            if (!backendUrl) {
                throw new Error('API URL is not configured');
            }

            const response = await fetch(
                `${backendUrl}/checkout/admin/transactions`,
                {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${data.token}`,
                        'Content-Type': 'application/json',
                    },
                    cache: 'no-store',
                },
            );

            const result: ITransactionResponse = await response.json();

            if (!response.ok || !result.success) {
                throw new Error(
                    result.message || 'Failed to fetch transactions',
                );
            }

            // Set transaction records
            setPayments(result.data || []);

            // Set dashboard statistics
            setSummary(result.stats);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to load transactions.',
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        const fetchTransactions = async () => {
            await load();
        };

        fetchTransactions();
    }, [load]);

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <PageHeader
                title="Transaction Management"
                description="All subscription payment records from the subscriptions collection."
            />

            {/* Dashboard Statistics */}
            {!loading && (
                <StatsCards
                    items={[
                        {
                            label: 'Total Revenue',
                            value: formatUSD(summary.totalRevenue),
                            hint: 'Total paid transactions',
                            icon: CreditCard,
                            tone: 'emerald',
                        },
                        {
                            label: 'Transactions',
                            value: summary.totalTransactions,
                            hint: 'Total payment records',
                            icon: ReceiptText,
                            tone: 'blue',
                        },
                        {
                            label: 'Pending Payments',
                            value: formatUSD(summary.pendingAmount),
                            hint: `${summary.pendingPayments} pending payments`,
                            icon: CreditCard,
                            tone: 'violet',
                        },
                        {
                            label: 'This Month',
                            value: formatUSD(summary.thisMonth),
                            hint: 'Paid this month',
                            icon: ReceiptText,
                            tone: 'amber',
                        },
                    ]}
                />
            )}

            {/* Transaction Table */}
            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                {loading ? (
                    <div className="space-y-3 p-6">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-14 animate-pulse rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                ) : payments.length === 0 ? (
                    <EmptyState
                        title="No transactions found"
                        description="Subscription payments will appear here once recorded."
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">User Email</th>

                                    <th className="px-5 py-3.5">Role</th>

                                    <th className="px-5 py-3.5">Plan</th>

                                    <th className="px-5 py-3.5">Amount</th>

                                    <th className="px-5 py-3.5">
                                        Transaction ID
                                    </th>

                                    <th className="px-5 py-3.5">Date</th>

                                    <th className="px-5 py-3.5">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {payments.map((payment) => {
                                    const status =
                                        payment.paymentStatus || 'pending';

                                    const transactionId =
                                        payment.stripeSubscriptionId ||
                                        payment.stripeCheckoutSessionId;

                                    return (
                                        <tr
                                            key={payment._id}
                                            className="text-sm transition hover:bg-slate-50/60"
                                        >
                                            {/* Email */}
                                            <td className="px-5 py-4 font-medium text-slate-700">
                                                {payment.userEmail || '—'}
                                            </td>

                                            {/* Role */}
                                            <td className="px-5 py-4 text-slate-600">
                                                {capitalize(
                                                    payment.role || '',
                                                ) || '—'}
                                            </td>

                                            {/* Subscription Plan */}
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={(
                                                        payment.subscriptionPlan ||
                                                        ''
                                                    ).toLowerCase()}
                                                    label={
                                                        capitalize(
                                                            payment.subscriptionPlan ||
                                                                '',
                                                        ) || '—'
                                                    }
                                                />
                                            </td>

                                            {/* Amount */}
                                            <td className="px-5 py-4 font-semibold text-emerald-600">
                                                {formatUSD(payment.amount || 0)}
                                            </td>

                                            {/* Transaction ID */}
                                            <td className="px-5 py-4">
                                                <p
                                                    className="max-w-44 truncate font-mono text-xs text-slate-600"
                                                    title={transactionId || ''}
                                                >
                                                    {transactionId || '—'}
                                                </p>
                                            </td>

                                            {/* Date */}
                                            <td className="px-5 py-4 text-xs text-slate-500">
                                                {payment.createdAt
                                                    ? formatDate(
                                                          payment.createdAt,
                                                      )
                                                    : '—'}
                                            </td>

                                            {/* Payment Status */}
                                            <td className="px-5 py-4">
                                                <StatusBadge status={status} />
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTransactionsTable;
