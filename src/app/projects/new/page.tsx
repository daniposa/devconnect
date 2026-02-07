"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useData } from "@/data/DataContext";
import MultiSelect from "@/components/MultiSelect";

const TECH_OPTIONS = [
  "TypeScript",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "Rust",
  "Go",
  "Swift",
  "Kotlin",
  "PostgreSQL",
  "Redis",
  "Docker",
  "Kubernetes",
  "AWS",
  "GraphQL",
  "Kafka",
  "React Native",
  "Firebase",
  "Figma",
  "Terraform",
  "GitHub Actions",
  "PyTorch",
  "FastAPI",
  "CSS",
  "Tailwind CSS",
  "Svelte",
  "WebGL",
  "WebAssembly",
  "Storybook",
  "Testing Library",
  "OpenAI API",
  "GitHub API",
  "Prometheus",
  "Grafana",
  "Vue.js",
  "Angular",
  "Django",
  "Flask",
  "Ruby on Rails",
  "MongoDB",
  "MySQL",
  "SQLite",
  "Supabase",
  "Prisma",
  "tRPC",
  "Electron",
  "Tauri",
  "Vercel",
  "Netlify",
];

const ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Mobile Developer",
  "DevOps Engineer",
  "ML Engineer",
  "Data Engineer",
  "UI/UX Designer",
  "Technical Writer",
  "QA Engineer",
  "Security Engineer",
  "Go Developer",
  "Rust Developer",
  "Python Developer",
  "React Developer",
  "iOS Developer",
  "Android Developer",
  "Compiler Engineer",
  "Platform Engineer",
  "Site Reliability Engineer",
  "Product Manager",
  "Project Manager",
];

export default function NewProject() {
  const router = useRouter();
  const { addProject, developers } = useData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);
  const [openRoles, setOpenRoles] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim() || !ownerId) return;

    const owner = developers.find((d) => d.id === ownerId);
    if (!owner) return;

    const id = String(Date.now());

    addProject({
      id,
      title: title.trim(),
      description: description.trim(),
      longDescription: longDescription.trim() || description.trim(),
      techStack,
      owner: {
        developerId: owner.id,
        name: owner.name,
        avatar: owner.avatar,
      },
      contributors: [],
      openRoles,
      applicants: 0,
      status: "recruiting",
      createdAt: new Date().toISOString().split("T")[0],
      repoUrl: repoUrl.trim() || `https://github.com/${owner.github}/${title.trim().toLowerCase().replace(/\s+/g, "-")}`,
    });

    router.push(`/projects/${id}`);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none transition-colors focus:border-accent";

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to projects
      </Link>

      <div className="rounded-xl border border-border bg-surface p-8">
        <h1 className="text-2xl font-bold text-text-primary">Create a New Project</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Start a project and find developers to build it with you.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Project Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="My Awesome Project"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Short Description <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="A one-liner about your project"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Full Description</label>
            <textarea
              value={longDescription}
              onChange={(e) => setLongDescription(e.target.value)}
              placeholder="Describe your project in detail: what it does, why it matters, and what kind of help you're looking for..."
              rows={5}
              className={`${inputClass} resize-none`}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Repository URL</label>
            <input
              type="text"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              placeholder="https://github.com/you/project"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">
              Project Owner <span className="text-red-400">*</span>
            </label>
            <select
              value={ownerId}
              onChange={(e) => setOwnerId(e.target.value)}
              required
              className={`${inputClass} cursor-pointer`}
            >
              <option value="" className="bg-surface text-text-secondary">Select a developer...</option>
              {developers.map((dev) => (
                <option key={dev.id} value={dev.id} className="bg-surface text-text-primary">
                  {dev.name} (@{dev.github})
                </option>
              ))}
            </select>
          </div>

          <MultiSelect
            label="Tech Stack"
            options={TECH_OPTIONS}
            selected={techStack}
            onChange={setTechStack}
            placeholder="Search technologies..."
            badgeClass="border-accent/20 bg-accent/10 text-accent"
          />

          <MultiSelect
            label="Open Roles"
            options={ROLE_OPTIONS}
            selected={openRoles}
            onChange={setOpenRoles}
            placeholder="Search roles..."
            badgeClass="border-green/20 bg-green/10 text-green"
          />

          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Create Project
            </button>
            <Link
              href="/projects"
              className="rounded-lg px-6 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
