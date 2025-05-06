
export type ResumeStep = 
  | "template" 
  | "personal" 
  | "education" 
  | "skills" 
  | "experience" 
  | "projects" 
  | "preview";

export type TemplateType = "modern" | "classic" | "minimal" | "professional" | "creative";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location: string;
  jobTitle?: string;
  bio?: string;
}

export interface Education {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  gpa: string;
  location: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  startDate: string;
  endDate: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Language {
  name: string;
  proficiency: "beginner" | "intermediate" | "fluent" | "native";
}

export interface Resume {
  template: TemplateType;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certificates?: Certificate[];
  languages?: Language[];
}
