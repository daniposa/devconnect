import Link from "next/link";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { Developer } from "@/data/types";

export default function DeveloperCard({ developer }: { developer: Developer }) {
  return (
    <Link href={`/developers/${developer.id}`}>
      <div className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:bg-surface-hover">
        <div className="flex items-start gap-4">
          <Image
            src={developer.avatar}
            alt={developer.name}
            width={56}
            height={56}
            className="rounded-full"
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                {developer.name}
              </h3>
              {developer.availableForCollab && (
                <span className="flex items-center gap-1 rounded-full bg-green/10 px-2 py-0.5 text-xs font-medium text-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-green" />
                  Open to collab
                </span>
              )}
            </div>
            <p className="text-sm text-text-secondary">{developer.title}</p>
            <p className="mt-1 text-xs text-text-secondary">{developer.location}</p>
          </div>
        </div>

        <p className="mt-4 line-clamp-2 text-sm text-text-secondary">
          {developer.bio}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {developer.technologies.slice(0, 5).map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
          {developer.technologies.length > 5 && (
            <span className="inline-block rounded-full border border-border px-3 py-1 text-xs font-medium text-text-secondary">
              +{developer.technologies.length - 5}
            </span>
          )}
        </div>

        <div className="mt-4 flex items-center gap-4 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            {developer.github}
          </span>
          <span>{developer.projects.length} projects</span>
        </div>
      </div>
    </Link>
  );
}
