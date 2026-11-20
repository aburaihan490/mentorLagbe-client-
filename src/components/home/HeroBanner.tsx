'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
    GraduationCap,
    BookOpen,
    Sparkles,
    ShieldCheck,
    Users,
    ArrowRight,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const HeroBanner = () => {
    return (
        <section className="relative overflow-hidden bg-[#f5f8ff]">
            {/* Background decoration */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="container relative mx-auto px-5 py-12 lg:px-8 lg:py-20">
                <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-8">
                    {/* Left Content */}
                    <div className="max-w-xl">
                        <Badge
                            variant="outline"
                            className="mb-6 gap-2 rounded-full border-emerald-200 bg-emerald-50 px-4 py-2 text-emerald-700"
                        >
                            <Sparkles className="h-4 w-4" />
                            Learn • Grow • Excel
                        </Badge>

                        <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight text-slate-900 sm:text-5xl lg:text-[58px]">
                            Find the Perfect Tutor
                            <br />
                            or{' '}
                            <span className="text-emerald-600">
                                Become a Mentor
                            </span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                            MentorLagbe connects students with verified tutors
                            for personalized learning, both online and offline.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link
                                href="/tuitions"
                                className="h-12 rounded-full bg-emerald-600 px-7 font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 text-white flex items-center justify-center"
                            >
                                Browse Tuitions
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>

                            <Link
                                href="/become-a-tutor"
                                className="flex items-center justify-center h-12 rounded-full border-slate-300 bg-white px-7 font-semibold hover:border-emerald-500 hover:text-emerald-600"
                            >
                                <GraduationCap className="mr-2 h-5 w-5" />
                                Become a Tutor
                            </Link>
                        </div>

                        {/* Happy Learners */}
                        <div className="mt-9 flex items-center gap-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map((item) => (
                                    <div
                                        key={item}
                                        className="relative h-10 w-10 overflow-hidden rounded-full border-[3px] border-white bg-slate-200"
                                    >
                                        <Image
                                            src={`https://i.pravatar.cc/100?img=${item + 10}`}
                                            alt="Happy learner"
                                            fill
                                            sizes="40px"
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-900">
                                    10K+ Happy Learners
                                </p>
                                <p className="text-xs text-slate-500">
                                    Trusted learning community
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Image */}

                    <div className="relative mx-auto w-full max-w-[650px]">
                        {/* Graduation Icon */}
                        <div className="absolute -left-2 top-8 z-10 rounded-xl bg-white p-2 shadow-lg sm:-left-3 sm:top-12 sm:rounded-2xl sm:p-3 lg:-left-5">
                            <GraduationCap className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
                        </div>

                        {/* Book Icon */}
                        <div className="absolute -right-1 top-10 z-10 rounded-xl bg-white p-2 shadow-lg sm:-right-2 sm:top-16 sm:rounded-2xl sm:p-3 lg:-right-3">
                            <BookOpen className="h-5 w-5 text-blue-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                        </div>

                        {/* Shield Icon */}
                        <div className="absolute bottom-2 left-5 z-10 rounded-xl bg-white p-2 shadow-lg sm:bottom-0 sm:left-8 sm:rounded-2xl sm:p-3">
                            <ShieldCheck className="h-5 w-5 text-emerald-500 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                        </div>

                        {/* Background Glow */}
                        <div className="absolute inset-10 rounded-full bg-emerald-200/40 blur-3xl" />

                        {/* Main Banner Image */}
                        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl sm:rounded-[28px]">
                            <Image
                                src="/learning.png"
                                alt="MentorLagbe Student and Tutor Dashboard"
                                fill
                                priority
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 650px"
                                className="object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom Features */}

                <div className="mt-10 grid grid-cols-1 gap-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:grid-cols-2 sm:gap-4 sm:p-5 lg:mt-16 lg:grid-cols-4 lg:gap-6 lg:p-7">
                    {[
                        {
                            icon: ShieldCheck,
                            title: 'Verified Tutors',
                            subtitle: 'Trusted & Verified',
                        },
                        {
                            icon: Sparkles,
                            title: 'Flexible Options',
                            subtitle: 'Online & Offline',
                        },
                        {
                            icon: GraduationCap,
                            title: 'Secure Payment',
                            subtitle: 'Powered by Stripe',
                        },
                        {
                            icon: Users,
                            title: '24/7 Support',
                            subtitle: 'Always Here',
                        },
                    ].map((feature, index) => {
                        const Icon = feature.icon;

                        return (
                            <div
                                key={index}
                                className="flex min-w-0 items-center gap-2 sm:gap-3"
                            >
                                {/* Icon */}
                                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 sm:h-10 sm:w-10 lg:h-11 lg:w-11">
                                    <Icon className="h-5 w-5 text-emerald-600 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                                </div>

                                {/* Content */}
                                <div className="min-w-0">
                                    <h3 className="text-xs font-bold text-slate-800 sm:text-sm">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                                        {feature.subtitle}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default HeroBanner;
