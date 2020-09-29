const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

/**
 * This is where you customize the storybook webpack configuration
 */

module.exports = ({ config }) => {
  const nuConfig = merge(config, {
    resolve: {
      alias: {
        sub1: path.resolve(__dirname, '../packages/sub1/src'),
        shared: path.resolve(__dirname, '../packages/shared/src'),
      },
    },
    optimization: {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          STORYBOOK_ENV: '1',
        },
      }),
    ],
  });

  return nuConfig;
};
