# Thant Sin Htoo Nay — Interactive Developer Portfolio

## Product goal

Create a polished, dark, interactive portfolio for Thant Sin Htoo Nay, a Full-Stack & AI Web Developer. Present practical software craftsmanship through an editorial layout, an interactive 3D avatar, subtle neon light, smooth movement, and expressive project cards. Keep the experience responsive, fast, accessible, and clear across desktop and mobile.

## Audience and positioning

- **Audience:** hiring teams, founders, engineering leads, and clients seeking end-to-end web development.
- **Persona:** a fresh, high-drive developer who delivers complete applications, scalable backends, responsive interfaces, AI-assisted architecture, and deployment.
- **Positioning:** engineering useful web apps from idea to live deployment with PHP, Laravel, TypeScript, React, and AI-accelerated workflows.

## Technical constraints

- Next.js App Router, React, and strict TypeScript. Do not use `any`.
- Tailwind CSS for styling, using a `#09090b` / zinc foundation with indigo and violet accents.
- Three.js through `@react-three/fiber` and `@react-three/drei`.
- GSAP with ScrollTrigger for entrance and scroll animations.
- Lenis (`lenis`) for smooth scrolling.
- Lucide React for icons.
- Deployable to Vercel without custom server requirements.
- Keep the 3D scene client-side, lazy-loadable, and safe to degrade when WebGL is unavailable.

## Page architecture

1. **Hero:** identity, role, availability, CTA buttons, GitHub link, and interactive avatar.
2. **Featured projects:** three flagship projects in an asymmetric bento grid with device mockups, tech badges, tilt response, and direct links.
3. **Capabilities:** grouped backend/systems, frontend/UI, and AI/modern workflow skills.
4. **Engineering philosophy:** a concise card about independent end-to-end delivery, AI workflows, and maintainable code.
5. **Contact and footer:** ambient dark gradient, email copy action, availability reminder, and GitHub link.

## Hero content and behavior

Headline: “Hi, I'm Thant Sin Htoo Nay — Full-Stack & AI Web Developer.”

Subtitle: “Engineering scalable web apps with PHP, Laravel, and AI-accelerated development workflows — from idea to live deployment.”

Show a pulsing green `Available for projects and full-time roles` pill, glow-bordered `View Projects` and `Get in Touch` actions, and GitHub at [github.com/thantsinhtoonay](https://github.com/thantsinhtoonay). The project CTA scrolls smoothly to the showcase; contact uses a mailto action or accessible modal.

The dedicated R3F canvas presents a full-body, stylized 3D animated avatar inspired by the developer portrait, in a raised-hand greeting pose. Animate its entrance, subtle breathing/sway, and damped pointer orientation. The transparent character asset lives at `public/avatar-stylized.png`; add a restrained indigo/violet aura and sparse environmental details. Respect `prefers-reduced-motion`; keep all meaningful hero content in HTML and mark the decorative canvas appropriately.

## Featured projects

### Shal Su — Personal Finance Tracker

Client-side finance app built through AI-assisted engineering, with offline-first persistence, budget progress analytics, and clean UX.

- Technologies: TypeScript, React, Tailwind CSS, Local Storage, responsive design.
- Live app: [shal-su.thantsin.website](https://shal-su.thantsin.website/)
- Repository: `finance_app` at `https://github.com/thantsinhtoonay/finance_app`.
- Preview: mobile frame showing savings meters, categorized expense activity, and summary charts.

### Tarot Booking System

Full-stack booking and appointment management app with responsive client booking, payment slip verification, and administrative controls.

- Technologies: PHP, Laravel, MySQL, JavaScript, responsive design.
- Repository: `tarot_booking` at `https://github.com/thantsinhtoonay/tarot_booking`.
- Preview: dark appointment calendar, service tiers, and approval workflow.

### Food Fusion Website

Dynamic mobile-first culinary site with interactive menus, reusable components, and responsive layouts.

- Technologies: JavaScript, responsive web design, Tailwind CSS.
- Repository: `food_fusion_website` at `https://github.com/thantsinhtoonay/food_fusion_website`.
- Preview: vibrant food card grid, filtering controls, and mobile drawer navigation.

## Skills matrix

- **Backend and systems:** PHP, Laravel, MySQL, SQLite, RESTful APIs, Linux/VPS hosting, domain and DNS setup.
- **Frontend and UI:** TypeScript, React, Next.js, Tailwind CSS, responsive design, Three.js / R3F.
- **AI and modern workflow:** prompt-to-code pipelines, AI-assisted debugging, AI engineering, Git/GitHub, Composer, npm, Vercel.

## Visual design

- Deep `#09090b` background, zinc surfaces, fine borders, high-contrast type.
- Indigo/violet glow accents, with restrained cyan and emerald details.
- Soft radial gradients, glass-like bento surfaces, generous spacing, rounded corners, and clear focus states.
- Use CSS-built project previews so the core interface does not depend on remote imagery.

## Motion and interactions

- Initialize one Lenis instance at the app boundary and connect its frame updates to GSAP's ticker; clean up listeners on unmount.
- Stagger hero text on entry and reveal projects, skills, philosophy, and footer with ScrollTrigger.
- Add bounded pointer tilt to project cards, returning smoothly to rest. Keep the content and links usable on touch screens.
- Provide reduced-motion behavior and maintain usability if animation scripts do not run.

## Component and file contract

- `app/page.tsx`: semantic page composition and typed portfolio content.
- `components/HeroScene.tsx`: client-only R3F canvas and avatar.
- `components/SmoothScrollProvider.tsx`: Lenis, GSAP ticker, and ScrollTrigger setup.
- `components/ProjectCard.tsx`: typed project card, preview, badges, tilt behavior, and links.
- `app/globals.css`: Tailwind layers, theme tokens, ambient effects, and mockup styling.
- `tailwind.config.ts`: source paths and theme extensions.

## Accessibility and performance

- Use semantic landmarks and headings, descriptive link labels, visible keyboard focus, and sufficient contrast.
- Keep core information outside the canvas; provide stable canvas dimensions to avoid layout shift.
- Lazy-load 3D code where practical and avoid blocking first render on WebGL.
- Make hover effects supplementary and support reduced motion.

## Acceptance criteria

- This specification is written before application implementation.
- All requested hero copy, projects, links, skills, philosophy, and contact actions are represented.
- Required libraries are used within typed modular App Router components; there are no TypeScript `any` types.
- The layout supports mobile, tablet, and desktop widths and honors reduced-motion preferences.
- The avatar scene, smooth scrolling, scroll reveals, project tilt, and graceful WebGL fallback are implemented.
- The finished application can be run with `npm run dev`, built with `npm run build`, and deployed to Vercel.
