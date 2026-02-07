import { DevTablesUser, DinnerTable, Venue } from "@/data/types";

export interface MatchingInput {
  bookedUsers: DevTablesUser[];
  venues: Venue[];
  recentPairs: Set<string>;
  blockedPairs: Set<string>;
  eventId: string;
}

export interface MatchingResult {
  tables: DinnerTable[];
  unassigned: DevTablesUser[];
}

function pairKey(a: string, b: string): string {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

function distributeSizes(n: number, target: number, min: number): number[] {
  if (n <= 0) return [];
  if (n < min) return [n];
  const result: number[] = [];
  let remaining = n;
  while (remaining > 0) {
    if (remaining >= target + min) {
      result.push(target);
      remaining -= target;
    } else if (remaining >= 2 * min) {
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
    (m) => m.languagePref !== "either" && m.languagePref !== user.languagePref
  );
  return conflicting.length < table.length / 2;
}

export function assignTables(input: MatchingInput): MatchingResult {
  const { bookedUsers, venues, recentPairs, blockedPairs, eventId } = input;

  const dinnerVenues = venues.filter((v) => v.tablesAvailable > 0);
  if (dinnerVenues.length === 0 || bookedUsers.length === 0) {
    return { tables: [], unassigned: [...bookedUsers] };
  }

  const sizes = distributeSizes(bookedUsers.length, 6, 5);
  const tables: DinnerTable[] = sizes.map((size, i) => ({
    id: `table-${Date.now()}-${i}`,
    eventId,
    venueId: dinnerVenues[i % dinnerVenues.length].id,
    tableCode: `MESA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
    seatCount: size,
    members: [],
    checkedIn: [],
  }));

  const shuffled = [...bookedUsers].sort(() => Math.random() - 0.5);
  const constrained = shuffled.filter((u) => u.languagePref !== "either");
  const flexible = shuffled.filter((u) => u.languagePref === "either");
  const ordered = [...constrained, ...flexible];

  const unassigned: DevTablesUser[] = [];

  for (const user of ordered) {
    let bestTableIdx = -1;
    let bestScore = -Infinity;

    for (let i = 0; i < tables.length; i++) {
      const table = tables[i];
      if (table.members.length >= table.seatCount) continue;

      const hasRecentPair = table.members.some((m) =>
        recentPairs.has(pairKey(user.id, m.id))
      );
      if (hasRecentPair) continue;

      const hasBlockedPair = table.members.some((m) =>
        blockedPairs.has(pairKey(user.id, m.id))
      );
      if (hasBlockedPair) continue;

      if (!languageCompatible(user, table.members)) continue;

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
    } else {
      const smallest = tables.reduce(
        (minIdx, t, idx, arr) =>
          t.members.length < arr[minIdx].members.length ? idx : minIdx,
        0
      );
      tables[smallest].members.push(user);
    }
  }

  return { tables, unassigned };
}
