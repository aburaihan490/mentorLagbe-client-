import FeaturedTuitions from '@/components/home/FeaturedTuitions';
import { FeaturedTuitionsSkeleton } from '@/components/home/FeaturedTuitionsSkeleton';
import HeroBanner from '@/components/home/HeroBanner';
import HowItWorks from '@/components/home/HowItWorks';
import PlatformHighlights from '@/components/home/PlatformHighlights';
import PricingSection from '@/components/pricing/PricingSection';
import { getTuitions } from '@/qurey/tuitions.api';
import { ITuition } from '@/types/tuition';
import { Suspense } from 'react';

const TuitionSection = async () => {
    const tuitions = await getTuitions();
    const data: ITuition[] = tuitions?.data;
    return <FeaturedTuitions tuitions={data.slice(0, 6)} />;
};

export default function Home() {
    return (
        <div>
            <HeroBanner />
            <Suspense fallback={<FeaturedTuitionsSkeleton />}>
                <TuitionSection />
            </Suspense>
            <PricingSection />
            <HowItWorks />
            <PlatformHighlights />
        </div>
    );
}
