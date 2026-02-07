"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function AdminEventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    currentUser,
    getEventById,
    getBookingsForEvent,
    getDevTablesUserById,
    getTablesForEvent,
    getVenueById,
    runMatching,
    checkInUser,
    updateEvent,
  } = useData();

  const [matchingDone, setMatchingDone] = useState(false);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <p className="text-lg font-medium text-text-primary">Admin access required</p>
        <p className="mt-1 text-sm text-text-secondary">You need admin privileges to view this page.</p>
      </div>
    );
  }

  const event = getEventById(id);
  if (!event) return notFound();

  const eventBookings = getBookingsForEvent(event.id);
  const eventTables = getTablesForEvent(event.id);

  const handleRunMatching = () => {
    runMatching(event.id);
    setMatchingDone(true);
  };

  const handleCheckInAll = () => {
    for (const table of eventTables) {
      for (const member of table.members) {
        if (!table.checkedIn.includes(member.id)) {
          checkInUser(table.id, member.id);
        }
      }
    }
  };

  const handleCompleteEvent = () => {
    updateEvent(event.id, { status: "completed" });
  };

  const handleRevealLastDrinks = () => {
    updateEvent(event.id, { lastDrinksRevealed: true });
  };

  const canRunMatching = event.status === "open" || event.status === "closed";
  const canComplete = event.status === "assigned" || event.status === "live";
  const canRevealLastDrinks = !event.lastDrinksRevealed && event.lastDrinksVenueId && (event.status === "live" || event.status === "assigned");

  return (
    <div className="mx-auto max-w-6xl">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to admin
      </Link>

      {/* Event header */}
      <div className="mb-8 rounded-xl border border-border bg-surface p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{event.title}</h1>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusBadge(event.status)}`}>
                {event.status}
              </span>
            </div>
            <p className="mt-2 text-text-secondary">
              {new Date(event.eventDate).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}{" "}
              at {event.startTime} ({event.durationMin} min)
            </p>
            <p className="mt-1 text-sm text-text-secondary">
              {event.city} &middot; {event.cityZone} &middot; Max {event.maxAttendees} attendees
            </p>
            {event.matchingRunAt && (
              <p className="mt-1 text-xs text-accent">
                Matching ran at {new Date(event.matchingRunAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {canRunMatching && (
              <button
                onClick={handleRunMatching}
                className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Run Matching
              </button>
            )}
            {eventTables.length > 0 && (
              <button
                onClick={handleCheckInAll}
                className="rounded-lg border border-border bg-surface-hover px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Check In All (Demo)
              </button>
            )}
            {canRevealLastDrinks && (
              <button
                onClick={handleRevealLastDrinks}
                className="rounded-lg border border-amber/50 bg-amber/10 px-4 py-2 text-sm font-medium text-amber transition-colors hover:bg-amber/20"
              >
                Reveal Last Drinks
              </button>
            )}
            {canComplete && (
              <button
                onClick={handleCompleteEvent}
                className="rounded-lg border border-green/50 bg-green/10 px-4 py-2 text-sm font-medium text-green transition-colors hover:bg-green/20"
              >
                Complete Event
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Bookings */}
      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-text-primary">
          Bookings ({eventBookings.length})
        </h2>
        {eventBookings.length === 0 ? (
          <div className="rounded-xl border border-border bg-surface p-8 text-center">
            <p className="text-text-secondary">No bookings yet for this event.</p>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-surface overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 font-medium text-text-secondary">User</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Role</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Experience</th>
                    <th className="px-4 py-3 font-medium text-text-secondary">Booked At</th>
                  </tr>
                </thead>
                <tbody>
                  {eventBookings.map((booking) => {
                    const user = getDevTablesUserById(booking.userId);
                    if (!user) return null;

                    return (
                      <tr key={booking.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={user.avatar}
                              alt={user.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                            <div>
                              <p className="font-medium text-text-primary">{user.name}</p>
                              <p className="text-xs text-text-secondary">{user.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-text-secondary">{user.roleCategory}</td>
                        <td className="px-4 py-3 text-text-secondary">{user.experienceLevel}</td>
                        <td className="px-4 py-3 text-text-secondary">
                          {new Date(booking.bookedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>

      {/* Tables */}
      {eventTables.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-text-primary">
            Tables ({eventTables.length})
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {eventTables.map((table) => {
              const venue = getVenueById(table.venueId);
              const checkedInCount = table.checkedIn.length;
              const totalMembers = table.members.length;

              return (
                <div
                  key={table.id}
                  className="rounded-xl border border-border bg-surface p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-text-primary">
                        Table {table.tableCode}
                      </h3>
                      {venue && (
                        <p className="text-sm text-text-secondary">{venue.name}</p>
                      )}
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        checkedInCount === totalMembers
                          ? "bg-green/10 text-green"
                          : "bg-amber/10 text-amber"
                      }`}
                    >
                      {checkedInCount}/{totalMembers} checked in
                    </span>
                  </div>
                  <div className="space-y-2">
                    {table.members.map((member) => {
                      const isCheckedIn = table.checkedIn.includes(member.id);
                      return (
                        <div
                          key={member.id}
                          className="flex items-center gap-3 rounded-lg border border-border px-3 py-2"
                        >
                          <Image
                            src={member.avatar}
                            alt={member.name}
                            width={28}
                            height={28}
                            className="rounded-full"
                          />
                          <span className="flex-1 text-sm text-text-primary">{member.name}</span>
                          {isCheckedIn ? (
                            <span className="text-xs text-green">Checked in</span>
                          ) : (
                            <button
                              onClick={() => checkInUser(table.id, member.id)}
                              className="rounded bg-surface-hover px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-accent hover:text-white"
                            >
                              Check in
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}
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
