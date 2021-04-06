const assert = require('assert').strict
const sinon = require('sinon')

describe('Core:', () => {
  let core, data
  beforeEach(() => {
    delete require.cache[require.resolve('./core.js')]
    delete require.cache[require.resolve('./data.js')]
    core = require('./core.js')
    data = require('./data.js')
  })
  describe('FilterData:', () => {
    it('should return filtered animal names containing "ry"', () => {
      const expected = [
        {
          name: 'Uzuzozne',
          people: [
            {
              name: 'Lillie Abbott',
              animals: [
                {
                  name: 'John Dory',
                },
              ],
            },
          ],
        },
        {
          name: 'Satanwi',
          people: [
            {
              name: 'Anthony Bruno',
              animals: [
                {
                  name: 'Oryx',
                },
              ],
            },
          ],
        },
      ]
      const res = core.filterData(data.data, 'ry')
      assert.deepStrictEqual(res, expected)
    })
    it('should fail if no argument is passed', () => {
      sinon.stub(process, 'exit')
      sinon.stub(console, 'log')
      core.filterData(data.data)
      assert(process.exit.isSinonProxy)
      assert(process.exit.calledWith(9))
      assert(console.log.isSinonProxy)
      assert(console.log.called)
      console.log.restore()
      process.exit.restore()
    })
  })
  describe('CountData:', () => {
    it('should return counted sub arrays near names', () => {
      const res = core.countData(data.data)
      assert.deepStrictEqual(res[0].name, 'Dillauti [5]')
    })
  })
})
