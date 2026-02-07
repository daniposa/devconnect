"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useData } from "@/data/DataContext";

const bgColors = ["b6e3f4", "c0aede", "ffd5dc", "d1f4d9", "ffeab6", "c3e4f7", "f4d9b6", "deb6e3"];

export default function NewDeveloper() {
  const router = useRouter();
  const { addDeveloper, developers } = useData();

  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [github, setGithub] = useState("");
  const [bio, setBio] = useState("");
  const [techInput, setTechInput] = useState("");
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [availableForCollab, setAvailableForCollab] = useState(true);

  // Personal projects
  const [projects, setProjects] = useState<
    { name: string; description: string; url: string; language: string }[]
  >([]);
  const [projName, setProjName] = useState("");
  const [projDesc, setProjDesc] = useState("");
  const [projUrl, setProjUrl] = useState("");
  const [projLang, setProjLang] = useState("");

  const addTech = () => {
    const trimmed = techInput.trim();
    if (trimmed && !technologies.includes(trimmed)) {
      setTechnologies([...technologies, trimmed]);
      setTechInput("");
    }
  };

  const removeTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech));
  };

  const addProject = () => {
    if (projName.trim() && projDesc.trim()) {
      setProjects([
        ...projects,
        {
          name: projName.trim(),
          description: projDesc.trim(),
          url: projUrl.trim() || `https://github.com/${github || "user"}/${projName.trim()}`,
          language: projLang.trim() || "TypeScript",
        },
      ]);
      setProjName("");
      setProjDesc("");
      setProjUrl("");
      setProjLang("");
    }
  };

  const removeProject = (idx: number) => {
    setProjects(projects.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !title.trim() || !github.trim()) return;

    const id = String(Date.now());
    const bg = bgColors[developers.length % bgColors.length];

    addDeveloper({
      id,
      name: name.trim(),
      title: title.trim(),
      location: location.trim(),
      github: github.trim(),
      bio: bio.trim(),
      avatar: `https://api.dicebear.com/9.x/notionists/png?seed=${encodeURIComponent(name.trim())}&size=128&backgroundColor=${bg}`,
      technologies,
      projects: projects.map((p) => ({ ...p, stars: 0 })),
      availableForCollab,
    });

    router.push(`/developers/${id}`);
  };

  const inputClass =
    "w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-text-primary placeholder-text-secondary/50 outline-none transition-colors focus:border-accent";

  return (
    <div className="mx-auto max-w-2xl">
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
        <h1 className="text-2xl font-bold text-text-primary">Create Your Profile</h1>
        <p className="mt-2 text-sm text-text-secondary">
          Join the network and start connecting with other developers.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Basic info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary">
                Title <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Full-Stack Engineer"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary">
                GitHub Username <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-text-secondary">@</span>
                <input
                  type="text"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="janedoe"
                  required
                  className={`${inputClass} pl-8`}
                />
              </div>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-text-primary">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell other developers about yourself..."
              rows={3}
              className={`${inputClass} resize-none`}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Technologies</label>
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
            {technologies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {technologies.map((tech) => (
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

          {/* Projects */}
          <div>
            <label className="mb-1.5 block text-sm font-medium text-text-primary">Personal Projects</label>

            {projects.length > 0 && (
              <div className="mb-4 space-y-2">
                {projects.map((p, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                    <div>
                      <p className="text-sm font-medium text-text-primary">{p.name}</p>
                      <p className="text-xs text-text-secondary">{p.description}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeProject(i)}
                      className="text-text-secondary hover:text-red-400 transition-colors"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-lg border border-dashed border-border p-4 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  type="text"
                  value={projName}
                  onChange={(e) => setProjName(e.target.value)}
                  placeholder="Project name"
                  className={inputClass}
                />
                <input
                  type="text"
                  value={projLang}
                  onChange={(e) => setProjLang(e.target.value)}
                  placeholder="Language (e.g. TypeScript)"
                  className={inputClass}
                />
              </div>
              <input
                type="text"
                value={projDesc}
                onChange={(e) => setProjDesc(e.target.value)}
                placeholder="Short description"
                className={inputClass}
              />
              <input
                type="text"
                value={projUrl}
                onChange={(e) => setProjUrl(e.target.value)}
                placeholder="Repository URL (optional)"
                className={inputClass}
              />
              <button
                type="button"
                onClick={addProject}
                disabled={!projName.trim() || !projDesc.trim()}
                className="rounded-lg bg-surface-hover px-4 py-2 text-sm font-medium text-text-primary transition-colors hover:bg-accent hover:text-white disabled:opacity-40 disabled:hover:bg-surface-hover disabled:hover:text-text-primary"
              >
                + Add Project
              </button>
            </div>
          </div>

          {/* Collab toggle */}
          <label className="flex items-center gap-3 cursor-pointer">
            <div
              onClick={() => setAvailableForCollab(!availableForCollab)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                availableForCollab ? "bg-green" : "bg-border"
              }`}
            >
              <div
                className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  availableForCollab ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </div>
            <span className="text-sm font-medium text-text-primary">Open to collaboration</span>
          </label>

          {/* Submit */}
          <div className="flex items-center gap-3 pt-2">
            <button
              type="submit"
              className="rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
            >
              Create Profile
            </button>
            <Link
              href="/"
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
