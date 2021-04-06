const core = {
  countData(data) {
    return data.map((c) => {
      c.name = `${c.name} [${c.people.length}]`
      c.people = c.people.map((p) => {
        p.name = `${p.name} [${p.animals.length}]`
        return p
      })
      return c
    })
  },

  filterData(data, val) {
    if (!val) {
      console.log('Filter must be a string')
      process.exit(9)
    }
    return data.filter((c) => {
      c.people = c.people.filter((p) => {
        p.animals = p.animals.filter((a) => a.name.includes(val))
        if (p.animals.length > 0) {
          return p
        }
      })
      if (c.people.length > 0) {
        return c
      }
    })
  },
}

module.exports = {
  ...core,
}
