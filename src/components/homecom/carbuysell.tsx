'use client';

import Image from 'next/image';

export default function CarBuySell() {
  return (
    <section className="mx-auto w-full py-full px-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-0  overflow-hidden ">
        {/* Left Box */}
        <div className="bg-white text-center flex flex-col justify-center items-center p-20">
          <p className="text-gray-500 italic mb-1">Want To Buy Your Dream Car ?</p>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
            ARE YOU LOOKING FOR A CAR?
          </h2>
          <div className="w-full max-w-2xl">
            <Image
              src="/sell.png"
              alt="Buy Car"
              width={500}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>

        {/* Right Box */}
        <div className="bg-gray-100 text-center flex flex-col justify-center items-center p-20">
          <p className="text-gray-500 italic mb-1">Want To Sale Your Car ?</p>
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 mb-4">
            DO YOU WANT TO SELL YOUR CAR?
          </h2>
          <div className="w-full max-w-2xl">
            <Image
              src="/sell-1.png"
              alt="Sell Car"
              width={500}
              height={300}
              className="w-full h-auto object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
