module.exports = {
  publicPath: process.env.NODE_ENV === "production"
    ? "/itprojects/"
    : "/",
  outputDir: "docs"
}