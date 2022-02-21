// Copyright 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-intl.numberformat.prototype.format
description: |
  Checks handling of the useGrouping option to the NumberFormat constructor.
locale: [de-DE]
---*/

var nf;

nf = new Intl.NumberFormat('de-DE', {});

assert.sameValue(nf.format(100), '100', '(omitted)');
assert.sameValue(nf.format(1000), '1.000', '(omitted)');
assert.sameValue(nf.format(10000), '10.000', '(omitted)');
assert.sameValue(nf.format(100000), '100.000', '(omitted)');

nf = new Intl.NumberFormat('de-DE', {useGrouping: true});

assert.sameValue(nf.format(100), '100', 'true');
assert.sameValue(nf.format(1000), '1.000', 'true');
assert.sameValue(nf.format(100000), '100.000', 'true');

nf = new Intl.NumberFormat('de-DE', {useGrouping: false});

assert.sameValue(nf.format(100), '100', 'false');
assert.sameValue(nf.format(1000), '1000', 'false');
assert.sameValue(nf.format(10000), '10000', 'false');
assert.sameValue(nf.format(100000), '100000', 'false');
