import {
    Search,
    UserRound,
    Send,
    GraduationCap,
    FileUser,
    BookOpen,
    Users,
    BadgeCheck,
    ArrowRight,
    Sparkles,
    CheckCircle2,
} from 'lucide-react';
import Link from 'next/link';

const studentSteps = [
    {
        step: '01',
        icon: Search,
        title: 'Find Your Tuition',
        description:
            'Browse hundreds of tuition opportunities and find the perfect match based on your subject, class and location.',
    },
    {
        step: '02',
        icon: UserRound,
        title: 'Explore Tutors',
        description:
            'Check tutor profiles, qualifications, experience and teaching preferences before making your choice.',
    },
    {
        step: '03',
        icon: Send,
        title: 'Apply for Tuition',
        description:
            'Send your application to your preferred tutor and wait for the confirmation.',
    },
    {
        step: '04',
        icon: GraduationCap,
        title: 'Start Learning',
        description:
            'Connect with your tutor, schedule your classes and achieve your academic goals.',
    },
];

const tutorSteps = [
    {
        step: '01',
        icon: FileUser,
        title: 'Create Your Profile',
        description:
            'Sign up and build your professional tutor profile with qualifications, experience and expertise.',
    },
    {
        step: '02',
        icon: BookOpen,
        title: 'Post Tuition / Batch',
        description:
            'Publish your tuition requirements or create a batch with subjects, schedules and monthly fees.',
    },
    {
        step: '03',
        icon: Users,
        title: 'Receive Applications',
        description:
            'Connect with interested students, review their applications and select the right learners.',
    },
    {
        step: '04',
        icon: BadgeCheck,
        title: 'Start Teaching',
        description:
            'Confirm your students, organize your classes and grow your teaching career with MentorLagbe.',
    },
];

export default function HowItWorks() {
    return (
        <section className="relative overflow-hidden bg-[#f5f8ff] py-20">
            {/* Background Decorations */}
            <div className="absolute -right-20 top-20 h-80 w-80 rounded-full bg-emerald-100/60 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="container relative mx-auto px-5 lg:px-8">
                {/* Section Header */}
                <div className="mx-auto mb-14 max-w-2xl text-center">
                    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        <Sparkles className="h-4 w-4" />
                        Simple Process
                    </span>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl md:text-5xl">
                        How{' '}
                        <span className="text-emerald-600">MentorLagbe</span>{' '}
                        Works
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-600">
                        Whether you are looking for a tutor or want to teach
                        students, getting started with MentorLagbe is simple and
                        easy.
                    </p>
                </div>

                {/* Student Workflow */}
                <div className="mb-16">
                    <div className="mb-8 flex items-center justify-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                            <GraduationCap className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900">
                                For Students
                            </h3>
                            <p className="text-sm text-slate-500">
                                Find your perfect tutor in 4 easy steps
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {studentSteps.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.step}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5"
                                >
                                    {/* Step Number */}
                                    <span className="absolute right-5 top-5 text-3xl font-extrabold text-blue-100">
                                        {item.step}
                                    </span>

                                    {/* Icon */}
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <h4 className="mb-3 text-lg font-bold text-slate-900">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm leading-7 text-slate-500">
                                        {item.description}
                                    </p>

                                    {index !== 3 && (
                                        <div className="mt-5 hidden items-center gap-2 text-sm font-semibold text-blue-600 lg:flex">
                                            Step {item.step}
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-16 flex items-center gap-4">
                    <div className="h-px flex-1 bg-slate-200" />
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-5 py-2 text-xs font-bold uppercase tracking-wider text-emerald-700">
                        Your Teaching Journey
                    </span>
                    <div className="h-px flex-1 bg-slate-200" />
                </div>

                {/* Tutor Workflow */}
                <div>
                    <div className="mb-8 flex items-center justify-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                            <BookOpen className="h-6 w-6" />
                        </div>

                        <div>
                            <h3 className="text-xl font-extrabold text-slate-900">
                                For Tutors
                            </h3>
                            <p className="text-sm text-slate-500">
                                Start teaching and grow your career in 4 steps
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {tutorSteps.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.step}
                                    className="group relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
                                >
                                    {/* Step Number */}
                                    <span className="absolute right-5 top-5 text-3xl font-extrabold text-emerald-100">
                                        {item.step}
                                    </span>

                                    {/* Icon */}
                                    <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <h4 className="mb-3 text-lg font-bold text-slate-900">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm leading-7 text-slate-500">
                                        {item.description}
                                    </p>

                                    {index !== 3 && (
                                        <div className="mt-5 hidden items-center gap-2 text-sm font-semibold text-emerald-600 lg:flex">
                                            Step {item.step}
                                            <ArrowRight className="h-4 w-4" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 overflow-hidden rounded-3xl bg-emerald-600 px-6 py-10 text-center shadow-xl shadow-emerald-600/15 sm:px-12">
                    <div className="mx-auto max-w-2xl">
                        <div className="mb-4 flex justify-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 text-white">
                                <CheckCircle2 className="h-8 w-8" />
                            </div>
                        </div>

                        <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
                            Ready to Get Started?
                        </h3>

                        <p className="mt-3 text-sm leading-7 text-emerald-50 sm:text-base">
                            Join MentorLagbe today and take the next step toward
                            a better learning and teaching experience.
                        </p>

                        <div className="mt-7 flex flex-wrap justify-center gap-3">
                            <Link
                                href="/tuitions"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-7 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                            >
                                Find a Tutor
                                <ArrowRight className="h-4 w-4" />
                            </Link>

                            <Link
                                href="/become-a-tutor"
                                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-white/40 bg-emerald-700 px-7 text-sm font-bold text-white transition hover:bg-emerald-800"
                            >
                                Become a Tutor
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
