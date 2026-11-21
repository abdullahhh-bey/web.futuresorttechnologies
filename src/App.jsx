import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { projects } from "./data/projects.js";
import { teamMembers } from "./data/team.js";
import { clientReviews } from "./data/reviews.js";
import { submitForm } from "./api.js";
import Chatbot from "./Chatbot.jsx";
import logoFull from "../assets/logo-full.png";
import logoMark from "../assets/logo-mark-loader.png";

const pages = {
  "/": "Home",
  "/index.html": "Home",
  "/services.html": "Services",
  "/portfolio.html": "Portfolio",
  "/learning.html": "Learning",
  "/about.html": "Team",
  "/contact.html": "Contact",
};

const pageDescriptions = {
  Home: "FutureSort Technologies builds AI-powered software, automations, SaaS products, and web and mobile applications.",
  Services:
    "AI automation, agentic AI, SaaS product development, and web and mobile app engineering from FutureSort Technologies.",
  Portfolio:
    "Explore software, SaaS, AI, and mobile product case studies from FutureSort Technologies.",
  Learning:
    "Explore FutureSort Technologies' two-month AI engineering course and register for a free demo class.",
  Team: "Meet FutureSort Technologies: a focused engineering team building practical AI, SaaS, and custom software.",
  Contact:
    "Talk to FutureSort Technologies about your next AI, SaaS, software, or app development project.",
};

const serviceItems = [
  {
    icon: "spark",
    number: "01",
    id: "ai-automation",
    title: "AI automation",
    text: "Replace repetitive work with dependable workflows that connect your tools, move data, and keep people in control.",
    tags: ["Workflow design", "Scripts & integrations", "Human-in-the-loop"],
  },
  {
    icon: "orbit",
    number: "02",
    id: "agentic-ai",
    title: "Agentic AI",
    text: "Purpose-built AI agents that reason through tasks, use approved tools, and work inside the software your team already relies on.",
    tags: ["Tool-using agents", "Guardrails", "Evaluation"],
  },
  {
    icon: "layers",
    number: "03",
    id: "saas-products",
    title: "SaaS products",
    text: "Turn a product idea into a secure, scalable SaaS platform, from first architecture to billing, analytics, and launch.",
    tags: ["Product engineering", "Cloud architecture", "Ongoing support"],
  },
  {
    icon: "code",
    number: "04",
    id: "web-apps",
    title: "Web applications",
    text: "Fast, thoughtful web apps, customer portals, and internal dashboards designed around real user needs.",
    tags: ["Frontend & backend", "Dashboards", "API development"],
  },
  {
    icon: "mobile",
    number: "05",
    id: "mobile-apps",
    title: "Mobile applications",
    text: "Polished iOS and Android experiences with a reliable foundation and a consistent feel across devices.",
    tags: ["iOS & Android", "Cross-platform", "App integrations"],
  },
  {
    icon: "wrench",
    number: "06",
    id: "custom-software",
    title: "Custom software",
    text: "The platforms, tools, and integrations that make your unique business processes easier to run and improve.",
    tags: ["Discovery & architecture", "Legacy modernization", "Integrations"],
  },
];

function Icon({ name, size = 25 }) {
  const paths = {
    spark: (
      <>
        <path d="M12 2.8 14.2 9l6.3 2.2-6.3 2.2L12 19.7 9.8 13.4 3.5 11.2 9.8 9 12 2.8Z" />
        <path d="m19 15 .9 2.5 2.6.9-2.6.9L19 22l-.9-2.7-2.6-.9 2.6-.9L19 15Z" />
      </>
    ),
    orbit: (
      <>
        <circle cx="12" cy="12" r="2.4" />
        <ellipse
          cx="12"
          cy="12"
          rx="9"
          ry="4.3"
          transform="rotate(-35 12 12)"
        />
        <path d="M5 19 19 5" />
      </>
    ),
    layers: (
      <>
        <path d="m12 3 9 5-9 5-9-5 9-5Z" />
        <path d="m3 12 9 5 9-5M3 16l9 5 9-5" />
      </>
    ),
    code: (
      <>
        <path d="m8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14" />
      </>
    ),
    mobile: (
      <>
        <rect x="6.5" y="2.5" width="11" height="19" rx="2.2" />
        <path d="M10 18.5h4" />
      </>
    ),
    wrench: (
      <>
        <path d="M14.4 6.1a5.3 5.3 0 0 0-6.9 6.8L3 17.4a2.1 2.1 0 0 0 3 3l4.5-4.5a5.3 5.3 0 0 0 6.8-6.9l-3.1 3.1-3.2-3.2 3.4-2.8Z" />
        <path d="m17 16 4 4" />
      </>
    ),
    arrow: (
      <>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </>
    ),
    search: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.5 4.5" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    chart: (
      <>
        <path d="M4 19V5M4 19h17" />
        <path d="m7 15 4-4 3 2 6-7" />
        <circle cx="20" cy="6" r="1" />
      </>
    ),
    menu: (
      <>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </>
    ),
    close: (
      <>
        <path d="m6 6 12 12M18 6 6 18" />
      </>
    ),
    lock: (
      <>
        <rect x="4" y="10" width="16" height="11" rx="2" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </>
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
    phone: (
      <path d="M7.2 3.8 9.5 8l-1.6 1.8a13.6 13.6 0 0 0 6.3 6.3l1.8-1.6 4.2 2.3-.7 3.4a2 2 0 0 1-2.2 1.6C9 21 3 15 2.2 6.7a2 2 0 0 1 1.6-2.2l3.4-.7Z" />
    ),
    pin: (
      <>
        <path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" />
        <circle cx="12" cy="10" r="2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  };
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name] || paths.spark}
    </svg>
  );
}

const PAGE_TRANSITION_KEY = "futuresort:page-transition-until";
const HOME_LOADER_KEY = "futuresort:home-loader-seen";

const LOADER_CODE_LINES = [
  '<span class="k">const</span> build = <span class="k">await</span> compile(source);',
  '<span class="dim">// initializing render pipeline</span>',
  '<span class="k">function</span> mount(root) { render(app, root); }',
  'POST /api/v1/deploy <span class="dim">200 OK</span>',
  '{ <span class="k">"status"</span>: <span class="k">"ready"</span>, <span class="dim">"latency": 42</span> }',
  '<span class="k">SELECT</span> * <span class="k">FROM</span> projects <span class="k">WHERE</span> live = true;',
  '<span class="k">import</span> { useEffect } <span class="k">from</span> <span class="dim">"react"</span>;',
  ".core { animation: pulse 2s infinite; }",
  '<span class="dim">$</span> npm run build <span class="dim">&nbsp;&nbsp;✓</span>',
  '<span class="k">class</span> Engine <span class="k">extends</span> Core {}',
  '<span class="k">export default</span> function App() {}',
  '<span class="dim">// linking modules…</span>',
  '<span class="k">GET</span> /assets/bundle.js <span class="dim">200</span>',
  '<span class="k">if</span> (ready) { initialize(); }',
  'git commit -m <span class="dim">"ship it"</span>',
  '<span class="k">const</span> nodes = graph.connect(a, b);',
];

const LOADER_STATUS = ["INITIALIZING", "COMPILING ASSETS", "BUILD COMPLETE"];

function getLoaderMode() {
  const path =
    window.location.pathname === "/"
      ? "/index.html"
      : window.location.pathname;
  const transitionUntil = Number(sessionStorage.getItem(PAGE_TRANSITION_KEY));
  const firstHomeVisit =
    path === "/index.html" && sessionStorage.getItem(HOME_LOADER_KEY) !== "true";
  if (firstHomeVisit) return "full"; // pehli visit: poora boot sequence
  if (transitionUntil > Date.now()) return "short"; // page change: chhota loader
  return null;
}

function LoaderCodeColumn({ side }) {
  // list 2 baar, taake scroll seamless loop ho
  const lines = [...LOADER_CODE_LINES, ...LOADER_CODE_LINES];
  return (
    <div className={`page-loader-code page-loader-code-${side}`} aria-hidden="true">
      <div className="page-loader-code-track">
        {lines.map((line, i) => (
          <div
            key={i}
            className="page-loader-line"
            style={{ animationDelay: `${((i * 0.37) % 2.4).toFixed(2)}s` }}
            dangerouslySetInnerHTML={{ __html: line }}
          />
        ))}
      </div>
    </div>
  );
}

function LoaderLink({ side }) {
  return (
    <div className={`page-loader-link page-loader-link-${side}`} aria-hidden="true">
      <i className="page-loader-particle" />
      <i className="page-loader-particle" style={{ animationDelay: ".9s" }} />
    </div>
  );
}

function PageLoader() {
  const [mode, setMode] = useState(getLoaderMode);

  useEffect(() => {
    const currentPath =
      window.location.pathname === "/"
        ? "/index.html"
        : window.location.pathname;
    if (
      currentPath === "/index.html" &&
      sessionStorage.getItem(HOME_LOADER_KEY) !== "true"
    ) {
      sessionStorage.setItem(HOME_LOADER_KEY, "true");
    }
    if (sessionStorage.getItem(PAGE_TRANSITION_KEY)) {
      sessionStorage.removeItem(PAGE_TRANSITION_KEY);
    }

    const onDocumentClick = (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      ) {
        return;
      }

      const link = event.target.closest("a[href]");
      if (
        !link ||
        link.hasAttribute("download") ||
        (link.target && link.target.toLowerCase() !== "_self")
      ) {
        return;
      }

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin) return;

      const destinationPath =
        destination.pathname === "/" ? "/index.html" : destination.pathname;
      const samePage =
        destinationPath === currentPath &&
        destination.search === window.location.search;
      if (samePage) return;

      sessionStorage.setItem(
        PAGE_TRANSITION_KEY,
        String(Date.now() + 15_000),
      );
    };

    const onPageShow = (event) => {
      if (event.persisted) setMode("short");
    };

    document.addEventListener("click", onDocumentClick);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, []);

  useEffect(() => {
    if (!mode) return undefined;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // full = purane site wale 4050ms, short = 1800ms (pehle jaisa)
    const duration = reduceMotion ? 700 : mode === "full" ? 4050 : 1_800;
    const timer = window.setTimeout(() => setMode(null), duration);
    return () => window.clearTimeout(timer);
  }, [mode]);

  if (!mode) return null;

  return (
    <div
      className={`page-loader page-loader-${mode}`}
      role="status"
      aria-label="Loading FutureSort"
    >
      {mode === "full" && (
        <div className="page-loader-vignette" aria-hidden="true" />
      )}
      {mode === "full" && <LoaderCodeColumn side="left" />}
      {mode === "full" && <LoaderCodeColumn side="right" />}
      <LoaderLink side="left" />
      <LoaderLink side="right" />
      <div className="page-loader-content">
        <div className="page-loader-core" aria-hidden="true">
          <span className="page-loader-circle" />
          <div className="page-loader-emblem">
            <span className="page-loader-orbit page-loader-orbit-blue" />
            <span className="page-loader-orbit page-loader-orbit-cyan" />
            <img src={logoMark} alt="" width="1440" height="1440" />
          </div>
        </div>
      </div>
      {mode === "full" && (
        <div className="page-loader-status" aria-hidden="true">
          {LOADER_STATUS.map((text, i) => (
            <span key={text} className={`page-loader-status-${i + 1}`}>
              {text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function CardSparkBorder() {
  return <span className="brand-spark-border" aria-hidden="true" />;
}

function Header({ currentPage }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "index.html"],
    ["Services", "services.html"],
    ["Portfolio", "portfolio.html"],
    ["Learning", "learning.html"],
    ["Team", "about.html"],
    ["Contact", "contact.html"],
  ];

  useEffect(() => {
    const onScroll = () =>
      document.body.classList.toggle("has-scrolled", window.scrollY > 12);
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("has-scrolled", "nav-open");
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    return () => document.body.classList.remove("nav-open");
  }, [open]);

  return (
    <>
      <div
        className={`nav-scrim${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />
      <header className="site-header">
        <div className="container nav-inner">
          <a
            className="brand"
            href="index.html"
            aria-label="FutureSort Technologies home"
          >
            <img
              className="brand-image"
              src={logoFull}
              alt=""
              width="1017"
              height="245"
            />
          </a>
          <nav
            id="primary-navigation"
            className={`nav-links${open ? " is-open" : ""}`}
            aria-label="Main navigation"
          >
            {links.map(([label, href]) => (
              <a
                key={href}
                href={href}
                className={currentPage === label ? "active" : ""}
                aria-current={currentPage === label ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            {currentPage === "Learning" ? (
              <button
                type="button"
                className="btn btn-ghost btn-sm learning-login"
                disabled
                aria-label="Login is not available yet"
              >
                Login
              </button>
            ) : (
              <a href="contact.html" className="btn btn-ghost btn-sm">
                Start a project <Icon name="arrow" size={16} />
              </a>
            )}
            <button
              className="nav-toggle"
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="primary-navigation"
              onClick={() => setOpen(!open)}
            >
              <Icon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

function useReveal() {
  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      targets.forEach((target) => target.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -36px 0px" },
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
}

function NetworkCanvas() {
  useEffect(() => {
    const canvas = document.querySelector(".hero-net");
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let nodes = [];
    let frame = 0;
    let resizeTimer;

    const resize = () => {
      const bounds = canvas.parentElement.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      const count = Math.max(
        18,
        Math.min(42, Math.round((width * height) / 30000)),
      );
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      context.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const other = nodes[j];
          const distance = Math.hypot(node.x - other.x, node.y - other.y);
          if (distance < 150) {
            context.strokeStyle = `rgba(48, 215, 232, ${(1 - distance / 150) * 0.22})`;
            context.lineWidth = 1;
            context.beginPath();
            context.moveTo(node.x, node.y);
            context.lineTo(other.x, other.y);
            context.stroke();
          }
        }

        if (!reducedMotion) {
          node.x += node.vx;
          node.y += node.vy;
          node.phase += 0.12;
          if (node.x < -12) node.x = width + 12;
          if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          if (node.y > height + 12) node.y = -12;
        }

        const glow = (Math.sin(node.phase) + 1) / 2;
        context.beginPath();
        context.fillStyle = `rgba(42, 239, 242, ${0.42 + glow * 0.3})`;
        context.shadowColor = "rgba(67, 244, 243, 0.8)";
        context.shadowBlur = 5 + glow * 5;
        context.arc(node.x, node.y, 1.2 + glow * 0.7, 0, Math.PI * 2);
        context.fill();
        context.shadowBlur = 0;
      }
      if (!reducedMotion) frame = window.requestAnimationFrame(draw);
    };

    resize();
    draw();
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        window.cancelAnimationFrame(frame);
        resize();
        draw();
      }, 120);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return <canvas className="hero-net" aria-hidden="true" />;
}

function BrainVisualLegacy() {
  const canvasRef = useRef(null);
  const sparkTimerRef = useRef(0);
  const sparkSequenceRef = useRef(0);
  const [activeSpark, setActiveSpark] = useState(null);
  const capabilities = [
    { title: "LLMs", className: "brain-tag-llm" },
    { title: "Agentic AI", className: "brain-tag-agents" },
    { title: "AI Architecture", className: "brain-tag-architecture" },
    { title: "RAG Systems", className: "brain-tag-rag" },
    { title: "AI Automation", className: "brain-tag-automation" },
    { title: "AI Integrations", className: "brain-tag-integrations" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;

    const points = [];
    const edges = [];
    const addEdge = (from, to, crossHemisphere = false) => {
      edges.push({
        from,
        to,
        phase: (from * 0.137 + to * 0.071) % 1,
        crossHemisphere,
      });
    };
    const rings = 9;
    const segments = 16;
    for (const side of [-1, 1]) {
      const hemisphere = [];
      for (let ring = 0; ring < rings; ring += 1) {
        const theta = ((ring + 0.5) / rings) * Math.PI;
        const vertical = Math.cos(theta);
        const ringRadius = Math.sin(theta);
        const row = [];

        for (let segment = 0; segment < segments; segment += 1) {
          const angle = -Math.PI / 2 + (segment / (segments - 1)) * Math.PI;
          const fold =
            Math.sin(angle * 8 + theta * 5) * 0.032 +
            Math.sin(angle * 13 - theta * 7) * 0.016 +
            Math.sin(theta * 12 + angle * 3) * 0.012;
          const radius = ringRadius * (0.74 + fold);
          const index = points.length;

          points.push({
            x: side * (0.105 + Math.cos(angle) * radius),
            y: vertical * 0.84,
            z: Math.sin(angle) * radius * 0.72,
            side,
            phase: (index * 0.618) % 1,
          });
          row.push(index);

          if (segment > 0) addEdge(index - 1, index);
          if (ring > 0) {
            addEdge(hemisphere[ring - 1][segment], index);
            if (segment > 0 && (ring + segment) % 2 === 0) {
              addEdge(hemisphere[ring - 1][segment - 1], index);
            }
          }
        }
        hemisphere.push(row);
      }
    }

    const stemRings = 9;
    const stemSegments = 8;
    let previousStemRing = [];
    for (let ring = 0; ring < stemRings; ring += 1) {
      const progress = ring / (stemRings - 1);
      const stemRing = [];
      for (let segment = 0; segment < stemSegments; segment += 1) {
        const angle = (segment / stemSegments) * Math.PI * 2;
        const index = points.length;
        const radius = 0.09 * (1 - progress * 0.42);
        points.push({
          x: Math.cos(angle) * radius,
          y: -0.78 - progress * 0.43,
          z: Math.sin(angle) * radius * 0.78,
          side: 0,
          phase: (index * 0.11) % 1,
        });
        stemRing.push(index);
        if (segment > 0) addEdge(index - 1, index);
        if (ring > 0) addEdge(previousStemRing[segment], index);
      }
      addEdge(stemRing[0], stemRing[stemSegments - 1]);
      previousStemRing = stemRing;
    }

    let width = 0;
    let height = 0;
    let resizeObserver;

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const project = (point, angle) => {
      const yaw = angle;
      const pitch = -0.16 + Math.sin(angle * 0.65) * 0.045;
      const rotatedX = point.x * Math.cos(yaw) - point.z * Math.sin(yaw);
      const rotatedZ = point.x * Math.sin(yaw) + point.z * Math.cos(yaw);
      const rotatedY = point.y * Math.cos(pitch) - rotatedZ * Math.sin(pitch);
      const cameraZ = point.y * Math.sin(pitch) + rotatedZ * Math.cos(pitch);
      const perspective = 3.8 / (3.8 + cameraZ);
      const scale = Math.min(width * 0.4, height * 0.49);
      return {
        x: width / 2 + rotatedX * scale * perspective,
        y: height / 2 - rotatedY * scale * perspective,
        depth: cameraZ,
        perspective,
      };
    };

    const render = () => {
      if (!width || !height) resize();
      context.clearRect(0, 0, width, height);
      const angle = 0.28;
      const projected = points.map((point) => project(point, angle));
      const pulse = 0;

      context.save();
      context.globalCompositeOperation = "source-over";
      const glow = context.createRadialGradient(
        width / 2,
        height / 2,
        8,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42,
      );
      glow.addColorStop(0, "rgba(48, 215, 232, 0.13)");
      glow.addColorStop(0.52, "rgba(34, 120, 191, 0.055)");
      glow.addColorStop(1, "rgba(2, 7, 12, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const brainScale = Math.min(width * 0.4, height * 0.49);
      const centerX = width / 2;
      const centerY = height * 0.46;
      const brainX = (value) => centerX + value * brainScale;
      const brainY = (value) => centerY + value * brainScale;
      const stem = new Path2D();
      stem.moveTo(brainX(-0.12), brainY(0.44));
      stem.bezierCurveTo(
        brainX(-0.19),
        brainY(0.64),
        brainX(-0.13),
        brainY(0.82),
        brainX(-0.07),
        brainY(0.91),
      );
      stem.quadraticCurveTo(
        brainX(0),
        brainY(0.97),
        brainX(0.07),
        brainY(0.91),
      );
      stem.bezierCurveTo(
        brainX(0.13),
        brainY(0.82),
        brainX(0.19),
        brainY(0.64),
        brainX(0.12),
        brainY(0.44),
      );
      stem.closePath();
      const stemFill = context.createLinearGradient(
        brainX(-0.12),
        brainY(0.55),
        brainX(0.12),
        brainY(0.9),
      );
      stemFill.addColorStop(0, "rgba(48, 215, 232, 0.72)");
      stemFill.addColorStop(1, "rgba(11, 19, 32, 0.94)");
      context.fillStyle = stemFill;
      context.fill(stem);
      context.strokeStyle = "rgba(48, 215, 232, 0.62)";
      context.lineWidth = 1.4;
      context.stroke(stem);

      [-1, 1].forEach((side) => {
        const lobe = new Path2D();
        lobe.moveTo(brainX(side * 0.025), brainY(-0.77));
        lobe.bezierCurveTo(
          brainX(side * 0.1),
          brainY(-0.9),
          brainX(side * 0.4),
          brainY(-0.85),
          brainX(side * 0.51),
          brainY(-0.71),
        );
        lobe.bezierCurveTo(
          brainX(side * 0.76),
          brainY(-0.75),
          brainX(side * 0.86),
          brainY(-0.54),
          brainX(side * 0.76),
          brainY(-0.34),
        );
        lobe.bezierCurveTo(
          brainX(side * 0.91),
          brainY(-0.17),
          brainX(side * 0.88),
          brainY(0.04),
          brainX(side * 0.75),
          brainY(0.19),
        );
        lobe.bezierCurveTo(
          brainX(side * 0.78),
          brainY(0.39),
          brainX(side * 0.58),
          brainY(0.57),
          brainX(side * 0.37),
          brainY(0.48),
        );
        lobe.bezierCurveTo(
          brainX(side * 0.23),
          brainY(0.64),
          brainX(side * 0.06),
          brainY(0.61),
          brainX(side * 0.025),
          brainY(0.48),
        );
        lobe.closePath();

        context.save();
        context.clip(lobe);
        const fill = context.createLinearGradient(
          brainX(side * 0.7),
          brainY(-0.8),
          brainX(side * 0.1),
          brainY(0.6),
        );
        fill.addColorStop(0, "rgba(48, 215, 232, 0.72)");
        fill.addColorStop(0.45, "rgba(34, 120, 191, 0.78)");
        fill.addColorStop(1, "rgba(11, 19, 32, 0.9)");
        context.fillStyle = fill;
        context.fillRect(
          brainX(-1),
          brainY(-1),
          brainScale * 2,
          brainScale * 2,
        );

        const folds = [
          [-0.08, -0.56, -0.28, -0.77, -0.53, -0.63],
          [-0.03, -0.35, -0.27, -0.51, -0.57, -0.35],
          [-0.04, -0.1, -0.32, -0.29, -0.56, -0.16],
          [-0.03, 0.14, -0.3, 0.02, -0.49, 0.19],
          [-0.04, 0.37, -0.22, 0.23, -0.37, 0.52],
          [-0.08, -0.62, -0.02, -0.44, -0.31, -0.46],
          [-0.08, -0.26, 0.02, -0.07, -0.3, 0.04],
          [-0.09, 0.15, 0.02, 0.31, -0.2, 0.41],
        ];
        folds.forEach(
          ([startX, startY, controlX, controlY, endX, endY], index) => {
            context.beginPath();
            context.moveTo(brainX(side * Math.abs(startX)), brainY(startY));
            context.quadraticCurveTo(
              brainX(side * Math.abs(controlX)),
              brainY(controlY),
              brainX(side * Math.abs(endX)),
              brainY(endY),
            );
            context.strokeStyle =
              index % 2 === 0
                ? "rgba(2, 7, 12, 0.62)"
                : "rgba(48, 215, 232, 0.48)";
            context.lineWidth = index % 3 === 0 ? 2.2 : 1.4;
            context.lineCap = "round";
            context.stroke();
          },
        );
        context.restore();

        context.beginPath();
        context.strokeStyle = "rgba(42, 239, 242, 0.82)";
        context.lineWidth = 1.35;
        context.shadowColor = "rgba(67, 244, 243, 0.72)";
        context.shadowBlur = 10;
        context.stroke(lobe);
        context.shadowBlur = 0;
      });

      context.beginPath();
      context.moveTo(brainX(0), brainY(-0.77));
      context.bezierCurveTo(
        brainX(-0.018),
        brainY(-0.38),
        brainX(0.02),
        brainY(0.18),
        brainX(0),
        brainY(0.51),
      );
      context.strokeStyle = "rgba(2, 7, 12, 0.96)";
      context.lineWidth = 3;
      context.stroke();
      context.beginPath();
      context.moveTo(brainX(0), brainY(-0.73));
      context.bezierCurveTo(
        brainX(-0.012),
        brainY(-0.37),
        brainX(0.013),
        brainY(0.16),
        brainX(0),
        brainY(0.47),
      );
      context.strokeStyle = "rgba(42, 239, 242, 0.62)";
      context.lineWidth = 0.85;
      context.stroke();

      context.globalCompositeOperation = "lighter";
      edges.forEach((edge) => {
        const from = projected[edge.from];
        const to = projected[edge.to];
        const depth = (from.depth + to.depth) / 2;
        const depthAlpha = Math.max(0.16, Math.min(1, 0.72 - depth * 0.4));
        const signal = (pulse + edge.phase) % 1;
        const isPulsing = signal < 0.11;
        context.beginPath();
        context.moveTo(from.x, from.y);
        context.lineTo(to.x, to.y);
        context.strokeStyle = isPulsing
          ? `rgba(48, 215, 232, ${0.45 * depthAlpha})`
          : edge.crossHemisphere
            ? `rgba(53, 150, 226, ${0.19 * depthAlpha})`
            : `rgba(193, 224, 231, ${0.25 * depthAlpha})`;
        context.lineWidth = isPulsing ? 0.9 : 0.48;
        context.stroke();
      });

      context.beginPath();
      for (let index = 0; index <= 18; index += 1) {
        const seamPoint = project(
          { x: 0, y: 0.82 - index * 0.09, z: 0.7, phase: 0 },
          angle,
        );
        if (index === 0) context.moveTo(seamPoint.x, seamPoint.y);
        else context.lineTo(seamPoint.x, seamPoint.y);
      }
      context.strokeStyle = "rgba(34, 120, 191, 0.42)";
      context.lineWidth = 1;
      context.setLineDash([2, 5]);
      context.stroke();
      context.setLineDash([]);

      points.forEach((point, index) => {
        const position = projected[index];
        const radius =
          point.phase > pulse && point.phase < pulse + 0.035
            ? 2.45
            : 0.9 + position.perspective * 0.7;
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.fillStyle =
          point.phase > pulse && point.phase < pulse + 0.035
            ? "#30d7e8"
            : `rgba(224, 246, 248, ${Math.max(0.32, 0.88 - position.depth * 0.24)})`;
        context.shadowColor = "#43f4f3";
        context.shadowBlur = radius > 2 ? 7 : 2;
        context.fill();
      });
      context.restore();
    };

    const redraw = () => {
      resize();
      render();
    };
    redraw();
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(redraw);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", redraw);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", redraw);
    };
  }, []);

  const sparkToCapability = (event) => {
    const visual = event.currentTarget.closest(".brain-visual");
    const bounds = visual?.getBoundingClientRect();
    if (!visual || !bounds) return;
    const tagBounds = event.currentTarget.getBoundingClientRect();
    const startX = bounds.width / 2;
    const startY = bounds.height * 0.46;
    const endX = tagBounds.left + tagBounds.width / 2 - bounds.left;
    const endY = tagBounds.top + tagBounds.height / 2 - bounds.top;
    const path = `M ${startX} ${startY} Q ${startX + (endX - startX) * 0.52} ${startY + (endY - startY) * 0.42 - 28} ${endX} ${endY}`;
    sparkSequenceRef.current += 1;
    setActiveSpark({
      path,
      key: sparkSequenceRef.current,
      endX,
      endY,
      viewBox: `0 0 ${bounds.width} ${bounds.height}`,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    });
    window.clearTimeout(sparkTimerRef.current);
    sparkTimerRef.current = window.setTimeout(() => setActiveSpark(null), 850);
  };

  useEffect(() => () => window.clearTimeout(sparkTimerRef.current), []);

  return (
    <div
      className="brain-visual"
      role="group"
      aria-label="Illustrated three-dimensional brain and AI capabilities"
    >
      <div className="brain-aura" aria-hidden="true" />
      <canvas className="brain-model" ref={canvasRef} aria-hidden="true" />
      {activeSpark && (
        <svg
          key={activeSpark.key}
          className="brain-spark-layer"
          viewBox={activeSpark.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={activeSpark.path}
            pathLength="1"
            className="brain-spark-trail"
          />
          {activeSpark.reducedMotion ? (
            <circle
              cx={activeSpark.endX}
              cy={activeSpark.endY}
              r="3.5"
              className="brain-spark-core"
            />
          ) : (
            <circle r="3.5" className="brain-spark-core">
              <animateMotion
                path={activeSpark.path}
                dur="650ms"
                fill="freeze"
              />
            </circle>
          )}
        </svg>
      )}
      {capabilities.map((capability, index) => (
        <button
          type="button"
          className={`brain-tag ${capability.className}`}
          key={capability.title}
          style={{ "--tag-delay": `${index * -0.65}s` }}
          onPointerEnter={sparkToCapability}
          onFocus={sparkToCapability}
          onClick={sparkToCapability}
          aria-label={`Explore ${capability.title}`}
        >
          <i />
          {capability.title}
        </button>
      ))}
    </div>
  );
}

function BrainVisual() {
  const canvasRef = useRef(null);
  const sparkTimerRef = useRef(0);
  const sparkSequenceRef = useRef(0);
  const [activeSpark, setActiveSpark] = useState(null);
  const capabilities = [
    { title: "LLMs", className: "brain-tag-llm", source: [0.34, 0.37] },
    {
      title: "Agentic AI",
      className: "brain-tag-agents",
      source: [0.68, 0.35],
    },
    {
      title: "AI Architecture",
      className: "brain-tag-architecture",
      source: [0.62, 0.5],
    },
    { title: "RAG Systems", className: "brain-tag-rag", source: [0.68, 0.61] },
    {
      title: "AI Automation",
      className: "brain-tag-automation",
      source: [0.35, 0.61],
    },
    {
      title: "AI Integrations",
      className: "brain-tag-integrations",
      source: [0.28, 0.49],
    },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return undefined;
    let resizeObserver;
    let frame = 0;
    let points = [];
    let width = 0;
    let height = 0;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let brainPath;
    let cerebellumPath;
    let stemPath;

    const createBrainShapes = (scale, centerX, centerY) => {
      brainPath = new Path2D();
      cerebellumPath = new Path2D();
      stemPath = new Path2D();
      const px = (value) => centerX + value * scale;
      const py = (value) => centerY + value * scale;

      brainPath.moveTo(px(-0.88), py(0.1));
      brainPath.bezierCurveTo(
        px(-1.02),
        py(-0.05),
        px(-0.98),
        py(-0.29),
        px(-0.79),
        py(-0.38),
      );
      brainPath.bezierCurveTo(
        px(-0.74),
        py(-0.56),
        px(-0.54),
        py(-0.62),
        px(-0.36),
        py(-0.53),
      );
      brainPath.bezierCurveTo(
        px(-0.22),
        py(-0.66),
        px(0.02),
        py(-0.65),
        px(0.18),
        py(-0.53),
      );
      brainPath.bezierCurveTo(
        px(0.37),
        py(-0.62),
        px(0.58),
        py(-0.52),
        px(0.66),
        py(-0.37),
      );
      brainPath.bezierCurveTo(
        px(0.86),
        py(-0.36),
        px(0.98),
        py(-0.19),
        px(0.91),
        py(-0.02),
      );
      brainPath.bezierCurveTo(
        px(1.01),
        py(0.15),
        px(0.89),
        py(0.32),
        px(0.72),
        py(0.36),
      );
      brainPath.bezierCurveTo(
        px(0.65),
        py(0.5),
        px(0.45),
        py(0.53),
        px(0.28),
        py(0.42),
      );
      brainPath.bezierCurveTo(
        px(0.09),
        py(0.53),
        px(-0.12),
        py(0.5),
        px(-0.28),
        py(0.39),
      );
      brainPath.bezierCurveTo(
        px(-0.45),
        py(0.47),
        px(-0.64),
        py(0.36),
        px(-0.7),
        py(0.24),
      );
      brainPath.bezierCurveTo(
        px(-0.83),
        py(0.28),
        px(-0.94),
        py(0.22),
        px(-0.88),
        py(0.1),
      );
      brainPath.closePath();

      cerebellumPath.moveTo(px(0.44), py(0.35));
      cerebellumPath.bezierCurveTo(
        px(0.56),
        py(0.31),
        px(0.75),
        py(0.35),
        px(0.81),
        py(0.45),
      );
      cerebellumPath.bezierCurveTo(
        px(0.91),
        py(0.49),
        px(0.88),
        py(0.63),
        px(0.76),
        py(0.65),
      );
      cerebellumPath.bezierCurveTo(
        px(0.67),
        py(0.72),
        px(0.49),
        py(0.66),
        px(0.45),
        py(0.58),
      );
      cerebellumPath.bezierCurveTo(
        px(0.36),
        py(0.52),
        px(0.37),
        py(0.41),
        px(0.44),
        py(0.35),
      );
      cerebellumPath.closePath();

      stemPath.moveTo(px(0.27), py(0.35));
      stemPath.bezierCurveTo(
        px(0.35),
        py(0.39),
        px(0.39),
        py(0.48),
        px(0.36),
        py(0.57),
      );
      stemPath.bezierCurveTo(
        px(0.35),
        py(0.66),
        px(0.42),
        py(0.72),
        px(0.39),
        py(0.8),
      );
      stemPath.bezierCurveTo(
        px(0.37),
        py(0.86),
        px(0.25),
        py(0.86),
        px(0.23),
        py(0.79),
      );
      stemPath.bezierCurveTo(
        px(0.22),
        py(0.69),
        px(0.16),
        py(0.63),
        px(0.18),
        py(0.54),
      );
      stemPath.bezierCurveTo(
        px(0.18),
        py(0.45),
        px(0.19),
        py(0.38),
        px(0.27),
        py(0.35),
      );
      stemPath.closePath();
    };

    const createPoints = () => {
      const bounds = canvas.getBoundingClientRect();
      width = bounds.width;
      height = bounds.height;
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      points = [];
      const scale = Math.min(width * 0.4, height * 0.56);
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      createBrainShapes(scale, centerX, centerY);
      const px = (value) => centerX + value * scale;
      const py = (value) => centerY + value * scale;

      let seed = 193;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      const shapes = [
        { path: brainPath, count: 260, hue: "white" },
        { path: cerebellumPath, count: 54, hue: "cyan" },
        { path: stemPath, count: 30, hue: "cyan" },
      ];
      shapes.forEach(({ path, count, hue }) => {
        let attempts = 0;
        let accepted = 0;
        while (accepted < count && attempts < count * 30) {
          attempts += 1;
          const x = width * 0.5 + (random() * 2 - 1) * scale;
          const y = centerY + (random() * 2 - 1) * scale * 0.9;
          if (!context.isPointInPath(path, x, y)) continue;
          const localX = (x - centerX) / scale;
          const localY = (y - centerY) / scale;
          const grooveWave = Math.sin(localX * 14 + localY * 4) * 0.09;
          if (
            path === brainPath &&
            random() < 0.22 &&
            Math.abs(localY - grooveWave) < 0.034
          )
            continue;
          points.push({
            x,
            y,
            radius:
              hue === "cyan" ? 1 + random() * 0.75 : 0.75 + random() * 0.85,
            phase: random() * Math.PI * 2,
            speed: 0.7 + random() * 1.2,
            brightness: 0.42 + random() * 0.52,
            hue,
          });
          accepted += 1;
        }
      });

      const outlineSegments = [
        [-0.88, 0.1, -1.02, -0.05, -0.98, -0.29, -0.79, -0.38],
        [-0.79, -0.38, -0.74, -0.56, -0.54, -0.62, -0.36, -0.53],
        [-0.36, -0.53, -0.22, -0.66, 0.02, -0.65, 0.18, -0.53],
        [0.18, -0.53, 0.37, -0.62, 0.58, -0.52, 0.66, -0.37],
        [0.66, -0.37, 0.86, -0.36, 0.98, -0.19, 0.91, -0.02],
        [0.91, -0.02, 1.01, 0.15, 0.89, 0.32, 0.72, 0.36],
        [0.72, 0.36, 0.65, 0.5, 0.45, 0.53, 0.28, 0.42],
        [0.28, 0.42, 0.09, 0.53, -0.12, 0.5, -0.28, 0.39],
        [-0.28, 0.39, -0.45, 0.47, -0.64, 0.36, -0.7, 0.24],
        [-0.7, 0.24, -0.83, 0.28, -0.94, 0.22, -0.88, 0.1],
      ];
      outlineSegments.forEach(([sx, sy, c1x, c1y, c2x, c2y, ex, ey]) => {
        for (let index = 0; index < 14; index += 1) {
          const t = index / 14;
          const inverse = 1 - t;
          points.push({
            x: px(
              inverse ** 3 * sx +
                3 * inverse ** 2 * t * c1x +
                3 * inverse * t ** 2 * c2x +
                t ** 3 * ex,
            ),
            y: py(
              inverse ** 3 * sy +
                3 * inverse ** 2 * t * c1y +
                3 * inverse * t ** 2 * c2y +
                t ** 3 * ey,
            ),
            radius: 1 + random() * 0.7,
            phase: random() * Math.PI * 2,
            speed: 0.9 + random() * 1.1,
            brightness: 0.66 + random() * 0.32,
            hue: index % 4 === 0 ? "cyan" : "white",
          });
        }
      });

      const grooves = [
        [-0.82, -0.04, -0.77, -0.23, -0.52, -0.24, -0.48, -0.1],
        [-0.6, -0.34, -0.43, -0.45, -0.29, -0.28, -0.38, -0.11],
        [-0.34, -0.43, -0.17, -0.55, -0.03, -0.33, -0.18, -0.18],
        [-0.12, -0.5, 0.02, -0.58, 0.15, -0.38, 0.03, -0.25],
        [0.19, -0.45, 0.36, -0.52, 0.49, -0.33, 0.34, -0.18],
        [0.56, -0.33, 0.75, -0.34, 0.81, -0.15, 0.66, -0.02],
        [-0.43, 0.04, -0.26, -0.1, -0.1, 0.02, -0.23, 0.25],
        [-0.06, -0.12, 0.13, -0.25, 0.28, -0.06, 0.14, 0.12],
        [0.38, -0.1, 0.52, -0.24, 0.66, -0.1, 0.51, 0.1],
        [0.68, 0.1, 0.62, 0.22, 0.48, 0.2, 0.42, 0.33],
      ];
      grooves.forEach(([sx, sy, c1x, c1y, c2x, c2y, ex, ey]) => {
        for (let index = 0; index < 24; index += 1) {
          const t = (index + random() * 0.8) / 24;
          const inverse = 1 - t;
          const x = px(
            inverse ** 3 * sx +
              3 * inverse ** 2 * t * c1x +
              3 * inverse * t ** 2 * c2x +
              t ** 3 * ex,
          );
          const y = py(
            inverse ** 3 * sy +
              3 * inverse ** 2 * t * c1y +
              3 * inverse * t ** 2 * c2y +
              t ** 3 * ey,
          );
          if (!context.isPointInPath(brainPath, x, y)) continue;
          points.push({
            x,
            y,
            radius: 0.65 + random() * 0.5,
            phase: random() * Math.PI * 2,
            speed: 0.8 + random() * 1.4,
            brightness: 0.5 + random() * 0.42,
            hue: "cyan",
          });
        }
      });
    };

    const render = (time = 0) => {
      context.clearRect(0, 0, width, height);
      points.forEach((point) => {
        const pulse =
          (Math.sin(time * 0.0022 * point.speed + point.phase) + 1) / 2;
        const alpha = point.brightness * (0.62 + pulse * 0.38);
        const radius = point.radius * (0.8 + pulse * 0.38);
        context.beginPath();
        context.arc(point.x, point.y, radius, 0, Math.PI * 2);
        context.fillStyle =
          point.hue === "cyan"
            ? `rgba(48, 215, 232, ${alpha})`
            : `rgba(222, 247, 249, ${alpha})`;
        if (pulse > 0.88) {
          context.shadowColor = point.hue === "cyan" ? "#43f4f3" : "#3596e2";
          context.shadowBlur = point.hue === "cyan" ? 11 : 7;
        }
        context.fill();
        context.shadowBlur = 0;
      });
      if (!reducedMotion) frame = window.requestAnimationFrame(render);
    };

    const resize = () => {
      window.cancelAnimationFrame(frame);
      createPoints();
      render();
    };
    resize();
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener("resize", resize);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const sparkToCapability = (event) => {
    const visual = event.currentTarget.closest(".brain-visual");
    const bounds = visual?.getBoundingClientRect();
    if (!visual || !bounds) return;
    const tagBounds = event.currentTarget.getBoundingClientRect();
    const capability = capabilities.find(
      (item) => item.title === event.currentTarget.dataset.capability,
    );
    if (!capability) return;
    const [sourceX, sourceY] = capability.source;
    const startX = bounds.width * sourceX;
    const startY = bounds.height * sourceY;
    const endX = tagBounds.left + tagBounds.width / 2 - bounds.left;
    const endY = tagBounds.top + tagBounds.height / 2 - bounds.top;
    const path = `M ${startX} ${startY} Q ${startX + (endX - startX) * 0.52} ${startY + (endY - startY) * 0.42 - 28} ${endX} ${endY}`;
    sparkSequenceRef.current += 1;
    setActiveSpark({
      path,
      key: sparkSequenceRef.current,
      endX,
      endY,
      viewBox: `0 0 ${bounds.width} ${bounds.height}`,
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
    });
    window.clearTimeout(sparkTimerRef.current);
    sparkTimerRef.current = window.setTimeout(() => setActiveSpark(null), 850);
  };

  useEffect(() => () => window.clearTimeout(sparkTimerRef.current), []);

  return (
    <div
      className="brain-visual"
      role="group"
      aria-label="A brain formed from glowing particles and AI capabilities"
    >
      <canvas className="brain-model" ref={canvasRef} aria-hidden="true" />
      {activeSpark && (
        <svg
          key={activeSpark.key}
          className="brain-spark-layer"
          viewBox={activeSpark.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={activeSpark.path}
            pathLength="1"
            className="brain-spark-trail"
          />
          {activeSpark.reducedMotion ? (
            <circle
              cx={activeSpark.endX}
              cy={activeSpark.endY}
              r="3.5"
              className="brain-spark-core"
            />
          ) : (
            <circle r="3.5" className="brain-spark-core">
              <animateMotion
                path={activeSpark.path}
                dur="650ms"
                fill="freeze"
              />
            </circle>
          )}
        </svg>
      )}
      {capabilities.map((capability, index) => (
        <button
          type="button"
          className={`brain-tag ${capability.className}`}
          key={capability.title}
          data-capability={capability.title}
          style={{ "--tag-delay": `${index * -0.65}s` }}
          onPointerEnter={sparkToCapability}
          onFocus={sparkToCapability}
          onClick={sparkToCapability}
          aria-label={`Explore ${capability.title}`}
        >
          <i />
          {capability.title}
        </button>
      ))}
    </div>
  );
}

function AIOrbitVisual() {
  const capabilities = [
    { title: "LLMs", className: "term-llms" },
    { title: "Agentic AI", className: "term-agents" },
    { title: "AI Architecture", className: "term-architecture" },
    { title: "RAG Systems", className: "term-rag" },
    { title: "AI Automation", className: "term-automation" },
    { title: "AI Integrations", className: "term-integrations" },
  ];

  return (
    <div
      className="ai-orbit-visual"
      role="group"
      aria-label="A softly rotating three-dimensional AI core surrounded by AI capabilities"
    >
      <div className="ai-orbit-glow" aria-hidden="true" />
      <div className="ai-orbit-system" aria-hidden="true">
        <div className="ai-orbit-ring ai-orbit-ring-one">
          <span />
        </div>
        <div className="ai-orbit-ring ai-orbit-ring-two">
          <span />
        </div>
        <div className="ai-orbit-ring ai-orbit-ring-three">
          <span />
        </div>
        <div className="ai-orbit-ring ai-orbit-ring-four">
          <span />
        </div>
        <div className="ai-core">
          <div className="ai-core-ring">
            <span>AI</span>
          </div>
        </div>
      </div>
      {capabilities.map((capability, index) => (
        <span
          key={capability.title}
          className={`ai-orbit-term ${capability.className}`}
          style={{ "--orbit-delay": `${index * -6}s` }}
        >
          <i />
          {capability.title}
        </span>
      ))}
    </div>
  );
}

function PageHero({ eyebrow, title, children }) {
  return (
    <section className="page-hero">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="container page-hero-content">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          {eyebrow}
        </span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}

function SectionHeading({ eyebrow, title, children, centered = false }) {
  return (
    <div className={`section-heading reveal${centered ? " is-centered" : ""}`}>
      <span className="eyebrow">
        <span className="eyebrow-dot" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function TechnologySection() {
  const groups = [
    {
      title: "Frontend",
      technologies: [
        "React",
        "Angular",
        "Vue.js",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
    },
    {
      title: "Backend",
      technologies: ["Node.js", "Python", "Java", "PHP", "Go", ".NET"],
    },
    {
      title: "Artificial intelligence",
      technologies: [
        "TensorFlow",
        "PyTorch",
        "Keras",
        "OpenAI",
        "LLMs",
        "Agentic AI",
        "RAG Systems",
        "Computer Vision",
      ],
    },
    {
      title: "Data science",
      technologies: [
        "Data Analysis",
        "Big Data",
        "Predictive Models",
        "Data Visualization",
        "Business Intelligence",
        "Statistical Analysis",
      ],
    },
    {
      title: "Cloud & DevOps",
      technologies: [
        "AWS",
        "Azure",
        "Google Cloud",
        "Docker",
        "Kubernetes",
        "CI/CD",
      ],
    },
    {
      title: "Databases",
      technologies: ["MongoDB", "PostgreSQL", "MySQL", "Redis", "Firebase"],
    },
  ];

  return (
    <section className="technology-section" id="technologies">
      <div className="container">
        <div className="technology-heading reveal">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Tools behind the work
          </span>
          <h2>
            Technologies we <span>master.</span>
          </h2>
          <p>
            Our team works across modern product, AI, data, and cloud
            technologies—choosing the right tools for the job, not forcing every
            project into the same stack.
          </p>
        </div>
        <div className="technology-grid">
          {groups.map((group, index) => (
            <article
              className="technology-group reveal"
              key={group.title}
              style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
            >
              <h3>{group.title}</h3>
              <div className="technology-pills">
                {group.technologies.map((technology) => (
                  <span key={technology}>{technology}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ item, index }) {
  return (
    <article
      className="service-card brand-spark-card reveal"
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
    >
      <CardSparkBorder />
      <div className="service-card-top">
        <span className="service-icon">
          <Icon name={item.icon} size={24} />
        </span>
        <span className="service-number">{item.number}</span>
      </div>
      <h3>{item.title}</h3>
      <p>{item.text}</p>
      <div className="tag-list">
        {item.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
      <a
        className="service-work-link"
        href={`portfolio.html?service=${item.id}`}
        aria-label={`View ${item.title} projects`}
      >
        View related work <Icon name="arrow" size={16} />
      </a>
    </article>
  );
}

function ProcessSteps() {
  const scrollRef = useRef(null);
  const railRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const steps = [
    [
      "01",
      "Understand",
      "We get clear on the problem, users, and constraints before recommending a solution.",
    ],
    [
      "02",
      "Shape",
      "We map the experience and technical plan, then agree on scope, timing, and milestones.",
    ],
    [
      "03",
      "Build",
      "We work in visible iterations, sharing progress and getting feedback throughout.",
    ],
    [
      "04",
      "Launch",
      "We test, ship, document, and stay close as your product meets real users.",
    ],
  ];

  useEffect(() => {
    const scrollTrack = scrollRef.current;
    if (!scrollTrack) return undefined;
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rail = railRef.current;
      if (!rail) return;
      let progress;

      if (window.matchMedia("(max-width: 700px)").matches) {
        const grid = scrollTrack.querySelector(".process-grid");
        const nodes = scrollTrack.querySelectorAll(".process-number");
        if (!grid || nodes.length < 2) return;

        const gridBounds = grid.getBoundingClientRect();
        const firstBounds = nodes[0].getBoundingClientRect();
        const lastBounds = nodes[nodes.length - 1].getBoundingClientRect();
        const firstCenter = firstBounds.top + firstBounds.height / 2;
        const lastCenter = lastBounds.top + lastBounds.height / 2;

        rail.style.top = `${firstCenter - gridBounds.top}px`;
        rail.style.bottom = `${gridBounds.bottom - lastCenter}px`;
        progress = Math.max(
          0,
          Math.min(
            1,
            (window.innerHeight * 0.52 - firstCenter) /
              Math.max(1, lastCenter - firstCenter),
          ),
        );
      } else {
        const bounds = scrollTrack.getBoundingClientRect();
        const sticky = scrollTrack.querySelector(".process-sticky");
        if (!sticky) return;

        const stickyTop =
          Number.parseFloat(window.getComputedStyle(sticky).top) || 0;
        const scrollDistance = Math.max(
          1,
          scrollTrack.offsetHeight - sticky.offsetHeight,
        );
        progress = Math.max(
          0,
          Math.min(1, (stickyTop - bounds.top) / scrollDistance),
        );
      }

      const progressValue = progress.toFixed(4);
      scrollTrack.style.setProperty("--process-progress", progressValue);
      rail.style.setProperty("--process-progress", progressValue);
      const nextIndex = Math.min(
        steps.length - 1,
        Math.round(progress * (steps.length - 1)),
      );
      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const updateResponsiveMode = () => {
      updateProgress();
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateResponsiveMode);
    updateResponsiveMode();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateResponsiveMode);
      window.cancelAnimationFrame(frame);
    };
  }, [steps.length]);

  return (
    <div className="process-scroll" ref={scrollRef}>
      <div className="process-sticky">
        <SectionHeading
          eyebrow="A clear process"
          title="Move from idea to launch with confidence."
          centered
        />
        <div className="process-grid">
          <div className="process-rail" ref={railRef} aria-hidden="true">
            <span className="process-rail-fill">
              <span className="process-rail-indicator" />
            </span>
          </div>
          {steps.map(([number, title, text], index) => (
            <article
              className={`process-step${index % 2 === 0 ? " is-left" : " is-right"}${activeIndex === index ? " is-current" : ""}${activeIndex > index ? " is-complete" : ""}`}
              style={{ gridRow: index + 1 }}
              key={number}
              aria-current={activeIndex === index ? "step" : undefined}
            >
              <span className="process-number">{number}</span>
              <div className="process-step-copy">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

function CTA({
  title = "Initiate partnership.",
  text = "Tell us what you are trying to solve. We will help you find a clear path from idea to something real.",
  button = "Secure engagement",
}) {
  const [status, setStatus] = useState({ state: "idle", message: "" });
  const [briefLength, setBriefLength] = useState(0);

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    setStatus({ state: "sending", message: "" });
    try {
      await submitForm("inquiries", {
        source: "engagement",
        name: values.get("name"),
        email: values.get("email"),
        project_type: values.get("projectType"),
        project_vision: values.get("projectVision"),
      });
      form.reset();
      setBriefLength(0);
      setStatus({
        state: "success",
        message:
          "Thanks, your enquiry has been sent. We will be in touch soon.",
      });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  };

  return (
    <section className="cta-section">
      <div className="container">
        <div className="engagement-layout reveal">
          <div className="engagement-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Engagement
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
            <div className="engagement-details">
              <a href="mailto:abdullahamirr9@gmail.com">
                <span className="engagement-icon">
                  <Icon name="mail" size={20} />
                </span>
                <span>
                  <small>Email us</small>
                  <strong>abdullahamirr9@gmail.com</strong>
                </span>
              </a>
              <a href="tel:+923045175871">
                <span className="engagement-icon">
                  <Icon name="phone" size={20} />
                </span>
                <span>
                  <small>Call us</small>
                  <strong>+92 3045175871</strong>
                </span>
              </a>
              <div>
                <span className="engagement-icon">
                  <Icon name="pin" size={20} />
                </span>
                <span>
                  <small>Location</small>
                  <strong>Lahore, Punjab, Pakistan</strong>
                </span>
              </div>
            </div>
          </div>
          <form className="engagement-form" onSubmit={onSubmit}>
            <div className="engagement-field-row">
              <div className="engagement-field">
                <label htmlFor="engagement-name">Your name</label>
                <input
                  id="engagement-name"
                  name="name"
                  autoComplete="name"
                  required
                  maxLength={120}
                  placeholder="e.g. Alex Morgan"
                />
              </div>
              <div className="engagement-field">
                <label htmlFor="engagement-email">Business email</label>
                <input
                  id="engagement-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  placeholder="you@company.com"
                />
              </div>
            </div>
            <div className="engagement-field">
              <label htmlFor="engagement-project-type">
                What do you need help with?
              </label>
              <select
                id="engagement-project-type"
                name="projectType"
                className="engagement-select"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Select a service
                </option>
                <option value="SaaS">SaaS</option>
                <option value="Web Development">Web development</option>
                <option value="Custom Software">Custom software</option>
                <option value="AI Automation">AI automation</option>
                <option value="Agentic AI">Agentic AI</option>
                <option value="Mobile Applications">Mobile applications</option>
                <option value="API & Integrations">
                  API &amp; integrations
                </option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="engagement-field engagement-brief-field">
              <label htmlFor="engagement-brief">
                Project Idea &amp; vision <span>({briefLength}/1500)</span>
              </label>
              <textarea
                id="engagement-brief"
                name="projectVision"
                maxLength={1500}
                onChange={(event) => setBriefLength(event.target.value.length)}
                required
                placeholder="Share a little about the problem, product, or idea..."
              />
            </div>
            <button
              type="submit"
              className="engagement-submit"
              disabled={status.state === "sending"}
            >
              {status.state === "sending" ? (
                "Sending..."
              ) : (
                <>
                  {button}
                  <Icon name="arrow" size={18} />
                </>
              )}
            </button>
            {status.message && (
              <p
                className={`engagement-notice${status.state === "error" ? " is-error" : ""}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function ReviewsSection() {
  const trackRef = useRef(null);
  const [activeReview, setActiveReview] = useState(0);
  const [maxReviewIndex, setMaxReviewIndex] = useState(7);

  const updateActiveReview = () => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const gap =
      Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxIndex = Math.max(
      0,
      Math.round((track.scrollWidth - track.clientWidth) / step),
    );
    setMaxReviewIndex(maxIndex);
    setActiveReview(
      Math.min(maxIndex, Math.max(0, Math.round(track.scrollLeft / step))),
    );
  };

  const moveReview = (direction) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const gap =
      Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;
    updateActiveReview();
    if ("ResizeObserver" in window) {
      const observer = new ResizeObserver(updateActiveReview);
      observer.observe(track);
      return () => observer.disconnect();
    }
    window.addEventListener("resize", updateActiveReview);
    return () => window.removeEventListener("resize", updateActiveReview);
  }, []);

  const goToReview = (index) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const gap =
      Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollTo({
      left: index * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section
      className="reviews-section section section-darker"
      aria-labelledby="reviews-title"
    >
      <div className="container">
        <div className="reviews-heading reveal">
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Client reviews
            </span>
            <h2 id="reviews-title">What our clients say.</h2>
            <p>
              Thoughtful partnerships, secure engineering, and genuine
              collaboration behind every build.
            </p>
          </div>
          <div className="reviews-controls">
            <span className="reviews-count">
              {String(activeReview + 1).padStart(2, "0")} <i>/</i>{" "}
              {String(clientReviews.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => moveReview(-1)}
              disabled={activeReview === 0}
              aria-label="Previous review"
            >
              <Icon name="arrow" size={18} />
            </button>
            <button
              type="button"
              onClick={() => moveReview(1)}
              disabled={activeReview >= maxReviewIndex}
              aria-label="Next review"
            >
              <Icon name="arrow" size={18} />
            </button>
          </div>
        </div>
        <div
          className="reviews-track"
          ref={trackRef}
          onScroll={updateActiveReview}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
        >
          {clientReviews.map((review) => (
            <article className="review-card brand-spark-card" key={review.id}>
              <CardSparkBorder />
              <div className="review-card-top">
                <span className="review-tag">{review.project}</span>
                <span className="review-category-pill">{review.category}</span>
              </div>
              <div className="review-quote-mark" aria-hidden="true">
                “
              </div>
              <blockquote>{review.text}</blockquote>
              <div className="review-author">
                <span className="review-avatar" aria-hidden="true">
                  {review.initials}
                </span>
                <span>
                  <strong>{review.name}</strong>
                  <small>{review.role}</small>
                </span>
              </div>
            </article>
          ))}
        </div>
        <div className="reviews-pagination" aria-label="Choose a review">
          {clientReviews.slice(0, maxReviewIndex + 1).map((review, index) => (
            <button
              type="button"
              key={review.id}
              className={index === activeReview ? "is-active" : ""}
              onClick={() => goToReview(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={index === activeReview ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a href="index.html" aria-label="FutureSort Technologies home">
              <img
                className="brand-image"
                src={logoFull}
                alt=""
                width="1017"
                height="245"
              />
            </a>
            <p>
              The global leader in FinTech software solutions, Web app
              development, and enterprise AI automation.
            </p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="about.html">Team</a>
            <a href="portfolio.html">Our work</a>
            <a href="learning.html">Learning</a>
            <a href="contact.html">Contact</a>
          </div>
          <div className="footer-column">
            <h2>What we build</h2>
            <a href="services.html#ai">AI &amp; automation</a>
            <a href="services.html#products">SaaS products</a>
            <a href="services.html#engineering">Web &amp; app engineering</a>
          </div>
          <div className="footer-column">
            <h2>Get in touch</h2>
            <a href="mailto:abdullahamirr9@gmail.com">abdullahamirr9@gmail.com</a>
            <a href="tel:+923045175871">+92 304 5175871</a>
            <span>Lahore, Pakistan</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} FutureSort Technologies. All rights
            reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}

function HomePage() {
  const capabilities = [
    [
      "AI-native thinking",
      "Automation and intelligent features designed into your product from the start.",
    ],
    [
      "One accountable team",
      "Direct collaboration with the people designing and building your software.",
    ],
    [
      "Ready for what is next",
      "A clean, considered foundation that can grow with your customers and your business.",
    ],
  ];

  return (
    <>
      <section className="hero">
        <NetworkCanvas />
        <div className="hero-aurora" aria-hidden="true" />
        <div className="container hero-layout">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              AI-first product engineering
            </span>
            <h1>
              We build with AI at the <span>core.</span>
            </h1>
            <p className="hero-lede">
              From LLMs and RAG to agentic systems and AI architecture, our
              whole team thinks deeply about how intelligence should work inside
              real products.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="contact.html">
                Build with us <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost" href="services.html">
                Explore what we do
              </a>
            </div>
          </div>
          <div className="hero-art reveal">
            <AIOrbitVisual />
          </div>
        </div>
      </section>

      <TechnologySection />

      <section id="capabilities" className="section section-capabilities">
        <div className="container">
          <SectionHeading
            eyebrow="What we build"
            title="From a messy process to a product people love."
          >
            We bring product thinking, modern engineering, and practical AI
            together to make the hard things feel simple.
          </SectionHeading>
          <div className="service-grid">
            {serviceItems.map((item, index) => (
              <ServiceCard item={item} index={index} key={item.number} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-darker">
        <div className="container">
          <div className="split-intro reveal">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" />A better way to build
              </span>
              <h2>Good work starts with the right question.</h2>
            </div>
            <p>
              We make thoughtful decisions at every step: solve the real
              problem, choose the right tools, and ship software your team can
              confidently own.
            </p>
          </div>
          <div className="capability-row">
            {capabilities.map(([title, text], index) => (
              <article
                className="capability-item reveal"
                style={{ "--reveal-delay": `${index * 100}ms` }}
                key={title}
              >
                <span className="capability-index">0{index + 1}</span>
                <Icon name={["spark", "orbit", "layers"][index]} size={23} />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section process-section">
        <div className="container">
          <ProcessSteps />
        </div>
      </section>
      <ReviewsSection />
      <CTA />
    </>
  );
}

const learningTracks = [
  {
    id: "technical",
    number: "01",
    title: "Technical batch",
    subtitle: "Build and ship AI-powered software.",
    topics: [
      "Python foundations for AI engineering",
      "Working with LLM APIs and structured outputs",
      "RAG, embeddings, and practical retrieval",
      "Agent workflows, tool use, and evaluation",
      "Deploying and monitoring AI applications",
    ],
  },
  {
    id: "non-technical",
    number: "02",
    title: "Non-technical batch",
    subtitle: "Design useful AI workflows and products.",
    topics: [
      "AI foundations and practical capabilities",
      "Prompt design and evaluating AI responses",
      "Mapping business workflows for automation",
      "Choosing AI tools and planning integrations",
      "Responsible AI, privacy, and human oversight",
    ],
  },
];

function LearningPage() {
  const [studentStatus, setStudentStatus] = useState("");
  const [courseTrack, setCourseTrack] = useState("");
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const submitRegistration = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const values = new FormData(form);
    const isStudent = values.get("studentStatus") === "student";
    setStatus({ state: "sending", message: "" });
    try {
      await submitForm("demo-requests", {
        first_name: values.get("firstName"),
        last_name: values.get("lastName"),
        email: values.get("email"),
        phone_number: values.get("phone"),
        is_student: isStudent,
        demo_batch: values.get("courseTrack"),
        university: isStudent ? values.get("university") : null,
        degree_program: isStudent ? values.get("degree") : null,
      });
      form.reset();
      setStudentStatus("");
      setCourseTrack("");
      setStatus({
        state: "success",
        message: "Your free demo request has been received.",
      });
    } catch (error) {
      setStatus({ state: "error", message: error.message });
    }
  };

  const chooseTrack = (trackId) => {
    setCourseTrack(trackId);
    document.getElementById("demo-registration")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="learning-page">
      <section className="learning-hero">
        <NetworkCanvas />
        <div
          className="learning-hero-glow learning-hero-glow-one"
          aria-hidden="true"
        />
        <div
          className="learning-hero-glow learning-hero-glow-two"
          aria-hidden="true"
        />
        <div className="container learning-hero-content">
          <div className="learning-open-badge reveal">
            <span />
            Registrations are open
          </div>
          <h1 className="reveal">
            Learn to build with <span>AI.</span>
          </h1>
          <p className="learning-hero-lede reveal">
            A focused, two-month AI engineering course with separate technical
            and non-technical learning paths. Start with a free demo class for
            the batch that fits you.
          </p>
          <div className="learning-hero-actions reveal">
            <a className="btn btn-primary" href="#demo-registration">
              Register for a free demo <Icon name="arrow" size={18} />
            </a>
            <span className="learning-duration">
              <Icon name="clock" size={17} /> 2-month course
            </span>
          </div>
          <div className="learning-hero-orbit" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>

      <section
        className="section learning-tracks-section"
        aria-labelledby="learning-tracks-title"
      >
        <div className="container">
          <SectionHeading
            eyebrow="Two learning paths"
            title="Choose the way you want to work with AI."
            centered
          >
            Each batch has its own course content and its own free demo session.
          </SectionHeading>
          <div className="learning-track-grid">
            {learningTracks.map((track) => (
              <article
                className={`learning-track-card brand-spark-card reveal learning-track-${track.id}`}
                key={track.id}
              >
                <CardSparkBorder />
                <div className="learning-track-topline">
                  <span>{track.number}</span>
                  <span className="learning-track-pill">2 months</span>
                </div>
                <h3>{track.title}</h3>
                <p>{track.subtitle}</p>
                <ul>
                  {track.topics.map((topic) => (
                    <li key={topic}>
                      <Icon name="check" size={16} />
                      {topic}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className="learning-track-link"
                  onClick={() => chooseTrack(track.id)}
                >
                  Register for free demo <Icon name="arrow" size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section learning-registration-section"
        id="demo-registration"
      >
        <div className="container learning-registration-layout">
          <div className="learning-registration-copy reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Your first step
            </span>
            <h2>
              Try a demo class. <span>Free.</span>
            </h2>
            <p>
              Get a feel for the learning experience, meet the course team, and
              see which path is right for you. Choose either the technical or
              non-technical demo below.
            </p>
            <div className="learning-registration-points">
              <div>
                <span>01</span>
                <p>Pick your learning path</p>
              </div>
              <div>
                <span>02</span>
                <p>Join its dedicated demo session</p>
              </div>
              <div>
                <span>03</span>
                <p>Explore practical AI engineering</p>
              </div>
            </div>
          </div>

          <form className="learning-form reveal" onSubmit={submitRegistration}>
            <div className="learning-form-heading">
              <span className="learning-form-kicker">
                FREE DEMO REGISTRATION
              </span>
              <h3>Save your place</h3>
            </div>
            <div className="learning-form-row">
              <div className="learning-field">
                <label htmlFor="learning-first-name">
                  First name <span>*</span>
                </label>
                <input
                  id="learning-first-name"
                  name="firstName"
                  autoComplete="given-name"
                  required
                  placeholder="First name"
                />
              </div>
              <div className="learning-field">
                <label htmlFor="learning-last-name">
                  Last name <span>*</span>
                </label>
                <input
                  id="learning-last-name"
                  name="lastName"
                  autoComplete="family-name"
                  required
                  placeholder="Last name"
                />
              </div>
            </div>
            <div className="learning-field">
              <label htmlFor="learning-email">
                Email address <span>*</span>
              </label>
              <input
                id="learning-email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="you@example.com"
              />
            </div>
            <div className="learning-field">
              <label htmlFor="learning-phone">
                Phone number <span>*</span>
              </label>
              <input
                id="learning-phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                required
                placeholder="+92 ..."
              />
            </div>
            <div className="learning-field">
              <label htmlFor="learning-status">
                Are you currently a student? <span>*</span>
              </label>
              <select
                id="learning-status"
                name="studentStatus"
                value={studentStatus}
                onChange={(event) => setStudentStatus(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select one
                </option>
                <option value="student">Yes, I am a student</option>
                <option value="other">No</option>
              </select>
            </div>
            <div className="learning-field">
              <label htmlFor="learning-track">
                Choose a demo batch <span>*</span>
              </label>
              <select
                id="learning-track"
                name="courseTrack"
                value={courseTrack}
                onChange={(event) => setCourseTrack(event.target.value)}
                required
              >
                <option value="" disabled>
                  Select a free demo
                </option>
                <option value="technical">Technical batch demo · Free</option>
                <option value="non-technical">
                  Non-technical batch demo · Free
                </option>
              </select>
            </div>
            {studentStatus === "student" && (
              <div className="learning-form-row learning-student-fields">
                <div className="learning-field">
                  <label htmlFor="learning-university">
                    University <span>*</span>
                  </label>
                  <input
                    id="learning-university"
                    name="university"
                    required
                    placeholder="Your university"
                  />
                </div>
                <div className="learning-field">
                  <label htmlFor="learning-degree">
                    Degree / program <span>*</span>
                  </label>
                  <input
                    id="learning-degree"
                    name="degree"
                    required
                    placeholder="e.g. BS Computer Science"
                  />
                </div>
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary learning-submit"
              disabled={status.state === "sending"}
            >
              {status.state === "sending" ? (
                "Submitting..."
              ) : (
                <>
                  Register for the free demo <Icon name="arrow" size={17} />
                </>
              )}
            </button>
            {status.message && (
              <p
                className={`learning-form-status${status.state === "error" ? " is-error" : ""}`}
                role="status"
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="learning-bottom-cta">
        <div className="container learning-bottom-inner reveal">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Registrations open
          </span>
          <h2>Start with a free demo.</h2>
          <a className="btn btn-primary" href="#demo-registration">
            Choose your batch <Icon name="arrow" size={17} />
          </a>
        </div>
      </section>
    </div>
  );
}

function ServicesTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timelineRef = useRef(null);
  const railRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return undefined;
    let frame = 0;

    const updateProgress = () => {
      frame = 0;
      const rail = railRef.current;
      const steps = timeline.querySelectorAll(".service-timeline-step");
      if (!rail || !steps.length) return;
      const centers = Array.from(steps, (step) => {
        const stepBounds = step
          .querySelector(".service-timeline-number")
          .getBoundingClientRect();
        return stepBounds.top + stepBounds.height / 2;
      });
      const gridBounds = timeline
        .querySelector(".service-timeline-list")
        .getBoundingClientRect();
      rail.style.top = `${centers[0] - gridBounds.top}px`;
      rail.style.bottom = `${gridBounds.bottom - centers[centers.length - 1]}px`;
      const progress = Math.max(
        0,
        Math.min(
          1,
          (window.innerHeight * 0.52 - centers[0]) /
            Math.max(1, centers[centers.length - 1] - centers[0]),
        ),
      );
      timeline.style.setProperty("--service-progress", progress.toFixed(4));
      timeline.style.setProperty(
        "--service-marker-position",
        `${progress * 100}%`,
      );
      const nextIndex = centers.reduce(
        (closest, center, index) =>
          Math.abs(center - window.innerHeight * 0.52) <
          Math.abs(centers[closest] - window.innerHeight * 0.52)
            ? index
            : closest,
        0,
      );
      setActiveIndex((current) =>
        current === nextIndex ? current : nextIndex,
      );
    };

    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="service-timeline" ref={timelineRef}>
      <div className="service-timeline-list">
        <div className="service-timeline-rail" ref={railRef} aria-hidden="true">
          <span />
        </div>
        {serviceItems.map((item, index) => (
          <article
            id={item.id}
            className={`service-timeline-step${index % 2 === 0 ? " is-left" : " is-right"}${activeIndex === index ? " is-current" : ""}${activeIndex > index ? " is-complete" : ""}`}
            key={item.id}
          >
            <div className="service-timeline-copy">
              <span className="service-timeline-kicker">
                Service {item.number}
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="service-timeline-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <a href="portfolio.html" className="service-timeline-link">
                Explore related work <Icon name="arrow" size={16} />
              </a>
            </div>
            <span className="service-timeline-number">{item.number}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our expertise"
        title={
          <>
            Engineering that
            <br />
            <span>moves you forward.</span>
          </>
        }
      >
        From AI automation to full product engineering, we bring the right
        people, architecture, and execution to each challenge.
      </PageHero>
      <section className="section services-expertise">
        <div className="container">
          <SectionHeading
            eyebrow="What we build"
            title="Six disciplines. One accountable team."
          >
            Choose the capability that fits your next move. Each service is
            designed to work on its own or connect into a complete product.
          </SectionHeading>
          <ServicesTimeline />
        </div>
      </section>
      <section className="section section-darker services-work">
        <div className="container">
          <div className="services-work-heading">
            <SectionHeading
              eyebrow="Work across our services"
              title="Examples of what we can build together."
            >
              Every project is different. Explore a few representative concepts
              across AI, apps, and software.
            </SectionHeading>
            <a className="text-link" href="portfolio.html">
              Explore the portfolio <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="project-grid services-project-grid">
            {projects
              .filter((project) => project.featured)
              .slice(0, 3)
              .map((project, index) => (
                <ProjectCard project={project} index={index} key={project.id} />
              ))}
          </div>
        </div>
      </section>
      <CTA
        title="Ready to leverage our expertise?"
        text="Tell us what you are building. We will help you choose the right next step."
        button="Get in touch"
      />
    </>
  );
}

const teamValues = [
  {
    icon: "spark",
    title: "Move with intent",
    text: "Make clear decisions, focus on what matters, and keep useful work moving.",
  },
  {
    icon: "check",
    title: "Secure by default",
    text: "Treat privacy, safety, and reliability as foundations—not finishing touches.",
  },
  {
    icon: "orbit",
    title: "Think beyond today",
    text: "Build with a wider perspective and create products ready to grow across markets.",
  },
  {
    icon: "layers",
    title: "Work as partners",
    text: "Share context, stay accountable, and build alongside the people who use the result.",
  },
];

function TeamMemberCard({ member, index }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <article
      className={`team-member-card reveal${isActive ? " is-active" : ""}`}
      style={{ "--reveal-delay": `${index * 80}ms` }}
      onClick={() => setIsActive((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setIsActive((prev) => !prev);
        }
      }}
      tabIndex={0}
      role="region"
      aria-label={`${member.name}, ${member.position}`}
    >
      <div className="team-member-photo-frame brand-spark-card">
        <CardSparkBorder />
        <img
          src={member.image}
          alt={
            member.alt ||
            `Portrait of ${member.name}, ${member.position} at FutureSort`
          }
          width={member.width || 800}
          height={member.height || 1000}
          loading="lazy"
          decoding="async"
        />
        <div className="team-member-overlay" aria-hidden={!isActive}>
          <p className="team-member-overlay-text">{member.description}</p>
        </div>
      </div>
      <div className="team-member-caption">
        <div className="team-member-header">
          <h3 className="team-member-name">{member.name}</h3>
          {member.linkedin ? (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="team-member-social"
              aria-label={`${member.name} on LinkedIn`}
              title={`${member.name} on LinkedIn`}
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="linkedin" size={15} />
            </a>
          ) : null}
        </div>
        <span className="team-member-position">{member.position}</span>
      </div>
    </article>
  );
}

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        title={
          <>
            The <span>masterminds.</span>
          </>
        }
      >
        Meet the people behind our engineering work: a focused team building
        useful software, practical AI, and meaningful partnerships.
      </PageHero>
      <section
        className="team-section section-tight"
        aria-labelledby="team-heading"
      >
        <div className="container">
          <div className="team-section-heading reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              The team
            </span>
            <h2 id="team-heading">The minds behind FutureSort</h2>
            <p className="team-section-sub">
              A focused engineering team combining research rigor, full-stack
              craft, and practical AI delivery.
            </p>
          </div>
          <div className="team-member-grid">
            {teamMembers.map((member, index) => (
              <TeamMemberCard
                member={member}
                index={index}
                key={member.id || member.name}
              />
            ))}
          </div>
        </div>
      </section>
      <section className="team-values-section section">
        <div className="container">
          <div className="team-values-heading reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Our core values
            </span>
            <h2>Principles that guide every build.</h2>
            <p>
              The standards behind our decisions, our collaboration, and the
              work we put into the world.
            </p>
          </div>
          <div className="team-values-grid">
            {teamValues.map((value, index) => (
              <article
                className="team-value-card brand-spark-card reveal"
                style={{ "--reveal-delay": `${index * 75}ms` }}
                key={value.title}
              >
                <CardSparkBorder />
                <span className="team-value-icon">
                  <Icon name={value.icon} size={19} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA
        title="Let's build something meaningful."
        text="Meet the team behind your next product, platform, or intelligent workflow."
        button="Talk to our team"
      />
    </>
  );
}

function ProjectCard({ project, index }) {
  const service = serviceItems.find((item) => item.id === project.serviceId);
  const images = [project.coverImage, ...(project.screenshots || [])]
    .map((image) => (typeof image === "string" ? { src: image } : image))
    .filter((image) => image?.src)
    .filter(
      (image, imageIndex, allImages) =>
        allImages.findIndex((candidate) => candidate.src === image.src) ===
        imageIndex,
    );
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.body.classList.add("lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightboxOpen]);

  return (
    <>
      <article
        className="project-card brand-spark-card reveal"
        style={{ "--reveal-delay": `${(index % 2) * 100}ms` }}
      >
        <CardSparkBorder />
        <div
          className={`project-visual visual-${(index % 6) + 1}${images.length ? " has-screenshot" : ""}`}
        >
          {images.length ? (
            <button
              className="project-image-button"
              type="button"
              onClick={() => setLightboxOpen(true)}
              aria-label={`View screenshot of ${project.title}`}
            >
              <img
                src={images[activeImage]?.src}
                alt={images[activeImage]?.alt || `${project.title} screenshot`}
                loading="lazy"
                decoding="async"
              />
              <span className="image-zoom-hint">
                View screenshot <span aria-hidden="true">↗</span>
              </span>
            </button>
          ) : (
            <div className="project-empty-visual">
              <Icon name={service?.icon || "layers"} size={23} />
              <span>Project image coming soon</span>
            </div>
          )}
          {images.length > 1 && (
            <div
              className="project-thumbnails"
              aria-label={`${project.title} screenshots`}
            >
              {images.map((image, imageIndex) => (
                <button
                  type="button"
                  className={activeImage === imageIndex ? "is-selected" : ""}
                  key={image.src}
                  onClick={() => setActiveImage(imageIndex)}
                  aria-label={`Show screenshot ${imageIndex + 1} of ${images.length}`}
                  aria-pressed={activeImage === imageIndex}
                >
                  <img src={image.src} alt="" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="project-copy">
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description || project.tagline}</p>
          <div className="project-card-footer">
            <div className="project-meta">
              <span>{service?.title || "Software development"}</span>
              {project.clientName && <span>{project.clientName}</span>}
              {project.year && <span>{project.year}</span>}
            </div>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit live project <Icon name="arrow" size={15} />
              </a>
            )}
          </div>
        </div>
      </article>
      {lightboxOpen && images[activeImage] && (
        <div
          className="project-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            className="lightbox-close"
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Close screenshot"
          >
            <Icon name="close" size={21} />
          </button>
          <img
            src={images[activeImage].src}
            alt={images[activeImage].alt || `${project.title} screenshot`}
          />
          <p>{images[activeImage].alt || project.title}</p>
        </div>
      )}
    </>
  );
}

function PortfolioPage() {
  const portfolioPathMatch = window.location.pathname.match(
    /^\/portfolio\/([^/]+)\/?$/,
  );
  const projectSlug = portfolioPathMatch
    ? decodeURIComponent(portfolioPathMatch[1])
    : new URLSearchParams(window.location.search).get("project");
  const selectedProject = projects.find(
    (project) => project.slug === projectSlug,
  );
  if (projectSlug) {
    return selectedProject ? (
      <ProjectDetail project={selectedProject} />
    ) : (
      <ProjectNotFound />
    );
  }
  return <ProjectGridPage />;
}

function projectHref(project) {
  return `/portfolio/${encodeURIComponent(project.slug)}/`;
}

function isPlaceholderValue(value) {
  return (
    typeof value === "string" &&
    (/^\s*\[[^\]]+\]\s*$/.test(value) || /\[ADD/i.test(value))
  );
}

function getProjectStack(project) {
  if (Array.isArray(project.stack)) return project.stack;
  return Object.values(project.stack).flat();
}

function getProjectStackGroups(project) {
  if (project.stackGroups) return project.stackGroups;
  const groupLabels = { ai: "AI models" };
  return Object.fromEntries(
    Object.entries(project.stack).map(([group, items]) => [
      groupLabels[group] || `${group[0].toUpperCase()}${group.slice(1)}`,
      items,
    ]),
  );
}

function ProjectGridPage() {
  const categories = [...new Set(projects.map((project) => project.category))];
  const orderedProjects = [...projects].sort(
    (a, b) => Number(b.featured) - Number(a.featured),
  );
  const [activeCategory, setActiveCategory] = useState(() => {
    const requestedCategory = new URLSearchParams(window.location.search).get(
      "category",
    );
    const requestedService = new URLSearchParams(window.location.search).get(
      "service",
    );
    const legacyCategory = projects.find(
      (project) => project.serviceId === requestedService,
    )?.category;
    const category = requestedCategory || legacyCategory;
    return categories.includes(category) ? category : "all";
  });
  const [searchText, setSearchText] = useState("");
  const filteredProjects = orderedProjects.filter((project) => {
    const matchesCategory =
      activeCategory === "all" || project.category === activeCategory;
    const search = searchText.trim().toLowerCase();
    const matchesSearch =
      !search ||
      [
        project.title,
        project.tagline,
        project.category,
        project.industry,
        ...getProjectStack(project),
      ].some((value) => value.toLowerCase().includes(search));
    return matchesCategory && matchesSearch;
  });

  const selectCategory = (category) => {
    setActiveCategory(category);
    const url = new URL(window.location.href);
    url.searchParams.delete("service");
    if (category === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", category);
    window.history.replaceState(
      {},
      "",
      `${url.pathname}${url.search}${url.hash}`,
    );
  };

  return (
    <>
      <section className="page-hero portfolio-hero">
        <div className="ambient ambient-one" aria-hidden="true" />
        <div className="ambient ambient-two" aria-hidden="true" />
        <div className="container page-hero-content portfolio-hero-content">
          <span className="eyebrow">
            <span className="eyebrow-dot" />
            Selected work
          </span>
          <h1>
            Thoughtful software.
            <br />
            <span>Measurable impact.</span>
          </h1>
          <p>
            Explore the products, platforms, and intelligent workflows behind
            each case study.
          </p>
        </div>
      </section>
      <section className="section section-tight portfolio-listing">
        <div className="container">
          <ProjectFilters
            categories={categories}
            projects={projects}
            activeCategory={activeCategory}
            onSelectCategory={selectCategory}
            searchText={searchText}
            onSearchTextChange={setSearchText}
          />
          <p className="portfolio-result-count" aria-live="polite">
            Showing {filteredProjects.length}{" "}
            {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
          {filteredProjects.length ? (
            <ProjectGrid projects={filteredProjects} />
          ) : (
            <div className="portfolio-empty" role="status">
              <span className="service-icon">
                <Icon name="layers" size={23} />
              </span>
              <h2>No matching projects yet</h2>
              <p>
                Try a different search or category, or get in touch to ask about
                related work.
              </p>
              <button
                type="button"
                className="text-link"
                onClick={() => {
                  setSearchText("");
                  selectCategory("all");
                }}
              >
                Show all projects <Icon name="arrow" size={16} />
              </button>
            </div>
          )}
        </div>
      </section>
      <CTA
        title="Your project could be next."
        text="Tell us what you are looking to build and we will talk through a practical first step."
        button="Start a project"
      />
    </>
  );
}

function ProjectFilters({
  categories,
  projects: allProjects,
  activeCategory,
  onSelectCategory,
  searchText,
  onSearchTextChange,
}) {
  const filters = [
    { label: "All projects", value: "all", count: allProjects.length },
    ...categories.map((category) => ({
      label: category,
      value: category,
      count: allProjects.filter((project) => project.category === category)
        .length,
    })),
  ];

  return (
    <div className="portfolio-controls">
      <div
        className="portfolio-filters"
        aria-label="Filter projects by category"
      >
        {filters.map((filter) => (
          <button
            type="button"
            className={activeCategory === filter.value ? "is-active" : ""}
            key={filter.value}
            onClick={() => onSelectCategory(filter.value)}
            aria-pressed={activeCategory === filter.value}
          >
            {filter.label} <span>{filter.count}</span>
          </button>
        ))}
      </div>
      <label className="portfolio-search">
        <Icon name="search" size={17} />
        <input
          type="search"
          placeholder="Search projects"
          value={searchText}
          onChange={(event) => onSearchTextChange(event.target.value)}
          aria-label="Search projects"
        />
      </label>
    </div>
  );
}

function ProjectGrid({ projects: visibleProjects }) {
  const gridRef = useRef(null);
  const previousPositions = useRef(new Map());

  useLayoutEffect(() => {
    const cards = gridRef.current?.querySelectorAll("[data-project-slug]");
    if (!cards) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const currentPositions = new Map();
    cards.forEach((card) => {
      const bounds = card.getBoundingClientRect();
      currentPositions.set(card.dataset.projectSlug, {
        x: bounds.left,
        y: bounds.top,
      });
      const previous = previousPositions.current.get(card.dataset.projectSlug);
      if (!reducedMotion && previous) {
        const deltaX = previous.x - bounds.left;
        const deltaY = previous.y - bounds.top;
        if (deltaX || deltaY) {
          card.animate(
            [
              { transform: `translate(${deltaX}px, ${deltaY}px)` },
              { transform: "translate(0, 0)" },
            ],
            { duration: 280, easing: "ease-out" },
          );
        }
      }
    });
    previousPositions.current = currentPositions;
  }, [visibleProjects]);

  return (
    <div className="portfolio-project-grid" ref={gridRef}>
      {visibleProjects.map((project, index) => (
        <PortfolioProjectCard
          project={project}
          index={index}
          key={project.slug}
        />
      ))}
    </div>
  );
}

function PortfolioProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;
    if (
      !("IntersectionObserver" in window) ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`portfolio-project-card brand-spark-card${isVisible ? " is-visible" : ""}`}
      data-project-slug={project.slug}
      style={{ "--card-delay": `${(index % 2) * 60}ms` }}
    >
      <CardSparkBorder />
      <a
        className="portfolio-card-link"
        href={projectHref(project)}
        aria-labelledby={`project-title-${project.slug}`}
      >
        <div
          className={`portfolio-browser-frame${project.darkScreenshot ? " is-dark" : ""}`}
        >
          <div className="portfolio-browser-bar" aria-hidden="true">
            <span />
            <span />
            <span />
            <i>{project.slug}.app</i>
          </div>
          <img
            src={project.coverImage}
            alt={project.coverAlt || `${project.title} product interface`}
            width="1280"
            height="800"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div className="portfolio-project-copy">
          <div className="portfolio-project-labels">
            <span>{project.category}</span>
            <span>{project.industry}</span>
            {project.confidential && (
              <span className="portfolio-confidential-label">
                <Icon name="lock" size={13} />
                Private client system
              </span>
            )}
          </div>
          <h2 id={`project-title-${project.slug}`}>{project.title}</h2>
          <p className="portfolio-project-tagline">{project.tagline}</p>
          <TechStackPills
            items={project.cardStack || getProjectStack(project).slice(0, 4)}
          />
          <span className="portfolio-case-link">
            View case study <Icon name="arrow" size={16} />
          </span>
        </div>
      </a>
    </article>
  );
}

function TechStackPills({ items, compact = false }) {
  return (
    <ul className={`portfolio-stack-pills${compact ? " is-compact" : ""}`}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ProjectDetail({ project }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const lightboxRef = useRef(null);
  const closeButtonRef = useRef(null);
  const gallery = project.screenshots?.length
    ? project.screenshots
    : [project.coverImage];
  const visibleResults = project.results.filter(
    (result) => !isPlaceholderValue(result),
  );
  const showRole = project.role && !isPlaceholderValue(project.role);
  const showTimeline =
    project.timeline && !isPlaceholderValue(project.timeline);
  const liveUrl =
    project.liveUrl && !isPlaceholderValue(project.liveUrl)
      ? project.liveUrl
      : null;
  const repoUrl =
    project.repoUrl && !isPlaceholderValue(project.repoUrl)
      ? project.repoUrl
      : null;
  const stackGroups = getProjectStackGroups(project);
  const nextProject =
    projects[
      (projects.findIndex((item) => item.slug === project.slug) + 1) %
        projects.length
    ];

  useEffect(() => {
    if (lightboxIndex === null) return undefined;
    const previousFocus = document.activeElement;
    const onKeyDown = (event) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight")
        setLightboxIndex((current) => (current + 1) % gallery.length);
      if (event.key === "ArrowLeft")
        setLightboxIndex(
          (current) => (current - 1 + gallery.length) % gallery.length,
        );
      if (event.key === "Tab") {
        const focusable = lightboxRef.current?.querySelectorAll(
          "button:not([disabled])",
        );
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.body.classList.add("portfolio-lightbox-open");
    window.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();
    return () => {
      document.body.classList.remove("portfolio-lightbox-open");
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [lightboxIndex !== null]);

  return (
    <div className="portfolio-detail">
      <header className="portfolio-detail-hero">
        <div className="container">
          <a className="portfolio-back-link" href="portfolio.html">
            <Icon name="arrow" size={15} />
            All projects
          </a>
          <div className="portfolio-detail-intro">
            <div>
              <div className="portfolio-project-labels">
                <span>{project.category}</span>
                <span>{project.industry}</span>
                {project.confidential && (
                  <span className="portfolio-confidential-label">
                    <Icon name="lock" size={13} />
                    Private client system
                  </span>
                )}
              </div>
              <h1>{project.title}</h1>
              <p>{project.tagline}</p>
            </div>
          </div>
          <div
            className={`portfolio-detail-cover${project.darkScreenshot ? " is-dark" : ""}`}
          >
            <img
              src={project.coverImage}
              alt={
                project.coverAlt ||
                project.imageAlt ||
                `${project.title} product overview`
              }
              width="1280"
              height="800"
              fetchPriority="high"
            />
          </div>
        </div>
      </header>
      <div className="portfolio-detail-content">
        <section className="portfolio-facts-section">
          <div className="container portfolio-facts">
            <div>
              <span>Industry</span>
              <strong>{project.industry}</strong>
            </div>
            {showRole && (
              <div>
                <span>Role</span>
                <strong>{project.role}</strong>
              </div>
            )}
            {showTimeline && (
              <div>
                <span>Timeline</span>
                <strong>{project.timeline}</strong>
              </div>
            )}
            <div className="portfolio-fact-stack">
              <span>Stack</span>
              <TechStackPills items={getProjectStack(project)} compact />
            </div>
          </div>
        </section>
        <section className="section portfolio-detail-section">
          <div className="container portfolio-story-grid">
            <div className="portfolio-story-heading">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                The challenge
              </span>
              <h2>The problem</h2>
            </div>
            <p className="portfolio-story-text">{project.problem}</p>
          </div>
        </section>
        <section className="section section-darker portfolio-detail-section">
          <div className="container">
            <div className="portfolio-story-grid portfolio-solution-grid">
              <div className="portfolio-story-heading">
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  Our approach
                </span>
                <h2>The solution</h2>
                <p className="portfolio-story-text">{project.solution}</p>
              </div>
              <div className="portfolio-feature-list">
                <span className="portfolio-detail-overline">Key features</span>
                {project.features.map((feature, index) => (
                  <div key={feature}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <p>{feature}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        {project.workflow && (
          <section className="section portfolio-detail-section portfolio-workflow-section">
            <div className="container">
              <div className="portfolio-detail-section-heading">
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  From one request to the next step
                </span>
                <h2>How it works</h2>
              </div>
              <div
                className="portfolio-workflow"
                aria-label="Career supervisor routes work to specialist agents"
              >
                {project.workflow.map((step, index) => (
                  <div
                    className="portfolio-workflow-step"
                    key={step}
                    style={{ "--workflow-delay": `${index * 70}ms` }}
                  >
                    <span>
                      {index === 0 ? "Supervisor" : `Agent 0${index}`}
                    </span>
                    <strong>{step}</strong>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="section portfolio-detail-section">
          <div className="container">
            <div className="portfolio-detail-section-heading">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Built with care
              </span>
              <h2>Technology stack</h2>
            </div>
            <div className="portfolio-tech-groups">
              {Object.entries(stackGroups).map(([group, items]) => (
                <div className="portfolio-tech-group" key={group}>
                  <h3>{group}</h3>
                  <TechStackPills items={items} />
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-darker portfolio-detail-section">
          <div className="container">
            <div className="portfolio-detail-section-heading">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Inside the product
              </span>
              <h2>Product snapshots</h2>
              <p>
                Explore the key screens and workflows behind {project.title}.
              </p>
            </div>
            <div className="portfolio-gallery">
              {gallery.map((image, index) => (
                <button
                  type="button"
                  className={`portfolio-gallery-item${project.darkScreenshot ? " is-dark" : ""}`}
                  onClick={() => setLightboxIndex(index)}
                  key={image}
                  aria-label={`Open ${project.title} screenshot ${index + 1}`}
                >
                  <div
                    className="portfolio-gallery-browser-bar"
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                  </div>
                  <img
                    src={image}
                    alt={
                      project.screenshotAlts?.[index] ||
                      project.imageAlt ||
                      `${project.title} interface screenshot ${index + 1}`
                    }
                    width="1280"
                    height="800"
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
            {project.confidential && (
              <p className="portfolio-privacy-note">
                {project.privacyNote || "Client data blurred for privacy"}
              </p>
            )}
          </div>
        </section>
        {visibleResults.length > 0 && (
          <section className="section portfolio-detail-section">
            <div className="container portfolio-results-layout">
              <div className="portfolio-story-heading">
                <span className="eyebrow">
                  <span className="eyebrow-dot" />
                  The outcome
                </span>
                <h2>Results</h2>
                {project.slug === "atlas-learning" && (
                  <p>
                    Sample outcomes for this placeholder case study. Replace
                    with verified project metrics before publishing.
                  </p>
                )}
              </div>
              <ul className="portfolio-results-list">
                {visibleResults.map((result) => (
                  <li key={result}>
                    <Icon name="check" size={18} />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}
        {(liveUrl || repoUrl) && (
          <section className="portfolio-external-links">
            <div className="container">
              {liveUrl && (
                <a
                  className="btn btn-primary"
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Live site ↗
                </a>
              )}
              {repoUrl && (
                <a
                  className="btn btn-ghost"
                  href={repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View repository <Icon name="arrow" size={17} />
                </a>
              )}
            </div>
          </section>
        )}
        <section className="portfolio-detail-cta">
          <div className="container portfolio-detail-cta-inner">
            <div>
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Have a similar challenge?
              </span>
              <h2>
                {project.ctaTitle ||
                  (project.confidential
                    ? "Need a system like this?"
                    : "Need something similar?")}
              </h2>
              <p>Let’s talk about what your team needs next.</p>
            </div>
            <a className="btn btn-primary" href="contact.html">
              Start a project <Icon name="arrow" size={17} />
            </a>
          </div>
        </section>
        <div className="container portfolio-next-project">
          <span>Next project</span>
          <a href={projectHref(nextProject)}>
            {nextProject.title}
            <Icon name="arrow" size={17} />
          </a>
        </div>
      </div>
      {lightboxIndex !== null && (
        <div
          ref={lightboxRef}
          className="portfolio-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} screenshot gallery`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setLightboxIndex(null);
          }}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="portfolio-lightbox-close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close image"
          >
            <Icon name="close" size={22} />
          </button>
          <button
            type="button"
            className="portfolio-lightbox-arrow is-previous"
            onClick={() =>
              setLightboxIndex(
                (lightboxIndex - 1 + gallery.length) % gallery.length,
              )
            }
            aria-label="Previous image"
          >
            <Icon name="arrow" size={20} />
          </button>
          <img
            src={gallery[lightboxIndex]}
            alt={`${project.title} interface screenshot ${lightboxIndex + 1}`}
            width="1280"
            height="800"
          />
          <button
            type="button"
            className="portfolio-lightbox-arrow"
            onClick={() =>
              setLightboxIndex((lightboxIndex + 1) % gallery.length)
            }
            aria-label="Next image"
          >
            <Icon name="arrow" size={20} />
          </button>
          <p>
            {String(lightboxIndex + 1).padStart(2, "0")} /{" "}
            {String(gallery.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </div>
  );
}

function ProjectNotFound() {
  return (
    <section className="section portfolio-not-found">
      <div className="container">
        <span className="eyebrow">
          <span className="eyebrow-dot" />
          Project not found
        </span>
        <h1>This case study isn’t available.</h1>
        <a className="btn btn-primary" href="portfolio.html">
          Back to portfolio <Icon name="arrow" size={17} />
        </a>
      </div>
    </section>
  );
}

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState({ state: "idle", message: "" });

  const onSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setStatus({ state: "sending", message: "" });
    const values = new FormData(form);
    try {
      await submitForm("inquiries", {
        source: "contact",
        name: values.get("name"),
        email: values.get("email"),
        project_type: values.get("projectType"),
        project_vision: values.get("projectVision"),
      });
      form.reset();
      setSending(false);
      setStatus({
        state: "success",
        message:
          "Thanks, your enquiry has been sent. We will be in touch soon.",
      });
    } catch (error) {
      setSending(false);
      setStatus({ state: "error", message: error.message });
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let's get your
            <br />
            <span>next idea moving.</span>
          </>
        }
      >
        Tell us what you are thinking about building. We will help you find the
        right next step, whether you have a clear brief or just a starting
        point.
      </PageHero>
      <section className="section section-tight">
        <div className="container contact-layout">
          <div className="contact-aside reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />A real conversation
            </span>
            <h2>Good projects start with a hello.</h2>
            <p>
              Tell us a little about the challenge, the idea, or the thing you
              wish worked better. We will take it from there.
            </p>
            <div className="contact-details">
              <a href="mailto:abdullahamirr9@gmail.com">
                <span className="detail-icon">
                  <Icon name="mail" size={19} />
                </span>
                <span>
                  <strong>Email</strong>
                  <small>abdullahamirr9@gmail.com</small>
                </span>
                <Icon name="arrow" size={16} />
              </a>
              <div>
                <span className="detail-icon">
                  <Icon name="pin" size={19} />
                </span>
                <span>
                  <strong>Workplace</strong>
                  <small>Lahore, Pakistan</small>
                </span>
              </div>
              <div>
                <span className="detail-icon">
                  <Icon name="clock" size={19} />
                </span>
                <span>
                  <strong>Response time</strong>
                  <small>Usually within 12 hours</small>
                </span>
              </div>
            </div>
          </div>
          <div className="form-card brand-spark-card reveal">
            <CardSparkBorder />
            <div className="form-heading">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Tell us about it
              </span>
              <h2>What are you building?</h2>
            </div>
            <form onSubmit={onSubmit}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">
                    Your name <span>*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    required
                    maxLength={120}
                    placeholder="Alex Morgan"
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">
                    Work email <span>*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    maxLength={254}
                    placeholder="alex@company.com"
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="service">
                    What do you need help with? <span>*</span>
                  </label>
                  <select
                    id="service"
                    name="projectType"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    <option value="SaaS">SaaS</option>
                    <option value="Web Development">Web development</option>
                    <option value="Custom Software">Custom software</option>
                    <option value="AI Automation">AI automation</option>
                    <option value="Agentic AI">Agentic AI</option>
                    <option value="Mobile Applications">
                      Mobile applications
                    </option>
                    <option value="API & Integrations">
                      API &amp; integrations
                    </option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">
                  Project idea or vision <span>*</span>
                </label>
                <textarea
                  id="message"
                  name="projectVision"
                  required
                  maxLength={1500}
                  rows="5"
                  placeholder="What are you hoping to build or make easier?"
                ></textarea>
              </div>
              <button
                className="btn btn-primary submit-button"
                type="submit"
                disabled={sending}
              >
                {sending ? (
                  "Preparing message…"
                ) : (
                  <>
                    Send project enquiry <Icon name="arrow" size={18} />
                  </>
                )}
              </button>
              {status.message && (
                <p
                  className={`form-note${status.state === "error" ? " is-error" : ""}`}
                  role="status"
                  aria-live="polite"
                >
                  {status.message}
                </p>
              )}
              <p className="form-privacy">
                Your details are only used to respond to this enquiry.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

function App() {
  const portfolioPathMatch = window.location.pathname.match(
    /^\/portfolio\/([^/]+)\/?$/,
  );
  const currentPage = portfolioPathMatch
    ? "Portfolio"
    : pages[window.location.pathname] || "Home";
  const portfolioSlug =
    currentPage === "Portfolio"
      ? portfolioPathMatch
        ? decodeURIComponent(portfolioPathMatch[1])
        : new URLSearchParams(window.location.search).get("project")
      : null;
  const portfolioProject = portfolioSlug
    ? projects.find((project) => project.slug === portfolioSlug)
    : null;
  const Page = {
    Home: HomePage,
    Services: ServicesPage,
    Portfolio: PortfolioPage,
    Learning: LearningPage,
    Team: TeamPage,
    Contact: ContactPage,
  }[currentPage];

  useEffect(() => {
    document.title =
      currentPage === "Home"
        ? "FutureSort Technologies — Software & AI Engineering"
        : currentPage === "Learning"
          ? "AI Engineering Course — FutureSort Learning"
          : currentPage === "Portfolio" && portfolioProject
            ? `${portfolioProject.title} — Case Study | FutureSort Technologies`
            : `${currentPage} — FutureSort Technologies`;
    const description = document.querySelector('meta[name="description"]');
    if (description)
      description.setAttribute(
        "content",
        currentPage === "Portfolio" && portfolioProject
          ? `${portfolioProject.tagline} ${portfolioProject.solution}`.slice(
              0,
              160,
            )
          : pageDescriptions[currentPage],
      );
    window.scrollTo(0, 0);
  }, [currentPage, portfolioProject]);

  useReveal();

  return (
    <>
      <PageLoader />
      <Header currentPage={currentPage} />
      <main>
        <Page />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
