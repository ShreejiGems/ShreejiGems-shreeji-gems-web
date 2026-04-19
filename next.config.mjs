/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  env: {
    HOSTNAME: process.env.HOSTNAME,
    PORT: process.env.PORT,
    NEXT_URL: process.env.NEXT_URL,
    NEXT_ENDPOINT: process.env.NEXT_ENDPOINT,
    NEXT_API_ENDPOINT: process.env.NEXT_API_ENDPOINT,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
