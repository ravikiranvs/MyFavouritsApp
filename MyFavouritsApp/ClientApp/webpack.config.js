const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
var LiveReloadPlugin = require('webpack-livereload-plugin');

const isProd = process.env.NODE_ENV === "production";

const config = {
  mode: isProd ? "production" : "development",
  devtool: isProd ? "source-map" : "inline-source-map",
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: resolve(__dirname, "../wwwroot"),
    filename: "bundle.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: isProd ? "./src/index.prod.html" : "./src/index.dev.html",
      filename: "index.html",
      inject: "body",
    })
  ],
};

if (isProd) {
  config.optimization = {
    minimizer: [new TerserWebpackPlugin()],
  };
} else {
  config.plugins.push(new LiveReloadPlugin());
}

module.exports = config;