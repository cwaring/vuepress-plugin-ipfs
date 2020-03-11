# VuePress Plugin IPFS

> Convert a [VuePress](https://vuepress.vuejs.org/) 1.x bundle into relative paths making it suitable for hosting on IPFS.

## Usage

```
npm i -D vuepress-plugin-ipfs
```

### Setup

Add to `config.js` or `theme/index.js`

```
module.exports = {
  plugins: [
    ['vuepress-plugin-ipfs'],
  ]
}
```

Once included this this plugin will post process all generated pages and CSS files to use relative asset paths during a production build.

## \$withBase - Base URL helper

Sites hosted on IPFS will be accessed via a variable depth so it is important to use relative paths for assets wherever possible, however there are certain scenarios where this is not viable due to components being included on multiple pages (such as headers/footers) or when asset paths are programmatically included.

If your site is accessed via an IPFS gateway the `base` path will be computed to include the current IPFS gateway and CID. For example, `https://gateway.ipfs.io/ipfs/<CID>/`, then `base` will be configured to `"/ipfs/<CID>/"`. The same goes for any IPNS gateway paths.

Therefore it is best to use this built in helper method to wrap asset paths. `$withBase` (injected onto Vue’s prototype) to generate the correct path when accessed via the root domain or IPFS gateway:

```vue
<img :src="$withBase('/foo.png')" alt="foo">
```

> Tip: You can use the above syntax in theme components and Markdown files.

**💡If you have a `base` key set in `.vuepress/config.js` or `theme/index.js` you will need to remove it in order for this plugin to work correctly.**
