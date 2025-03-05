/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: "/nivea/microsite",
  reactStrictMode: true,
  trailingSlash: true,
  env: {
    // NEXT_PUBLIC_GA_MEASUREMENT_ID:"G-2D3WW30X0M",
    API_BASE:
      // "https://www.gforcesolution.com/app/2023/nestle-purelife-freshtive/api",
      "https://s1.gforcesolution.com/nivea/api"
  },
  images: {
    unoptimized: true,
    domains: ["*"],
  },
  // domains: ["*"],
  // output: "export",
  exportPathMap: async function () {
    return {
      "/": { page: "/" },
      // "/sign-in": { page: "/sign-in" },
      // "/dashboard": { page: "/dashboard" },
    };
  },
};

module.exports = nextConfig;
