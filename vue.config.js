module.exports = {
  css: {
    extract: false
  },
  productionSourceMap: true,
  configureWebpack: {
    output: {
      library: "VueAppNavigation",
      libraryExport: "default"
    }
  }
};
