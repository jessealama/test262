// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaintime.prototype.since
description: RangeError thrown when smallestUnit option not one of the allowed string values
features: [Temporal]
---*/

const earlier = new Temporal.PlainTime(12, 34, 56, 0, 0, 0);
const later = new Temporal.PlainTime(13, 35, 57, 987, 654, 321);
const values = ["era", "eraYear", "years", "months", "weeks", "days", "other string"];
for (const smallestUnit of values) {
  assert.throws(RangeError, () => later.since(earlier, { smallestUnit }));
}
