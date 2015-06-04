'use strict';

var mainBowerFiles = require('main-bower-files');
var vendorFiles = mainBowerFiles();

var paths = {
  dest: {
    dist: '_public/',
    dist_files: '_public/**/*',
    app: 'app.js',
    style: 'app.css',
    images: '_public/images/'
  },
  styles: [
      'app/css/**/*.scss',
      'app/css/**/*.css'
  ],
  main_jsx: './app/jsx/index.jsx',
  jsx: [
    'app/**/*.jsx',
  ],
  js: [
    'app/**/*.js',
  ],
  html: [
    'app/index.html'
  ],
  images: [
    'app/images/**/*'
  ],
  icons: [
    'app/css/**/*.+(eot|svg|ttf|woff)'
  ],
  electron: [
    'index.js',
    'package.json'
  ],
  vendor_scripts: vendorFiles
};

module.exports = paths;
