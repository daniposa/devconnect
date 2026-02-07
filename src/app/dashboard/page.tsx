"use client";

import Image from "next/image";
import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function DashboardPage() {
  const {
    currentUser,
    getBookingsForUser,
    getEventById,
    getConnectionsForUser,
    getUserTable,
    getVenueById,
    events,
  } = useData();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg className="h-16 w-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <p className="mt-4 text-lg font-medium text-text-primary">Log in to see your dashboard</p>
        <p className="mt-1 text-sm text-text-secondary">Sign in to view your bookings, connections, and event history.</p>
      </div>
    );
  }

  const userBookings = getBookingsForUser(currentUser.id);
  const connections = getConnectionsForUser(currentUser.id);

  const upcomingBookings = userBookings.filter((b) => {
    const event = getEventById(b.eventId);
    return event && event.status !== "completed" && event.status !== "cancelled";
  });

  const pastBookings = userBookings.filter((b) => {
    const event = getEventById(b.eventId);
    return event && event.status === "completed";
  });

  const totalEventsAttended = pastBookings.length;
  const totalConnections = connections.length;

  return (
    <div className="mx-auto max-w-4xl">
      {/* User header */}
      <div className="mb-8 flex items-center gap-4">
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h1 className="text-3xl font-bold text-text-primary">{currentUser.name}</h1>
          <p className="text-text-secondary">{currentUser.title}</p>
        </div>
      </div>

      {/* Quick stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Events Attended</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{totalEventsAttended}</p>
        </div>
        <Link
          href="/connections"
          className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-accent/30 hover:bg-surface-hover"
        >
          <p className="text-sm text-text-secondary">Connections</p>
          <p className="mt-1 text-2xl font-bold text-accent">{totalConnections}</p>
          <p className="mt-1 text-xs text-text-secondary">View all &rarr;</p>
        </Link>
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-text-secondary">Upcoming Events</p>
          <p className="mt-1 text-2xl font-bold text-text-primary">{upcomingBookings.length}</p>
        </div>
      </div>

      {/* Upcoming Bookings */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">My Upcoming Bookings</h2>
        {upcomingBookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-text-secondary">No upcoming bookings.</p>
            <Link
              href="/devtables"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Browse events
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingBookings.map((booking) => {
              const event = getEventById(booking.eventId);
              if (!event) return null;

              const table = getUserTable(currentUser.id, event.id);
              const venue = table ? getVenueById(table.venueId) : null;

              return (
                <div
                  key={booking.id}
                  className="rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-surface-hover"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{event.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}{" "}
                        at {event.startTime}
                      </p>
                      {table && venue && (
                        <p className="mt-1 text-sm text-accent">
                          Table {table.tableCode} at {venue.name}
                        </p>
                      )}
                    </div>
                    <span className={`self-start rounded-full px-3 py-1 text-xs font-medium ${statusBadge(event.status)}`}>
                      {event.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Past Events */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-text-primary">Past Events</h2>
        {pastBookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-text-secondary">No past events yet.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pastBookings.map((booking) => {
              const event = getEventById(booking.eventId);
              if (!event) return null;

              return (
                <div
                  key={booking.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">{event.title}</h3>
                      <p className="mt-1 text-sm text-text-secondary">
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className="rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green">
                      completed
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

function statusBadge(status: string): string {
  switch (status) {
    case "open":
      return "bg-green/10 text-green";
    case "closed":
      return "bg-amber/10 text-amber";
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
