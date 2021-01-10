import withCSS from '@zeit/next-css'
import withSass from '@zeit/next-sass'
import withBundleAnalyzer from '@next/bundle-analyzer'

// module.exports = withCSS({
//   webpack: (config, { isServer }) => {
//     if (isServer) {
//       const antStyles = /antd-mobile\/.*?\/style.*?/
//       const origExternals = [...config.externals]
//       config.externals = [
//         (context, request, callback) => {
//           if (request.match(antStyles)) return callback()
//           if (typeof origExternals[0] === 'function') {
//             origExternals[0](context, request, callback)
//           } else {
//             callback()
//           }
//         },
//         ...(typeof origExternals[0] === 'function' ? [] : origExternals),
//       ]

//       config.module.rules.unshift({
//         test: antStyles,
//         use: 'null-loader',
//       })
//     }
//     return config
//   },
// })

export default withCSS(
  withSass({
    cssModules: true
  })
)

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})