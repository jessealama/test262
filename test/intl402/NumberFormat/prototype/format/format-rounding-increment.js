// Copyright 2021 the V8 project authors. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.
/*---
esid: sec-intl.numberformat.prototype.format
description: >
  When roungingPriority is "auto", the constraint on significant digits is
  preferred over the constraint on fraction digits
features: [Intl.NumberFormat-v3]
includes: [testIntl.js]
---*/

var locales = [
  new Intl.NumberFormat().resolvedOptions().locale, 'ar', 'de', 'th', 'ja'
];
var numberingSystems = ['arab', 'latn', 'thai', 'hanidec'];

testNumberFormat(
  locales,
  numberingSystems,
  {roundingIncrement: 5, maximumFractionDigits: 2},
  {
    '1.05': '1.05',
    '1.06': '1.05',
    '1.07': '1.05',
    '1.08': '1.1',
    '1.09': '1.1',
    '1.10': '1.1',
  }
);

// TODO: add many more test cases, organized in some methodical way
