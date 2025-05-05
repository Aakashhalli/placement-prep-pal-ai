export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export type ResumeTemplateType = "modern" | "classic" | "minimal";

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
  location: string;
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

export interface WorkExperience extends Experience {
  responsibilities: string[];
  skills: string[];
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

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface Award {
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface Publication {
  title: string;
  publisher: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Language {
  name: string;
  proficiency: "Native" | "Fluent" | "Intermediate" | "Basic";
}

export interface Resume {
  id?: string;
  userId?: string;
  template: ResumeTemplateType;
  personalInfo: PersonalInfo;
  education: Education[];
  skills: Skill[];
  experience: Experience[];
  projects: Project[];
  certifications?: Certification[];
  awards?: Award[];
  publications?: Publication[];
  languages?: Language[];
  createdAt?: string;
  updatedAt?: string;
}

export interface VideoNote {
  id: string;
  userId?: string;
  title: string;
  url: string;
  content: string;
  topics: string[];
  timestamp: string;
  questions: string[];
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  streak: number;
  joinDate: Date;
  progress?: {
    topicsCompleted: number;
    grandTestUnlocked: boolean;
    averageScore?: number;
  };
}

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Topic types
export interface SubTopic {
  id: string;
  name: string;
  link: string;
}

export interface Topic {
  id: string;
  name: string;
  description: string;
  icon: string;
  totalQuestions: number;
  completedQuestions: number;
  score: number;
  isUnlocked: boolean;
  recommendation?: string;
  attempts?: number;
  avgTime?: number;
  subtopics?: SubTopic[];
}

// Quiz types
export interface Question {
  id: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  topicId: string;
  userId: string;
  score: number;
  timeSpent: number;
  date: Date;
  questionsAttempted: number;
  correctAnswers: number;
}

// Flashcard types
export interface Flashcard {
  id: string;
  title: string;
  content: string;
  dateCreated: Date;
  isRead: boolean;
}

// Progress types
export interface Progress {
  topicsCompleted: number;
  totalTopics: number;
  averageScore: number;
  grandTestUnlocked: boolean;
}
