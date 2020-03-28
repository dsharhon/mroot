'use strict'
const crypto = require('crypto')

const randomByte = () => Math.trunc(Math.random() * 256)
const leaves = []
for (let i = 0; i < 1000000; i++) {
  const randomLeaf = Buffer.alloc(32)
  for (let i = 0; i < 32; i++) randomLeaf[i] = randomByte()
  leaves.push(randomLeaf)
}

// From bitcoinjs merkle-lib
function fastRoot (values, digestFn) {
  if (!Array.isArray(values)) throw TypeError('Expected values Array')
  if (typeof digestFn !== 'function') throw TypeError('Expected digest Function')

  var length = values.length
  var results = values.concat()

  while (length > 1) {
    var j = 0

    for (var i = 0; i < length; i += 2, ++j) {
      var left = results[i]
      var right = i + 1 === length ? left : results[i + 1]
      var data = Buffer.concat([left, right])

      results[j] = digestFn(data)
    }

    length = j
  }

  return results[0]
}

one: {
  const digestFn = buf => crypto.createHash('sha256').update(buf).digest()
  console.time('fastRoot')
  const root = fastRoot(leaves, digestFn)
  console.timeLog('fastRoot', root.toString('hex'))
}

const mroot = require('./mroot.js')
two: {
  const hasher = (a, b) => crypto.createHash('sha256').update(Buffer.concat([a, b])).digest()
  console.time('mroot   ')
  const root = mroot(leaves, hasher, true)
  console.timeLog('mroot   ', root.toString('hex'))
}
