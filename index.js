'use strict'

var autoprefixer = require('autoprefixer-core')
var postcss = require('postcss')
var through = require('through2')
var path = require('path')

module.exports = function (file, opts) {
  var data = ''
  if (file && path.extname(file) !== '.css') {
    return through()
  } else {
    return through(write, end)
  }

  function write (buf, enc, next) {
    data += buf
    next()
  }
  function end (next) {
    var result = postcss([ autoprefixer ]).process(data).css
    this.push(new Buffer(result))
    next()
  }
}
