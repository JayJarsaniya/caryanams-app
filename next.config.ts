/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dealer.caryanams.com',
      'crmapi.conscor.com',
      'admin.caryanams.com',
      'marketplace-data-images.s3.ap-south-1.amazonaws.com',
      'caryanams.com',
      'evaluation.caryanams.com',
      'inspetion-app-caryanams.s3.ap-south-1.amazonaws.com',
      'i.ibb.co',
      'www.carwale.com', // ✅ ADD THIS
    ],
  },
};

module.exports = nextConfig;
