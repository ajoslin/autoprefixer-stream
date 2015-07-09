'use strict'

var test = require('tape')
var autoprefixerStream = require('./')
var fs = require('fs')
var through = require('through2')

test('should work with css', function (t) {
  var contents = ''
  fs.createReadStream(__dirname + '/test.css')
    .pipe(autoprefixerStream('file.css'))
    .pipe(through(function (buf, enc, next) {
      contents += buf.toString('utf8')
      next()
    }, function (next) {
      t.ok(contents.indexOf('-webkit-transform') > -1, 'should have webkit transform')
      t.end()
    }))
})

test('should do nothing with js', function (t) {
  var contents = ''
  fs.createReadStream(__dirname + '/test.js')
    .pipe(autoprefixerStream('file.js'))
    .pipe(through(function (buf, enc, next) {
      contents += buf.toString('utf8')
      next()
    }, function (next) {
      t.equal(contents, fs.readFileSync(__dirname + '/test.js').toString())
      t.end()
    }))
})
