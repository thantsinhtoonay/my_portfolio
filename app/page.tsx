'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState, type MouseEvent } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AlertCircle, ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, Github, Globe2, Layers3, Mail, MousePointer2, Server, Sparkles, Terminal } from 'lucide-react';
import ProjectCard, { type Project } from '@/components/ProjectCard';
import ContactInfoHub from '@/components/ContactInfoHub';
import BrandMark from '@/components/BrandMark';
import { useSmoothScroll } from '@/components/SmoothScrollProvider';

const HeroScene = dynamic(() => import('@/components/HeroScene'), { ssr: false, loading: () => <div className="hero-canvas scene-loading" aria-hidden="true"><div className="scene-orb" /></div> });

gsap.registerPlugin(ScrollTrigger);

const projects: Project[] = [
  {
    number: '01', title: 'Shal Su', category: 'PERSONAL FINANCE',
    description: 'An offline-first finance companion designed to make everyday money decisions feel clear and calm.',
    stack: ['TypeScript', 'React', 'Tailwind', 'Local Storage'], repository: 'finance_app',
    liveUrl: 'https://shal-su.thantsin.website/', variant: 'finance',
  },
  {
    number: '02', title: 'Tarot Booking System', category: 'FULL-STACK PLATFORM',
    description: 'A complete booking journey with appointment management, payment slip verification, and admin review.',
    stack: ['JavaScript', 'Tailwind CSS', 'Responsive UI'], repository: 'tarot_booking', variant: 'tarot',
  },
  {
    number: '03', title: 'Food Fusion', category: 'CULINARY EXPERIENCE',
    description: 'A responsive food destination built around bold menus, reusable UI, and effortless browsing on mobile.',
    stack: ['PHP', 'Laravel', 'MySQL', 'JavaScript'], repository: 'food_fusion_website', variant: 'food',
  },
];

const capabilityGroups = [
  { icon: Server, label: 'Backend & Systems', items: ['PHP', 'Laravel', 'MySQL', 'SQLite', 'RESTful APIs', 'VPS', 'Domain & DNS'] },
  { icon: Layers3, label: 'Frontend & UI', items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Responsive Design'] },
  { icon: Sparkles, label: 'AI & Modern Workflow', items: ['AI Engineering', 'Prompt-to-code workflows', 'AI-assisted debugging', 'Git & GitHub', 'Composer', 'npm', 'Vercel'] },
];

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopyStatus, setEmailCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const [activeSection, setActiveSection] = useState('work');
  const smoothScroll = useSmoothScroll();

  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const context = gsap.context(() => {
      if (!motionPreference.matches) {
        gsap.fromTo('.hero-copy > *', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.11, ease: 'power3.out', delay: 0.12 });
        gsap.utils.toArray<HTMLElement>('.reveal-up').forEach((element) => {
          gsap.fromTo(element, { y: 34, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: element, start: 'top 88%', once: true },
          });
        });
      }
    });
    return () => context.revert();
  }, []);

  useEffect(() => {
    const sections = ['work', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -58% 0px', threshold: [0, 0.1, 0.3, 0.6] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const scrollToProjects = () => {
    smoothScroll('#work');
  };

  const copyEmail = async () => {
    const email = 'mgnikyar@gmail.com';
    try {
      await navigator.clipboard.writeText(email);
      setEmailCopyStatus('copied');
    } catch {
      setEmailCopyStatus('error');
      window.location.href = `mailto:${email}`;
    }
    window.setTimeout(() => setEmailCopyStatus('idle'), 1800);
  };

  const closeMenu = () => setMenuOpen(false);
  const navigateTo = (event: MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    closeMenu();
    smoothScroll(target);
  };

  return <main>
    <nav className="site-nav wrap" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === 'Escape') closeMenu(); }}>
      <a className="brand" href="#top" aria-label="Thant Sin Htoo Nay home"><BrandMark /><span>Thant Sin Htoo<b> Nay</b></span></a>
      <div className={`nav-links ${menuOpen ? 'nav-open' : ''}`} id="primary-navigation">
        <a href="#work" aria-current={activeSection === 'work' ? 'location' : undefined} onClick={(event) => navigateTo(event, '#work')}>Projects</a><a href="#about" aria-current={activeSection === 'about' ? 'location' : undefined} onClick={(event) => navigateTo(event, '#about')}>About</a><a href="#contact" aria-current={activeSection === 'contact' ? 'location' : undefined} onClick={(event) => navigateTo(event, '#contact')}>Contact</a>
      </div>
      <a className="nav-availability" href="mailto:mgnikyar@gmail.com"><i /> Available for work <ArrowUpRight size={14} /></a>
      <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-controls="primary-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}><span className={`menu-icon ${menuOpen ? 'menu-icon-open' : ''}`} aria-hidden="true"><i /><i /></span></button>
    </nav>

    <section className="hero wrap" id="top">
      <div className="hero-grid-mark" aria-hidden="true" />
      <div className="hero-copy">
        <div className="availability-pill"><i /><span>Available for projects and full-time roles</span></div>
        <p className="hero-kicker"><span /> FULL-STACK &amp; AI WEB DEVELOPER</p>
        <h1>Ideas into<br /><span className="headline-accent">impactful</span> <span className="headline-outline">software.</span></h1>
        <p className="hero-intro"><strong>Hi, I&apos;m Thant Sin Htoo Nay — Full-Stack &amp; AI Web Developer.</strong>{' '}<span>Engineering scalable web apps with PHP, Laravel, and AI-accelerated development workflows — from idea to live deployment.</span></p>
        <div className="hero-actions"><button type="button" className="button-primary" onClick={scrollToProjects}>Explore my work <ArrowDownRight size={16} /></button><a className="button-secondary" href="mailto:mgnikyar@gmail.com"><Mail size={15} /> Let&apos;s talk</a></div>
        <div className="hero-social"><span>FIND ME ELSEWHERE</span><a href="https://github.com/thantsinhtoonay" target="_blank" rel="noreferrer"><Github size={15} /> GitHub <ArrowUpRight size={12} /></a><span className="social-divider" /><span className="hero-location"><Globe2 size={13} /> Yangon, Myanmar</span></div>
      </div>
      <HeroScene />
      <div className="hero-side-note"><span>CRAFTED WITH INTENTION</span><i /></div>
      <a href="#work" className="scroll-cue"><span>SCROLL TO EXPLORE</span><ArrowDown size={14} /></a>
      <div className="hero-index">01 / 04</div>
    </section>

    <section className="section work-section wrap" id="work">
      <div className="section-heading reveal-up"><div><p className="section-eyebrow"><span>01</span> Project</p><h2>Small teams.<br /><em>Big ideas shipped.</em></h2></div><div className="section-heading-aside"><p>A few projects built with care, curiosity, and an AI copilot.</p><span><i /> A selection of shipped work</span></div></div>
      <div className="projects-grid">{projects.map((project) => <ProjectCard project={project} key={project.number} />)}</div>
      <div className="work-bottom reveal-up"><span>MORE PROJECTS, EXPERIMENTS &amp; OPEN SOURCE</span><a href="https://github.com/thantsinhtoonay" target="_blank" rel="noreferrer">Explore GitHub <ArrowUpRight size={14} /></a></div>
    </section>

    <section className="about-section" id="about"><div className="wrap">
      <div className="section-heading reveal-up"><div><p className="section-eyebrow"><span>02</span> HOW I BUILD</p><h2>Curious by default.<br /><em>Intentional by design.</em></h2></div><div className="section-heading-aside"><p>Good software starts with understanding the problem. Great software makes the solution feel effortless.</p></div></div>
      <div className="about-grid">
        <article className="philosophy-card reveal-up"><div className="philosophy-top"><span className="card-index">A NOTE ON MY APPROACH</span><span className="philosophy-icon"><Terminal size={19} /></span></div><h3>From first commit<br />to <em>the real world.</em></h3><p>I enjoy owning the whole journey — shaping an idea, building the system behind it, and making sure it works beautifully when it meets real people.</p><div className="philosophy-divider" /><div className="philosophy-points"><span><i>01</i> Think in systems</span><span><i>02</i> Ship with intention</span><span><i>03</i> Keep learning out loud</span></div><div className="philosophy-glow" /></article>
        <div className="capabilities"><div className="capabilities-title reveal-up"><span>THE TOOLKIT</span><span>Always growing <ArrowUpRight size={13} /></span></div>{capabilityGroups.map(({ icon: Icon, label, items }, index) => <article className="skill-card reveal-up" key={label}><div className="skill-card-header"><span className="skill-icon"><Icon size={17} /></span><span className="skill-count">0{index + 1}</span></div><h3>{label}</h3><div className="skill-tags">{items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
      </div>
      <div className="about-statement reveal-up"><span>THE SHORT VERSION</span><p>I use modern tools — including AI — to move faster through the boring parts, so I can spend more time making <em>the right things.</em></p><ArrowDownRight size={22} /></div>
    </div></section>

    <section className="contact-section wrap reveal-up" id="contact"><div className="contact-glow" /><div className="contact-topline"><span>03 / YOUR NEXT BUILD</span><span>OPEN TO GOOD CONVERSATIONS <i /></span></div><div className="contact-content"><p>HAVE A PROJECT IN MIND?</p><h2>Let&apos;s make<br />something <em>matter.</em></h2><div className="contact-actions"><a className="button-primary" href="mailto:mgnikyar@gmail.com">Start a conversation <ArrowUpRight size={16} /></a><button className={`copy-button ${emailCopyStatus === 'copied' ? 'is-copied' : ''} ${emailCopyStatus === 'error' ? 'is-error' : ''}`} type="button" onClick={copyEmail} aria-live="polite">{emailCopyStatus === 'copied' ? <Check size={15} /> : emailCopyStatus === 'error' ? <AlertCircle size={15} /> : <Mail size={15} />}{emailCopyStatus === 'copied' ? 'Email copied' : emailCopyStatus === 'error' ? 'Opening email…' : 'Copy email address'}</button></div></div><ContactInfoHub /><div className="contact-spark"><MousePointer2 size={18} /></div></section>

    <footer className="site-footer wrap"><a className="footer-brand" href="#top"><BrandMark /><span>Thant Sin Htoo Nay<small>Full-Stack &amp; AI Web Developer</small></span></a><p>Thoughtfully built, with a little help from the future. <span>© {new Date().getFullYear()}</span></p><div className="footer-links"><a href="https://github.com/thantsinhtoonay" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a><a href="mailto:mgnikyar@gmail.com">Email <ArrowUpRight size={13} /></a><a href="#top">Back to top <ArrowRight size={13} /></a></div></footer>
  </main>;
}
