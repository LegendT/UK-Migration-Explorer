# Citing a series point, scoped

Nothing here is built. Scoped 23 July 2026.

Three pieces of work, in increasing size. The third was found while scoping the first two and
is the most valuable of them.

## The problem, in one line of `migration.njk`

```njk
points: nm.data | points        <- the chart is drawn from the series file
summary: '... peaked in 2022 at 891,000, and has fallen ... to ' ~ (netMigration.value | number) ~ '.'
             ^ typed by hand                                       ^ cited, resolved at build time
```

One sentence, two figures, two levels of protection. The author cited the theme metric because
a mechanism existed, and typed the series point because none did. The chart and the sentence
describing it can therefore drift apart in silence, and the series files are refreshed
wholesale on every release under the single-vintage rule, so they genuinely do move.

**Nine values across two files** are in this position: five asylum application points in
`asylum.njk`, and four migration flow points in `migration.njk`.

## 1. An `at` filter, not a new token syntax

**All nine longhand series values are in `.njk` chart configs. None is in Markdown prose.**
That was checked, and it collapses the design.

A chart summary is a Nunjucks string built with `~` concatenation, so a shortcode cannot be
used inside one. What fits is a filter, in exactly the idiom the file already uses one line
above:

```njk
points: nm.data | points          already exists
'... peaked in 2022 at ' ~ (nm.data | at(2022) | number) ~ ' ...'      proposed
```

`at(year)` takes a series `data` array and returns the value at that year, throwing on a year
the series does not contain, exactly as the `metric` filter throws on an unknown ref. One
filter in `eleventy.config.js`, plus nine substitutions in two files.

**Tested, not assumed.** The filter was added, the `891,000` literal in `migration.njk`
replaced with `(nm.data | at(2022) | number)`, the site rebuilt, and the page checked: it
renders `peaked in 2022 at 891,000`, identical to the literal it replaced. Then reverted. The
mechanism works inside a `~` concatenated summary string, which was the one thing that could
have sunk this approach.

**No Markdown syntax.** `{{theme/id}}` stays for theme metrics only. Add series support to
Markdown when a Markdown page actually needs it, and not before.

## 2. Refuse a series value written longhand

The filter is worth little without the check, on the same reasoning as the token contract in
foundation 15: writing a number by hand silently opts out of the protection.

Extend `checkLiterals` in `validate-content.mjs` to scan for series point values as well as
metric values. The data makes this cheap:

- **100 points across four files**, and only **three values appear at more than one point**:
  `249,000` (primary and historical for 2016), `313,000` (historical 2014 and 2019) and
  `494,000` (emigration 2014 and 2015). For those three the message must name both candidates
  rather than guess.
- **Four series values are also current metric values**: `331,000`, `171,000`, `813,000` and
  `642,000`. The existing metric check already catches these, so the series scan must not
  double-report them. See part 3, which is about why they coexist at all.
- **`431,000` is not a series point.** This matters: the sources page legitimately writes
  "first published at 431,000" about a superseded estimate, and a scan that flagged it would
  be reporting a correct sentence. It does not, so no exemption is needed for it.

Make it an **error** rather than a warning. These are comma-grouped values in the tens of
thousands and above, where the collision rate is low, which is the same reasoning that makes
the existing comma-grouped metric check an error while sub-100 values only warn. The
`historical_literals` escape hatch already exists for a value that is deliberately frozen.

## 3. Reconcile a series with its own headline metric

**Found while scoping, and the most valuable of the three.** Four figures are held twice in
the data layer, and nothing reconciles them:

| Value | Held as a metric | Held as a series point |
| --- | --- | --- |
| 171,000 | `migration/net-migration` | `netMigration@2025` |
| 331,000 | `migration/net-migration-2` | `netMigration@2024` |
| 813,000 | `migration/total-long-term-immigration` | `flows@2025` |
| 642,000 | `migration/total-long-term-emigration` | `flows.emigration@2025` |

These are the same measure for the same period. The home page card reads the metric; the
migration chart reads the series. **A quarterly update that revised one and not the other
would publish two different official values for the same measure, on the same site.**

**All four agree today, and that was checked rather than assumed.** The four were originally
found by matching equal values, which by construction can only find pairs that already agree,
so a separate pass compared every metric against every series point sharing its year and unit.
Nothing has drifted. This is a latent risk, not a live defect, and the distinction matters:
there is nothing to fix today, only something to guard.

That is word for word the failure foundation 9.4 describes, which `dashboard.json` was
restructured in June to prevent. It was fixed between the dashboard and the theme files and
left standing between the series and the theme files, because nothing connects the two.

`validate-data.mjs` checks series envelope fields and single-vintage integrity. It does not
compare any series point against any metric, and cannot, because nothing declares that
`netMigration` and `migration/net-migration` are the same measure.

**The fix is a declaration and a check, and the declaration goes on the metric.**

An earlier draft of this scope put `headline_metric` on the series envelope and required the
**latest** point to match. That covers three of the four. `net-migration-2` pairs with
`netMigration@2024`, which is the second-to-last point, because it is the revised prior-year
estimate the site publishes precisely to show that revisions happen. A rule keyed on "the
latest point" would have left the one figure whose whole purpose is being a revision
unguarded.

So the metric declares its own duplicate, which handles every case uniformly:

```json
{ "id": "net-migration-2", "value": 331000, "series_ref": "netMigration@2024", ... }
```

Four metrics gain one field. The check requires the referenced point to exist and its value to
equal the metric's. It is short, and it sits beside the `source_id` check in
`validate-data.mjs`, which is the other field a metric carries to name something outside
itself.

**Plus a warning for undeclared overlaps**, so a new one gets noticed rather than waiting for
someone to run the analysis by hand. Any metric whose value and year match a series point
without a `series_ref` declaring it is reported for review. That is exactly the query that
found these four, so it costs almost nothing and it means the next duplicate announces itself.

## What none of this fixes

**Tokens protect values, not claims about values.** "Claims roughly doubled across the 2010s"
and "peaked in 2022" stay human judgements whatever is cited. A revision that changed a value
would update the number and leave the verb alone, and nothing would notice.

That limit is already published on the sources page under *What the checks do not establish*,
and it is why `docs/PRE-PUBLICATION-REVIEW.md` carries two checkboxes per chart rather than
one. Part 1 would let the first checkbox, the literals, be deleted permanently. The second,
the direction words, is a reading task forever.

## Sequencing

Part 3 first: it is the only one of the three guarding against a defect that could publish two
different numbers for the same measure, and it is independent of the other two. Then 1, then 2,
because the filter without the check is a convenience rather than a guarantee.

None of it blocks launch, which waits on two decisions this changes neither of.
