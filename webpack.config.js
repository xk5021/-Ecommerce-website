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
    'list' : ['./src/page/list/index.js'],
    'detail' : ['./src/page/detail/index.js'],
    'cart'     : ['./src/page/cart/index.js'],
  	'user-login' :['./src/page/user-login/index.js'],
    'user-register' : ['./src/page/user-register/index.js'],
    'user-pass-reset' : ['./src/page/user-pass-reset/index.js'],
    'user-center' : ['./src/page/user-center/index.js'],
    'user-center-update' : ['./src/page/user-center-update/index.js'],
    'user-pass-update' : ['./src/page/user-pass-update/index.js'],
    'result' :['./src/page/result/index.js']
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
    new HtmlWebpackPlugin(getHtmlConfig('user-login','首页')),
    new HtmlWebpackPlugin(getHtmlConfig('index','用户登录')),
    new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),
    new HtmlWebpackPlugin(getHtmlConfig('detail','商品详细信息')),
     new HtmlWebpackPlugin(getHtmlConfig('cart','购物车')),
    new HtmlWebpackPlugin(getHtmlConfig('result','操作结果')),
    new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),
    new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),
    new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码'))
  ]
};




if('dev' === WEBPACK_ENV){
  
  config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports=config;