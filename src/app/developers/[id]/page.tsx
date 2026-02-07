"use client";

import { use } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import TechBadge from "@/components/TechBadge";
import { useData } from "@/data/DataContext";

export default function DeveloperProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { getDeveloperById } = useData();
  const developer = getDeveloperById(id);

  if (!developer) return notFound();

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to developers
      </Link>

      <div className="rounded-xl border border-border bg-surface p-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row">
          <Image
            src={developer.avatar}
            alt={developer.name}
            width={96}
            height={96}
            className="rounded-full"
          />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-text-primary">{developer.name}</h1>
              {developer.availableForCollab && (
                <span className="flex items-center gap-1 rounded-full bg-green/10 px-3 py-1 text-sm font-medium text-green">
                  <span className="h-2 w-2 rounded-full bg-green" />
                  Open to collaborate
                </span>
              )}
            </div>
            <p className="mt-1 text-text-secondary">{developer.title}</p>
            <p className="mt-0.5 text-sm text-text-secondary">{developer.location}</p>
            <p className="mt-4 text-text-secondary">{developer.bio}</p>

            <a
              href={`https://github.com/${developer.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-accent hover:text-white"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              @{developer.github}
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-text-primary">Technologies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {developer.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold text-text-primary">Projects</h2>
        {developer.projects.length === 0 ? (
          <p className="mt-4 text-sm text-text-secondary">No projects added yet.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {developer.projects.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-lg border border-border p-4 transition-all hover:border-accent/30 hover:bg-surface-hover"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <svg className="h-4 w-4 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <h3 className="font-semibold text-text-primary">{project.name}</h3>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{project.description}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-text-secondary">
                    <svg className="h-4 w-4 text-amber" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    {project.stars.toLocaleString()}
                  </div>
                </div>
                <div className="mt-2">
                  <span className="inline-block rounded-full bg-surface-hover px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                    {project.language}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
