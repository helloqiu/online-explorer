#!/usr/bin/env node
'use strict'

const program = require('commander')
const path = require('path')
const Explorer = require('./explorer.js')

const pkg = require(path.join(__dirname, 'package.json'))

program
  .version(pkg.version)
  .option('--host <host>', 'host on which to listen to (default 127.0.0.1)')
  .option('-p --port <port>', 'port on which to listen to (default 3000)')
  .parse(process.argv)

const ProgramHost = program.host || '127.0.0.1'
const ProgramPort = program.port || '3000'

const app = new Explorer(ProgramHost, ProgramPort, '.')
app.run()
