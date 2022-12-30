const { DefinePlugin } = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
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
        loader: MiniCSSExtractPlugin.loader
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
  externals: {
    react: 'React',
    axios: 'axios',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM'
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:5050/api')
    }),
    new HTMLWebpackPlugin({
      template: 'template.prod.html'
    }),
    new MiniCSSExtractPlugin({
      filename: 'main-bundle-[hash].css'
    })
  ]
})
