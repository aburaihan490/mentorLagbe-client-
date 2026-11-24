'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    AlertTriangle,
    Loader2,
    Pencil,
    PlusCircle,
    Power,
    Trash2,
} from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { ITuition } from '@/types/tuition';
import { apiFetch } from '@/lib/client-api';
import { formatCurrency, formatDate } from '@/lib/format';
import { primaryButtonClass } from './form-styles';
import { EmptyState, PageHeader } from './StatsCards';
import { Modal } from './Modal';
import { StatusBadge } from './StatusBadge';
import TuitionForm, { type TuitionFormPayload } from './TuitionForm';
import { authClient } from '@/lib/auth-client';

const TutorTuitionsManager = ({
    server_url,
}: {
    server_url: string | undefined;
}) => {
    const [tuitions, setTuitions] = useState<ITuition[]>([]);
    const [loading, setLoading] = useState(true);
    const [busyId, setBusyId] = useState<string | null>(null);
    const [editing, setEditing] = useState<ITuition | null>(null);
    const [editSubmitting, setEditSubmitting] = useState(false);

    // Delete modal states
    const [deleting, setDeleting] = useState<ITuition | null>(null);
    const [deleteSubmitting, setDeleteSubmitting] = useState(false);

    const load = useCallback(async () => {
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data?.token;

            const result = await apiFetch<ITuition[]>(
                `${server_url}/tutor/tutor-all-tutions`,
                {
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            setTuitions(result.data ?? []);
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
    }, [server_url]);

    useEffect(() => {
        void (async () => {
            await load();
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleToggle = async (tuition: ITuition) => {
        setBusyId(tuition._id);
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }
            const jwtToken = data?.token;

            const result = await apiFetch<ITuition>(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tutor/toggle-tuition/${tuition._id}`,
                {
                    method: 'PATCH',
                    headers: { authorization: `Bearer ${jwtToken}` },
                },
            );
            toast.success(
                result.data.isActive
                    ? 'Tuition is now active.'
                    : 'Tuition is now closed.',
            );
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

    const handleDeleteConfirm = async () => {
        if (!deleting) return;

        setDeleteSubmitting(true);
        setBusyId(deleting._id);
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }
            const jwtToken = data?.token;

            await apiFetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tutor/delete-tuition/${deleting._id}`,
                {
                    method: 'DELETE',
                    headers: {
                        authorization: `Bearer ${jwtToken}`,
                    },
                },
            );
            toast.success('Tuition deleted successfully.');
            setDeleting(null);
            await load();
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : 'Failed to update.';
            console.error(message);
            toast.error(message);
        } finally {
            setDeleteSubmitting(false);
            setBusyId(null);
        }
    };

    const handleEdit = async (payload: TuitionFormPayload) => {
        if (!editing) return;

        setEditSubmitting(true);
        try {
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }
            const jwtToken = data?.token;

            await apiFetch(
                `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/tutor/update-tuitions/${editing._id}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${jwtToken}`,
                    },
                    body: JSON.stringify(payload),
                },
            );
            toast.success('Tuition updated successfully.');
            setEditing(null);
            await load();
        } catch (error) {
            const message =
                error instanceof Error && error.message
                    ? error.message
                    : 'Failed to update.';
            console.error(message);
            toast.error(message);
        } finally {
            setEditSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="My Tuitions"
                description="Manage every tuition you have posted — edit, close or delete listings."
            >
                <Link href="/tutor/post-tuition" className={primaryButtonClass}>
                    <PlusCircle className="h-4 w-4" />
                    Post a Tuition
                </Link>
            </PageHeader>

            <div className="overflow-hidden rounded-2xl border border-slate-200/70 bg-white shadow-sm">
                {loading ? (
                    <div className="space-y-3 p-6">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="h-16 animate-pulse rounded-xl bg-slate-100"
                            />
                        ))}
                    </div>
                ) : tuitions.length === 0 ? (
                    <EmptyState
                        title="You have not posted any tuition yet"
                        description="Create your first listing and start receiving student applications."
                        action={
                            <Link
                                href="/tutor/post-tuition"
                                className={primaryButtonClass}
                            >
                                Post a Tuition
                            </Link>
                        }
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px] text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">Tuition</th>
                                    <th className="px-5 py-3.5">
                                        Fee / Schedule
                                    </th>
                                    <th className="px-5 py-3.5">Approval</th>
                                    <th className="px-5 py-3.5">Status</th>
                                    <th className="px-5 py-3.5">Posted</th>
                                    <th className="px-5 py-3.5 text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {tuitions.map((tuition) => (
                                    <tr
                                        key={tuition._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                                                    <Image
                                                        src={
                                                            tuition.bannerImage
                                                        }
                                                        alt=""
                                                        fill
                                                        unoptimized
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="max-w-64 truncate font-semibold text-slate-900">
                                                        {tuition.title}
                                                    </p>
                                                    <p className="mt-0.5 text-xs text-slate-500">
                                                        {tuition.subject} ·{' '}
                                                        {tuition.classLevel} ·{' '}
                                                        {tuition.mode}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            <p className="font-semibold text-emerald-600">
                                                {formatCurrency(
                                                    tuition.monthlyFee,
                                                )}
                                                /mo
                                            </p>
                                            <p className="text-xs text-slate-500">
                                                {tuition.daysPerWeek} days/week
                                            </p>
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
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(tuition.createdAt)}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-1.5">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setEditing(tuition)
                                                    }
                                                    title="Edit tuition"
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggle(tuition)
                                                    }
                                                    disabled={
                                                        busyId === tuition._id
                                                    }
                                                    title={
                                                        tuition.isActive
                                                            ? 'Close tuition'
                                                            : 'Activate tuition'
                                                    }
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 disabled:opacity-50"
                                                >
                                                    {busyId === tuition._id &&
                                                    !deleteSubmitting ? (
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                    ) : (
                                                        <Power className="h-4 w-4" />
                                                    )}
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setDeleting(tuition)
                                                    }
                                                    disabled={
                                                        busyId === tuition._id
                                                    }
                                                    title="Delete tuition"
                                                    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-700 disabled:opacity-50"
                                                >
                                                    <Trash2 className="h-4 w-4" />
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

            {/* Edit Modal */}
            <Modal
                open={Boolean(editing)}
                onClose={() => setEditing(null)}
                title="Edit Tuition"
                description="Update the details of your listing."
                wide
            >
                {editing && (
                    <TuitionForm
                        key={editing._id}
                        initialData={editing}
                        submitLabel="Save Changes"
                        isSubmitting={editSubmitting}
                        onSubmit={handleEdit}
                        onCancel={() => setEditing(null)}
                    />
                )}
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal
                open={Boolean(deleting)}
                onClose={() => !deleteSubmitting && setDeleting(null)}
                title="Delete Tuition"
                description="Please confirm that you want to remove this listing."
            >
                {deleting && (
                    <div className="space-y-5">
                        <div className="flex items-start gap-3.5 rounded-xl border border-red-200/80 bg-red-50/70 p-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1 text-sm">
                                <p className="font-semibold text-red-900">
                                    This action cannot be undone
                                </p>
                                <p className="mt-1 leading-relaxed text-red-700">
                                    Are you sure you want to permanently delete{' '}
                                    <span className="font-semibold text-red-950">
                                        &ldquo;{deleting.title}&rdquo;
                                    </span>
                                    ? All associated details will be removed.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 rounded-xl border border-slate-200/80 bg-slate-50/70 p-3">
                            <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-200">
                                <Image
                                    src={deleting.bannerImage}
                                    alt=""
                                    fill
                                    unoptimized
                                    className="object-cover"
                                />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="truncate text-sm font-semibold text-slate-900">
                                    {deleting.title}
                                </p>
                                <p className="text-xs text-slate-500">
                                    {deleting.subject} · {deleting.classLevel} ·{' '}
                                    {formatCurrency(deleting.monthlyFee)}/mo
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-3 pt-2">
                            <button
                                type="button"
                                onClick={() => setDeleting(null)}
                                disabled={deleteSubmitting}
                                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleDeleteConfirm}
                                disabled={deleteSubmitting}
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/40 disabled:opacity-60"
                            >
                                {deleteSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Deleting...
                                    </>
                                ) : (
                                    <>
                                        <Trash2 className="h-4 w-4" />
                                        Yes, Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default TutorTuitionsManager;
