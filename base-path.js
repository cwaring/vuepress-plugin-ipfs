export default ({ Vue, isServer }) => {
  // only apply to the client
  if (isServer) return

  // modify the $withBase helper to be IPFS aware
  Vue.prototype.$withBase = function(path) {
    const base =
      typeof window !== 'undefined'
        ? window.__VUEPRESS_ROUTER_BASE__ || '/'
        : this.$site.base

    if (path.charAt(0) === '/') {
      return base + path.slice(1)
    } else {
      return path
    }
  }
}
