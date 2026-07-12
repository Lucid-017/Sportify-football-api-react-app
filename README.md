installed dotenv to keep our info secure
2 - encountered issues with cors, again!!!! the browser is blocking my reques to api.football, because it doesn't include cors headers to allows said connection, using heroku only offers a temporary fix, i will need a server side request for it to run better in production

<!-- FIXME  -->
My frontend is running on localhost:3000 trying to access http://api.football-data.org. the browser blocks this due to cross origin resource sharing policy aka cors,  or else the external api explicitly allows ny origin localhost:3000, the browser will block it
- i cannot change headers in a third party api but we can create our own backend that recieves request from my frontend, , calls the football api for my frontend and sends teh response back to my frontned free from cors

<!-- TODO - fix -->
create a simple node proxy server that talks to our react app, these server will handle our calls to the football api as server-to-server calls dont have cors issue

encountered an issue access .env varaibles, at first i thought it was becasue i has no "proxy" varaible in my package.json but i accessed the token like ${token}, instead of process.env.tokenname

i also istalled nodemon as a dev dependency and added it under the scripts - dev section in my package.json ✅

installing bottleneck for throttling and rate limiting request to the footbal api, fetching match data fro every team, we want to stay under the api limit ✅

updated tailwindcss to make project more responsive ✅

Also when i refresh while in standings the whole thing breaks, need to figure that out
add stats to show highest goal scorers of the league and any info that is avaialble 
implement last 5 games ✅
Added standing view base on tab selection, form,full and short ✅
revamp hoem ui with nav bar and other important attributes ✅

---

## Matchweek selector + World Cup group stage & knockout bracket

### 1. Matchweek selector (Matches tab)

**Problem:** the Matches tab always showed whatever `season.currentMatchday`
the API reported, with no way to look at any other week.

**Wireframe:**

```
┌─────────────────────────────────────────────┐
│ MATCHWEEK  [ 3 ▾]                            │
├─────────────────────────────────────────────┤
│  [crest] Arsenal            2   FT           │
│  [crest] Chelsea            1   05-12 15:00  │
├─────────────────────────────────────────────┤
│  [crest] Man City           —                │
│  [crest] Liverpool          —    05-13 17:30 │
└─────────────────────────────────────────────┘
```

**How it works end to end:**

- `getMatches()` in `SportifyContext.js` already fetched the *entire*
  season's matches in one call (that's how the old "current matchday"
  filter worked — it filtered client-side). The only change was to also
  keep that full response around in a new `allMatches` state instead of
  throwing it away after filtering.
- A new `selectMatchday(day)` context function just re-filters `allMatches`
  by the chosen matchday and updates `matchday`/`matches` — no extra network
  request, no proxy changes.
- `Matches.jsx` derives the list of matchday numbers that actually exist
  (`[...new Set(allMatches.map(m => m.matchday))]`) with `useMemo`, and
  renders them as a `<select>` in place of the old static "Matchweek N"
  text. Picking a week calls `selectMatchday`.

### 2. World Cup: group standings + knockout bracket

**Problem:** for the 2026 World Cup (48 teams, 12 groups of 4, then a
32-team knockout bracket), two things were broken:

1. The "group stage" branch of the Standings table (originally written for
   Champions League) only ever read `standings[0].table` — the *first*
   group's table — and then mapped over each *team row* looking for a
   `.group` property that only exists on the group object itself, not on a
   team row. The result was N empty table headers and zero data rows: no
   group could ever be displayed correctly, for any competition using this
   branch (World Cup, Champions League, Euros all shared this bug).
2. Every knockout match (Round of 32 onward) comes back from
   `football-data.org` with `matchday: null` — only group-stage matches
   have a matchday number. Since `getMatches()` filtered matches by
   `match.matchday === currentMatchday`, every knockout match was silently
   dropped from the Matches tab. There was no separate view for them.

**Wireframe — Standings tab (group stage):**

```
┌ Competitions ▸ FIFA World Cup ───────────────────────────┐
│ [ STANDINGS ] [ MATCHES ] [ KNOCKOUT ]                    │
├────────────────────────────────────────────────────────────┤
│ Group A                                                     │
│  #  Team          MP  W  D  L  GF  GA  Pts                  │
│  1  Mexico         3  3  0  0   6   0   9                   │
│  2  ...                                                      │
├────────────────────────────────────────────────────────────┤
│ Group B                                                     │
│  ...                                                        │
└────────────────────────────────────────────────────────────┘
(one bordered card per group, 12 groups total)
```

**Wireframe — Knockout tab (bracket, only shown for the World Cup):**

```
┌ [ STANDINGS ] [ MATCHES ] [ KNOCKOUT ] ─────────────────────────────────────┐
│ ROUND OF 32      ROUND OF 16     QUARTER-FINALS   SEMI-FINALS    FINAL      │
│ ┌─────────────┐  ┌─────────────┐ ┌─────────────┐  ┌────────────┐ ┌────────┐ │
│ │RSA  0        │  │  TBD        │ │  TBD        │  │  TBD       │ │ TBD    │ │
│ │CAN  1  FT    │  │             │ │             │  │            │ │        │ │
│ └─────────────┘  └─────────────┘ └─────────────┘  └────────────┘ └────────┘ │
│ ┌─────────────┐                                                              │
│ │ ...16 cards  │  (columns scroll horizontally as rounds are unlocked)      │
│ └─────────────┘                                                              │
└───────────────────────────────────────────────────────────────────────────┘
```

**How it works end to end:**

- **Data source stayed the same.** `getMatches()`'s single "fetch the whole
  season" call already includes every knockout match (confirmed by
  inspecting a live response: `GROUP_STAGE`, `LAST_32`, `LAST_16`,
  `QUARTER_FINALS`, `SEMI_FINALS`, `THIRD_PLACE`, `FINAL` all come back in
  the same array, distinguished by a `stage` field). So the same
  `allMatches` state added for the matchweek selector is reused here too —
  no new endpoint, no proxy change.
- **`Standings.jsx`** now stores the *whole* `standings` array filtered down
  to entries that have a `.group` (`groupStandings = standings.filter(s =>
  s.group)`), instead of just `standings[0].table`. Each group is rendered
  as its own table with a real `<tbody>` of team rows (`group.table.map(...)`).
  The branch that picks this rendering path was widened from
  `selectedLeague === "CL" || "EC"` to `["CL","EC","WC"].includes(selectedLeague)`,
  and shows a "not available yet" message instead of a blank screen if no
  groups come back (e.g. before the draw).
- **`Knockout.jsx`** (new component) filters `allMatches` for
  `stage !== "GROUP_STAGE"`, groups them by `stage`, and orders the groups
  with a known bracket order (`LAST_32 → LAST_16 → QUARTER_FINALS →
  SEMI_FINALS → THIRD_PLACE → FINAL`), falling back to appending any
  unrecognized stage name at the end so it degrades gracefully for
  competitions with a different bracket shape. Each stage renders as its
  own scrollable column of match cards.
- **`MatchCard.jsx`** (new, extracted from the old inline match markup in
  `HeadToHead.jsx` so both the Matches tab and the Knockout tab share one
  component) reads everything defensively: unresolved bracket slots (e.g.
  "Winner Group A" before the Round of 32 draw happens) come back from the
  API with `homeTeam`/`awayTeam` as `null` and no score, so the card shows
  "TBD" and a placeholder crest instead of crashing on `match.homeTeam.crest`.
- **`Competitions.jsx`** only adds the "Knockout" tab when
  `selectedLeague === 'WC'` — every other competition keeps the original
  two-tab Standings/Matches layout. Switching competitions resets the
  active tab back to "Standings" so you can't get stuck on a "Knockout" tab
  that no longer exists for the newly selected competition.

### 3. Rate-limit guard: caching fetches across tab switches

**Problem:** `Competitions.jsx` only mounts one tab at a time — switching
tabs unmounts the previous one and mounts the next, wiping any state that
lived in that component. Two places relied on component-local state to hold
fetched API data, so every time you switched back to that tab, the
`useEffect` re-ran and re-fetched from scratch:

- The Matches tab's `getMatches()` call fetches every match in the season in
  one request. Adding the Knockout tab meant a second place calling the same
  function, so bouncing Matches ↔ Knockout re-fetched the whole season each
  time.
- The Standings tab's `getStanding()` call hits `/standings` *and* the
  Bottleneck-throttled `/api/teams/:id/matches` route (used for the "Form"
  tab's last-5-results badges). Its state was local to `Standings.jsx`, so
  every revisit re-ran both calls, including the throttled one, against the
  same shared account-wide rate limit the Bottleneck config in
  `football-proxy-server/server.js` (`minTime: 6000ms`) exists to protect.

**Fix:** both fetches, and the data they produce, were moved from
component-local `useState` into `SportifyContext.js` (which stays mounted
for the whole app, so it survives tab switches), alongside a "cache key" —
the league the currently-held data belongs to:

```js
const [matchesLeague, setMatchesLeague] = useState(null);
const [standingsLeague, setStandingsLeague] = useState(null);
```

Both `getMatches()` and `getStanding()` now start with the same guard shape:

```js
if (matchesLeague === selectedLeague && allMatches.length > 0) {
  setLoading(false);
  return; // already have this competition's data, skip the network call
}
```

Switching between tabs for the *same* competition is now free — no network
call at all. Switching to a *different* competition still fetches fresh
data, because `selectedLeague` no longer matches the cached key. `Matches.jsx`,
`Knockout.jsx` and `Standings.jsx` didn't need any changes beyond reading
the now-shared state from context — they still call `getMatches()` /
`getStanding()` on mount exactly as before, the caching is invisible to them.

#### Full audit — every network call site

`SportifyContext.js` is the only place that calls the API (grepped the whole
`src/` tree for `axios.get` to confirm — four call sites total, all in this
one file). Status of each after this pass:

| Call | Triggered from | Was it re-fetching unnecessarily? | Fix |
|---|---|---|---|
| `getData()` — `GET /api/competitions` | `Leagues.jsx` (Home page), on mount | **Yes.** Navigating Home → a competition → back to Home re-mounts `Leagues.jsx` and re-fetched the entire competitions list every time, even though it almost never changes. | Added a guard: `if (competitions.length > 0) return;` — same pattern as the two below. |
| `getMatches()` — `GET /api/competitions/:id/matches` | `Matches.jsx` and `Knockout.jsx`, on mount | **Yes.** Both tabs call it independently; switching between them re-fetched the whole season each time. | `matchesLeague` cache key (see above). |
| `getStanding()` — `GET /api/competitions/:id/standings` | `Standings.jsx`, on mount | **Yes.** State was component-local, so every revisit to the tab re-fetched. | `standingsLeague` cache key (see above). |
| `GET /api/teams/:id/matches` (last-5-form) | Inside `getStanding()`, for the single top-of-table team only | Already minimal by design — only 1 team, not top 5 despite the `top5Teams` variable name (a pre-existing intentional trade-off to stay under the API's rate limit) — and it's throttled server-side via Bottleneck (`football-proxy-server/server.js`, `minTime: 6000ms`). Now additionally skipped entirely on a `standingsLeague` cache hit. | Covered by the `getStanding()` cache above; no separate fix needed. |

Net effect: revisiting a tab you've already loaded for the current
competition costs zero network calls. The only calls that still fire are:
first load, switching to a competition you haven't viewed yet, and switching
matchweeks within Matches (which is also free — see the matchweek selector
section above, it filters already-downloaded data).

### 4. Knockout tab: legibility pass

**Problem:** the first version of the Knockout tab was just unlabeled
columns of plain match cards — no visual separation between rounds, and no
obvious way to tell who won a given tie without reading two small colored
numbers.

**Fix, in `MatchCard.jsx` and `Knockout.jsx`:**

- The winning team's name is now bold and dark; the losing team's name is
  greyed out, with a small green dot (`●`) next to whoever advanced. Draws
  (extremely rare in a knockout match, but the data model allows it) render
  both names at normal weight.
- Unresolved fixtures (bracket slot not decided yet) show "vs" instead of a
  bare dash, and a "Scheduled"/"LIVE"/"FT" pill instead of plain text, so the
  match's state is legible without inferring it from color alone.
- Each round is now a clearly delimited column: a solid `Darkblue-800`
  header bar with the round name and match count, plus a vertical divider
  between columns, instead of a small grey label floating above a bare list.
- A round-progress strip above the bracket (`Round of 32 → ... → Final`)
  shows every stage of the tournament up front, with reached rounds
  highlighted and unreached ones dimmed — so you know where in the
  tournament you're looking without having to scroll the bracket first.

### 5. Stats tab: Top Scorers

**Ask was for goal scorers, assist leaders, and "best rated player."**
Before building it, I checked what `football-data.org` (the only data
source this app has) actually returns from its scorers endpoint:

```json
{
  "player": { "id": 3374, "name": "Kylian Mbappé", ... },
  "team": { "id": 773, "name": "France", ... },
  "playedMatches": 6,
  "goals": 8,
  "assists": 2,
  "penalties": 1
}
```

Two things came out of that:

- **No rating field exists anywhere in this API** — player ratings (the
  SofaScore/WhoScored/Opta kind of stat) aren't something football-data.org
  tracks at any tier. There's no way to build this without integrating a
  second, unrelated data provider. **Decision (confirmed with the product
  owner): dropped entirely** rather than fabricate a "rating" out of goals
  and assists and mislabel it.
- **There's no assists-leaderboard endpoint** — `/scorers` is fundamentally
  ranked by goals; a player with many assists but few goals could rank
  outside even a `limit=100` pull and never surface. **Decision (confirmed
  with the product owner): skipped for now** rather than ship an
  approximation that quietly under-counts real assist leaders. The `assists`
  count is still shown as a column next to each top scorer (it's real data
  about a real ranking, just not itself a ranking), it's just not presented
  as its own leaderboard.

**What shipped:** a Top 10 Goal Scorers table (rank, player, team, matches
played, assists, goals), available as a "Stats" tab on every competition.

**How it works end to end:**

- `football-proxy-server/server.js` gained one new route,
  `GET /api/competitions/:name/scorers`, forwarding to football-data.org's
  `/v4/competitions/{id}/scorers?limit=10` with the same auth-header pattern
  as the existing `/standings` and `/matches` routes.
  **This route needs to be deployed to the Render instance** (the existing
  routes work in production because they were already deployed; this one is
  new code that only exists locally until it's redeployed the same way the
  proxy was deployed before — see the "deploy proxy to render.com" commit).
- `SportifyContext.js` gained `getScorers()` / `scorers` / `scorersLoading`,
  following the exact same `scorersLeague` cache-key pattern used by
  `getMatches()`/`getStanding()` (see section 3) — revisiting the Stats tab
  for a competition you've already loaded doesn't re-fetch.
- `Stats.jsx` (new) renders the table, with the same empty-state treatment
  used elsewhere (e.g. a competition whose season hasn't started yet, like
  the Premier League right now, simply has no scorers — shown as "No scorer
  data available yet." instead of a blank table).

### 6. Vercel deploy gotcha: `CI=true` turns ESLint warnings into build failures

Pushing this branch to Vercel failed with `Command "npm run build" exited
with 1`, even though `npm run build` succeeds locally. Reason: Vercel (like
most CI providers) sets `CI=true` in its build environment, and
Create React App's build script treats **every ESLint warning as a hard
error** whenever `CI` is set — a `no-unused-vars` or
`react-hooks/exhaustive-deps` warning that's harmless in local dev
(`npm start`) is fatal in CI. Reproduced locally with
`CI=true npx react-scripts build` to confirm, then fixed each one:

- `App.js` / `Leagues.jsx` had genuinely unused imports (`Matches`, `Link`)
  — removed.
- Five `react-hooks/exhaustive-deps` warnings, all on the same shape of
  effect: `useEffect(() => { getX() }, [])`, meant to run once on mount.
  ESLint wants `getX` (and whatever it closes over) listed as a dependency,
  but `getX` is a plain function defined fresh in the body of
  `SportifyProvider` on every render — it's not wrapped in `useCallback`, so
  its identity changes on every context render. Satisfying the rule as
  written would make these effects re-run on every context render instead
  of once per mount, undoing the tab-switch caching from section 3.
  Suppressed with `// eslint-disable-next-line react-hooks/exhaustive-deps`
  on each one instead, with a comment explaining why.

`CI=true npx react-scripts build` now compiles successfully — this is the
command to re-run locally before pushing if this class of warning creeps
back in.