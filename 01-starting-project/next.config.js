/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // Turbopack’i dev ve build sırasında devre dışı bırak
  },
};

module.exports = nextConfig;
