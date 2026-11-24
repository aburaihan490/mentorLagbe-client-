'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';
import type { UserRole } from '@/types/user';
import { apiFetch } from '@/lib/client-api';
import { capitalize, formatDate } from '@/lib/format';
import { EmptyState, PageHeader } from './StatsCards';
import { StatusBadge } from './StatusBadge';

interface IAdminUser {
    _id: string;
    name: string;
    email: string;
    image: string;
    role: UserRole;
    plan: 'free' | 'pro';
    createdAt: string;
}

const roles: UserRole[] = ['student', 'tutor', 'admin'];

const AdminUsersManager = () => {
    const [users, setUsers] = useState<IAdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [savingId, setSavingId] = useState<string | null>(null);

    const load = useCallback(async () => {
        try {
            const result = await apiFetch<IAdminUser[]>(
                '/api/dashboard/admin/users',
            );
            setUsers(result.data ?? []);
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to load users.',
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

    const handleRoleChange = async (user: IAdminUser, role: UserRole) => {
        if (role === user.role) return;

        setSavingId(user._id);
        try {
            const result = await apiFetch(
                `/api/dashboard/admin/users/${user._id}`,
                {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ role }),
                },
            );
            toast.success(result.message ?? 'User role updated.');
            setUsers((current) =>
                current.map((item) =>
                    item._id === user._id ? { ...item, role } : item,
                ),
            );
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Failed to update.',
            );
        } finally {
            setSavingId(null);
        }
    };

    return (
        <div className="space-y-6">
            <PageHeader
                title="User Management"
                description="View all registered users and manage their platform roles."
            />

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
                ) : users.length === 0 ? (
                    <EmptyState
                        title="No users found"
                        description="Registered users will be listed here."
                    />
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[780px] text-left">
                            <thead className="bg-slate-50/80">
                                <tr className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    <th className="px-5 py-3.5">User</th>
                                    <th className="px-5 py-3.5">Email</th>
                                    <th className="px-5 py-3.5">Role</th>
                                    <th className="px-5 py-3.5">Plan</th>
                                    <th className="px-5 py-3.5">Joined</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user) => (
                                    <tr
                                        key={user._id}
                                        className="text-sm transition hover:bg-slate-50/60"
                                    >
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-slate-100">
                                                    {user.image ? (
                                                        <Image
                                                            src={user.image}
                                                            alt=""
                                                            fill
                                                            unoptimized
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <span className="flex h-full items-center justify-center text-sm font-bold text-slate-500">
                                                            {user.name
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="font-semibold text-slate-900">
                                                    {user.name}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="px-5 py-4 text-slate-600">
                                            {user.email}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="relative inline-flex items-center">
                                                <select
                                                    aria-label={`Role for ${user.name}`}
                                                    value={user.role}
                                                    onChange={(event) =>
                                                        handleRoleChange(
                                                            user,
                                                            event.target
                                                                .value as UserRole,
                                                        )
                                                    }   
                                                    disabled={savingId === user._id}
                                                    className="h-9 cursor-pointer appearance-none rounded-lg border border-slate-200 bg-white py-1 pl-3 pr-8 text-sm font-medium text-slate-700 outline-none transition focus:border-emerald-500 disabled:opacity-50"
                                                >
                                                    {roles.map((role) => (
                                                        <option
                                                            key={role}
                                                            value={role}
                                                        >
                                                            {capitalize(role)}
                                                        </option>
                                                    ))}
                                                </select>
                                                {savingId === user._id ? (
                                                    <Loader2 className="pointer-events-none absolute right-2 h-4 w-4 animate-spin text-emerald-600" />
                                                ) : (
                                                    <ShieldCheck className="pointer-events-none absolute right-2 h-4 w-4 text-slate-400" />
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={user.plan} />
                                        </td>
                                        <td className="px-5 py-4 text-xs text-slate-500">
                                            {formatDate(user.createdAt)}
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

export default AdminUsersManager;
