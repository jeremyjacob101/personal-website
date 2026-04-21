import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaArrowRightLong,
  FaArrowUpRightFromSquare,
  FaDatabase,
  FaEnvelope,
  FaFolderOpen,
  FaGithub,
  FaGlobe,
  FaHouse,
  FaLinkedinIn,
  FaPhone,
  FaReact,
  FaSwift,
  FaToolbox,
  FaUserGear,
  FaCode,
} from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import {
  SiExpress,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiPython,
} from "react-icons/si";

type LinkItem = {
  label: string;
  href: string;
};

type Project = {
  title: string;
  period: string;
  summary: string;
  stack: string[];
  links: LinkItem[];
  logoFile: string;
  placeholderLabel: string;
};

type SignatureSkill = {
  title: string;
  description: string;
};

type StackItem = {
  name: string;
  description: string;
  icon: IconType;
  tone: string;
  tint: string;
  lightTone?: string;
  lightTint?: string;
};

type ContactItem = {
  label: string;
  href: string;
  icon: IconType;
};

type Theme = "dark" | "light";
type ViewTransitionCapableDocument = Document & {
  startViewTransition?: (update: () => void) => void;
};

const THEME_STORAGE_KEY = "jeremy-jacob-portfolio-theme";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return "dark";
}

const navItems = [
  { label: "Home", href: "#home", icon: FaHouse },
  { label: "Projects", href: "#projects", icon: FaFolderOpen },
  { label: "Known For", href: "#skills", icon: FaUserGear },
  { label: "Frameworks", href: "#frameworks", icon: FaToolbox },
  { label: "Languages", href: "#languages", icon: FaCode },
  { label: "Contact", href: "#contact", icon: FaEnvelope },
];

const contactItems: ContactItem[] = [
  {
    label: "Email",
    href: "mailto:jeremyjacob101@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "Phone",
    href: "tel:+972537148073",
    icon: FaPhone,
  },
  {
    label: "GitHub",
    href: "https://github.com/jeremyjacob101",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jeremyjacob101",
    icon: FaLinkedinIn,
  },
];

const featuredProjects: Project[] = [
  {
    title: "Kartiseret",
    period: "2024 - Present",
    summary:
      "A full-stack movie discovery and showtimes platform that pulls fragmented Israeli cinema data into one motion-heavy browsing experience.",
    stack: ["React", "TypeScript", "Python", "Supabase"],
    logoFile: "kartiseret",
    placeholderLabel: "KS",
    links: [
      { label: "Live site", href: "https://www.seret.site/" },
      { label: "GitHub", href: "https://github.com/jeremyjacob101/Kartiseret" },
    ],
  },
  {
    title: "Schedulearn",
    period: "2025 - Present",
    summary:
      "Production product work focused on TypeScript feature delivery, configurable schedule exports, and debugging across the stack with product teammates.",
    stack: ["TypeScript", "Product work", "PDF export", "Reliability"],
    logoFile: "schedulearn",
    placeholderLabel: "SC",
    links: [{ label: "Website", href: "https://schedulearn.com/" }],
  },
  {
    title: "Shabbat Alarm Clock",
    period: "2026",
    summary:
      "A calm local-first SwiftUI alarm app for weekly Shabbat routines, bilingual UX, and dependable notification behavior without a backend.",
    stack: ["SwiftUI", "iOS", "Localization", "Notifications"],
    logoFile: "shabbatalarmclock",
    placeholderLabel: "SA",
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/shabbat-alarm-clock/id6759681065",
      },
      {
        label: "GitHub",
        href: "https://github.com/jeremyjacob101/ShabbatAlarmClock",
      },
    ],
  },
  {
    title: "IINAplex",
    period: "2026",
    summary:
      "A browser extension that adds a one-click “Play in IINA” flow to Plex Web by resolving stream URLs and handing playback off to the native desktop app.",
    stack: ["Browser extension", "JavaScript", "Plex", "Desktop workflow"],
    logoFile: "iinaplex",
    placeholderLabel: "IP",
    links: [
      { label: "GitHub", href: "https://github.com/jeremyjacob101/IINAplex" },
    ],
  },
];

const extraProjects: Project[] = [
  {
    title: "Jerusalem Heritage Realty",
    period: "2025",
    summary:
      "A responsive real-estate website built from scratch with reusable Next.js components and integrations that keep listings feeling current and easy to browse.",
    stack: ["Next.js", "Responsive UI", "Integrations"],
    logoFile: "jerusalemheritagerealty",
    placeholderLabel: "JH",
    links: [
      {
        label: "Website",
        href: "https://www.jhrisrael.com/",
      },
    ],
  },
  {
    title: "T&Bee Liquid Gold",
    period: "2025",
    summary:
      "Ongoing production site support with feature delivery, usability improvements, and clean-up work that keeps a client-facing experience polished.",
    stack: ["Production support", "Frontend polish", "Team delivery"],
    logoFile: "tandbeeliquidgold",
    placeholderLabel: "TB",
    links: [{ label: "Website", href: "https://tandbeeliquidgold.com/" }],
  },
  {
    title: "More Builds on GitHub",
    period: "Always shipping",
    summary:
      "Experiments, utilities, side projects, and the rough-to-finished path behind the portfolio pieces above.",
    stack: ["Experiments", "Side projects", "Open repos"],
    logoFile: "github",
    placeholderLabel: "GH",
    links: [
      { label: "GitHub profile", href: "https://github.com/jeremyjacob101" },
    ],
  },
];

const signatureSkills: SignatureSkill[] = [
  {
    title: "End-to-End Ownership",
    description:
      "I am comfortable taking a product from interface decisions to backend logic, data shape, deployment details, and the cleanup work that makes it hold together.",
  },
  {
    title: "Deep Debugging",
    description:
      "I like sitting with a problem until it is actually understood, not just patched. Edge cases, subtle regressions, and messy interactions are usually where I lean in.",
  },
  {
    title: "API + Data Integration",
    description:
      "A lot of my work lives where outside systems meet product logic: ingesting data, cleaning it up, shaping it into something reliable, and making it usable in the UI.",
  },
  {
    title: "Frontend Polish",
    description:
      "I care about responsiveness, motion, clarity, and the small interaction choices that make software feel intentional instead of merely functional.",
  },
  {
    title: "Reliable Shipping",
    description:
      "I am used to working on production features where getting the behavior, edge cases, and maintainability right matters more than just getting something on screen quickly.",
  },
  {
    title: "Fast Ramp-Up",
    description:
      "I learn new stacks quickly, but I also try to ground them in strong computer science fundamentals so the code is not only working today, but structured well for tomorrow.",
  },
];

const frameworks: StackItem[] = [
  {
    name: "React",
    description:
      "Interactive interfaces with strong component structure, clean state flow, and a lot of attention to feel.",
    icon: FaReact,
    tone: "#1d9bf0",
    tint: "rgba(29, 155, 240, 0.14)",
    lightTone: "#83ddff",
    lightTint: "rgba(131, 221, 255, 0.16)",
  },
  {
    name: "Node.js",
    description:
      "Backend logic, automation, and product glue that keep the application side practical and maintainable.",
    icon: SiNodedotjs,
    tone: "#2ea043",
    tint: "rgba(46, 160, 67, 0.14)",
    lightTone: "#5bd57c",
    lightTint: "rgba(91, 213, 124, 0.16)",
  },
  {
    name: "Next.js",
    description:
      "Structured production sites and app surfaces where routing, responsiveness, and SEO need to stay clean.",
    icon: SiNextdotjs,
    tone: "#0f172a",
    tint: "rgba(15, 23, 42, 0.1)",
    lightTone: "#f8fafc",
    lightTint: "rgba(248, 250, 252, 0.16)",
  },
  {
    name: "Express",
    description:
      "Lean APIs and custom server flows when a lightweight backend is the right tool for the job.",
    icon: SiExpress,
    tone: "#334155",
    tint: "rgba(51, 65, 85, 0.1)",
    lightTone: "#dbe4f0",
    lightTint: "rgba(219, 228, 240, 0.14)",
  },
];

const languages: StackItem[] = [
  {
    name: "Python",
    description:
      "Automation, scraping, data wrangling, and backend utilities where clean scripts save a lot of manual work.",
    icon: SiPython,
    tone: "#3776ab",
    tint: "rgba(55, 118, 171, 0.14)",
    lightTone: "#7db8ef",
    lightTint: "rgba(125, 184, 239, 0.16)",
  },
  {
    name: "JavaScript",
    description:
      "UI behavior, browser-side logic, and product wiring across modern web applications.",
    icon: SiJavascript,
    tone: "#c59a00",
    tint: "rgba(245, 205, 0, 0.18)",
    lightTone: "#f2d75b",
    lightTint: "rgba(242, 215, 91, 0.17)",
  },
  {
    name: "Swift",
    description:
      "Native iOS development in SwiftUI with a focus on polish, clarity, and dependable behavior.",
    icon: FaSwift,
    tone: "#f05138",
    tint: "rgba(240, 81, 56, 0.14)",
    lightTone: "#ff8b77",
    lightTint: "rgba(255, 139, 119, 0.16)",
  },
  {
    name: "SQL",
    description:
      "Schemas, queries, joins, and the data modeling decisions behind features that need to stay coherent.",
    icon: FaDatabase,
    tone: "#2563eb",
    tint: "rgba(37, 99, 235, 0.12)",
    lightTone: "#82abff",
    lightTint: "rgba(130, 171, 255, 0.16)",
  },
];

function getProjectLogoSrc(project: Project, theme: Theme) {
  if (project.logoFile === "schedulearn" && theme === "light") {
    return "/logos/schedulearn-light.jpeg";
  }

  if (project.logoFile === "shabbatalarmclock" && theme === "light") {
    return "/logos/shabbatalarmclock-light.jpeg";
  }

  if (project.logoFile === "iinaplex" && theme === "light") {
    return "/logos/iinaplex-light.jpeg";
  }

  if (project.logoFile === "jerusalemheritagerealty" && theme === "light") {
    return "/logos/jerusalemheritagerealty-light.jpeg";
  }

  if (project.logoFile === "tandbeeliquidgold" && theme === "light") {
    return "/logos/tandbeeliquidgold-light.jpeg";
  }

  return `/logos/${project.logoFile}.jpeg`;
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  description,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="section">
      <Reveal className="section-head">
        <p className="section-eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
        <p className="section-description">{description}</p>
      </Reveal>
      {children}
    </section>
  );
}

function ProjectCard({
  project,
  index,
  theme,
}: {
  project: Project;
  index: number;
  theme: Theme;
}) {
  const reducedMotion = useReducedMotion();
  const [logoVisible, setLogoVisible] = useState(true);
  const logoSrc = getProjectLogoSrc(project, theme);

  useEffect(() => {
    setLogoVisible(true);
  }, [logoSrc]);

  return (
    <motion.article
      layout
      className="project-card"
      whileHover={reducedMotion ? undefined : { x: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="project-main">
        <div className="project-title-row">
          <div className="project-title-group">
            <div className="project-index">
              {String(index + 1).padStart(2, "0")}
            </div>
            <div
              aria-label={`${project.title} logo`}
              className="project-logo-placeholder"
            >
              {logoVisible ? (
                <img
                  key={logoSrc}
                  alt={`${project.title} logo`}
                  className="project-logo-image"
                  src={logoSrc}
                  onError={() => setLogoVisible(false)}
                />
              ) : (
                <span>{project.placeholderLabel}</span>
              )}
            </div>
            <div>
            <h3 className="project-title">{project.title}</h3>
            <p className="project-period">{project.period}</p>
            </div>
          </div>
        </div>
        <p className="project-summary">{project.summary}</p>
        <div className="tag-list">
          {project.stack.map((item) => (
            <span key={item} className="tag">
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="project-links">
        {project.links.map((link) => {
          const LinkIcon = link.href.includes("github.com")
            ? FaGithub
            : FaGlobe;

          return (
            <a
              key={link.label}
              aria-label={`${project.title}: ${link.label}`}
              className="project-link"
              href={link.href}
              target="_blank"
              rel="noreferrer"
              title={link.label}
            >
              <LinkIcon aria-hidden="true" />
            </a>
          );
        })}
      </div>
    </motion.article>
  );
}

function StackTile({
  item,
  category,
  theme,
}: {
  item: StackItem;
  category: string;
  theme: Theme;
}) {
  const reducedMotion = useReducedMotion();
  const Icon = item.icon;
  const tileTone =
    theme === "light" ? (item.lightTone ?? item.tone) : item.tone;
  const tileTint =
    theme === "light" ? (item.lightTint ?? item.tint) : item.tint;

  return (
    <Reveal delay={0.04}>
      <motion.article
        className="stack-tile"
        whileHover={reducedMotion ? undefined : { y: -8, scale: 1.01 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="tile-category">{category}</span>
        <div
          className="tile-icon-shell"
          style={
            {
              "--tile-tone": tileTone,
              "--tile-tint": tileTint,
            } as CSSProperties
          }
        >
          <Icon className="tile-icon" />
        </div>
        <h3 className="tile-name">{item.name}</h3>
        <p className="tile-description">{item.description}</p>
      </motion.article>
    </Reveal>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [showMoreProjects, setShowMoreProjects] = useState(false);
  const [profileImageVisible, setProfileImageVisible] = useState(true);
  const reducedMotion = useReducedMotion();
  const nextTheme = theme === "dark" ? "light" : "dark";

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    const applyTheme = () =>
      setTheme((value) => (value === "dark" ? "light" : "dark"));

    if (reducedMotion) {
      applyTheme();
      return;
    }

    const documentWithTransition = document as ViewTransitionCapableDocument;

    if (!documentWithTransition.startViewTransition) {
      applyTheme();
      return;
    }

    documentWithTransition.startViewTransition(() => {
      flushSync(() => {
        applyTheme();
      });
    });
  }

  return (
    <div className="page-shell" id="home">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="topbar-actions">
            <nav aria-label="Section navigation" className="nav">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  aria-label={item.label}
                  className="nav-link"
                  href={item.href}
                  title={item.label}
                >
                  <item.icon />
                </a>
              ))}
            </nav>

            <motion.button
              type="button"
              className="theme-toggle"
              aria-label={`Switch to ${nextTheme} mode`}
              aria-pressed={theme === "light"}
              title={`Switch to ${nextTheme} mode`}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={toggleTheme}
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  opacity: theme === "light" ? 0.92 : 0.78,
                  rotate: theme === "light" ? 90 : 0,
                  scale: theme === "light" ? 0.92 : 1,
                }}
                className="theme-toggle-glyph"
                transition={{
                  duration: reducedMotion ? 0.01 : 0.42,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <FiSun className="theme-toggle-icon" />
              </motion.span>
              <span className="sr-only">{`${theme} mode active`}</span>
            </motion.button>
          </div>
        </div>
      </header>

      <div className="layout">
        <aside className="sidebar">
          <Reveal className="sidebar-inner">
            <section className="identity-card">
              <div className="identity-media">
                <div
                  className={`identity-portrait${profileImageVisible ? " identity-portrait-live" : ""}`}
                >
                  {profileImageVisible ? (
                    <img
                      alt="Jeremy Jacob portrait"
                      className="identity-photo"
                      src="/logos/jj.jpeg"
                      onError={() => setProfileImageVisible(false)}
                    />
                  ) : (
                    <>
                      <div className="portrait-rings" />
                      <div className="portrait-monogram">JJ</div>
                      <div className="portrait-caption">Jeremy Jacob</div>
                    </>
                  )}
                </div>
              </div>

              <div className="identity-copy">
                <p className="identity-label">Jeremy Jacob</p>
                <h2 className="identity-name">Full-Stack Developer</h2>
                <p className="identity-summary">
                  Building polished products across frontend, backend, data, and
                  iOS with a strong eye for detail and product feel.
                </p>
              </div>

              <div className="contact-row">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      aria-label={item.label}
                      className="contact-link"
                      href={item.href}
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      <Icon />
                    </a>
                  );
                })}
              </div>
            </section>
          </Reveal>
        </aside>

        <main className="content">
          <section className="hero section">
            <motion.div
              className="hero-content"
              initial={reducedMotion ? undefined : { opacity: 0, y: 34 }}
              animate={reducedMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <p className="hero-eyebrow">
                Production web apps, iOS builds, and calm systems that are built
                to last.
              </p>
              <div className="hero-display">
                <span className="hero-display-line">FULL STACK</span>
                <span className="hero-display-line hero-display-line-accent">
                  DEVELOPER
                </span>
              </div>
              <p className="hero-blurb">
                I build polished products end-to-end, from interfaces and motion
                to APIs, database-backed features, debugging, and the last-mile
                details that make software feel finished.
              </p>
              <p className="hero-note">
                Strong on product feel. Comfortable in the technical weeds.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#projects">
                  Recent work
                  <FaArrowRightLong />
                </a>
                <a
                  className="button button-secondary"
                  href="mailto:jeremyjacob101@gmail.com"
                >
                  Let&apos;s talk
                </a>
              </div>

              <div className="hero-chip-row">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Python",
                  "SQL",
                  "SwiftUI",
                ].map((chip) => (
                  <span key={chip} className="hero-chip">
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          </section>

          <Section
            id="projects"
            eyebrow="Recent Projects"
            title="Work that shipped, launched, or had to survive real users."
            description="A mix of product work, personal builds, and client-facing projects. Live links where they exist, code where it makes sense."
          >
            <Reveal>
              <div className="projects-list">
                {featuredProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    index={index}
                    project={project}
                    theme={theme}
                  />
                ))}
              </div>
            </Reveal>

            <AnimatePresence initial={false}>
              {showMoreProjects ? (
                <motion.div
                  className="extra-projects"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="projects-list">
                    {extraProjects.map((project, index) => (
                      <ProjectCard
                        key={project.title}
                        index={featuredProjects.length + index}
                        project={project}
                        theme={theme}
                      />
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              className="expand-button"
              aria-expanded={showMoreProjects}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              onClick={() => setShowMoreProjects((value) => !value)}
            >
              <span aria-hidden="true" className="expand-dots">
                {showMoreProjects ? "−" : "..."}
              </span>
              <span>
                {showMoreProjects ? "Show fewer projects" : "More builds"}
              </span>
            </motion.button>
          </Section>

          <Section
            id="skills"
            eyebrow="What I'm Known For"
            title="Detail-first work, thoughtful systems, and a bias toward solving the whole problem."
            description="The strengths I bring to product work across frontend, backend, data, and shipping."
          >
            <div className="known-for-list">
              {signatureSkills.map((skill, index) => (
                <Reveal key={skill.title} delay={index * 0.04}>
                  <article className="known-for-row">
                    <div className="known-for-title-block">
                      <span className="known-for-count">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="known-for-title">{skill.title}</h3>
                    </div>
                    <p className="known-for-description">{skill.description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
          </Section>

          <Section
            id="frameworks"
            eyebrow="Frameworks"
            title="The tools I reach for when I need to move quickly without sacrificing structure."
            description="Favorite resources for integrated external frameworks and architectures to bring clean, structured, and robust apps to fruition."
          >
            <div className="badge-grid">
              {frameworks.map((item) => (
                <StackTile
                  key={item.name}
                  category="Framework"
                  item={item}
                  theme={theme}
                />
              ))}
            </div>
          </Section>

          <Section
            id="languages"
            eyebrow="Languages I Speak"
            title="The programming languages behind most of the work above."
            description="From scripting and data cleanup to browser logic, native iOS, and relational data work."
          >
            <div className="badge-grid">
              {languages.map((item) => (
                <StackTile
                  key={item.name}
                  category="Language"
                  item={item}
                  theme={theme}
                />
              ))}
            </div>
          </Section>

          <Section
            id="contact"
            eyebrow="Contact"
            title="Let's build something useful, fast, and actually polished."
            description="If you need someone who can move between product thinking, frontend feel, backend logic, and debugging without dropping the details, I'm easy to reach."
          >
            <Reveal className="contact-cta">
              <a
                className="contact-mail"
                href="mailto:jeremyjacob101@gmail.com"
              >
                jeremyjacob101@gmail.com
              </a>
              <div className="contact-actions">
                <a
                  className="button button-primary"
                  href="https://linkedin.com/in/jeremyjacob101"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                  <FaArrowUpRightFromSquare />
                </a>
                <a
                  className="button button-secondary"
                  href="https://github.com/jeremyjacob101"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>
              </div>
            </Reveal>
          </Section>
        </main>
      </div>
    </div>
  );
}

export default App;
