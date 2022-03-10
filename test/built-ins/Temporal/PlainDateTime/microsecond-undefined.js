// Copyright (C) 2021 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plaindatetime
description: Microsecond argument defaults to 0 if not given
features: [Temporal]
includes: [temporalHelpers.js]
---*/

const args = [2000, 5, 2, 12, 34, 56, 123];

const explicit = new Temporal.PlainDateTime(...args, undefined);

TemporalHelpers.assertPlainDateTime(
  explicit,
  2000, 5, "M05", 2, 12, 34, 56, 123, 0, 0,
  "microsecond default argument (argument present)"
);

const implicit = new Temporal.PlainDateTime(...args);

TemporalHelpers.assertPlainDateTimesEqual(explicit, implicit, "microsecond default argument (argument missing)");
