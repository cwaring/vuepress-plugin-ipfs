const { resolve } = require('path')
const { exec } = require('child_process')

module.exports = (options, ctx) => {
  const { isProd, outDir } = ctx
  const name = '@cwaring/vuepress-plugin-ipfs'

  // this is a production mode plugin
  // bail during development
  if (!isProd) return { name }

  return {
    name,
    enhanceAppFiles: resolve(__dirname, 'base-path.js'),
    chainWebpack(config, isServer) {
      if (!isServer) {
        config
          .entry('app')
          .prepend(resolve(__dirname, 'public-path.js'))
          .end()
      }
    },
    async generated() {
      exec(`all-relative`, { cwd: outDir }, (error, stdout, stderr) => {
        if (error) {
          console.error(error.message)
          return
        }
        if (stderr) {
          console.error(stderr)
          return
        }
        console.log('Generating relative asset paths:')
        console.log(stdout)
      })
    }
  }
}
