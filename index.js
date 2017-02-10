#!/usr/bin/env node

"use strict";

var program = require('commander');
var path = require('path');
var fs = require('fs');
var dirtree = require('directory-tree');
var express = require('express');
var contentDisposition = require('content-disposition');

var pkg = require(path.join(__dirname, 'package.json'));

program.version(pkg.version).option('--host <host>', 'host on which to listen to (default 127.0.0.1)').option('-p --port <port>', 'port on which to listen to (default 3000)').parse(process.argv);

var host = program.host || '127.0.0.1';
var port = program.port || '3000';

var tree = dirtree('.');

var options = {
  'recursive': true
};

fs.watch('.', options, function () {
  tree = dirtree('.');
});

var app = express();
app.use('/', express.static(path.join(__dirname, 'dist')));
app.use('/api/files', express.static(process.cwd(), {
  index: false,
  setHeaders: function setHeaders(res, path) {
    res.setHeader('Content-Disposition', contentDisposition(path));
  }
}));
app.get('/api/scan', function (req, res) {
  res.send(tree.children);
});

app.listen(port, host);

console.log('online explorer listen on ' + host + ':' + port);
