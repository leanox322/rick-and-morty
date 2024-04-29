/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/episodes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
