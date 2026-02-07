"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useData } from "@/data/DataContext";

export default function NewProject() {
  const router = useRouter();
  const { addProject, developers } = useData();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [ownerId, setOwnerId] = useState("");

  const [techInput, setTechInput] = useState("");
  const [techStack, setTechStack] = useState<string[]>([]);

  const [roleInput, setRoleInput] = useState("");
  const [openRoles, setOpenRoles] = useState<string[]>([]);

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setTechStack(techStack.filter((t) => t !== tech));
  };

  const addRole = () => {
    const trimmed = roleInput.trim();
    if (trimmed && !openRoles.includes(trimmed)) {
      setOpenRoles([...openRoles, trimmed]);
      setRoleInput("");
    }
  };

  const removeRole = (role: string) => {
    setOpenRoles(openRoles.filter((r) => r !== role));
  };

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
          {/* Basic info */}
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

          {/* Owner */}
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

          {/* Tech stack */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Tech Stack</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Type a technology and press Enter"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addTech}
                className="shrink-0 rounded-lg bg-surface-hover px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Add
              </button>
            </div>
            {techStack.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs font-medium text-accent"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Open roles */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Open Roles</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addRole();
                  }
                }}
                placeholder="e.g. Frontend Developer, DevOps Engineer"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addRole}
                className="shrink-0 rounded-lg bg-surface-hover px-4 py-2.5 text-sm font-medium text-text-primary transition-colors hover:bg-accent hover:text-white"
              >
                Add
              </button>
            </div>
            {openRoles.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {openRoles.map((role) => (
                  <span
                    key={role}
                    className="inline-flex items-center gap-1.5 rounded-full border border-green/20 bg-green/10 px-3 py-1 text-xs font-medium text-green"
                  >
                    {role}
                    <button
                      type="button"
                      onClick={() => removeRole(role)}
                      className="hover:text-red-400 transition-colors"
                    >
                      <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Submit */}
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
