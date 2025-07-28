'use client';
import React from 'react';
import HeroSection from '@/components/homecom/herosection';
import SearchFilter from '@/components/homecom/searchbar';
import Card from '@/components/homecom/card';
import Brands from '@/components/homecom/brands';
import FeaturedServices from '@/components/homecom/featuredservices';
import Slider from '@/components/homecom/slider';
import CarBuySell from '@/components/homecom/carbuysell';
import CarInspection from '@/components/homecom/carInspectionsection';

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <SearchFilter />
      <Card />
      <Brands />
      <FeaturedServices />
      <Slider />
      <CarInspection />
      <CarBuySell />
      
    </main>
  );
}