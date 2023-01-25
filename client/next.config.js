const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase, {}) => {
  /** @type {import('next').NextConfig} */
  const nextConfig = {
    reactStrictMode: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*.leagueoflegends.com',
        },
      ],
    },
    compiler: {
      emotion: true,
    },
    webpack: (config) => {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack'],
      });
      return config;
    },
  };

  if (phase === PHASE_DEVELOPMENT_SERVER) {
    /** @type {import('next').NextConfig} */
    const devNextConfig = {
      ...nextConfig,
      rewrites: async () => {
        return [
          {
            source: '/api/:slug*',
            destination: 'http://localhost:4000/:slug*',
          },
        ];
      },
    };

    return devNextConfig;
  }

  return nextConfig;
};
