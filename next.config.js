/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const optimizedImages = require('next-optimized-images');

module.exports = withPlugins([
  [optimizedImages, {
    handleImages: ['jpeg', 'png', 'svg', 'webp', 'gif'], // default config
    removeOriginalExtension: true,
  }],
  {
    reactStrictMode: true,
  }
]);
