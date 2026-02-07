import { Developer, OpenProject, DevTablesUser, Venue, DevTablesEvent, IcebreakerPrompt, Booking, DinnerTable, Feedback, Connection, Report, Block } from "./types";

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

// ── DevTables Mock Data ──────────────────────────

const av = (seed: string, bg: string) =>
  `https://api.dicebear.com/9.x/notionists/png?seed=${seed}&size=128&backgroundColor=${bg}`;

export const devTablesUsers: DevTablesUser[] = [
  { id: "dt-1", name: "Camila Torres", displayName: "Camila", email: "camila@example.com", avatar: av("Camila","b6e3f4"), bio: "Full-stack dev building fintech products. Love React and salsa.", github: "camilatorres", location: "Medellin, Colombia", title: "Full-Stack Developer", technologies: ["TypeScript","React","Node.js","PostgreSQL","AWS"], projects: [], availableForCollab: true, role: "admin", locale: "es", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "mid", goals: ["find_collaborators","socialize"], languagePref: "either", linkedinUrl: "https://linkedin.com/in/camilatorres", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-15T10:00:00Z" },
  { id: "dt-2", name: "Santiago Restrepo", displayName: "Santiago", email: "santiago@example.com", avatar: av("Santiago","c0aede"), bio: "Backend engineer obsessed with Rust and distributed systems.", github: "santirestrepo", location: "Medellin, Colombia", title: "Backend Engineer", technologies: ["Rust","Go","Kafka","Redis","Docker"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "backend", experienceLevel: "senior", goals: ["learn_tech","meet_cofounders"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-15T10:00:00Z" },
  { id: "dt-3", name: "Valentina Gomez", displayName: "Valentina", email: "vale@example.com", avatar: av("Valentina","ffd5dc"), bio: "Frontend specialist building accessible, beautiful interfaces.", github: "valegomez", location: "Medellin, Colombia", title: "Frontend Engineer", technologies: ["React","Next.js","CSS","Tailwind CSS","Figma"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "frontend", experienceLevel: "mid", goals: ["find_collaborators","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-16T10:00:00Z" },
  { id: "dt-4", name: "Daniel Ochoa", displayName: "Daniel", email: "daniel@example.com", avatar: av("Daniel","d1f4d9"), bio: "ML engineer making AI accessible to everyone. Python & PyTorch.", github: "danielochoa", location: "Medellin, Colombia", title: "ML Engineer", technologies: ["Python","PyTorch","FastAPI","Docker","TensorFlow"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "centro", roleCategory: "ml", experienceLevel: "senior", goals: ["meet_cofounders","learn_tech"], languagePref: "spanish_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-16T10:00:00Z" },
  { id: "dt-5", name: "Isabella Martinez", displayName: "Isabella", email: "isa@example.com", avatar: av("Isabella","ffeab6"), bio: "Mobile dev shipping pixel-perfect apps. React Native enthusiast.", github: "isamartinez", location: "Medellin, Colombia", title: "Mobile Developer", technologies: ["React Native","TypeScript","Swift","Firebase","Expo"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "envigado", roleCategory: "mobile", experienceLevel: "junior", goals: ["find_collaborators","socialize"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-17T10:00:00Z" },
  { id: "dt-6", name: "James Walker", displayName: "James", email: "james@example.com", avatar: av("James","c3e4f7"), bio: "DevOps engineer automating all the things. Terraform and K8s.", github: "jameswalker", location: "Medellin, Colombia", title: "DevOps Engineer", technologies: ["Terraform","AWS","Kubernetes","Go","GitHub Actions"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "devops", experienceLevel: "senior", goals: ["socialize","learn_tech"], languagePref: "english_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-17T10:00:00Z" },
  { id: "dt-7", name: "Laura Herrera", displayName: "Laura", email: "laura@example.com", avatar: av("Laura","f4d9b6"), bio: "UX engineer who codes. Bridging design and development.", github: "lauraherrera", location: "Medellin, Colombia", title: "UX Engineer", technologies: ["React","Figma","CSS","Storybook","TypeScript"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "design", experienceLevel: "mid", goals: ["find_collaborators","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-18T10:00:00Z" },
  { id: "dt-8", name: "Andres Mejia", displayName: "Andres", email: "andres@example.com", avatar: av("Andres","deb6e3"), bio: "Full-stack freelancer building SaaS products. Next.js + Supabase.", github: "andresmejia", location: "Medellin, Colombia", title: "Full-Stack Developer", technologies: ["Next.js","TypeScript","Supabase","Tailwind CSS","Prisma"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "mid", goals: ["meet_cofounders","find_collaborators"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-18T10:00:00Z" },
  { id: "dt-9", name: "Sarah Mitchell", displayName: "Sarah", email: "sarah.m@example.com", avatar: av("SarahM","b6e3f4"), bio: "Digital nomad. Full-stack developer focused on fintech.", github: "sarahmitchell", location: "Medellin, Colombia", title: "Full-Stack Developer", technologies: ["TypeScript","React","Node.js","MongoDB","Stripe API"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "senior", goals: ["socialize","meet_cofounders"], languagePref: "english_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-19T10:00:00Z" },
  { id: "dt-10", name: "Felipe Cardona", displayName: "Felipe", email: "felipe@example.com", avatar: av("Felipe","c0aede"), bio: "Backend developer specializing in microservices and event-driven architectures.", github: "felipecardona", location: "Medellin, Colombia", title: "Backend Developer", technologies: ["Java","Spring Boot","Kafka","PostgreSQL","Docker"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "centro", roleCategory: "backend", experienceLevel: "mid", goals: ["learn_tech","find_collaborators"], languagePref: "spanish_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-19T10:00:00Z" },
  { id: "dt-11", name: "Mariana Lopez", displayName: "Mariana", email: "mariana@example.com", avatar: av("Mariana","ffd5dc"), bio: "Data scientist turned ML engineer. Building recommendation systems.", github: "marianalopez", location: "Medellin, Colombia", title: "ML Engineer", technologies: ["Python","Scikit-learn","TensorFlow","SQL","Pandas"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "ml", experienceLevel: "junior", goals: ["learn_tech","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-20T10:00:00Z" },
  { id: "dt-12", name: "Tom Bradley", displayName: "Tom", email: "tom@example.com", avatar: av("Tom","d1f4d9"), bio: "Indie hacker building micro-SaaS products. Shipped 4 products this year.", github: "tombradley", location: "Medellin, Colombia", title: "Indie Developer", technologies: ["Next.js","TypeScript","Stripe","Tailwind CSS","Vercel"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "mid", goals: ["meet_cofounders","socialize"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-20T10:00:00Z" },
  { id: "dt-13", name: "Juliana Rios", displayName: "Juliana", email: "juliana@example.com", avatar: av("Juliana","ffeab6"), bio: "Frontend dev passionate about animations and micro-interactions.", github: "julianadev", location: "Medellin, Colombia", title: "Frontend Developer", technologies: ["React","Framer Motion","CSS","Three.js","TypeScript"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "envigado", roleCategory: "frontend", experienceLevel: "junior", goals: ["find_collaborators","learn_tech"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-21T10:00:00Z" },
  { id: "dt-14", name: "Carlos Duque", displayName: "Carlos", email: "carlos@example.com", avatar: av("Carlos","c3e4f7"), bio: "Platform engineer. Building internal tools and developer experience.", github: "carlosduque", location: "Medellin, Colombia", title: "Platform Engineer", technologies: ["Go","Terraform","AWS","Docker","Kubernetes"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "devops", experienceLevel: "mid", goals: ["learn_tech","socialize"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-21T10:00:00Z" },
  { id: "dt-15", name: "Emma Chen", displayName: "Emma", email: "emma@example.com", avatar: av("EmmaC","f4d9b6"), bio: "Product-minded engineer. Previously at a YC startup, now exploring Medellin.", github: "emmachen", location: "Medellin, Colombia", title: "Software Engineer", technologies: ["TypeScript","React","Python","GraphQL","PostgreSQL"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "senior", goals: ["meet_cofounders","find_collaborators"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-22T10:00:00Z" },
  { id: "dt-16", name: "Nicolas Parra", displayName: "Nicolas", email: "nico@example.com", avatar: av("Nicolas","deb6e3"), bio: "Mobile developer building apps for Latin American fintech.", github: "nicoparra", location: "Medellin, Colombia", title: "Mobile Developer", technologies: ["Kotlin","Swift","Flutter","Firebase","TypeScript"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "mobile", experienceLevel: "mid", goals: ["find_collaborators","socialize"], languagePref: "spanish_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-22T10:00:00Z" },
  { id: "dt-17", name: "Alejandra Velez", displayName: "Alejandra", email: "ale@example.com", avatar: av("Alejandra","b6e3f4"), bio: "Backend engineer scaling systems at a fintech company.", github: "alevelez", location: "Medellin, Colombia", title: "Backend Engineer", technologies: ["Node.js","TypeScript","PostgreSQL","Redis","RabbitMQ"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "backend", experienceLevel: "mid", goals: ["learn_tech","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-23T10:00:00Z" },
  { id: "dt-18", name: "Ryan Cooper", displayName: "Ryan", email: "ryan@example.com", avatar: av("Ryan","c0aede"), bio: "Blockchain developer exploring Web3 in Medellin's growing tech scene.", github: "ryancooper", location: "Medellin, Colombia", title: "Blockchain Developer", technologies: ["Solidity","TypeScript","React","Ethers.js","Hardhat"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "other", experienceLevel: "mid", goals: ["meet_cofounders","socialize"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-23T10:00:00Z" },
  { id: "dt-19", name: "Catalina Munoz", displayName: "Catalina", email: "cata@example.com", avatar: av("Catalina","ffd5dc"), bio: "QA engineer turned developer. Quality-first mindset in everything.", github: "catamunoz", location: "Medellin, Colombia", title: "QA Engineer", technologies: ["TypeScript","Playwright","Jest","Cypress","Node.js"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "envigado", roleCategory: "other", experienceLevel: "junior", goals: ["learn_tech","find_collaborators"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-24T10:00:00Z" },
  { id: "dt-20", name: "Sebastian Arango", displayName: "Sebastian", email: "seba@example.com", avatar: av("Sebastian","d1f4d9"), bio: "Cloud architect designing scalable systems for startups.", github: "sebarango", location: "Medellin, Colombia", title: "Cloud Architect", technologies: ["AWS","GCP","Terraform","Python","Docker","Kubernetes"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "devops", experienceLevel: "senior", goals: ["socialize","meet_cofounders"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-24T10:00:00Z" },
  { id: "dt-21", name: "Maria Fernanda Gil", displayName: "Maria", email: "mafe@example.com", avatar: av("MaFe","ffeab6"), bio: "Full-stack developer with a passion for edtech products.", github: "mafegil", location: "Medellin, Colombia", title: "Full-Stack Developer", technologies: ["React","Node.js","MongoDB","TypeScript","GraphQL"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "fullstack", experienceLevel: "junior", goals: ["find_collaborators","learn_tech"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-25T10:00:00Z" },
  { id: "dt-22", name: "David Kim", displayName: "David", email: "david.k@example.com", avatar: av("DavidK","c3e4f7"), bio: "AI startup founder. Building LLM-powered developer tools.", github: "davidkim", location: "Medellin, Colombia", title: "Founder / Engineer", technologies: ["Python","TypeScript","OpenAI API","React","FastAPI"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "ml", experienceLevel: "senior", goals: ["meet_cofounders","find_collaborators"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-25T10:00:00Z" },
  { id: "dt-23", name: "Luisa Betancur", displayName: "Luisa", email: "luisa@example.com", avatar: av("Luisa","f4d9b6"), bio: "UI designer who codes. Creating design systems at scale.", github: "luisadesign", location: "Medellin, Colombia", title: "Design Engineer", technologies: ["React","Figma","Storybook","CSS","TypeScript"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "centro", roleCategory: "design", experienceLevel: "mid", goals: ["find_collaborators","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-26T10:00:00Z" },
  { id: "dt-24", name: "Miguel Salazar", displayName: "Miguel", email: "miguel@example.com", avatar: av("Miguel","deb6e3"), bio: "Security engineer focused on application security and pentesting.", github: "miguelsalazar", location: "Medellin, Colombia", title: "Security Engineer", technologies: ["Python","Go","AWS","Docker","Linux"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "other", experienceLevel: "senior", goals: ["learn_tech","socialize"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-26T10:00:00Z" },
  { id: "dt-25", name: "Ana Sofia Rincon", displayName: "Ana", email: "anasofia@example.com", avatar: av("AnaSofia","b6e3f4"), bio: "Frontend dev focused on performance. Core Web Vitals nerd.", github: "anasofiadev", location: "Medellin, Colombia", title: "Frontend Developer", technologies: ["React","Next.js","TypeScript","Webpack","Lighthouse"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "laureles", roleCategory: "frontend", experienceLevel: "mid", goals: ["learn_tech","find_collaborators"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-27T10:00:00Z" },
  { id: "dt-26", name: "Chris Taylor", displayName: "Chris", email: "chris@example.com", avatar: av("ChrisT","c0aede"), bio: "Remote CTO helping startups scale. Loves mentoring junior devs.", github: "christaylor", location: "Medellin, Colombia", title: "CTO / Advisor", technologies: ["TypeScript","React","AWS","PostgreSQL","Redis","Go"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "senior", goals: ["socialize","meet_cofounders"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-27T10:00:00Z" },
  { id: "dt-27", name: "Paula Andrea Castillo", displayName: "Paula", email: "paula@example.com", avatar: av("Paula","ffd5dc"), bio: "Data engineer building pipelines and analytics platforms.", github: "paulacastillo", location: "Medellin, Colombia", title: "Data Engineer", technologies: ["Python","Apache Spark","SQL","Airflow","dbt"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "envigado", roleCategory: "backend", experienceLevel: "mid", goals: ["learn_tech","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-28T10:00:00Z" },
  { id: "dt-28", name: "Juan Pablo Echeverri", displayName: "Juan Pablo", email: "juanpablo@example.com", avatar: av("JuanPablo","d1f4d9"), bio: "iOS developer creating apps for the Colombian market.", github: "jpecheverri", location: "Medellin, Colombia", title: "iOS Developer", technologies: ["Swift","SwiftUI","Xcode","Firebase","CoreData"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "poblado", roleCategory: "mobile", experienceLevel: "junior", goals: ["find_collaborators","socialize"], languagePref: "spanish_only", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-28T10:00:00Z" },
  { id: "dt-29", name: "Lisa Park", displayName: "Lisa", email: "lisa@example.com", avatar: av("Lisa","ffeab6"), bio: "Freelance developer and tech writer. Building in public.", github: "lisapark", location: "Medellin, Colombia", title: "Freelance Developer", technologies: ["TypeScript","React","Next.js","Tailwind CSS","MDX"], projects: [], availableForCollab: true, role: "attendee", locale: "en", cityZone: "poblado", roleCategory: "fullstack", experienceLevel: "mid", goals: ["socialize","practice_language"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-29T10:00:00Z" },
  { id: "dt-30", name: "Esteban Montoya", displayName: "Esteban", email: "esteban@example.com", avatar: av("Esteban","c3e4f7"), bio: "Game dev turned web dev. Bringing interactive experiences to the browser.", github: "estebanmontoya", location: "Medellin, Colombia", title: "Creative Developer", technologies: ["TypeScript","Three.js","WebGL","React","Blender"], projects: [], availableForCollab: true, role: "attendee", locale: "es", cityZone: "centro", roleCategory: "frontend", experienceLevel: "mid", goals: ["find_collaborators","meet_cofounders"], languagePref: "either", acceptedCoc: true, isSuspended: false, isBanned: false, createdAt: "2026-01-29T10:00:00Z" },
];

export const venues: Venue[] = [
  { id: "venue-1", name: "Cafe Velvet", type: "cafe", address: "Cra 35 #8A-3, El Poblado", cityZone: "poblado", capacity: 18, tablesAvailable: 3, mapUrl: "https://maps.google.com/?q=Cafe+Velvet+Medellin", isActive: true },
  { id: "venue-2", name: "Pergamino Cafe", type: "cafe", address: "Cra 37 #8A-37, El Poblado", cityZone: "poblado", capacity: 12, tablesAvailable: 2, mapUrl: "https://maps.google.com/?q=Pergamino+Cafe+Medellin", isActive: true },
  { id: "venue-3", name: "Selina Cowork", type: "cowork", address: "Cl 10 #41-30, El Poblado", cityZone: "poblado", capacity: 24, tablesAvailable: 4, mapUrl: "https://maps.google.com/?q=Selina+Medellin", isActive: true },
  { id: "venue-4", name: "El Social", type: "restaurant", address: "Cra 33 #7-51, El Poblado", cityZone: "poblado", capacity: 30, tablesAvailable: 5, mapUrl: "https://maps.google.com/?q=El+Social+Medellin", isActive: true },
  { id: "venue-5", name: "Envy Rooftop", type: "bar", address: "Cl 10 #36-18, El Poblado", cityZone: "poblado", capacity: 40, tablesAvailable: 0, mapUrl: "https://maps.google.com/?q=Envy+Rooftop+Medellin", notes: "Last Drinks venue only", isActive: true },
];

export const devTablesEvents: DevTablesEvent[] = [
  { id: "event-1", title: "DevTables Medellin #1", eventDate: "2026-02-11", startTime: "19:00", durationMin: 90, city: "medellin", cityZone: "poblado", maxAttendees: 30, status: "open", venueIds: ["venue-1","venue-2","venue-4"], lastDrinksVenueId: "venue-5", createdAt: "2026-02-01T10:00:00Z" },
  { id: "event-2", title: "DevTables Medellin #2", eventDate: "2026-02-18", startTime: "19:00", durationMin: 90, city: "medellin", cityZone: "poblado", maxAttendees: 30, status: "open", venueIds: ["venue-1","venue-3","venue-4"], lastDrinksVenueId: "venue-5", createdAt: "2026-02-01T10:00:00Z" },
  { id: "event-3", title: "DevTables Medellin #3", eventDate: "2026-02-25", startTime: "19:00", durationMin: 90, city: "medellin", cityZone: "poblado", maxAttendees: 30, status: "open", venueIds: ["venue-2","venue-3","venue-4"], lastDrinksVenueId: "venue-5", createdAt: "2026-02-01T10:00:00Z" },
  { id: "event-4", title: "DevTables Medellin #4", eventDate: "2026-03-04", startTime: "19:00", durationMin: 90, city: "medellin", cityZone: "poblado", maxAttendees: 30, status: "open", venueIds: ["venue-1","venue-4"], lastDrinksVenueId: "venue-5", createdAt: "2026-02-01T10:00:00Z" },
];

export const icebreakerPrompts: IcebreakerPrompt[] = [
  { id: "p-1", round: "warmup", textEn: "What's one tool in your dev setup you'd recommend to anyone?", textEs: "Cual herramienta de tu setup le recomendarias a cualquiera?", isActive: true },
  { id: "p-2", round: "warmup", textEn: "What side project are you secretly most proud of?", textEs: "De cual side project estas secretamente mas orgulloso?", isActive: true },
  { id: "p-3", round: "warmup", textEn: "Tabs or spaces? Vim or VS Code? Pick a hill and die on it.", textEs: "Tabs o espacios? Vim o VS Code? Elige tu colina y defiendela.", isActive: true },
  { id: "p-4", round: "warmup", textEn: "What was the first program you ever wrote?", textEs: "Cual fue el primer programa que escribiste?", isActive: true },
  { id: "p-5", round: "warmup", textEn: "What's a technology you tried and immediately loved?", textEs: "Cual tecnologia probaste y te enamoro al instante?", isActive: true },
  { id: "p-6", round: "warmup", textEn: "If you weren't a developer, what would you be doing?", textEs: "Si no fueras developer, que estarias haciendo?", isActive: true },
  { id: "p-7", round: "warmup", textEn: "What's your most controversial tech opinion?", textEs: "Cual es tu opinion tech mas controversial?", isActive: true },
  { id: "p-8", round: "warmup", textEn: "What's the best thing about the Medellin dev scene?", textEs: "Que es lo mejor de la escena tech en Medellin?", isActive: true },
  { id: "p-9", round: "warmup", textEn: "Coffee or mate while coding?", textEs: "Cafe o mate mientras programas?", isActive: true },
  { id: "p-10", round: "warmup", textEn: "What coding playlist are you listening to right now?", textEs: "Que playlist de coding estas escuchando ahora?", isActive: true },
  { id: "p-11", round: "warmup", textEn: "What's one tech skill you want to learn this year?", textEs: "Que habilidad tech quieres aprender este ano?", isActive: true },
  { id: "p-12", round: "warmup", textEn: "Mac, Linux, or Windows? Why?", textEs: "Mac, Linux o Windows? Por que?", isActive: true },
  { id: "p-13", round: "warmup", textEn: "What's the weirdest bug you've ever encountered?", textEs: "Cual es el bug mas raro que has encontrado?", isActive: true },
  { id: "p-14", round: "warmup", textEn: "Light mode or dark mode? Defend your choice.", textEs: "Modo claro o modo oscuro? Defiende tu eleccion.", isActive: true },
  { id: "p-15", round: "warmup", textEn: "What's one open source project you love and why?", textEs: "Cual proyecto open source amas y por que?", isActive: true },
  { id: "p-16", round: "depth", textEn: "What technical decision have you regretted the most?", textEs: "Cual decision tecnica has lamentado mas?", isActive: true },
  { id: "p-17", round: "depth", textEn: "Tell us about a time you had to ask for help and what it taught you.", textEs: "Cuentanos de una vez que tuviste que pedir ayuda y que aprendiste.", isActive: true },
  { id: "p-18", round: "depth", textEn: "What's the biggest gap between what companies say they value and what they reward in engineering?", textEs: "Cual es la mayor brecha entre lo que las empresas dicen valorar y lo que premian en ingenieria?", isActive: true },
  { id: "p-19", round: "depth", textEn: "If you could fix one thing about developer culture, what would it be?", textEs: "Si pudieras arreglar una cosa de la cultura dev, cual seria?", isActive: true },
  { id: "p-20", round: "depth", textEn: "What's something you believed about software engineering that turned out to be wrong?", textEs: "Que creias sobre ingenieria de software que resulto ser falso?", isActive: true },
  { id: "p-21", round: "depth", textEn: "Describe a failure you're now grateful for.", textEs: "Describe un fracaso por el que ahora estas agradecido.", isActive: true },
  { id: "p-22", round: "depth", textEn: "What's the hardest conversation you've had at work, and how did it go?", textEs: "Cual es la conversacion mas dificil que has tenido en el trabajo?", isActive: true },
  { id: "p-23", round: "depth", textEn: "How do you handle imposter syndrome?", textEs: "Como manejas el sindrome del impostor?", isActive: true },
  { id: "p-24", round: "depth", textEn: "What's a piece of advice that changed how you approach coding?", textEs: "Que consejo cambio tu forma de programar?", isActive: true },
  { id: "p-25", round: "depth", textEn: "When did you realize you were actually good at this?", textEs: "Cuando te diste cuenta de que eras bueno en esto?", isActive: true },
  { id: "p-26", round: "depth", textEn: "What do you wish someone had told you at the start of your career?", textEs: "Que desearias que alguien te hubiera dicho al inicio de tu carrera?", isActive: true },
  { id: "p-27", round: "depth", textEn: "How do you balance learning new things vs. shipping?", textEs: "Como balanceas aprender cosas nuevas vs. entregar producto?", isActive: true },
  { id: "p-28", round: "depth", textEn: "What does good engineering leadership look like to you?", textEs: "Como se ve un buen liderazgo de ingenieria para ti?", isActive: true },
  { id: "p-29", round: "depth", textEn: "What's a technology that's overhyped right now?", textEs: "Que tecnologia esta sobrevalorada ahora mismo?", isActive: true },
  { id: "p-30", round: "depth", textEn: "What's the best code review feedback you've ever received?", textEs: "Cual es el mejor feedback de code review que has recibido?", isActive: true },
  { id: "p-31", round: "depth", textEn: "How has remote work changed the way you collaborate?", textEs: "Como ha cambiado el trabajo remoto tu forma de colaborar?", isActive: true },
  { id: "p-32", round: "depth", textEn: "What's a problem in your city that tech could solve?", textEs: "Que problema de tu ciudad podria resolver la tecnologia?", isActive: true },
  { id: "p-33", round: "depth", textEn: "Describe your ideal engineering team culture.", textEs: "Describe la cultura de equipo de ingenieria ideal para ti.", isActive: true },
  { id: "p-34", round: "depth", textEn: "What's a project you abandoned and why?", textEs: "Cual es un proyecto que abandonaste y por que?", isActive: true },
  { id: "p-35", round: "depth", textEn: "How do you decide what to work on next?", textEs: "Como decides en que trabajar despues?", isActive: true },
  { id: "p-36", round: "future", textEn: "What technology do you think will be irrelevant in 5 years?", textEs: "Que tecnologia crees que sera irrelevante en 5 anos?", isActive: true },
  { id: "p-37", round: "future", textEn: "What's the project you keep putting off? What's stopping you?", textEs: "Cual es el proyecto que sigues posponiendo? Que te detiene?", isActive: true },
  { id: "p-38", round: "future", textEn: "Look around this table — who would you want to build something with, and what would it be?", textEs: "Mira alrededor de esta mesa — con quien querrias construir algo y que seria?", isActive: true },
  { id: "p-39", round: "future", textEn: "What would you build if you had 6 months and zero financial pressure?", textEs: "Que construirias si tuvieras 6 meses y cero presion financiera?", isActive: true },
  { id: "p-40", round: "future", textEn: "What does success look like for you in 2 years?", textEs: "Como se ve el exito para ti en 2 anos?", isActive: true },
  { id: "p-41", round: "future", textEn: "What's a startup idea you'd love to see someone build?", textEs: "Que idea de startup te gustaria que alguien construyera?", isActive: true },
  { id: "p-42", round: "future", textEn: "How will AI change the way we write code in the next 3 years?", textEs: "Como cambiara la IA la forma en que escribimos codigo en 3 anos?", isActive: true },
  { id: "p-43", round: "future", textEn: "If you could master one new skill overnight, what would it be?", textEs: "Si pudieras dominar una nueva habilidad de la noche a la manana, cual seria?", isActive: true },
  { id: "p-44", round: "future", textEn: "What advice would you give to someone starting their dev career today?", textEs: "Que consejo le darias a alguien que comienza su carrera dev hoy?", isActive: true },
  { id: "p-45", round: "future", textEn: "What's a collaboration that came from an unexpected connection?", textEs: "Cual es una colaboracion que surgio de una conexion inesperada?", isActive: true },
  { id: "p-46", round: "future", textEn: "What problem in Latin America could this table solve together?", textEs: "Que problema de Latinoamerica podria resolver esta mesa junta?", isActive: true },
  { id: "p-47", round: "future", textEn: "What's the most exciting thing happening in tech right now?", textEs: "Que es lo mas emocionante que esta pasando en tech ahora?", isActive: true },
  { id: "p-48", round: "future", textEn: "If you founded a company tomorrow, what would it do?", textEs: "Si fundaras una empresa manana, que haria?", isActive: true },
  { id: "p-49", round: "future", textEn: "What's one thing you want to learn from someone at this table?", textEs: "Que es algo que quieres aprender de alguien en esta mesa?", isActive: true },
  { id: "p-50", round: "future", textEn: "What will you do differently after tonight?", textEs: "Que haras diferente despues de esta noche?", isActive: true },
];

export const initialBookings: Booking[] = [];
export const initialTables: DinnerTable[] = [];
export const initialFeedback: Feedback[] = [];
export const initialConnections: Connection[] = [];
export const initialReports: Report[] = [];
export const initialBlocks: Block[] = [];
