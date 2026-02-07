"use client";

import Link from "next/link";
import ProjectCard from "@/components/ProjectCard";
import { useData } from "@/data/DataContext";

export default function ProjectsPage() {
  const { projects } = useData();
  const recruiting = projects.filter((p) => p.status === "recruiting");
  const inProgress = projects.filter((p) => p.status === "in-progress");

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Open Projects</h1>
          <p className="mt-2 text-text-secondary">
            Find projects looking for contributors and start building together.
          </p>
        </div>
        <Link
          href="/projects/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Project
        </Link>
      </div>

      {recruiting.length > 0 && (
        <section className="mb-10">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-text-primary">
            <span className="h-2 w-2 rounded-full bg-green" />
            Actively Recruiting
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {recruiting.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}

      {inProgress.length > 0 && (
        <section>
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-text-primary">
            <span className="h-2 w-2 rounded-full bg-amber" />
            In Progress
          </h2>
          <div className="grid gap-4 lg:grid-cols-2">
            {inProgress.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
