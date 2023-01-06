const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: './src/app.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: 'ts-loader',
				exclude: /node_modules/
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader']
			},
			{
				test: /\.(png|svg|jpg|jpeg|gif|webmanifest)$/,
				type: 'asset/resource',
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html',
			favicon: 'src/assets/favicon-32x32.png'

		}),
	]
};
