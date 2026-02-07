# DevTables — MVP Product Specification

> **Implementation constraint**: This MVP uses the same tech stack as the existing DevConnect repo — **Next.js 16 App Router + React 19 + Tailwind CSS 4**, with all state managed via **React Context + in-memory mock data**. No database, no ORM, no external auth provider. Everything runs client-side with seeded data that resets on page reload.

---

## Product Definition

**DevTables** is a recurring small-group dinner platform for developers in Medellin. Every Wednesday, 30 developers are algorithmically matched into tables of 6 at local restaurants, cafes, or coworking spaces for a 90-minute structured dinner with built-in icebreakers and conversation scaffolding. Attendees split the bill; the platform handles matching, venue assignment, check-in, and post-event mutual connections. The target user is a working developer (employee, freelancer, or founder) who wants genuine local relationships with peers — the "hallway track" of a conference, but as a weekly ritual. DevTables bridges online identities (GitHub, LinkedIn) with face-to-face connection, making it easy to collaborate after the dinner ends.

---

## User Stories & Jobs To Be Done

### Attendee

| # | User Story | JTBD |
|---|-----------|------|
| A1 | As an attendee, I want to create a profile with my dev interests, tech stack, and goals so the algorithm can match me with relevant people. | Represent myself accurately to meet the right peers. |
| A2 | As an attendee, I want to see upcoming Wednesday events and book a seat so I have a recurring social commitment. | Reduce coordination cost of meeting new people. |
| A3 | As an attendee, I want to receive my table assignment and venue before the event so I can plan logistics. | Know where to go and what to expect. |
| A4 | As an attendee, I want to check in at the venue with a code so the organizer knows I arrived. | Confirm attendance and unlock the icebreaker deck. |
| A5 | As an attendee, I want guided icebreakers and conversation prompts during dinner so the conversation flows naturally. | Avoid awkward silences and have meaningful discussion. |
| A6 | As an attendee, I want the "Last Drinks" venue revealed at minute 75 so I can optionally meet people from other tables. | Expand my network beyond my table of 6. |
| A7 | As an attendee, I want to rate the event and each tablemate after dinner so I can express who I'd like to stay connected with. | Give feedback and curate my connections. |
| A8 | As an attendee, I want mutual connections created only when both parties opt in so my contact info stays private until I choose to share. | Control who can reach me after the event. |
| A9 | As an attendee, I want to see my connection history and upcoming events in a dashboard so I can track my network growth. | Measure the value of attending. |
| A10 | As an attendee, I want to report inappropriate behavior and block a user so I feel safe. | Protect myself from bad actors. |

### Organizer / Admin

| # | User Story | JTBD |
|---|-----------|------|
| O1 | As an admin, I want to create and manage weekly events (date, city zone, venues, capacity) so the platform runs smoothly. | Operate the event pipeline. |
| O2 | As an admin, I want to run the matching algorithm after booking closes so tables are balanced and diverse. | Produce high-quality table assignments. |
| O3 | As an admin, I want to see real-time check-in status per table so I can handle no-shows. | Manage event-day logistics. |
| O4 | As an admin, I want to review reports and take action (warn, suspend, ban) so the community stays healthy. | Enforce code of conduct. |
| O5 | As an admin, I want to see metrics (attendance rate, connection rate, NPS, repeat rate) so I can improve the product. | Measure and iterate. |

### Venue Partner

| # | User Story | JTBD |
|---|-----------|------|
| V1 | As a venue partner, I want to register my space (capacity, type, location, available days) so DevTables can assign groups to me. | Get recurring foot traffic from developers. |
| V2 | As a venue partner, I want to confirm or decline table assignments so I can manage my own capacity. | Keep operational control. |
| V3 | As a venue partner, I want to see expected headcount 48h in advance so I can prepare. | Plan service without surprises. |

---

## Feature Prioritization

### Non-Negotiable MVP (v1.0)

1. **Simulated auth** — "Log in as" dropdown to switch between mock users (no real auth; session stored in React Context).
2. **Developer profile** — name, bio, title, location, tech stack, interests/goals, GitHub handle (optional LinkedIn/Discord), avatar, preferred language (ES/EN), experience level, role category.
3. **Event listing & booking** — browse upcoming Wednesdays (seeded mock events), book a seat (free), cancel.
4. **Matching algorithm** — client-side constraint-based table assignment triggered by an admin button.
5. **Table assignment view** — after matching runs, each user sees their assigned table, venue, tablemates' display names + avatars, and a check-in code.
6. **Code-word check-in** — enter 4-character table code (e.g., "MESA-7A2F") to confirm arrival; no camera/QR needed in mock.
7. **Icebreaker deck** — in-app prompt cards (10 prompts per event) organized in 3 rounds, revealed after check-in, "Next Prompt" button.
8. **Last Drinks reveal** — at T+75min (simulated via timer), in-app card with after-venue name + map link appears.
9. **Post-event feedback** — rate event (1-5 stars), rate each tablemate (connect / neutral / report), free-text comment.
10. **Mutual connect** — if both parties select "connect," exchange full profiles in a shared Connections page.
11. **Reporting & blocking** — report a user with reason; block prevents future co-tabling; admin review list.
12. **Admin dashboard** — create events, trigger matching, view check-ins, review reports, see metrics.
13. **Code of conduct** — shown at profile creation; must accept (checkbox).
14. **Bilingual support** — UI strings in English + Spanish (hardcoded toggle, no i18n library needed for MVP).

### v1.1 Nice-to-Haves

- Waitlist when event is full (auto-promote on cancellation).
- Dietary preference field.
- Venue rating by attendees.
- Streak badges (attended 4 weeks in a row).
- "Super connect" — share a project idea with a mutual connection.
- Group chat for mutual connections (ephemeral, 7-day TTL).
- Auto-import GitHub profile data via API.
- SMS/WhatsApp reminders.
- Recurring booking (auto-book every Wednesday).
- Multi-city support.
- Real authentication (NextAuth + database).
- Persistent storage (PostgreSQL + Prisma).

---

## Core Flows (Step-by-Step)

### Flow 1: Onboarding / Profile

```
1. User lands on homepage → sees hero + "Join the next dinner" CTA.
2. Clicks "Create Profile" (or selects from "Log in as" mock-user picker in navbar).
3. Fills profile form (extends existing /developers/new form):
   - Full name (required)
   - Title / role (required)
   - Location / barrio in Medellin (required — dropdown: El Poblado, Laureles, Centro, Envigado, Other)
   - Bio (optional, 280 chars)
   - Tech stack (multi-select from predefined list + free-text, reuses existing TechBadge component)
   - Role category: dropdown — Frontend, Backend, Full-Stack, Mobile, DevOps, ML/AI, Design, Other
   - Experience level: dropdown — Junior (0-2y), Mid (3-5y), Senior (6+y)
   - Goals: checkboxes — "Meet co-founders," "Find collaborators,"
     "Learn new tech," "Just socialize," "Practice English/Spanish"
   - Preferred dinner language: radio — Spanish only / English only / Either
   - GitHub username (optional)
   - LinkedIn URL (optional)
   - Discord handle (optional)
   - Code of Conduct acceptance (checkbox, required)
4. Profile saved to DataContext → user redirected to Events page.
5. Navbar now shows user's display name + avatar + "My Dashboard" link.
```

### Flow 2: Availability + Booking

```
1. User navigates to /events → sees list of upcoming Wednesday events (mock-seeded: this week + next 4 weeks).
2. Each event card shows:
   - Date (e.g., "Wed, Feb 12")
   - City zone (El Poblado)
   - Venue type tag (restaurant/cafe/cowork)
   - Spots remaining (e.g., "12/30 spots left" — computed from bookings array length)
   - Price note: "Free — split the bill with your table"
   - Status badge: Open / Full / Closed / Completed
3. User taps "Book a Seat" on an open event.
4. Confirmation modal: "You're booking Wednesday Feb 12 in El Poblado.
   You'll see your table assignment once matching runs. Cancel anytime before the event."
5. User confirms → booking added to DataContext (bookings array for that event).
6. Button changes to "Cancel Booking" (toggles back).
7. User can see "My Bookings" section in their dashboard page.
```

### Flow 3: Matching + Table Assignment

```
1. Admin navigates to /admin/events/[id].
2. Sees list of all confirmed bookings for the event.
3. Clicks "Run Matching" button.
4. Client-side matching algorithm runs (see algorithm section):
   a. Takes all confirmed bookings.
   b. Assigns them to tables of 6 (or 5 if not evenly divisible).
   c. Assigns each table to a venue from the event's venue pool.
   d. Generates a 4-character table code (e.g., "MESA-7A2F").
5. Results displayed: list of tables with members, venue, and code.
6. Admin can manually drag-and-drop swap members between tables (optional).
7. Admin clicks "Publish Assignments" → status changes to "assigned."
8. Each user's dashboard now shows:
   "Your table is at [Venue Name], [Address]. Wednesday 7:00 PM.
    Your tablemates: [display name + avatar x5]. Your check-in code: MESA-7A2F."
```

### Flow 4: Check-In

```
1. On event day, user navigates to /events/[id]/checkin.
2. Enters their 4-character table code (e.g., "MESA-7A2F").
3. Client validates: user is booked for this event AND the code matches their assigned table.
4. Check-in confirmed → user sees "Welcome! Icebreakers unlock when 3+ tablemates check in."
5. Check-in status stored in DataContext (checkedInAt timestamp on the table assignment).
6. Admin dashboard shows real-time check-in count per table.
7. Fallback for demo: "Check In All" button on admin page to simulate full attendance.
```

### Flow 5: During-Event Experience (Icebreaker Deck + Norms)

```
1. When 3+ of 6 tablemates have checked in, the icebreaker deck unlocks at /events/[id]/icebreakers.
2. Table norms card shown first (user swipes/clicks to dismiss):
   - "Phones away except for the icebreaker app."
   - "Listen as much as you speak."
   - "What's shared at the table stays at the table."
   - "No recruiting pitches — this is about people, not pipelines."
3. Icebreaker deck: 10 prompt cards organized in 3 rounds.
   - Round 1 — Warm-up (3 prompts, ~20 min): light, fun questions.
   - Round 2 — Depth (4 prompts, ~40 min): career and learning.
   - Round 3 — Future (3 prompts, ~20 min): forward-looking, collaborative.
4. User sees current prompt as a large card. "Next Prompt" button advances.
   (In mock MVP: single-user advance, no majority vote needed.)
5. 90-minute countdown timer visible at top of screen, started from first check-in time.
6. Round label and progress indicator (e.g., "Round 2 — Depth • Prompt 5/10").
```

**Example Prompt Deck (10 prompts for a single event):**

| Round | # | Prompt (EN) | Prompt (ES) |
|-------|---|------------|-------------|
| Warm-up | 1 | What's one tool in your dev setup that you'd recommend to anyone? | Cual es una herramienta en tu setup que le recomendarias a cualquiera? |
| Warm-up | 2 | What side project are you secretly most proud of? | De cual side project secretamente estas mas orgulloso? |
| Warm-up | 3 | Tabs or spaces? Vim or VS Code? Pick a hill and die on it. | Tabs o espacios? Vim o VS Code? Elige tu colina y defiendela. |
| Depth | 4 | What technical decision have you regretted the most? | Cual decision tecnica has lamentado mas? |
| Depth | 5 | Tell us about a time you had to ask for help and what it taught you. | Cuentanos de una vez que tuviste que pedir ayuda y que aprendiste. |
| Depth | 6 | What's the biggest gap between what companies say they value and what they actually reward in engineering? | Cual es la mayor brecha entre lo que las empresas dicen valorar y lo que realmente premian en ingenieria? |
| Depth | 7 | If you could fix one thing about developer culture, what would it be? | Si pudieras arreglar una cosa de la cultura de desarrollo, cual seria? |
| Future | 8 | What technology do you think will be irrelevant in 5 years? | Que tecnologia crees que sera irrelevante en 5 anos? |
| Future | 9 | What's the project you keep putting off? What's stopping you? | Cual es el proyecto que sigues posponiendo? Que te detiene? |
| Future | 10 | Look around this table — who would you want to build something with, and what would it be? | Mira alrededor de esta mesa — con quien querrias construir algo y que seria? |

*Prompts are stored in the mock data file. A pool of 50+ prompts; 10 are randomly selected per event.*

### Flow 6: Last Drinks Reveal + Cross-Table Mixing

```
1. Timer reaches T+75min → "Last Drinks" card automatically appears on the icebreaker screen.
   (In demo: a "Reveal Last Drinks" button on admin page triggers it for all tables.)
2. Card shows: venue name, address, Google Maps link (hardcoded mock URL), "Starts in 30 min."
3. The Last Drinks venue is shared across ALL tables for that event night.
4. Goal: people from different tables mingle; "I was at Table 3" is a conversation starter.
5. No structured activity — purely social.
```

### Flow 7: Post-Event Feedback + Mutual Connect

```
1. After event completes (admin clicks "Complete Event" or timer expires),
   user navigates to /events/[id]/feedback.
2. Feedback form:
   a. Overall event rating: 1-5 stars (clickable star row).
   b. For EACH tablemate (avatar + display name):
      - "Would you like to connect?" → [Connect] [Neutral] [Report] buttons.
      - Optional: free-text note (visible only to the other person if mutual connect).
   c. Free-text: "Any feedback for the organizers?" (visible in admin dashboard).
3. User submits → feedback saved to DataContext.
4. Mutual connect detection runs immediately on submit:
   - For each pair where BOTH selected "Connect":
     → A Connection record is created in context.
     → User sees toast: "You matched with [Name]! Check your Connections page."
     → Full profile (name, GitHub, LinkedIn, email) now visible to each other.
   - If one-sided or neutral: no connection, no notification.
   - If "Report": added to admin reports queue; reporter sees confirmation toast.
5. /connections page: user sees all mutual connections with event date and option to delete.
6. Deleting a connection: soft-removes from both sides.
```

---

## Matching Algorithm (MVP)

### Approach: Constraint-Satisfaction + Diversity Score (Client-Side)

The matching runs entirely in the browser as a pure TypeScript function. It takes an array of booked developers and produces table assignments. Greedy constraint-first approach with diversity maximization.

### Constraints (hard — must satisfy)

| # | Constraint | Rationale |
|---|-----------|-----------|
| C1 | Table size = 5-6 | Core format |
| C2 | No repeat pairing from last 4 events | Freshness (checked against `pastTableAssignments` in context) |
| C3 | Language compatibility: spanish_only users not placed on majority english_only tables | Inclusion |
| C4 | Blocked users never co-tabled | Safety (checked against `blocks` array in context) |

### Diversity Rules (soft — maximize)

| # | Rule | Weight |
|---|------|--------|
| D1 | Tech stack diversity (maximize unique technologies per table) | 0.3 |
| D2 | Role diversity (mix frontend/backend/ML/devops/mobile) | 0.3 |
| D3 | Experience level spread (junior/mid/senior) | 0.2 |
| D4 | Goal diversity (mix "find collaborators" with "learn new tech" etc.) | 0.2 |

### TypeScript Implementation

```typescript
// src/lib/matching.ts

import { DevTablesUser, DinnerTable, Venue } from "@/data/types";

interface MatchingInput {
  bookedUsers: DevTablesUser[];
  venues: Venue[];
  recentPairs: Set<string>; // "userId1:userId2" strings from last 4 events
  blockedPairs: Set<string>; // "userId1:userId2" strings
}

interface MatchingResult {
  tables: DinnerTable[];
  unassigned: DevTablesUser[]; // users that couldn't be placed (should be 0)
}

function pairKey(a: string, b: string): string {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

function distributeSizes(n: number, target: number, min: number): number[] {
  if (n < min) return [n]; // edge case: fewer people than minimum table size
  const fullTables = Math.floor(n / target);
  const remainder = n % target;

  if (remainder === 0) return Array(fullTables).fill(target);
  if (remainder >= min) return [...Array(fullTables).fill(target), remainder];
  // Redistribute: take 1 from each full table to pad remainder
  // e.g., 28 people → 4*6=24 + 4 remainder → instead: 3*6 + 2*5
  const tablesToShrink = target - remainder;
  const sizes: number[] = [];
  for (let i = 0; i < fullTables; i++) {
    sizes.push(i < tablesToShrink ? target - 1 : target);
  }
  sizes.push(remainder + tablesToShrink); // this should equal target
  // Actually, simpler:
  // n=28, target=6: 28/6=4r4. 4 < 5(min), so we do 3 tables of 6 + 2 tables of 5 = 28
  const result: number[] = [];
  let remaining = n;
  while (remaining > 0) {
    if (remaining >= target + min) {
      result.push(target);
      remaining -= target;
    } else if (remaining >= 2 * min) {
      // Split evenly
      const half = Math.ceil(remaining / 2);
      result.push(half);
      result.push(remaining - half);
      remaining = 0;
    } else {
      result.push(remaining);
      remaining = 0;
    }
  }
  return result;
}

function techDiversityScore(user: DevTablesUser, table: DevTablesUser[]): number {
  if (table.length === 0) return 1.0;
  const tableTechs = new Set(table.flatMap((m) => m.technologies));
  const newTechs = user.technologies.filter((t) => !tableTechs.has(t));
  return newTechs.length / Math.max(user.technologies.length, 1);
}

function roleDiversityScore(user: DevTablesUser, table: DevTablesUser[]): number {
  const rolesAtTable = new Set(table.map((m) => m.roleCategory));
  return rolesAtTable.has(user.roleCategory) ? 0.0 : 1.0;
}

function experienceDiversityScore(user: DevTablesUser, table: DevTablesUser[]): number {
  if (table.length === 0) return 1.0;
  const countSame = table.filter((m) => m.experienceLevel === user.experienceLevel).length;
  return 1.0 - countSame / table.length;
}

function goalDiversityScore(user: DevTablesUser, table: DevTablesUser[]): number {
  if (table.length === 0) return 1.0;
  const tableGoals = new Set(table.flatMap((m) => m.goals));
  const overlap = user.goals.filter((g) => tableGoals.has(g));
  return 1.0 - overlap.length / Math.max(user.goals.length, 1);
}

function languageCompatible(user: DevTablesUser, table: DevTablesUser[]): boolean {
  if (user.languagePref === "either") return true;
  if (table.length === 0) return true;
  const conflicting = table.filter(
    (m) =>
      m.languagePref !== "either" && m.languagePref !== user.languagePref
  );
  // Block if majority of table speaks incompatible language
  return conflicting.length < table.length / 2;
}

export function assignTables(input: MatchingInput): MatchingResult {
  const { bookedUsers, venues, recentPairs, blockedPairs } = input;

  // 1. Determine table sizes
  const sizes = distributeSizes(bookedUsers.length, 6, 5);
  const tables: DinnerTable[] = sizes.map((size, i) => ({
    id: `table-${Date.now()}-${i}`,
    eventId: "",  // set by caller
    venueId: venues[i % venues.length].id,
    tableCode: `MESA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    seatCount: size,
    members: [],
    checkedIn: [],
  }));

  // 2. Shuffle users to avoid deterministic bias
  const shuffled = [...bookedUsers].sort(() => Math.random() - 0.5);

  // 3. Place language-constrained users first
  const constrained = shuffled.filter((u) => u.languagePref !== "either");
  const flexible = shuffled.filter((u) => u.languagePref === "either");
  const ordered = [...constrained, ...flexible];

  const assigned = new Set<string>();
  const unassigned: DevTablesUser[] = [];

  for (const user of ordered) {
    let bestTableIdx = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      if (table.members.length >= table.seatCount) continue;

      // Hard constraints
      const hasRecentPair = table.members.some(
        (m) => recentPairs.has(pairKey(user.id, m.id))
      );
      if (hasRecentPair) continue;

      const hasBlockedPair = table.members.some(
        (m) => blockedPairs.has(pairKey(user.id, m.id))
      );
      if (hasBlockedPair) continue;

      if (!languageCompatible(user, table.members)) continue;

      // Soft diversity score
      const score =
        0.3 * techDiversityScore(user, table.members) +
        0.3 * roleDiversityScore(user, table.members) +
        0.2 * experienceDiversityScore(user, table.members) +
        0.2 * goalDiversityScore(user, table.members);

      if (score > bestScore) {
        bestScore = score;
        bestTableIdx = i;
      }
    }

    if (bestTableIdx >= 0) {
      tables[bestTableIdx].members.push(user);
      assigned.add(user.id);
    } else {
      // Fallback: relax constraints, assign to smallest table
      const smallest = tables.reduce((minIdx, t, idx, arr) =>
        t.members.length < arr[minIdx].members.length ? idx : minIdx, 0);
      tables[smallest].members.push(user);
      assigned.add(user.id);
    }
  }

  return { tables, unassigned };
}
```

### Tradeoffs

| Decision | Tradeoff |
|----------|----------|
| **Client-side matching** | Runs in browser — no server needed for MVP. Limit is ~100 users before it feels slow; fine for 30. |
| **Greedy instead of ILP** | Fast and simple; not globally optimal but adequate for 30 people. |
| **Shuffle before greedy** | Avoids deterministic ordering bias; different runs produce different valid assignments. |
| **4-event repeat window** | Sweet spot for 30 weekly users. Shorter = easier to satisfy; longer = more novelty but may become infeasible. |
| **Language as hard constraint** | In bilingual Medellin, a Spanish-only speaker at an all-English table would have a bad experience. |
| **No ML** | Collaborative filtering on "who enjoyed dining with whom" is v1.1 once enough feedback data accumulates. |
| **Mock data resets** | All state is in-memory. Acceptable for demoing flows; real persistence is v1.1. |

---

## Trust & Safety

### Code of Conduct

- Shown at profile creation (must accept checkbox to submit).
- Re-shown as a dismissable banner before each event booking.
- Core rules: no harassment, no recruiting pitches at dinner, no sharing others' info without consent, respect dietary/cultural differences, phones away during icebreakers.
- Stored as a static page at `/code-of-conduct`.

### Blocking & Reporting

- **Block**: instant, client-side. Adds pair to `blocks` array in DataContext. Blocked user is never co-tabled. Blocker's identity is not revealed.
- **Report**: user selects reason (harassment, no-show pattern, spam, other) + optional description. Added to `reports` array in DataContext. Reporter sees confirmation toast.
- **Admin actions**: admin views reports at `/admin/reports`. Can mark as reviewed, action_taken, or dismissed. In mock MVP, "warn/suspend/ban" sets a status flag on the user.

### Privacy Boundaries

- **Before mutual connect**: other attendees see only display name (first name), avatar, and tech stack badges. No last name, email, GitHub, or LinkedIn.
- **After mutual connect**: both parties see full profile. Either party can delete the connection at any time.
- **Feedback**: individual ratings ("connect" / "neutral" / "report") are never revealed to the rated person. Only mutual connects produce a visible outcome.

### Data Minimization (for future production)

- Collect only what's needed: name, tech stack, goals, optional social handles.
- No phone number in MVP.
- Location stored as city zone (El Poblado / Laureles), not precise coordinates.
- In mock MVP all data is ephemeral (resets on reload), which is inherently minimal.

---

## Metrics

| Metric | Definition | Target (Pilot) | How Computed (Mock) |
|--------|-----------|----------------|---------------------|
| **Activation rate** | % of profiles who book their first event | > 60% | `bookings.length / developers.length` |
| **Attendance rate** | % of booked users who check in | > 80% | `checkedIn.length / bookings.length` per event |
| **No-show rate** | % of booked users who don't check in | < 20% | `1 - attendance rate` |
| **Connection rate (mutual)** | % of possible pairings at a table that result in mutual connect | > 30% | `connections.length / C(6,2)` per table |
| **Repeat rate** | % of attendees who book again within 4 weeks | > 50% | users with 2+ bookings / total unique users |
| **New tie count** | Avg mutual connections per attendee per event | >= 2 | `connections per event / attendees per event` |
| **NPS** | "How likely to recommend?" (0-10 scale) | > 50 NPS | computed from event feedback ratings |
| **Last Drinks participation** | % of checked-in who attend Last Drinks | > 40% | (v1.1 — needs explicit tracking) |
| **Feedback completion** | % of attendees who submit post-event feedback | > 70% | `feedbackSubmitted / checkedIn` |
| **Report rate** | Reports per 100 attendees | < 2 | `reports.length / attendees * 100` |

Admin dashboard at `/admin` shows these computed in real-time from the DataContext arrays.

---

## Data Model (TypeScript Interfaces + Mock Data)

All types go in `src/data/types.ts`. All mock data goes in `src/data/mock.ts`. State management via `src/data/DataContext.tsx` — the same pattern the repo already uses.

### TypeScript Interfaces

```typescript
// src/data/types.ts

// ── Existing (keep as-is) ──────────────────────────

export interface PersonalProject {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
}

export interface Developer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  github: string;
  location: string;
  title: string;
  technologies: string[];
  projects: PersonalProject[];
  availableForCollab: boolean;
}

export interface OpenProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  owner: { developerId: string; name: string; avatar: string };
  contributors: { developerId: string; name: string; avatar: string }[];
  openRoles: string[];
  applicants: number;
  status: "recruiting" | "in-progress" | "launched";
  createdAt: string;
  repoUrl: string;
}

// ── New: DevTables domain ──────────────────────────

export type RoleCategory =
  | "frontend" | "backend" | "fullstack" | "mobile"
  | "devops" | "ml" | "design" | "other";

export type ExperienceLevel = "junior" | "mid" | "senior";

export type LanguagePref = "spanish_only" | "english_only" | "either";

export type Goal =
  | "meet_cofounders" | "find_collaborators" | "learn_tech"
  | "socialize" | "practice_language";

export type CityZone = "poblado" | "laureles" | "centro" | "envigado" | "other";

export type EventStatus =
  | "draft" | "open" | "closed" | "matching"
  | "assigned" | "live" | "completed" | "cancelled";

export type VenueType = "restaurant" | "cafe" | "cowork" | "bar";

export type ConnectVote = "connect" | "neutral" | "report";

export type ReportReason = "harassment" | "no_show" | "spam" | "other";

export type ReportStatus = "pending" | "reviewed" | "action_taken" | "dismissed";

/** Extended developer profile for DevTables (superset of Developer) */
export interface DevTablesUser extends Developer {
  email: string;
  role: "attendee" | "admin" | "venue_partner";
  locale: "es" | "en";
  displayName: string;            // first name only, shown pre-connect
  cityZone: CityZone;
  roleCategory: RoleCategory;
  experienceLevel: ExperienceLevel;
  goals: Goal[];
  languagePref: LanguagePref;
  linkedinUrl?: string;
  discordHandle?: string;
  acceptedCoc: boolean;
  isSuspended: boolean;
  isBanned: boolean;
  createdAt: string;
}

export interface Venue {
  id: string;
  name: string;
  type: VenueType;
  address: string;
  cityZone: CityZone;
  capacity: number;
  tablesAvailable: number;
  mapUrl: string;
  notes?: string;
  isActive: boolean;
}

export interface DevTablesEvent {
  id: string;
  title: string;                  // e.g., "DevTables Medellin #12"
  eventDate: string;              // ISO date "2026-02-12"
  startTime: string;              // "19:00"
  durationMin: number;            // 90
  city: string;                   // "medellin"
  cityZone: CityZone;
  maxAttendees: number;           // 30
  status: EventStatus;
  venueIds: string[];             // venues assigned to this event
  lastDrinksVenueId?: string;     // after-party venue
  matchingRunAt?: string;         // ISO datetime
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: "confirmed" | "cancelled" | "no_show";
  bookedAt: string;               // ISO datetime
  cancelledAt?: string;
}

export interface DinnerTable {
  id: string;
  eventId: string;
  venueId: string;
  tableCode: string;              // "MESA-7A2F"
  seatCount: number;              // 5 or 6
  members: DevTablesUser[];       // denormalized for easy rendering
  checkedIn: string[];            // user IDs who have checked in
}

export interface Feedback {
  id: string;
  eventId: string;
  giverId: string;
  receiverId?: string;            // null for event-level only
  eventRating?: number;           // 1-5
  connectVote?: ConnectVote;
  note?: string;                  // private note (shown only if mutual connect)
  adminComment?: string;          // feedback to organizers
  createdAt: string;
}

export interface Connection {
  id: string;
  userAId: string;                // canonical: userAId < userBId
  userBId: string;
  eventId: string;                // where they met
  createdAt: string;
  deletedAt?: string;             // soft delete
}

export interface Report {
  id: string;
  reporterId: string;
  reportedId: string;
  eventId?: string;
  reason: ReportReason;
  description?: string;
  status: ReportStatus;
  adminNotes?: string;
  resolvedAt?: string;
  createdAt: string;
}

export interface Block {
  id: string;
  blockerId: string;
  blockedId: string;
  createdAt: string;
}

export interface IcebreakerPrompt {
  id: string;
  round: "warmup" | "depth" | "future";
  textEn: string;
  textEs: string;
  isActive: boolean;
}
```

### Mock Data (abbreviated — full file would have 30 users, 5 venues, 4 events, 50 prompts)

```typescript
// src/data/mock.ts  (additions — existing developers/openProjects arrays stay)

export const devTablesUsers: DevTablesUser[] = [
  {
    id: "dt-1",
    name: "Camila Torres",
    displayName: "Camila",
    email: "camila@example.com",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Camila&size=128&backgroundColor=b6e3f4",
    bio: "Full-stack dev building fintech products. Love React and salsa dancing.",
    github: "camilatorres",
    location: "Medellin, Colombia",
    title: "Full-Stack Developer",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS"],
    projects: [],
    availableForCollab: true,
    role: "attendee",
    locale: "es",
    cityZone: "poblado",
    roleCategory: "fullstack",
    experienceLevel: "mid",
    goals: ["find_collaborators", "socialize"],
    languagePref: "either",
    linkedinUrl: "https://linkedin.com/in/camilatorres",
    acceptedCoc: true,
    isSuspended: false,
    isBanned: false,
    createdAt: "2026-01-15T10:00:00Z",
  },
  // ... 29 more users seeded across El Poblado, Laureles, Centro
  // Mix of: frontend, backend, fullstack, mobile, devops, ml
  // Mix of: junior, mid, senior
  // Mix of: spanish_only, english_only, either
];

export const venues: Venue[] = [
  {
    id: "venue-1",
    name: "Cafe Velvet",
    type: "cafe",
    address: "Cra 35 #8A-3, El Poblado",
    cityZone: "poblado",
    capacity: 18,
    tablesAvailable: 3,
    mapUrl: "https://maps.google.com/?q=Cafe+Velvet+Medellin",
    isActive: true,
  },
  {
    id: "venue-2",
    name: "Pergamino Cafe",
    type: "cafe",
    address: "Cra 37 #8A-37, El Poblado",
    cityZone: "poblado",
    capacity: 12,
    tablesAvailable: 2,
    mapUrl: "https://maps.google.com/?q=Pergamino+Cafe+Medellin",
    isActive: true,
  },
  {
    id: "venue-3",
    name: "Selina Cowork",
    type: "cowork",
    address: "Cl 10 #41-30, El Poblado",
    cityZone: "poblado",
    capacity: 24,
    tablesAvailable: 4,
    mapUrl: "https://maps.google.com/?q=Selina+Medellin",
    isActive: true,
  },
  {
    id: "venue-4",
    name: "El Social",
    type: "restaurant",
    address: "Cra 33 #7-51, El Poblado",
    cityZone: "poblado",
    capacity: 30,
    tablesAvailable: 5,
    mapUrl: "https://maps.google.com/?q=El+Social+Medellin",
    isActive: true,
  },
  {
    id: "venue-5",
    name: "Envy Rooftop",
    type: "bar",
    address: "Cl 10 #36-18, El Poblado",
    cityZone: "poblado",
    capacity: 40,
    tablesAvailable: 0,
    mapUrl: "https://maps.google.com/?q=Envy+Rooftop+Medellin",
    notes: "Last Drinks venue only — no dinner tables",
    isActive: true,
  },
];

export const devTablesEvents: DevTablesEvent[] = [
  {
    id: "event-1",
    title: "DevTables Medellin #1",
    eventDate: "2026-02-11",
    startTime: "19:00",
    durationMin: 90,
    city: "medellin",
    cityZone: "poblado",
    maxAttendees: 30,
    status: "open",
    venueIds: ["venue-1", "venue-2", "venue-3"],
    lastDrinksVenueId: "venue-5",
    createdAt: "2026-02-01T10:00:00Z",
  },
  {
    id: "event-2",
    title: "DevTables Medellin #2",
    eventDate: "2026-02-18",
    startTime: "19:00",
    durationMin: 90,
    city: "medellin",
    cityZone: "poblado",
    maxAttendees: 30,
    status: "open",
    venueIds: ["venue-1", "venue-4"],
    lastDrinksVenueId: "venue-5",
    createdAt: "2026-02-01T10:00:00Z",
  },
  // ... 2 more weeks
];

export const icebreakerPrompts: IcebreakerPrompt[] = [
  { id: "p-1", round: "warmup", textEn: "What's one tool in your dev setup that you'd recommend to anyone?", textEs: "Cual es una herramienta en tu setup que le recomendarias a cualquiera?", isActive: true },
  { id: "p-2", round: "warmup", textEn: "What side project are you secretly most proud of?", textEs: "De cual side project secretamente estas mas orgulloso?", isActive: true },
  { id: "p-3", round: "warmup", textEn: "Tabs or spaces? Vim or VS Code? Pick a hill and die on it.", textEs: "Tabs o espacios? Vim o VS Code? Elige tu colina y defiendela.", isActive: true },
  { id: "p-4", round: "depth", textEn: "What technical decision have you regretted the most?", textEs: "Cual decision tecnica has lamentado mas?", isActive: true },
  { id: "p-5", round: "depth", textEn: "Tell us about a time you had to ask for help and what it taught you.", textEs: "Cuentanos de una vez que tuviste que pedir ayuda y que aprendiste.", isActive: true },
  { id: "p-6", round: "depth", textEn: "What's the biggest gap between what companies say they value and what they actually reward in engineering?", textEs: "Cual es la mayor brecha entre lo que las empresas dicen valorar y lo que realmente premian en ingenieria?", isActive: true },
  { id: "p-7", round: "depth", textEn: "If you could fix one thing about developer culture, what would it be?", textEs: "Si pudieras arreglar una cosa de la cultura de desarrollo, cual seria?", isActive: true },
  { id: "p-8", round: "future", textEn: "What technology do you think will be irrelevant in 5 years?", textEs: "Que tecnologia crees que sera irrelevante en 5 anos?", isActive: true },
  { id: "p-9", round: "future", textEn: "What's the project you keep putting off? What's stopping you?", textEs: "Cual es el proyecto que sigues posponiendo? Que te detiene?", isActive: true },
  { id: "p-10", round: "future", textEn: "Look around this table — who would you want to build something with, and what would it be?", textEs: "Mira alrededor de esta mesa — con quien querrias construir algo y que seria?", isActive: true },
  // ... 40 more prompts for rotation
];

// Initial empty arrays (populated via UI interactions during session)
export const initialBookings: Booking[] = [];
export const initialTables: DinnerTable[] = [];
export const initialFeedback: Feedback[] = [];
export const initialConnections: Connection[] = [];
export const initialReports: Report[] = [];
export const initialBlocks: Block[] = [];
```

### DataContext Extension

```typescript
// src/data/DataContext.tsx  (extend existing context with DevTables state)

interface DataContextType {
  // ── Existing ──
  developers: Developer[];
  projects: OpenProject[];
  addDeveloper: (dev: Developer) => void;
  addProject: (proj: OpenProject) => void;
  getDeveloperById: (id: string) => Developer | undefined;
  getProjectById: (id: string) => OpenProject | undefined;

  // ── DevTables additions ──
  currentUser: DevTablesUser | null;
  setCurrentUser: (user: DevTablesUser | null) => void;
  devTablesUsers: DevTablesUser[];
  addDevTablesUser: (user: DevTablesUser) => void;
  venues: Venue[];
  events: DevTablesEvent[];
  addEvent: (event: DevTablesEvent) => void;
  updateEvent: (id: string, updates: Partial<DevTablesEvent>) => void;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (bookingId: string) => void;
  getBookingsForEvent: (eventId: string) => Booking[];
  getBookingsForUser: (userId: string) => Booking[];
  tables: DinnerTable[];
  setTablesForEvent: (eventId: string, tables: DinnerTable[]) => void;
  getTablesForEvent: (eventId: string) => DinnerTable[];
  checkInUser: (tableId: string, userId: string) => void;
  feedback: Feedback[];
  addFeedback: (fb: Feedback) => void;
  getFeedbackForEvent: (eventId: string) => Feedback[];
  connections: Connection[];
  addConnection: (conn: Connection) => void;
  deleteConnection: (connId: string) => void;
  getConnectionsForUser: (userId: string) => Connection[];
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  blocks: Block[];
  addBlock: (block: Block) => void;
  removeBlock: (blockId: string) => void;
  isBlocked: (userA: string, userB: string) => boolean;
  prompts: IcebreakerPrompt[];
  getPromptsForEvent: (eventId: string, count?: number) => IcebreakerPrompt[];
  // Matching
  recentPairs: Set<string>;       // computed from last 4 events' tables
  blockedPairs: Set<string>;      // computed from blocks array
  runMatching: (eventId: string) => DinnerTable[];
  // Mutual connect detection
  detectMutualConnects: (eventId: string) => Connection[];
}
```

### Key Relationships Summary (Context Arrays)

```
devTablesUsers[]          — all registered users
  └─→ currentUser         — the logged-in user (selected via dropdown)

events[]                  — all dinner events
  └─→ bookings[]          — who booked which event  (userId + eventId)
  └─→ tables[]            — generated by matching    (eventId + venueId + members[])
      └─→ checkedIn[]     — user IDs who checked in at this table

feedback[]                — post-event ratings       (giverId + receiverId + eventId)
  └─→ connections[]       — mutual connects          (userAId + userBId + eventId)

reports[]                 — user reports              (reporterId + reportedId)
blocks[]                  — user blocks               (blockerId + blockedId)
prompts[]                 — icebreaker prompt pool
venues[]                  — venue directory
```

---

## Architecture

### Decision: Client-Side Next.js Monolith with Mock Data

Matches the existing repo exactly. No backend, no database, no external services.

```
┌──────────────────────────────────────────────┐
│              Next.js 16 App Router            │
│  ┌────────────────────────────────────────┐   │
│  │              Pages (React 19)          │   │
│  │                                        │   │
│  │  /                     Home + hero     │   │
│  │  /developers           Developer dir   │   │
│  │  /developers/new       Create profile  │   │
│  │  /developers/[id]      Profile detail  │   │
│  │  /projects             Project listing │   │
│  │  /projects/[id]        Project detail  │   │
│  │  /events               Event listing   │   │  ← NEW
│  │  /events/[id]          Event detail    │   │  ← NEW
│  │  /events/[id]/checkin  Check-in page   │   │  ← NEW
│  │  /events/[id]/icebreakers  Prompt deck │   │  ← NEW
│  │  /events/[id]/feedback Feedback form   │   │  ← NEW
│  │  /connections          My connections  │   │  ← NEW
│  │  /dashboard            My dashboard    │   │  ← NEW
│  │  /admin                Admin dashboard │   │  ← NEW
│  │  /admin/events/[id]    Manage event    │   │  ← NEW
│  │  /admin/reports        Report queue    │   │  ← NEW
│  │  /code-of-conduct      Static CoC page │   │  ← NEW
│  │                                        │   │
│  └──────────┬─────────────────────────────┘   │
│             │                                  │
│  ┌──────────▼─────────────────────────────┐   │
│  │         DataContext (React Context)     │   │
│  │                                        │   │
│  │  State:                                │   │
│  │  - developers[] (existing)             │   │
│  │  - projects[] (existing)               │   │
│  │  - currentUser (new — simulated auth)  │   │
│  │  - devTablesUsers[] (new)              │   │
│  │  - events[] (new)                      │   │
│  │  - venues[] (new)                      │   │
│  │  - bookings[] (new)                    │   │
│  │  - tables[] (new)                      │   │
│  │  - feedback[] (new)                    │   │
│  │  - connections[] (new)                 │   │
│  │  - reports[] (new)                     │   │
│  │  - blocks[] (new)                      │   │
│  │  - prompts[] (new)                     │   │
│  │                                        │   │
│  │  Actions: add*, update*, delete*,      │   │
│  │  runMatching(), detectMutualConnects() │   │
│  └──────────┬─────────────────────────────┘   │
│             │                                  │
│  ┌──────────▼─────────────────────────────┐   │
│  │          Mock Data (mock.ts)           │   │
│  │                                        │   │
│  │  30 DevTablesUsers (seeded)            │   │
│  │  5 Venues in Medellin (seeded)         │   │
│  │  4 Events — next 4 Wednesdays (seeded) │   │
│  │  50 IcebreakerPrompts (seeded)         │   │
│  │  Empty: bookings, tables, feedback,    │   │
│  │         connections, reports, blocks    │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  ┌────────────────────────────────────────┐   │
│  │  lib/matching.ts                       │   │  ← NEW
│  │  Pure function: assignTables()         │   │
│  │  Client-side matching algorithm        │   │
│  └────────────────────────────────────────┘   │
│                                                │
│  Styling: Tailwind CSS 4 (existing theme)      │
│  Avatars: DiceBear API (existing)              │
│  Components: existing + new DevTables ones     │
└──────────────────────────────────────────────┘
```

### Stack (unchanged from existing repo)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS 4 |
| State | React Context + useState |
| Data | In-memory mock arrays (mock.ts) |
| Avatars | DiceBear API |
| Matching | Pure TypeScript function (client-side) |
| Auth | Simulated "Log in as" user picker |
| Hosting | Vercel (zero-config) |

### New Components Needed

| Component | Purpose |
|-----------|---------|
| `UserPicker.tsx` | Navbar dropdown to "Log in as" a mock user |
| `EventCard.tsx` | Event listing card (date, zone, spots, status) |
| `EventDetail.tsx` | Full event page with booking button |
| `TableCard.tsx` | Shows table assignment (venue, code, tablemates) |
| `CheckInForm.tsx` | Code word input for check-in |
| `IcebreakerDeck.tsx` | Prompt card carousel with timer |
| `PromptCard.tsx` | Single icebreaker prompt display |
| `FeedbackForm.tsx` | Post-event rating + per-tablemate connect vote |
| `StarRating.tsx` | Reusable 1-5 star input |
| `ConnectionCard.tsx` | Mutual connection display with delete option |
| `LastDrinksCard.tsx` | After-venue reveal card with map link |
| `AdminEventManager.tsx` | Admin controls (run matching, publish, complete) |
| `AdminReportQueue.tsx` | Report review list |
| `MetricsDashboard.tsx` | Computed metrics display |
| `CocBanner.tsx` | Code of conduct reminder banner |

### New Routes

| Route | Page | Description |
|-------|------|-------------|
| `/events` | Event listing | Browse upcoming Wednesdays, book seats |
| `/events/[id]` | Event detail | Full event info + booking + table assignment |
| `/events/[id]/checkin` | Check-in | Enter table code to confirm arrival |
| `/events/[id]/icebreakers` | Icebreaker deck | Prompt cards with timer |
| `/events/[id]/feedback` | Post-event feedback | Rate event + tablemates + connect vote |
| `/connections` | My connections | All mutual connections with delete |
| `/dashboard` | My dashboard | Upcoming bookings, past events, stats |
| `/admin` | Admin home | Metrics dashboard |
| `/admin/events/[id]` | Manage event | Run matching, view check-ins, manage tables |
| `/admin/reports` | Report queue | Review and action reports |
| `/code-of-conduct` | Code of Conduct | Static page |

---

## Release Plan: 2-Week Sprint to Demo-Ready MVP

### Assumptions

- 1 full-stack developer.
- All data is mock — no backend setup needed.
- Goal: a fully navigable demo that shows every flow end-to-end.

### Sprint 1 (Days 1-7): Foundation + Core Flows

| Day | Tasks |
|-----|-------|
| 1 | **Types + mock data**: Add all new interfaces to `types.ts`. Seed `mock.ts` with 30 DevTablesUsers, 5 venues, 4 events, 50 prompts. |
| 2 | **Extend DataContext**: Add all new state arrays and actions. Add `currentUser` + `setCurrentUser` for simulated auth. Build `UserPicker` navbar dropdown. |
| 3 | **Profile form upgrade**: Extend `/developers/new` with new fields (cityZone, roleCategory, experienceLevel, goals, languagePref, linkedinUrl, discordHandle, CoC checkbox). Creates a `DevTablesUser` instead of plain `Developer`. |
| 4 | **Events pages**: Build `/events` (listing with `EventCard`) and `/events/[id]` (detail with "Book a Seat" / "Cancel Booking" toggle). Wire to DataContext bookings. |
| 5 | **Matching algorithm**: Implement `src/lib/matching.ts`. Build `/admin/events/[id]` with "Run Matching" button + table results display. |
| 6 | **Table assignment view**: After matching, show table assignment on `/events/[id]` for the logged-in user (venue, tablemates, code). Build `TableCard`. |
| 7 | **Check-in**: Build `/events/[id]/checkin` with code word input. Validate against assigned table. Update `checkedIn` array in DataContext. |

### Sprint 2 (Days 8-14): Event Experience + Safety + Polish

| Day | Tasks |
|-----|-------|
| 8 | **Icebreaker deck**: Build `/events/[id]/icebreakers` with `IcebreakerDeck` + `PromptCard`. 90-min countdown timer. Round labels. "Next Prompt" button. Norms card first. |
| 9 | **Last Drinks reveal**: Build `LastDrinksCard`. Show after 75 min (or via admin "Reveal" button). Display venue name + Google Maps link. |
| 10 | **Feedback form**: Build `/events/[id]/feedback` with `FeedbackForm`. Star rating for event. Per-tablemate connect/neutral/report buttons. Free-text fields. |
| 11 | **Mutual connect detection**: Implement `detectMutualConnects()` in DataContext. Build `/connections` page with `ConnectionCard`. Soft-delete support. |
| 12 | **Reporting & blocking**: Build report submission in feedback form. Build `/admin/reports` queue. Implement block logic in DataContext + matching algorithm. |
| 13 | **Dashboard + metrics**: Build `/dashboard` (my bookings, my connections, past events). Build `/admin` metrics dashboard (computed from context arrays). |
| 14 | **Polish + nav**: Update Navbar with new links (Events, Dashboard, Admin). Code of Conduct page. Responsive polish. Cross-flow testing with mock data. |

---

## Folder Structure (After Implementation)

```
src/
├── app/
│   ├── page.tsx                          # Home / hero
│   ├── layout.tsx                        # Root layout (DataProvider + Navbar)
│   ├── globals.css                       # Tailwind theme
│   ├── code-of-conduct/
│   │   └── page.tsx                      # Static CoC
│   ├── developers/
│   │   ├── [id]/page.tsx                 # Developer profile (existing)
│   │   └── new/page.tsx                  # Create profile (extended)
│   ├── projects/
│   │   ├── page.tsx                      # Project listing (existing)
│   │   ├── [id]/page.tsx                 # Project detail (existing)
│   │   └── new/page.tsx                  # Create project (existing)
│   ├── events/                           # ← NEW
│   │   ├── page.tsx                      # Event listing
│   │   └── [id]/
│   │       ├── page.tsx                  # Event detail + booking
│   │       ├── checkin/page.tsx          # Check-in
│   │       ├── icebreakers/page.tsx      # Prompt deck
│   │       └── feedback/page.tsx         # Post-event feedback
│   ├── connections/                      # ← NEW
│   │   └── page.tsx                      # Mutual connections
│   ├── dashboard/                        # ← NEW
│   │   └── page.tsx                      # User dashboard
│   └── admin/                            # ← NEW
│       ├── page.tsx                      # Admin metrics
│       ├── events/
│       │   └── [id]/page.tsx             # Manage single event
│       └── reports/
│           └── page.tsx                  # Report review queue
├── components/
│   ├── Navbar.tsx                        # Extended with new links + UserPicker
│   ├── DeveloperCard.tsx                 # Existing
│   ├── ProjectCard.tsx                   # Existing
│   ├── TechBadge.tsx                     # Existing (reused in DevTables)
│   ├── UserPicker.tsx                    # ← NEW: "Log in as" dropdown
│   ├── EventCard.tsx                     # ← NEW
│   ├── TableCard.tsx                     # ← NEW
│   ├── CheckInForm.tsx                   # ← NEW
│   ├── IcebreakerDeck.tsx               # ← NEW
│   ├── PromptCard.tsx                    # ← NEW
│   ├── FeedbackForm.tsx                  # ← NEW
│   ├── StarRating.tsx                    # ← NEW
│   ├── ConnectionCard.tsx               # ← NEW
│   ├── LastDrinksCard.tsx               # ← NEW
│   ├── CocBanner.tsx                    # ← NEW
│   └── MetricsDashboard.tsx             # ← NEW
├── lib/                                  # ← NEW
│   └── matching.ts                       # Matching algorithm
├── data/
│   ├── types.ts                          # Extended with all DevTables types
│   ├── mock.ts                           # Extended with all mock data
│   └── DataContext.tsx                   # Extended with all DevTables state
└── (no API routes — everything is client-side)
```

---

# Deliverable B — Repo MVP Analysis

## What the Repo Already Implements (Mapped to DevTables Flows)

| MVP Flow | Existing Coverage | Files |
|----------|------------------|-------|
| **Flow 1: Profile Creation** | **Partial.** Form exists at `/developers/new` with name, title, location, GitHub, bio, technologies, projects, availableForCollab. Missing: cityZone dropdown, roleCategory, experienceLevel, goals, languagePref, LinkedIn, Discord, CoC checkbox. | `src/app/developers/new/page.tsx` |
| **Flow 1: Profile Display** | **Partial.** Profile detail at `/developers/[id]` shows all current fields. Missing: new DevTables fields, privacy-aware display (display name vs full name). | `src/app/developers/[id]/page.tsx` |
| **Flow 1: Developer Directory** | **Yes.** Home page lists all developers in a grid with `DeveloperCard`. Can be adapted as a "Who's coming" view. | `src/app/page.tsx`, `src/components/DeveloperCard.tsx` |
| **Flow 2: Event Listing** | **No.** No events concept exists. | — |
| **Flow 2: Booking** | **No.** No booking concept. The "Apply to Join" on projects is UI-only, not persisted. | — |
| **Flow 3: Matching** | **No.** No matching algorithm. | — |
| **Flow 4: Check-In** | **No.** | — |
| **Flow 5: Icebreakers** | **No.** | — |
| **Flow 6: Last Drinks** | **No.** | — |
| **Flow 7: Feedback + Connect** | **No.** No feedback, no mutual connect, no connection model. | — |
| **Auth** | **No.** No auth system at all. Anyone can create profiles. | — |
| **Admin** | **No.** No admin concept. | — |
| **Trust & Safety** | **No.** No blocking, reporting, or CoC. | — |
| **Tech stack / components** | **Reusable.** `TechBadge`, `Navbar`, DiceBear avatars, Tailwind dark theme, responsive grid layout — all directly reusable. | `src/components/TechBadge.tsx`, `src/components/Navbar.tsx` |
| **State management** | **Reusable.** `DataContext` pattern (createContext + useState + provider) is the exact pattern DevTables will extend. | `src/data/DataContext.tsx` |
| **Type system** | **Reusable.** `Developer` and `OpenProject` interfaces are a starting point. `DevTablesUser` extends `Developer`. | `src/data/types.ts` |
| **Mock data pattern** | **Reusable.** Seeded arrays exported from `mock.ts` with helper functions. DevTables adds more arrays in the same pattern. | `src/data/mock.ts` |

### Coverage Summary

- **Directly reusable**: ~30% (component library, state pattern, type system, styling, avatar system).
- **Needs extension**: ~15% (profile form, developer type, DataContext, Navbar).
- **Completely missing**: ~55% (events, booking, matching, check-in, icebreakers, Last Drinks, feedback, connections, reporting, blocking, admin, dashboard, CoC).

---

## Gaps

### Missing Features

| Gap | Priority | Effort |
|-----|----------|--------|
| Events model + listing + detail pages | P0 | 1 day |
| Booking flow (book/cancel/view) | P0 | 1 day |
| Matching algorithm + admin trigger | P0 | 1.5 days |
| Table assignment view | P0 | 0.5 day |
| Check-in flow | P0 | 0.5 day |
| Icebreaker deck + timer | P0 | 1 day |
| Last Drinks reveal | P1 | 0.5 day |
| Post-event feedback form | P0 | 1 day |
| Mutual connect detection + Connections page | P0 | 1 day |
| Reporting flow | P0 | 0.5 day |
| Blocking logic | P0 | 0.5 day |
| Simulated auth (UserPicker) | P0 | 0.5 day |
| Admin dashboard + metrics | P1 | 1 day |
| Admin event management (matching, check-in view) | P1 | 1 day |
| Extended profile fields | P0 | 0.5 day |
| Code of Conduct page + checkbox | P1 | 0.25 day |
| Dashboard (my bookings, my connections) | P1 | 0.5 day |
| Bilingual toggle (EN/ES prompts) | P2 | 0.5 day |

### Missing Safety / Privacy Controls

| Gap | Risk | Fix |
|-----|------|-----|
| **No authentication** | Anyone can impersonate any user. | Simulated auth via UserPicker dropdown is sufficient for demo. Real auth (NextAuth) for production. |
| **No mutual connect** | Profiles are fully public — any visitor sees all fields including GitHub. | Add privacy layer: display name + tech stack only pre-connect; full profile only after mutual opt-in. |
| **No reporting** | No mechanism to flag bad behavior. | Add report model + form + admin review queue. |
| **No blocking** | No way to prevent co-tabling with a problematic user. | Add block model + integrate into matching constraints. |
| **No CoC** | No behavioral expectations set. | Add CoC page + acceptance checkbox on profile creation. |
| **Full name visible** | `Developer.name` is shown to everyone in current implementation. | Introduce `displayName` (first name only) for pre-connect views. |

---

## Risks

### Security

| Risk | Severity | Mitigation |
|------|----------|------------|
| No auth — data manipulation via DevTools | Medium (demo only) | Acceptable for mock MVP. Flag in README that this is demo-only. |
| PII in mock data (emails, names) | Low | Use clearly fake data (`@example.com`). |
| No input sanitization on profile form | Low | React's JSX escaping handles XSS. No database means no SQL injection. |

### Scalability

| Risk | Severity | Mitigation |
|------|----------|------------|
| In-memory state resets on reload | High (for real use) | Acceptable for demo. v1.1 adds localStorage persistence or real DB. |
| Matching algorithm is O(n * t) where n=users, t=tables | Low | Fine for 30 users. For 100+ would need optimization. |
| DataContext re-renders entire tree on any state change | Medium | Can split into multiple contexts (EventContext, ConnectionContext) if perf degrades. |

### Abuse Vectors

| Risk | Severity | Mitigation |
|------|----------|------------|
| User creates multiple profiles to game matching | Low (mock) | In production: enforce one profile per email/GitHub. In demo: not a concern. |
| Spam reports to harass a user | Low | Admin review queue prevents automated action. Require reason + description. |
| No-show abuse (book but don't attend) | Medium | Track no-show rate per user. v1.1: suspend repeat no-shows. |

### Operational Risks

| Risk | Severity | Mitigation |
|------|----------|------------|
| Venue cancels last-minute | High (real events) | Have backup venue in mock data. In production: venue confirmation 48h before. |
| Odd number of attendees | Low | Algorithm handles tables of 5. Minimum viable table = 5. |
| All users pick same language preference | Low | Algorithm falls back to mixing everyone if constraints infeasible. |

---

## Quick Wins (1-3 Days)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 1 | Add `DevTablesUser` type + extend `types.ts` with all new interfaces | 2h | Foundation for everything |
| 2 | Seed `mock.ts` with 30 users, 5 venues, 4 events, 50 prompts | 3h | Demo data for all flows |
| 3 | Extend `DataContext.tsx` with all new state + actions | 4h | Unblocks all new pages |
| 4 | Add `UserPicker` dropdown to Navbar (simulated auth) | 2h | Enables per-user flow testing |
| 5 | Build `/events` listing page + `EventCard` component | 3h | Core new page |
| 6 | Extend profile creation form with new DevTables fields | 2h | Enriches matching input |

**Total: ~2 days. After this, all new pages can be built against real context state.**

## Medium (1-2 Weeks)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 7 | Event detail + booking flow | 1 day | Core user journey |
| 8 | Matching algorithm (`lib/matching.ts`) + admin trigger page | 1.5 days | Core product value |
| 9 | Table assignment view + check-in flow | 1 day | Event-day experience |
| 10 | Icebreaker deck + timer | 1 day | During-event experience |
| 11 | Feedback form + mutual connect detection | 1.5 days | Post-event value creation |
| 12 | Connections page | 0.5 day | Network value |
| 13 | Reporting + blocking | 1 day | Trust & safety |
| 14 | Admin dashboard + metrics | 1 day | Operations |

## Long (1-2 Months — Production Readiness)

| # | Item | Effort | Impact |
|---|------|--------|--------|
| 15 | Real auth (NextAuth + GitHub OAuth) | 3 days | Required for real users |
| 16 | PostgreSQL + Prisma (persistent storage) | 5 days | Data survives reloads |
| 17 | Email notifications (Resend) | 2 days | Table assignments + reminders |
| 18 | QR code generation + camera scanning | 2 days | Smoother check-in |
| 19 | Real-time check-in (WebSocket or polling) | 2 days | Admin event-day view |
| 20 | Waitlist + auto-promote on cancellation | 1 day | Better capacity management |
| 21 | Mobile-optimized PWA wrapper | 3 days | Better event-day UX |
| 22 | Automated testing (Vitest + React Testing Library) | 5 days | Reliability |
| 23 | CI/CD (GitHub Actions + Vercel preview deploys) | 1 day | Dev velocity |
| 24 | Multi-city support | 3 days | Growth |

---

## Refactor Suggestions

### Folder Structure

The current flat component structure works for 4 components but will get crowded with 15+. Recommended grouping:

```
src/components/
├── common/           # TechBadge, StarRating, CocBanner
├── developers/       # DeveloperCard (existing)
├── projects/         # ProjectCard (existing)
├── events/           # EventCard, TableCard, CheckInForm, LastDrinksCard
├── icebreakers/      # IcebreakerDeck, PromptCard
├── feedback/         # FeedbackForm, ConnectionCard
├── admin/            # AdminEventManager, AdminReportQueue, MetricsDashboard
└── layout/           # Navbar, UserPicker
```

### Domain Boundaries

Split the monolithic `DataContext` into focused contexts to prevent unnecessary re-renders:

```
src/data/
├── types.ts                    # All types (keep unified)
├── mock.ts                     # All mock data (keep unified)
├── AuthContext.tsx              # currentUser, setCurrentUser
├── DeveloperContext.tsx         # developers[], projects[] (existing)
├── EventContext.tsx             # events[], bookings[], tables[]
├── SocialContext.tsx            # feedback[], connections[], reports[], blocks[]
└── PromptsContext.tsx           # prompts[]
```

Wrap them in a single `<Providers>` component in `layout.tsx`.

### Testing Plan

| Layer | Tool | What to Test |
|-------|------|-------------|
| **Unit** | Vitest | Matching algorithm (constraint satisfaction, edge cases: 5 users, 31 users, all same language). Diversity score functions. Mutual connect detection logic. |
| **Component** | Vitest + React Testing Library | FeedbackForm (all states), IcebreakerDeck (prompt navigation, timer), UserPicker (user switching), BookingButton (toggle states). |
| **Integration** | Vitest + RTL | Full flow: create profile → book event → run matching → check in → submit feedback → verify connection created. |
| **E2E** | Playwright (v1.1) | Critical path through the app with browser automation. |

### Deployment

For the mock-data MVP, deployment is trivial:

```bash
# Deploy to Vercel (already supported by repo structure)
npx vercel --prod
```

No environment variables needed. No database to provision. No secrets to manage.

---

## Prioritized Backlog with Acceptance Criteria

| # | Story | Acceptance Criteria | Priority | Sprint |
|---|-------|-------------------|----------|--------|
| 1 | **Add DevTables types to types.ts** | All interfaces from Data Model section exist in `types.ts`. TypeScript compiles without errors. | P0 | S1-D1 |
| 2 | **Seed mock data** | `mock.ts` exports 30 `DevTablesUser` objects (diverse: 6 role categories, 3 experience levels, 3 language prefs, 4 city zones), 5 venues (3 types), 4 events (next 4 Wednesdays), 50 prompts (3 warmup, 4 depth, 3 future per deck). | P0 | S1-D1 |
| 3 | **Extend DataContext** | All new state arrays initialized from mock data. All new actions (add/update/delete/get) work correctly. `currentUser` state works. No TypeScript errors. | P0 | S1-D2 |
| 4 | **Build UserPicker** | Dropdown in Navbar shows all mock users by display name + avatar. Selecting a user sets `currentUser`. "Log out" option resets to null. UI shows logged-in user's name. | P0 | S1-D2 |
| 5 | **Extend profile creation** | Form includes all new fields (cityZone dropdown, roleCategory dropdown, experienceLevel dropdown, goals checkboxes, languagePref radio, linkedinUrl, discordHandle, CoC checkbox). Submitting creates a `DevTablesUser` in context. CoC checkbox is required. | P0 | S1-D3 |
| 6 | **Events listing page** | `/events` shows grid of `EventCard` components. Each card shows date, city zone, venue type, spots remaining (computed), status badge. Cards are sorted by date ascending. Only "open" events show "Book a Seat" button. | P0 | S1-D4 |
| 7 | **Event booking flow** | Clicking "Book a Seat" shows confirmation modal. Confirming creates a `Booking` in context and decrements spots remaining. Button changes to "Cancel Booking." Cancelling removes the booking. `/dashboard` shows "My Bookings" list. | P0 | S1-D4 |
| 8 | **Matching algorithm** | `assignTables()` takes booked users for an event and produces tables of 5-6. No table has blocked pairs. No table has repeat pairs from last 4 events. Language constraints respected. Tables have diverse tech stacks, roles, experience levels. Function runs in < 100ms for 30 users. | P0 | S1-D5 |
| 9 | **Admin matching UI** | `/admin/events/[id]` shows list of booked users. "Run Matching" button calls `assignTables()` and displays results (table cards with members, venue, code). "Publish" button changes event status to "assigned." | P0 | S1-D5 |
| 10 | **Table assignment view** | After matching is published, logged-in user sees their table on `/events/[id]`: venue name + address + map link, tablemates (display name + avatar), check-in code. Users not booked see "Book a Seat." | P0 | S1-D6 |
| 11 | **Check-in** | `/events/[id]/checkin` shows code input field. Entering correct table code marks user as checked in. Wrong code shows error. Already checked-in user sees "Already checked in" message. Admin page shows check-in count per table. | P0 | S1-D7 |
| 12 | **Icebreaker deck** | `/events/[id]/icebreakers` shows norms card first. After dismissing, shows prompt cards one at a time. Round label (Warm-up/Depth/Future) and progress indicator (e.g., 5/10) visible. "Next Prompt" advances. 90-min countdown timer at top. Deck only accessible to checked-in users. | P0 | S2-D8 |
| 13 | **Last Drinks reveal** | After 75 minutes (or admin click), a card appears showing Last Drinks venue name, address, Google Maps link, "Starts in 30 min" text. Visible on icebreaker page and event detail page. | P1 | S2-D9 |
| 14 | **Feedback form** | `/events/[id]/feedback` shows: 5-star event rating, per-tablemate row with avatar + name + connect/neutral/report buttons, optional note per tablemate, optional admin comment textarea. Submit saves all feedback to context. Only accessible after event completes. Only shown to checked-in users. | P0 | S2-D10 |
| 15 | **Mutual connect detection** | After feedback submission, system checks: for each pair where both selected "connect," a `Connection` is created. Toast notification: "You matched with [Name]!" No connection for one-sided votes. "Report" votes create a `Report` entry. | P0 | S2-D11 |
| 16 | **Connections page** | `/connections` lists all mutual connections: avatar, full name, GitHub link, LinkedIn link, event where met, date. "Delete Connection" button soft-deletes (sets `deletedAt`). Empty state: "No connections yet — attend an event!" | P0 | S2-D11 |
| 17 | **Reporting** | Selecting "Report" for a tablemate shows reason dropdown (harassment/no_show/spam/other) + description textarea. Submitting creates `Report` in context. Reporter sees "Report submitted" toast. | P0 | S2-D12 |
| 18 | **Blocking** | User profile page (or connection page) has "Block User" button. Blocking adds to `blocks` array. Blocked users are never co-tabled (verified by matching algorithm). Blocking is silent — blocked party is not notified. | P0 | S2-D12 |
| 19 | **Admin report queue** | `/admin/reports` lists all reports with: reporter name, reported name, reason, description, status. Admin can mark as reviewed/action_taken/dismissed + add admin notes. | P1 | S2-D12 |
| 20 | **User dashboard** | `/dashboard` shows: upcoming bookings (with table assignment if available), past events attended, total connections count, "My Connections" link. | P1 | S2-D13 |
| 21 | **Admin metrics** | `/admin` shows computed metrics: total users, events run, avg attendance rate, avg connection rate, avg event rating, total reports, top technologies across users. | P1 | S2-D13 |
| 22 | **Navbar update** | Navbar shows: DevTables logo, Events, Dashboard (if logged in), Admin (if logged-in user has role "admin"), UserPicker. Active link highlighting. | P0 | S2-D14 |
| 23 | **Code of Conduct** | `/code-of-conduct` static page with rules. Link from profile creation form and from booking confirmation modal. | P1 | S2-D14 |
| 24 | **Responsive polish** | All new pages work on mobile (375px+). Event cards stack vertically. Icebreaker deck is swipeable-feeling (large tap targets). Feedback form is scrollable. | P1 | S2-D14 |
