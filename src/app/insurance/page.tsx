'use client';
import React from 'react';
import InsuranceSection from '@/app/insurance/InsuranceSection';
import InsuranceIntroSection from '@/app/insurance/InsuranceIntroSection';
import InsuranceSolutions from '@/app/insurance/insurancesolutions';
import QuoteBanner from '@/app/insurance/QuoteBanner';

export default function InsurancePage() {
  return (
    <>
      <InsuranceSection />
      <InsuranceIntroSection />
      <InsuranceSolutions />
      <QuoteBanner />
    </>
  );
}