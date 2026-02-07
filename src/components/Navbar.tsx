"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useData } from "@/data/DataContext";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const pathname = usePathname();
  const { currentUser, setCurrentUser, devTablesUsers } = useData();
  const [pickerOpen, setPickerOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        setPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const navLinks = [
    { href: "/events", label: "Dinners" },
    { href: "/developers", label: "Developers" },
    { href: "/projects", label: "Projects" },
    ...(currentUser ? [{ href: "/dashboard", label: "Dashboard" }] : []),
    ...(currentUser ? [{ href: "/connections", label: "Connections" }] : []),
    ...(currentUser?.role === "admin" ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <svg
              className="h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
              />
            </svg>
          </div>
          <span className="text-lg font-bold text-text-primary">DevTables</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/developers"
                ? pathname === "/developers" || (pathname.startsWith("/developers") && !pathname.startsWith("/devtables"))
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`hidden sm:block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:bg-surface-hover hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          {/* User Picker */}
          <div className="relative ml-2" ref={pickerRef}>
            <button
              onClick={() => setPickerOpen(!pickerOpen)}
              className="flex items-center gap-2 rounded-lg border border-border px-3 py-1.5 text-sm font-medium text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
            >
              {currentUser ? (
                <>
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.displayName}
                    className="h-6 w-6 rounded-full"
                  />
                  <span className="hidden sm:inline">{currentUser.displayName}</span>
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Log in</span>
                </>
              )}
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {pickerOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-border bg-surface shadow-xl max-h-96 overflow-y-auto z-50">
                <div className="p-2">
                  {currentUser && (
                    <button
                      onClick={() => { setCurrentUser(null); setPickerOpen(false); }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-red-400 transition-colors hover:bg-surface-hover"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Log out
                    </button>
                  )}
                  <div className="px-3 py-2 text-xs font-medium text-text-secondary uppercase tracking-wider">
                    Log in as...
                  </div>
                  {devTablesUsers.slice(0, 15).map((user) => (
                    <button
                      key={user.id}
                      onClick={() => { setCurrentUser(user); setPickerOpen(false); }}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-surface-hover ${
                        currentUser?.id === user.id ? "bg-accent/10 text-accent" : "text-text-primary"
                      }`}
                    >
                      <img src={user.avatar} alt={user.displayName} className="h-7 w-7 rounded-full" />
                      <div className="text-left">
                        <div className="font-medium">{user.displayName}</div>
                        <div className="text-xs text-text-secondary">{user.title}{user.role === "admin" ? " (Admin)" : ""}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="rounded-lg px-4 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
