export type SkillCategory = 'Frontend' | 'Backend' | 'AI' | 'Development';

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level?: string;
  featured?: boolean;
}

export type ProjectStatus = 'published' | 'draft';

export interface ProjectStory {
  problem?: string;
  solution?: string;
  features?: string[];
  role?: string;
  challenges?: string;
  learned?: string;
  futureImprovements?: string;
}

export interface ProjectLinks {
  github?: string;
  live?: string;
  demo?: string;
}

export interface ProjectTechnologies {
  all?: string[];
  frontend?: string[];
  backend?: string[];
  ai?: string[];
}

export interface Project {
  id: string;
  name: string;
  category: string;
  shortDescription: string;
  detailedDescription?: string;
  status: ProjectStatus;
  featured: boolean;
  technologies: ProjectTechnologies;
  story?: ProjectStory;
  links?: ProjectLinks;
  // Media images
  thumbnailUrl: string;
  col1Img1: string;
  col1Img2: string;
  col2Img: string;
  extraImages?: string[];
  videoUrl?: string;
  createdAt: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  detailedDescription?: string;
  icon?: string;
  tags?: string[];
  order?: number;
  status?: 'published' | 'draft';
}

export interface AboutInfo {
  name: string;
  title: string;
  subtitle: string;
  bio: string;
  education: string;
  specialization: string;
  careerGoal: string;
  avatarUrl: string;
}

export interface ContactInfo {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}
