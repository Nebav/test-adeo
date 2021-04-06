#!/usr/bin/env node
const argsHelper = require('./argsHelper')
const core = require('./core')
const data = require('./data').data

const argResult = argsHelper.processArgs(process.argv.slice(2))

if (argResult.action === 'filter') {
  console.log(JSON.stringify(core.filterData(data, argResult.value), null, 4))
} else {
  console.log(JSON.stringify(core.countData(data), null, 4))
}
process.exit(0)
