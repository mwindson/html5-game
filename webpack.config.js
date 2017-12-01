const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const packageInfo = require('./package.json')

module.exports = {
  context: __dirname,
  target: 'web',

  entry: [`${__dirname}/app/index.ts`],

  output: {
    path: path.resolve(__dirname, 'build', packageInfo.version),
    filename: '[name].[hash].js',
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'app'),
    },
    modules: [
      path.resolve(__dirname, 'app'),
      'node_modules',
    ],
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: true,
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [{
          loader: 'css-loader',
        }],
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', 'stylus-loader'],
      },
      {
        test: /\.ya?ml$/,
        use: ['json-loader', 'yaml-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'game-engine',
      filename: 'index.html',
      template: path.resolve(__dirname, 'app/index.tmpl.html'),
      // chunks: ['commons', 'main'],
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: __dirname,
    host: '0.0.0.0',
    hot: true,
    public: '10.180.13.24:8080',
  },
}
