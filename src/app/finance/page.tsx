'use client';

import React from 'react';
// import { useParams } from 'next/navigation';

import FinanceForm from '@/app/finance/financeform';
import FinanceIntro from '@/app/finance/financeintro';
import LoanCalculator from '@/app/finance/loancalclutor';
import FincingSolutions from '@/app/finance/financingsolutions';

export default function DynamicPage() {
  return (
    <>
      <FinanceForm />
      <FinanceIntro />
      <LoanCalculator />
      <FincingSolutions />
    </>
  );
}
