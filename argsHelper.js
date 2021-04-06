const argsHelper = {
  processArgs(args) {
    if (args.length > 0) {
      return this.parseArg(args[0])
    } else {
      this.showUsage()
      process.exit(9)
    }
  },

  parseArg(arg) {
    if (arg.includes('filter')) {
      return {
        action: 'filter',
        value: arg.split('=')[1],
      }
    } else if (arg.includes('count')) {
      return {
        action: 'count',
      }
    } else {
      this.showUsage()
      process.exit(9)
    }
  },

  showUsage() {
    console.log('(Assuming you have done a chmod +x on app.js)')
    console.log('Usage: ')
    console.log('\t- ./app.js --filter=<xy>')
    console.log('\t- ./app.js --count')
  },
}

module.exports = {
  ...argsHelper,
}
