const colorMap: Record<string, string> = {
  TypeScript: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  JavaScript: "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  React: "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Next.js": "bg-white/10 text-white border-white/20",
  "Node.js": "bg-green-500/10 text-green-400 border-green-500/20",
  Python: "bg-yellow-600/10 text-yellow-300 border-yellow-600/20",
  Rust: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Go: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  Swift: "bg-orange-400/10 text-orange-300 border-orange-400/20",
  Kotlin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  PostgreSQL: "bg-blue-600/10 text-blue-300 border-blue-600/20",
  Redis: "bg-red-500/10 text-red-400 border-red-500/20",
  Docker: "bg-blue-400/10 text-blue-300 border-blue-400/20",
  Kubernetes: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  AWS: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  GraphQL: "bg-pink-500/10 text-pink-400 border-pink-500/20",
  Kafka: "bg-slate-400/10 text-slate-300 border-slate-400/20",
  "React Native": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Firebase: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Figma: "bg-purple-400/10 text-purple-300 border-purple-400/20",
  Terraform: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "GitHub Actions": "bg-gray-400/10 text-gray-300 border-gray-400/20",
  PyTorch: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  FastAPI: "bg-teal-500/10 text-teal-400 border-teal-500/20",
  CSS: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Svelte: "bg-orange-600/10 text-orange-400 border-orange-600/20",
  WebGL: "bg-red-400/10 text-red-300 border-red-400/20",
  WebAssembly: "bg-purple-600/10 text-purple-400 border-purple-600/20",
  Storybook: "bg-pink-400/10 text-pink-300 border-pink-400/20",
  "Testing Library": "bg-red-500/10 text-red-400 border-red-500/20",
  "OpenAI API": "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "GitHub API": "bg-gray-400/10 text-gray-300 border-gray-400/20",
  Prometheus: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  Grafana: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  "Tailwind CSS": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
};

const fallback = "bg-indigo-500/10 text-indigo-400 border-indigo-500/20";

export default function TechBadge({ name }: { name: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-3 py-1 text-xs font-medium ${colorMap[name] || fallback}`}
    >
      {name}
    </span>
  );
}
