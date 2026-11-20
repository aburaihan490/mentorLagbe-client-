import Link from 'next/link';
import {
    Calculator,
    Atom,
    Code2,
    Languages,
    BookOpen,
    ArrowUpRight,
    Star,
    Users,
    GraduationCap,
    BriefcaseBusiness,
    ShieldCheck,
    Quote,
} from 'lucide-react';

const subjects = [
    {
        name: 'Mathematics',
        description: 'Algebra, Geometry, Calculus',
        icon: Calculator,
        color: 'bg-blue-50 text-blue-600',
        border: 'hover:border-blue-200',
        slug: 'Mathematics',
    },
    {
        name: 'Physics',
        description: 'Mechanics, Optics, Electricity',
        icon: Atom,
        color: 'bg-emerald-50 text-emerald-600',
        border: 'hover:border-emerald-200',
        slug: 'Physics',
    },
    {
        name: 'Programming',
        description: 'JavaScript, Python, C++, Web',
        icon: Code2,
        color: 'bg-purple-50 text-purple-600',
        border: 'hover:border-purple-200',
        slug: 'Programming',
    },
    {
        name: 'IELTS',
        description: 'Speaking, Writing, Listening',
        icon: Languages,
        color: 'bg-orange-50 text-orange-600',
        border: 'hover:border-orange-200',
        slug: 'IELTS',
    },
    {
        name: 'Chemistry',
        description: 'Organic, Inorganic, Physical',
        icon: Atom,
        color: 'bg-pink-50 text-pink-600',
        border: 'hover:border-pink-200',
        slug: 'Chemistry',
    },
    {
        name: 'English',
        description: 'Grammar, Literature, Writing',
        icon: BookOpen,
        color: 'bg-cyan-50 text-cyan-600',
        border: 'hover:border-cyan-200',
        slug: 'English',
    },
];

const testimonials = [
    {
        name: 'Student Review',
        role: 'Verified Student',
        initials: 'S',
        rating: 5,
        review: 'MentorLagbe makes finding the right tutor easier. The platform provides a simple way to explore tuition opportunities.',
    },
    {
        name: 'Tutor Review',
        role: 'Verified Tutor',
        initials: 'T',
        rating: 5,
        review: 'The platform offers a convenient way to connect with students and share teaching opportunities.',
    },
    {
        name: 'Parent Review',
        role: 'Student Guardian',
        initials: 'P',
        rating: 5,
        review: 'Having tuition opportunities and tutor information in one place makes the search process much easier.',
    },
];

interface PlatformHighlightsProps {
    stats?: {
        students: string | number;
        tutors: string | number;
        tuitions: string | number;
        subjects: string | number;
    };
}

export default function PlatformHighlights({ stats }: PlatformHighlightsProps) {
    const statistics = [
        {
            label: 'Registered Students',
            value: stats?.students ?? '—',
            icon: GraduationCap,
        },
        {
            label: 'Verified Tutors',
            value: stats?.tutors ?? '—',
            icon: Users,
        },
        {
            label: 'Available Tuitions',
            value: stats?.tuitions ?? '—',
            icon: BriefcaseBusiness,
        },
        {
            label: 'Subject Categories',
            value: stats?.subjects ?? '—',
            icon: BookOpen,
        },
    ];

    return (
        <section className="relative overflow-hidden bg-white py-20">
            {/* Background Decorations */}
            <div className="absolute -left-20 top-20 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
            <div className="absolute -right-20 bottom-20 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />

            <div className="container relative mx-auto px-5 lg:px-8">
                {/* ================= TOP SUBJECTS ================= */}

                <div className="mb-20">
                    {/* Header */}
                    <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                        <div>
                            <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                                <BookOpen className="h-4 w-4" />
                                Explore Subjects
                            </span>

                            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                                Popular{' '}
                                <span className="text-emerald-600">
                                    Subjects
                                </span>
                            </h2>

                            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 md:text-base">
                                Discover expert tutors across different subjects
                                and find the right learning opportunity for your
                                goals.
                            </p>
                        </div>

                        <Link
                            href="/tuitions"
                            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 transition hover:text-emerald-700"
                        >
                            Explore All Subjects
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {/* Subject Cards */}
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {subjects.map((subject) => {
                            const Icon = subject.icon;

                            return (
                                <Link
                                    key={subject.name}
                                    href={`/tuitions?subject=${encodeURIComponent(subject.slug)}`}
                                    className={`group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${subject.border}`}
                                >
                                    <div
                                        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition group-hover:scale-110 ${subject.color}`}
                                    >
                                        <Icon className="h-7 w-7" />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="text-lg font-bold text-slate-900 transition group-hover:text-emerald-600">
                                            {subject.name}
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            {subject.description}
                                        </p>
                                    </div>

                                    <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition group-hover:text-emerald-600" />
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* ================= PLATFORM STATISTICS ================= */}

                <div className="mb-20 overflow-hidden rounded-3xl bg-[#f5f8ff] p-7 sm:p-10">
                    <div className="mb-9 text-center">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <ShieldCheck className="h-4 w-4" />
                            Our Growing Community
                        </span>

                        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                            Making Education Accessible for Everyone
                        </h2>

                        <p className="mt-3 text-sm text-slate-500">
                            Connecting students and tutors through meaningful
                            learning opportunities.
                        </p>
                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {statistics.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-slate-100 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-7"
                                >
                                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Icon className="h-6 w-6" />
                                    </div>

                                    <h3 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                                        {stat.value}
                                    </h3>

                                    <p className="mt-2 text-xs font-medium text-slate-500 sm:text-sm">
                                        {stat.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* ================= TESTIMONIALS ================= */}

                <div>
                    {/* Header */}
                    <div className="mx-auto mb-10 max-w-2xl text-center">
                        <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                            <Star className="h-4 w-4" />
                            Community Feedback
                        </span>

                        <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 md:text-4xl">
                            What People Say About{' '}
                            <span className="text-emerald-600">Us</span>
                        </h2>

                        <p className="mt-3 text-sm leading-7 text-slate-600 md:text-base">
                            Hear from students, tutors and parents about their
                            experience with MentorLagbe.
                        </p>
                    </div>

                    {/* Testimonial Cards */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {testimonials.map((item) => (
                            <div
                                key={item.name}
                                className="group rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-900/5"
                            >
                                {/* Quote Icon */}
                                <div className="mb-5 flex items-center justify-between">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <Quote className="h-6 w-6" />
                                    </div>

                                    <div className="flex gap-1">
                                        {Array.from({
                                            length: item.rating,
                                        }).map((_, index) => (
                                            <Star
                                                key={index}
                                                className="h-4 w-4 fill-amber-400 text-amber-400"
                                            />
                                        ))}
                                    </div>
                                </div>

                                {/* Review */}
                                <p className="min-h-24 text-sm leading-7 text-slate-600">
                                    &quot;{item.review}&quot;
                                </p>

                                {/* User Info */}
                                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                                        {item.initials}
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900">
                                            {item.name}
                                        </h4>

                                        <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                                            <ShieldCheck className="h-3.5 w-3.5" />
                                            {item.role}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom CTA */}
                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-extrabold text-slate-900">
                        Your Learning Journey Starts Here!
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                        Find the right tutor or share your teaching expertise.
                    </p>

                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <Link
                            href="/tuitions"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-emerald-600 px-7 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 transition hover:bg-emerald-700"
                        >
                            Find a Tutor
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>

                        <Link
                            href="/become-a-tutor"
                            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-emerald-200 bg-white px-7 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50"
                        >
                            Become a Tutor
                            <ArrowUpRight className="h-4 w-4" />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
