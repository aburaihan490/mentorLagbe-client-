'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Crown, Info } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { PageHeader } from './StatsCards';
import TuitionForm, { type TuitionFormPayload } from './TuitionForm';
import { authClient } from '@/lib/auth-client';

interface TutorStats {
    totalTuitions: number;
    subscriptionPlan: 'free' | 'premium';
}

const PostTuitionManager = ({ url }: { url: string | undefined }) => {
    const router = useRouter();
    const [stats, setStats] = useState<TutorStats | null>(null);
    const [submitting, setSubmitting] = useState(false);

    const isPro = stats?.subscriptionPlan === 'premium';
    const remaining = isPro
        ? null
        : Math.max(0, 2 - (stats?.totalTuitions ?? 0));
    const isLimitReached = !isPro && remaining === 0;

    const handleSubmit = async (payload: TuitionFormPayload) => {
        setSubmitting(true);

        try {
            if (!url) {
                throw new Error('Backend API URL is not configured.');
            }
            const { data, error } = await authClient.token();
            if (error || !data?.token) {
                throw new Error(error?.message);
            }

            const jwtToken = data?.token;
            const response = await fetch(`${url}/tutor/create-tuition`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: `Bearer ${jwtToken}`,
                },
                body: JSON.stringify(payload),
            });
            const result = await response.json();

            if (!response.ok) throw new Error(result.message);

            toast.success(
                'Tuition posted! It will be visible after admin approval.',
            );
            router.push('/tutor/my-tuitions');
            router.refresh();
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Failed to post tuition.',
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-4xl space-y-6">
            <PageHeader
                title="Post a Tuition"
                description="Fill in the details below. Admin approval is required before your listing goes live."
            />

            <div
                className={`flex flex-col gap-3 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                    isPro
                        ? 'border-violet-200 bg-violet-50'
                        : 'border-emerald-200 bg-emerald-50'
                }`}
            >
                <div className="flex items-start gap-3">
                    {isPro ? (
                        <Crown className="mt-0.5 h-5 w-5 shrink-0 text-violet-600" />
                    ) : (
                        <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    )}
                    <div>
                        <p
                            className={`text-sm font-bold ${isPro ? 'text-violet-800' : 'text-emerald-800'}`}
                        >
                            {isPro
                                ? 'Pro Plan — Unlimited tuition posts'
                                : `Free Plan — ${remaining} of 2 posts remaining`}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-600">
                            {isPro
                                ? 'You can post as many tuitions as you like.'
                                : 'Upgrade to Pro to post unlimited tuitions.'}
                        </p>
                    </div>
                </div>
                {!isPro && (
                    <Link
                        href="/pricing"
                        className="inline-flex h-9 shrink-0 items-center justify-center rounded-xl bg-emerald-600 px-4 text-sm font-semibold text-white hover:bg-emerald-700"
                    >
                        Upgrade to Pro
                    </Link>
                )}
            </div>

            <div className="rounded-2xl border border-slate-200/70 bg-white p-6 shadow-sm">
                <TuitionForm
                    submitLabel="Post Tuition"
                    isSubmitting={submitting || isLimitReached}
                    onSubmit={handleSubmit}
                />
            </div>
        </div>
    );
};

export default PostTuitionManager;
