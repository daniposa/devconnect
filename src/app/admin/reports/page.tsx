"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/data/DataContext";
import type { ReportStatus } from "@/data/types";

export default function AdminReportsPage() {
  const {
    currentUser,
    reports,
    updateReport,
    getDevTablesUserById,
    getEventById,
  } = useData();

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});

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

  const handleStatusChange = (reportId: string, newStatus: ReportStatus) => {
    const updates: Partial<{ status: ReportStatus; resolvedAt: string }> = { status: newStatus };
    if (newStatus === "action_taken" || newStatus === "dismissed") {
      updates.resolvedAt = new Date().toISOString();
    }
    updateReport(reportId, updates);
  };

  const handleSaveNotes = (reportId: string) => {
    const notes = notesMap[reportId];
    if (notes !== undefined) {
      updateReport(reportId, { adminNotes: notes });
    }
  };

  const statusOptions: ReportStatus[] = ["pending", "reviewed", "action_taken", "dismissed"];

  const sortedReports = [...reports].sort((a, b) => {
    const order: Record<ReportStatus, number> = { pending: 0, reviewed: 1, action_taken: 2, dismissed: 3 };
    return order[a.status] - order[b.status];
  });

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/admin"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to admin
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-text-primary">Reports Queue</h1>
        <p className="mt-2 text-text-secondary">
          Review and manage user reports. {reports.filter((r) => r.status === "pending").length} pending.
        </p>
      </div>

      {reports.length === 0 ? (
        <div className="rounded-xl border border-border bg-surface p-12 text-center">
          <p className="text-text-secondary">No reports have been submitted.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedReports.map((report) => {
            const reporter = getDevTablesUserById(report.reporterId);
            const reported = getDevTablesUserById(report.reportedId);
            const event = report.eventId ? getEventById(report.eventId) : null;

            return (
              <div
                key={report.id}
                className="rounded-xl border border-border bg-surface p-6"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${reportStatusBadge(report.status)}`}>
                        {report.status.replace("_", " ")}
                      </span>
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${reasonBadge(report.reason)}`}>
                        {report.reason.replace("_", " ")}
                      </span>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
                      <div>
                        <span className="text-text-secondary">Reporter: </span>
                        <span className="font-medium text-text-primary">
                          {reporter?.name || report.reporterId}
                        </span>
                      </div>
                      <div>
                        <span className="text-text-secondary">Reported: </span>
                        <span className="font-medium text-text-primary">
                          {reported?.name || report.reportedId}
                        </span>
                      </div>
                    </div>

                    {report.description && (
                      <p className="mt-3 rounded-lg bg-surface-hover p-3 text-sm text-text-secondary">
                        {report.description}
                      </p>
                    )}

                    {event && (
                      <p className="mt-2 text-xs text-text-secondary">
                        Related event: {event.title}
                      </p>
                    )}

                    <p className="mt-2 text-xs text-text-secondary">
                      Reported on{" "}
                      {new Date(report.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 sm:items-end">
                    <select
                      value={report.status}
                      onChange={(e) => handleStatusChange(report.id, e.target.value as ReportStatus)}
                      className="rounded-lg border border-border bg-surface-hover px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
                    >
                      {statusOptions.map((s) => (
                        <option key={s} value={s}>
                          {s.replace("_", " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Admin notes */}
                <div className="mt-4 border-t border-border pt-4">
                  <label className="mb-1 block text-xs font-medium text-text-secondary">
                    Admin Notes
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={notesMap[report.id] ?? report.adminNotes ?? ""}
                      onChange={(e) =>
                        setNotesMap((prev) => ({ ...prev, [report.id]: e.target.value }))
                      }
                      placeholder="Add internal notes..."
                      className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent focus:outline-none"
                    />
                    <button
                      onClick={() => handleSaveNotes(report.id)}
                      className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function reportStatusBadge(status: string): string {
  switch (status) {
    case "pending":
      return "bg-amber/10 text-amber";
    case "reviewed":
      return "bg-accent/10 text-accent";
    case "action_taken":
      return "bg-red-500/10 text-red-400";
    case "dismissed":
      return "bg-surface-hover text-text-secondary";
    default:
      return "bg-surface-hover text-text-secondary";
  }
}

function reasonBadge(reason: string): string {
  switch (reason) {
    case "harassment":
      return "bg-red-500/10 text-red-400";
    case "no_show":
      return "bg-amber/10 text-amber";
    case "spam":
      return "bg-orange-500/10 text-orange-400";
    case "other":
      return "bg-surface-hover text-text-secondary";
    default:
      return "bg-surface-hover text-text-secondary";
  }
}
