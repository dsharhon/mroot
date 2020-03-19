'use strict'
if (typeof window === 'undefined') module.exports = mroot

/*
  Merkle Root calculator
  USAGE:
  leaves: ordered array or set of messages
  hasher: x => hash(x)
  concat: leaf hash concatenator (default: a + b)
  b:      bitcoin compatiblity option (default: false)
*/
function mroot (leaves, hasher, concat = (a, b) => a + b, b = 0) {

  if (!leaves.length && !leaves.size) throw Error('No leaves')
  if (typeof hasher !== 'function') throw Error('No hasher')
  if (typeof concat !== 'function') throw Error('No concat')

  // Hash the bottom leaves to get the first set of nodes
  const nodes = Array.from(leaves).map(hasher)

  // Continue, combining pairs, until there's one node left
  while (nodes.length > 1) {

    // Bitcoin-compatibility option (duplicates odd man out)
    if (b && nodes.length % 2) nodes.push(nodes[nodes.length - 1])

    const pairs = nodes.length / 2
    for (let i = 0; i < pairs; i++) {
      const nodeA = nodes[2 * i    ]
      const nodeB = nodes[2 * i + 1]
      const node = hasher(concat(nodeA, nodeB))
      nodes[i] = node // just overwrites the original array
    }

    // Trim the array and, if present, promote the odd man out
    const oddity = (pairs % 1) ? nodes[nodes.length - 1] : null
    nodes.length = Math.trunc(pairs)
    if (oddity) nodes.push(oddity)
  }

  return nodes[0] // root, last remaining node
}
