// Copyright 2021 Mathias Bynens. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
author: Mathias Bynens
description: >
  Negating Unicode property escapes for `RGI_Emoji_Flag_Sequence` (property of strings) with `[^\p{…}]` throws an early error.
info: |
  Generated by https://github.com/mathiasbynens/unicode-property-escapes-tests
  Unicode v14.0.0
esid: sec-isvalidregularexpressionliteral
features: [regexp-unicode-property-escapes, regexp-v-flag]
negative:
  phase: parse
  type: SyntaxError
---*/

$DONOTEVALUATE();

/[^\p{RGI_Emoji_Flag_Sequence}]/v;
