import { ArrowUpRight, Award, GraduationCap, Languages } from 'lucide-react';

type Credential = {
  kind: 'education' | 'certificate' | 'language';
  eyebrow: string;
  title: string;
  institution: string;
  period?: string;
  description: string;
  featured?: boolean;
};

const credentials: Credential[] = [
  {
    kind: 'education',
    eyebrow: 'ACADEMIC BACKGROUND',
    title: 'B.A. (English), Second Year',
    institution: 'Dagon University',
    description: 'Strengthening communication, documentation, and global collaboration through an English-language academic foundation.',
  },
  {
    kind: 'certificate',
    eyebrow: 'PROFESSIONAL TRAINING',
    title: 'Professional Web Developer Certificate',
    institution: 'Fairway Technology',
    period: '2023 – 2024',
    description: 'Comprehensive practical training in full-stack web development, modern programming paradigms, and software engineering foundations.',
  },
  {
    kind: 'language',
    eyebrow: 'LANGUAGE PROFICIENCY',
    title: 'JLPT N2 Certification',
    institution: 'Japanese-Language Proficiency Test',
    period: 'July 2026',
    description: 'Advanced Japanese proficiency supporting technical communication and cross-cultural business operations.',
    featured: true,
  },
];

const credentialIcons = {
  education: GraduationCap,
  certificate: Award,
  language: Languages,
} as const;

export default function EducationSection() {
  return (
    <section className="education-section wrap" id="education" aria-labelledby="education-title">
      <header className="timeline-heading reveal-up">
        <div>
          <p className="section-eyebrow"><span>04</span> EDUCATION</p>
          <h2 id="education-title">Education &amp;<br /><em>Credentials.</em></h2>
        </div>
        <p className="timeline-tagline">A foundation in communication and engineering, strengthened by practical learning.</p>
      </header>

      <div className="credential-grid">
        {credentials.map((credential, index) => {
          const Icon = credentialIcons[credential.kind];
          return (
            <article className={`credential-card reveal-up${credential.featured ? ' credential-featured' : ''}`} key={credential.title}>
              <div className="credential-topline">
                <span className="credential-icon" aria-hidden="true"><Icon size={19} strokeWidth={1.8} /></span>
                {credential.period && <span className="credential-period">{credential.period}</span>}
              </div>
              <p className="credential-eyebrow">{credential.eyebrow}</p>
              <h3>{credential.title}</h3>
              <p className="credential-institution">{credential.institution}</p>
              <p className="credential-description">{credential.description}</p>
              <ArrowUpRight className="credential-arrow" size={16} aria-hidden="true" />
            </article>
          );
        })}
      </div>
    </section>
  );
}
