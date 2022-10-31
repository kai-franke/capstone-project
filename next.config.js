/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["einhornzentrale.de", "res.cloudinary.com"],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
