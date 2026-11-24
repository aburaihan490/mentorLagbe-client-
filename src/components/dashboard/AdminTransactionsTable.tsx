'use client';

import { useCallback, useEffect, useState } from 'react';
import { CreditCard, ReceiptText } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { IPayment } from '@/types/payment';
import { apiFetch } from '@/lib/client-api';
import { capitalize, formatCurrency, formatDate } from '@/lib/format';
import { EmptyState, PageHeader, StatsCards } from './StatsCards';
import { StatusBadge } from './StatusBadge';

const AdminTransactionsTable = () => {
    const [payments, setPayments] = useState<IPayment[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            const result = await apiFetch<IPayment[]>(
                '/api/dashboard/admin/transactions',
            );
            setPayments(result.data ?? []);
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
        void (async () => {
            await load();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const totalRevenue = payments.reduce(
        (sum, payment) => sum + Number(payment.amount || 0),
        0,
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Transaction Management"
                description="All Stripe subscription payment records from the payments collection."
            />

            {!loading && (
                <StatsCards
                    items={[
                        {
                            label: 'Total Revenue',
                            value: formatCurrency(totalRevenue),
                            hint: 'Across all payments',
                            icon: CreditCard,
                            tone: 'emerald',
                        },
                        {
                            label: 'Transactions',
                            value: payments.length,
                            hint: 'Payment records',
                            icon: ReceiptText,
                            tone: 'blue',
                        },
                        {
                            label: 'Pro Subscriptions',
                            value: payments.filter(
                                (item) =>
                                    item.planName.toLowerCase() === 'pro',
                            ).length,
                            hint: 'Pro plan payments',
                            icon: CreditCard,
                            tone: 'violet',
                        },
                        {
                            label: 'Latest Payment',
                            value: formatDate(payments[0]?.paymentDate),
                            hint: 'Most recent transaction',
                            icon: ReceiptText,
                            tone: 'amber',
                        },
                    ]}
                />
            )}

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
                        description="Stripe subscription payments will appear here once recorded."
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[950px] text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">User Name</th>
                                    <th className="px-5 py-3.5">Email</th>
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
                                {payments.map((payment) => (
                                    <tr
                                        key={payment._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4 font-semibold text-slate-900">
                                            {payment.userName || '—'}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {payment.email || '—'}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {capitalize(payment.role)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={payment.planName.toLowerCase()}
                                                label={payment.planName || '—'}
                                            />
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-emerald-600">
                                            {formatCurrency(payment.amount)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <p
                                                className="max-w-44 truncate font-mono text-xs text-slate-600"
                                                title={payment.transactionId}
                                            >
                                                {payment.transactionId}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(payment.paymentDate)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={payment.status}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminTransactionsTable;
