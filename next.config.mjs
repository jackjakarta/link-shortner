/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ls-cd-01.eu-central-1.linodeobjects.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
