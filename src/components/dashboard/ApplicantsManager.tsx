'use client';

import { useCallback, useEffect, useState } from 'react';
import { Check, Loader2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { ApplicationStatus, IApplication } from '@/types/application';
import { apiFetch } from '@/lib/client-api';
import { formatDate } from '@/lib/format';
import { EmptyState, PageHeader } from './StatsCards';
import { StatusBadge } from './StatusBadge';
import { authClient } from '@/lib/auth-client';

type Filter = 'all' | ApplicationStatus;

const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'rejected', label: 'Rejected' },
];

const ApplicantsManager = () => {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data?.token;

            const result = await apiFetch<IApplication[]>(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/applications/get-application`,
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
                    : 'Failed to update.';
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

    const handleStatus = async (
        application: IApplication,
        status: 'accepted' | 'rejected',
    ) => {
        setBusyId(application._id);
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data?.token;

            await apiFetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/applications/update-application/${application._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify({ status }),
                },
            );
            toast.success(`Applicant ${status} successfully.`);
            await load();
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : 'Failed to update.';
            console.error(message);
            toast.error(message);
        } finally {
            setBusyId(null);
        }
    };

    const visible =
        filter === 'all'
            ? applications
            : applications.filter((item) => item.status === filter);

    const pendingCount = applications.filter(
        (item) => item.status === 'pending',
    ).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Manage Applicants"
                description="Review students who applied to your tuitions and update their application status."
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                        {filters.map((item) => (
                            <button
                                key={item.value}
                                type="button"
                                onClick={() => setFilter(item.value)}
                                className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${
                                    filter === item.value
                                        ? 'bg-emerald-600 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {item.label}
                                {item.value === 'pending' &&
                                    pendingCount > 0 &&
                                    ` (${pendingCount})`}
                            </button>
                        ))}
                    </div>
                    <p className="text-sm text-slate-500">
                        {visible.length} applicant
                        {visible.length === 1 ? '' : 's'}
                    </p>
                </div>

                {loading ? (
                    <div className="space-y-3 p-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-16 animate-pulse rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                ) : applications.length === 0 ? (
                    <EmptyState
                        title="No applicants yet"
                        description="Applications from students will appear here once they apply to your tuitions."
                    />
                ) : visible.length === 0 ? (
                    <EmptyState
                        title="Nothing to show"
                        description={`No applicants with the "${filter}" status.`}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-250 text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">Student</th>
                                    <th className="px-5 py-3.5">Phone</th>
                                    <th className="px-5 py-3.5">
                                        Preferred Schedule
                                    </th>
                                    <th className="px-5 py-3.5">Note</th>
                                    <th className="px-5 py-3.5">Tuition</th>
                                    <th className="px-5 py-3.5">Applied</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {visible.map((application) => (
                                    <tr
                                        key={application._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                                                    {application.studentName
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-slate-900">
                                                        {
                                                            application.studentName
                                                        }
                                                    </p>
                                                    <p className="max-w-52 truncate text-xs text-slate-500">
                                                        {
                                                            application.studentEmail
                                                        }
                                                    </p>
                                                    {application.qualification && (
                                                        <p className="text-xs text-slate-400">
                                                            {
                                                                application.qualification
                                                            }
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {application.studentPhone}
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {application.preferredSchedule ||
                                                '—'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <p
                                                className="max-w-44 truncate text-slate-600"
                                                title={application.studentNote}
                                            >
                                                {application.studentNote || '—'}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p
                                                className="max-w-44 truncate font-medium text-slate-800"
                                                title={application.tuitionTitle}
                                            >
                                                {application.tuitionTitle}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(application.appliedAt)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={application.status}
                                            />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                {/* Accept Button */}
                                                {application.status !==
                                                    'accepted' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleStatus(
                                                                application,
                                                                'accepted',
                                                            )
                                                        }
                                                        disabled={
                                                            busyId ===
                                                            application._id
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
                                                    >
                                                        {busyId ===
                                                        application._id ? (
                                                            <Loader2 className="h-3 w-3 animate-spin" />
                                                        ) : (
                                                            <Check className="h-3 w-3" />
                                                        )}
                                                        Accept
                                                    </button>
                                                )}

                                                {/* Reject Button */}
                                                {application.status !==
                                                    'rejected' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleStatus(
                                                                application,
                                                                'rejected',
                                                            )
                                                        }
                                                        disabled={
                                                            busyId ===
                                                            application._id
                                                        }
                                                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        {busyId ===
                                                        application._id ? (
                                                            <Loader2 className="h-3 w-3 animate-spin" />
                                                        ) : (
                                                            <X className="h-3 w-3" />
                                                        )}
                                                        Reject
                                                    </button>
                                                )}
                                            </div>
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

export default ApplicantsManager;
