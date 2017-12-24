var webpack = require('webpack');
var version = require('./package.json').version;
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index:  './src/js/index.js',
  },
  output: {
    path: __dirname + '/dist',
    filename: 'manager-' + version + '.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader',],
        }),
      },
      {
        test: /\.(png|jpg|woff|eot|ttf)$/,
        use: { loader: 'url-loader?limit=100000' }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin('manager-' + version + '.css')
  ],
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};
