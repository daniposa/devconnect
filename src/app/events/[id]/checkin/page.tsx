"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function CheckInPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    getEventById,
    currentUser,
    isUserBooked,
    getUserTable,
    checkInUser,
  } = useData();

  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const event = getEventById(id);
  if (!event) return notFound();

  const booked =
    currentUser !== null && isUserBooked(currentUser.id, event.id);
  const userTable =
    currentUser !== null ? getUserTable(currentUser.id, event.id) : undefined;
  const alreadyCheckedIn =
    userTable !== undefined && currentUser !== null
      ? userTable.checkedIn.includes(currentUser.id)
      : false;

  function handleCheckIn() {
    setError("");

    if (!currentUser) {
      setError("You must be logged in to check in.");
      return;
    }

    if (!booked) {
      setError("You don't have a booking for this event.");
      return;
    }

    if (!userTable) {
      setError("No table assignment found. Please wait for table matching.");
      return;
    }

    if (code.toUpperCase() !== userTable.tableCode.toUpperCase()) {
      setError("Invalid code. Please check the code on your table and try again.");
      return;
    }

    checkInUser(userTable.id, currentUser.id);
    setSuccess(true);
  }

  return (
    <div className="mx-auto max-w-lg">
      <Link
        href={`/events/${event.id}`}
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
        Back to event
      </Link>

      <div className="rounded-xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-bold text-text-primary">Check In</h1>
        <p className="mt-2 text-sm text-text-secondary">{event.title}</p>

        {!currentUser && (
          <div className="mt-6 rounded-lg border border-amber/30 bg-amber/10 p-4 text-sm text-amber">
            You must be logged in to check in.
          </div>
        )}

        {currentUser && !booked && (
          <div className="mt-6 rounded-lg border border-amber/30 bg-amber/10 p-4 text-sm text-amber">
            You don&apos;t have a booking for this event.
          </div>
        )}

        {alreadyCheckedIn && !success && (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-lg border border-green/30 bg-green/10 p-4">
              <svg
                className="h-6 w-6 text-green"
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
              <span className="font-medium text-green">
                Already checked in!
              </span>
            </div>
            <Link
              href={`/events/${event.id}/icebreakers`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Go to Icebreakers
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}

        {success && (
          <div className="mt-6">
            <div className="flex items-center gap-3 rounded-lg border border-green/30 bg-green/10 p-4">
              <svg
                className="h-8 w-8 text-green"
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
              <span className="text-lg font-semibold text-green">
                You&apos;re checked in!
              </span>
            </div>
            <Link
              href={`/events/${event.id}/icebreakers`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Go to Icebreakers
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
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        )}

        {currentUser && booked && !alreadyCheckedIn && !success && (
          <div className="mt-6">
            <label
              htmlFor="table-code"
              className="block text-sm font-medium text-text-secondary"
            >
              Enter the 4-character code displayed at your table
            </label>
            <input
              id="table-code"
              type="text"
              maxLength={4}
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              placeholder="XXXX"
              className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-center font-mono text-2xl font-bold tracking-widest text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
            />

            {error && (
              <div className="mt-3 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400">
                <svg
                  className="h-4 w-4 shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <button
              onClick={handleCheckIn}
              disabled={code.length < 4}
              className={`mt-4 w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                code.length >= 4
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "cursor-not-allowed bg-surface-hover text-text-secondary"
              }`}
            >
              Check In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
