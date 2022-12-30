const { DefinePlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const common = require('./webpack.common')
const { merge } = require('webpack-merge')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.(ts)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader',
        options: {
          compilerOptions: { noEmit: false }
        }
      }
    }, {
      test: /\.scss$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }, {
        loader: 'sass-loader'
      }]
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './public',
    historyApiFallback: true,
    devMiddleware: {
      writeToDisk: true
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:5050/api')
    }),
    new HTMLWebpackPlugin({
      template: 'template.dev.html'
    })
  ]
})
