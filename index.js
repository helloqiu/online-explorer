#!/usr/bin/env node
"use strict"

const program = require('commander')
const path = require('path')
const fs = require('fs')
const dirtree = require('directory-tree')
const express = require('express')

const pkg = require(path.join(__dirname, 'package.json'))

program
  .version(pkg.version)
  .option('--path <path>', 'path to serve (default .)')
  .option('--host <host>', 'host on which to listen to (default 127.0.0.1)')
  .option('-p --port <port>', 'port on which to listen to (default 3000)')
  .parse(process.argv)

const host = program.host || '127.0.0.1'
const port = program.port || '3000'

let tree = dirtree(program.path || '.')

const options = {
  'recursive': true
}

fs.watch(program.path || '.', options, () => {
  tree = dirtree(program.path || '.')
})

const app = express()
