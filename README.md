# DevConnect

A developer networking and collaboration platform where developers can showcase their profiles, discover other talented developers, and find open-source projects seeking contributors.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)

## Features

- **Developer Directory** — Browse developer profiles with tech stacks, personal projects, GitHub links, and collaboration availability
- **Project Discovery** — Find open-source projects actively recruiting contributors, organized by status (Recruiting, In Progress, Launched)
- **Profile Creation** — Create a developer profile showcasing your skills, projects, and availability
- **Project Posting** — Post new projects with role openings and recruit team members
- **Apply to Join** — Browse open roles on projects and apply to collaborate

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| UI | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Avatars | [DiceBear API](https://www.dicebear.com/) |

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

```bash
git clone https://github.com/daniposa/devconnect.git
cd devconnect
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home — developer directory
│   ├── layout.tsx                # Root layout with global state
│   ├── globals.css               # Tailwind theme configuration
│   ├── developers/
│   │   ├── [id]/page.tsx         # Developer profile detail
│   │   └── new/page.tsx          # Create developer profile
│   └── projects/
│       ├── [id]/page.tsx         # Project detail page
│       └── new/page.tsx          # Create new project
├── components/
│   ├── Navbar.tsx                # Navigation header
│   ├── DeveloperCard.tsx         # Developer card for listings
│   ├── ProjectCard.tsx           # Project card for listings
│   └── TechBadge.tsx             # Color-coded technology badge
└── data/
    ├── types.ts                  # TypeScript interfaces
    ├── mock.ts                   # Sample developers & projects
    └── DataContext.tsx            # React Context state management
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Developer directory with profile cards |
| `/developers/[id]` | Individual developer profile |
| `/developers/new` | Create a new developer profile |
| `/projects` | Open projects directory grouped by status |
| `/projects/[id]` | Project detail with team and open roles |
| `/projects/new` | Post a new project seeking contributors |

## License

MIT
