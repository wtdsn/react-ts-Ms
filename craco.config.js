const CracoLessPlugin = require("craco-less");
const cracoPluginStyleResourcesLoader = require('craco-plugin-style-resources-loader');
const TerserPlugin = require('terser-webpack-plugin')
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
    },
    configure: (webpackConfig, { env, paths }) => {
      webpackConfig.optimization = {
        minimize: true,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              format: {
                comments: false,
              },
            },
            extractComments: false,
          })],
      }

      webpackConfig.devtool = false
      return webpackConfig
    }
  },
  devServer: {
    proxy: {
      '/api': {
        changeOrigin: true,
        target: 'http://localhost:3001',
      },
    }
  }
};