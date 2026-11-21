'use client';

import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'Can I use the platform for free?',
        answer: 'Yes! You can browse tuitions, create your profile and use basic features with our Free plan.',
    },
    {
        question: 'What is included in the Pro plan?',
        answer: 'Pro includes unlimited tuition applications, featured profiles, priority matching and advanced analytics.',
    },
    {
        question: 'Can students and tutors subscribe separately?',
        answer: 'Yes. Students pay ৳299 per month, while tutors pay ৳499 per month for the Pro plan.',
    },
    {
        question: 'How do I pay for the Pro subscription?',
        answer: 'You can subscribe using the secure Stripe checkout process.',
    },
    {
        question: 'Can I cancel my subscription?',
        answer: 'Yes. You can manage or cancel your subscription through your subscription management page.',
    },
];

export default function PricingFAQ() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="bg-[#f5f8ff] py-20">
            <div className="container mx-auto max-w-3xl px-5">
                <div className="mb-12 text-center">
                    <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <HelpCircle className="h-4 w-4" />
                        FAQ
                    </span>

                    <h2 className="text-3xl font-extrabold text-slate-900 md:text-4xl">
                        Frequently Asked Questions
                    </h2>

                    <p className="mt-3 text-slate-500">
                        Everything you need to know about our pricing.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={faq.question}
                                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
                            >
                                <button
                                    onClick={() =>
                                        setActiveIndex(isOpen ? null : index)
                                    }
                                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                                >
                                    <span className="font-bold text-slate-800">
                                        {faq.question}
                                    </span>

                                    <ChevronDown
                                        className={`h-5 w-5 shrink-0 text-emerald-600 transition ${
                                            isOpen ? 'rotate-180' : ''
                                        }`}
                                    />
                                </button>

                                {isOpen && (
                                    <div className="border-t border-slate-100 px-5 py-4 text-sm leading-7 text-slate-600">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
