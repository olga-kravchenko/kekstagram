const path = require(`path`);

module.exports = {
  entry: [
    `./js/constants.js`,
    `./js/backend.js`,
    `./js/util-form.js`,
    `./js/util.js`,
    `./js/picture.js`,
    `./js/big-picture.js`,
    `./js/gallery.js`,
    `./js/filters.js`,
    `./js/zoom.js`,
    `./js/hashtag.js`,
    `./js/preview.js`,
    `./js/form.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: "eval"
}
