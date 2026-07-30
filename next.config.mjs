/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Fixes potential issues with Three.js modules
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'], 
};

export default nextConfig;