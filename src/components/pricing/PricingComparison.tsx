import { Check, X, Zap } from 'lucide-react';

const comparison = [
    {
        feature: 'Browse available tuitions',
        free: true,
        pro: true,
    },
    {
        feature: 'Create profile',
        free: true,
        pro: true,
    },
    {
        feature: 'Apply for tuitions',
        free: 'Limited',
        pro: 'Unlimited',
    },
    {
        feature: 'Featured profile listing',
        free: false,
        pro: true,
    },
    {
        feature: 'Priority tutor matching',
        free: false,
        pro: true,
    },
    {
        feature: 'Advanced profile visibility',
        free: false,
        pro: true,
    },
    {
        feature: 'Advanced analytics',
        free: false,
        pro: true,
    },
    {
        feature: 'Priority support',
        free: false,
        pro: true,
    },
];

export default function PricingComparison() {
    return (
        <section className="bg-white py-20">
            <div className="container mx-auto max-w-5xl px-5">
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600">
                        <Zap className="h-4 w-4" />
                        Plan Comparison
                    </span>

                    <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Compare Our Plans
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Find the right features for your learning journey.
                    </p>
                </div>

                <div className="overflow-hidden rounded-2xl border border-slate-200">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-5 py-5 text-sm font-bold text-slate-800">
                                    Features
                                </th>

                                <th className="px-5 py-5 text-center text-sm font-bold text-slate-800">
                                    Free
                                </th>

                                <th className="bg-emerald-50 px-5 py-5 text-center text-sm font-bold text-emerald-700">
                                    Pro
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {comparison.map((item) => (
                                <tr
                                    key={item.feature}
                                    className="transition hover:bg-slate-50"
                                >
                                    <td className="px-5 py-5 text-sm font-medium text-slate-700">
                                        {item.feature}
                                    </td>

                                    <td className="px-5 py-5 text-center">
                                        <Status value={item.free} />
                                    </td>

                                    <td className="bg-emerald-50/40 px-5 py-5 text-center">
                                        <Status value={item.pro} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function Status({ value }: { value: boolean | string }) {
    if (value === true) {
        return <Check className="mx-auto h-5 w-5 text-emerald-600" />;
    }

    if (value === false) {
        return <X className="mx-auto h-5 w-5 text-slate-300" />;
    }

    return (
        <span className="text-sm font-semibold text-emerald-700">{value}</span>
    );
}
