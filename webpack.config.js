const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge");
const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode } = { mode: "production" }) => {
  console.log(mode);
  return merge(
    {
      entry: "./src/index.tsx",
      mode,
      output: {
        filename: "bundle.js",
      },
      resolve: {
        extensions: [".tsx", ".ts", ".js"],
      },
      devServer: {
        port: 3000,
      },
      module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
          },
          {
            test: /\.(ts|tsx)$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
          },
          {
            test: /\.css$/,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
          },
          {
            test: /\.(jpg|jpeg)$/,
            use: ["file-loader"],
          },
        ],
      },
      plugins: [
        new HtmlWebpackPlugin({ template: "./public/index.html" }),
        new MiniCssExtractPlugin(),
      ],
    },
    modeConfig(mode)
  );
};
