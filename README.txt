mroot
==================================================================
Simple Merkle Tree root calculator

Node:
require('mroot')
OR
import mroot from 'mroot'

Browser / ES6:
<script src="mroot.js"></script>
OR
import mroot from './mroot.mjs'

Usage:
mroot(leaves, hasher, concat = (a, b) => a + b, b = false)

  leaves: ordered array of messages, optionally pre-hashed
  hasher: x => hash(x), in whatever format you want
  concat: hash concatenator (default: (a, b) => a + b)
  b:      bitcoin compatiblity option (last leaf duped iff odd)

MERKLE ROOT SECURITY NOTES

1. Each leaf must be externally validated, to protect against
the second preimage attack.
For example, given messages A = "alice" and B = "bob", the root
of leaves [A, B] is the same as the root of just leaf [C], where
message C = hash("alice") + hash("bob").
YOU SHOULD BE OK if message C isn't valid by ifself (e.g.
because it's actually a hash blob) and you don't permanently
flag the root itself as invalid.
See crypto.stackexchange.com/questions/43430

2. Do not use the root as an HMAC with the hasher being a single
round of a hash function vulnerable to length-extension attacks.
For example, given shared secret K and a message M, the result
of hash(K + M) can be used by anyone to make hash(K + M + X)
without needing to know K or M.
YOU SHOULD BE OK if you don't use shared-secret cryptography
here, or use fixed-length secret keys and messages.
See security.stackexchange.com/questions/20129

3. Do not use the Bitcoin compatibility option, unless you first
check for duplicate leaves before flagging roots as invalid.
See https://bitcointalk.org/?topic=102395

==================================================================
By Dylan Sharhon, 2020
