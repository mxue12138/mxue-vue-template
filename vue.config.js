module.exports = {
  configureWebpack: {
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
