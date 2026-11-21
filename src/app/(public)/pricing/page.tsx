import PricingSection from '@/components/pricing/PricingSection';
import PricingComparison from '@/components/pricing/PricingComparison';
import PricingFAQ from '@/components/pricing/PricingFAQ';

export default function PricingPage() {
    return (
        <main>
            <PricingSection />
            <PricingComparison />
            <PricingFAQ />
        </main>
    );
}
