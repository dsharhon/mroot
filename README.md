mroot
=====
Simple Merkle root calculator

Node or bundler

`require('mroot')`

`import mroot from 'mroot'`

Browser

`<script src="mroot.js"></script>`

`import mroot from './mroot.mjs'`

Usage

`mroot(leaves, hasher, compat = false)`

`leaves` your ordered Array or Set of **already-hashed** messages

`hasher` your pair-hashing function, e.g. `(a, b) => sha256(a + b)`

`compat` whether to pad each layer to an even number of nodes by duplicating the
last leaf, if necessary, for compatibility with Satoshi's Merkle tree
implementation in Bitcoin

Notes

1. Your leaves can be in whatever format you want (hex, buffer, array). They
never get touched except by your hasher.

2. If you have zero leaves, we throw an error. In Bitcoin, this returns the
256-bit representation of 1 (see [merkle.cpp](
https://github.com/bitcoin/bitcoin/blob/master/src/consensus/merkle.cpp)). You
need to handle this case.

3. If you only have one leaf, your hasher won't be called, so the root will be
your leaf itself, even with the Bitcoin compatibility option. You need to make
sure your leaf's type is acceptable as a root.

4. This "constant-space" algorithm mutates a shrinking internal array that
doesn't keep the whole tree in memory. (Other JS implementations optimize this
further by requiring you to concatenate all of your leaves into a mutable buffer
to avoid garbage collection of intermediate nodes?)

Examples

    // Node
    const crypto = require('crypto')
    const sha256 = buf => crypto.createHash('sha256').update(buf).digest()
    const hasher = (a, b) => sha256(Buffer.concat([a, b]))
    const leaves = ['bwib', 'bwab', bwob'].map(Buffer.from).map(sha256)
    const root = mroot(leaves, hasher)
    console.log(root.toString('hex'))

**Warnings on Merkle tree security**


1.  Each leaf must be externally validated, to protect against the second
    preimage attack.

    For example, given leaves `A = "alice"` and `B = "bob"`, the
    root of `[A, B]` is the same as the root of just `[C]`, where  `C =
    hash("alice") + hash("bob")`.

    YOU SHOULD BE OK if you reject `C` (e.g. because it's actually a binary hash
    blob and you were expecting a name) and you don't permanently flag the root
    itself as invalid (preventing you from accepting the legitimate `[A, B]`).

    https://crypto.stackexchange.com/questions/43430

2.  Do not use the root as an HMAC if your hasher is vulnerable to
    length-extension.

    For example, for your shared secret key `K` and message `M`, the naive
    signature `sha256(K + M)` can be used by anyone to make `sha256(K + M + X)`
    to make it seem like you signed `X` as well.

    YOU SHOULD BE OK if you don't use shared-secret cryptography or you stick to
    strictly-formatted messages.

    https://security.stackexchange.com/questions/20129

3.  Do not use the Bitcoin compatibility option unless you handle the fact that
    you will get the same root with a potentially invalid, duplicated last-pair
    of leaves.

    For example, the leaves `[A, B, C]` will have the same root as the leaves
    `[A, B, C, C]`. If you earmark the root itself as invalid because you don't
    like `C` being duplicated, then you might be tricked into rejecting
    `[A, B, C]` as well.

    https://bitcointalk.org/?topic=102395
    https://github.com/bitcoin/bitcoin/blob/master/src/consensus/merkle.cpp

By Dylan Sharhon, 2020
