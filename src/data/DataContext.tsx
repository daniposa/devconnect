"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import {
  Developer, OpenProject, DevTablesUser, Venue, DevTablesEvent,
  Booking, DinnerTable, Feedback, Connection, Report, Block,
  IcebreakerPrompt,
} from "./types";
import {
  developers as initialDevelopers, openProjects as initialProjects,
  devTablesUsers as initialDTUsers, venues as initialVenues,
  devTablesEvents as initialEvents, icebreakerPrompts as initialPrompts,
  initialBookings, initialTables, initialFeedback, initialConnections,
  initialReports, initialBlocks,
} from "./mock";
import { assignTables } from "@/lib/matching";

function pairKey(a: string, b: string): string {
  return a < b ? `${a}:${b}` : `${b}:${a}`;
}

interface DataContextType {
  // Existing
  developers: Developer[];
  projects: OpenProject[];
  addDeveloper: (dev: Developer) => void;
  addProject: (proj: OpenProject) => void;
  getDeveloperById: (id: string) => Developer | undefined;
  getProjectById: (id: string) => OpenProject | undefined;
  // DevTables
  currentUser: DevTablesUser | null;
  setCurrentUser: (user: DevTablesUser | null) => void;
  devTablesUsers: DevTablesUser[];
  addDevTablesUser: (user: DevTablesUser) => void;
  getDevTablesUserById: (id: string) => DevTablesUser | undefined;
  venues: Venue[];
  getVenueById: (id: string) => Venue | undefined;
  events: DevTablesEvent[];
  addEvent: (event: DevTablesEvent) => void;
  updateEvent: (id: string, updates: Partial<DevTablesEvent>) => void;
  getEventById: (id: string) => DevTablesEvent | undefined;
  bookings: Booking[];
  addBooking: (booking: Booking) => void;
  cancelBooking: (userId: string, eventId: string) => void;
  getBookingsForEvent: (eventId: string) => Booking[];
  getBookingsForUser: (userId: string) => Booking[];
  isUserBooked: (userId: string, eventId: string) => boolean;
  tables: DinnerTable[];
  setTablesForEvent: (eventId: string, newTables: DinnerTable[]) => void;
  getTablesForEvent: (eventId: string) => DinnerTable[];
  getUserTable: (userId: string, eventId: string) => DinnerTable | undefined;
  checkInUser: (tableId: string, userId: string) => void;
  feedback: Feedback[];
  addFeedback: (fb: Feedback) => void;
  addFeedbackBatch: (fbs: Feedback[]) => void;
  getFeedbackForEvent: (eventId: string) => Feedback[];
  hasUserSubmittedFeedback: (userId: string, eventId: string) => boolean;
  connections: Connection[];
  addConnection: (conn: Connection) => void;
  deleteConnection: (connId: string) => void;
  getConnectionsForUser: (userId: string) => Connection[];
  isConnected: (userA: string, userB: string) => boolean;
  reports: Report[];
  addReport: (report: Report) => void;
  updateReport: (id: string, updates: Partial<Report>) => void;
  blocks: Block[];
  addBlock: (block: Block) => void;
  isBlocked: (userA: string, userB: string) => boolean;
  prompts: IcebreakerPrompt[];
  getPromptsForEvent: (count?: number) => IcebreakerPrompt[];
  runMatching: (eventId: string) => DinnerTable[];
  detectMutualConnects: (eventId: string) => Connection[];
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  // Existing state
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers);
  const [projects, setProjects] = useState<OpenProject[]>(initialProjects);

  // DevTables state
  const [currentUser, setCurrentUser] = useState<DevTablesUser | null>(null);
  const [devTablesUsers, setDevTablesUsers] = useState<DevTablesUser[]>(initialDTUsers);
  const [venuesList] = useState<Venue[]>(initialVenues);
  const [events, setEvents] = useState<DevTablesEvent[]>(initialEvents);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [tables, setTables] = useState<DinnerTable[]>(initialTables);
  const [feedback, setFeedback] = useState<Feedback[]>(initialFeedback);
  const [connections, setConnections] = useState<Connection[]>(initialConnections);
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
  const [prompts] = useState<IcebreakerPrompt[]>(initialPrompts);

  // Existing actions
  const addDeveloper = (dev: Developer) => setDevelopers((prev) => [dev, ...prev]);
  const addProject = (proj: OpenProject) => setProjects((prev) => [proj, ...prev]);
  const getDeveloperById = (id: string) => developers.find((d) => d.id === id);
  const getProjectById = (id: string) => projects.find((p) => p.id === id);

  // DevTables actions
  const addDevTablesUser = (user: DevTablesUser) => setDevTablesUsers((prev) => [user, ...prev]);
  const getDevTablesUserById = (id: string) => devTablesUsers.find((u) => u.id === id);
  const getVenueById = (id: string) => venuesList.find((v) => v.id === id);

  const addEvent = (event: DevTablesEvent) => setEvents((prev) => [...prev, event]);
  const updateEvent = (id: string, updates: Partial<DevTablesEvent>) =>
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updates } : e)));
  const getEventById = (id: string) => events.find((e) => e.id === id);

  const addBooking = (booking: Booking) => setBookings((prev) => [...prev, booking]);
  const cancelBooking = (userId: string, eventId: string) =>
    setBookings((prev) => prev.filter((b) => !(b.userId === userId && b.eventId === eventId && b.status === "confirmed")));
  const getBookingsForEvent = useCallback((eventId: string) => bookings.filter((b) => b.eventId === eventId && b.status === "confirmed"), [bookings]);
  const getBookingsForUser = useCallback((userId: string) => bookings.filter((b) => b.userId === userId && b.status === "confirmed"), [bookings]);
  const isUserBooked = (userId: string, eventId: string) =>
    bookings.some((b) => b.userId === userId && b.eventId === eventId && b.status === "confirmed");

  const setTablesForEvent = (eventId: string, newTables: DinnerTable[]) =>
    setTables((prev) => [...prev.filter((t) => t.eventId !== eventId), ...newTables]);
  const getTablesForEvent = useCallback((eventId: string) => tables.filter((t) => t.eventId === eventId), [tables]);
  const getUserTable = (userId: string, eventId: string) =>
    tables.find((t) => t.eventId === eventId && t.members.some((m) => m.id === userId));
  const checkInUser = (tableId: string, userId: string) =>
    setTables((prev) =>
      prev.map((t) =>
        t.id === tableId && !t.checkedIn.includes(userId)
          ? { ...t, checkedIn: [...t.checkedIn, userId] }
          : t
      )
    );

  const addFeedback = (fb: Feedback) => setFeedback((prev) => [...prev, fb]);
  const addFeedbackBatch = (fbs: Feedback[]) => setFeedback((prev) => [...prev, ...fbs]);
  const getFeedbackForEvent = useCallback((eventId: string) => feedback.filter((f) => f.eventId === eventId), [feedback]);
  const hasUserSubmittedFeedback = (userId: string, eventId: string) =>
    feedback.some((f) => f.giverId === userId && f.eventId === eventId);

  const addConnection = (conn: Connection) => setConnections((prev) => [...prev, conn]);
  const deleteConnection = (connId: string) =>
    setConnections((prev) =>
      prev.map((c) => (c.id === connId ? { ...c, deletedAt: new Date().toISOString() } : c))
    );
  const getConnectionsForUser = useCallback(
    (userId: string) =>
      connections.filter(
        (c) => !c.deletedAt && (c.userAId === userId || c.userBId === userId)
      ),
    [connections]
  );
  const isConnected = (userA: string, userB: string) => {
    const [a, b] = userA < userB ? [userA, userB] : [userB, userA];
    return connections.some((c) => !c.deletedAt && c.userAId === a && c.userBId === b);
  };

  const addReport = (report: Report) => setReports((prev) => [...prev, report]);
  const updateReport = (id: string, updates: Partial<Report>) =>
    setReports((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r)));

  const addBlock = (block: Block) => setBlocks((prev) => [...prev, block]);
  const isBlocked = (userA: string, userB: string) => {
    return blocks.some(
      (b) =>
        (b.blockerId === userA && b.blockedId === userB) ||
        (b.blockerId === userB && b.blockedId === userA)
    );
  };

  const getPromptsForEvent = (count: number = 10) => {
    const warmup = prompts.filter((p) => p.round === "warmup" && p.isActive);
    const depth = prompts.filter((p) => p.round === "depth" && p.isActive);
    const future = prompts.filter((p) => p.round === "future" && p.isActive);
    const pick = (arr: IcebreakerPrompt[], n: number) =>
      [...arr].sort(() => Math.random() - 0.5).slice(0, n);
    return [...pick(warmup, 3), ...pick(depth, 4), ...pick(future, 3)].slice(0, count);
  };

  const runMatching = (eventId: string): DinnerTable[] => {
    const eventBookings = bookings.filter((b) => b.eventId === eventId && b.status === "confirmed");
    const bookedUsers = eventBookings
      .map((b) => devTablesUsers.find((u) => u.id === b.userId))
      .filter(Boolean) as DevTablesUser[];

    const event = events.find((e) => e.id === eventId);
    if (!event) return [];

    const eventVenues = venuesList.filter((v) => event.venueIds.includes(v.id));

    // Build recent pairs from last 4 events' tables
    const completedEvents = events.filter((e) => e.status === "completed" || e.status === "assigned" || e.status === "live");
    const recentEventIds = completedEvents.slice(-4).map((e) => e.id);
    const recentPairs = new Set<string>();
    for (const t of tables) {
      if (recentEventIds.includes(t.eventId)) {
        for (let i = 0; i < t.members.length; i++) {
          for (let j = i + 1; j < t.members.length; j++) {
            recentPairs.add(pairKey(t.members[i].id, t.members[j].id));
          }
        }
      }
    }

    // Build blocked pairs
    const blockedPairs = new Set<string>();
    for (const b of blocks) {
      blockedPairs.add(pairKey(b.blockerId, b.blockedId));
    }

    const result = assignTables({
      bookedUsers,
      venues: eventVenues,
      recentPairs,
      blockedPairs,
      eventId,
    });

    setTablesForEvent(eventId, result.tables);
    updateEvent(eventId, { status: "assigned", matchingRunAt: new Date().toISOString() });

    return result.tables;
  };

  const detectMutualConnects = (eventId: string): Connection[] => {
    const eventFeedback = feedback.filter((f) => f.eventId === eventId && f.receiverId);
    const newConnections: Connection[] = [];

    for (const fb of eventFeedback) {
      if (fb.connectVote !== "connect" || !fb.receiverId) continue;

      // Check if the other person also voted connect
      const mutual = eventFeedback.find(
        (f) =>
          f.giverId === fb.receiverId &&
          f.receiverId === fb.giverId &&
          f.connectVote === "connect"
      );

      if (mutual) {
        const [userAId, userBId] =
          fb.giverId < fb.receiverId
            ? [fb.giverId, fb.receiverId]
            : [fb.receiverId, fb.giverId];

        // Check if connection already exists
        const exists = connections.some(
          (c) => c.userAId === userAId && c.userBId === userBId && !c.deletedAt
        );
        const alreadyQueued = newConnections.some(
          (c) => c.userAId === userAId && c.userBId === userBId
        );

        if (!exists && !alreadyQueued) {
          newConnections.push({
            id: `conn-${Date.now()}-${userAId}-${userBId}`,
            userAId,
            userBId,
            eventId,
            createdAt: new Date().toISOString(),
          });
        }
      }
    }

    if (newConnections.length > 0) {
      setConnections((prev) => [...prev, ...newConnections]);
    }

    return newConnections;
  };

  return (
    <DataContext.Provider
      value={{
        developers, projects, addDeveloper, addProject, getDeveloperById, getProjectById,
        currentUser, setCurrentUser,
        devTablesUsers, addDevTablesUser, getDevTablesUserById,
        venues: venuesList, getVenueById,
        events, addEvent, updateEvent, getEventById,
        bookings, addBooking, cancelBooking, getBookingsForEvent, getBookingsForUser, isUserBooked,
        tables, setTablesForEvent, getTablesForEvent, getUserTable, checkInUser,
        feedback, addFeedback, addFeedbackBatch, getFeedbackForEvent, hasUserSubmittedFeedback,
        connections, addConnection, deleteConnection, getConnectionsForUser, isConnected,
        reports, addReport, updateReport,
        blocks, addBlock, isBlocked,
        prompts, getPromptsForEvent,
        runMatching, detectMutualConnects,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
