const parse = require('parse-git-config')
const { readFileSync } = require('fs')
const path = require('path')
const styles = readFileSync(
  path.resolve('src/assets/settings.sass'),
  'utf-8'
)

const repositoryName = parse
  .sync()
  ['remote "origin"']
  .url
  .match(/\/([\w-]+)\.git$/)
  [1]

module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? `/${repositoryName}/`
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