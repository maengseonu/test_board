/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // async rewrites() {
  //   return [
  //     {
  //       source: `/api/:path*`,
  //       destination: `http://49.164.100.253:8080/api/`,
  //     },
  //   ];
  // },
};

module.exports = nextConfig;
