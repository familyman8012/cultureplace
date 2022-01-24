/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["kopis.or.kr", "cdn.class101.net"],
    formats: ["image/avif", "image/webp"]
  }
};
