var pickFiles = require('broccoli-static-compiler');
var compileLess = require('broccoli-less');
var mergeTrees = require('broccoli-merge-trees');
var watchify = require('broccoli-watchify');

var js = watchify('app', {
  browserify: {
    entries: ['./app.js'],
    debug: true
  },
  outputFile: 'app.js',
  cache: true,
  init: function(b) {
    b.transform('reactify', {'es6': true});
  }
});

var html = pickFiles('app', {
  srcDir: './',
  destDir: './',
  files: ['index.html']
});

var less = compileLess('app/assets/styles/', {
  filename: 'main.less',
  compress: true
});

var staticAssets = pickFiles('app', {
  srcDir: 'assets/public',
  destDir: 'public'
});

module.exports = mergeTrees([js, html, less, staticAssets]);
