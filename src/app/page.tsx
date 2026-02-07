"use client";

import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function Home() {
  const { events, bookings, devTablesUsers, connections } = useData();

  const openEvents = events.filter((e) => e.status === "open");
  const nextEvent = openEvents.length > 0 ? openEvents[0] : null;
  const totalBookings = bookings.filter((b) => b.status === "confirmed").length;

  return (
    <div>
      {/* Hero */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-text-primary sm:text-5xl">
          DevTables
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-text-secondary">
          Recurring small-group dinners for developers in Medellin. Every Wednesday,
          6 strangers meet for 90 minutes of genuine conversation and collaboration.
          Free to join — just split the bill.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Link
            href="/events"
            className="rounded-lg bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Browse Upcoming Dinners
          </Link>
          <Link
            href="/code-of-conduct"
            className="rounded-lg border border-border px-6 py-3 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
          >
            Code of Conduct
          </Link>
        </div>
      </div>

      {/* How it works */}
      <div className="mb-12">
        <h2 className="mb-6 text-center text-2xl font-bold text-text-primary">How It Works</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { step: "1", title: "Create Profile", desc: "Sign up with your tech stack, goals, and interests. Takes 2 minutes." },
            { step: "2", title: "Book a Wednesday", desc: "Pick an upcoming dinner. We match you into a table of 6 diverse developers." },
            { step: "3", title: "Show Up & Connect", desc: "Check in, follow the icebreaker prompts, and have real conversations." },
            { step: "4", title: "Stay Connected", desc: "After dinner, choose who to connect with. Mutual matches unlock full profiles." },
          ].map((item) => (
            <div key={item.step} className="rounded-xl border border-border bg-surface p-6">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-lg font-bold text-accent">
                {item.step}
              </div>
              <h3 className="mb-2 text-sm font-semibold text-text-primary">{item.title}</h3>
              <p className="text-sm text-text-secondary">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next event card */}
      {nextEvent && (
        <div className="mb-12">
          <h2 className="mb-4 text-center text-2xl font-bold text-text-primary">Next Dinner</h2>
          <div className="mx-auto max-w-lg rounded-xl border border-accent/30 bg-surface p-6 text-center">
            <div className="text-sm font-medium text-accent">{nextEvent.title}</div>
            <div className="mt-2 text-2xl font-bold text-text-primary">
              {new Date(nextEvent.eventDate + "T00:00:00").toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="mt-1 text-text-secondary">
              {nextEvent.startTime} &middot; {nextEvent.cityZone.charAt(0).toUpperCase() + nextEvent.cityZone.slice(1)}, Medellin
            </div>
            <div className="mt-1 text-sm text-text-secondary">
              {nextEvent.maxAttendees - bookings.filter((b) => b.eventId === nextEvent.id && b.status === "confirmed").length} spots remaining &middot; Free — split the bill
            </div>
            <Link
              href={`/events/${nextEvent.id}`}
              className="mt-4 inline-block rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              View Details & Book
            </Link>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="mb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-3xl font-bold text-accent">{devTablesUsers.length}</div>
            <div className="mt-1 text-sm text-text-secondary">Developers in Medellin</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-3xl font-bold text-accent">{totalBookings}</div>
            <div className="mt-1 text-sm text-text-secondary">Seats Booked</div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6 text-center">
            <div className="text-3xl font-bold text-accent">{connections.filter((c) => !c.deletedAt).length}</div>
            <div className="mt-1 text-sm text-text-secondary">Connections Made</div>
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Link
          href="/developers"
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <h3 className="text-lg font-semibold text-text-primary">Developer Directory</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Browse {devTablesUsers.length} developers. See their tech stacks, projects, and collaboration interests.
          </p>
        </Link>
        <Link
          href="/projects"
          className="rounded-xl border border-border bg-surface p-6 transition-colors hover:border-accent"
        >
          <h3 className="text-lg font-semibold text-text-primary">Open Projects</h3>
          <p className="mt-1 text-sm text-text-secondary">
            Find open-source projects looking for collaborators. Apply to join a team.
          </p>
        </Link>
      </div>
    </div>
  );
}
