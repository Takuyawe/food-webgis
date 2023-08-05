/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "maps.gstatic.com",
      "maps.googleapis.com",
      "cdn.weatherapi.com",
      "s3-media3.fl.yelpcdn.com",
      "s3-media2.fl.yelpcdn.com",
      "s3-media1.fl.yelpcdn.com",
      "s3-media4.fl.yelpcdn.com",
    ],
  },
};

module.exports = nextConfig;
