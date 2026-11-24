'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { IApplication } from '@/types/application';
import { apiFetch } from '@/lib/client-api';
import { authClient } from '@/lib/auth-client';
import { formatCurrency, formatDate } from '@/lib/format';
import { EmptyState, PageHeader } from './StatsCards';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';

const MyApplicationsManager = () => {
    const [applications, setApplications] = useState<IApplication[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [cancelling, setCancelling] = useState<IApplication | null>(null);

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

    const handleCancelConfirm = async () => {
        if (!cancelling) return;

        setBusyId(cancelling._id);
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data.token;

            const result = await apiFetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/applications/delete-application/${cancelling._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            toast.success(
                result.message ?? 'Application cancelled successfully.',
            );
            setCancelling(null);
            await load();
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : 'Failed to cancel application.';
            console.error(message);
            toast.error(message);
        } finally {
            setBusyId(null);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Applications"
                description="View and manage the tuitions you have applied to."
            />

            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                {loading ? (
                    <div className="flex items-center justify-center gap-2 px-6 py-14 text-sm text-slate-500">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading applications...
                    </div>
                ) : applications.length === 0 ? (
                    <EmptyState
                        title="No applications yet"
                        description="Applications you submit to tuitions will appear here."
                    />
                ) : (
                    <>
                        <div className="border-b border-slate-100 px-5 py-4">
                            <p className="text-sm text-slate-500">
                                {applications.length} application
                                {applications.length === 1 ? '' : 's'}
                            </p>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-250 text-left">
                                <thead className="bg-slate-50/80">
                                    <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        <th className="px-5 py-3.5">
                                            Tuition Title
                                        </th>
                                        <th className="px-5 py-3.5">Tutor</th>
                                        <th className="px-5 py-3.5">
                                            Monthly Fee
                                        </th>
                                        <th className="px-5 py-3.5">
                                            Applied Date
                                        </th>
                                        <th className="px-5 py-3.5">Status</th>
                                        <th className="px-5 py-3.5 text-right">
                                            Action
                                        </th>
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
                                                {formatDate(
                                                    application.appliedAt,
                                                )}
                                            </td>
                                            <td className="px-5 py-4">
                                                <StatusBadge
                                                    status={application.status}
                                                />
                                            </td>
                                            <td className="px-5 py-4 text-right">
                                                {application.status ===
                                                    'pending' && (
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setCancelling(
                                                                application,
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
                                                            <Trash2 className="h-3 w-3" />
                                                        )}
                                                        Cancel
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            <Modal
                open={Boolean(cancelling)}
                onClose={() => setCancelling(null)}
                title="Cancel application?"
                description={`Are you sure you want to cancel your application for "${cancelling?.tuitionTitle ?? ''}"? This cannot be undone.`}
            >
                <div className="flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => setCancelling(null)}
                        className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
                    >
                        Keep it
                    </button>
                    <button
                        type="button"
                        onClick={handleCancelConfirm}
                        disabled={busyId === cancelling?._id}
                        className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
                    >
                        {busyId === cancelling?._id && (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        )}
                        Yes, cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default MyApplicationsManager;
