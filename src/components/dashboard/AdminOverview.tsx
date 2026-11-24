'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Clock3,
    CreditCard,
    Users,
} from 'lucide-react';
import type { ITuition } from '@/types/tuition';
import { formatCurrency } from '@/lib/format';
import {
    EmptyState,
    LoadingGrid,
    PageHeader,
    StatsCards,
} from './StatsCards';
import { StatusBadge } from './StatusBadge';

interface AdminStats {
    totalUsers: number;
    totalTutors: number;
    pendingTuitions: number;
    approvedTuitions: number;
    totalRevenue: number;
    totalTransactions: number;
}

const quickLinks = [
    {
        href: '/admin/users',
        icon: Users,
        title: 'User Management',
        description: 'View users and manage their roles.',
        tone: 'bg-blue-50 text-blue-600',
    },
    {
        href: '/admin/tuitions',
        icon: BookOpen,
        title: 'Tuition Approval',
        description: 'Approve or reject new listings.',
        tone: 'bg-amber-50 text-amber-600',
    },
    {
        href: '/admin/transactions',
        icon: CreditCard,
        title: 'Transactions',
        description: 'Review Stripe subscription payments.',
        tone: 'bg-violet-50 text-violet-600',
    },
];

const AdminOverview = () => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [tuitions, setTuitions] = useState<ITuition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [statsResponse, tuitionResponse] = await Promise.all([
                    fetch('/api/dashboard/admin/stats', { cache: 'no-store' }),
                    fetch('/api/dashboard/tuitions?scope=all', {
                        cache: 'no-store',
                    }),
                ]);

                const statsResult = await statsResponse.json();
                const tuitionResult = await tuitionResponse.json();

                if (statsResponse.ok) setStats(statsResult.data);
                if (tuitionResponse.ok) setTuitions(tuitionResult.data ?? []);
            } catch (error) {
                console.error('Admin overview error:', error);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, []);

    const pendingTuitions = tuitions.filter(
        (item) => item.approvalStatus === 'pending',
    );

    return (
        <div className="space-y-6">
            <PageHeader
                title="Admin Dashboard"
                description="A snapshot of platform activity and performance."
            />

            {loading ? (
                <LoadingGrid />
            ) : (
                <StatsCards
                    items={[
                        {
                            label: 'Total Users',
                            value: stats?.totalUsers ?? 0,
                            hint: 'Registered accounts',
                            icon: Users,
                            tone: 'blue',
                        },
                        {
                            label: 'Total Tutors',
                            value: stats?.totalTutors ?? 0,
                            hint: 'Tutor accounts',
                            icon: CheckCircle2,
                            tone: 'emerald',
                        },
                        {
                            label: 'Pending vs Approved',
                            value: `${stats?.pendingTuitions ?? 0} / ${stats?.approvedTuitions ?? 0}`,
                            hint: 'Pending / Approved tuitions',
                            icon: Clock3,
                            tone: 'amber',
                        },
                        {
                            label: 'Total Stripe Revenue',
                            value: formatCurrency(stats?.totalRevenue ?? 0),
                            hint: `${stats?.totalTransactions ?? 0} subscription payments`,
                            icon: CreditCard,
                            tone: 'violet',
                        },
                    ]}
                />
            )}

            <div className="grid gap-4 md:grid-cols-3">
                {quickLinks.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="group rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md"
                        >
                            <div className="flex items-start justify-between">
                                <span
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${item.tone}`}
                                >
                                    <Icon className="h-5 w-5" />
                                </span>
                                <ArrowRight className="h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-emerald-600" />
                            </div>
                            <h3 className="mt-4 font-bold text-slate-900">
                                {item.title}
                            </h3>
                            <p className="mt-1 text-sm text-slate-500">
                                {item.description}
                            </p>
                        </Link>
                    );
                })}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                    <h2 className="font-bold text-slate-900">
                        Tuitions Awaiting Approval
                    </h2>
                    <Link
                        href="/admin/tuitions"
                        className="text-sm font-semibold text-emerald-600 hover:underline"
                    >
                        Review all
                    </Link>
                </div>

                {loading ? (
                    <div className="space-y-3 p-6">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-14 animate-pulse rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                ) : pendingTuitions.length === 0 ? (
                    <EmptyState
                        title="All caught up"
                        description="There are no tuitions waiting for approval."
                    />
                ) : (
                    <div className="divide-y divide-slate-100">
                        {pendingTuitions.slice(0, 5).map((tuition) => (
                            <div
                                key={tuition._id}
                                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-slate-900">
                                        {tuition.title}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {tuition.tutorName} ·{' '}
                                        {tuition.tutorEmail} ·{' '}
                                        {formatCurrency(tuition.monthlyFee)}
                                    </p>
                                </div>
                                <StatusBadge status="pending" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminOverview;
