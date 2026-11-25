'use client';

import { checkOutAction } from '@/action/subscription';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const SubscribeAction = ({ popular }: { popular: boolean }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubscription = async () => {
        try {
            setLoading(true);

            const response = await checkOutAction();

            console.log(response);

            if (!response.success || !response.url) {
                throw new Error('Checkout session creation failed');
            }

            // Redirect to Stripe Checkout
            window.location.href = response.url;
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            disabled={loading}
            onClick={() => {
                if (popular) {
                    handleSubscription();
                } else {
                    router.push('/sign-up');
                }
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-bold transition cursor-pointer disabled:opacity-50 ${
                popular
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700'
                    : 'border border-slate-200 bg-white text-slate-800 hover:border-emerald-500 hover:text-emerald-600'
            }`}
        >
            {loading
                ? 'Redirecting...'
                : popular
                  ? 'Subscribe with Stripe'
                  : 'Get Started Free'}

            <ArrowRight className="h-4 w-4" />
        </button>
    );
};

export default SubscribeAction;
