const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const distPath = path.resolve(__dirname, 'build-assets');
const apps = ['sub1'];

module.exports = (env, args) => ({
  devtool: 'source-map',
  entry: {
    ...apps.reduce((a, k) => ({ ...a, [k]: `./packages/${k}/src/index.js` }), {}),
  },
  output: {
    path: distPath,
    filename: 'static/[name]/[name].[contenthash].js',
  },
  resolve: {
    modules: ['node_modules'],
    alias: {
      sub1: path.resolve(__dirname, './packages/sub1/src'),
      shared: path.resolve(__dirname, './packages/shared/src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              insertAt: 'top',
            },
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['react-app'],
              cacheDirectory: '.babel_cache',
              babelrc: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[contenthash].[ext]',
              outputPath: 'static',
              publicPath: '/static',
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name].[contenthash].[ext]',
              outputPath: 'static',
              publicPath: '/static',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    ...apps.map(
      (proj) =>
        new HtmlWebPackPlugin({
          template: './index.html',
          filename: `./${proj}/index.html`,
          chunks: ['commons', 'echarts', proj],
        }),
    ),
    new MiniCssExtractPlugin({
      filename: 'static/[name]/[name].css',
      chunkFilename: 'static/[name][id].css',
    }),
    new webpack.DefinePlugin({
      DEBUG: args.mode == 'development',
      PUBLIC_URL: JSON.stringify(args.mode == 'production' ? 'ABSOLUTE_PATH_HERE_IF_NEEDED' : ''),
    }),
    new CopyWebpackPlugin([
      {
        context: __dirname,
        from: 'static',
        to: path.join(distPath, 'static'),
      },
    ]),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'gzip',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        echarts: {
          test: /[\\/]node_modules[\\/]echarts[\\/]/,
          name: 'echarts',
          chunks: 'all',
        },
        commons: {
          test: /[\\/]node_modules[\\/](?!echarts).*[\\/]/,
          name: 'commons',
          chunks: 'all',
        },
      },
    },
  },
});
