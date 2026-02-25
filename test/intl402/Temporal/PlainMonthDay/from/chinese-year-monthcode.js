// Copyright (C) 2025 Igalia, S.L. All rights reserved.
// This code is governed by the BSD license found in the LICENSE file.

/*---
esid: sec-temporal.plainmonthday.from
description: >
  PlainMonthDay.from with year, monthCode, and day for Chinese calendar always
  uses the reference year table, not the given year, to validate monthCode
info: |
  NonISOMonthDayToISOReferenceDate uses the reference year table for Chinese and
  Dangi calendars, even when a year field is provided. The year field is only
  used for disambiguation when converting an ordinal month to a monthCode, not
  for validating whether a monthCode is allowed.
features: [Temporal, Intl.Era-monthcode]
includes: [temporalHelpers.js]
---*/

const calendar = "chinese";

// Year 2020 (Chinese) has leap month M04L but does NOT have M05L, M02L, or M07L.
// With the corrected spec, the year should not be used to constrain monthCode;
// the reference year table should be used instead.

// A. Leap monthCode valid in the reference table but NOT in the given year.
// These should all succeed because the reference table has these monthCodes.
const leapMonthsNotIn2020 = [
  { monthCode: "M05L", referenceYear: 1971 },
  { monthCode: "M02L", referenceYear: 1947 },
  { monthCode: "M07L", referenceYear: 1968 },
];

for (const { monthCode, referenceYear } of leapMonthsNotIn2020) {
  const pmd = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode, day: 1 });
  TemporalHelpers.assertPlainMonthDay(
    pmd, monthCode, 1,
    `year 2020 with ${monthCode}: monthCode preserved (reference table used, not year)`,
    referenceYear
  );

  // With overflow: "reject", this should NOT throw — monthCode is valid in the table
  const pmdReject = Temporal.PlainMonthDay.from(
    { calendar, year: 2020, monthCode, day: 1 },
    { overflow: "reject" }
  );
  TemporalHelpers.assertPlainMonthDay(
    pmdReject, monthCode, 1,
    `year 2020 with ${monthCode} and reject overflow: should not throw`,
    referenceYear
  );
}

// B. Leap monthCode valid in BOTH the reference table AND the given year (sanity check)
const pmdM04L = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode: "M04L", day: 1 });
TemporalHelpers.assertPlainMonthDay(
  pmdM04L, "M04L", 1,
  "year 2020 with M04L (present in both year and table)",
  1963
);

// C. Leap monthCodes that have never occurred (M01L, M12L) — not in reference table.
// These should constrain to the regular month with default overflow.
const neverOccurred = [
  { monthCode: "M01L", regular: "M01" },
  { monthCode: "M12L", regular: "M12" },
];

for (const { monthCode, regular } of neverOccurred) {
  const constrained = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode, day: 1 });
  assert.sameValue(
    constrained.monthCode, regular,
    `${monthCode} not in reference table: should constrain to ${regular}`
  );

  // With overflow: "reject", should throw RangeError
  assert.throws(RangeError, () => {
    Temporal.PlainMonthDay.from(
      { calendar, year: 2020, monthCode, day: 1 },
      { overflow: "reject" }
    );
  }, `${monthCode} not in reference table with reject overflow: should throw`);
}

// D. Day 30 with year + leap monthCode — day limit from reference table, not year.
// M05L has a 30-day reference year (1952).
const pmd30 = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode: "M05L", day: 30 });
TemporalHelpers.assertPlainMonthDay(
  pmd30, "M05L", 30,
  "year 2020 with M05L day 30: day limit from reference table",
  1952
);

// E. Day 31 overflow with leap monthCode.
// Default overflow: constrain to day 30.
const constrain31 = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode: "M05L", day: 31 });
TemporalHelpers.assertPlainMonthDay(
  constrain31, "M05L", 30,
  "year 2020 with M05L day 31: should constrain to day 30",
  1952
);

// With overflow: "reject", should throw RangeError.
assert.throws(RangeError, () => {
  Temporal.PlainMonthDay.from(
    { calendar, year: 2020, monthCode: "M05L", day: 31 },
    { overflow: "reject" }
  );
}, "M05L day 31 with reject overflow: should throw RangeError");

// F. Regular monthCode with year (baseline — year should not affect result).
const pmdRegular = Temporal.PlainMonthDay.from({ calendar, year: 2020, monthCode: "M06", day: 1 });
TemporalHelpers.assertPlainMonthDay(
  pmdRegular, "M06", 1,
  "year 2020 with regular monthCode M06",
  1972
);
