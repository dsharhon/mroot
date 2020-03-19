mroot
==================================================================
Simple Merkle tree root calculator

Node

`require('mroot')`

`import mroot from 'mroot'`

Browser

`<script src="mroot.js"></script>`

`import mroot from './mroot.mjs'`

Usage


`mroot(leaves, hasher, bitcoin = false)`

`leaves` your ordered Array or Set of pre-hashed messages

`hasher` your pair hashing function, e.g. `(a, b) => sha256(a +
b)`

`bitcoin` whether to self-pair the odd remainder node, if any, for
Bitcoin compatibility

SECURITY NOTES

1. Each leaf must be externally validated, to protect against
  the second preimage attack. For example, given leaves `A =
  "alice"` and `B = "bob"`, the root of `[A, B]` is the same as
  the root of just `[C]`, where `C = hash("alice") + hash("bob")`.

  YOU SHOULD BE OK if you reject `C` (e.g. because it's actually a
  hash blob and you were expecting a name) and you don't
  permanently flag the root itself as invalid (preventing you from
  accepting the legitimate `[A, B]`).

  https://crypto.stackexchange.com/questions/43430

2. Do not use the root as an HMAC unless you use a hasher or that
   is invulnerable to length-extension attacks.

  For example, given shared secret `K` and a message `M`, the
  result of `hash(K + M)` can be used by anyone to make `hash(K +
  M + X)` without needing to know `K` or `M`.

  YOU SHOULD BE OK if you don't use shared-secret cryptography
  here, or use fixed-length secret keys and messages.

  https://security.stackexchange.com/questions/20129

3. Do not use the Bitcoin compatibility option unless you consider
   the case that you will get the same root with a duplicated
   last-pair of leaves.

  https://bitcointalk.org/?topic=102395

By Dylan Sharhon, 2020
