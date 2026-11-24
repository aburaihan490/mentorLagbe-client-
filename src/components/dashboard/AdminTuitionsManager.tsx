'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Check, Loader2, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { ITuition } from '@/types/tuition';
import { apiFetch } from '@/lib/client-api';
import { formatCurrency, formatDate } from '@/lib/format';
import { EmptyState, PageHeader } from './StatsCards';
import { StatusBadge } from './StatusBadge';

type Filter = 'all' | 'pending' | 'approved' | 'rejected';

const filters: { value: Filter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
];

const AdminTuitionsManager = () => {
    const [tuitions, setTuitions] = useState<ITuition[]>([]);
    const [filter, setFilter] = useState<Filter>('all');
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            const result = await apiFetch<ITuition[]>(
                '/api/dashboard/tuitions?scope=all',
            );
            setTuitions(result.data ?? []);
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to load tuitions.',
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

    const handleApproval = async (
        tuition: ITuition,
        approvalStatus: 'approved' | 'rejected',
    ) => {
        setBusyId(tuition._id);
        try {
            const result = await apiFetch(
                `/api/dashboard/tuitions/${tuition._id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ approvalStatus }),
                },
            );
            toast.success(result.message ?? 'Approval status updated.');
            await load();
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to update.',
            );
        } finally {
            setBusyId(null);
        }
    };

    const visible =
        filter === 'all'
            ? tuitions
            : tuitions.filter((item) => item.approvalStatus === filter);

    const pendingCount = tuitions.filter(
        (item) => item.approvalStatus === 'pending',
    ).length;

    return (
        <div className="space-y-6">
            <PageHeader
                title="Tuition Approval"
                description="Review tutor-submitted listings and decide what goes live on the platform."
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
                        {visible.length} tuition{visible.length === 1 ? '' : 's'}
                    </p>
                </div>

                {loading ? (
                    <div className="space-y-3 p-6">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-16 animate-pulse rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                ) : tuitions.length === 0 ? (
                    <EmptyState
                        title="No tuitions submitted yet"
                        description="Tutor listings will appear here for review."
                    />
                ) : visible.length === 0 ? (
                    <EmptyState
                        title="Nothing to show"
                        description={`No tuitions with the "${filter}" status.`}
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[1000px] text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">Tuition</th>
                                    <th className="px-5 py-3.5">Tutor</th>
                                    <th className="px-5 py-3.5">Fee</th>
                                    <th className="px-5 py-3.5">Submitted</th>
                                    <th className="px-5 py-3.5">Approval</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {visible.map((tuition) => (
                                    <tr
                                        key={tuition._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                                    <Image
                                                        src={tuition.bannerImage}
                                                        alt=""
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <Link
                                                        href={`/tuitions/${tuition._id}`}
                                                        className="block max-w-60 truncate font-semibold text-slate-900 hover:text-emerald-600"
                                                    >
                                                        {tuition.title}
                                                    </Link>
                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {tuition.subject} ·{' '}
                                                        {tuition.classLevel} ·{' '}
                                                        {tuition.mode}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <p className="font-medium text-slate-800">
                                                {tuition.tutorName}
                                            </p>
                                            <p className="max-w-44 truncate text-xs text-slate-500">
                                                {tuition.tutorEmail}
                                            </p>
                                        </td>
                                        <td className="px-5 py-4 font-semibold text-emerald-600">
                                            {formatCurrency(tuition.monthlyFee)}
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(tuition.createdAt)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={tuition.approvalStatus}
                                            />
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge
                                                status={
                                                    tuition.isActive
                                                        ? 'active'
                                                        : 'closed'
                                                }
                                                label={
                                                    tuition.isActive
                                                        ? 'Active'
                                                        : 'Closed'
                                                }
                                            />
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleApproval(
                                                            tuition,
                                                            'approved',
                                                        )
                                                    }
                                                    disabled={
                                                        busyId === tuition._id ||
                                                        tuition.approvalStatus ===
                                                            'approved'
                                                    }
                                                    className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-40"
                                                >
                                                    {busyId === tuition._id ? (
                                                        <Loader2 className="h-3 w-3 animate-spin" />
                                                    ) : (
                                                        <Check className="h-3 w-3" />
                                                    )}
                                                    Approve
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleApproval(
                                                            tuition,
                                                            'rejected',
                                                        )
                                                    }
                                                    disabled={
                                                        busyId === tuition._id ||
                                                        tuition.approvalStatus ===
                                                            'rejected'
                                                    }
                                                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-40"
                                                >
                                                    <X className="h-3 w-3" />
                                                    Reject
                                                </button>
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

export default AdminTuitionsManager;
