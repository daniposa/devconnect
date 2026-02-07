import { Developer, OpenProject } from "./types";

export const developers: Developer[] = [
  {
    id: "1",
    name: "Sarah Chen",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Sarah&size=128&backgroundColor=b6e3f4",
    bio: "Full-stack engineer passionate about developer tools and open source. Previously at Stripe, now building cool things independently.",
    github: "sarahchen",
    location: "San Francisco, CA",
    title: "Full-Stack Engineer",
    technologies: ["TypeScript", "React", "Node.js", "PostgreSQL", "AWS", "GraphQL"],
    projects: [
      {
        name: "devflow",
        description: "A CLI tool for automating development workflows",
        url: "https://github.com/sarahchen/devflow",
        stars: 342,
        language: "TypeScript",
      },
      {
        name: "pg-migrate-fast",
        description: "Zero-downtime PostgreSQL migration tool",
        url: "https://github.com/sarahchen/pg-migrate-fast",
        stars: 891,
        language: "Go",
      },
      {
        name: "react-form-architect",
        description: "Declarative form builder for React applications",
        url: "https://github.com/sarahchen/react-form-architect",
        stars: 1203,
        language: "TypeScript",
      },
    ],
    availableForCollab: true,
  },
  {
    id: "2",
    name: "Marcus Johnson",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Marcus&size=128&backgroundColor=c0aede",
    bio: "Backend engineer who loves distributed systems and performance optimization. Rust enthusiast and Kafka whisperer.",
    github: "marcusj",
    location: "Austin, TX",
    title: "Backend Engineer",
    technologies: ["Rust", "Go", "Kafka", "Redis", "Docker", "Kubernetes"],
    projects: [
      {
        name: "rustqueue",
        description: "High-performance message queue written in Rust",
        url: "https://github.com/marcusj/rustqueue",
        stars: 2105,
        language: "Rust",
      },
      {
        name: "loadtest-cli",
        description: "Simple but powerful HTTP load testing from the terminal",
        url: "https://github.com/marcusj/loadtest-cli",
        stars: 567,
        language: "Go",
      },
    ],
    availableForCollab: true,
  },
  {
    id: "3",
    name: "Priya Patel",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Priya&size=128&backgroundColor=ffd5dc",
    bio: "Frontend specialist obsessed with performance and accessibility. Building the web that works for everyone.",
    github: "priyapatel",
    location: "London, UK",
    title: "Frontend Engineer",
    technologies: ["React", "Next.js", "CSS", "Svelte", "WebGL", "Figma"],
    projects: [
      {
        name: "a11y-audit",
        description: "Automated accessibility auditing tool for web apps",
        url: "https://github.com/priyapatel/a11y-audit",
        stars: 1890,
        language: "TypeScript",
      },
      {
        name: "motion-kit",
        description: "Lightweight animation library with spring physics",
        url: "https://github.com/priyapatel/motion-kit",
        stars: 3201,
        language: "JavaScript",
      },
      {
        name: "theme-switch",
        description: "Zero-flash dark mode for any website",
        url: "https://github.com/priyapatel/theme-switch",
        stars: 445,
        language: "TypeScript",
      },
    ],
    availableForCollab: false,
  },
  {
    id: "4",
    name: "Alex Rivera",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Alex&size=128&backgroundColor=d1f4d9",
    bio: "ML engineer bridging the gap between research and production. Love building tools that make AI accessible to every developer.",
    github: "arivera",
    location: "New York, NY",
    title: "ML Engineer",
    technologies: ["Python", "PyTorch", "FastAPI", "Docker", "TypeScript", "React"],
    projects: [
      {
        name: "model-serve",
        description: "One-command ML model deployment to production",
        url: "https://github.com/arivera/model-serve",
        stars: 4521,
        language: "Python",
      },
      {
        name: "dataset-explorer",
        description: "Interactive dataset visualization and analysis tool",
        url: "https://github.com/arivera/dataset-explorer",
        stars: 789,
        language: "Python",
      },
    ],
    availableForCollab: true,
  },
  {
    id: "5",
    name: "Yuki Tanaka",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Yuki&size=128&backgroundColor=ffeab6",
    bio: "Mobile developer and design system enthusiast. Shipping pixel-perfect apps with delightful interactions.",
    github: "yukitanaka",
    location: "Tokyo, Japan",
    title: "Mobile Developer",
    technologies: ["React Native", "Swift", "Kotlin", "TypeScript", "Figma", "Firebase"],
    projects: [
      {
        name: "rn-gesture-kit",
        description: "Advanced gesture handling for React Native",
        url: "https://github.com/yukitanaka/rn-gesture-kit",
        stars: 1567,
        language: "TypeScript",
      },
      {
        name: "app-icon-gen",
        description: "Generate all required app icon sizes from a single SVG",
        url: "https://github.com/yukitanaka/app-icon-gen",
        stars: 234,
        language: "Swift",
      },
      {
        name: "design-tokens-cli",
        description: "Convert design tokens to platform-native formats",
        url: "https://github.com/yukitanaka/design-tokens-cli",
        stars: 678,
        language: "TypeScript",
      },
    ],
    availableForCollab: true,
  },
  {
    id: "6",
    name: "Jordan Kim",
    avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Jordan&size=128&backgroundColor=c3e4f7",
    bio: "DevOps/Platform engineer automating everything. If I have to do something twice, I write a script for it.",
    github: "jkim-dev",
    location: "Seattle, WA",
    title: "Platform Engineer",
    technologies: ["Terraform", "AWS", "Go", "Python", "Kubernetes", "GitHub Actions"],
    projects: [
      {
        name: "infra-as-diagram",
        description: "Auto-generate architecture diagrams from Terraform",
        url: "https://github.com/jkim-dev/infra-as-diagram",
        stars: 2890,
        language: "Go",
      },
      {
        name: "deploy-preview",
        description: "Instant preview environments for every PR",
        url: "https://github.com/jkim-dev/deploy-preview",
        stars: 1456,
        language: "Go",
      },
    ],
    availableForCollab: true,
  },
];

export const openProjects: OpenProject[] = [
  {
    id: "1",
    title: "CodeReview AI",
    description: "An AI-powered code review assistant that integrates with GitHub PRs.",
    longDescription:
      "We're building an intelligent code review tool that uses LLMs to provide actionable feedback on pull requests. The tool will integrate directly with GitHub, analyze diffs, and suggest improvements for code quality, security, and performance. We need help with the VS Code extension and the dashboard UI.",
    techStack: ["TypeScript", "React", "Node.js", "OpenAI API", "GitHub API"],
    owner: {
      developerId: "1",
      name: "Sarah Chen",
      avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Sarah&size=128&backgroundColor=b6e3f4",
    },
    contributors: [
      {
        developerId: "4",
        name: "Alex Rivera",
        avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Alex&size=128&backgroundColor=d1f4d9",
      },
    ],
    openRoles: ["Frontend Developer", "DevOps Engineer"],
    applicants: 8,
    status: "recruiting",
    createdAt: "2026-01-15",
    repoUrl: "https://github.com/sarahchen/codereview-ai",
  },
  {
    id: "2",
    title: "DevMatch",
    description: "A platform to match developers with open-source projects based on skills and interests.",
    longDescription:
      "DevMatch aims to solve the problem of finding the right open-source project to contribute to. Using a matching algorithm based on your tech stack, interests, and availability, we connect developers with projects that need their exact skills. Think of it as a dating app, but for open source contributions.",
    techStack: ["Next.js", "PostgreSQL", "Python", "FastAPI", "Tailwind CSS"],
    owner: {
      developerId: "4",
      name: "Alex Rivera",
      avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Alex&size=128&backgroundColor=d1f4d9",
    },
    contributors: [],
    openRoles: ["Full-Stack Developer", "UI/UX Designer", "Backend Developer"],
    applicants: 12,
    status: "recruiting",
    createdAt: "2026-01-22",
    repoUrl: "https://github.com/arivera/devmatch",
  },
  {
    id: "3",
    title: "InfraWatch",
    description: "Real-time infrastructure monitoring with intelligent alerting.",
    longDescription:
      "InfraWatch is an open-source monitoring solution that goes beyond simple dashboards. It uses anomaly detection to identify issues before they become outages, correlates events across services, and provides runbooks for common incidents. We're looking for contributors who are passionate about reliability engineering.",
    techStack: ["Go", "React", "Prometheus", "Grafana", "Kubernetes", "Redis"],
    owner: {
      developerId: "6",
      name: "Jordan Kim",
      avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Jordan&size=128&backgroundColor=c3e4f7",
    },
    contributors: [
      {
        developerId: "2",
        name: "Marcus Johnson",
        avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Marcus&size=128&backgroundColor=c0aede",
      },
    ],
    openRoles: ["Frontend Developer", "Go Developer"],
    applicants: 5,
    status: "in-progress",
    createdAt: "2025-12-10",
    repoUrl: "https://github.com/jkim-dev/infrawatch",
  },
  {
    id: "4",
    title: "PolyglotHub",
    description: "A collaborative code playground supporting 20+ programming languages.",
    longDescription:
      "PolyglotHub lets developers write, run, and share code in over 20 languages right from the browser. It features real-time collaboration, built-in linting, and the ability to create multi-file projects. We're looking for developers to help add new language runtimes and improve the editor experience.",
    techStack: ["TypeScript", "React", "WebAssembly", "Docker", "Node.js"],
    owner: {
      developerId: "2",
      name: "Marcus Johnson",
      avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Marcus&size=128&backgroundColor=c0aede",
    },
    contributors: [
      {
        developerId: "3",
        name: "Priya Patel",
        avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Priya&size=128&backgroundColor=ffd5dc",
      },
      {
        developerId: "5",
        name: "Yuki Tanaka",
        avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Yuki&size=128&backgroundColor=ffeab6",
      },
    ],
    openRoles: ["Compiler Engineer", "Backend Developer"],
    applicants: 3,
    status: "in-progress",
    createdAt: "2025-11-20",
    repoUrl: "https://github.com/marcusj/polyglothub",
  },
  {
    id: "5",
    title: "AccessibleUI",
    description: "A fully accessible, unstyled component library for React.",
    longDescription:
      "AccessibleUI provides a complete set of headless, fully accessible React components that developers can style however they want. Every component is built from the ground up with WAI-ARIA best practices, keyboard navigation, and screen reader support. We want to make accessibility the default, not an afterthought.",
    techStack: ["TypeScript", "React", "Storybook", "Testing Library", "CSS"],
    owner: {
      developerId: "3",
      name: "Priya Patel",
      avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Priya&size=128&backgroundColor=ffd5dc",
    },
    contributors: [
      {
        developerId: "1",
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/9.x/notionists/png?seed=Sarah&size=128&backgroundColor=b6e3f4",
      },
    ],
    openRoles: ["React Developer", "Technical Writer"],
    applicants: 7,
    status: "recruiting",
    createdAt: "2026-02-01",
    repoUrl: "https://github.com/priyapatel/accessibleui",
  },
];

export function getDeveloperById(id: string): Developer | undefined {
  return developers.find((d) => d.id === id);
}

export function getProjectById(id: string): OpenProject | undefined {
  return openProjects.find((p) => p.id === id);
}
