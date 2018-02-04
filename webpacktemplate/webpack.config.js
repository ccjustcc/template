//words
//manifest [ˈmanəˌfest]  n.清单
//生产环境构建

//开发工具
//webpack's Watch Mode
//这个实际就是命令行 编译
//webpack-dev-server
//这是个插件,有服务器功能同时还有watch功能
//webpack-dev-middleware
//一个中间件 配合express使用的,感兴趣访问  https://doc.webpack-china.org/guides/development/#-source-map

//当生成带有hash的时候可以自动生成带相应js的Html文件
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清理生成文件夹中多余的文件,全清理掉再重新生成
const CleanWebpackPlugin = require('clean-webpack-plugin');
//使用hmr(在webpack包中自带)
const webpack = require('webpack');
//用来压缩和删除没被引用的代码 tree shaking 为啥感觉没作用
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
    devtool: 'eval-source-map',//sourcemap 用来定义文件 不同模式编译时间不同
    entry:  {
        main:__dirname + "/app/main.js",
        print : __dirname + "/app/print.js"
    },
    output: {
      path: __dirname + "/public",//打包后的文件存放的地方
      filename: '[name].bundle-[hash].js',//打包后输出文件的文件名
    },
    devServer: {
        contentBase: "./public",//本地服务器所加载的页面所在的目录
        historyApiFallback: true,//不跳转
        inline: true,//实时刷新,
        hot:true//hmr 热替换
      } ,
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: true, // 指定启用css modules
                            localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                        }
                    },
                    {
                        loader: "postcss-loader"
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new HtmlWebpackPlugin({
            template: __dirname + "/app/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
        }),
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new CleanWebpackPlugin(['public']),
        new UglifyJSPlugin(),
    ],
  }