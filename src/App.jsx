import { useEffect, useRef, useState } from "react";
import { projects } from "./data/projects.js";
import logoFull from "../assets/logo-full.png";

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
    "Representative software, SaaS, and AI automation concepts from FutureSort Technologies.",
  Learning:
    "Explore FutureSort Technologies' two-month AI engineering course and register for a free demo class.",
  Team:
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
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
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
        width / 2, height / 2, 8, width / 2, height / 2, Math.min(width, height) * 0.42,
      );
      glow.addColorStop(0, "rgba(70, 207, 204, 0.13)");
      glow.addColorStop(0.52, "rgba(62, 113, 170, 0.055)");
      glow.addColorStop(1, "rgba(8, 11, 17, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      const brainScale = Math.min(width * 0.4, height * 0.49);
      const centerX = width / 2;
      const centerY = height * 0.46;
      const brainX = (value) => centerX + value * brainScale;
      const brainY = (value) => centerY + value * brainScale;
      const stem = new Path2D();
      stem.moveTo(brainX(-0.12), brainY(0.44));
      stem.bezierCurveTo(brainX(-0.19), brainY(0.64), brainX(-0.13), brainY(0.82), brainX(-0.07), brainY(0.91));
      stem.quadraticCurveTo(brainX(0), brainY(0.97), brainX(0.07), brainY(0.91));
      stem.bezierCurveTo(brainX(0.13), brainY(0.82), brainX(0.19), brainY(0.64), brainX(0.12), brainY(0.44));
      stem.closePath();
      const stemFill = context.createLinearGradient(brainX(-0.12), brainY(0.55), brainX(0.12), brainY(0.9));
      stemFill.addColorStop(0, "rgba(86, 207, 204, 0.72)");
      stemFill.addColorStop(1, "rgba(15, 31, 47, 0.94)");
      context.fillStyle = stemFill;
      context.fill(stem);
      context.strokeStyle = "rgba(126, 238, 224, 0.62)";
      context.lineWidth = 1.4;
      context.stroke(stem);

      [-1, 1].forEach((side) => {
        const lobe = new Path2D();
        lobe.moveTo(brainX(side * 0.025), brainY(-0.77));
        lobe.bezierCurveTo(brainX(side * 0.1), brainY(-0.9), brainX(side * 0.4), brainY(-0.85), brainX(side * 0.51), brainY(-0.71));
        lobe.bezierCurveTo(brainX(side * 0.76), brainY(-0.75), brainX(side * 0.86), brainY(-0.54), brainX(side * 0.76), brainY(-0.34));
        lobe.bezierCurveTo(brainX(side * 0.91), brainY(-0.17), brainX(side * 0.88), brainY(0.04), brainX(side * 0.75), brainY(0.19));
        lobe.bezierCurveTo(brainX(side * 0.78), brainY(0.39), brainX(side * 0.58), brainY(0.57), brainX(side * 0.37), brainY(0.48));
        lobe.bezierCurveTo(brainX(side * 0.23), brainY(0.64), brainX(side * 0.06), brainY(0.61), brainX(side * 0.025), brainY(0.48));
        lobe.closePath();

        context.save();
        context.clip(lobe);
        const fill = context.createLinearGradient(brainX(side * 0.7), brainY(-0.8), brainX(side * 0.1), brainY(0.6));
        fill.addColorStop(0, "rgba(113, 227, 219, 0.72)");
        fill.addColorStop(0.45, "rgba(47, 113, 133, 0.78)");
        fill.addColorStop(1, "rgba(12, 27, 43, 0.9)");
        context.fillStyle = fill;
        context.fillRect(brainX(-1), brainY(-1), brainScale * 2, brainScale * 2);

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
        folds.forEach(([startX, startY, controlX, controlY, endX, endY], index) => {
          context.beginPath();
          context.moveTo(brainX(side * Math.abs(startX)), brainY(startY));
          context.quadraticCurveTo(
            brainX(side * Math.abs(controlX)), brainY(controlY),
            brainX(side * Math.abs(endX)), brainY(endY),
          );
          context.strokeStyle = index % 2 === 0
            ? "rgba(4, 17, 28, 0.62)"
            : "rgba(173, 255, 239, 0.48)";
          context.lineWidth = index % 3 === 0 ? 2.2 : 1.4;
          context.lineCap = "round";
          context.stroke();
        });
        context.restore();

        context.beginPath();
        context.strokeStyle = "rgba(155, 250, 233, 0.82)";
        context.lineWidth = 1.35;
        context.shadowColor = "rgba(65, 226, 218, 0.72)";
        context.shadowBlur = 10;
        context.stroke(lobe);
        context.shadowBlur = 0;
      });

      context.beginPath();
      context.moveTo(brainX(0), brainY(-0.77));
      context.bezierCurveTo(brainX(-0.018), brainY(-0.38), brainX(0.02), brainY(0.18), brainX(0), brainY(0.51));
      context.strokeStyle = "rgba(5, 15, 24, 0.96)";
      context.lineWidth = 3;
      context.stroke();
      context.beginPath();
      context.moveTo(brainX(0), brainY(-0.73));
      context.bezierCurveTo(brainX(-0.012), brainY(-0.37), brainX(0.013), brainY(0.16), brainX(0), brainY(0.47));
      context.strokeStyle = "rgba(169, 255, 239, 0.62)";
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
          ? `rgba(111, 246, 232, ${0.45 * depthAlpha})`
          : edge.crossHemisphere
            ? `rgba(103, 160, 221, ${0.19 * depthAlpha})`
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
      context.strokeStyle = "rgba(147, 226, 224, 0.42)";
      context.lineWidth = 1;
      context.setLineDash([2, 5]);
      context.stroke();
      context.setLineDash([]);

      points.forEach((point, index) => {
        const position = projected[index];
        const radius = (point.phase > pulse && point.phase < pulse + 0.035)
          ? 2.45
          : 0.9 + position.perspective * 0.7;
        context.beginPath();
        context.arc(position.x, position.y, radius, 0, Math.PI * 2);
        context.fillStyle = point.phase > pulse && point.phase < pulse + 0.035
          ? "#b6fff1"
          : `rgba(224, 246, 248, ${Math.max(0.32, 0.88 - position.depth * 0.24)})`;
        context.shadowColor = "#81eee5";
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
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
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
      <span className="brain-caption"><span className="brain-caption-dot" />Intelligence, by design</span>
      {activeSpark && (
        <svg
          key={activeSpark.key}
          className="brain-spark-layer"
          viewBox={activeSpark.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={activeSpark.path} pathLength="1" className="brain-spark-trail" />
          {activeSpark.reducedMotion ? (
            <circle cx={activeSpark.endX} cy={activeSpark.endY} r="3.5" className="brain-spark-core" />
          ) : (
            <circle r="3.5" className="brain-spark-core">
              <animateMotion path={activeSpark.path} dur="650ms" fill="freeze" />
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
    let resizeObserver;

    const render = () => {
      const bounds = canvas.getBoundingClientRect();
      const width = bounds.width;
      const height = bounds.height;
      if (!width || !height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const scale = Math.min(width * 0.47, height * 0.66);
      const centerX = width * 0.5;
      const centerY = height * 0.45;
      const px = (value) => centerX + value * scale;
      const py = (value) => centerY + value * scale;
      const brain = new Path2D();

      brain.moveTo(px(-0.91), py(0.03));
      brain.bezierCurveTo(px(-0.96), py(-0.13), px(-0.84), py(-0.34), px(-0.66), py(-0.37));
      brain.bezierCurveTo(px(-0.61), py(-0.53), px(-0.4), py(-0.58), px(-0.25), py(-0.49));
      brain.bezierCurveTo(px(-0.12), py(-0.62), px(0.1), py(-0.61), px(0.23), py(-0.49));
      brain.bezierCurveTo(px(0.39), py(-0.57), px(0.59), py(-0.47), px(0.65), py(-0.34));
      brain.bezierCurveTo(px(0.84), py(-0.34), px(0.96), py(-0.17), px(0.93), py(0.01));
      brain.bezierCurveTo(px(1.02), py(0.15), px(0.91), py(0.31), px(0.76), py(0.34));
      brain.bezierCurveTo(px(0.69), py(0.48), px(0.51), py(0.51), px(0.37), py(0.41));
      brain.bezierCurveTo(px(0.23), py(0.52), px(0.04), py(0.49), px(-0.08), py(0.39));
      brain.bezierCurveTo(px(-0.26), py(0.48), px(-0.44), py(0.38), px(-0.52), py(0.29));
      brain.bezierCurveTo(px(-0.72), py(0.31), px(-0.88), py(0.21), px(-0.91), py(0.03));
      brain.closePath();

      const halo = context.createRadialGradient(
        centerX, centerY, scale * 0.12, centerX, centerY, scale * 1.1,
      );
      halo.addColorStop(0, "rgba(60, 211, 206, .13)");
      halo.addColorStop(1, "rgba(8, 11, 17, 0)");
      context.fillStyle = halo;
      context.fillRect(0, 0, width, height);

      context.save();
      context.shadowColor = "rgba(76, 222, 216, .55)";
      context.shadowBlur = 20;
      const fill = context.createLinearGradient(px(-0.8), py(-0.55), px(0.75), py(0.5));
      fill.addColorStop(0, "rgba(50, 79, 91, .94)");
      fill.addColorStop(0.48, "rgba(24, 42, 52, .97)");
      fill.addColorStop(1, "rgba(13, 25, 35, .97)");
      context.fillStyle = fill;
      context.fill(brain);
      context.restore();

      context.save();
      context.clip(brain);
      const grooves = [
        [-0.77, -0.02, -0.76, -0.28, -0.53, -0.26, -0.47, -0.08],
        [-0.63, -0.32, -0.43, -0.42, -0.3, -0.3, -0.39, -0.15],
        [-0.36, -0.46, -0.2, -0.54, -0.04, -0.34, -0.2, -0.2],
        [-0.13, -0.52, 0.03, -0.59, 0.17, -0.39, 0.02, -0.26],
        [0.19, -0.47, 0.35, -0.55, 0.49, -0.37, 0.33, -0.19],
        [0.55, -0.36, 0.75, -0.36, 0.83, -0.17, 0.67, -0.04],
        [-0.78, 0.11, -0.63, 0.03, -0.5, 0.12, -0.55, 0.24],
        [-0.43, 0.03, -0.32, -0.11, -0.15, 0.01, -0.25, 0.26],
        [-0.08, -0.15, 0.11, -0.27, 0.28, -0.07, 0.17, 0.12],
        [0.37, -0.13, 0.51, -0.3, 0.67, -0.13, 0.53, 0.06],
        [0.73, 0.11, 0.65, 0.25, 0.48, 0.19, 0.42, 0.34],
        [-0.36, 0.25, -0.23, 0.1, -0.07, 0.18, -0.16, 0.35],
        [0.02, 0.22, 0.17, 0.1, 0.31, 0.25, 0.22, 0.37],
      ];
      grooves.forEach(([sx, sy, c1x, c1y, c2x, c2y, ex, ey], index) => {
        context.beginPath();
        context.moveTo(px(sx), py(sy));
        context.bezierCurveTo(px(c1x), py(c1y), px(c2x), py(c2y), px(ex), py(ey));
        context.strokeStyle = index % 2
          ? "rgba(130, 212, 216, .33)"
          : "rgba(3, 13, 22, .62)";
        context.lineWidth = index % 3 === 0 ? 2 : 1.25;
        context.lineCap = "round";
        context.stroke();
      });

      const points = [];
      let seed = 193;
      const random = () => {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      };
      for (let attempt = 0; attempt < 1200 && points.length < 190; attempt += 1) {
        const x = px(-0.92 + random() * 1.88);
        const y = py(-0.58 + random() * 1.12);
        if (context.isPointInPath(brain, x, y)) points.push({ x, y });
      }

      context.lineWidth = 0.75;
      for (let index = 0; index < points.length; index += 1) {
        const point = points[index];
        let links = 0;
        for (let otherIndex = index + 1; otherIndex < points.length && links < 4; otherIndex += 1) {
          const other = points[otherIndex];
          const dx = point.x - other.x;
          const dy = point.y - other.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > 16 && distance < Math.min(width, height) * 0.105) {
            context.beginPath();
            context.moveTo(point.x, point.y);
            context.lineTo(other.x, other.y);
            context.strokeStyle = `rgba(208, 235, 239, ${0.42 * (1 - distance / (Math.min(width, height) * 0.14))})`;
            context.stroke();
            links += 1;
          }
        }
      }

      points.forEach((point, index) => {
        context.beginPath();
        context.arc(point.x, point.y, index % 11 === 0 ? 1.65 : 1.1, 0, Math.PI * 2);
        context.fillStyle = index % 13 === 0 ? "#70e9ee" : "rgba(245, 253, 255, .94)";
        context.fill();
      });
      context.restore();

      context.beginPath();
      context.moveTo(px(0.48), py(0.38));
      context.bezierCurveTo(px(0.55), py(0.48), px(0.62), py(0.57), px(0.69), py(0.63));
      context.quadraticCurveTo(px(0.73), py(0.67), px(0.76), py(0.61));
      context.strokeStyle = "rgba(218, 243, 246, .8)";
      context.lineWidth = 1.25;
      context.stroke();
      context.beginPath();
      context.strokeStyle = "rgba(230, 249, 250, .85)";
      context.lineWidth = 1.4;
      context.shadowColor = "rgba(83, 227, 222, .58)";
      context.shadowBlur = 9;
      context.stroke(brain);
      context.shadowBlur = 0;
    };

    render();
    if ("ResizeObserver" in window) {
      resizeObserver = new ResizeObserver(render);
      resizeObserver.observe(canvas);
    } else {
      window.addEventListener("resize", render);
    }

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("resize", render);
    };
  }, []);

  const sparkToCapability = (event) => {
    const visual = event.currentTarget.closest(".brain-visual");
    const bounds = visual?.getBoundingClientRect();
    if (!visual || !bounds) return;
    const tagBounds = event.currentTarget.getBoundingClientRect();
    const startX = bounds.width / 2;
    const startY = bounds.height * 0.45;
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
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
    window.clearTimeout(sparkTimerRef.current);
    sparkTimerRef.current = window.setTimeout(() => setActiveSpark(null), 850);
  };

  useEffect(() => () => window.clearTimeout(sparkTimerRef.current), []);

  return (
    <div className="brain-visual" role="group" aria-label="Illustrated neural brain and AI capabilities">
      <div className="brain-aura" aria-hidden="true" />
      <canvas className="brain-model" ref={canvasRef} aria-hidden="true" />
      <span className="brain-caption"><span className="brain-caption-dot" />Intelligence, by design</span>
      {activeSpark && (
        <svg
          key={activeSpark.key}
          className="brain-spark-layer"
          viewBox={activeSpark.viewBox}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path d={activeSpark.path} pathLength="1" className="brain-spark-trail" />
          {activeSpark.reducedMotion ? (
            <circle cx={activeSpark.endX} cy={activeSpark.endY} r="3.5" className="brain-spark-core" />
          ) : (
            <circle r="3.5" className="brain-spark-core">
              <animateMotion path={activeSpark.path} dur="650ms" fill="freeze" />
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
      technologies: ["React", "Angular", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Backend",
      technologies: ["Node.js", "Python", "Java", "PHP", "Go", ".NET"],
    },
    {
      title: "Artificial intelligence",
      technologies: ["TensorFlow", "PyTorch", "Keras", "OpenAI", "LLMs", "Agentic AI", "RAG Systems", "Computer Vision"],
    },
    {
      title: "Data science",
      technologies: ["Data Analysis", "Big Data", "Predictive Models", "Data Visualization", "Business Intelligence", "Statistical Analysis"],
    },
    {
      title: "Cloud & DevOps",
      technologies: ["AWS", "Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD"],
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
          <h2>Technologies we <span>master.</span></h2>
          <p>
            Our team works across modern product, AI, data, and cloud
            technologies—choosing the right tools for the job, not forcing
            every project into the same stack.
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
            ((window.innerHeight * 0.52) - firstCenter) /
              Math.max(1, lastCenter - firstCenter),
          ),
        );
      } else {
        const bounds = scrollTrack.getBoundingClientRect();
        const sticky = scrollTrack.querySelector(".process-sticky");
        if (!sticky) return;

        const stickyTop = Number.parseFloat(
          window.getComputedStyle(sticky).top,
        ) || 0;
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
      setActiveIndex(current => current === nextIndex ? current : nextIndex);
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
        <p className="process-scroll-hint">
          Scroll to move through our process <span aria-hidden="true">↓</span>
        </p>
      </div>
    </div>
  );
}

function CTA({
  title = "Initiate partnership.",
  text = "Tell us what you are trying to solve. We will help you find a clear path from idea to something real.",
  button = "Secure engagement",
}) {
  const [submitted, setSubmitted] = useState(false);
  const [briefLength, setBriefLength] = useState(0);

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
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
              <a href="mailto:hello@example.com">
                <span className="engagement-icon"><Icon name="mail" size={20} /></span>
                <span><small>Email us</small><strong>hello@example.com</strong></span>
              </a>
              <a href="tel:+923000000000">
                <span className="engagement-icon"><Icon name="phone" size={20} /></span>
                <span><small>Call us</small><strong>+92 300 0000000</strong></span>
              </a>
              <div>
                <span className="engagement-icon"><Icon name="pin" size={20} /></span>
                <span><small>Location</small><strong>Lahore, Punjab, Pakistan</strong></span>
              </div>
            </div>
          </div>
          <form className="engagement-form" onSubmit={onSubmit}>
            <p className="engagement-form-note">Frontend enquiry preview · not connected to a submission service.</p>
            <div className="engagement-field-row">
              <div className="engagement-field">
                <label htmlFor="engagement-name">Primary contact name</label>
                <input id="engagement-name" name="name" autoComplete="name" required placeholder="e.g. Alex Morgan" />
              </div>
              <div className="engagement-field">
                <label htmlFor="engagement-email">Corporate email</label>
                <input id="engagement-email" name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
              </div>
            </div>
            <div className="engagement-field engagement-brief-field">
              <label htmlFor="engagement-brief">
                Project blueprint &amp; vision <span>({briefLength}/1500)</span>
              </label>
              <textarea
                id="engagement-brief"
                name="brief"
                maxLength={1500}
                onChange={(event) => setBriefLength(event.target.value.length)}
                required
                placeholder="Share a little about the problem, product, or idea..."
              />
            </div>
            <button type="submit" className="engagement-submit">
              {button}<Icon name="arrow" size={18} />
            </button>
            {submitted && (
              <p className="engagement-notice" role="status">
                This enquiry form is a frontend preview and is not connected to a submission service yet. Please use our{" "}
                <a href="contact.html">contact page</a> to continue.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

const reviewPlaceholders = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  name: "Client name",
  role: "Project / role",
  text: "Add an approved client review here before publishing. Replace this placeholder with the client's exact feedback and confirm permission to share it.",
}));

function ReviewsSection() {
  const trackRef = useRef(null);
  const [activeReview, setActiveReview] = useState(0);
  const [maxReviewIndex, setMaxReviewIndex] = useState(7);

  const updateActiveReview = () => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    const step = firstCard.getBoundingClientRect().width + gap;
    const maxIndex = Math.max(
      0,
      Math.round((track.scrollWidth - track.clientWidth) / step),
    );
    setMaxReviewIndex(maxIndex);
    setActiveReview(Math.min(maxIndex, Math.max(0, Math.round(track.scrollLeft / step))));
  };

  const moveReview = (direction) => {
    const track = trackRef.current;
    const firstCard = track?.firstElementChild;
    if (!track || !firstCard) return;
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
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
    const gap = Number.parseFloat(window.getComputedStyle(track).columnGap) || 0;
    track.scrollTo({
      left: index * (firstCard.getBoundingClientRect().width + gap),
      behavior: "smooth",
    });
  };

  return (
    <section className="reviews-section section section-darker" aria-labelledby="reviews-title">
      <div className="container">
        <div className="reviews-heading reveal">
          <div>
            <span className="eyebrow"><span className="eyebrow-dot" />Client voices</span>
            <h2 id="reviews-title">Good work speaks for itself.</h2>
            <p>These are clearly marked content slots, ready for approved client feedback.</p>
          </div>
          <div className="reviews-controls">
            <span className="reviews-count">{String(activeReview + 1).padStart(2, "0")} <i>/</i> {String(reviewPlaceholders.length).padStart(2, "0")}</span>
            <button type="button" onClick={() => moveReview(-1)} disabled={activeReview === 0} aria-label="Previous review">
              <Icon name="arrow" size={18} />
            </button>
            <button type="button" onClick={() => moveReview(1)} disabled={activeReview >= maxReviewIndex} aria-label="Next review">
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
          aria-label="Client review placeholders"
        >
          {reviewPlaceholders.map((review) => (
            <article className="review-card" key={review.id}>
              <span className="review-placeholder-label">Review placeholder {String(review.id).padStart(2, "0")}</span>
              <div className="review-quote-mark" aria-hidden="true">“</div>
              <blockquote>{review.text}</blockquote>
              <div className="review-author">
                <span className="review-avatar" aria-hidden="true">{String(review.id).padStart(2, "0")}</span>
                <span><strong>{review.name}</strong><small>{review.role}</small></span>
              </div>
            </article>
          ))}
        </div>
        <div className="reviews-pagination" aria-label="Choose a review">
          {reviewPlaceholders.slice(0, maxReviewIndex + 1).map((review, index) => (
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
              <img src={logoFull} alt="FutureSort Technologies" />
            </a>
            <p>
              Thoughtful software and practical AI for teams building what comes
              next.
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
              AI-first product engineering
            </span>
            <h1>
              We build with AI at the <span>core.</span>
            </h1>
            <p className="hero-lede">
              From LLMs and RAG to agentic systems and AI architecture, our
              whole team thinks deeply about how intelligence should work
              inside real products.
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
              AI expertise across every stage of the build
            </div>
          </div>
          <div className="hero-art reveal">
            <BrainVisual />
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
  const [submitted, setSubmitted] = useState(false);

  const submitRegistration = (event) => {
    event.preventDefault();
    setSubmitted(true);
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
        <div className="learning-hero-glow learning-hero-glow-one" aria-hidden="true" />
        <div className="learning-hero-glow learning-hero-glow-two" aria-hidden="true" />
        <div className="container learning-hero-content">
          <div className="learning-open-badge reveal">
            <span />
            Registrations are open
          </div>
          <span className="eyebrow reveal"><span className="eyebrow-dot" />FutureSort Learning</span>
          <h1 className="reveal">Learn to build with <span>AI.</span></h1>
          <p className="learning-hero-lede reveal">
            A focused, two-month AI engineering course with separate technical
            and non-technical learning paths. Start with a free demo class for
            the batch that fits you.
          </p>
          <div className="learning-hero-actions reveal">
            <a className="btn btn-primary" href="#demo-registration">
              Register for a free demo <Icon name="arrow" size={18} />
            </a>
            <span className="learning-duration"><Icon name="clock" size={17} /> 2-month course</span>
          </div>
          <div className="learning-hero-orbit" aria-hidden="true"><span /><span /><span /></div>
        </div>
      </section>

      <section className="section learning-tracks-section" aria-labelledby="learning-tracks-title">
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
              <article className={`learning-track-card reveal learning-track-${track.id}`} key={track.id}>
                <div className="learning-track-topline">
                  <span>{track.number}</span>
                  <span className="learning-track-pill">2 months</span>
                </div>
                <h3>{track.title}</h3>
                <p>{track.subtitle}</p>
                <ul>
                  {track.topics.map((topic) => (
                    <li key={topic}><Icon name="check" size={16} />{topic}</li>
                  ))}
                </ul>
                <button type="button" className="learning-track-link" onClick={() => chooseTrack(track.id)}>
                  Register for free demo <Icon name="arrow" size={17} />
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section learning-registration-section" id="demo-registration">
        <div className="container learning-registration-layout">
          <div className="learning-registration-copy reveal">
            <span className="eyebrow"><span className="eyebrow-dot" />Your first step</span>
            <h2>Try a demo class. <span>Free.</span></h2>
            <p>
              Get a feel for the learning experience, meet the course team, and
              see which path is right for you. Choose either the technical or
              non-technical demo below.
            </p>
            <div className="learning-registration-points">
              <div><span>01</span><p>Pick your learning path</p></div>
              <div><span>02</span><p>Join its dedicated demo session</p></div>
              <div><span>03</span><p>Explore practical AI engineering</p></div>
            </div>
          </div>

          <form className="learning-form reveal" onSubmit={submitRegistration}>
            <div className="learning-form-heading">
              <span className="learning-form-kicker">FREE DEMO REGISTRATION</span>
              <h3>Save your place</h3>
              <p>Your details stay in this frontend preview and are not sent or saved.</p>
            </div>
            <div className="learning-form-row">
              <div className="learning-field">
                <label htmlFor="learning-first-name">First name <span>*</span></label>
                <input id="learning-first-name" name="firstName" autoComplete="given-name" required placeholder="First name" />
              </div>
              <div className="learning-field">
                <label htmlFor="learning-last-name">Last name <span>*</span></label>
                <input id="learning-last-name" name="lastName" autoComplete="family-name" required placeholder="Last name" />
              </div>
            </div>
            <div className="learning-field">
              <label htmlFor="learning-email">Email address <span>*</span></label>
              <input id="learning-email" name="email" type="email" autoComplete="email" required placeholder="you@example.com" />
            </div>
            <div className="learning-field">
              <label htmlFor="learning-phone">Phone number <span>*</span></label>
              <input id="learning-phone" name="phone" type="tel" autoComplete="tel" required placeholder="+92 ..." />
            </div>
            <div className="learning-form-row">
              <div className="learning-field">
                <label htmlFor="learning-status">Are you currently a student? <span>*</span></label>
                <select
                  id="learning-status"
                  name="studentStatus"
                  value={studentStatus}
                  onChange={(event) => setStudentStatus(event.target.value)}
                  required
                >
                  <option value="" disabled>Select one</option>
                  <option value="student">Yes, I am a student</option>
                  <option value="other">No</option>
                </select>
              </div>
              <div className="learning-field">
                <label htmlFor="learning-track">Choose a demo batch <span>*</span></label>
                <select
                  id="learning-track"
                  name="courseTrack"
                  value={courseTrack}
                  onChange={(event) => setCourseTrack(event.target.value)}
                  required
                >
                  <option value="" disabled>Select a free demo</option>
                  <option value="technical">Technical batch demo · Free</option>
                  <option value="non-technical">Non-technical batch demo · Free</option>
                </select>
              </div>
            </div>
            {studentStatus === "student" && (
              <div className="learning-form-row learning-student-fields">
                <div className="learning-field">
                  <label htmlFor="learning-university">University <span>*</span></label>
                  <input id="learning-university" name="university" required placeholder="Your university" />
                </div>
                <div className="learning-field">
                  <label htmlFor="learning-degree">Degree / program <span>*</span></label>
                  <input id="learning-degree" name="degree" required placeholder="e.g. BS Computer Science" />
                </div>
              </div>
            )}
            {studentStatus === "other" && (
              <div className="learning-field learning-student-fields">
                <label htmlFor="learning-organization">University or organization <small>(optional)</small></label>
                <input id="learning-organization" name="organization" placeholder="Where you study or work" />
              </div>
            )}
            <label className="learning-consent">
              <input type="checkbox" name="updatesConsent" />
              <span>I'd like to receive occasional updates about new courses, products, and FutureSort news.</span>
            </label>
            <button type="submit" className="btn btn-primary learning-submit">
              Register for the free demo <Icon name="arrow" size={17} />
            </button>
            {submitted && (
              <p className="learning-form-status" role="status">
                Your details passed the form checks, but this preview does not send or store registrations yet.
              </p>
            )}
          </form>
        </div>
      </section>

      <section className="learning-bottom-cta">
        <div className="container learning-bottom-inner reveal">
          <span className="eyebrow"><span className="eyebrow-dot" />Registrations open</span>
          <h2>Start with a free demo.</h2>
          <a className="btn btn-primary" href="#demo-registration">Choose your batch <Icon name="arrow" size={17} /></a>
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
        const stepBounds = step.querySelector(".service-timeline-number").getBoundingClientRect();
        return stepBounds.top + stepBounds.height / 2;
      });
      const gridBounds = timeline.querySelector(".service-timeline-list").getBoundingClientRect();
      rail.style.top = `${centers[0] - gridBounds.top}px`;
      rail.style.bottom = `${gridBounds.bottom - centers[centers.length - 1]}px`;
      const progress = Math.max(0, Math.min(1,
        ((window.innerHeight * 0.52) - centers[0]) /
        Math.max(1, centers[centers.length - 1] - centers[0]),
      ));
      timeline.style.setProperty("--service-progress", progress.toFixed(4));
      timeline.style.setProperty("--service-marker-position", `${progress * 100}%`);
      const nextIndex = centers.reduce((closest, center, index) =>
        Math.abs(center - window.innerHeight * 0.52) <
          Math.abs(centers[closest] - window.innerHeight * 0.52) ? index : closest,
      0);
      setActiveIndex((current) => current === nextIndex ? current : nextIndex);
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
              <span className="service-timeline-kicker">Service {item.number}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="service-timeline-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
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
        title={<>Engineering that<br /><span>moves you forward.</span></>}
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
            {projects.filter((project) => project.featured).slice(0, 3).map((project, index) => (
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

const coreTeam = [
  { name: "Jordan Blake", role: "Engineering Lead", variant: "one", initials: "JB" },
  { name: "Sam Taylor", role: "AI Systems Engineer", variant: "two", initials: "ST" },
  { name: "Avery Morgan", role: "Product Engineer", variant: "three", initials: "AM" },
  { name: "Casey Reed", role: "Delivery & Operations", variant: "four", initials: "CR" },
];

const extendedTeam = [
  { name: "Riley Parker", role: "Software Engineer", variant: "five", initials: "RP" },
  { name: "Morgan Ellis", role: "AI Product Specialist", variant: "six", initials: "ME" },
];

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

function TeamMemberCard({ member, index, extended = false }) {
  return (
    <article
      className={`team-member-card reveal${extended ? " is-extended" : ""}`}
      style={{ "--reveal-delay": `${(index % 4) * 80}ms` }}
    >
      <div className={`team-member-photo photo-${member.variant}`} role="img" aria-label="Team member image placeholder">
        <span className="team-photo-initials">{member.initials}</span>
        <span className="team-photo-placeholder">Portrait placeholder</span>
      </div>
      <div className="team-member-caption">
        <h3>{member.name}</h3>
        <p>{member.role}</p>
      </div>
    </article>
  );
}

function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Meet the team"
        title={<>The <span>masterminds.</span></>}
      >
        Meet the people behind our engineering work: a focused team building
        useful software, practical AI, and meaningful partnerships.
      </PageHero>
      <section className="team-section section-tight">
        <div className="container">
          <div className="team-section-heading reveal">
            <div>
              <span className="eyebrow"><span className="eyebrow-dot" />Core enterprise team</span>
              <h2>One team, built around delivery.</h2>
            </div>
            <span className="team-section-meta">People behind the work</span>
          </div>
          <div className="team-member-grid">
            {coreTeam.map((member, index) => (
              <TeamMemberCard member={member} index={index} key={member.name} />
            ))}
          </div>
        </div>
      </section>
      <section className="team-values-section section">
        <div className="container">
          <div className="team-values-heading reveal">
            <span className="eyebrow"><span className="eyebrow-dot" />Our core values</span>
            <h2>Principles that guide every build.</h2>
            <p>The standards behind our decisions, our collaboration, and the work we put into the world.</p>
          </div>
          <div className="team-values-grid">
            {teamValues.map((value, index) => (
              <article
                className="team-value-card reveal"
                style={{ "--reveal-delay": `${index * 75}ms` }}
                key={value.title}
              >
                <span className="team-value-icon"><Icon name={value.icon} size={19} /></span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="team-extended-section section">
        <div className="container">
          <div className="team-section-heading reveal">
            <div>
              <span className="eyebrow"><span className="eyebrow-dot" />Extended leadership</span>
              <h2>More minds, working in sync.</h2>
            </div>
            <span className="team-section-meta">A wider circle of expertise</span>
          </div>
          <div className="team-member-grid is-extended">
            {extendedTeam.map((member, index) => (
              <TeamMemberCard member={member} index={index} extended key={member.name} />
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
