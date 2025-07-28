'use client';
import Image from "next/image";

const features = [
  {
    title: "EXCLUSIVE TERRITORY RIGHTS",
    image: "/Exclusive.png",
    description:
      "Secure an exclusive territory, ensuring that you have a dedicated market to grow your business without direct competition from other Caryanams franchises",
  },
  {
    title: "MARKETING SUPPORT",
    image: "/Marketing.png",
    description:
      "Leverage our national marketing campaigns and get personalized support to promote your franchise locally.",
  },
  {
    title: "LUCRATIVE REVENUE SHARING",
    image: "/Revenue.png",
    description:
      "With a 50% share in the business's profits, our franchise model offers significant financial potential. This attractive revenue-sharing structure is designed to reward your investment and efforts.",
  },
];

const WhyCaryanams = () => {
  return (
    <section className="py-16 bg-white">
      {/* Heading */}
      <div className="text-left mb-10 px-4 sm:px-6 lg:px-8">
     <h2 className="text-2xl sm:text-3xl font-bold mb-4">
     <span className="text-[#004c97]">Why</span>{' '}
     <span className="text-[#d2ae42]">Caryanams?</span>
     </h2>

        <div className="w-16 h-1 bg-gray-800 mt-2" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Image */}
            <Image
              src={feature.image}
              alt={feature.title}
              width={500}
              height={450}
              className="w-full h-[350px] sm:h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center px-4 py-6 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base opacity-0 max-h-0 sm:group-hover:opacity-100 sm:group-hover:max-h-60 sm:transition-all sm:duration-500 sm:overflow-hidden">
                {feature.description}
              </p>

              {/* On mobile, show description always */}
              <p className="text-sm sm:hidden mt-2">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyCaryanams;
