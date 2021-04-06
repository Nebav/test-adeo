const argsHelper = require('./argsHelper')
const assert = require('assert').strict
const sinon = require('sinon')

describe('Args:', () => {
  describe('ProcessArgs:', () => {
    beforeEach(() => {
      sinon.stub(process, 'exit')
      sinon.stub(argsHelper, 'showUsage')
      sinon.stub(argsHelper, 'parseArg').returns({ action: 'filter', value: 'ry' })
    })

    afterEach(() => {
      process.exit.restore()
      argsHelper.showUsage.restore()
      argsHelper.parseArg.restore()
    })
    it('should pass if you have an argument', () => {
      argsHelper.processArgs(['--filter=ry'])
      assert(process.exit.isSinonProxy)
      assert(argsHelper.parseArg.calledWith('--filter=ry'))
      assert(process.exit.notCalled)
      assert(argsHelper.showUsage.notCalled)
    })
    it('should fail with no argument', () => {
      argsHelper.processArgs([])
      assert(process.exit.isSinonProxy)
      assert(process.exit.calledWith(9))
      assert(argsHelper.showUsage.called)
    })
  })

  describe('ParseArgs:', () => {
    beforeEach(() => {
      sinon.stub(process, 'exit')
      sinon.stub(argsHelper, 'showUsage')
    })
    afterEach(() => {
      process.exit.restore()
      argsHelper.showUsage.restore()
    })
    it('should fail if a correct argument is not found', () => {
      argsHelper.parseArg('test')
      assert(process.exit.isSinonProxy)
      assert(process.exit.calledWith(9))
      assert(argsHelper.showUsage.called)
    })
    it('should pass if --count is passed', () => {
      argsHelper.parseArg('--count')
      assert(process.exit.isSinonProxy)
      assert(process.exit.notCalled)
      assert(argsHelper.showUsage.notCalled)
    })
    it('should pass if --filter is passed', () => {
      argsHelper.parseArg('--filter=test')
      assert(process.exit.isSinonProxy)
      assert(process.exit.notCalled)
      assert(argsHelper.showUsage.notCalled)
    })
  })

  describe('ShowUsage:', () => {
    sinon.stub(console, 'log')
    it('should call console.log', () => {
      argsHelper.showUsage()
      assert(console.log.isSinonProxy)
      assert(console.log.called)
      console.log.restore()
    })
  })
})
