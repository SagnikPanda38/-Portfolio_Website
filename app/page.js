"use client";

import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "#origin", label: "Origin" },
  { href: "#discipline", label: "Discipline" },
  { href: "#chronicle", label: "Chronicle" },
  { href: "#campaigns", label: "Campaigns" },
  { href: "#archive", label: "Archive" },
  { href: "#dispatch", label: "Dispatch" },
];

const SKILL_GROUPS = [
  {
    title: "AI, ML & Deep Learning",
    tags: [
      "PyTorch",
      "TensorFlow",
      "Deep RL (DQN)",
      "CNNs",
      "PINNs",
      "Scikit-Learn",
      "Computer Vision",
    ],
  },
  {
    title: "Languages",
    tags: ["Python", "C++", "C", "SQL", "JavaScript", "TypeScript"],
  },
  {
    title: "Core CS & Quantitative",
    tags: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Applied Mathematics",
      "Algorithmic Optimization",
    ],
  },
  {
    title: "Backend & Data Engineering",
    tags: ["Flask", "FastAPI", "REST APIs", "Microservices", "NumPy", "Pandas"],
  },
  {
    title: "Databases & Cloud",
    tags: ["SQL", "PostgreSQL", "Firebase", "Docker", "AWS", "Schema Design"],
  },
  {
    title: "Tools & Workflows",
    tags: ["Git", "GitHub", "Postman", "Linux", "Bash", "Jupyter"],
  },
];

const EXPERIENCE = [
  {
    date: "June 2026 — 15 July 2026",
    role: "Research Intern",
    org: "Department of Applied Mathematics & Scientific Computing, IIT Roorkee, India",
    points: [
      "Researched Kolmogorov-Arnold Networks (KANs) at IIT Roorkee, benchmarking them against multi-layer perceptrons for scientific computing and function approximation.",
      'Dissertation: "An Empirical Evaluation of Multi-Layer Perceptrons and Kolmogorov-Arnold Networks in Scientific Computing and Function Approximation," under Dr. Pankaj Gautam.',
    ],
  },
  {
    date: "August 2026 — Present",
    role: "Undergraduate Researcher",
    org: "SRM Institute of Science and Technology, India",
    points: [
      'Ongoing project: "Physics-Informed Neural Networks (PINNs) for Solving the Radiative Transfer Equation," under Dr. Maneesh Kumar Singh.',
    ],
  },
];

const PROJECTS = [
  {
    name: "Deep RL Urban Traffic Optimizer",
    desc: "A reinforcement learning agent that evaluates traffic states and assigns reward/penalty signals to choose optimal routing actions, evaluated against a shortest-path baseline across traffic densities.",
    metric: "15%",
    metricLabel: "lower avg. travel time",
  },
  {
    name: "X-Ray Image Classifier",
    desc: "CNN-based classifier using transfer learning to flag medical anomalies in X-ray scans, with augmentation, feature engineering and an automated inference pipeline for faster screening.",
    metric: "65%",
    metricLabel: "test-set accuracy",
  },
];

const EDUCATION = [
  {
    name: "B.Tech, Computer Science (AI & ML)",
    org: "SRM Institute of Science and Technology, India",
    year: "2024 — 2028",
    score: "CGPA 9.31 (through 4th semester)",
  },
  {
    name: "Higher Secondary Education",
    org: "Ramseth Thakur Public School",
    year: "2024",
    score: "89%",
  },
  {
    name: "Senior Secondary Education",
    org: "Apeejay Public School, Kharaghar",
    year: "2022",
    score: "96.2%",
  },
];

const CERTS = [
  "Advanced elective coursework in Quantum Computing and Artificial Neural Networks.",
  "Certification in Robotics — autonomous systems and robotic principles.",
  "Two technical workshops on Blockchain Technology — decentralized frameworks, smart contracts, cryptographic protocols.",
  "Active in technical hackathons and coding competitions.",
];

function useRevealObserver() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .archive-frame");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -60px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function Home() {
  const [splashDone, setSplashDone] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState(null);
  const heroRef = useRef(null);
  const heroImgRef = useRef(null);
  const heroColorImgRef = useRef(null);
  const heroNameRef = useRef(null);
  const sealFillRef = useRef(null);
  const sealMarkRef = useRef(null);
  const headlineRef = useRef(null);
  const portraitFrameRef = useRef(null);
  const ribbonRef = useRef(null);

  useRevealObserver();

  // Pick up whatever the pre-hydration script already set on <html>
  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "dark");
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("sp-theme", next);
      } catch (e) {}
      return next;
    });
  }

  // Splash exit
  useEffect(() => {
    const t = setTimeout(() => setSplashDone(true), 900);
    return () => clearTimeout(t);
  }, []);

  // Word-reveal headline
  useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const text = "Discipline in code. Precision in research.";
    const words = text.split(" ");
    el.innerHTML = "";
    words.forEach((word, i) => {
      const span = document.createElement("span");
      span.className = "hero-word";
      span.textContent = word + (i < words.length - 1 ? "\u00A0" : "");
      span.style.animationDelay = 0.15 + i * 0.045 + "s";
      el.appendChild(span);
    });
  }, []);

  // Scroll: seal progress + hero parallax
  useEffect(() => {
    const CIRC = 2 * Math.PI * 24;
    let raf = null;

    function update() {
      const doc = document.documentElement;
      const scrollTop = window.scrollY;
      const max = doc.scrollHeight - window.innerHeight;
      const progress = max > 0 ? Math.min(scrollTop / max, 1) : 0;

      if (sealFillRef.current) {
        sealFillRef.current.style.strokeDasharray = `${CIRC}`;
        sealFillRef.current.style.strokeDashoffset = `${CIRC * (1 - progress)}`;
      }
      if (sealMarkRef.current) {
        sealMarkRef.current.textContent = `${Math.round(progress * 100)}`;
      }

      if (heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const t = Math.min(scrollTop / heroH, 1);
        if (heroImgRef.current) {
          heroImgRef.current.style.transform = `translateY(${t * 60}px) scale(${1 + t * 0.12})`;
          heroImgRef.current.style.filter = `grayscale(1) contrast(1.05) brightness(${0.62 - t * 0.18})`;
        }
        if (heroColorImgRef.current) {
          heroColorImgRef.current.style.opacity = `${1 - t}`;
        }
      }
      raf = null;
    }

    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hero spotlight — cursor reveals colour through the ink, and gives the
  // name a subtle magnetic tilt + ember glow that follows the pointer
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    function move(e) {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX ?? (e.touches && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (x == null || y == null) return;
      const mx = ((x - rect.left) / rect.width) * 100;
      const my = ((y - rect.top) / rect.height) * 100;
      hero.style.setProperty("--mx", `${mx}%`);
      hero.style.setProperty("--my", `${my}%`);

      if (heroNameRef.current) {
        const dx = mx / 100 - 0.5; // -0.5 .. 0.5
        const dy = my / 100 - 0.5;
        heroNameRef.current.style.transform = `perspective(700px) rotateX(${dy * -6}deg) rotateY(${dx * 8}deg)`;
      }
    }

    function leave() {
      if (heroNameRef.current) {
        heroNameRef.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
      }
    }

    hero.addEventListener("pointermove", move);
    hero.addEventListener("touchmove", move, { passive: true });
    hero.addEventListener("pointerleave", leave);
    return () => {
      hero.removeEventListener("pointermove", move);
      hero.removeEventListener("touchmove", move);
      hero.removeEventListener("pointerleave", leave);
    };
  }, []);

  // Portrait tilt card — reacts to the pointer like it's catching the light,
  // and the "about me" ribbon slides in on enter / slips away on leave
  useEffect(() => {
    const frame = portraitFrameRef.current;
    const ribbon = ribbonRef.current;
    if (!frame) return;
    let outTimer = null;

    function move(e) {
      const rect = frame.getBoundingClientRect();
      const x = e.clientX ?? (e.touches && e.touches[0].clientX);
      const y = e.clientY ?? (e.touches && e.touches[0].clientY);
      if (x == null || y == null) return;
      const px = (x - rect.left) / rect.width - 0.5;
      const py = (y - rect.top) / rect.height - 0.5;
      frame.style.transform = `perspective(1000px) rotateX(${py * -10}deg) rotateY(${px * 12}deg) scale3d(1.02, 1.02, 1.02)`;
    }

    function enter() {
      if (!ribbon) return;
      clearTimeout(outTimer);
      ribbon.classList.remove("out");
      // force reflow so the enter transition always plays from the top
      void ribbon.offsetWidth;
      ribbon.classList.add("in");
    }

    function leave() {
      frame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      if (!ribbon) return;
      ribbon.classList.remove("in");
      ribbon.classList.add("out");
      outTimer = setTimeout(() => ribbon.classList.remove("out"), 550);
    }

    frame.addEventListener("pointerenter", enter);
    frame.addEventListener("pointermove", move);
    frame.addEventListener("touchstart", enter, { passive: true });
    frame.addEventListener("touchmove", move, { passive: true });
    frame.addEventListener("pointerleave", leave);
    frame.addEventListener("touchend", leave);
    return () => {
      clearTimeout(outTimer);
      frame.removeEventListener("pointerenter", enter);
      frame.removeEventListener("pointermove", move);
      frame.removeEventListener("touchstart", enter);
      frame.removeEventListener("touchmove", move);
      frame.removeEventListener("pointerleave", leave);
      frame.removeEventListener("touchend", leave);
    };
  }, []);

  return (
    <>
      {!splashDone && (
        <div className="splash">
          <div className="splash-panel" />
          <div className="splash-panel" />
          <div className="splash-panel" />
          <div className="splash-panel" />
          <div className="splash-panel" />
        </div>
      )}

      {/* Scroll seal */}
      <div className="seal" aria-hidden="true">
        <svg viewBox="0 0 54 54">
          <circle className="seal-track" cx="27" cy="27" r="24" />
          <circle ref={sealFillRef} className="seal-fill" cx="27" cy="27" r="24" />
        </svg>
        <span ref={sealMarkRef} className="seal-mark">0</span>
      </div>

      {/* Nav */}
      <header className="nav">
        <a href="#top" className="nav-mark">
          S<span>P</span>.
        </a>
        <div className="nav-right">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
            aria-pressed={theme === "light"}
          >
            <span className="theme-toggle-knob">
              {theme === "light" ? (
                <svg viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="4.5" fill="currentColor" />
                  <g stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                    <path d="M12 2v2.2M12 19.8V22M22 12h-2.2M4.2 12H2M19.1 4.9l-1.6 1.6M6.5 17.5l-1.6 1.6M19.1 19.1l-1.6-1.6M6.5 6.5 4.9 4.9" />
                  </g>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z"
                    fill="currentColor"
                  />
                </svg>
              )}
            </span>
          </button>
          <button
            className={`burger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span className="bar" />
            <span className="bar" />
          </button>
        </div>
      </header>

      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <div className="menu-links">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
        </div>
        <div className="menu-foot">
          <a href="mailto:sagnikpanda38@gmail.com">sagnikpanda38@gmail.com</a>
          <a href="tel:+917300763896">+91 73007 63896</a>
          <a href="https://github.com/Sagnikpanda38" target="_blank" rel="noreferrer">
            github.com/Sagnikpanda38
          </a>
        </div>
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="hero" ref={heroRef}>
          <div className="hero-img-layer">
            <img
              ref={heroImgRef}
              className="hero-img"
              src="/images/ronin.jpg"
              alt="Ink-toned illustration of a lone ronin beneath a crimson sun, crows scattering overhead"
            />
            <img
              ref={heroColorImgRef}
              className="hero-img-color"
              src="/images/ronin.jpg"
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="hero-sun" aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />

          <div className="hero-content">
            <div className="eyebrow">AI / ML Researcher — Portfolio</div>
            <div className="hero-name-wrap">
              <div className="hero-name-glow" aria-hidden="true" />
              <h1 className="hero-name" ref={heroNameRef}>
                Sagnik Panda
              </h1>
            </div>
            <p className="hero-tagline" ref={headlineRef} />
            <p className="hero-sub">
              CS undergraduate at SRM (AI &amp; ML) — I spend most of my time
              getting deep learning and scientific computing systems to hold
              up outside the notebook, from physics-informed networks to
              reinforcement-learned agents.
            </p>
            <div className="hero-currently">
              <span className="hero-currently-dot" />
              Currently researching PINNs for the radiative transfer equation
              at SRM
            </div>
            <div className="hero-meta">
              <span><b>CGPA</b> 9.31</span>
              <span><b>Focus</b> Deep Learning · PINNs · RL</span>
              <span><b>Based in</b> India</span>
            </div>
          </div>

          <div className="hero-scroll" aria-hidden="true">
            <span>Scroll</span>
            <div className="hero-scroll-line" />
          </div>
        </section>

        {/* ORIGIN / ABOUT */}
        <section id="origin" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="eyebrow">Origin</div>
              <h2 className="section-title">
                Quantitative <em>problem-solving</em>, applied without ceremony.
              </h2>
            </div>
            <div className="about-grid">
              <p className="about-text reveal reveal-delay-1">
                Somewhere between a physics-informed neural network and a
                traffic simulation, I found the part of computer science I
                actually want to do — the messy, iterative work of making a
                model earn its numbers instead of just posting them. I&apos;m
                <strong> Sagnik</strong>, a CS undergraduate specializing in AI
                &amp; ML, and most of what I build gets evaluated, broken, and
                rebuilt before it gets shipped anywhere near a benchmark.
              </p>
              <div className="stat-list reveal reveal-delay-2">
                <div className="stat">
                  <div className="stat-num">9.31</div>
                  <div className="stat-label">CGPA · 4 semesters</div>
                </div>
                <div className="stat">
                  <div className="stat-num">2</div>
                  <div className="stat-label">Active research tracks</div>
                </div>
                <div className="stat">
                  <div className="stat-num">15%</div>
                  <div className="stat-label">Travel-time reduction, RL agent</div>
                </div>
                <div className="stat">
                  <div className="stat-num">2028</div>
                  <div className="stat-label">Expected graduation</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* DISCIPLINE / SKILLS */}
        <section id="discipline" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="eyebrow">Discipline</div>
              <h2 className="section-title">
                Tools kept <em>sharp</em>, used deliberately.
              </h2>
              <p className="section-note">
                Machine Learning · Deep Learning · Reinforcement Learning ·
                Applied Mathematics · Scientific Computing
              </p>
            </div>
            <div className="skill-groups">
              {SKILL_GROUPS.map((g, i) => (
                <div className={`skill-card reveal reveal-delay-${(i % 3) + 1}`} key={g.title}>
                  <div className="skill-card-title">{g.title}</div>
                  <div className="tag-list">
                    {g.tags.map((t) => (
                      <span className="tag" key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CHRONICLE / EXPERIENCE */}
        <section id="chronicle" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="eyebrow">Chronicle</div>
              <h2 className="section-title">
                Where the <em>research</em> happened.
              </h2>
            </div>
            <div className="timeline">
              {EXPERIENCE.map((e, i) => (
                <div className={`timeline-item reveal reveal-delay-${i + 1}`} key={e.role}>
                  <div className="timeline-dot" />
                  <span className="timeline-date">{e.date}</span>
                  <div className="timeline-role">{e.role}</div>
                  <div className="timeline-org">{e.org}</div>
                  <ul className="timeline-list">
                    {e.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAMPAIGNS / PROJECTS */}
        <section id="campaigns" className="section">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="eyebrow">Campaigns</div>
              <h2 className="section-title">
                Built, tested, <em>measured</em>.
              </h2>
            </div>
            <div className="project-list reveal">
              {PROJECTS.map((p) => (
                <div className="project-card" key={p.name}>
                  <div className="project-name">{p.name}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-metric">
                    <div className="project-metric-num">{p.metric}</div>
                    <div className="project-metric-label">{p.metricLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARCHIVE — second image + education + certs */}
        <section id="archive" className="archive">
          <div className="wrap">
            <div className="section-head reveal">
              <div className="eyebrow">Archive</div>
              <h2 className="section-title">
                Records &amp; <em>credentials</em>.
              </h2>
            </div>
            <div className="archive-grid">
              <div className="portrait-col">
                <div className="tilt-wrap">
                  <div className="archive-frame" ref={portraitFrameRef}>
                    <img
                      className="archive-img"
                      src="/images/portrait.jpg"
                      alt="Sagnik Panda"
                    />
                    <span className="portrait-ribbon" ref={ribbonRef}>
                      Off the clock, still asking why it broke
                      <br />
                      &amp; whether it&apos;ll break again
                    </span>
                  </div>
                </div>
                <span className="portrait-caption">Fig. 01 — Sagnik, off the clock</span>
              </div>

              <div>
                <p className="archive-intro reveal">
                  Outside of notebooks and dissertations, I&apos;m the same
                  person who&apos;ll poke at a system until I understand why it
                  behaves the way it does — on a hike, in a hackathon room, or
                  wherever the wifi happens to hold.
                </p>
                <div className="mini-title reveal">Education</div>
                <div className="edu-list reveal">
                  {EDUCATION.map((e) => (
                    <div className="edu-item" key={e.name}>
                      <div className="edu-top">
                        <div className="edu-name">{e.name}</div>
                        <div className="edu-year">{e.year}</div>
                      </div>
                      <div className="edu-org">{e.org}</div>
                      <div className="edu-score">{e.score}</div>
                    </div>
                  ))}
                </div>

                <div className="mini-title reveal">Certifications &amp; Activities</div>
                <ul className="mini-list reveal">
                  {CERTS.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* DISPATCH / CONTACT */}
        <section id="dispatch" className="dispatch">
          <div className="wrap">
            <div className="reveal">
              <div className="eyebrow" style={{ justifyContent: "center" }}>Dispatch</div>
              <h2 className="dispatch-title">
                Open to <em>ML &amp; analytics</em> internships.
              </h2>
              <p className="dispatch-sub">
                Reach out about internships, research collaborations, or
                anything at the intersection of deep learning and scientific
                computing.
              </p>
              <a className="dispatch-cta" href="mailto:sagnikpanda38@gmail.com">
                <span>sagnikpanda38@gmail.com</span>
                <span className="dispatch-cta-icon">
                  <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
                    <path d="M5 13L13 5M13 5H6M13 5V12" stroke="#EDE9E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <div className="dispatch-meta">
                <a href="tel:+917300763896">+91 73007 63896</a>
                <a href="https://linkedin.com/in/sagnikpanda" target="_blank" rel="noreferrer">linkedin.com/in/sagnikpanda</a>
                <a href="https://github.com/Sagnikpanda38" target="_blank" rel="noreferrer">github.com/Sagnikpanda38</a>
              </div>
            </div>
          </div>
        </section>

        <footer className="foot">
          <span>© {new Date().getFullYear()} Sagnik Panda</span>
          <span>Built with Next.js</span>
        </footer>
      </main>
    </>
  );
}