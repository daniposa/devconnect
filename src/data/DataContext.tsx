"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Developer, OpenProject } from "./types";
import { developers as initialDevelopers, openProjects as initialProjects } from "./mock";

interface DataContextType {
  developers: Developer[];
  projects: OpenProject[];
  addDeveloper: (dev: Developer) => void;
  addProject: (proj: OpenProject) => void;
  getDeveloperById: (id: string) => Developer | undefined;
  getProjectById: (id: string) => OpenProject | undefined;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: ReactNode }) {
  const [developers, setDevelopers] = useState<Developer[]>(initialDevelopers);
  const [projects, setProjects] = useState<OpenProject[]>(initialProjects);

  const addDeveloper = (dev: Developer) => {
    setDevelopers((prev) => [dev, ...prev]);
  };

  const addProject = (proj: OpenProject) => {
    setProjects((prev) => [proj, ...prev]);
  };

  const getDeveloperById = (id: string) => developers.find((d) => d.id === id);
  const getProjectById = (id: string) => projects.find((p) => p.id === id);

  return (
    <DataContext.Provider
      value={{ developers, projects, addDeveloper, addProject, getDeveloperById, getProjectById }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
