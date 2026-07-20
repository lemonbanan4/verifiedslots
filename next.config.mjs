import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["lucide-react"],
  // Native Node modules (C++ bindings) must never be bundled by Turbopack/Webpack.
  // grpc-js is pulled in transitively by @firebase/firestore → google-gax.
  serverExternalPackages: [
    "@grpc/grpc-js",
    "@grpc/proto-loader",
    "google-gax",
    "@google-cloud/storage",
  ],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;