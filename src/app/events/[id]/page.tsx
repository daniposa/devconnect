"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/data/DataContext";

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
  assigned: "Tables Assigned",
  live: "Live Now",
  completed: "Completed",
  cancelled: "Cancelled",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function formatCityZone(zone: string): string {
  return zone.charAt(0).toUpperCase() + zone.slice(1);
}

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    getEventById,
    currentUser,
    getBookingsForEvent,
    isUserBooked,
    addBooking,
    cancelBooking,
    getUserTable,
    getVenueById,
    hasUserSubmittedFeedback,
  } = useData();

  const event = getEventById(id);
  if (!event) return notFound();

  const confirmedBookings = getBookingsForEvent(event.id);
  const spotsRemaining = event.maxAttendees - confirmedBookings.length;
  const booked =
    currentUser !== null && isUserBooked(currentUser.id, event.id);
  const userTable =
    currentUser !== null ? getUserTable(currentUser.id, event.id) : undefined;
  const isCheckedIn =
    userTable !== undefined && currentUser !== null
      ? userTable.checkedIn.includes(currentUser.id)
      : false;
  const feedbackSubmitted =
    currentUser !== null && hasUserSubmittedFeedback(currentUser.id, event.id);

  const tableVenue =
    userTable !== undefined ? getVenueById(userTable.venueId) : undefined;
  const lastDrinksVenue =
    event.lastDrinksVenueId
      ? getVenueById(event.lastDrinksVenueId)
      : undefined;

  const showTableAssignment =
    (event.status === "assigned" ||
      event.status === "live" ||
      event.status === "completed") &&
    userTable !== undefined;

  function handleBook() {
    if (!currentUser) return;
    addBooking({
      id: `booking-${Date.now()}`,
      userId: currentUser.id,
      eventId: event.id,
      status: "confirmed",
      bookedAt: new Date().toISOString(),
    });
  }

  function handleCancel() {
    if (!currentUser) return;
    cancelBooking(currentUser.id, event.id);
  }

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/events"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
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
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to events
      </Link>

      {/* Event header */}
      <div className="rounded-xl border border-border bg-surface p-8">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold text-text-primary">
            {event.title}
          </h1>
          <span
            className={`rounded-full border px-3 py-1 text-sm font-medium ${statusStyles[event.status] || statusStyles.draft}`}
          >
            {statusLabels[event.status] || event.status}
          </span>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="space-y-3 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-accent"
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
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>
                {event.startTime} &middot; {event.durationMin} min
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-accent"
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
              <span>
                {event.city.charAt(0).toUpperCase() + event.city.slice(1)},{" "}
                {formatCityZone(event.cityZone)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-accent"
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
                {confirmedBookings.length} / {event.maxAttendees} booked
                {spotsRemaining > 0 && (
                  <span className="ml-1 text-green">
                    ({spotsRemaining} spots left)
                  </span>
                )}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-sm text-text-secondary">
            <p>Free &mdash; split the bill at the restaurant.</p>
            <p>
              You&apos;ll be matched with 5 other developers at a table based on
              shared interests and complementary skills.
            </p>
          </div>
        </div>

        {/* Booking section */}
        <div className="mt-6 border-t border-border pt-6">
          {currentUser ? (
            booked ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-2 text-sm font-medium text-green">
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  You&apos;re booked!
                </span>
                {event.status === "open" && (
                  <button
                    onClick={handleCancel}
                    className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition-colors hover:bg-red-500/20"
                  >
                    Cancel Booking
                  </button>
                )}
              </div>
            ) : event.status === "open" && spotsRemaining > 0 ? (
              <button
                onClick={handleBook}
                className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
              >
                Book a Seat
              </button>
            ) : (
              <button
                disabled
                className="cursor-not-allowed rounded-lg bg-surface-hover px-6 py-2.5 text-sm font-medium text-text-secondary"
              >
                {spotsRemaining <= 0 ? "Fully Booked" : "Booking Closed"}
              </button>
            )
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-lg bg-surface-hover px-6 py-2.5 text-sm font-medium text-text-secondary"
            >
              Log in to book
            </button>
          )}
        </div>
      </div>

      {/* Table assignment section */}
      {showTableAssignment && tableVenue && currentUser && (
        <div className="mt-6 rounded-xl border border-accent/30 bg-surface p-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Your Table Assignment
          </h2>

          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3">
              <svg
                className="mt-0.5 h-5 w-5 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <div>
                <p className="font-medium text-text-primary">
                  {tableVenue.name}
                </p>
                <p className="text-sm text-text-secondary">
                  {tableVenue.address}
                </p>
                <a
                  href={tableVenue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
                >
                  Open in Maps
                  <svg
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Table code */}
            <div className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
              <span className="text-sm text-text-secondary">
                Check-in Code:
              </span>
              <span className="font-mono text-2xl font-bold tracking-widest text-accent">
                {userTable.tableCode}
              </span>
            </div>

            {/* Tablemates */}
            <div>
              <p className="mb-2 text-sm font-medium text-text-secondary">
                Your tablemates
              </p>
              <div className="flex flex-wrap gap-3">
                {userTable.members
                  .filter((m) => m.id !== currentUser.id)
                  .map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2"
                    >
                      <Image
                        src={member.avatar}
                        alt={member.displayName}
                        width={28}
                        height={28}
                        className="rounded-full"
                      />
                      <span className="text-sm text-text-primary">
                        {member.displayName}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Action links */}
            <div className="flex flex-wrap gap-3 pt-2">
              {!isCheckedIn && (
                <Link
                  href={`/events/${event.id}/checkin`}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Check In
                </Link>
              )}
              {isCheckedIn && (
                <Link
                  href={`/events/${event.id}/icebreakers`}
                  className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                >
                  Open Icebreakers
                </Link>
              )}
              {event.status === "completed" && isCheckedIn && !feedbackSubmitted && (
                <Link
                  href={`/events/${event.id}/feedback`}
                  className="rounded-lg border border-accent/30 bg-accent/10 px-4 py-2 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
                >
                  Leave Feedback
                </Link>
              )}
              {feedbackSubmitted && (
                <span className="flex items-center gap-2 rounded-lg border border-green/30 bg-green/10 px-4 py-2 text-sm font-medium text-green">
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  Feedback submitted
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Last Drinks reveal */}
      {event.lastDrinksRevealed && lastDrinksVenue && (
        <div className="mt-6 rounded-xl border border-amber/30 bg-surface p-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10">
              <svg
                className="h-5 w-5 text-amber"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">
                Last Drinks
              </h2>
              <p className="text-sm text-text-secondary">
                All tables meet up for drinks after dinner
              </p>
            </div>
          </div>
          <div className="mt-4 rounded-lg border border-border bg-background p-4">
            <p className="font-medium text-text-primary">
              {lastDrinksVenue.name}
            </p>
            <p className="text-sm text-text-secondary">
              {lastDrinksVenue.address}
            </p>
            <a
              href={lastDrinksVenue.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover transition-colors"
            >
              Open in Maps
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
