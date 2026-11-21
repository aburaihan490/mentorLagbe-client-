import Link from 'next/link';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="relative overflow-hidden bg-slate-950 text-white z-20">
            {/* Background Decoration */}
            <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-emerald-600/10 blur-3xl" />
            <div className="absolute -bottom-20 left-0 h-72 w-72 rounded-full bg-blue-600/10 blur-3xl" />

            <div className="container relative mx-auto px-5 lg:px-8">
                {/* Main Footer */}
                <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div>
                        <Link
                            href="/"
                            className="mb-5 inline-flex items-center gap-3"
                        >
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-lg shadow-emerald-600/20">
                                <Image
                                    src="/logo.png"
                                    alt="logo"
                                    width={70}
                                    height={70}
                                    loading="eager"
                                    className=""
                                />
                            </div>

                            <div>
                                <h2 className="text-2xl font-extrabold tracking-tight">
                                    Mentor
                                    <span className="text-emerald-400">
                                        Lagbe
                                    </span>
                                </h2>
                                <p className="text-[10px] font-medium tracking-widest text-slate-400">
                                    LEARN • GROW • EXCEL
                                </p>
                            </div>
                        </Link>

                        <p className="max-w-xs text-sm leading-7 text-slate-400">
                            Connecting students with trusted tutors. Making
                            quality education accessible to everyone through
                            personalized learning.
                        </p>

                        {/* Social Links */}
                        <div className="mt-6 flex items-center gap-3">
                            <a
                                href="https://www.facebook.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path d="M13.5 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H7.3v3h2.8v8h3.4Z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.instagram.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm0 2h10c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3zm11 1.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6z" />
                                </svg>
                            </a>

                            <a
                                href="https://www.linkedin.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                >
                                    <path d="M20.45 2H3.55C2.7 2 2 2.7 2 3.55v16.9c0 .85.7 1.55 1.55 1.55h16.9c.85 0 1.55-.7 1.55-1.55V3.55C22 2.7 21.3 2 20.45 2zM8 19H5V9h3v10zM6.5 7.7a1.75 1.75 0 1 1 0-3.5 1.75 1.75 0 0 1 0 3.5zM19 19h-3v-5c0-1.2-.02-2.75-1.68-2.75-1.68 0-1.94 1.3-1.94 2.66V19h-3V9h2.88v1.37h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.86 2 3.86 4.6V19z" />
                                </svg>
                            </a>

                            {/* New X Logo */}
                            <a
                                href="https://x.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="X"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 text-slate-400 transition hover:border-emerald-500 hover:bg-emerald-600 hover:text-white"
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="h-4 w-4"
                                    aria-hidden="true"
                                >
                                    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.634 7.584H.478l8.6-9.83L0 1.154h7.594l5.243 6.932zM17.61 20.644h2.039L6.486 3.24H4.298z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">Quick Links</h3>

                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link
                                    href="/"
                                    className="transition hover:text-emerald-400"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/tuitions"
                                    className="transition hover:text-emerald-400"
                                >
                                    Find Tuitions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/become-a-tutor"
                                    className="transition hover:text-emerald-400"
                                >
                                    Become a Tutor
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/subscription"
                                    className="transition hover:text-emerald-400"
                                >
                                    Pricing Plans
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="transition hover:text-emerald-400"
                                >
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* For Students & Tutors */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">For Everyone</h3>

                        <ul className="space-y-4 text-sm text-slate-400">
                            <li>
                                <Link
                                    href="/tuitions"
                                    className="transition hover:text-emerald-400"
                                >
                                    Browse Tuitions
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/register"
                                    className="transition hover:text-emerald-400"
                                >
                                    Student Registration
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/become-a-tutor"
                                    className="transition hover:text-emerald-400"
                                >
                                    Tutor Registration
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="transition hover:text-emerald-400"
                                >
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/faq"
                                    className="transition hover:text-emerald-400"
                                >
                                    FAQs
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h3 className="mb-6 text-lg font-bold">Get In Touch</h3>

                        <ul className="space-y-5 text-sm text-slate-400">
                            <li className="flex items-start gap-3">
                                <Mail className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="mb-1 text-xs text-slate-500">
                                        Email Address
                                    </p>
                                    <a
                                        href="mailto:support@mentorlagbe.com"
                                        className="transition hover:text-emerald-400"
                                    >
                                        support@mentorlagbe.com
                                    </a>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <Phone className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="mb-1 text-xs text-slate-500">
                                        Phone Number
                                    </p>
                                    <a
                                        href="tel:+8801XXXXXXXXX"
                                        className="transition hover:text-emerald-400"
                                    >
                                        +880 1XXXXXXXXX
                                    </a>
                                </div>
                            </li>

                            <li className="flex items-start gap-3">
                                <MapPin className="mt-1 h-5 w-5 shrink-0 text-emerald-400" />
                                <div>
                                    <p className="mb-1 text-xs text-slate-500">
                                        Our Location
                                    </p>
                                    <p>Bangladesh</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter / CTA */}
                <div className="mb-10 flex flex-col items-center justify-between gap-5 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 sm:flex-row">
                    <div>
                        <h3 className="text-lg font-bold">
                            Ready to Start Your Learning Journey?
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                            Find the right tutor and achieve your goals.
                        </p>
                    </div>

                    <Link
                        href="/tuitions"
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-emerald-600 px-6 text-sm font-bold text-white transition hover:bg-emerald-700"
                    >
                        Explore Tuitions
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* Bottom Footer */}
                <div className="flex flex-col items-center justify-between gap-5 border-t border-slate-800 py-7 text-center sm:flex-row sm:text-left">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} MentorLagbe. All rights
                        reserved.
                    </p>

                    <div className="flex flex-wrap justify-center gap-5 text-xs text-slate-400">
                        <Link
                            href="/privacy-policy"
                            className="transition hover:text-emerald-400"
                        >
                            Privacy Policy
                        </Link>

                        <Link
                            href="/terms"
                            className="transition hover:text-emerald-400"
                        >
                            Terms & Conditions
                        </Link>

                        <Link
                            href="/contact"
                            className="transition hover:text-emerald-400"
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
