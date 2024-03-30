/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: [
      "plc-trade.com",
      "loremflickr.com",
      "ce8dc832c.cloudimg.io",
      "media.licdn.com",
      "other-domain.com",
      "wiautomation.anticipa.io",
      "another-example.com",
      "avsuwzdjuo.cloudimg.io",
      "cdn-icons-png.flaticon.com",
      "static.thenounproject.com",
      "abdelkader-dev.s3.eu-west-3.amazonaws.com",
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
