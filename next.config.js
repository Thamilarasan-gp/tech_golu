/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true
  },
  async rewrites() {
    return [
      {
        source: "/highres-1",
        destination: "/images/highres-1.png"
      },
      {
        source: "/highres-1.png",
        destination: "/images/highres-1.png"
      },
      {
        source: "/highres-1.jpg",
        destination: "/images/highres-1.png"
      },
      {
        source: "/highres-:id",
        destination: "/images/highres-:id.jpg"
      }
    ];
  }
};

module.exports = nextConfig;
