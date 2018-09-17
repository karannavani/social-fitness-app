const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpack = new HtmlWebpackPlugin({
  template: 'src/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CopyWebpack = new CopyWebpackPlugin([
  { from: './src/assets', to: 'assets' }
]);

const HotModuleReplcement = new webpack.HotModuleReplacementPlugin();

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve('public'),
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader' },
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    port: 8000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        secure: false
      }
    }
  },
  plugins: [HotModuleReplcement, HtmlWebpack, CopyWebpack]
};
