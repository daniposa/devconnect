"use client";

import { use, useState, useEffect, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { useData } from "@/data/DataContext";

const roundLabels: Record<string, string> = {
  warmup: "Warm-up",
  depth: "Depth",
  future: "Future",
};

const roundColors: Record<string, string> = {
  warmup: "bg-green/10 text-green border-green/20",
  depth: "bg-accent/10 text-accent border-accent/20",
  future: "bg-amber/10 text-amber border-amber/20",
};

function formatTimeRemaining(seconds: number): string {
  if (seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function IcebreakersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    getEventById,
    currentUser,
    getUserTable,
    getPromptsForEvent,
    getVenueById,
  } = useData();

  const event = getEventById(id);

  const prompts = useMemo(() => getPromptsForEvent(10), [getPromptsForEvent]);

  const [currentIndex, setCurrentIndex] = useState(-1); // -1 = norms card
  const [timerSeconds, setTimerSeconds] = useState(90 * 60); // 90 minutes
  const [timerStarted, setTimerStarted] = useState(false);

  useEffect(() => {
    if (!timerStarted) return;
    const interval = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerStarted]);

  if (!event) return notFound();

  const userTable =
    currentUser !== null ? getUserTable(currentUser.id, event.id) : undefined;
  const isCheckedIn =
    userTable !== undefined && currentUser !== null
      ? userTable.checkedIn.includes(currentUser.id)
      : false;

  const lastDrinksVenue =
    event.lastDrinksVenueId
      ? getVenueById(event.lastDrinksVenueId)
      : undefined;

  if (!currentUser || !isCheckedIn) {
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

        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <svg
            className="mx-auto h-12 w-12 text-text-secondary/40"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            Check in first
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            You need to check in at your table before accessing the icebreaker
            prompts.
          </p>
          <Link
            href={`/events/${event.id}/checkin`}
            className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Go to Check-in
          </Link>
        </div>
      </div>
    );
  }

  const isFinished = currentIndex >= prompts.length;

  function handleDismissNorms() {
    setCurrentIndex(0);
    if (!timerStarted) setTimerStarted(true);
  }

  function handleNext() {
    setCurrentIndex((prev) => prev + 1);
  }

  return (
    <div className="mx-auto max-w-lg">
      {/* Timer bar */}
      <div className="mb-6 flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
        <Link
          href={`/events/${event.id}`}
          className="text-sm text-text-secondary hover:text-accent transition-colors"
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
        </Link>
        <div className="flex items-center gap-2">
          <svg
            className={`h-4 w-4 ${timerSeconds <= 600 ? "text-red-400" : "text-accent"}`}
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
          <span
            className={`font-mono text-lg font-bold ${timerSeconds <= 600 ? "text-red-400" : "text-text-primary"}`}
          >
            {formatTimeRemaining(timerSeconds)}
          </span>
        </div>
        <span className="text-sm text-text-secondary">
          {event.title}
        </span>
      </div>

      {/* Table Norms card */}
      {currentIndex === -1 && (
        <div className="rounded-xl border border-accent/30 bg-surface p-8">
          <div className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
              <svg
                className="h-6 w-6 text-accent"
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
            </div>
            <h2 className="mt-4 text-xl font-bold text-text-primary">
              Table Norms
            </h2>
            <div className="mt-6 space-y-4 text-left text-sm text-text-secondary">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  1
                </span>
                <p>
                  <span className="font-medium text-text-primary">
                    Phones away.
                  </span>{" "}
                  Be present. This is a screen-free dinner (except for this
                  app).
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  2
                </span>
                <p>
                  <span className="font-medium text-text-primary">
                    Everyone speaks.
                  </span>{" "}
                  Go around the table. Give everyone space to answer each
                  prompt.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  3
                </span>
                <p>
                  <span className="font-medium text-text-primary">
                    What&apos;s shared here, stays here.
                  </span>{" "}
                  Respect the trust of your tablemates.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                  4
                </span>
                <p>
                  <span className="font-medium text-text-primary">
                    Skip is always OK.
                  </span>{" "}
                  No pressure. If a prompt doesn&apos;t resonate, move to the
                  next one.
                </p>
              </div>
            </div>
            <button
              onClick={handleDismissNorms}
              className="mt-8 w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Got it &mdash; Start the Prompts
            </button>
          </div>
        </div>
      )}

      {/* Prompt cards */}
      {currentIndex >= 0 && !isFinished && (
        <div className="rounded-xl border border-border bg-surface p-8">
          <div className="flex items-center justify-between">
            <span
              className={`rounded-full border px-3 py-1 text-xs font-medium ${roundColors[prompts[currentIndex].round]}`}
            >
              {roundLabels[prompts[currentIndex].round]}
            </span>
            <span className="text-sm text-text-secondary">
              {currentIndex + 1}/{prompts.length}
            </span>
          </div>

          <div className="mt-8 min-h-[160px]">
            <p className="text-xl font-semibold leading-relaxed text-text-primary">
              {prompts[currentIndex].textEn}
            </p>
            <p className="mt-4 text-base leading-relaxed text-text-secondary italic">
              {prompts[currentIndex].textEs}
            </p>
          </div>

          <button
            onClick={handleNext}
            className="mt-8 w-full rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            {currentIndex < prompts.length - 1 ? "Next" : "Finish"}
          </button>

          {/* Progress bar */}
          <div className="mt-4 h-1 overflow-hidden rounded-full bg-surface-hover">
            <div
              className="h-full rounded-full bg-accent transition-all duration-300"
              style={{
                width: `${((currentIndex + 1) / prompts.length) * 100}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Wrap-up card */}
      {isFinished && (
        <div className="rounded-xl border border-border bg-surface p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green/10">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-2xl font-bold text-text-primary">
            That&apos;s a wrap!
          </h2>
          <p className="mt-2 text-text-secondary">
            Great conversations make great connections. Don&apos;t forget to
            leave feedback after the event.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={`/events/${event.id}/feedback`}
              className="rounded-lg bg-accent px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Leave Feedback
            </Link>
            <Link
              href={`/events/${event.id}`}
              className="rounded-lg border border-border px-4 py-3 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
            >
              Back to Event
            </Link>
          </div>
        </div>
      )}

      {/* Last Drinks card */}
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
              <h3 className="font-semibold text-text-primary">Last Drinks</h3>
              <p className="text-sm text-text-secondary">
                All tables converge for drinks!
              </p>
            </div>
          </div>
          <div className="mt-3 rounded-lg border border-border bg-background p-3">
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
      )}
    </div>
  );
}
