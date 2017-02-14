const fs = require('fs')
const dirtree = require('directory-tree')
const express = require('express')
const contentDisposition = require('content-disposition')
const history = require('connect-history-api-fallback')
const path = require('path')

class Explorer {
  constructor (host, port, path) {
    this.host = host
    this.port = port
    this.path = path
  }
  run () {
    let tree = dirtree('.')
    const options = {
      'recursive': true
    }
    fs.watch(this.path, options, () => {
      tree = dirtree(this.path)
    })

    const app = express()
    app.use(history())
    app.use('/', express.static(path.join(__dirname, '../dist')))
    app.use('/api/files', express.static(process.cwd(), {
      index: false,
      setHeaders: function (res, path) {
        res.setHeader('Content-Disposition', contentDisposition(path))
      }
    }))
    app.get('/api/scan', function (req, res) {
      res.send(tree.children)
    })
    app.listen(this.port, this.host)
    console.log(`online explorer listen on ${this.host}:${this.port}`)
  }
}

module.exports = Explorer
