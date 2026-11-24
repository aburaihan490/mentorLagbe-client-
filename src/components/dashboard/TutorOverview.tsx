'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
    ArrowRight,
    BookOpen,
    CheckCircle2,
    Crown,
    FileText,
    PlusCircle,
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

interface TutorStats {
    totalTuitions: number;
    activeTuitions: number;
    totalApplicants: number;
    plan: 'free' | 'pro';
}

const quickLinks = [
    {
        href: '/tutor/post-tuition',
        icon: PlusCircle,
        title: 'Post a Tuition',
        description: 'Create a new listing for students.',
        tone: 'bg-emerald-50 text-emerald-600',
    },
    {
        href: '/tutor/my-tuitions',
        icon: BookOpen,
        title: 'My Tuitions',
        description: 'Edit, close or delete your listings.',
        tone: 'bg-blue-50 text-blue-600',
    },
    {
        href: '/tutor/applicants',
        icon: FileText,
        title: 'Applicants',
        description: 'Review and respond to students.',
        tone: 'bg-violet-50 text-violet-600',
    },
];

const TutorOverview = () => {
    const [stats, setStats] = useState<TutorStats | null>(null);
    const [tuitions, setTuitions] = useState<ITuition[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const [statsResponse, tuitionResponse] = await Promise.all([
                    fetch('/api/dashboard/tutor/stats', { cache: 'no-store' }),
                    fetch('/api/dashboard/tuitions', { cache: 'no-store' }),
                ]);

                const statsResult = await statsResponse.json();
                const tuitionResult = await tuitionResponse.json();

                if (statsResponse.ok) setStats(statsResult.data);
                if (tuitionResponse.ok) setTuitions(tuitionResult.data ?? []);
            } catch (error) {
                console.error('Tutor overview error:', error);
            } finally {
                setLoading(false);
            }
        };

        void load();
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                title="Tutor Dashboard"
                description="Welcome back! Here is what is happening with your tuitions."
            >
                <Link
                    href="/tutor/post-tuition"
                    className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    <PlusCircle className="h-4 w-4" />
                    Post a Tuition
                </Link>
            </PageHeader>

            {loading ? (
                <LoadingGrid />
            ) : (
                <StatsCards
                    items={[
                        {
                            label: 'Total Tuitions Posted',
                            value: stats?.totalTuitions ?? 0,
                            hint: 'All time listings',
                            icon: BookOpen,
                            tone: 'emerald',
                        },
                        {
                            label: 'Active / Approved',
                            value: stats?.activeTuitions ?? 0,
                            hint: 'Live on the platform',
                            icon: CheckCircle2,
                            tone: 'blue',
                        },
                        {
                            label: 'Applicants Received',
                            value: stats?.totalApplicants ?? 0,
                            hint: 'Across all your tuitions',
                            icon: Users,
                            tone: 'violet',
                        },
                        {
                            label: 'Current Plan',
                            value: stats?.plan === 'pro' ? 'Pro' : 'Free',
                            hint:
                                stats?.plan === 'pro'
                                    ? 'Unlimited tuition posts'
                                    : 'Up to 2 tuition posts',
                            icon: Crown,
                            tone: 'amber',
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
                        Recent Tuitions
                    </h2>
                    <Link
                        href="/tutor/my-tuitions"
                        className="text-sm font-semibold text-emerald-600 hover:underline"
                    >
                        View all
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
                ) : tuitions.length === 0 ? (
                    <EmptyState
                        title="No tuitions yet"
                        description="Post your first tuition to start receiving applications."
                        action={
                            <Link
                                href="/tutor/post-tuition"
                                className="inline-flex h-10 items-center rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-700"
                            >
                                Post a Tuition
                            </Link>
                        }
                    />
                ) : (
                    <div className="divide-y divide-slate-100">
                        {tuitions.slice(0, 5).map((tuition) => (
                            <div
                                key={tuition._id}
                                className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                            >
                                <div className="min-w-0">
                                    <p className="truncate font-semibold text-slate-900">
                                        {tuition.title}
                                    </p>
                                    <p className="mt-0.5 text-xs text-slate-500">
                                        {tuition.subject} ·{' '}
                                        {tuition.classLevel} ·{' '}
                                        {formatCurrency(tuition.monthlyFee)}/mo
                                    </p>
                                </div>
                                <StatusBadge
                                    status={tuition.approvalStatus}
                                    label={`Approval: ${tuition.approvalStatus}`}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TutorOverview;
