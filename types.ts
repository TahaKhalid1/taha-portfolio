export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  imageUrl: string;
  link: string;
  company: string;
}

export interface ExperienceProject {
  name: string;
  domain?: string;
  details: string;
  bulletPoints: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  projects: ExperienceProject[];
  technologies: string[];
}

export interface Skill {
  name: string;
  level: number;
  icon: string;
  category: 'Backend' | 'Frontend' | 'Cloud' | 'Database' | 'Other';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  date: string;
  gpa: string;
  honors: string[];
}