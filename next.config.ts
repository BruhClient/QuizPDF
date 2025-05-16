import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images : {
    domains : ["lh3.googleusercontent.com"]
  },
  experimental : { 
    dynamicIO : true
  },
  eslint : {
    ignoreDuringBuilds : true
  }
  
  
};

export default nextConfig;
