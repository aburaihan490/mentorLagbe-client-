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
                            <Button
                                size="lg"
                                className="h-12 rounded-full bg-emerald-600 px-7 font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700"
                            >
                                <Link href="/tuitions">
                                    Browse Tuitions
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>

                            <Button
                                size="lg"
                                variant="outline"
                                className="h-12 rounded-full border-slate-300 bg-white px-7 font-semibold hover:border-emerald-500 hover:text-emerald-600"
                            >
                                <Link href="/become-a-tutor">
                                    <GraduationCap className="mr-2 h-5 w-5" />
                                    Become a Tutor
                                </Link>
                            </Button>
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
                    <div className="relative mx-auto w-full max-w-[570px]">
                        {/* Decorative icons */}
                        <div className="absolute -left-5 top-12 z-10 rounded-2xl bg-white p-3 shadow-lg">
                            <GraduationCap className="h-7 w-7 text-emerald-600" />
                        </div>

                        <div className="absolute -right-3 top-16 z-10 rounded-2xl bg-white p-3 shadow-lg">
                            <BookOpen className="h-6 w-6 text-blue-500" />
                        </div>

                        <div className="absolute -bottom-3 left-8 z-10 rounded-2xl bg-white p-3 shadow-lg">
                            <ShieldCheck className="h-6 w-6 text-emerald-500" />
                        </div>

                        {/* Main Hero Image */}
                        <div className="relative aspect-[5/4] overflow-hidden rounded-[32px] bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100">
                            <Image
                                src="/images/mentor-hero.png"
                                alt="Student learning with laptop"
                                fill
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-contain object-bottom"
                            />

                            {/* Floating Card */}
                            <div className="absolute right-3 top-6 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-md sm:right-5 sm:top-10">
                                <div className="flex items-center gap-2">
                                    <Sparkles className="h-5 w-5 text-emerald-500" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-800">
                                            Better Learning
                                        </p>
                                        <p className="text-sm font-bold text-emerald-600">
                                            Brighter Future
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Info */}
                            <div className="absolute bottom-5 left-5 rounded-xl bg-white/90 px-4 py-3 shadow-lg backdrop-blur-md">
                                <div className="flex items-center gap-2">
                                    <Users className="h-5 w-5 text-emerald-600" />
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            Expert Mentors
                                        </p>
                                        <p className="text-xs text-slate-500">
                                            Learn from the best
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Features */}
                <div className="mt-16 grid grid-cols-2 gap-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm md:grid-cols-4 md:gap-6 md:p-7">
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
                                className="flex items-center gap-3"
                            >
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                                    <Icon className="h-6 w-6 text-emerald-600" />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-slate-800">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-xs text-slate-500">
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
