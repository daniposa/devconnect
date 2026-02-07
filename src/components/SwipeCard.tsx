"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import TechBadge from "./TechBadge";
import { OpenProject } from "@/data/types";

interface SwipeCardProps {
  project: OpenProject;
  matchingTechs: string[];
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
}

export default function SwipeCard({ project, matchingTechs, onSwipe, isTop }: SwipeCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragState, setDragState] = useState({ x: 0, y: 0, dragging: false, startX: 0, startY: 0 });
  const [exiting, setExiting] = useState<"left" | "right" | null>(null);

  const rotation = dragState.x * 0.08;
  const opacity = Math.min(Math.abs(dragState.x) / 120, 1);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!isTop) return;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    setDragState({ x: 0, y: 0, dragging: true, startX: e.clientX, startY: e.clientY });
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragState.dragging) return;
    setDragState((prev) => ({
      ...prev,
      x: e.clientX - prev.startX,
      y: e.clientY - prev.startY,
    }));
  };

  const handlePointerUp = () => {
    if (!dragState.dragging) return;
    if (Math.abs(dragState.x) > 120) {
      triggerSwipe(dragState.x > 0 ? "right" : "left");
    } else {
      setDragState({ x: 0, y: 0, dragging: false, startX: 0, startY: 0 });
    }
  };

  const triggerSwipe = (direction: "left" | "right") => {
    setExiting(direction);
    setTimeout(() => onSwipe(direction), 300);
  };

  if (!isTop) {
    return (
      <div className="absolute inset-0 rounded-2xl border border-border bg-surface p-8 scale-[0.96] opacity-60" />
    );
  }

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={`absolute inset-0 cursor-grab active:cursor-grabbing select-none rounded-2xl border border-border bg-surface transition-transform ${
        dragState.dragging ? "duration-0" : exiting ? "duration-300" : "duration-300"
      }`}
      style={{
        transform: exiting
          ? `translateX(${exiting === "right" ? 150 : -150}%) rotate(${exiting === "right" ? 30 : -30}deg)`
          : `translateX(${dragState.x}px) translateY(${dragState.y * 0.3}px) rotate(${rotation}deg)`,
        opacity: exiting ? 0 : 1,
        zIndex: 10,
      }}
    >
      {/* Swipe indicators */}
      <div
        className="absolute left-6 top-6 rounded-xl border-2 border-green bg-green/10 px-4 py-2 text-xl font-bold text-green transition-opacity"
        style={{ opacity: dragState.x > 30 ? opacity : 0 }}
      >
        INTERESTED
      </div>
      <div
        className="absolute right-6 top-6 rounded-xl border-2 border-red-400 bg-red-400/10 px-4 py-2 text-xl font-bold text-red-400 transition-opacity"
        style={{ opacity: dragState.x < -30 ? opacity : 0 }}
      >
        PASS
      </div>

      <div className="flex h-full flex-col overflow-hidden p-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-text-primary">{project.title}</h2>
            <span
              className={`mt-2 inline-block rounded-full border px-3 py-1 text-xs font-medium ${
                project.status === "recruiting"
                  ? "bg-green/10 text-green border-green/20"
                  : "bg-amber/10 text-amber border-amber/20"
              }`}
            >
              {project.status === "recruiting" ? "Recruiting" : "In Progress"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image
              src={project.owner.avatar}
              alt={project.owner.name}
              width={36}
              height={36}
              className="rounded-full"
            />
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">{project.owner.name}</p>
              <p className="text-xs text-text-secondary">Owner</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mt-5 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.longDescription}
        </p>

        {/* Tech stack with match highlights */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Tech Stack</p>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span key={tech} className="relative">
                <TechBadge name={tech} />
                {matchingTechs.includes(tech) && (
                  <span className="absolute -right-1 -top-1 flex h-3 w-3 items-center justify-center rounded-full bg-green text-[8px] text-white">
                    ✓
                  </span>
                )}
              </span>
            ))}
          </div>
          {matchingTechs.length > 0 && (
            <p className="mt-2 text-xs text-green">
              {matchingTechs.length} tech{matchingTechs.length > 1 ? "s" : ""} match your profile
            </p>
          )}
        </div>

        {/* Open roles */}
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-secondary">Looking For</p>
          <div className="flex flex-wrap gap-2">
            {project.openRoles.map((role) => (
              <span
                key={role}
                className="rounded-lg border border-accent/20 bg-accent/5 px-3 py-1.5 text-xs font-medium text-accent"
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        {/* Contributors */}
        {project.contributors.length > 0 && (
          <div className="mt-5 flex items-center gap-2">
            <div className="flex -space-x-2">
              {project.contributors.map((c) => (
                <Image
                  key={c.developerId}
                  src={c.avatar}
                  alt={c.name}
                  width={28}
                  height={28}
                  className="rounded-full border-2 border-surface"
                  title={c.name}
                />
              ))}
            </div>
            <span className="text-xs text-text-secondary">
              {project.contributors.length} contributor{project.contributors.length > 1 ? "s" : ""} already onboard
            </span>
          </div>
        )}

        {/* Button controls */}
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerSwipe("left");
            }}
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-400/30 bg-red-400/5 text-red-400 transition-all hover:border-red-400 hover:bg-red-400/10 hover:scale-110"
          >
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              triggerSwipe("right");
            }}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-green/30 bg-green/5 text-green transition-all hover:border-green hover:bg-green/10 hover:scale-110"
          >
            <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
