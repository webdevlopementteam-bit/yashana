/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export → `out/` folder (upload it to any static host)
  output: "export",
  images: { unoptimized: true },
  // `npm run export` builds into a separate folder (then renamed to out/) so a running `next dev` isn't disturbed
  distDir: process.env.NEXT_DIST_DIR || ".next",
};
export default nextConfig;
