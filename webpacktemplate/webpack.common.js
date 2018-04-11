const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
 entry: __dirname + "/app/main.js", //已多次提及的唯一入口文件
 output: {
     path: __dirname + "/build",
     filename: "bundle-[hash].js"
 },
 module: {
     rules: [{
         test: /(\.jsx|\.js)$/,
         use: {
             loader: "babel-loader"
         },
         exclude: /node_modules/
     }, {
         test: /\.css$/,
         use: [
             {
                 loader: "style-loader"
             }, {
                 loader: "css-loader",
                 options: {
                     modules: true
                 }
             }, {
                 loader: "postcss-loader"
             }
         ]
     }]
 },
 plugins: [
     new HtmlWebpackPlugin({
         template: __dirname + "/app/index.tmpl.html" //new 一个这个插件的实例，并传入相关的参数
     }),
     new CleanWebpackPlugin('build/*.*', {
         root: __dirname,
         verbose: true,
         dry: false
     })
 ],
};