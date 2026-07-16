
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  allowedDevOrigins: [
    "identical-barman-garter.ngrok-free.dev",
  ],
  serverExternalPackages: [
    "better-auth",
    "@prisma/client",
    "prisma",
    "pg",
    "@prisma/adapter-pg",
  ],
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
