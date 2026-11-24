'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Clock3, Crown, FileText, Loader2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { IApplication } from '@/types/application';
import { apiFetch } from '@/lib/client-api';
import { authClient } from '@/lib/auth-client';
import { formatCurrency, formatDate } from '@/lib/format';
import { EmptyState, LoadingGrid, PageHeader, StatsCards } from './StatsCards';
import { StatusBadge } from './StatusBadge';

const StudentOverview = () => {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data.token;

            const result = await apiFetch<IApplication[]>(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/applications/get-student-application`,
                {
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            setApplications(result.data ?? []);
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : 'Failed to load applications.';
            console.error(message);
            toast.error(message);
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

    const acceptedCount = applications.filter(
        (item) => item.status === 'accepted',
    ).length;
    const pendingCount = applications.filter(
        (item) => item.status === 'pending',
    ).length;

    const stats = [
        {
            label: 'Total Applied Tuitions',
            value: applications.length,
            hint: 'All applications you submitted',
            icon: FileText,
            tone: 'emerald' as const,
        },
        {
            label: 'Accepted Applications',
            value: acceptedCount,
            hint: 'Tutors who accepted you',
            icon: CheckCircle2,
            tone: 'blue' as const,
        },
        {
            label: 'Pending Applications',
            value: pendingCount,
            hint: 'Awaiting tutor response',
            icon: Clock3,
            tone: 'amber' as const,
        },
        {
            label: 'Current Plan',
            value: 'Free',
            icon: Crown,
            tone: 'violet' as const,
        },
    ];

    return (
        <div className="space-y-6">
            <PageHeader
                title="Student Dashboard"
                description="Track the tuitions you have applied to and their current status."
            >
                <Link
                    href="/student/my-applications"
                    className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                    My Applications
                </Link>
            </PageHeader>

            {loading ? <LoadingGrid /> : <StatsCards items={stats} />}

            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                        My Applications
                    </h2>
                    {!loading && (
                        <p className="text-sm text-slate-500">
                            {applications.length} application
                            {applications.length === 1 ? '' : 's'}
                        </p>
                    )}
                </div>

                {loading ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-14 text-sm text-slate-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading applications...
                    </div>
                ) : applications.length === 0 ? (
                    <EmptyState
                        title="No applications yet"
                        description="Applications you submit to tuitions will appear here."
                        action={
                            <Link
                                href="/tuitions"
                                className="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
                            >
                                Browse Tuitions
                            </Link>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-200 text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">
                                        Tuition Title
                                    </th>
                                    <th className="px-5 py-3.5">Tutor</th>
                                    <th className="px-5 py-3.5">Monthly Fee</th>
                                    <th className="px-5 py-3.5">
                                        Applied Date
                                    </th>
                                    <th className="px-5 py-3.5">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {applications.map((application) => (
                                    <tr
                                        key={application._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {application.tuitionTitle}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {application.tutorName ||
                                                application.tutorEmail ||
                                                '—'}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {formatCurrency(
                                                application.monthlyFee,
                                            )}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(application.appliedAt)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={application.status}
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

export default StudentOverview;
