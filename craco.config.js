module.exports = {
  eslint: {
    enable: false,
  },
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto",
      });
      return webpackConfig;
    },
  },
  babel: {
    presets: ["@babel/preset-env"],
    plugins: [
      "@babel/plugin-proposal-optional-chaining",
      "@babel/plugin-proposal-nullish-coalescing-operator",
      "@babel/plugin-proposal-numeric-separator",
    ],
  },
};
