'use client';
import {
  FaCheckCircle,
  FaCar,
  FaUserShield,
  FaHeart,
  FaTrophy,
} from 'react-icons/fa';

const stats = [
  {
    icon: <FaCar className="text-3xl sm:text-4xl text-blue-600" />,
    number: '1238+',
    label: 'Total Cars',
  },
  {
    icon: <FaUserShield className="text-3xl sm:text-4xl text-blue-600" />,
    number: '820+',
    label: 'Verified Dealers',
  },
  {
    icon: <FaHeart className="text-3xl sm:text-4xl text-blue-600" />,
    number: '1042+',
    label: 'Active Users',
  },
  {
    icon: <FaTrophy className="text-3xl sm:text-4xl text-blue-600" />,
    number: '34+',
    label: 'Featured Ads',
  },
];

const FinanceIntro = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
          <span className="text-[#004c97]">GET STARTED</span>{' '}
          <span className="text-[#d2ae42]">TODAY!</span>
          </h2>

          <ul className="mt-6 space-y-4 text-gray-700">
            {[
              'Flexible Financing Options',
              'Quick Approval Process',
              'Expert Guidance',
              'Convenient Online Application',
            ].map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <FaCheckCircle className="text-blue-600 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900">
            Welcome to Caryanams Car Finance
          </h3>
          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            At Caryanams, we understand that buying a car is a significant
            investment. That&apos;s why we offer hassle-free financing
            solutions tailored to your needs. Whether you&apos;re purchasing a
            new car or a pre-owned vehicle, we&apos;re here to make the
            financing process smooth and seamless.
          </p>
          <p className="mt-4 text-gray-700 text-sm sm:text-base leading-relaxed">
            Ready to take the next step towards owning your dream car? Fill out
            our online application form to get pre-approved for car finance. If
            you have any questions or need assistance, feel free to contact our
            friendly team. We&apos;re here to help you drive away in the car of
            your dreams!
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mt-12 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            {item.icon}
            <h4 className="text-xl sm:text-2xl font-bold mt-2">{item.number}</h4>
            <p className="text-blue-700 text-sm sm:text-base font-medium">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinanceIntro;
