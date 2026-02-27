import React from 'react';
import { 
  Code2, 
  Database, 
  Cloud, 
  Cpu, 
  Layout, 
  Server, 
  Globe, 
  Layers,
  Terminal
} from 'lucide-react';
import { Project, Experience, Skill, Certification, Education } from './types';

// Extended Skill Interface to support original logos
export interface ExtendedSkill extends Skill {
  logo?: string;
}

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'TitleHound',
    company: 'Visionet / Real Matters',
    description: 'A U.S. industry-leading title rate engine for mortgage and closing costs calculation.',
    longDescription: 'High-performance mortgage calculation engine ensuring real-time compliance with state-specific US regulations. Processing over 10M+ transaction simulations annually with sub-millisecond latency.',
    tags: ['.NET Core', 'Angular', 'Azure', 'SQL Server'],
    imageUrl: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1000',
    link: 'https://titlehoundonline.com/'
  },
  {
    id: '2',
    title: 'Certus Recording',
    company: 'Visionet',
    description: 'Enterprise-grade recording and document management for real estate transactions.',
    longDescription: 'Architecting secure document handling pipelines for property recording across 3,000+ US counties. Reduced document turnaround time by 40% using asynchronous C# workflow engines.',
    tags: ['.NET', 'SOAP', 'Workflow Automation', 'Document Security'],
    imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1000',
    link: 'https://www.certusrecording.com/CertusWebsite/'
  },
  {
    id: '3',
    title: 'Latitude Financial',
    company: 'Latitude Financial Services',
    description: 'Modern digital lending platform for Australia and New Zealand markets.',
    longDescription: 'Cloud-native digital lending infrastructure serving 2M+ active customers in the ANZ region. Focused on streamlined loan application orchestration and secure financial data streaming.',
    tags: ['Fintech', 'React', 'Node.js', 'API Integration'],
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1000',
    link: 'https://www.latitudefinancial.com.au/loans/'
  },
  {
    id: '4',
    title: 'K-Electric Limited',
    company: 'K-Electric',
    description: 'Cloud-native digital utility platform for Karachi\'s primary power provider.',
    longDescription: 'Legacy-to-Cloud migration for a mega-utility billing system. Engineered a .NET 6 microservices ecosystem on Azure PaaS to manage high-concurrency billing for 3M+ active consumers.',
    tags: ['.NET 6', 'Azure PaaS', 'Microservices', 'Billing Engine'],
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=1000',
    link: 'https://live.ke.com.pk/'
  },
  {
    id: '5',
    title: 'Diligent One',
    company: 'Diligent Corporation',
    description: 'Governance, risk, and compliance (GRC) platform for enterprise leadership.',
    longDescription: 'Enterprise GRC platform optimization for global board-level risk management. Engineered complex data auditing modules and high-security compliance reporting mechanisms for Fortune 500 boards.',
    tags: ['.NET MVC', 'Governance', 'Enterprise Risk', 'SQL Server'],
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000',
    link: 'https://www.diligent.com/platform/diligent-one'
  },
  {
    id: '6',
    title: 'ProsperFleet',
    company: 'Valgen',
    description: 'Advanced fleet management and logistics optimization platform.',
    longDescription: 'Logistics tracking system leveraging Azure Functions and JWT-based security. Managing high-volume data streams for fleet optimization and real-time asset tracking in global supply chains.',
    tags: ['Azure Functions', 'JWT', 'Node.js', 'Fleet Logistics'],
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1000',
    link: 'https://www.valgen.com/'
  },
  {
    id: '7',
    title: 'Path Finance',
    company: 'Path Accountant',
    description: 'SaaS platform for modern accounting and financial health management.',
    longDescription: 'High-density financial dashboard for multi-client portfolio management. Features automated health indexing, real-time balance sheet generators, and predictive fiscal reporting.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Financial Dashboards'],
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=1000',
    link: 'https://pathaccountant.vercel.app/'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: 'exp1',
    role: 'Senior Software Engineer',
    company: 'Visionet Systems Inc',
    location: 'Karachi (Hybrid)',
    period: 'June 2021 – Present',
    description: [
      'Lead full-stack development and production support for key enterprise products.',
      'Designed and deployed cloud-native solutions on Azure.'
    ],
    projects: [
      {
        name: 'Real Matters',
        domain: 'US/Canada – Title & Mortgage Domain',
        details: 'Worked on enterprise-level products serving the U.S. mortgage and title insurance industry.',
        bulletPoints: [
          'Enhanced complex title rate calculation engines with state-specific compliance logic',
          'Developed and maintained REST & SOAP APIs',
          'Implemented microservices-based system enhancements',
          'Optimized SQL queries and backend performance',
          'Managed production deployments and hotfix releases',
          'Resolved integration issues across internal and third-party systems'
        ]
      },
      {
        name: 'Silicon Valley Bank',
        domain: 'Enterprise Cloud Integration',
        details: 'Lead Developer on large-scale data integration project.',
        bulletPoints: [
          'Integrated Essential Project Cloud APIs',
          'Designed structured data models for high-volume project records',
          'Built REST services using Python & FastAPI',
          'Improved backend scalability and performance',
          'Collaborated directly with US onsite teams'
        ]
      },
      {
        name: 'Mortgage Connect',
        domain: 'Document Processing System',
        details: 'Worked on AT Close application enhancements.',
        bulletPoints: [
          'Resolved complex multi-page barcode reading issues',
          'Enhanced SOAP-based web services',
          'Improved document processing reliability',
          'Deployed solutions using IIS'
        ]
      },
      {
        name: 'K-Electric (Utility & Energy Sector)',
        details: 'Migrated legacy SharePoint/.NET system to .NET Core 6.',
        bulletPoints: [
          'Designed Azure-based cloud architecture',
          'Implemented App Services, Blob Storage, CDN, Key Vault, Azure Functions',
          'Improved performance, scalability, and maintainability'
        ]
      },
      {
        name: 'AKD Trading Pvt Ltd',
        details: 'Developed financial workflows and optimized performance.',
        bulletPoints: [
          'Developed financial workflows (cash-in/cash-out, bank statements)',
          'Optimized backend performance',
          'Maintained day-to-day production support'
        ]
      }
    ],
    technologies: ['.NET Core', 'Angular', 'React', 'Azure', 'Python', 'SQL Server', 'Nest.js']
  },
  {
    id: 'exp2',
    role: 'Software Engineer',
    company: 'Intelligenes',
    location: 'Karachi (Onsite)',
    period: 'September 2019 – May 2021',
    description: [
      'Promoted from Associate Software Engineer to Software Engineer.',
      'Specialized in .NET MVC and cloud workflows.'
    ],
    projects: [
      {
        name: 'Diligent',
        domain: 'Medical Service Provider Platform',
        details: 'Developed and maintained .NET MVC enterprise application.',
        bulletPoints: [
          'Redesigned dynamic table data storage system',
          'Improved database structure & runtime flexibility',
          'Delivered performance optimizations'
        ]
      },
      {
        name: 'Proper Fleet',
        domain: 'Fleet Management Platform',
        details: 'Developed backend services from scratch.',
        bulletPoints: [
          'Implemented JWT authentication',
          'Integrated SendGrid email notifications',
          'Implemented Azure Functions workflows',
          'Deployed on Azure App Service'
        ]
      }
    ],
    technologies: ['.NET MVC', 'JavaScript', 'Azure', 'SQL Server', 'SendGrid']
  }
];

export const EDUCATION: Education = {
  degree: 'Bachelor of Computer Science',
  institution: 'Pakistan Air Force Karachi Institute of Economics & Technology',
  location: 'Karachi, Sindh',
  date: 'DEC 2019',
  gpa: '3.8',
  honors: ['Member of university’s Honor Society']
};

export const SKILLS: ExtendedSkill[] = [
  { name: 'C#', level: 95, icon: 'Code2', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg' },
  { name: '.NET Core', level: 95, icon: 'Server', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dotnetcore/dotnetcore-original.svg' },
  { name: '.NET 6/7/8', level: 95, icon: 'Server', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-original.svg' },
  { name: 'VB.NET', level: 85, icon: 'Code2', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dot-net/dot-net-plain-wordmark.svg' },
  { name: 'Node.js', level: 90, icon: 'Terminal', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Nest.js', level: 85, icon: 'Server', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg' },
  { name: 'Python', level: 85, icon: 'Terminal', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'PHP', level: 75, icon: 'Terminal', category: 'Backend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg' },
  { name: 'Angular', level: 90, icon: 'Globe', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg' },
  { name: 'React', level: 90, icon: 'Layout', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'TypeScript', level: 95, icon: 'Code2', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', level: 95, icon: 'Code2', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'Bootstrap', level: 90, icon: 'Layout', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg' },
  { name: 'jQuery', level: 85, icon: 'Layout', category: 'Frontend', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
  { name: 'SQL Server', level: 95, icon: 'Database', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/microsoftsqlserver/microsoftsqlserver-plain.svg' },
  { name: 'MySQL', level: 90, icon: 'Database', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', level: 85, icon: 'Database', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'Azure Cosmos DB', level: 85, icon: 'Database', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg' },
  { name: 'Firebase', level: 85, icon: 'Cloud', category: 'Database', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Supabase', level: 80, icon: 'Cloud', category: 'Database', logo: 'https://www.vectorlogo.zone/logos/supabase/supabase-icon.svg' }
];

export const CERTIFICATIONS: Certification[] = [
  { name: 'Angular Certification', issuer: 'Udemy', date: '2023' },
  { name: 'Microsoft SQL Server Certification', issuer: 'Udemy', date: '2022' },
  { name: 'Python Certification', issuer: 'IBM', date: '2023' }
];

export const ICONS: Record<string, React.ReactNode> = {
  Server: <Server className="w-6 h-6" />,
  Code2: <Code2 className="w-6 h-6" />,
  Layout: <Layout className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
  Cloud: <Cloud className="w-6 h-6" />,
  Terminal: <Terminal className="w-6 h-6" />,
  Database: <Database className="w-6 h-6" />,
  Layers: <Layers className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
};