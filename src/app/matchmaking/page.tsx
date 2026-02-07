"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import SwipeCard from "@/components/SwipeCard";
import TechBadge from "@/components/TechBadge";
import { useData } from "@/data/DataContext";
import { OpenProject } from "@/data/types";

export default function MatchmakingPage() {
  const { developers, projects } = useData();
  const [selectedDevId, setSelectedDevId] = useState<string>("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [liked, setLiked] = useState<OpenProject[]>([]);
  const [passed, setPassed] = useState<string[]>([]);
  const [showMatch, setShowMatch] = useState<OpenProject | null>(null);

  const selectedDev = developers.find((d) => d.id === selectedDevId);

  // Sort projects by tech overlap, exclude ones the dev owns
  const sortedProjects = useMemo(() => {
    if (!selectedDev) return [];
    return projects
      .filter((p) => p.owner.developerId !== selectedDev.id)
      .filter((p) => !passed.includes(p.id) && !liked.some((l) => l.id === p.id))
      .map((p) => {
        const overlap = p.techStack.filter((t) =>
          selectedDev.technologies.some((dt) => dt.toLowerCase() === t.toLowerCase())
        );
        return { project: p, overlap, score: overlap.length };
      })
      .sort((a, b) => b.score - a.score);
  }, [selectedDev, projects, passed, liked]);

  const handleSwipe = (direction: "left" | "right") => {
    const current = sortedProjects[currentIndex];
    if (!current) return;

    if (direction === "right") {
      setLiked((prev) => [...prev, current.project]);
      setShowMatch(current.project);
      setTimeout(() => setShowMatch(null), 2000);
    } else {
      setPassed((prev) => [...prev, current.project.id]);
    }
    setCurrentIndex(0);
  };

  const resetMatches = () => {
    setLiked([]);
    setPassed([]);
    setCurrentIndex(0);
  };

  // Developer selection screen
  if (!selectedDev) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-text-primary">AI Matchmaking</h1>
          <p className="mt-2 text-text-secondary">
            Find projects that match your skills. Select your profile to start swiping.
          </p>
        </div>

        <div className="space-y-3">
          {developers.map((dev) => (
            <button
              key={dev.id}
              onClick={() => setSelectedDevId(dev.id)}
              className="flex w-full items-center gap-4 rounded-xl border border-border bg-surface p-4 text-left transition-all hover:border-accent/30 hover:bg-surface-hover"
            >
              <Image
                src={dev.avatar}
                alt={dev.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div className="flex-1">
                <p className="font-semibold text-text-primary">{dev.name}</p>
                <p className="text-sm text-text-secondary">{dev.title}</p>
              </div>
              <div className="flex flex-wrap justify-end gap-1">
                {dev.technologies.slice(0, 3).map((t) => (
                  <TechBadge key={t} name={t} />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  const noMoreCards = sortedProjects.length === 0;

  return (
    <div className="mx-auto max-w-2xl">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">AI Matchmaking</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Swiping as <span className="font-medium text-accent">{selectedDev.name}</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSelectedDevId("");
              resetMatches();
            }}
            className="rounded-lg px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
          >
            Switch Profile
          </button>
          <div className="flex items-center gap-1.5 rounded-lg bg-green/10 px-3 py-2">
            <svg className="h-4 w-4 text-green" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <span className="text-sm font-medium text-green">{liked.length}</span>
          </div>
        </div>
      </div>

      {/* Match animation overlay */}
      {showMatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="animate-bounce text-center">
            <div className="text-6xl">🎉</div>
            <h2 className="mt-4 text-3xl font-bold text-green">It&apos;s a Match!</h2>
            <p className="mt-2 text-text-secondary">
              You&apos;re interested in <span className="font-semibold text-text-primary">{showMatch.title}</span>
            </p>
          </div>
        </div>
      )}

      {/* Card stack */}
      {!noMoreCards ? (
        <div className="relative mx-auto h-[580px] w-full max-w-md">
          {sortedProjects
            .slice(currentIndex, currentIndex + 2)
            .reverse()
            .map((item, i, arr) => (
              <SwipeCard
                key={item.project.id}
                project={item.project}
                matchingTechs={item.overlap}
                onSwipe={handleSwipe}
                isTop={i === arr.length - 1}
              />
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-border bg-surface py-20">
          <div className="text-5xl">🚀</div>
          <h2 className="mt-4 text-xl font-bold text-text-primary">You&apos;ve seen all projects!</h2>
          <p className="mt-2 text-center text-sm text-text-secondary">
            You liked {liked.length} project{liked.length !== 1 ? "s" : ""}. Check your matches below or start over.
          </p>
          <button
            onClick={resetMatches}
            className="mt-6 rounded-lg bg-accent px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover"
          >
            Start Over
          </button>
        </div>
      )}

      {/* Keyboard hints */}
      {!noMoreCards && (
        <p className="mt-4 text-center text-xs text-text-secondary">
          Drag the card or use the buttons to swipe
        </p>
      )}

      {/* Liked projects list */}
      {liked.length > 0 && (
        <div className="mt-10">
          <h3 className="mb-4 text-lg font-semibold text-text-primary">
            Your Matches ({liked.length})
          </h3>
          <div className="space-y-3">
            {liked.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="flex items-center justify-between rounded-xl border border-border bg-surface p-4 transition-all hover:border-accent/30 hover:bg-surface-hover"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green/10">
                    <svg className="h-5 w-5 text-green" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-text-primary">{project.title}</p>
                    <p className="text-sm text-text-secondary">{project.description}</p>
                  </div>
                </div>
                <div className="flex flex-wrap justify-end gap-1">
                  {project.techStack.slice(0, 3).map((t) => (
                    <TechBadge key={t} name={t} />
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
