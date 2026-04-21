import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaArrowRightLong,
  FaArrowUpRightFromSquare,
  FaBriefcase,
  FaEnvelope,
  FaFolderOpen,
  FaGithub,
  FaGlobe,
  FaHouse,
  FaLinkedinIn,
  FaPhone,
  FaReact,
  FaToolbox,
  FaUserGear,
  FaCode,
} from "react-icons/fa6";
import { FiSun } from "react-icons/fi";
import {
  SiExpress,
  SiFirebase,
  SiNextdotjs,
  SiNodedotjs,
  SiSupabase,
} from "react-icons/si";
import "./styles.css";

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
  category: string;
  name: string;
  description: string;
  icon: IconType;
  tone: string;
  tint: string;
  lightTone?: string;
  lightTint?: string;
};

type BadgeItem = {
  name: string;
  src: string;
  alt: string;
};

type ContactItem = {
  label: string;
  text: string;
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
  { label: "Experience", href: "#experience", icon: FaBriefcase },
  { label: "Projects", href: "#personal-projects", icon: FaFolderOpen },
  { label: "Known For", href: "#skills", icon: FaUserGear },
  { label: "Frameworks", href: "#frameworks", icon: FaToolbox },
  { label: "Languages", href: "#languages", icon: FaCode },
  { label: "Contact", href: "#contact", icon: FaEnvelope },
];

const contactItems: ContactItem[] = [
  {
    label: "Email",
    text: "jeremyjacob101@gmail.com",
    href: "mailto:jeremyjacob101@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "Phone",
    text: "+972 53-714-8073",
    href: "tel:+972537148073",
    icon: FaPhone,
  },
  {
    label: "LinkedIn",
    text: "linkedin.com/in/jeremyjacob101",
    href: "https://linkedin.com/in/jeremyjacob101",
    icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    text: "github.com/jeremyjacob101",
    href: "https://github.com/jeremyjacob101",
    icon: FaGithub,
  },
  {
    label: "Website",
    text: "jeremyjacob.site",
    href: "https://jeremyjacob.site",
    icon: FaGlobe,
  },
];

const experienceProjects: Project[] = [
  {
    title: "Kartiseret",
    period: "2024 - Present",
    summary:
      "A full-stack movie discovery and showtimes platform that pulls fragmented Israeli cinema data into one seamless browsing experience.",
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
];

const personalProjects: Project[] = [
  {
    title: "IINAplex",
    period: "2026",
    summary:
      "A browser extension that adds a one-click Play in IINA flow to Plex Web by resolving stream URLs and handing playback off to the native desktop app.",
    stack: ["Browser extension", "JavaScript", "Plex", "Desktop workflow"],
    logoFile: "iinaplex",
    placeholderLabel: "IP",
    links: [{ label: "GitHub", href: "https://github.com/jeremyjacob101/IINAplex" }],
  },
  {
    title: "T&Bee Liquid Gold",
    period: "2025",
    summary:
      "A product-focused brand site shaped around clear merchandising, polished frontend detail, and steady iteration across the customer experience.",
    stack: ["Website", "Frontend polish", "Shipped build"],
    logoFile: "tandbeeliquidgold",
    placeholderLabel: "TB",
    links: [{ label: "Website", href: "https://tandbeeliquidgold.com/" }],
  },
  {
    title: "FeedScroller",
    period: "2026",
    summary:
      "A Chrome extension that lets you jump back into your feed exactly where you left off instead of losing your place after every tab switch.",
    stack: ["Chrome extension", "JavaScript", "UX utility"],
    logoFile: "feedscroller",
    placeholderLabel: "FS",
    links: [{ label: "GitHub", href: "https://github.com/jeremyjacob101/FeedScroller" }],
  },
  {
    title: "ColorCal",
    period: "2026",
    summary:
      "A menu-bar calendar experiment built around color as the primary interface, turning date browsing into a more visual desktop utility.",
    stack: ["JavaScript", "Menu bar", "Desktop utility"],
    logoFile: "colorcal",
    placeholderLabel: "CC",
    links: [{ label: "GitHub", href: "https://github.com/jeremyjacob101/ColorCal" }],
  },
  {
    title: "ColorTime",
    period: "2026",
    summary:
      "A Mac menu-bar app that represents time through color, continuing the visual-system direction behind your other desktop experiments.",
    stack: ["TypeScript", "Mac app", "Menu bar"],
    logoFile: "colortime",
    placeholderLabel: "CT",
    links: [{ label: "GitHub", href: "https://github.com/jeremyjacob101/ColorTime" }],
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
    category: "Framework",
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
    category: "Runtime",
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
    category: "Framework",
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
    category: "Framework",
    name: "Express",
    description:
      "Lean APIs and custom server flows when a lightweight backend is the right tool for the job.",
    icon: SiExpress,
    tone: "#334155",
    tint: "rgba(51, 65, 85, 0.1)",
    lightTone: "#dbe4f0",
    lightTint: "rgba(219, 228, 240, 0.14)",
  },
  {
    category: "Platform",
    name: "Firebase",
    description:
      "Managed auth, data, and hosted product infrastructure when fast iteration matters more than custom ops.",
    icon: SiFirebase,
    tone: "#ffca28",
    tint: "rgba(255, 202, 40, 0.18)",
    lightTone: "#f4b000",
    lightTint: "rgba(244, 176, 0, 0.16)",
  },
  {
    category: "Platform",
    name: "Supabase",
    description:
      "Postgres-backed product features, auth, and storage with a developer-friendly path from prototype to production.",
    icon: SiSupabase,
    tone: "#3ecf8e",
    tint: "rgba(62, 207, 142, 0.16)",
    lightTone: "#25b26f",
    lightTint: "rgba(37, 178, 111, 0.16)",
  },
  {
    category: "Technology",
    name: "REST API",
    description:
      "HTTP-based system integration patterns for connecting products cleanly across clients, services, and outside data sources.",
    icon: FaGlobe,
    tone: "#0f9f92",
    tint: "rgba(15, 159, 146, 0.16)",
    lightTone: "#0b7f75",
    lightTint: "rgba(11, 127, 117, 0.15)",
  },
];

const languages: BadgeItem[] = [
  {
    name: "TypeScript",
    alt: "TypeScript badge",
    src: "https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white",
  },
  {
    name: "JavaScript",
    alt: "JavaScript badge",
    src: "https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black",
  },
  {
    name: "Swift",
    alt: "Swift badge",
    src: "https://img.shields.io/badge/-Swift-FA7343?style=flat-square&logo=swift&logoColor=white",
  },
  {
    name: "Python",
    alt: "Python badge",
    src: "https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white",
  },
  {
    name: "SQL",
    alt: "SQL badge",
    src: "https://img.shields.io/badge/-SQL-4479A1?style=flat-square&logo=mysql&logoColor=white",
  },
  {
    name: "Java",
    alt: "Java badge",
    src: "https://img.shields.io/badge/-Java-007396?style=flat-square&logo=openjdk&logoColor=white",
  },
  {
    name: "C++",
    alt: "C++ badge",
    src: "https://img.shields.io/badge/-C%2B%2B-00599C?style=flat-square&logo=c%2B%2B&logoColor=white",
  },
  {
    name: "HTML",
    alt: "HTML badge",
    src: "https://img.shields.io/badge/-HTML-E34F26?style=flat-square&logo=html5&logoColor=white",
  },
  {
    name: "CSS",
    alt: "CSS badge",
    src: "https://img.shields.io/badge/CSS-1572B6?style=flat-square&logo=css3&logoColor=white",
  },
];

function getProjectLogoSrc(project: Project, theme: Theme) {
  if (project.logoFile === "colorcal") {
    return theme === "light" ? "/logos/colorcal-light.jpeg" : "/logos/colorcal.png";
  }

  if (project.logoFile === "feedscroller" && theme === "light") {
    return "/logos/feedscroller-light.jpeg";
  }

  if (project.logoFile === "colortime" && theme === "light") {
    return "/logos/colortime-light.jpeg";
  }

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

function AutoScrollRail({
  ariaLabel,
  children,
  shellClassName,
  railClassName,
  trackClassName,
  speed,
  direction = "forward",
}: {
  ariaLabel: string;
  children: ReactNode;
  shellClassName: string;
  railClassName: string;
  trackClassName: string;
  speed: number;
  direction?: "forward" | "reverse";
}) {
  const reducedMotion = useReducedMotion();
  const railRef = useRef<HTMLDivElement | null>(null);
  const itemsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const rail = railRef.current;
    const itemsTrack = itemsRef.current;

    if (!rail || !itemsTrack || reducedMotion) {
      return;
    }

    let frameId = 0;
    let isVisible = false;
    let lastTime = 0;

    if (direction === "reverse") {
      rail.scrollLeft = itemsTrack.scrollWidth;
    } else {
      rail.scrollLeft = 0;
    }

    const step = (time: number) => {
      if (!isVisible) {
        frameId = 0;
        lastTime = 0;
        return;
      }

      if (lastTime === 0) {
        lastTime = time;
      }

      const delta = (time - lastTime) / 1000;
      lastTime = time;
      const offset = speed * delta;

      if (direction === "reverse") {
        rail.scrollLeft -= offset;

        if (rail.scrollLeft <= 0) {
          rail.scrollLeft += itemsTrack.scrollWidth;
        }
      } else {
        rail.scrollLeft += offset;

        if (rail.scrollLeft >= itemsTrack.scrollWidth) {
          rail.scrollLeft -= itemsTrack.scrollWidth;
        }
      }

      frameId = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? false;

        if (isVisible && frameId === 0) {
          frameId = window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(rail);

    return () => {
      observer.disconnect();

      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, [direction, reducedMotion, speed]);

  return (
    <div className={shellClassName}>
      <div
        ref={railRef}
        className={railClassName}
        role="list"
        aria-label={ariaLabel}
      >
        <div ref={itemsRef} className={trackClassName}>
          {children}
        </div>
        <div className={trackClassName} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

function LanguagesRail({ items }: { items: BadgeItem[] }) {
  return (
    <AutoScrollRail
      ariaLabel="Languages"
      shellClassName="language-rail-shell"
      railClassName="language-rail"
      trackClassName="language-track"
      speed={75}
      direction="reverse"
    >
      {items.map((item) => (
        <div key={item.name} className="language-badge" role="listitem">
          <img alt={item.alt} loading="lazy" src={item.src} />
        </div>
      ))}
    </AutoScrollRail>
  );
}

function StackRail({ items, theme }: { items: StackItem[]; theme: Theme }) {
  return (
    <AutoScrollRail
      ariaLabel="Frameworks, platforms, and technologies"
      shellClassName="stack-rail-shell"
      railClassName="stack-rail"
      trackClassName="stack-track"
      speed={45}
      direction="forward"
    >
      {items.map((item) => (
        <div key={item.name} className="stack-rail-item" role="listitem">
          <StackTile item={item} theme={theme} />
        </div>
      ))}
    </AutoScrollRail>
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
  const primaryLink =
    project.links.find((link) => !link.href.includes("github.com")) ??
    project.links.find((link) => link.href.includes("github.com"));

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
            {primaryLink ? (
              <a
                aria-label={`${project.title} primary link`}
                className="project-primary-link"
                href={primaryLink.href}
                target="_blank"
                rel="noreferrer"
              >
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
              </a>
            ) : (
              <>
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
              </>
            )}
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
  theme,
}: {
  item: StackItem;
  theme: Theme;
}) {
  const Icon = item.icon;
  const tileTone =
    theme === "light" ? (item.lightTone ?? item.tone) : item.tone;
  const tileTint =
    theme === "light" ? (item.lightTint ?? item.tint) : item.tint;

  return (
    <article
      className="stack-tile"
      style={
        {
          "--tile-tone": tileTone,
          "--tile-tint": tileTint,
        } as CSSProperties
      }
    >
      <span className="tile-category">{item.category}</span>
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
    </article>
  );
}

function App() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
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
                Production web apps, iOS builds, and robust codebases that are built
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
                <a className="button button-primary" href="#experience">
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
            id="experience"
            eyebrow="Experience"
            title="Production work that shipped, launched, and holds up in the real world."
            description="A focused look at client work, product work, and shipped apps where the details thrive under actual use."
          >
            <Reveal>
              <div className="projects-list">
                {experienceProjects.map((project, index) => (
                  <ProjectCard
                    key={project.title}
                    index={index}
                    project={project}
                    theme={theme}
                  />
                ))}
              </div>
            </Reveal>
          </Section>

          <Section
            id="personal-projects"
            eyebrow="Personal Projects"
            title="Independent builds shaped by curiosity."
            description="Browser tools, desktop experiments, and practical utilities pulled from your GitHub work and built around useful everyday friction."
          >
            <Reveal delay={0.06}>
              <div className="extra-projects">
                <div className="projects-list">
                  {personalProjects.map((project, index) => (
                    <ProjectCard
                      key={project.title}
                      index={index}
                      project={project}
                      theme={theme}
                    />
                  ))}
                </div>
                <a
                  className="expand-button"
                  href="https://github.com/jeremyjacob101"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>More Projects</span>
                  <FaArrowRightLong aria-hidden="true" />
                </a>
              </div>
            </Reveal>
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
            eyebrow="Frameworks, Platforms, and Technologies"
            title="The tools I reach for when I need to move quickly without sacrificing structure."
            description="Frameworks for interface and server work, platforms for managed backend needs, and technologies that help systems talk to each other cleanly."
          >
            <StackRail items={frameworks} theme={theme} />
          </Section>

          <Section
            id="languages"
            eyebrow="Languages I Speak"
            title="The programming languages I use to make it all possible."
            description="From scripting and data cleanup to browser logic, native iOS, and relational data work, these paradigms combine seamless codebases."
          >
            <LanguagesRail items={languages} />
          </Section>

          <Section
            id="contact"
            eyebrow="Contact"
            title="Let's build something useful, fast, and polished."
            description="If you need someone who can move between product thinking, frontend feel, backend logic, and debugging without dropping the details, I'm easy to reach."
          >
            <Reveal className="contact-cta">
              <div className="contact-list" role="list">
                {contactItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <a
                      key={item.label}
                      className="contact-list-item"
                      href={item.href}
                      role="listitem"
                      target={
                        item.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        item.href.startsWith("http") ? "noreferrer" : undefined
                      }
                    >
                      <span className="contact-list-icon" aria-hidden="true">
                        <Icon />
                      </span>
                      <span className="contact-list-text">{item.text}</span>
                      <FaArrowUpRightFromSquare
                        className="contact-list-arrow"
                        aria-hidden="true"
                      />
                    </a>
                  );
                })}
              </div>
            </Reveal>
          </Section>
        </main>
      </div>
    </div>
  );
}

export default App;

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App />);
}
