import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects.js";
import logoFull from "../assets/logo-full.png";

const pages = {
  "/": "Home",
  "/index.html": "Home",
  "/services.html": "Services",
  "/portfolio.html": "Portfolio",
  "/about.html": "About",
  "/contact.html": "Contact",
};

const pageDescriptions = {
  Home: "FutureSort Technologies builds AI-powered software, automations, SaaS products, and web and mobile applications.",
  Services:
    "AI automation, agentic AI, SaaS product development, and web and mobile app engineering from FutureSort Technologies.",
  Portfolio:
    "Representative software, SaaS, and AI automation concepts from FutureSort Technologies.",
  About:
    "Meet FutureSort Technologies: a focused engineering team building practical AI, SaaS, and custom software.",
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
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
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

function LoadingLine() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 720);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div
      className={`loading-line${visible ? " is-active" : ""}`}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}

function Header({ currentPage }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["Home", "index.html"],
    ["Services", "services.html"],
    ["Portfolio", "portfolio.html"],
    ["About", "about.html"],
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
            <img src={logoFull} alt="FutureSort Technologies" />
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
            <a href="contact.html" className="btn btn-ghost btn-sm">
              Start a project <Icon name="arrow" size={16} />
            </a>
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
        vx: (Math.random() - 0.5) * 0.16,
        vy: (Math.random() - 0.5) * 0.16,
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
            context.strokeStyle = `rgba(99, 202, 211, ${(1 - distance / 150) * 0.22})`;
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
          node.phase += 0.018;
          if (node.x < -12) node.x = width + 12;
          if (node.x > width + 12) node.x = -12;
          if (node.y < -12) node.y = height + 12;
          if (node.y > height + 12) node.y = -12;
        }

        const glow = (Math.sin(node.phase) + 1) / 2;
        context.beginPath();
        context.fillStyle = `rgba(153, 230, 232, ${0.42 + glow * 0.3})`;
        context.shadowColor = "rgba(53, 231, 238, 0.8)";
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

function ServiceCard({ item, index }) {
  return (
    <article
      className="service-card reveal"
      style={{ "--reveal-delay": `${(index % 3) * 90}ms` }}
    >
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
  const railFillRef = useRef(null);
  const railIndicatorRef = useRef(null);
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
      const bounds = scrollTrack.getBoundingClientRect();
      const sticky = scrollTrack.querySelector(".process-sticky");
      if (!sticky || window.matchMedia("(max-width: 700px)").matches) return;

      const stickyTop = Number.parseFloat(
        window.getComputedStyle(sticky).top,
      ) || 0;
      const scrollDistance = Math.max(
        1,
        scrollTrack.offsetHeight - sticky.offsetHeight,
      );
      const progress = Math.max(
        0,
        Math.min(1, (stickyTop - bounds.top) / scrollDistance),
      );
      scrollTrack.style.setProperty("--process-progress", progress.toFixed(4));
      if (railFillRef.current) {
        railFillRef.current.style.width = `${progress * 100}%`;
      }
      if (railIndicatorRef.current) {
        railIndicatorRef.current.style.left = `${progress * 100}%`;
      }

      const nextIndex = Math.min(
        steps.length - 1,
        Math.floor(progress * steps.length),
      );
      setActiveIndex(current => current === nextIndex ? current : nextIndex);
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };

    const mobileQuery = window.matchMedia("(max-width: 700px)");
    let mobileObserver;
    const updateResponsiveMode = () => {
      mobileObserver?.disconnect();
      mobileObserver = undefined;
      if (mobileQuery.matches && "IntersectionObserver" in window) {
        mobileObserver = new IntersectionObserver(
          (entries) => {
            const visible = entries
              .filter((entry) => entry.isIntersecting)
              .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
            if (!visible) return;
            const processSteps = Array.from(
              scrollTrack.querySelectorAll(".process-step"),
            );
            setActiveIndex(processSteps.indexOf(visible.target));
          },
          { threshold: [0.25, 0.5, 0.75], rootMargin: "-20% 0px -25% 0px" },
        );
        scrollTrack
          .querySelectorAll(".process-step")
          .forEach((step) => mobileObserver.observe(step));
      } else {
        updateProgress();
      }
    };

    updateProgress();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateResponsiveMode);
    updateResponsiveMode();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateResponsiveMode);
      window.cancelAnimationFrame(frame);
      mobileObserver?.disconnect();
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
          <div className="process-rail" aria-hidden="true">
            <span className="process-rail-fill" ref={railFillRef} />
            <span
              className="process-rail-indicator"
              ref={railIndicatorRef}
            />
          </div>
          {steps.map(([number, title, text], index) => (
            <article
              className={`process-step${activeIndex === index ? " is-current" : ""}${activeIndex > index ? " is-complete" : ""}`}
              key={number}
              aria-current={activeIndex === index ? "step" : undefined}
            >
              <span className="process-number">{number}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
        <p className="process-scroll-hint">
          Scroll to move through our process <span aria-hidden="true">↓</span>
        </p>
      </div>
    </div>
  );
}

function CTA({
  title = "Have a product idea worth building?",
  text = "Tell us what you are trying to solve. We will help you find a clear path from idea to something real.",
  button = "Start a conversation",
}) {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-panel reveal">
          <div className="cta-glow" aria-hidden="true" />
          <div>
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Your next chapter
            </span>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <a className="btn btn-primary" href="contact.html">
            {button}
            <Icon name="arrow" size={18} />
          </a>
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
              <img src={logoFull} alt="FutureSort Technologies" />
            </a>
            <p>
              Thoughtful software and practical AI for teams building what comes
              next.
            </p>
          </div>
          <div className="footer-column">
            <h2>Explore</h2>
            <a href="about.html">About us</a>
            <a href="portfolio.html">Our work</a>
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
            <a href="mailto:hello@futuresorttech.com">
              hello@futuresorttech.com
            </a>
            <a href="tel:+920000000000">+92 000 0000000</a>
            <span>Lahore, Pakistan</span>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} FutureSort Technologies. All rights
            reserved.
          </span>
          <span>Built with care, in-house.</span>
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
              Future made functional
            </span>
            <h1>
              Software for your next big <span>move.</span>
            </h1>
            <p className="hero-lede">
              We build intelligent products, useful automations, and digital
              foundations that help ambitious teams move forward.
            </p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="contact.html">
                Build with us <Icon name="arrow" size={18} />
              </a>
              <a className="btn btn-ghost" href="services.html">
                Explore what we do
              </a>
            </div>
            <div className="hero-note">
              <span className="status-dot" />
              Strategy to software, all under one roof
            </div>
          </div>
          <div
            className="hero-art reveal"
            aria-label="Illustration of a connected AI software platform"
          >
            <div className="art-orbit orbit-outer" />
            <div className="art-orbit orbit-inner" />
            <div className="orbit-node node-top">
              <Icon name="spark" size={19} />
            </div>
            <div className="orbit-node node-right">
              <Icon name="code" size={19} />
            </div>
            <div className="orbit-node node-left">
              <Icon name="layers" size={19} />
            </div>
            <div className="product-card">
              <div className="product-card-head">
                <span className="product-mark">
                  <span />
                </span>
                <div>
                  <strong>FutureOS</strong>
                  <small>Workspace overview</small>
                </div>
                <span className="live-pill">
                  <i /> Live
                </span>
              </div>
              <div className="product-card-body">
                <div className="dashboard-label">Your systems, in sync</div>
                <div className="dashboard-graph">
                  <span className="graph-grid" />
                  <svg
                    viewBox="0 0 330 104"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient
                        id="graph-fill"
                        x1="0"
                        x2="0"
                        y1="0"
                        y2="1"
                      >
                        <stop
                          offset="0"
                          stopColor="#52e1dc"
                          stopOpacity=".25"
                        />
                        <stop offset="1" stopColor="#52e1dc" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0 82 C30 77 35 48 67 58 S106 75 131 46 169 56 194 37 232 56 257 30 302 34 330 12 V104 H0Z"
                      fill="url(#graph-fill)"
                    />
                    <path
                      d="M0 82 C30 77 35 48 67 58 S106 75 131 46 169 56 194 37 232 56 257 30 302 34 330 12"
                      fill="none"
                      stroke="#52e1dc"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
                <div className="dashboard-foot">
                  <span>
                    <i className="mini-dot" />
                    Automations running
                  </span>
                  <strong>
                    12 <small>active</small>
                  </strong>
                </div>
              </div>
            </div>
            <div className="floating-chip chip-one">
              <span className="chip-check">
                <Icon name="check" size={14} />
              </span>
              Workflow complete
            </div>
            <div className="floating-chip chip-two">
              <span className="chip-pulse" />
              AI agent connected
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>ENGINEERED FOR REAL-WORLD PROBLEMS</span>
          <div className="hero-bottom-line" />
          <a href="#capabilities">
            Discover the difference <span>↓</span>
          </a>
        </div>
      </section>

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
      <CTA />
    </>
  );
}

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What we do"
        title={
          <>
            Complex problems.
            <br />
            <span>Clear solutions.</span>
          </>
        }
      >
        We design and engineer software that makes a meaningful difference, from
        a smarter workflow to a product ready for its first customers.
      </PageHero>
      <section id="ai" className="section section-tight">
        <div className="container">
          <SectionHeading
            eyebrow="AI & intelligent systems"
            title="Make AI useful, safe, and part of the work."
          >
            From practical scripts and automations to agents that can use tools
            inside your software, we focus on outcomes your team can trust.
          </SectionHeading>
          <div className="service-grid">
            {serviceItems.slice(0, 2).map((item, index) => (
              <ServiceCard item={item} index={index} key={item.number} />
            ))}
          </div>
          <div className="feature-strip reveal">
            <div className="feature-strip-icon">
              <Icon name="wrench" size={22} />
            </div>
            <div>
              <h3>Connected to the tools you already use</h3>
              <p>
                We integrate third-party services and APIs, write purpose-built
                scripts, and keep humans in the loop wherever a decision needs
                care.
              </p>
            </div>
            <a className="text-link" href="contact.html">
              Discuss an automation <Icon name="arrow" size={17} />
            </a>
          </div>
        </div>
      </section>
      <section id="products" className="section section-darker">
        <div className="container">
          <SectionHeading
            eyebrow="SaaS & product development"
            title="A strong foundation for the product you imagine."
          >
            We work with you from early product decisions through launch,
            shaping every detail around the people who will use it.
          </SectionHeading>
          <div className="service-grid">
            {serviceItems.slice(2, 3).map((item, index) => (
              <ServiceCard item={item} index={index} key={item.number} />
            ))}
          </div>
          <div className="product-pillars">
            {[
              [
                "01",
                "Product strategy",
                "Scope the right first version and set a clear direction.",
              ],
              [
                "02",
                "Full-stack engineering",
                "Build a secure, maintainable product that feels effortless.",
              ],
              [
                "03",
                "Launch & evolve",
                "Learn from real users and grow the product with purpose.",
              ],
            ].map(([number, title, text]) => (
              <div className="pillar reveal" key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section id="engineering" className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Web, mobile & custom software"
            title="Built around your users. Ready for the real world."
          >
            Beautiful interfaces matter. So do fast load times, sensible
            architecture, accessibility, and a codebase your team can build on.
          </SectionHeading>
          <div className="service-grid">
            {serviceItems.slice(3).map((item, index) => (
              <ServiceCard item={item} index={index} key={item.number} />
            ))}
          </div>
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
            {projects.filter((project) => project.featured).slice(0, 3).map((project, index) => (
              <ProjectCard project={project} index={index} key={project.id} />
            ))}
          </div>
        </div>
      </section>
      <CTA
        title="Not sure where to start?"
        text="Describe the challenge in your own words. We will help you work out what to build and what to leave out."
        button="Talk to an engineer"
      />
    </>
  );
}

function AboutPage() {
  const values = [
    [
      "01",
      "Start with the problem",
      "We listen, ask better questions, and make sure the work is solving the right thing before we write code.",
    ],
    [
      "02",
      "Keep it understandable",
      "Clear decisions and open communication mean you always know what is happening and why.",
    ],
    [
      "03",
      "Build for the long run",
      "We ship thoughtful, maintainable software your team can own, extend, and trust.",
    ],
  ];
  return (
    <>
      <PageHero
        eyebrow="About FutureSort"
        title={
          <>
            We sort the signal
            <br />
            from the <span>noise.</span>
          </>
        }
      >
        We are a focused software and AI engineering team helping ambitious
        people turn complicated ideas into clear, useful products.
      </PageHero>
      <section className="section section-tight">
        <div className="container about-intro">
          <div className="about-heading reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              Our point of view
            </span>
            <h2>Better software begins before the first line of code.</h2>
          </div>
          <div className="about-copy reveal">
            <p>
              Most teams do not need more tools. They need a clearer way to
              solve the problem in front of them. FutureSort exists to help find
              that way, then build the software and systems that make it real.
            </p>
            <p>
              We combine product thinking, strong engineering, and practical AI
              to help you move forward without adding unnecessary complexity.
            </p>
            <a className="text-link" href="services.html">
              Explore how we work <Icon name="arrow" size={17} />
            </a>
          </div>
        </div>
      </section>
      <section className="section section-darker">
        <div className="container">
          <SectionHeading
            eyebrow="What matters to us"
            title="A few principles we don't compromise on."
          />
          <div className="values-grid">
            {values.map(([number, title, text]) => (
              <article className="value-card reveal" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="team-heading reveal">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              How we work together
            </span>
            <h2>Small team. Thoughtful work. Shared ownership.</h2>
            <p>
              FutureSort stays intentionally focused, so the people shaping your
              plan stay close to the people building it.
            </p>
          </div>
          <div className="team-grid">
            {[
              [
                "code",
                "Product engineering",
                "Engineers who take responsibility from architecture through to the details people notice.",
              ],
              [
                "orbit",
                "AI & automation",
                "Builders who make intelligent systems useful, measurable, and safe to rely on.",
              ],
              [
                "layers",
                "Product design",
                "A product-minded perspective that keeps every interface clear, considered, and human.",
              ],
            ].map(([icon, title, text]) => (
              <article className="team-card reveal" key={title}>
                <div className="team-icon">
                  <Icon name={icon} size={24} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <CTA
        title="Let's build something that matters."
        text="We would love to hear what your team is working on and where a little clarity could take you."
        button="Get in touch"
      />
    </>
  );
}

function ProjectCard({ project, index }) {
  const service = serviceItems.find((item) => item.id === project.serviceId);
  const images = [
    project.coverImage,
    ...(project.screenshots || []),
  ]
    .map((image) => typeof image === "string" ? { src: image } : image)
    .filter((image) => image?.src)
    .filter((image, imageIndex, allImages) =>
      allImages.findIndex((candidate) => candidate.src === image.src) === imageIndex
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
        className="project-card reveal"
        style={{ "--reveal-delay": `${(index % 2) * 100}ms` }}
      >
        <div className={`project-visual visual-${(index % 6) + 1}${images.length ? " has-screenshot" : ""}`}>
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
              <span className="image-zoom-hint">View screenshot <span aria-hidden="true">↗</span></span>
            </button>
          ) : (
            <>
              <div className="visual-orbit" />
              <div className="visual-orbit visual-orbit-small" />
              <div className="visual-window">
                <div className="window-top">
                  <span />
                  <span />
                  <span />
                  <i>{project.category.split(" · ")[0]}</i>
                </div>
                <div className="window-content">
                  <span className="window-icon">
                    <Icon name={service?.icon || "layers"} size={20} />
                  </span>
                  <div className="window-lines">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="window-chart">
                    {Array.from({ length: 7 }, (_, barIndex) => (
                      <span key={barIndex} />
                    ))}
                  </div>
                </div>
              </div>
              <span className="visual-index">{String(index + 1).padStart(2, "0")}</span>
            </>
          )}
          {project.isConcept && <span className="concept-badge">Concept preview</span>}
          {images.length > 1 && (
            <div className="project-thumbnails" aria-label={`${project.title} screenshots`}>
              {images.map((image, imageIndex) => (
                <button
                  type="button"
                  className={activeImage === imageIndex ? "is-selected" : ""}
                  key={image.src}
                  onClick={() => setActiveImage(imageIndex)}
                  aria-label={`Show screenshot ${imageIndex + 1} of ${images.length}`}
                  aria-pressed={activeImage === imageIndex}
                >
                  <img
                    src={image.src}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="project-copy">
          <span className="project-category">{project.category}</span>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <div className="project-card-footer">
            <div className="project-meta">
              <span>{service?.title || "Software development"}</span>
              {project.clientName && <span>{project.clientName}</span>}
              {project.year && <span>{project.year}</span>}
            </div>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
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
  const validServiceIds = ["all", ...serviceItems.map((item) => item.id)];
  const [activeService, setActiveService] = useState(() => {
    const requestedService = new URLSearchParams(window.location.search).get("service");
    return validServiceIds.includes(requestedService) ? requestedService : "all";
  });
  const [searchText, setSearchText] = useState("");
  const filteredProjects = projects.filter((project) => {
    const matchesService = activeService === "all" || project.serviceId === activeService;
    const search = searchText.trim().toLowerCase();
    const matchesSearch = !search || [
      project.title,
      project.category,
      project.description,
    ].some((value) => value.toLowerCase().includes(search));
    return matchesService && matchesSearch;
  });

  const selectService = (serviceId) => {
    setActiveService(serviceId);
    const url = new URL(window.location.href);
    if (serviceId === "all") url.searchParams.delete("service");
    else url.searchParams.set("service", serviceId);
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  return (
    <>
      <PageHero
        eyebrow="Selected work"
        title={
          <>
            Made to solve.
            <br />
            <span>Built to last.</span>
          </>
        }
      >
        A look at the kind of product, software, and AI challenges we love
        taking on. These illustrative concepts show the range of what we can
        build.
      </PageHero>
      <section className="section section-tight">
        <div className="container">
          <div className="portfolio-note reveal">
            <span className="note-icon">
              <Icon name="spark" size={19} />
            </span>
            <p>
              <strong>Illustrative concepts.</strong> Concept previews are
              clearly labeled. Add project screenshots, descriptions, and live
              links as each real project is ready to share.
            </p>
          </div>
          <div className="portfolio-controls">
            <div className="portfolio-filters" aria-label="Filter projects by service">
              <button
                type="button"
                className={activeService === "all" ? "is-active" : ""}
                onClick={() => selectService("all")}
                aria-pressed={activeService === "all"}
              >
                All projects <span>{projects.length}</span>
              </button>
              {serviceItems.map((item) => {
                const count = projects.filter((project) => project.serviceId === item.id).length;
                if (!count) return null;
                return (
                  <button
                    type="button"
                    className={activeService === item.id ? "is-active" : ""}
                    key={item.id}
                    onClick={() => selectService(item.id)}
                    aria-pressed={activeService === item.id}
                  >
                    {item.title} <span>{count}</span>
                  </button>
                );
              })}
            </div>
            <label className="portfolio-search">
              <Icon name="spark" size={17} />
              <input
                type="search"
                placeholder="Find a project"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                aria-label="Search projects"
              />
            </label>
          </div>
          <p className="portfolio-result-count" aria-live="polite">
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"}
          </p>
          {filteredProjects.length ? (
            <div className="project-grid">
              {filteredProjects.map((project, index) => (
                <ProjectCard project={project} index={index} key={project.id} />
              ))}
            </div>
          ) : (
            <div className="portfolio-empty" role="status">
              <span className="service-icon"><Icon name="layers" size={23} /></span>
              <h2>No matching projects yet</h2>
              <p>Try a different search or service filter, or get in touch to ask about related work.</p>
              <button type="button" className="text-link" onClick={() => { setSearchText(""); selectService("all"); }}>
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

function ContactPage() {
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSending(true);
    setSubmitted(false);
    window.setTimeout(() => {
      form.reset();
      setSending(false);
      setSubmitted(true);
    }, 650);
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
              <a href="mailto:hello@futuresorttech.com">
                <span className="detail-icon">
                  <Icon name="mail" size={19} />
                </span>
                <span>
                  <strong>Email</strong>
                  <small>hello@futuresorttech.com</small>
                </span>
                <Icon name="arrow" size={16} />
              </a>
              <div>
                <span className="detail-icon">
                  <Icon name="pin" size={19} />
                </span>
                <span>
                  <strong>Studio</strong>
                  <small>Lahore, Pakistan</small>
                </span>
              </div>
              <div>
                <span className="detail-icon">
                  <Icon name="clock" size={19} />
                </span>
                <span>
                  <strong>Response time</strong>
                  <small>Usually within 1–2 business days</small>
                </span>
              </div>
            </div>
            <div className="contact-aside-note">
              <span className="status-dot" />
              No pressure. Just a useful first conversation.
            </div>
          </div>
          <div className="form-card reveal">
            <div className="form-heading">
              <span className="eyebrow">
                <span className="eyebrow-dot" />
                Tell us about it
              </span>
              <h2>What are you building?</h2>
              <p>
                Fields marked <span aria-hidden="true">*</span> are required.
              </p>
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
                    placeholder="alex@company.com"
                  />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="company">
                    Company <small>(optional)</small>
                  </label>
                  <input
                    id="company"
                    name="company"
                    autoComplete="organization"
                    placeholder="Your company"
                  />
                </div>
                <div className="field">
                  <label htmlFor="service">What do you need help with?</label>
                  <select
                    id="service"
                    name="service"
                    defaultValue="Not sure yet"
                  >
                    <option>AI automation</option>
                    <option>Agentic AI</option>
                    <option>SaaS product development</option>
                    <option>Web application</option>
                    <option>Mobile application</option>
                    <option>Custom software</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">
                  A little about the project <span>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
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
              {submitted && (
                <p className="form-note" role="status">
                  Thanks — your message is ready. This demo form is not
                  connected to a submission service yet, so please email us
                  directly at{" "}
                  <a href="mailto:hello@futuresorttech.com">
                    hello@futuresorttech.com
                  </a>
                  .
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
  const currentPage = pages[window.location.pathname] || "Home";
  const Page = {
    Home: HomePage,
    Services: ServicesPage,
    Portfolio: PortfolioPage,
    About: AboutPage,
    Contact: ContactPage,
  }[currentPage];

  useEffect(() => {
    document.title =
      currentPage === "Home"
        ? "FutureSort Technologies — Software & AI Engineering"
        : `${currentPage} — FutureSort Technologies`;
    const description = document.querySelector('meta[name="description"]');
    if (description)
      description.setAttribute("content", pageDescriptions[currentPage]);
    window.scrollTo(0, 0);
  }, [currentPage]);

  useReveal();

  return (
    <>
      <LoadingLine />
      <Header currentPage={currentPage} />
      <main>
        <Page />
      </main>
      <Footer />
      <a
        className="back-to-top"
        href="#top"
        onClick={(event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        aria-label="Back to top"
      >
        <span>↑</span>
      </a>
    </>
  );
}

export default App;
