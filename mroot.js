'use strict'
if (typeof window === 'undefined') module.exports = mroot

/*
  Merkle Root calculator

  leaves: ordered array or set of pre-hashed messages
  hasher: concatenates and hashes pair; (A, B) => hash(A + B)
  compat: bitcoin compatibility option (self-pairs remainder leaf)
*/
function mroot (leaves, hasher, compat = false) {

  if (!leaves.length && !leaves.size) throw Error('No leaves')
  if (typeof hasher !== 'function') throw Error('No hasher')

  // Make a working array from the leaves
  const nodes = Array.from(leaves)

  // Continue, combining pairs, until there's one node left
  while (nodes.length > 1) {

    // Bitcoin-compatibility option (duplicates odd man out)
    const oddity = nodes[nodes.length - 1]
    if (compat && nodes.length % 2) nodes.push(oddity)

    const pairs = nodes.length / 2
    for (let i = 0; i < pairs; i++) {
      const nodeA = nodes[2 * i    ]
      const nodeB = nodes[2 * i + 1]
      const node = hasher(nodeA, nodeB)
      nodes[i] = node // shrinks the array by half each round
    }

    // Trim the array and, if present, promote the odd man out
    nodes.length = Math.trunc(pairs)
    if (pairs % 1) nodes.push(oddity)
  }

  return nodes[0] // root, last remaining node
}
