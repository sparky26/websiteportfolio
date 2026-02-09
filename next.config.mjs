/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/websiteportfolio',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "opengraph.githubassets.com" }
    ]
  }
};

export default nextConfig;
