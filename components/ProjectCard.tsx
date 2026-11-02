'use client';

import type { PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';

export type ProjectVariant = 'finance' | 'tarot' | 'food';

export interface Project {
  number: string;
  title: string;
  category: string;
  description: string;
  stack: string[];
  repository: string;
  liveUrl?: string;
  variant: ProjectVariant;
}

function ProjectPreview({ variant }: { variant: ProjectVariant }) {
  const previewByVariant: Record<ProjectVariant, { src: string; alt: string }> = {
    finance: { src: '/projects/shal-su.png', alt: 'Shal Su budget dashboard showing monthly balance, income, expenses, savings, and budget charts' },
    tarot: { src: '/projects/tarot-booking.png', alt: 'BhOne Thaw Tarot website landing page with its reading introduction and booking call to action' },
    food: { src: '/projects/food-fusion.png', alt: 'FoodFusion website landing page with recipe navigation and community features' },
  };
  const preview = previewByVariant[variant];
  return <Image className="project-screenshot" src={preview.src} alt={preview.alt} fill sizes="(max-width: 640px) 92vw, (max-width: 900px) 45vw, 31vw" />;
}

export default function ProjectCard({ project }: { project: Project }) {
  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    event.currentTarget.style.setProperty('--tilt-x', `${y * -5}deg`);
    event.currentTarget.style.setProperty('--tilt-y', `${x * 5}deg`);
  };
  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--tilt-x', '0deg');
    event.currentTarget.style.setProperty('--tilt-y', '0deg');
  };

  return <article className={`project-card project-${project.variant} reveal-up`} onPointerMove={onPointerMove} onPointerLeave={resetTilt}>
    <div className="project-card-top"><span>{project.number} <i /> {project.category}</span><ArrowUpRight size={17} /></div>
    <div className="project-screen"><ProjectPreview variant={project.variant} /></div>
    <div className="project-info"><div><h3>{project.title}</h3><p>{project.description}</p></div><div className="project-links">
      {project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ExternalLink size={16} /></a> : null}
      <a href={`https://github.com/thantsinhtoonay/${project.repository}`} target="_blank" rel="noreferrer" aria-label={`View ${project.repository} on GitHub`}><Github size={16} /></a>
    </div></div>
    <div className="project-tags">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
  </article>;
}
