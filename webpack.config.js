var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');


// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';
// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(name,title){
  return {
    template    : './src/view/' + name + '.html',  //html原始模板
    filename    : 'view/' + name + '.html',  //目标文件位置  以output path为根路径
    title       :  title,
    inject      : true,
    hash        : true,
    chunks      : ['common', name]    //需要打包文件
  };
}; 
var config = {
  entry:{
  	'common':['./src/page/common/index.js'],
  	'index' :['./src/page/index/index.js'],
  	'login' :['./src/page/login/index.js'],
    'result':['./src/page/result/index.js']
  },
  output: {
    path: './dist' ,  //存放文件时的位置
    publicPath : '/dist',   //访问时文件的位置
    filename: 'js/[name].js'
  },
  externals: {
  	'jquery':'window.jQuery'
  },
  module: {
    loaders: [
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
      { test: /\.string$/, loader: 'html-loader'}
    ]
  },
  resolve:{  //配置别名  路径
    alias:{
      node_modules : __dirname + '/node_modules',
      unitl: __dirname + '/src/unitl',
      page: __dirname + '/src/page',
      service: __dirname + '/src/service',
      image: __dirname + '/src/image'
    }
  },
  plugins:[
    //独立通用模块打包到js/base.js中
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 把css单独打包到文件里
    new ExtractTextPlugin("css/[name].css"),
    //HTMl模板
    new HtmlWebpackPlugin(getHtmlConfig('login','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('index','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
  ]
};


if('dev' === WEBPACK_ENV){
  
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;