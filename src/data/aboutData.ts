export interface AboutStat {
  value: number;
  suffix: string;
  label: string;
}

export interface SkillGroup {
  category: string;
  icon: string;
  items: string[];
}

export const stats: AboutStat[] = [
  { value: 6, suffix: '+', label: 'Projects' },
  { value: 10, suffix: '+', label: 'Technologies' },
  { value: 8, suffix: '', label: 'Certificates' },
  { value: 100, suffix: 'K+', label: 'Lines of Code' },
];

export const skills: SkillGroup[] = [
  {
    category: 'Frontend',
    icon: '\u25C6',
    items: [
      'React',
      'TypeScript',
      'Next.js',
      'Tailwind CSS',
      'JavaScript',
      'HTML/CSS',
    ],
  },
  {
    category: 'Backend',
    icon: '\u25B2',
    items: ['Node.js', 'Express', 'Python', 'FastAPI', 'Flask', 'REST APIs'],
  },
  {
    category: 'Database',
    icon: '\u25CF',
    items: ['MongoDB', 'MySQL', 'Appwrite'],
  },
  {
    category: 'Cloud',
    icon: '\u25A0',
    items: ['AWS'],
  },
];

export const personalInfo: string[] = [
  '\u{1F4CD} India',
  '\u{1F4E7} spragyesh86@gmail.com',
  '\u{1F5E3}\uFE0F Hindi, English',
  '\u23F0 Available Full-time',
];
