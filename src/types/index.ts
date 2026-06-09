// Etkinlik Genel Bilgileri
export interface TargetAudience {
  profile: string;
  prerequisites: string;
  selectionCriteria: string;
  priority: string;
  quality: string;
}

export interface EventData {
  name: string;
  fullName: string;
  slogan: string;
  date: string;
  location: string;
  duration: string;
  speakerCount: number;
  participantQuota: number;
  isFree: boolean;
  supportedBy: string;
  topic: string;
  participantSelection: string;
  activityArea: string;
  discipline: string;
  rdAndInnovation: string;
  keywords: string[];
  priorityArea: string;
  purpose: string[];
  targetAudience: TargetAudience;
  teachingMethods: string;
  impact: string[];
  organizationCommittee: string;
  scienceCommittee: string;
  instructorQuality: string;
  advisors: string;
}

// Program
export interface ProgramEvent {
  id: number;
  time: string;
  type: 'TEORİK' | 'UYGULAMA' | 'ÇALIŞTAY' | 'ARA' | 'YEMEK' | 'AÇILIŞ' | 'KAPANIŞ';
  title: string;
  description: string;
  speaker: string;
}

export interface ProgramDay {
  day: number;
  title: string;
  date: string;
  events: ProgramEvent[];
}

export interface ProgramData {
  days: ProgramDay[];
}

// Kapsam
export interface ScopeItem {
  id: string;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface ScopeData {
  sections: ScopeItem[];
}

// Konuşmacılar
export interface Speaker {
  id: number;
  name: string;
  title: string;
  institution: string;
  department: string;
  expertise: string;
  role: string;
}

export interface SpeakersData {
  speakers: Speaker[];
}

// Portfolyo
export type PortfolioFieldColor = 'primary' | 'secondary' | 'tertiary' | 'warning';

export interface PortfolioSocial {
  github?: string;
  linkedin?: string;
  twitter?: string;
  website?: string;
  behance?: string;
  medium?: string;
  email?: string;
}

export interface PortfolioSkillGroup {
  category: string;
  items: string[];
}

export interface PortfolioExperience {
  title: string;
  company: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
}

export interface PortfolioProject {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  repo?: string;
  highlight?: boolean;
}

export interface PortfolioEducation {
  degree: string;
  school: string;
  year: string;
  detail?: string;
}

export interface PortfolioCertification {
  name: string;
  issuer: string;
  year: string;
}

export interface PortfolioPerson {
  slug: string;
  name: string;
  title: string;
  field: string;
  fieldColor: PortfolioFieldColor;
  shortBio: string;
  avatar: string;
  avatarImage?: string;
  location?: string;
  yearsOfExperience?: number;
  available?: boolean;
  social?: PortfolioSocial;
  about?: string;
  skills?: PortfolioSkillGroup[];
  experience?: PortfolioExperience[];
  projects?: PortfolioProject[];
  education?: PortfolioEducation[];
  certifications?: PortfolioCertification[];
}

export interface PortfolioData {
  people: PortfolioPerson[];
}

// Başvuru Formu
export interface ApplicationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  department: string;
  level: 'lisans' | 'yuksek-lisans' | 'doktora';
  gpa: string;
  motivation: string;
  hasThesis: boolean;
  thesisTopic: string;
}
