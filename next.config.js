/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "plc-trade.com" },
      { hostname: "loremflickr.com" },
      { hostname: "ce8dc832c.cloudimg.io" },
      { hostname: "media.licdn.com" },
      { hostname: "other-domain.com" },
      { hostname: "wiautomation.anticipa.io" },
      { hostname: "another-example.com" },
      { hostname: "avsuwzdjuo.cloudimg.io" },
      { hostname: "cdn-icons-png.flaticon.com" },
      { hostname: "static.thenounproject.com" },
      { hostname: "abdelkader-dev.s3.eu-west-3.amazonaws.com" },
    ],
  },
  reactStrictMode: true,
  i18n: {
    locales: ["en", "fr"],
    defaultLocale: "fr",
    localeDetection: false,
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
      use: {
        loader: "url-loader",
        options: {
          limit: 100000,
          name: "[name].[ext]",
        },
      },
    });
    return config;
  },
};

module.exports = nextConfig;
