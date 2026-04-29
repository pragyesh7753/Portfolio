import { DRIVE_ASSETS } from '@/config/driveAssets';

export type CertificateCategory =
  | 'development'
  | 'academic'
  | 'competition'
  | 'community';

export interface Certificate {
  id: string;
  title: string;
  issuedBy: string;
  date: string;
  imageUrl: string;
  driveUrl: string;
  featured: boolean;
  category: CertificateCategory;
  description: string;
}

export interface AchievementCategoryFilter {
  id: 'all' | CertificateCategory;
  label: string;
}

export const certificates: Certificate[] = [
  {
    id: 'cert-1',
    title: 'Full Stack Web Development',
    issuedBy: 'PW Skills',
    date: 'April 2023',
    imageUrl: DRIVE_ASSETS.certificates.mernStack,
    driveUrl:
      'https://learn.pwskills.com/certificate/fce1fcfd-7e97-4b7d-ad54-5e62ed63911c',
    featured: true,
    category: 'development',
    description:
      'Completed intensive Full Stack Web Development course covering MERN stack, REST APIs, authentication, and deployment.',
  },
  {
    id: 'cert-2',
    title: 'Python Programming',
    issuedBy: 'Scaler',
    date: 'June 2025',
    imageUrl: DRIVE_ASSETS.certificates.python,
    driveUrl: 'https://moonshot.scaler.com/s/sl/QchAavjio8',
    featured: true,
    category: 'development',
    description:
      'Comprehensive Python programming course covering core concepts, data structures, and OOP.',
  },
  {
    id: 'cert-3',
    title: 'All India Online Aptitude Test 2025',
    issuedBy: 'Naukri Campus',
    date: 'May 2025',
    imageUrl: DRIVE_ASSETS.certificates.aincat,
    driveUrl:
      'https://www.naukri.com/campus/certificates/naukri_campus_ai_ncat_achievemen_may_2025/v0/683a339c892c1f3133ab56ed',
    featured: true,
    category: 'competition',
    description:
      'Achieved distinction demonstrating strong analytical and logical reasoning skills.',
  },
  {
    id: 'cert-4',
    title: 'Innoviz - 2025',
    issuedBy: 'St. Andrews Institute',
    date: 'April 2025',
    imageUrl: DRIVE_ASSETS.certificates.innoviz,
    driveUrl: DRIVE_ASSETS.certificates.innoviz,
    featured: true,
    category: 'competition',
    description:
      'Participated in Innoviz 2025, showcasing innovative solutions and teamwork.',
  },
  {
    id: 'cert-5',
    title: 'Merit Performance Award',
    issuedBy: 'St. Andrews Institute',
    date: 'November 2023',
    imageUrl: DRIVE_ASSETS.certificates.merit,
    driveUrl: DRIVE_ASSETS.certificates.merit,
    featured: true,
    category: 'academic',
    description:
      'Outstanding academic achievements and consistent high performance.',
  },
  {
    id: 'cert-6',
    title: 'Java Programming',
    issuedBy: 'Great Learning',
    date: 'December 2023',
    imageUrl: DRIVE_ASSETS.certificates.java,
    driveUrl: DRIVE_ASSETS.certificates.java,
    featured: false,
    category: 'development',
    description:
      'Proficiency in core Java concepts and object-oriented programming.',
  },
  {
    id: 'cert-7',
    title: 'Bapu Bazaar Samman Patra',
    issuedBy: 'VBS Purvanchal University',
    date: 'March 2023',
    imageUrl: DRIVE_ASSETS.certificates.bapu,
    driveUrl: DRIVE_ASSETS.certificates.bapu,
    featured: false,
    category: 'competition',
    description:
      'Active participation in university-level cultural and social events.',
  },
  {
    id: 'cert-8',
    title: 'Voter Awareness Campaign',
    issuedBy: 'VBS Purvanchal University',
    date: 'March 2023',
    imageUrl: DRIVE_ASSETS.certificates.voter,
    driveUrl: DRIVE_ASSETS.certificates.voter,
    featured: false,
    category: 'community',
    description: 'Volunteering in the Voter Awareness Campaign.',
  },
  {
    id: 'cert-9',
    title: 'Cloud Computing',
    issuedBy: 'Victory Tech Solutions',
    date: 'April 2026',
    imageUrl: DRIVE_ASSETS.certificates.cloudComputing,
    driveUrl: DRIVE_ASSETS.certificates.cloudComputing,
    featured: true,
    category: 'development',
    description:
      'Successful completion of the Cloud Computing training programme covering cloud infrastructure, services, and deployment models.',
  },
];

export const achievementCategoryFilters: AchievementCategoryFilter[] = [
  { id: 'all', label: 'All' },
  { id: 'development', label: 'Development' },
  { id: 'academic', label: 'Academic' },
  { id: 'competition', label: 'Competition' },
  { id: 'community', label: 'Community' },
];
