
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "files.edgestore.dev",
        port: "",
        pathname: "**",
      },
    ],
  },
};

module.exports = nextConfig;

// const nextTranslate = require('next-translate-plugin')

// module.exports = nextTranslate()