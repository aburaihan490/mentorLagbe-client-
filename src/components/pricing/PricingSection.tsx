import Link from 'next/link';
import {
    Check,
    X,
    Crown,
    GraduationCap,
    Users,
    Sparkles,
    ShieldCheck,
} from 'lucide-react';
import SubscribeAction from './SubscribeAction';

const plans = [
    {
        name: 'Free',
        description: 'Get started with essential learning features.',
        icon: GraduationCap,
        studentPrice: 0,
        tutorPrice: 0,
        popular: false,
        features: [
            'Browse available tuitions',
            'Create student profile',
            'Apply for limited tuitions',
            'Basic profile visibility',
            'Standard support',
        ],
        unavailable: [
            'Featured profile listing',
            'Priority tutor matching',
            'Advanced analytics',
        ],
    },
    {
        name: 'Pro',
        description: 'Unlock premium features and grow faster.',
        icon: Crown,
        studentPrice: 10,
        tutorPrice: 15,
        popular: true,
        features: [
            'Everything in Free plan',
            'Unlimited tuition applications',
            'Featured profile listing',
            'Priority tutor matching',
            'Advanced profile visibility',
            'Priority customer support',
            'Advanced analytics',
        ],
        unavailable: [],
    },
];

export default function PricingSection() {
    return (
        <section className="relative overflow-hidden bg-[#f5f8ff] py-20">
            {/* Background */}
            <div className="absolute -right-20 top-10 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="container relative mx-auto px-5 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <Sparkles className="h-4 w-4" />
                        Simple & Transparent Pricing
                    </span>

                    <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                        Choose Your Perfect{' '}
                        <span className="text-emerald-600">Plan</span>
                    </h1>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                        Whether you are a student looking for the best tutor or
                        a tutor growing your career, we have the right plan for
                        you.
                    </p>
                </div>

                {/* Pricing Cards */}
                <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-3xl border bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9 ${
                                plan.popular
                                    ? 'border-emerald-500 shadow-lg shadow-emerald-900/10'
                                    : 'border-slate-200'
                            }`}
                        >
                            {/* Popular Badge */}
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-600 px-5 py-2 text-xs font-bold text-white shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            {/* Header */}
                            <div className="mb-7">
                                <div
                                    className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl ${
                                        plan.popular
                                            ? 'bg-emerald-100 text-emerald-600'
                                            : 'bg-blue-50 text-blue-600'
                                    }`}
                                >
                                    <plan.icon className="h-7 w-7" />
                                </div>

                                <h2 className="text-2xl font-extrabold text-slate-900">
                                    {plan.name} Plan
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-500">
                                    {plan.description}
                                </p>
                            </div>

                            {/* Pricing */}
                            <div className="mb-7 grid grid-cols-2 gap-3">
                                <PriceBox
                                    title="Student"
                                    price={plan.studentPrice}
                                    icon={<GraduationCap className="h-4 w-4" />}
                                    color="blue"
                                />

                                <PriceBox
                                    title="Tutor"
                                    price={plan.tutorPrice}
                                    icon={<Users className="h-4 w-4" />}
                                    color="emerald"
                                />
                            </div>

                            {/* Features */}
                            <div className="mb-8 flex-1">
                                <h3 className="mb-4 text-sm font-bold text-slate-900">
                                    What&apos;s included
                                </h3>

                                <ul className="space-y-3">
                                    {plan.features.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-slate-600"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                                                <Check className="h-3.5 w-3.5" />
                                            </span>

                                            {feature}
                                        </li>
                                    ))}

                                    {plan.unavailable.map((feature) => (
                                        <li
                                            key={feature}
                                            className="flex items-start gap-3 text-sm text-slate-400"
                                        >
                                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                                                <X className="h-3.5 w-3.5" />
                                            </span>

                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <SubscribeAction popular={plan.popular} />
                        </div>
                    ))}
                </div>

                {/* Bottom Note */}
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3 text-center text-sm text-slate-500">
                    <ShieldCheck className="h-5 w-5 text-emerald-600" />
                    Secure payments powered by
                    <span className="font-bold text-slate-700">Stripe</span>
                    <span>•</span>
                    Cancel anytime.
                </div>
            </div>
        </section>
    );
}

function PriceBox({
    title,
    price,
    icon,
    color,
}: {
    title: string;
    price: number;
    icon: React.ReactNode;
    color: 'blue' | 'emerald';
}) {
    return (
        <div
            className={`rounded-2xl border p-4 ${
                color === 'blue'
                    ? 'border-blue-100 bg-blue-50/70'
                    : 'border-emerald-100 bg-emerald-50/70'
            }`}
        >
            <div
                className={`mb-2 flex items-center gap-2 text-sm font-semibold ${
                    color === 'blue' ? 'text-blue-700' : 'text-emerald-700'
                }`}
            >
                {icon}
                {title}
            </div>

            <div className="text-2xl font-extrabold text-slate-900">
                {price === 0 ? 'Free' : `$${price}`}
            </div>

            {price > 0 && (
                <p className="mt-1 text-xs text-slate-500">/ month</p>
            )}
        </div>
    );
}
