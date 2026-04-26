export type ProjectCategory = 'frontend' | 'backend' | 'fullstack';
export type ProjectStatus = 'completed' | 'in-progress' | 'planned';

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  liveUrl: string;
  githubUrl: string;
  category: ProjectCategory;
  featured?: boolean;
  status: ProjectStatus;
  features?: string[];
  challenges?: string[];
  learnings?: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'rakshak-ai',
    title: 'Rakshak AI',
    description:
      'A proactive cyber intelligence platform designed to help MSMEs detect, analyze, and mitigate digital threats using AI-driven monitoring and threat intelligence.',
    longDescription:
      'Rakshak AI is a full-stack cyber intelligence platform focused on proactive security for MSMEs. It continuously monitors social platforms, suspicious domains, and email threats to detect early signs of cyber attacks such as phishing, brand impersonation, and data leaks. The system leverages AI models for contextual analysis, risk scoring, and automated insights, enabling organizations to respond to threats before they escalate.',
    tech: [
      'React',
      'Tailwind CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'REST APIs',
      'WHOIS API',
      'crt.sh',
      'AI/LLM Integration',
    ],
    category: 'fullstack',
    liveUrl: '',
    githubUrl: '',
    featured: true,
    status: 'in-progress',
    features: [
      'AI-powered social media threat intelligence (keyword + context-based detection)',
      'Domain analysis for typosquatting, phishing, and malicious registrations',
      'Real-time monitoring using WHOIS and certificate transparency logs (crt.sh)',
      'Risk scoring engine to prioritize threats based on severity',
      'Email intelligence system for analyzing suspicious forwarded emails',
      'Custom keyword generation using AI for organization-specific threat tracking',
      'Centralized dashboard for monitoring and alerts',
    ],
    challenges: [
      'Designing accurate threat detection beyond simple keyword matching',
      'Integrating multiple external data sources (WHOIS, crt.sh, social feeds)',
      'Building a scalable and dynamic risk scoring system',
      'Handling noisy and unstructured social media data',
      'Ensuring real-time monitoring without performance bottlenecks',
    ],
    learnings: [
      'Applied AI/LLMs for cybersecurity use cases',
      'Built multi-source threat intelligence pipelines',
      'Learned domain monitoring techniques (WHOIS + SSL logs)',
      'Improved backend architecture for real-time data processing',
      'Understood practical challenges in cybersecurity for MSMEs',
    ],
  },
  {
    id: 'chatify',
    title: 'Chatify',
    description:
      'A modern, full-stack communication app blending the best of WhatsApp, Slack, and Facebook with innovative chat, call, and collaboration tools.',
    longDescription:
      'Chatify is a comprehensive communication platform that combines real-time messaging, voice/video calls, and collaborative features.',
    tech: [
      'React',
      'Tailwind CSS',
      'Daisy UI',
      'Express',
      'MongoDB',
      'Cloudinary',
      'Socket.io',
      'Node.js',
    ],
    category: 'fullstack',
    liveUrl: 'https://chatify.studio/',
    githubUrl: 'https://github.com/pragyesh7753/Chatify',
    featured: true,
    status: 'in-progress',
    features: [
      'Real-time messaging with Stream API',
      'Group chat functionality',
      'File and image sharing via Cloudinary',
      'User authentication and profiles',
      'Emoji reactions and typing indicators',
    ],
    challenges: [
      'Real-time synchronization across multiple users',
      'Efficient file upload and storage management',
    ],
    learnings: [
      'WebSocket for real-time communication',
      'Cloud storage integration with Cloudinary',
    ],
  },
  {
    id: 'internauto',
    title: 'InternAuto',
    description:
      'Automated internship application platform with AI-driven form filling and career guidance.',
    longDescription:
      'InternAuto revolutionizes the internship application process with modern web technologies and AI integration.',
    tech: [
      'React',
      'JavaScript',
      'Python',
      'Flask',
      'Selenium',
      'Tailwind CSS',
      'AI/ML',
    ],
    category: 'fullstack',
    liveUrl: 'https://internauto.pragyesh.in/',
    githubUrl: 'https://github.com/pragyesh7753/InternAuto_project',
    featured: true,
    status: 'completed',
    features: [
      'AI-powered form filling automation',
      'Web scraping for internship opportunities',
      'Resume generation and optimization',
    ],
    challenges: [
      'Reliable web scraping across different platforms',
      'AI model integration for form understanding',
    ],
    learnings: ['Python automation with Selenium', 'AI/ML model integration'],
  },
  {
    id: 'todomaster-pro',
    title: 'TodoMaster Pro',
    description:
      'Feature-rich todo application with React Context API and local storage persistence.',
    tech: ['React', 'Context API', 'Tailwind CSS', 'Local Storage'],
    category: 'frontend',
    liveUrl: 'https://todo.pragyesh.in/',
    githubUrl:
      'https://github.com/pragyesh7753/Web_Development/tree/main/React/10-todoContextLocal',
    featured: true,
    status: 'completed',
    features: [
      'Context API for global state management',
      'Local storage for data persistence',
      'Drag & drop task reordering',
    ],
  },
  {
    id: 'password-manager',
    title: 'Password Manager',
    description:
      'Secure password manager with local encryption and storage for managing credentials safely.',
    tech: ['React', 'LocalStorage', 'Encryption', 'JavaScript', 'Tailwind CSS'],
    category: 'frontend',
    liveUrl: 'https://pass-op.pragyesh.in/',
    githubUrl:
      'https://github.com/pragyesh7753/Password-Manager_localStorage-version',
    status: 'completed',
    features: [
      'Local encryption for password security',
      'Random password generation',
      'Import/Export functionality',
    ],
  },
  {
    id: 'portfolio',
    title: 'Portfolio Website',
    description:
      'Modern portfolio website with smooth animations, dark mode, and responsive design.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Lenis'],
    category: 'frontend',
    liveUrl: 'https://pragyesh.in/',
    githubUrl: 'https://github.com/pragyesh7753/Portfolio',
    featured: true,
    status: 'completed',
    features: [
      'Smooth scroll with Lenis',
      'GSAP powered animations',
      'Dark/light mode toggle',
    ],
  },
  {
    id: 'harmony-music-school',
    title: 'Harmony Music School',
    description:
      'Modern music school platform built with Next.js and Aceternity UI for course management.',
    tech: ['Next.js', 'TypeScript', 'Aceternity UI', 'Tailwind CSS', 'React'],
    category: 'frontend',
    liveUrl: 'https://harmonyschool.pragyesh.in/',
    githubUrl:
      'https://github.com/pragyesh7753/Web_Development/tree/main/NEXT.js/Mini-Project/next-app',
    status: 'completed',
    features: [
      'Course catalog and management',
      'Student enrollment system',
      'Modern UI with Aceternity components',
    ],
  },
];

export const PROJECT_CATEGORIES: Array<'all' | ProjectCategory> = [
  'all',
  'fullstack',
  'frontend',
  'backend',
];
