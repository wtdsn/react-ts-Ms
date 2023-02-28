const CracoLessPlugin = require("craco-less");
const cracoPluginStyleResourcesLoader = require('craco-plugin-style-resources-loader');
const {
  resolve
} = require("path")

module.exports = {
  plugins: [{
    plugin: CracoLessPlugin
  }, {
    plugin: cracoPluginStyleResourcesLoader,
    options: {
      patterns: resolve(__dirname, './src/assets/style/common.less'),
      styleType: 'less'
    }
  }],
  webpack: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
      },
    }
  }
};