'use strict'

var test = require('tape')
var fs = require('fs')
var path = require('path')
var applyTranform = require('apply-transform')
var prefix = require('./')

test('css', function (t) {
  t.plan(1)
  var filename = 'test.css'
  var css = fs.readFileSync(path.resolve(__dirname, filename)).toString()
  applyTranform(prefix(filename), css, function (err, transformed) {
    if (err) return t.end(err)
    t.ok(transformed.indexOf('-webkit-transform'), 'has prefix')
  })
})

test('js', function (t) {
  t.plan(1)
  var filename = __filename
  var js = fs.readFileSync(path.resolve(__dirname, filename)).toString()
  applyTranform(prefix(filename), js, function (err, transformed) {
    if (err) return t.end(err)
    t.equal(transformed, js, 'js passed through')
  })
})
