const path = require(`path`);
const alias = (prefix = `src`) => ({
  react: `./node_modules/react`,
  "styled-components": `./node_modules/styled-components`,
  "@zendeskgarden/react-theming": `./node_modules/@zendeskgarden/react-theming`,
  formik: `./node_modules/formik`,
  "styled-components": `./node_modules/styled-components`,
});

const SRC = `./src`;
const aliases = alias(SRC);

const resolvedAliases = Object.fromEntries(
  Object.entries(aliases).map(([key, value]) => [
    key,
    path.resolve(__dirname, value),
  ])
);

module.exports = {
  webpack: {
    alias: resolvedAliases,
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
