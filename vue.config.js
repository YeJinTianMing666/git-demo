const path = require('path')
// 将变量和 混入自动加载到各个组件中
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 那些文件自动引入 ， 使用绝对路径
      patterns: [path.join(__dirname, './src/assets/styles/variables.less'), path.join(__dirname, './src/assets/styles/mixins.less')]
    }
  },
  chainWebpack: config => {
  config.module
    .rule('images')
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, { limit: 10000 }))
  }
}
