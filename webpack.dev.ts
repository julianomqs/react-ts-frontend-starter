import dotenv from "dotenv";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import merge from "webpack-merge";
import common from "./webpack.common";

dotenv.config();

const config: webpack.Configuration = {
  devServer: {
    hot: true,
    historyApiFallback: true,
    overlay: true,
    host: process.env.CLIENT_HOST,
    port: parseInt(process.env.CLIENT_PORT)
  },
  devtool: "inline-source-map",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            babelrc: false,
            cacheDirectory: true,
            presets: ["@babel/preset-typescript", "@babel/preset-react"],
            plugins: ["react-hot-loader/babel"]
          }
        }
      },
      {
        test: /\/App\.tsx$/,
        loader: "react-hot-loader-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};

export default merge(common, config);
