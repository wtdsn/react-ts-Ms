const CracoLessPlugin = require("craco-less");
const {resolve} = require("path")

module.exports = {
  plugins:[{plugin:CracoLessPlugin}],
  webpack: {
      alias: {
        "@" : resolve(__dirname,"src")
      },
  }
};