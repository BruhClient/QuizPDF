import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains : ["lh3.googleusercontent.com"]
  },
  
  experimental : { 
    dynamicIO : true,
    serverComponentsExternalPackages: ["pdf-parse"],
  },
  eslint : {
    ignoreDuringBuilds : true
  }
  
  
};

export default nextConfig;
