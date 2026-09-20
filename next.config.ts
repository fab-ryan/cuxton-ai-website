import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export to `out/`, uploaded to cPanel's public_html.
  output: "export",

  // Apache serves directories, not extensionless files. Without this, the
  // export writes `cookies.html` while also creating a `cookies/` directory
  // for RSC payloads — so a link to `/cookies` hits the directory, finds no
  // index.html, and returns 403. This emits `cookies/index.html` instead,
  // which DirectoryIndex picks up.
  trailingSlash: true,

  // No image optimiser exists in a static export; `next/image` must not
  // rewrite src through /_next/image.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
