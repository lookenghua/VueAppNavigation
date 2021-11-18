module.exports = {
  css: {
    extract: false
  },
  productionSourceMap: false,
  configureWebpack: {
    output: {
      library: "VueAppNavigation",
      libraryExport: "default"
    }
  }
};
