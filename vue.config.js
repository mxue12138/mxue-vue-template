const CompressionPlugin = require('compression-webpack-plugin')

module.exports = {
  configureWebpack: {
    plugins: [
      new CompressionPlugin({
        algorithm: 'gzip', // 使用gzip压缩
        test: /\.js$|\.html$|\.css$|\.woff2$|\.woff$|\.ttf$|\.svg$/, // 匹配文件名
        filename: '[path][base].gz[query]',
        minRatio: 1,
        threshold: 1024 * 10
      })
    ],
    devtool: process.env.NODE_ENV === 'development' ? 'source-map' : false
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    extract: false,
    sourceMap: process.env.NODE_ENV === 'development'
  },
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001'
      }
    }
  }
}
