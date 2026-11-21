'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import React, { useState } from 'react';

const subjects = [
    'Mathematics',
    'Physics',
    'English',
    'Programming',
    'IELTS',
    'Chemistry',
    'Biology',
    'Science',
];

const classLevels = [
    'Class 9-10',
    'HSC',
    'Class 6-8',
    'Beginner',
    'IELTS Preparation',
    'Class 1-5',
    'Admission',
    'Intermediate',
];

const TuitionFilter = () => {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Sort Category handle event
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        const params = new URLSearchParams(searchParams.toString());

        if (value && value !== 'all-subjects') {
            params.set(name, value);
        } else {
            params.delete(name);
        }
        // Filter change হলে pagination reset
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
    };

    // handle search event emplement
    const handleSearch = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const search = searchValue.trim();

        const params = new URLSearchParams(searchParams.toString());

        if (search) {
            params.set('search', search);
        } else {
            params.delete('search');
        }

        // নতুন সার্চ করলে পেজিনেশন থাকলে ১ নম্বর পেজে রিসেট করা ভালো
        params.delete('page');

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mb-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            {/* Search */}
            <div className="mb-6">
                <label
                    htmlFor="search"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                >
                    Search Tuition
                </label>
                <form onSubmit={handleSearch} className="relative">
                    <input
                        type="text"
                        name="search"
                        defaultValue={searchParams.get('search') ?? ''}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search by title or subject..."
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    />
                    {/* আপনার SVG আইকন */}
                    <svg
                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                        />
                    </svg>
                </form>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {/* Subject */}
                <div>
                    <label
                        htmlFor="subject"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Subject
                    </label>

                    <select
                        name="subject"
                        onChange={handleSortChange}
                        value={searchParams.get('subject') ?? 'all-subjects'}
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    >
                        <option value="all-subjects">All Subjects</option>
                        {subjects.map((subject) => (
                            <option
                                key={subject}
                                value={subject.toLocaleLowerCase()}
                            >
                                {subject}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Class Level */}
                <div>
                    <label
                        htmlFor="class"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Class Level
                    </label>

                    <select
                        name="class"
                        onChange={handleSortChange}
                        value={searchParams.get('class') ?? ''}
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    >
                        <option value="">All Classes</option>
                        {classLevels.map((level) => (
                            <option
                                key={level}
                                value={level.toLocaleLowerCase()}
                            >
                                {level}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mode */}
                <div>
                    <label
                        htmlFor="mode"
                        className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                        Tuition Mode
                    </label>

                    <select
                        name="mode"
                        onChange={handleSortChange}
                        value={searchParams.get('mode') ?? ''}
                        className="w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10"
                    >
                        <option value="">All Modes</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                    </select>
                </div>

                {/* Clear Button */}
                <div className="flex items-end">
                    <button
                        type="button"
                        onClick={() => {
                            setSearchValue('');
                            router.push('/tuitions');
                        }}
                        className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm font-semibold text-emerald-700 transition duration-300 hover:border-emerald-600 hover:bg-emerald-600 hover:text-white"
                    >
                        {' '}
                        Clear Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TuitionFilter;
