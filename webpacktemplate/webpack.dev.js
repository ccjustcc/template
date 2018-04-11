 const merge = require('webpack-merge');
 const webpack = require('webpack')
 const comment = require('./webpack.common');
 const ExtractTextPlugin = require('extract-text-webpack-plugin');
 module.exports = merge(comment,{
  
  devtool: 'inline-source-map', //注意修改了这里，这能大大压缩我们的打包代码
  devServer: {
      contentBase: "./app", //本地服务器所加载的页面所在的目录
      historyApiFallback: true, //不跳转
      inline: true,
      open:true,
    //   hot:true
      //热加载的话修改html不会reload整个页面，意味着你看不到效果
  },
  plugins: [
    //   new webpack.HotModuleReplacementPlugin(), //热加载插件,如果这个不加貌似是不会加载js?
      new webpack.optimize.OccurrenceOrderPlugin(),
      
  ],
});