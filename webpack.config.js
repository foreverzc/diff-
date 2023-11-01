// 从webpack 官网 配置  https://www.webpackjs.com/

// webpack.prod.js
const path = require("path");
// const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: "./src/index.js",
  output: {
    // 虚拟打包路径，文件夹不会真正生成，而是在8080端口虚拟生成
    publicPath: "/xuni/",
    // 打包出来的文件名
    filename: "bundle.js",
  },
  //   plugins: [
  //     new HtmlWebpackPlugin({
  //       template: path.resolve(__dirname, "../public/index.html"),
  //     }),
  //   ],

  devServer: {
    port: 8080,
    // 静态资源文件夹
    static: "www",
    open: true,
  },
  mode: "development",
};
