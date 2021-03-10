const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      entry: './client/src/main.js',
      template: './client/src/template/index.html'
    }
  },
  publicPath: './',
  outputDir: './public/gaabickers',
  productionSourceMap: process.env === 'production' ? false : true,
  devServer: {
    proxy: 'http://localhost:3000'
  },
  chainWebpack: config => {
    config.module
      .rule('pug')
      .test(/\.pug$/)
      .use('pug-html-loader')
      .loader('pug-html-loader')
      .end();
    config.resolve.alias.set('@', resolve('client/src'));
  }
};
