import FranchiseBanner from '@/app/franchise/franchisebanner';
import WhyCaryanams from  '@/app/franchise/whycaryanams';
import OperatingModel from '@/app/franchise/operatingmodel';
import FranchiseFAQ from '@/app/franchise/franchisefaq';

export default function FranchisePage() {
  return (
    <main>
      <FranchiseBanner />
      {/* Other sections */}
      <WhyCaryanams />
      <OperatingModel/>
      <FranchiseFAQ/>
    </main>
  );
}
