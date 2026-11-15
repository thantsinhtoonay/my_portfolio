import { ArrowUpRight, BriefcaseBusiness, Check } from 'lucide-react';

type Experience = {
  role: string;
  company: string;
  period: string;
  highlights: string;
  current?: boolean;
};

const experiences: Experience[] = [
  {
    role: 'Marketing Admin',
    company: 'Myanmar Unity Oversea Employment Agency',
    period: '2024 – 2025',
    highlights: 'Managed digital marketing operations, client correspondence, and administrative workflows.',
  },
  {
    role: 'Data Entry containing Accounting (Japanese Speaker)',
    company: 'Nice Myanmar Group of Companies',
    period: '2025 – 2026',
    highlights: 'Handled financial data entry, bookkeeping tasks, and Japanese-language cross-border communication.',
  },
  {
    role: 'System Engineer',
    company: 'Andaman Eight Mirai Co., Ltd.',
    period: '2026 – Present',
    highlights: 'Developing scalable web systems, managing technical workflows, and building robust web applications.',
    current: true,
  },
];

export default function WorkExperience() {
  return (
    <section className="timeline-section wrap" id="experience" aria-labelledby="experience-title">
      <header className="timeline-heading reveal-up">
        <div>
          <p className="section-eyebrow"><span>03</span> EXPERIENCE</p>
          <h2 id="experience-title">Experience &amp;<br /><em>Track Record.</em></h2>
        </div>
        <p className="timeline-tagline">A growing career shaped by people, systems, and the work that brings them together.</p>
      </header>

      <ol className="career-timeline" aria-label="Work experience">
        {experiences.map((experience, index) => (
          <li className="career-timeline-item reveal-up" key={experience.company}>
            <span className={`career-marker${experience.current ? ' is-current' : ''}`} aria-hidden="true">
              {experience.current ? <span /> : <Check size={13} strokeWidth={2.2} />}
            </span>
            <article className="career-card">
              <div className="career-card-topline">
                <span className="career-index">0{index + 1} <i /> CAREER MILESTONE</span>
                <span className={`career-period${experience.current ? ' current-period' : ''}`}>
                  {experience.current && <i aria-hidden="true" />}
                  {experience.period}
                  {experience.current && <span className="sr-only">Current role</span>}
                </span>
              </div>
              <div className="career-card-main">
                <span className="career-icon" aria-hidden="true"><BriefcaseBusiness size={18} /></span>
                <div className="career-copy">
                  <h3>{experience.role}</h3>
                  <p className="career-company">{experience.company}</p>
                  <p className="career-description">{experience.highlights}</p>
                </div>
                <ArrowUpRight className="career-arrow" size={16} aria-hidden="true" />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
