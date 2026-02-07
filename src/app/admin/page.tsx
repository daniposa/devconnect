"use client";

import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function AdminDashboardPage() {
  const {
    currentUser,
    devTablesUsers,
    events,
    bookings,
    connections,
    reports,
    getBookingsForEvent,
  } = useData();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg className="h-16 w-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0-10.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.75c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.25-8.25-3.286ZM12 15h.008v.008H12V15Z" />
        </svg>
        <p className="mt-4 text-lg font-medium text-text-primary">Admin access required</p>
        <p className="mt-1 text-sm text-text-secondary">You need admin privileges to view this page.</p>
      </div>
    );
  }

  const totalUsers = devTablesUsers.length;
  const totalEvents = events.length;
  const totalConnections = connections.filter((c) => !c.deletedAt).length;
  const pendingReports = reports.filter((r) => r.status === "pending").length;

  // Calculate average attendance rate across completed events
  const completedEvents = events.filter((e) => e.status === "completed");
  const avgAttendance =
    completedEvents.length > 0
      ? Math.round(
          completedEvents.reduce((sum, e) => {
            const eventBookings = getBookingsForEvent(e.id);
            return sum + (e.maxAttendees > 0 ? (eventBookings.length / e.maxAttendees) * 100 : 0);
          }, 0) / completedEvents.length
        )
      : 0;

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Admin Dashboard</h1>
          <p className="mt-2 text-text-secondary">Manage events, users, and platform operations.</p>
        </div>
        <Link
          href="/admin/reports"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5" />
          </svg>
          Reports Queue
          {pendingReports > 0 && (
            <span className="ml-1 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
              {pendingReports}
            </span>
          )}
        </Link>
      </div>

      {/* Metrics */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{totalUsers}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Total Events</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{totalEvents}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Avg Attendance</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{avgAttendance}%</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Total Connections</p>
          <p className="mt-1 text-2xl font-bold text-accent">{totalConnections}</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Reports Pending</p>
          <p className={`mt-1 text-2xl font-bold ${pendingReports > 0 ? "text-amber" : "text-green"}`}>
            {pendingReports}
          </p>
        </div>
      </div>

      {/* Events list */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-text-primary">All Events</h2>
        <div className="space-y-3">
          {events.map((event) => {
            const eventBookings = getBookingsForEvent(event.id);

            return (
              <Link
                key={event.id}
                href={`/admin/events/${event.id}`}
                className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-text-primary">{event.title}</h3>
                    <p className="mt-1 text-sm text-text-secondary">
                      {new Date(event.eventDate).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}{" "}
                      at {event.startTime}
                    </p>
                    <p className="mt-0.5 text-sm text-text-secondary">
                      {eventBookings.length} / {event.maxAttendees} booked
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(event.status)}`}>
                      {event.status}
                    </span>
                    <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function statusBadge(status: string): string {
  switch (status) {
    case "draft":
      return "bg-surface-hover text-text-secondary";
    case "open":
      return "bg-green/10 text-green";
    case "closed":
      return "bg-amber/10 text-amber";
    case "matching":
      return "bg-purple-500/10 text-purple-400";
    case "assigned":
      return "bg-accent/10 text-accent";
    case "live":
      return "bg-cyan-500/10 text-cyan-400";
    case "completed":
      return "bg-green/10 text-green";
    case "cancelled":
      return "bg-red-500/10 text-red-400";
    default:
      return "bg-surface-hover text-text-secondary";
  }
}
