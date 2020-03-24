// Bitcoin Merkle tree test
// Source: https://gist.github.com/thereal1024/45bb035e580430988a34
if (typeof window !== 'undefined') throw Error(alert('Tests require Node env'))
var assert = require('assert')
var crypto = require('crypto')
var mroot = require('./mroot.js')

const sha256 = buf => crypto.createHash('sha256').update(buf).digest()
const hasher = (a, b) => sha256(sha256(Buffer.concat([a, b])))

// Block 120210 - even number of transactions
function test1 () {

  const ok = '0b0192e318af62f8f91243948ea4c7ea9d696197e88b9401bce35ecb0a0cb59b'

  const txids = [
    '04a2808134e646ba67ff83f0bc7535a008b6e154c98953f5e2c9d40429880faf',
    'b6b3ff7b4d004a788c751f3f8fc881f96c7b647ae06eb9a720bddc924e6f9147',
    'e614ebb7e059e248e1f4c440f91af5c9617394a05d72233d7acf6feb153362f1',
    '5bbc4545145126108c91689e62c1806646468c547999241f5c2883a526e015b6',
    'de56c21783d3d466c0a5a155ed909c7011879df1996d8c418dac74465ebc3564',
    'd327f96d32afdbf4238458684570189de26ba5dc300d5cd19fa1a9cdcecdb527',
    '702c3d845810f31c194e7c9ea3d2b3636f3b8b9ee71f3d93a2f36e9d1a4e9a81',
    'b320e44b0e4cbe5973b4ebdea0c63939f9cc196982e3f4d15daaa1baa16f0004'
  ].map(txid => Buffer.from(txid, 'hex').reverse())

  const root = mroot(txids, hasher, true).reverse().toString('hex')

  assert.equal(root, ok, 'TEST FAILED')
}

// Block 120192 - odd number of transactions
function test2 () {

  const ok = '560a4d3b44e57ff78be70d29698a8f98ce11677c1a59fb9966a7cd1795c9b47b'

  const txids = [
    'df70f26b6df54332ad29c08aab5e5d5560d1468311e90484ebd89f87ac6264e8',
    '2148314cd02237786abe127f23b7346df8a116a2851745cb987652a3e132fc50',
    '06c303894833eb5d639f06f95ceb2c4bd08e0ab4ae1d94cccfa54f02e9b35990',
    '90ae3d27a5215dbb8e2e1657c927f81bdb9601106a6159f5384b4cde53836f24',
    '51cfe20029ed6366e7f475a123ad84c96c54522e9ae64cb2f548811124a6f833',
    '1e856be000b0fbaa5929b887755095106f4f0d3d19f9cd9cb07ab2239c8b4b18',
    '9d6314d68d9de8250513563e02f83ffc80973ec8b7c2966835e2cbcac3320898',
    '5d6e3fc4b0c44b867b83b7d7ca365754a8bb87d93c4f365ecacc1f0109b4c99c',
    '58afcfed0a60792c3e15d8bb2bd8d59f2a968639473e575e2fc1c270fcfae910',
    '50a0e15c32c257934f75ee2fa125dd7e9a542d38b5989efc380ea2c06a299804',
    'acd706cdbe74f82040cc583e42dfc28d8603c2f7d2fe29c0d41ee2e8d78be51b',
    'c7be55d3b55bd59f1ca19d2dc3ffbe8c28917c9e27f02456872755215b4b8a1f',
    'e323fe6719e707b8deb108d3f4bcc43d9e018cf48e027b8f88941886a0744f60'
  ].map(txid => Buffer.from(txid, 'hex').reverse())

  const root = mroot(txids, hasher, true).reverse().toString('hex')

  assert.equal(root, ok, 'TEST FAILED')
}

test1()
test2()
console.log('TESTS PASSED')
