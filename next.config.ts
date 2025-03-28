import type { NextConfig } from "next";

const path = require("path");
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["robohash.org"],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};

export default nextConfig;
