"use client";

import Image from "next/image";
import Link from "next/link";
import TechBadge from "@/components/TechBadge";
import { useData } from "@/data/DataContext";

export default function ConnectionsPage() {
  const {
    currentUser,
    getConnectionsForUser,
    getDevTablesUserById,
    getEventById,
    deleteConnection,
  } = useData();

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg className="h-16 w-16 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
        <p className="mt-4 text-lg font-medium text-text-primary">Log in to see connections</p>
        <p className="mt-1 text-sm text-text-secondary">Sign in to view and manage your DevTables connections.</p>
      </div>
    );
  }

  const connections = getConnectionsForUser(currentUser.id);

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">My Connections</h1>
        <p className="mt-2 text-text-secondary">
          People you&apos;ve mutually connected with at DevTable dinners.
        </p>
      </div>

      {connections.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
          <p className="mt-4 text-lg font-medium text-text-primary">No connections yet</p>
          <p className="mt-1 text-sm text-text-secondary">
            Attend a DevTable dinner and mutually connect with fellow developers!
          </p>
          <Link
            href="/devtables"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Browse upcoming events
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {connections.map((conn) => {
            const otherUserId = conn.userAId === currentUser.id ? conn.userBId : conn.userAId;
            const otherUser = getDevTablesUserById(otherUserId);
            const event = getEventById(conn.eventId);

            if (!otherUser) return null;

            return (
              <div
                key={conn.id}
                className="rounded-xl border border-border bg-surface p-6 transition-colors hover:bg-surface-hover"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
                  <Image
                    src={otherUser.avatar}
                    alt={otherUser.name}
                    width={64}
                    height={64}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg font-semibold text-text-primary">{otherUser.name}</h2>
                    <p className="text-sm text-text-secondary">{otherUser.title}</p>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {otherUser.technologies.slice(0, 6).map((tech) => (
                        <TechBadge key={tech} name={tech} />
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      <a
                        href={`https://github.com/${otherUser.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-surface-hover px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-accent hover:text-white"
                      >
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        @{otherUser.github}
                      </a>
                      {otherUser.linkedinUrl && (
                        <a
                          href={otherUser.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg bg-surface-hover px-3 py-1.5 text-sm text-text-primary transition-colors hover:bg-accent hover:text-white"
                        >
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>

                    {event && (
                      <p className="mt-3 text-xs text-text-secondary">
                        Met at {event.title} on{" "}
                        {new Date(event.eventDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => deleteConnection(conn.id)}
                    className="self-start rounded-lg border border-border px-3 py-1.5 text-sm text-text-secondary transition-colors hover:border-red-500/50 hover:text-red-400"
                  >
                    Delete Connection
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
