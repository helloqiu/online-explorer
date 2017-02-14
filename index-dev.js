#!/usr/bin/env node
"use strict"

const program = require('commander')
const path = require('path')
const fs = require('fs')
const dirtree = require('directory-tree')
const express = require('express')
const contentDisposition = require('content-disposition')
const history = require('connect-history-api-fallback')

const pkg = require(path.join(__dirname, 'package.json'))

program
  .version(pkg.version)
  .option('--host <host>', 'host on which to listen to (default 127.0.0.1)')
  .option('-p --port <port>', 'port on which to listen to (default 3000)')
  .parse(process.argv)

const host = program.host || '127.0.0.1'
const port = program.port || '3000'

let tree = dirtree('.')

const options = {
  'recursive': true
}

fs.watch('.', options, () => {
  tree = dirtree('.')
})

const app = express()
app.use(history())
app.use('/', express.static(path.join(__dirname, 'dist')))
app.use('/api/files', express.static(process.cwd(), {
    index: false,
    setHeaders: function(res, path) {
      res.setHeader('Content-Disposition', contentDisposition(path))
    }
}))
app.get('/api/scan', function(req, res) {
    res.send(tree.children)
})

app.listen(port, host)

console.log(`online explorer listen on ${host}:${port}`)
