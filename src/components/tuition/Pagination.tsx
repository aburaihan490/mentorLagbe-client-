'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
    currentPage: number;
    totalPages: number;
}

const Pagination = ({ currentPage, totalPages }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (totalPages <= 1) return null;

    const handlePageChange = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());

        params.set('page', page.toString());

        router.push(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {/* Previous Button */}
            <button
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Previous
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (page) => (
                    <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`rounded-lg border px-4 py-2 ${
                            currentPage === page
                                ? 'border-emerald-600 bg-emerald-600 text-white'
                                : 'border-slate-200 bg-white text-slate-700'
                        }`}
                    >
                        {page}
                    </button>
                ),
            )}

            {/* Next Button */}
            <button
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
