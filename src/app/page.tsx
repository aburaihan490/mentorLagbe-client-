import FeaturedTuitions from '@/components/home/FeaturedTuitions';
import { FeaturedTuitionsSkeleton } from '@/components/home/FeaturedTuitionsSkeleton';
import HeroBanner from '@/components/home/HeroBanner';
import HowItWorks from '@/components/home/HowItWorks';
import PlatformHighlights from '@/components/home/PlatformHighlights';
import PricingSection from '@/components/pricing/PricingSection';
import { Suspense } from 'react';

export default function Home() {
    return (
        <div>
            <HeroBanner />
            <Suspense fallback={<FeaturedTuitionsSkeleton />}>
                <FeaturedTuitions />
            </Suspense>
            <PricingSection />
            <HowItWorks />
            <PlatformHighlights />
        </div>
    );
}
