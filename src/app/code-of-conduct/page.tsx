"use client";

import Link from "next/link";

const rules = [
  {
    title: "Be respectful and inclusive",
    description:
      "Treat everyone with kindness and respect, regardless of their background, experience level, gender, identity, nationality, or beliefs. DevTables is a space for everyone.",
  },
  {
    title: "No harassment of any kind",
    description:
      "Harassment includes offensive comments, intimidation, sustained disruption, unwelcome physical contact, and unwanted sexual attention. Zero tolerance — report it immediately.",
  },
  {
    title: "No recruiting pitches at dinner",
    description:
      'DevTables dinners are for genuine connection, not talent acquisition. Save the job pitches for LinkedIn. If someone asks about opportunities, that\'s fine — but don\'t lead with "we\'re hiring."',
  },
  {
    title: "Don't share others' info without consent",
    description:
      "If someone shares their contact details, project ideas, or personal stories at the table, don't share them elsewhere without explicit permission.",
  },
  {
    title: "Respect dietary and cultural differences",
    description:
      "Be mindful and respectful of different dietary needs, cultural practices, and personal choices. Never pressure anyone about their food or drink choices.",
  },
  {
    title: "Phones away during icebreakers",
    description:
      "During the structured icebreaker rounds, keep phones away to be fully present. The DevTables app is the exception — use it for prompts and check-ins.",
  },
  {
    title: "What's shared at the table stays at the table",
    description:
      "Conversations at DevTables dinners are confidential by default. Don't quote, screenshot, or share what others say without their permission. Build trust, not content.",
  },
];

export default function CodeOfConductPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/devtables"
        className="mb-6 inline-flex items-center gap-1 text-sm text-text-secondary hover:text-accent transition-colors"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </Link>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-text-primary">Code of Conduct</h1>
        <p className="mt-3 text-text-secondary">
          DevTables brings developers together over dinner for meaningful conversation.
          To keep it that way, we ask everyone to follow these guidelines.
        </p>
      </div>

      <div className="space-y-6">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="rounded-xl border border-border bg-surface p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-bold text-accent">
                {index + 1}
              </span>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{rule.title}</h2>
                <p className="mt-2 leading-relaxed text-text-secondary">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-xl border border-accent/20 bg-accent/5 p-6">
        <h2 className="text-lg font-semibold text-text-primary">Reporting violations</h2>
        <p className="mt-2 leading-relaxed text-text-secondary">
          If you experience or witness a violation of this Code of Conduct, please report it through
          the app or speak with an organizer. All reports are confidential and will be taken seriously.
          We are committed to making DevTables a safe space for everyone.
        </p>
      </div>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-sm text-text-secondary">
          By attending a DevTables dinner, you agree to abide by this Code of Conduct.
        </p>
      </div>
    </div>
  );
}
