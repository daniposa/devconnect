"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useData } from "@/data/DataContext";
import type { DevTablesEvent } from "@/data/types";

const statusStyles: Record<string, string> = {
  draft: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  open: "bg-green/10 text-green border-green/20",
  closed: "bg-amber/10 text-amber border-amber/20",
  matching: "bg-accent/10 text-accent border-accent/20",
  assigned: "bg-accent/10 text-accent border-accent/20",
  live: "bg-green/10 text-green border-green/20",
  completed: "bg-gray-500/10 text-gray-400 border-gray-500/20",
  cancelled: "bg-red-500/10 text-red-400 border-red-500/20",
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  open: "Open",
  closed: "Closed",
  matching: "Matching",
  assigned: "Assigned",
  live: "Live",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function formatCityZone(zone: string): string {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
}

export default function EventsPage() {
  const {
    events,
    currentUser,
    getBookingsForEvent,
    isUserBooked,
    addBooking,
    cancelBooking,
  } = useData();

  const sortedEvents = useMemo(
    () =>
      [...events].sort(
        (a, b) =>
          new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime()
      ),
    [events]
  );

  function handleBook(event: DevTablesEvent) {
    if (!currentUser) return;
    addBooking({
      id: `booking-${Date.now()}`,
      userId: currentUser.id,
      eventId: event.id,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    });
  }

  function handleCancel(eventId: string) {
    if (!currentUser) return;
    cancelBooking(currentUser.id, eventId);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">
          Upcoming Dinners
        </h1>
        <p className="mt-2 text-text-secondary">
          Small-group dinners for developers in Medellin. Book a seat, get
          matched, and meet your next collaborator.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sortedEvents.map((event) => {
          const confirmedBookings = getBookingsForEvent(event.id);
          const spotsRemaining =
            event.maxAttendees - confirmedBookings.length;
          const booked =
            currentUser !== null && isUserBooked(currentUser.id, event.id);

          return (
            <div
              key={event.id}
              className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:bg-surface-hover"
            >
              <div className="flex items-start justify-between">
                <Link href={`/events/${event.id}`}>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                    {event.title}
                  </h3>
                </Link>
                <span
                  className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[event.status] || statusStyles.draft}`}
                >
                  {statusLabels[event.status] || event.status}
                </span>
              </div>

              <div className="mt-4 space-y-2 text-sm text-text-secondary">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>{formatDate(event.eventDate)}</span>
                  <span className="text-text-secondary/60">
                    {event.startTime}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>{formatCityZone(event.cityZone)}</span>
                </div>

                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>
                    {spotsRemaining > 0
                      ? `${spotsRemaining} spots remaining`
                      : "Fully booked"}
                  </span>
                </div>
              </div>

              <p className="mt-3 text-xs text-text-secondary/60">
                Free &mdash; split the bill
              </p>

              <div className="mt-4">
                {currentUser ? (
                  booked ? (
                    <button
                      onClick={() => handleCancel(event.id)}
                      className="w-full rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                    >
                      Cancel Booking
                    </button>
                  ) : event.status === "open" && spotsRemaining > 0 ? (
                    <button
                      onClick={() => handleBook(event)}
                      className="w-full rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      Book a Seat
                    </button>
                  ) : (
                    <button
                      disabled
                      className="w-full cursor-not-allowed rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-text-secondary"
                    >
                      {spotsRemaining <= 0 ? "Fully Booked" : "Booking Closed"}
                    </button>
                  )
                ) : (
                  <button
                    disabled
                    className="w-full cursor-not-allowed rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-text-secondary"
                  >
                    Log in to book
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
