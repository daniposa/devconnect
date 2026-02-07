"use client";

import { use, useState } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useData } from "@/data/DataContext";
import type { ConnectVote } from "@/data/types";

export default function FeedbackPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    getEventById,
    currentUser,
    getUserTable,
    hasUserSubmittedFeedback,
    addFeedbackBatch,
    detectMutualConnects,
    getDevTablesUserById,
  } = useData();

  const event = getEventById(id);

  const [eventRating, setEventRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [votes, setVotes] = useState<Record<string, ConnectVote>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [adminComment, setAdminComment] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [newConnections, setNewConnections] = useState<
    { userAName: string; userBName: string }[]
  >([]);

  if (!event) return notFound();

  const userTable =
    currentUser !== null ? getUserTable(currentUser.id, event.id) : undefined;
  const isCheckedIn =
    userTable !== undefined && currentUser !== null
      ? userTable.checkedIn.includes(currentUser.id)
      : false;
  const alreadySubmitted =
    currentUser !== null && hasUserSubmittedFeedback(currentUser.id, event.id);

  const tablemates =
    userTable !== undefined && currentUser !== null
      ? userTable.members.filter((m) => m.id !== currentUser.id)
      : [];

  function handleVote(memberId: string, vote: ConnectVote) {
    setVotes((prev) => {
      const next = { ...prev };
      if (next[memberId] === vote) {
        delete next[memberId];
      } else {
        next[memberId] = vote;
      }
      return next;
    });
  }

  function handleNote(memberId: string, text: string) {
    setNotes((prev) => ({ ...prev, [memberId]: text }));
  }

  function handleSubmit() {
    if (!currentUser || eventRating === 0) return;

    const feedbackEntries = [];

    // Event rating feedback
    feedbackEntries.push({
      id: `fb-${Date.now()}-event`,
      eventId: event.id,
      giverId: currentUser.id,
      eventRating,
      adminComment: adminComment || undefined,
      createdAt: new Date().toISOString(),
    });

    // Per-tablemate feedback
    for (const mate of tablemates) {
      if (votes[mate.id]) {
        feedbackEntries.push({
          id: `fb-${Date.now()}-${mate.id}`,
          eventId: event.id,
          giverId: currentUser.id,
          receiverId: mate.id,
          connectVote: votes[mate.id],
          note: notes[mate.id] || undefined,
          createdAt: new Date().toISOString(),
        });
      }
    }

    addFeedbackBatch(feedbackEntries);

    const mutual = detectMutualConnects(event.id);
    if (mutual.length > 0) {
      const connectionNames = mutual.map((c) => {
        const userA = getDevTablesUserById(c.userAId);
        const userB = getDevTablesUserById(c.userBId);
        return {
          userAName: userA?.displayName || "Unknown",
          userBName: userB?.displayName || "Unknown",
        };
      });
      setNewConnections(connectionNames);
    }

    setSubmitted(true);
  }

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
            Check in required
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            You must check in at the event before leaving feedback.
          </p>
        </div>
      </div>
    );
  }

  if (alreadySubmitted && !submitted) {
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
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green/10">
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
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="mt-4 text-lg font-semibold text-text-primary">
            Feedback already submitted
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Thanks for your feedback! You can only submit once per event.
          </p>
          <Link
            href={`/events/${event.id}`}
            className="mt-4 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Back to Event
          </Link>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-lg">
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
            Thanks for your feedback!
          </h2>
          <p className="mt-2 text-text-secondary">
            Your ratings help us improve future events.
          </p>

          {newConnections.length > 0 && (
            <div className="mt-6 rounded-lg border border-green/30 bg-green/10 p-4">
              <p className="mb-2 font-semibold text-green">
                New mutual connections!
              </p>
              <div className="space-y-1">
                {newConnections.map((conn, i) => {
                  const otherName =
                    conn.userAName === currentUser.displayName
                      ? conn.userBName
                      : conn.userBName === currentUser.displayName
                        ? conn.userAName
                        : `${conn.userAName} & ${conn.userBName}`;
                  return (
                    <p key={i} className="text-sm text-green">
                      You and {otherName} &mdash; it&apos;s a match!
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          <Link
            href={`/events/${event.id}`}
            className="mt-6 inline-flex rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Back to Event
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
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
        <h1 className="text-2xl font-bold text-text-primary">
          Event Feedback
        </h1>
        <p className="mt-2 text-sm text-text-secondary">{event.title}</p>

        {/* Star rating */}
        <div className="mt-8">
          <label className="block text-sm font-medium text-text-primary">
            How was the event overall?
          </label>
          <div className="mt-3 flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setEventRating(star)}
                className="transition-transform hover:scale-110"
              >
                <svg
                  className={`h-8 w-8 ${
                    star <= (hoverRating || eventRating)
                      ? "fill-amber text-amber"
                      : "fill-none text-text-secondary/40"
                  }`}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </button>
            ))}
          </div>
          {eventRating > 0 && (
            <p className="mt-1 text-xs text-text-secondary">
              {eventRating === 1
                ? "Poor"
                : eventRating === 2
                  ? "Fair"
                  : eventRating === 3
                    ? "Good"
                    : eventRating === 4
                      ? "Great"
                      : "Amazing"}
            </p>
          )}
        </div>

        {/* Tablemate feedback */}
        {tablemates.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-text-primary">
              Your Tablemates
            </h2>
            <p className="mt-1 text-sm text-text-secondary">
              Would you like to connect with any of your tablemates?
            </p>

            <div className="mt-4 space-y-4">
              {tablemates.map((mate) => (
                <div
                  key={mate.id}
                  className="rounded-lg border border-border bg-background p-4"
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={mate.avatar}
                      alt={mate.displayName}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-medium text-text-primary">
                        {mate.displayName}
                      </p>
                      <p className="text-xs text-text-secondary">
                        {mate.title}
                      </p>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleVote(mate.id, "connect")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        votes[mate.id] === "connect"
                          ? "border-green/40 bg-green/20 text-green"
                          : "border-border text-text-secondary hover:border-green/30 hover:text-green"
                      }`}
                    >
                      Connect
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(mate.id, "neutral")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        votes[mate.id] === "neutral"
                          ? "border-text-secondary/40 bg-text-secondary/20 text-text-primary"
                          : "border-border text-text-secondary hover:border-text-secondary/30 hover:text-text-primary"
                      }`}
                    >
                      Neutral
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(mate.id, "report")}
                      className={`flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                        votes[mate.id] === "report"
                          ? "border-red-500/40 bg-red-500/20 text-red-400"
                          : "border-border text-text-secondary hover:border-red-500/30 hover:text-red-400"
                      }`}
                    >
                      Report
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Optional note..."
                    value={notes[mate.id] || ""}
                    onChange={(e) => handleNote(mate.id, e.target.value)}
                    className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Admin feedback */}
        <div className="mt-8">
          <label
            htmlFor="admin-comment"
            className="block text-sm font-medium text-text-primary"
          >
            Anything else you&apos;d like to share with the organizers?
          </label>
          <textarea
            id="admin-comment"
            rows={3}
            value={adminComment}
            onChange={(e) => setAdminComment(e.target.value)}
            placeholder="Suggestions, issues, or compliments..."
            className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-text-primary placeholder:text-text-secondary/40 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={eventRating === 0}
          className={`mt-6 w-full rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
            eventRating > 0
              ? "bg-accent text-white hover:bg-accent-hover"
              : "cursor-not-allowed bg-surface-hover text-text-secondary"
          }`}
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
}
