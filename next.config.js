const withCSS = require('@zeit/next-css')
const withSass = require('@zeit/next-sass')
const withBundleAnalyzer = require('@next/bundle-analyzer')

module.exports = withCSS(
  withSass({
    cssModules: true
  })
)
module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})