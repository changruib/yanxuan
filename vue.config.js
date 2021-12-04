module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: '@import "@/assets/scss/base.scss";'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://yanxuan.xiecheng.live:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 路由按需加载
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
  /*
  publicPath: '/子文件夹'  如果项目放在域名的子目录下
  outputDir: '打包的文件名称' */
}
