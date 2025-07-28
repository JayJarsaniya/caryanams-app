'use client';
import React from 'react';
import Servicebanner from '@/app/services/servicebanner';
import CarServiceInfoSection from '@/app/services/carserviceInfosection';
import CarServiceHestory from '@/app/services/carservicehestory'
import FaqAccordion from '@/app/services/FaqAccordion';

export default function ServicebannerPage() {
  return (
    <>
      <Servicebanner />
      <CarServiceInfoSection/>
      <CarServiceHestory/>
      <FaqAccordion/>
    </>
  );
}
