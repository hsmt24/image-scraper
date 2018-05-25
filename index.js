'use strict'

const async = require('async')
const _ = require('lodash')
const cheerio = require('cheerio-httpcli')
const fs = require('fs')
const mkdirp = require('mkdirp')
const path = require('path')

exports.handler = (event, context, callback) => async.waterfall([(next) => scraping(() => next())], (err) => callback(err))

function scraping(callback) {
  cheerio.fetch(process.env.TARGET_URL, (err, $, res, body) => {
    if (err) return callback(err)
    async.map($('img'), (data, cb) => $(data).download(), (err, results) => callback(err))
  })
}

cheerio.download
  .on('ready', (stream) => {
    mkdirp(`./tmp${path.dirname(stream.url.path)}`, (err) => {
      if (err) return cb(err)
      stream.pipe(fs.createWriteStream(`./tmp${stream.url.path}`))
      console.log(`DL: ${stream.url.href}`)
    })
  })
  .on('error', (err) => console.error(`${err.url}, ${err.message}`))
  .on('end', () => console.log(`SUCCESS!!`))
