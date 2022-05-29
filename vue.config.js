const { readFileSync } = require('fs')
const path = require('path')
const styles = readFileSync(
  path.resolve('src/assets/settings.sass'),
  'utf-8'
)

module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? '/vue-todo/'
    : "/",
  outputDir: "docs",
  css: {
    loaderOptions: {
      sass: {
        additionalData: styles
      }
    }
  }
}
