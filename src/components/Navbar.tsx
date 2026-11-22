'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { toast } from 'react-hot-toast';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse Tuitions', href: '/tuitions' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'About', href: '/about' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);

    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const user = session?.user;

    // Role
    const role = user?.role || 'User';

    // Sign Out
    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || 'Sign out failed');
                return;
            }

            toast.success('Successfully signed out!');

            setProfileOpen(false);
            setIsOpen(false);

            router.push('/sign-in');
            router.refresh();
        } catch {
            toast.error('Something went wrong!');
        }
    };

    // Avatar
    const avatar = user?.image;

    const avatarFallback = user?.name?.charAt(0)?.toUpperCase() || 'U';

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
            <nav className="mx-auto flex h-18 max-w-360 items-center justify-between px-5 md:px-10">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="logo"
                        width={70}
                        height={70}
                        priority
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

                            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#00A86B] transition-all group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* Desktop Actions */}
                <div className="hidden items-center gap-3 lg:flex">
                    {isPending ? (
                        <div className="h-10 w-24 animate-pulse rounded-full bg-gray-100" />
                    ) : user ? (
                        /* Authenticated User */
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="flex items-center gap-3 rounded-full border border-gray-200 p-1.5 pr-4 transition hover:border-[#00A86B]"
                            >
                                {/* Avatar */}
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt={user.name || 'Profile'}
                                        width={40}
                                        height={40}
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 font-bold text-[#00A86B]">
                                        {avatarFallback}
                                    </div>
                                )}

                                <div className="text-left">
                                    <p className="text-sm font-bold text-[#071D40]">
                                        {user.name}
                                    </p>

                                    <p className="text-xs font-medium capitalize text-[#00A86B]">
                                        {role}
                                    </p>
                                </div>

                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path d="m6 9 6 6 6-6" />
                                </svg>
                            </button>

                            {/* Profile Dropdown */}
                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="absolute right-0 z-50 top-full mt-3 w-60 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                        <div className="border-b border-gray-100 px-3 py-3">
                                            <p className="font-bold text-[#071D40]">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>

                                            <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                                                {role}
                                            </span>
                                        </div>

                                        <Link
                                            href={`${role.toLocaleLowerCase()}/dashboard`}
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#00A86B]"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/update-profile"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="block rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#00A86B]"
                                        >
                                            Update Profile
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        /* Unauthenticated User */
                        <>
                            <Link
                                href="/sign-in"
                                className="rounded-full border border-gray-200 px-5 py-2 text-sm font-semibold text-[#071D40] transition hover:border-[#00A86B] hover:text-[#00A86B]"
                            >
                                Sign In
                            </Link>

                            <Link
                                href="/sign-up"
                                className="rounded-full bg-[#00A86B] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#008F5B]"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Right icon  */}
                <div className="flex gap-x-2.5">
                    {/* Mobile Profile Icon */}
                    {!isPending && user && (
                        <div className="relative lg:hidden">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                aria-label="Open profile menu"
                                aria-expanded={profileOpen}
                                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#00A86B] bg-green-50"
                            >
                                {avatar ? (
                                    <Image
                                        src={avatar}
                                        alt={user.name || 'Profile'}
                                        width={36}
                                        height={36}
                                        className="h-full w-full rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="font-bold text-[#00A86B]">
                                        {avatarFallback}
                                    </span>
                                )}
                            </button>

                            {/* Mobile Profile Dropdown */}
                            {profileOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setProfileOpen(false)}
                                    />
                                    <div className="absolute -right-10 md:right-0 top-full mt-3 w-64 rounded-xl border border-gray-100 bg-white p-2 shadow-xl">
                                        <div className="border-b border-gray-100 px-3 py-3">
                                            <p className="font-bold text-[#071D40]">
                                                {user.name}
                                            </p>

                                            <p className="truncate text-xs text-gray-500">
                                                {user.email}
                                            </p>

                                            <span className="mt-2 inline-block rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                                                {role}
                                            </span>
                                        </div>

                                        <Link
                                            href={`${role.toLocaleLowerCase()}/dashboard`}
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50"
                                        >
                                            Dashboard
                                        </Link>

                                        <Link
                                            href="/update-profile"
                                            onClick={() =>
                                                setProfileOpen(false)
                                            }
                                            className="block rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-green-50"
                                        >
                                            Update Profile
                                        </Link>

                                        <button
                                            onClick={handleSignOut}
                                            className="w-full rounded-lg px-3 py-3 text-left text-sm font-semibold text-red-500 hover:bg-red-50"
                                        >
                                            Sign Out
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
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
                </div>
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
                </div>
            )}
        </header>
    );
}
