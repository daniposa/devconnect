"use client";

import Link from "next/link";
import DeveloperCard from "@/components/DeveloperCard";
import { useData } from "@/data/DataContext";

export default function DevelopersPage() {
  const { developers } = useData();

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Developers</h1>
          <p className="mt-2 text-text-secondary">
            Discover talented developers and connect for your next collaboration.
          </p>
        </div>
        <Link
          href="/developers/new"
          className="flex items-center gap-2 rounded-lg bg-accent px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Profile
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {developers.map((dev) => (
          <DeveloperCard key={dev.id} developer={dev} />
        ))}
      </div>
    </div>
  );
}
