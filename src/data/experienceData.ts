export type TimelineEntryType =
  | 'education'
  | 'project'
  | 'milestone'
  | 'work';

export interface TimelineEntry {
  year: string;
  title: string;
  subtitle: string;
  description: string;
  type: TimelineEntryType;
  bullets?: string[];
  icon: string;
}

export const TIMELINE: TimelineEntry[] = [
  {
    year: '2021 \u2013 2024',
    title: 'Bachelor of Computer Applications (BCA)',
    subtitle: 'VBS Purvanchal University',
    description:
      'Built a strong foundation in computer science, programming, and software development fundamentals.',
    type: 'education',
    icon: '\u{1F393}',
  },
  {
    year: '2024 \u2013 2026',
    title: 'Master of Computer Applications (MCA)',
    subtitle: 'St. Andrews Institute of Technology & Management',
    description:
      'Advanced studies in software engineering, web technologies, and modern application development.',
    type: 'education',
    icon: '\u{1F393}',
  },
  {
    year: '2025',
    title: 'Full Stack Developer Intern \u2014 Anvex AI Technologies',
    subtitle: 'Jun 2025 \u2013 Sep 2025 \u00B7 3 Months',
    description:
      'Contributed to multiple production projects using the MERN stack, building both frontend and backend features.',
    type: 'work',
    icon: '\u{1F4BC}',
    bullets: [
      'Contributed to "Anvex Speak" (frontend & backend) using MERN Stack, Shadcn UI, and Vapi.',
      'Contributed to "Anvex Card Scanner" (frontend) using React and Shadcn UI.',
      'Rebuilt and deployed the company website from scratch (rebranding) using React, Tailwind CSS, and Aceternity UI.',
    ],
  },
  {
    year: '2026',
    title: 'Software Development Engineer I \u2014 Anvex AI Technologies',
    subtitle: 'Jul 2026 \u2013 Present',
    description:
      'Designing and building scalable software solutions while contributing to the development, deployment, and continuous improvement of production systems.',
    type: 'work',
    icon: '\u{1F4BC}',
    bullets: [
      'Building production-ready applications and services across the software development lifecycle.',
      'Designing scalable solutions with a focus on performance, reliability, and maintainability.',
      'Collaborating with engineering teams to deliver new features and enhance existing systems.',
      'Leveraging modern development practices, automation, and deployment workflows to improve engineering efficiency.',
      'Continuously learning and adopting new technologies to solve complex technical challenges.',
    ],
  },
];
