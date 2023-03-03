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
            exclude: /node_modules/,
            parallel: true,
            terserOptions: {
              //去除注释
              format: {
                comments: false,
              },
              // 清除 log,waring,debugger
              compress: {
                warnings: false,
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ["console.log"]
              }
            },
            // 去除注释
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