mroot
================================================================================
Simple Merkle tree root calculator

Node

`require('mroot')`

`import mroot from 'mroot'`

Browser

`<script src="mroot.js"></script>`

`import mroot from './mroot.mjs'`

Usage

`mroot(leaves, hasher, bitcoin = false)`

`leaves` your array or set of **pre-hashed** messages

`hasher` your pair-hashing function, e.g. `(a, b) => sha256(a + b)`

`bitcoin` whether to pad each layer to an even number of nodes by duplicating
the last leaf, if necessary, for compatibility with Satoshi's Merkle tree
implementation in Bitcoin

SECURITY NOTES

1. Each leaf must be externally validated, to protect against the second
preimage attack.

  For example, given leaves `A = "alice"` and `B = "bob"`, the
root of `[A, B]` is the same as the root of just `[C]`, where  `C =
hash("alice") + hash("bob")`.

  YOU SHOULD BE OK if you reject `C` (e.g. because it's actually a binary hash
blob and you were expecting a name) and you don't permanently flag the root
itself as invalid (preventing you from accepting the legitimate `[A, B]`).

  https://crypto.stackexchange.com/questions/43430

2. Do not use the root as an HMAC if your hasher is vulnerable to
length-extension.

  For example, for your shared secret key `K` and message `M`, the naive signature
`sha256(K + M)` can be used by anyone to make `sha256(K + M + X)` to make it seem like you signed `X` as well.

  YOU SHOULD BE OK if you don't use shared-secret cryptography or you stick to
strictly-formatted messages.

  https://security.stackexchange.com/questions/20129

3. Do not use the Bitcoin compatibility option unless you handle the fact that
you will get the same root with a potentially invalid, duplicated last-pair of
leaves.

  For example, the leaves `[A, B, C]` will have the same root as the leaves
`[A, B, C, C]`. If you earmark the root itself as invalid because you don't like
`C` being duplicated, then you might accidentally reject `[A, B, C]` as well.

  https://bitcointalk.org/?topic=102395

By Dylan Sharhon, 2020
