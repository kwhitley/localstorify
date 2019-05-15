const MAX_LOCALSTORAGESPACE = 5 * 1024 * 1024
const TOLERANCE = 0.95
const LIMIT_LOCALSTORAGE = MAX_LOCALSTORAGESPACE * TOLERANCE

export class LocalStorifyEntry {
  constructor({ key, value }) {
    this.key = key
    this.size = (typeof value === 'string' ? value : JSON.stringify(value)).length + key.toString().length
    this.created = new Date()
    this.accessed = new Date()
  }
}

// individual Store implementation for tracking values/setters
export class LocalStorify {
  index = {}
  items = []
  collected = 0

  constructor(options = {}) {
    this.options = options

    Object.keys(localStorage).forEach(key => {
      let value = localStorage.getItem(key)
      this.addItem(new LocalStorifyEntry({ key, value }))

      // console.log('value of', key, 'is', value)
    })
  }

  get latest() {
    return items[0]
  }

  get oldest() {
    return items[items.length-1]
  }

  get length() {
    return this.items.length
  }

  get size() {
    return this.items.reduce((total, entry) =>  total + entry.size, 0)
  }

  addItem(entry) {
    // add to array
    this.items.unshift(entry)

    // add to index
    this.index[entry.key] = entry

    this.options.debug && console.log('adding entry', entry)
  }

  shrinkTo(targetSize) {
    let items = this.items.sort((a, b) => a.accessed < b.accessed ? -1 : (a.accessed > b.accessed ? 1 : 0))
    let attemptsRemaining = 1000

    this.options.debug && console.log('removing from sorted array', items.map(i => i.key))

    this.options.debug && console.log('shrinking to', targetSize, 'from', this.size)
    while (this.size > targetSize && attemptsRemaining) {
      let orphan = this.items.pop()
      removeItem(orphan.key)
      this.options.debug && console.log('removing entry', orphan)

      this.collected++
      this.attemptsRemaining--
    }
  }

  setItem(key, value) {
    let entry = new LocalStorifyEntry({ key, value })
    let targetSpace = LIMIT_LOCALSTORAGE - entry.size
    let hasEnoughSpace = this.size < targetSpace

    this.options.debug && console.log({
      LIMIT_LOCALSTORAGE,
      targetSpace,
      entrySize: entry.size,
      currentSize: this.size,
    })

    if (targetSpace < 0) {
      this.options.debug && console.log('not enough space to add item', entry)

      return false
    }

    // make space if not enough available
    !hasEnoughSpace && this.shrinkTo(targetSpace)

    // then add item
    this.addItem(entry)

    return localStorage.setItem(key, value)
  }

  getItem(key) {
    return localStorage.getItem(key)
  }

  removeItem(key) {
    delete this.index[key]
    return localStorage.removeItem(key)
  }

  clear() {
    localStorage.clear()
    this.index = {}
  }
}

export default new LocalStorify()
