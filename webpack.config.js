const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  	mode: 'development',
	entry: './src/app.ts',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
    	publicPath: '/dist/',
		assetModuleFilename: 'assets/[name][ext]',
		clean: true,
	},
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist'),
		},
		compress: true,
		port: 9000,
		historyApiFallback: {
			index: 'index.html'
		}
	},
  	devtool: 'inline-source-map',
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
				type: 'asset/resource'
			},
		]
	},
	resolve: {
		extensions: ['.ts', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
	]
};
