import { FeaturedTuitionsSkeleton } from '@/components/home/FeaturedTuitionsSkeleton';
import TuitionFilter from '@/components/tuition/TuitionFilter';
import TuitionList from '@/components/tuition/TuitionList';
import { Suspense } from 'react';

interface Props {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function TuitionsPage({ searchParams }: Props) {
    const params = await searchParams;

    return (
        <section className="min-h-screen bg-[#f5f8ff] py-12 md:py-16">
            {/* header */}
            <div className="container mx-auto px-5 lg:px-8">
                {/* Header */}
                <div className="mb-10 text-center">
                    <span className="inline-block rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700">
                        Find Your Perfect Tutor
                    </span>

                    <h1 className="mt-4 text-3xl font-extrabold text-slate-900 md:text-5xl">
                        Browse{' '}
                        <span className="text-emerald-600">All Tuitions</span>
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-slate-600">
                        Explore available tuition opportunities and find the
                        perfect learning experience for you.
                    </p>
                </div>
            </div>
            <div className="container mx-auto px-5 lg:px-8">
                {/* Search Filter  */}
                <TuitionFilter />
                <Suspense fallback={<FeaturedTuitionsSkeleton />}>
                    <TuitionList searchParams={params} />
                </Suspense>
            </div>
        </section>
    );
}
