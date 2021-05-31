const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')

const BASE_URL = process.env.NODE_ENV === 'production'
  ? '/'
  : '/'

module.exports = {
  publicPath: BASE_URL,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 1024 * 10
      }))
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.json$|\.txt$|\.md$|\.html$|\.css$|\.woff2$|\.woff$|\.ttf$|\.otf$|\.svg$/, // 匹配文件名
        filename: '[path][base].gz[query]',
        minRatio: 1,
        threshold: 1024 * 10
      })
    ],
    optimization: {
      splitChunks: {
        chunks: 'all',
        maxSize: 1024 * 1500,
        minSize: 1024 * 1000,
        cacheGroups: {
          default: {
            name: 'common',
            priority: -20
          },
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10
          }
        }
      }
    },
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false
  },
  css: {
    extract: false,
    sourceMap: process.env.NODE_ENV === 'development'
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_PROXY_HOST
      }
    }
  }
}
