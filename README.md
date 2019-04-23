localStorage that avoids storage limit failures
===

# Why?
Because localStorage is great, but extremely limited in functionality and robustness.  This library adds:
- [x] automatic garbage collection and limit detection (no failures on persistence)

# Installation
```
yarn add -D @kwhitley/localstorify
```

# Usage
Simply replace references to `localStorage` with the the export of this library.

```js
  import localstorify from '@kwhitley/localstorify'

  // replace
  localStorage.getItem('foo')
  // with
  localstorify.getItem('foo')

  ...

  // or
  localStorage.setItem('foo', JSON.stringify({ foo: 'bar' }))
  // with
  localstorify.setItem('foo', JSON.stringify({ foo: 'bar' }))
```
