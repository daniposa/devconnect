export interface PersonalProject {
  name: string;
  description: string;
  url: string;
  stars: number;
  language: string;
}

export interface Developer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  github: string;
  location: string;
  title: string;
  technologies: string[];
  projects: PersonalProject[];
  availableForCollab: boolean;
}

export interface OpenProject {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  owner: {
    developerId: string;
    name: string;
    avatar: string;
  };
  contributors: {
    developerId: string;
    name: string;
    avatar: string;
  }[];
  openRoles: string[];
  applicants: number;
  status: "recruiting" | "in-progress" | "launched";
  createdAt: string;
  repoUrl: string;
}
