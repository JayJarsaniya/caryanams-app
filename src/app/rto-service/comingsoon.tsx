'use client';
import React from 'react';
import Image from 'next/image';

const ComingSoon = () => {
  return (
    <section className="flex items-center justify-center min-h-[80vh] bg-white px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <Image
          src="/logo.png"
          alt="Caryanams Logo"
          width={384} // md:w-96 (96 * 4 = 384px)
          height={384}
          className="mx-auto mb-8 mt-5 w-48 sm:w-72 md:w-96"
          suppressHydrationWarning={true}
          aria-label="Caryanams Logo"
        />
      </div>
    </section>
  );
};

export default ComingSoon;