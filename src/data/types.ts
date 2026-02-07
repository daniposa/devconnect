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
  owner: {
    developerId: string;
    name: string;
    avatar: string;
  };
  contributors: {
    developerId: string;
    name: string;
    avatar: string;
  }[];
  openRoles: string[];
  applicants: number;
  status: "recruiting" | "in-progress" | "launched";
  createdAt: string;
  repoUrl: string;
}

// ── DevTables domain types ──────────────────────────

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

export interface DevTablesUser extends Developer {
  email: string;
  role: "attendee" | "admin" | "venue_partner";
  locale: "es" | "en";
  displayName: string;
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
  title: string;
  eventDate: string;
  startTime: string;
  durationMin: number;
  city: string;
  cityZone: CityZone;
  maxAttendees: number;
  status: EventStatus;
  venueIds: string[];
  lastDrinksVenueId?: string;
  lastDrinksRevealed?: boolean;
  matchingRunAt?: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  userId: string;
  eventId: string;
  status: "confirmed" | "cancelled" | "no_show";
  bookedAt: string;
  cancelledAt?: string;
}

export interface DinnerTable {
  id: string;
  eventId: string;
  venueId: string;
  tableCode: string;
  seatCount: number;
  members: DevTablesUser[];
  checkedIn: string[];
}

export interface Feedback {
  id: string;
  eventId: string;
  giverId: string;
  receiverId?: string;
  eventRating?: number;
  connectVote?: ConnectVote;
  note?: string;
  adminComment?: string;
  createdAt: string;
}

export interface Connection {
  id: string;
  userAId: string;
  userBId: string;
  eventId: string;
  createdAt: string;
  deletedAt?: string;
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
