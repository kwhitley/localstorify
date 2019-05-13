// test files
import localStorify, { LocalStorify } from '../src/index.js'

describe('localstorify', () => {
  describe('library exports', () => {
    test('default export is a function', () => {
      expect(typeof localStorify).toBe('object')
    })
  })

  describe('interface', () => {
    test('implements .setItem() method', () => {
      expect(typeof localStorify.setItem).toBe('function')
    })

    test('implements .getItem() method', () => {
      expect(typeof localStorify.getItem).toBe('function')
    })

    test('implements .clear() method', () => {
      expect(typeof localStorify.clear).toBe('function')
    })

    test('implements .length getter', () => {
      expect(localStorify.length).toBe(0)
    })

    test('implements .size getter', () => {
      expect(localStorify.size).toBe(0)
    })
  })

  describe('behavior', () => {
    test('indexes existing localStorage', () => {
      localStorage.setItem('foo', 'bar')

      const ls = new LocalStorify()

      expect(ls.length).toBe(1)
    })

    test('indexes existing localStorage', () => {
      localStorage.setItem('foo', 'bar')

      const ls = new LocalStorify()

      expect(ls.length).toBe(1)
    })

    test('.size getter returns estimated size', () => {
      localStorage.setItem('foo', 'bar')

      const ls = new LocalStorify()

      expect(ls.size).toBe(6)
    })

    // test('.setItem analyzes space', () => {
    //   localStorage.clear()

    //   const ls = new LocalStorify()

    //   for (var i=0; i<10; i++) {
    //     ls.setItem(i, JSON.stringify({ date: new Date() }))
    //   }

    //   ls.setItem(i, JSON.stringify({
    //     date: new Date(),
    //     date1: new Date(),
    //     date2: new Date(),
    //     date3: new Date(),
    //   }))

    //   expect(ls.size).toBe(6)
    // })
  })
})
