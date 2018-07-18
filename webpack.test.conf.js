var path = require("path");
var webpack = require('webpack');
//var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var devFlagPlugin = new webpack.DefinePlugin({
	__DEV__: JSON.stringify(JSON.parse(process.env.DEBUG || 'false')) //设置开发环境插件
});


module.exports = {
	//devtool: '#source-map', //source-map 不能和 uglifyjs-webpack-plugin 一起使用 会报错，
	
	module: {
		rules: [{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader', //将 react ,es6 转化为 es5
					query: {
						presets: ['es2015']
					}
				}
			}, {
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				] //['style-loader','css-loader']的简写,不支持 style-loader!css-loader的写法
			}, //css-loader 用来解析 css 文件，style-loader 用于插入到html当中,use 中的执行顺序 是从右到左
			{
				test: /\.(png|jpg)$/,
				use: [{
					loader: 'url-loader', // url-loader 用来将图片文件转化成 img 标签。如果图片小于 8192 比特，将会被转化成base64
					options: { // 或其他 Data url ,否则则会返回正常url.
						limit: 8192
					}
				}]
			},
			{
				test:/\.scss$/,
				use:[
					'style-loader',
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		devFlagPlugin,
	]
}