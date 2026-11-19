'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tuitions', href: '/tuitions' },
    { name: 'Become a Tutor', href: '/become-tutor' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <nav className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={70}
                        height={70}
                        loading="eager"
                    />
                    <span className="text-2xl font-extrabold tracking-tight text-[#071D40]">
                        Mentor<span className="text-[#00A86B]">Lagbe</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex font-handwriting">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="group relative text-sm font-semibold text-[#071D40] transition hover:text-[#00A86B]"
                        >
                            {link.name}

                            <span className="absolute -bottom-2 left-0 h-[2px] w-0 bg-[#00A86B] transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    <button
                        aria-label="Search"
                        className="rounded-full p-2 text-[#071D40] transition hover:bg-gray-100"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="21"
                            height="21"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        >
                            <circle cx="11" cy="11" r="7" />
                            <path d="m20 20-4-4" />
                        </svg>
                    </button>

                    <Link
                        href="/login"
                        className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-[#071D40] transition hover:border-[#00A86B] hover:text-[#00A86B]"
                    >
                        Sign In
                    </Link>

                    <Link
                        href="/register"
                        className="rounded-full bg-[#00A86B] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#008F5B]"
                    >
                        Get Started
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={isOpen}
                    className="rounded-lg p-2 text-[#071D40] hover:bg-gray-100 lg:hidden"
                >
                    {isOpen ? (
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="m18 6-12 12M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg
                            width="26"
                            height="26"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="border-t border-gray-100 bg-white px-5 py-5 shadow-lg lg:hidden">
                    <div className="flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="rounded-lg px-4 py-3 text-sm font-semibold text-[#071D40] transition hover:bg-green-50 hover:text-[#00A86B]"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    <div className="mt-4 flex gap-3">
                        <Link
                            href="/login"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-full border border-gray-200 py-3 text-center text-sm font-semibold text-[#071D40]"
                        >
                            Sign In
                        </Link>

                        <Link
                            href="/register"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 rounded-full bg-[#00A86B] py-3 text-center text-sm font-bold text-white"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
}
