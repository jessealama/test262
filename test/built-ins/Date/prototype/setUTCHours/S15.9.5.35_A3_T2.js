// Copyright 2009 the Sputnik authors.  All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
info: |
    The Date.prototype.setUTCHours property "length" has { ReadOnly, !
    DontDelete, DontEnum } attributes
esid: sec-date.prototype.setutchours
description: Checking DontDelete attribute
---*/
assert.sameValue(
  delete Date.prototype.setUTCHours.length,
  true,
  'The value of `delete Date.prototype.setUTCHours.length` is expected to be true'
);

assert(
  !Date.prototype.setUTCHours.hasOwnProperty('length'),
  'The value of !Date.prototype.setUTCHours.hasOwnProperty(\'length\') is expected to be true'
);

// TODO: Convert to verifyProperty() format.
