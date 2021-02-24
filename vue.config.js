const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  pages: {
    index: {
      entry: "./client/src/main.js"
    }
  },
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule("pug")
      .test(/\.pug$/)
      .use("pug-html-loader")
      .loader("pug-html-loader")
      .end();
    config.resolve.alias.set("@", resolve("client/src"));
  }
};
