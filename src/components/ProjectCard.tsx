import Link from "next/link";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { OpenProject } from "@/data/types";

const statusStyles = {
  recruiting: "bg-green/10 text-green border-green/20",
  "in-progress": "bg-amber/10 text-amber border-amber/20",
  launched: "bg-accent/10 text-accent border-accent/20",
};

const statusLabels = {
  recruiting: "Recruiting",
  "in-progress": "In Progress",
  launched: "Launched",
};

export default function ProjectCard({ project }: { project: OpenProject }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="group rounded-xl border border-border bg-surface p-6 transition-all hover:border-accent/30 hover:bg-surface-hover">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <span
                className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[project.status]}`}
              >
                {statusLabels[project.status]}
              </span>
            </div>
            <p className="mt-2 text-sm text-text-secondary">{project.description}</p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Image
                src={project.owner.avatar}
                alt={project.owner.name}
                width={24}
                height={24}
                className="rounded-full"
              />
              <span className="text-sm text-text-secondary">{project.owner.name}</span>
            </div>
            {project.contributors.length > 0 && (
              <div className="flex -space-x-2">
                {project.contributors.map((c) => (
                  <Image
                    key={c.developerId}
                    src={c.avatar}
                    alt={c.name}
                    width={24}
                    height={24}
                    className="rounded-full border-2 border-surface"
                    title={c.name}
                  />
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs text-text-secondary">
            <span>{project.openRoles.length} open roles</span>
            <span>{project.applicants} applicants</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
