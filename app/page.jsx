"use client";

import { useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Yashana Polymers — Landing Page                                    */
/*  Brand colours (from packaging):                                    */
/*    Navy  #161C6E   Teal #00A896   Cyan #00B3DF                       */
/*  Fonts are wired in app/layout.jsx via CSS variables:               */
/*    --font-body (Outfit)  --font-display (Barlow Condensed)          */
/* ------------------------------------------------------------------ */

const display = "font-[family-name:var(--font-display)]";

const NAV = [
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Quality", href: "#quality" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

const PRODUCTS = [
  {
    code: "PC",
    img: "/pc-granules.webp",
    name: "Polycarbonate",
    accent: "from-[#00B3DF] to-[#0077B6]",
    tagline: "Clarity meets toughness",
    desc: "A transparent engineering thermoplastic with outstanding impact strength and heat resistance — the go-to choice where parts must be strong, clear and stable.",
    props: ["Exceptional impact strength", "High optical clarity", "Good heat resistance", "Dimensional stability"],
    uses: ["Lighting diffusers", "Electrical housings", "Automotive parts", "Appliance components"],
  },
  {
    code: "ABS",
    img: "/abs-granules.webp",
    name: "Acrylonitrile Butadiene Styrene",
    accent: "from-[#00A896] to-[#00796B]",
    tagline: "The all-rounder for moulding",
    desc: "Tough, rigid and easy to process, ABS delivers a fine surface finish and takes colour beautifully — ideal for high-volume consumer and industrial moulding.",
    props: ["Excellent surface finish", "Easy to process & colour", "Good toughness & rigidity", "Cost-effective"],
    uses: ["Appliance housings", "Automotive interiors", "Consumer electronics", "Toys & luggage"],
  },
  {
    code: "PBT",
    img: "/pbt-granules.webp",
    name: "Polybutylene Terephthalate",
    accent: "from-[#2B37A8] to-[#161C6E]",
    tagline: "Built for electricals",
    desc: "A semi-crystalline polyester known for electrical insulation, chemical resistance and low moisture uptake — trusted for precision electrical and automotive parts.",
    props: ["Excellent electrical insulation", "Chemical resistance", "Low moisture absorption", "Precise, stable moulding"],
    uses: ["Connectors & switches", "Relays & bobbins", "Automotive electricals", "Sensor housings"],
  },
];

// Counter stats below the hero
const STATS = [
  { value: 200, suffix: "+", label: "Regular clients", icon: "users" },
  { value: 430, suffix: "+", label: "Cities across India", icon: "pin" },
  { value: 500, suffix: "+", unit: "MT", label: "Production capacity", icon: "gear" },
  { value: 100, suffix: "+", label: "Polymer grades", icon: "box" },
];

const COMPARE = [
  { prop: "Impact strength", PC: 5, ABS: 4, PBT: 3 },
  { prop: "Transparency", PC: 5, ABS: 1, PBT: 1 },
  { prop: "Heat resistance", PC: 4, ABS: 3, PBT: 4 },
  { prop: "Chemical resistance", PC: 2, ABS: 3, PBT: 5 },
  { prop: "Electrical insulation", PC: 4, ABS: 3, PBT: 5 },
  { prop: "Surface finish", PC: 4, ABS: 5, PBT: 4 },
  { prop: "Ease of processing", PC: 3, ABS: 5, PBT: 4 },
];

const INDUSTRIES = [
  { name: "Electrical & Switchgear", icon: "bolt", from: "#FBBF24", to: "#EA580C", text: "Switches, MCB parts, connectors and insulating components." },
  { name: "Automotive", icon: "car", from: "#FB7185", to: "#BE123C", text: "Interior trims, lamp housings and under-hood electricals." },
  { name: "Home Appliances", icon: "home", from: "#A78BFA", to: "#6D28D9", text: "Housings, panels and functional parts for everyday devices." },
  { name: "LED & Lighting", icon: "bulb", from: "#38BDF8", to: "#0369A1", text: "Diffusers, covers and heat-tolerant fixture components." },
  { name: "Consumer Electronics", icon: "chip", from: "#818CF8", to: "#3730A3", text: "Casings, chargers and accessory mouldings." },
  { name: "Industrial & Packaging", icon: "box", from: "#34D399", to: "#047857", text: "Durable parts, fixtures and engineered components." },
];

const VALUES = [
  { title: "Sustainable", icon: "leaf", text: "Responsible material practices backed by our ISO 14001:2015 environmental management certification." },
  { title: "Innovative", icon: "bulb", text: "Grades and colour solutions developed around what your moulding line actually needs." },
  { title: "Reliable", icon: "shield", text: "Consistent quality, batch after batch — with every bag coded for full traceability." },
  { title: "Responsible", icon: "gear", text: "RoHS-compliant materials and transparent dealings with every customer and partner." },
];

const CERTS = [
  { title: "ISO 9001:2015", sub: "Quality Management System" },
  { title: "ISO 14001:2015", sub: "Environmental Management System" },
  { title: "RoHS Compliant", sub: "Restriction of Hazardous Substances" },
  { title: "Fire Retardant", sub: "FR grades available on request" },
  { title: "Make in India", sub: "Proudly manufactured in Delhi" },
];

const STEPS = [
  { n: "01", icon: "mail", title: "Share your requirement", text: "Tell us the polymer, grade, colour code and monthly volume you need." },
  { n: "02", icon: "bulb", title: "Grade recommendation", text: "Our team suggests the right material for your part and process." },
  { n: "03", icon: "shield", title: "Quality check", text: "Each lot is checked before packing so your line runs without surprises." },
  { n: "04", icon: "box", title: "Packed & coded", text: "Sealed 25 kg bags marked with grade, batch number and colour code." },
  { n: "05", icon: "truck", title: "On-time dispatch", text: "Prompt delivery from Delhi to manufacturers across India." },
];

const FAQS = [
  { q: "Which materials do you supply?", a: "We specialise in three engineering polymers — PC (Polycarbonate), ABS and PBT — in a range of grades and colours." },
  { q: "How is the material packed?", a: "Material is supplied in sealed 25 kg bags. Every bag carries the grade, batch number and colour code so you can trace each lot." },
  { q: "Can you match a specific colour?", a: "Yes. Share your colour code or a reference sample and our team will work with you on a matching solution." },
  { q: "Do you offer fire-retardant grades?", a: "FR grades are available on request. Tell us your application and required rating and we'll confirm availability." },
  { q: "Can I get technical data before ordering?", a: "Absolutely. Share the grade you're interested in and we'll provide the relevant technical details and guidance." },
  { q: "How do I place an order or ask for a quote?", a: "Call us, email us or use the enquiry form on this page — we usually respond within one working day." },
];

/* ------------------------------ Icons ------------------------------ */

function Icon({ name, className = "h-6 w-6" }) {
  const p = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    bolt: <path {...p} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
    car: <g {...p}><path d="M5 16h14M3 16v-3l2-5h14l2 5v3" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></g>,
    home: <g {...p}><path d="m3 11 9-7 9 7" /><path d="M5 10v10h14V10" /><path d="M10 20v-6h4v6" /></g>,
    bulb: <g {...p}><path d="M9 18h6M10 21h4" /><path d="M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3Z" /></g>,
    chip: <g {...p}><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" /></g>,
    box: <g {...p}><path d="m3 7 9-4 9 4-9 4-9-4Z" /><path d="M3 7v10l9 4 9-4V7M12 11v10" /></g>,
    leaf: <g {...p}><path d="M5 19c0-9 6-14 15-14 0 9-5 15-14 15" /><path d="M5 19 14 10" /></g>,
    shield: <g {...p}><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3Z" /><path d="m8.5 12 2.5 2.5 4.5-5" /></g>,
    gear: <g {...p}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" /></g>,
    check: <path {...p} d="m5 12 4.5 4.5L19 7" />,
    phone: <path {...p} d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />,
    mail: <g {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></g>,
    users: <g {...p}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20a6.5 6.5 0 0 1 13 0" /><path d="M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6.5 6.5 0 0 1 3.5 6" /></g>,
    truck: <g {...p}><path d="M3 6h11v10H3z" /><path d="M14 9h4l3 3v4h-7" /><circle cx="7" cy="17.5" r="1.8" /><circle cx="17" cy="17.5" r="1.8" /></g>,
    pin: <g {...p}><path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12Z" /><circle cx="12" cy="9" r="2.5" /></g>,
    globe: <g {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3Z" /></g>,
    arrow: <path {...p} d="M5 12h14M13 6l6 6-6 6" />,
    plus: <path {...p} d="M12 5v14M5 12h14" />,
    menu: <path {...p} d="M4 7h16M4 12h16M4 17h16" />,
    close: <path {...p} d="M6 6l12 12M18 6 6 18" />,
    award: <g {...p}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></g>,
    tag: <g {...p}><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.5" /></g>,
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[name]}</svg>;
}

/* ------------------------------ Logo ------------------------------- */

function Logo({ light = false, className = "h-11 w-auto" }) {
  const ink = light ? "#FFFFFF" : "#161C6E";
  return (
    <svg viewBox="0 0 130 80" className={className} aria-label="Yashana Polymers logo">
      <path d="M10 44c8 16 40 24 70 20" fill="none" stroke={ink} strokeWidth="5" strokeLinecap="round" />
      <path d="M17 39c7 11 32 17 56 15" fill="none" stroke={ink} strokeWidth="3.6" strokeLinecap="round" />
      <path d="M25 34c6 7 22 11 40 10" fill="none" stroke={ink} strokeWidth="2.6" strokeLinecap="round" />
      <path d="M84 30c24 2 38 14 26 34" fill="none" stroke="#00B3DF" strokeWidth="7" strokeLinecap="round" />
      <path d="M33 16l1.6 4.4L39 22l-4.4 1.6L33 28l-1.6-4.4L27 22l4.4-1.6Z" fill={ink} />
      <text x="42" y="46" fontSize="44" fontWeight="900" fontStyle="italic" fill={ink} fontFamily="Arial Black, Arial, sans-serif" letterSpacing="-3">
        YP
      </text>
    </svg>
  );
}

function Wordmark({ light = false }) {
  return (
    <div className="leading-none">
      <div className={`${display} text-xl font-extrabold italic tracking-wide ${light ? "text-white" : "text-[#161C6E]"}`}>
        YASHANA <span className="font-semibold text-[#00B3DF]">POLYMERS</span>
      </div>
    </div>
  );
}

/* ---------------------------- Helpers ----------------------------- */

function SectionTag({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] ${
        light ? "bg-white/10 text-[#7FE3F7] ring-1 ring-white/20" : "bg-[#00A896]/10 text-[#00A896] ring-1 ring-[#00A896]/20"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
}

function Heading({ tag, title, sub, light = false, center = true }) {
  return (
    <div className={`mx-auto max-w-7xl ${center ? "text-center" : ""}`}>
      <SectionTag light={light}>{tag}</SectionTag>
      <h2 className={`${display} mt-5 text-4xl font-bold uppercase leading-[1.05] tracking-tight sm:text-5xl lg:whitespace-nowrap xl:text-6xl ${light ? "text-white" : "text-[#161C6E]"}`}>
        {title}
      </h2>
      {sub && <p className={`mt-5 max-w-3xl text-lg leading-relaxed ${center ? "mx-auto" : ""} ${light ? "text-white/70" : "text-slate-600"}`}>{sub}</p>}
    </div>
  );
}

function Reveal({ children, className = "", delay = 0 }) {
  return (
    <div className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

/* ============================ SECTIONS ============================ */

/* 1. Navbar */
function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-[#161C6E]/10" : "border-b border-slate-100"}`}>
      {/* Top bar */}
      <div className="bg-[#0E1352] text-xs text-white/80">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href="tel:+919217958610" className="inline-flex items-center gap-1.5 transition hover:text-[#7FE3F7]">
              <Icon name="phone" className="h-3.5 w-3.5 text-[#00B3DF]" />
              +91 92179 58610
            </a>
            <a href="mailto:Yashanapolymers1326@gmail.com" className="hidden items-center gap-1.5 transition hover:text-[#7FE3F7] sm:inline-flex">
              <Icon name="mail" className="h-3.5 w-3.5 text-[#00B3DF]" />
              Yashanapolymers1326@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-5">
            <span className="hidden items-center gap-1.5 md:inline-flex">
              <Icon name="pin" className="h-3.5 w-3.5 text-[#00B3DF]" />
              Delhi, India
            </span>
            <span className="inline-flex items-center gap-1.5 font-medium text-white">
              <Icon name="award" className="h-3.5 w-3.5 text-[#00A896]" />
              ISO 9001 &amp; 14001 Certified
            </span>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <Logo className="h-10 w-auto" />
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm font-medium text-slate-700 transition hover:text-[#00B3DF]">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <a href="#contact" className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#00A896]/30 transition hover:shadow-[#00B3DF]/50">
            Get a Quote
            <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        <button onClick={() => setOpen(!open)} className="rounded-lg p-2 text-[#161C6E] lg:hidden" aria-label="Toggle menu">
          <Icon name={open ? "close" : "menu"} />
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-6 pt-2 shadow-xl lg:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block rounded-lg px-3 py-3 font-medium text-slate-700 hover:bg-slate-50">
              {n.label}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="mt-3 block rounded-full bg-[#161C6E] px-5 py-3 text-center font-semibold text-white">
            Get a Quote
          </a>
        </div>
      )}
    </header>
  );
}

/* 2. Hero — full-width banner (separate art for mobile & desktop) */
function Hero() {
  return (
    <section id="top" className="relative bg-white pt-[100px]">
      <h1 className="sr-only">Yashana Polymers — High performance PC, ABS and PBT polymer granules manufacturer</h1>
      <div className="relative">
        <picture>
          <source media="(min-width: 768px)" srcSet="/desktopbanner.png" width="1942" height="809" />
          <img
            src="/mobilebanner.png"
            width="1122"
            height="1402"
            alt="Yashana Polymers 25 kg bags of PC, ABS and PBT granules — premium quality, consistent supply, industrial grade, wide range of applications"
            className="block h-auto w-full"
            fetchPriority="high"
          />
        </picture>
        {/* clickable area over the "Explore Products" button baked into each banner */}
        <a href="#products" aria-label="Explore Products" className="absolute left-[6.2%] top-[37.7%] h-[4.4%] w-[31.7%] rounded-full md:hidden" />
        <a href="#products" aria-label="Explore Products" className="absolute left-[3.1%] top-[64.4%] hidden h-[7.3%] w-[17.2%] rounded-full md:block" />
      </div>
    </section>
  );
}

/* 3. Trust marquee */
function TrustStrip() {
  const items = ["ISO 9001:2015", "ISO 14001:2015", "RoHS Compliant", "Fire Retardant Grades", "Make in India", "25 kg Sealed Bags", "Batch Traceability", "Custom Colour Codes"];
  return (
    <section className="border-y border-slate-100 bg-white py-6">
      <div className="marquee-mask overflow-hidden">
        <div className="marquee flex w-max gap-12">
          {[...items, ...items].map((t, i) => (
            <span key={i} className={`${display} flex items-center gap-3 whitespace-nowrap text-xl font-semibold uppercase tracking-wider text-[#161C6E]/70`}>
              <span className="h-2 w-2 rotate-45 bg-[#00A896]" />
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 3b. Counter stats */
function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(value);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (t) => {
          const k = Math.min((t - start) / 1600, 1);
          setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

function Stats() {
  return (
    <section className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-[#F2FAFD] to-white pb-8 pt-10 sm:pb-12 sm:pt-16 lg:pb-14 lg:pt-20">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#00B3DF]/10 blur-[100px]" />
        <div className="absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#00A896]/10 blur-[100px]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-x-3 gap-y-8 px-4 sm:gap-y-12 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((s, i) => (
          <div key={s.label} className={`flex flex-col items-center text-center sm:px-4 ${i > 0 ? "lg:border-l lg:border-slate-200" : ""}`}>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#00A896] to-[#00B3DF] text-white shadow-lg shadow-[#00B3DF]/30 sm:h-12 sm:w-12">
              <Icon name={s.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <p className={`${display} mt-3 flex items-start justify-center whitespace-nowrap text-4xl font-bold leading-none text-[#161C6E] sm:mt-4 sm:text-6xl`}>
              <Counter value={s.value} suffix={s.suffix} />
              {s.unit && (
                <span className="ml-1 rounded-md bg-[#00A896]/10 px-1.5 py-0.5 font-[family-name:var(--font-body)] text-[10px] font-bold uppercase tracking-wider text-[#00A896] sm:ml-1.5 sm:text-xs">
                  {s.unit}
                </span>
              )}
            </p>
            <p className="mt-2 text-[11px] font-medium uppercase leading-snug tracking-wider text-slate-500 sm:text-sm">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* 4. About */
function About() {
  return (
    <section id="about" className="relative bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <Reveal>
          <SectionTag>About Us</SectionTag>
          <h2 className={`${display} mt-5 text-4xl font-bold uppercase leading-[1.05] text-[#161C6E] sm:text-5xl lg:text-6xl`}>
            Your trusted partner in engineering plastics
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-slate-600">
            Based in Delhi, Yashana Polymers is a focused manufacturer and supplier of engineering thermoplastics. We concentrate on what we know best — Polycarbonate, ABS and PBT — so every grade we deliver meets the standards our customers depend on.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-slate-600">
            From the first enquiry to the final dispatch, we keep things simple: the right material, consistent quality, clear documentation and on-time delivery.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {["Focused PC, ABS & PBT portfolio", "ISO 9001 & 14001 certified", "RoHS-compliant materials", "Batch-coded 25 kg packing"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A896] text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="font-medium text-slate-700">{t}</span>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={120} className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#00B3DF]/20 to-[#00A896]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] bg-white shadow-2xl shadow-[#161C6E]/15 ring-1 ring-slate-200">
            <img
              src="/about.webp"
              width="1600"
              height="1134"
              loading="lazy"
              alt="Yashana Polymers 25 kg packaging for PC, ABS and PBT granules"
              className="block h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-8 left-4 rounded-3xl bg-white p-5 shadow-2xl shadow-[#161C6E]/15 ring-1 ring-slate-100 sm:-left-8 sm:p-6">
            <div className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00A896]/10 text-[#00A896] sm:h-14 sm:w-14">
                <Icon name="award" className="h-7 w-7" />
              </span>
              <div>
                <p className="font-bold text-[#161C6E]">Dual ISO Certified</p>
                <p className="text-sm text-slate-500">Quality + Environment</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 5. Products */
function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-white pb-24 pt-12 lg:pb-32 lg:pt-16">
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-[#00B3DF]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Our Materials" title="Three polymers. Endless possibilities." sub="Carefully selected engineering thermoplastics for moulders who demand consistency, performance and a flawless finish." />

        <div className="mt-16 divide-y divide-slate-200 lg:mt-20">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.code}>
              <article className={`group flex flex-col items-center gap-10 py-14 first:pt-0 last:pb-0 lg:gap-20 lg:py-20 ${i % 2 ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
                {/* image */}
                <div className="relative w-full lg:w-1/2">
                  <div className={`absolute inset-x-8 inset-y-10 rounded-full bg-gradient-to-br ${p.accent} opacity-[0.15] blur-3xl transition duration-700 group-hover:opacity-25`} />
                  <span className={`${display} pointer-events-none absolute -top-6 select-none text-[9rem] font-bold leading-none text-[#161C6E]/[0.05] sm:text-[12rem] ${i % 2 ? "right-0" : "left-0"}`} aria-hidden="true">
                    {p.code}
                  </span>
                  <img
                    src={p.img}
                    width="1000"
                    height="812"
                    loading="lazy"
                    alt={`${p.name} (${p.code}) granules`}
                    className="relative mx-auto w-full max-w-lg transition duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                {/* content */}
                <div className="w-full lg:w-1/2">
                  <div className="flex items-baseline gap-4">
                    <span className={`${display} text-lg font-bold text-[#00A896]`}>0{i + 1}</span>
                    <span className="h-px w-12 bg-[#00A896]/40" />
                    <span className="text-sm font-semibold uppercase tracking-widest text-slate-400">{p.name}</span>
                  </div>
                  <h3 className={`${display} mt-4 text-6xl font-bold uppercase leading-none sm:text-7xl`}>
                    <span className={`bg-gradient-to-r ${p.accent} bg-clip-text text-transparent`}>{p.code}</span>
                  </h3>
                  <p className="mt-3 text-2xl font-bold text-[#161C6E]">{p.tagline}</p>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-600">{p.desc}</p>

                  <ul className="mt-8 grid max-w-xl gap-x-8 gap-y-3 sm:grid-cols-2">
                    {p.props.map((x) => (
                      <li key={x} className="flex items-center gap-2.5 text-slate-700">
                        <Icon name="check" className="h-5 w-5 shrink-0 text-[#00A896]" />
                        {x}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-400">Used in</p>
                  <p className="mt-2 max-w-xl font-medium text-[#161C6E]">{p.uses.join("  ·  ")}</p>

                  <a href="#contact" className="mt-8 inline-flex items-center gap-2 border-b-2 border-[#00A896] pb-1 font-semibold text-[#161C6E] transition hover:gap-3 hover:text-[#00A896]">
                    Enquire about {p.code}
                    <Icon name="arrow" className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 6. Material guide — radar comparison */
const POLY_COLORS = { PC: "#00B3DF", ABS: "#00A896", PBT: "#2B37A8" };

function Radar({ focus }) {
  const cx = 220, cy = 210, R = 130, n = COMPARE.length;
  const pt = (i, r) => {
    const a = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
  };
  const poly = (fn) => COMPARE.map((row, i) => pt(i, fn(row)).join(",")).join(" ");

  return (
    <svg viewBox="-70 0 580 420" className="w-full" role="img" aria-label="Radar chart comparing PC, ABS and PBT across seven properties">
      {[1, 2, 3, 4, 5].map((l) => (
        <polygon key={l} points={poly(() => (R * l) / 5)} fill={l % 2 ? "#F8FAFC" : "#fff"} stroke="#E2E8F0" />
      ))}
      {COMPARE.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#E2E8F0" />;
      })}

      <g className="radar-shapes">
        {PRODUCTS.map((p) => {
          const on = !focus || focus === p.code;
          return (
            <polygon
              key={p.code}
              points={poly((row) => (R * row[p.code]) / 5)}
              fill={POLY_COLORS[p.code]}
              fillOpacity={focus === p.code ? 0.35 : on ? 0.14 : 0.04}
              stroke={POLY_COLORS[p.code]}
              strokeOpacity={on ? 1 : 0.2}
              strokeWidth={focus === p.code ? 3 : 2}
              strokeLinejoin="round"
              className="transition-all duration-500"
            />
          );
        })}
        {focus &&
          COMPARE.map((row, i) => {
            const [x, y] = pt(i, (R * row[focus]) / 5);
            return <circle key={i} cx={x} cy={y} r="4.5" fill="#fff" stroke={POLY_COLORS[focus]} strokeWidth="2.5" />;
          })}
      </g>

      {COMPARE.map((row, i) => {
        const [x, y] = pt(i, R + 30);
        const anchor = Math.abs(x - cx) < 10 ? "middle" : x > cx ? "start" : "end";
        const [first, ...rest] = row.prop.split(" ");
        return (
          <text key={row.prop} x={x} y={y - (rest.length ? 8 : -5)} textAnchor={anchor} className="fill-slate-500 text-[15px] font-semibold uppercase tracking-wide">
            <tspan x={x}>{first}</tspan>
            {rest.length > 0 && <tspan x={x} dy="18">{rest.join(" ")}</tspan>}
          </text>
        );
      })}
    </svg>
  );
}

function Compare() {
  const [focus, setFocus] = useState(null);
  const strengths = (code) =>
    [...COMPARE].filter((r) => r[code] >= 4).sort((a, b) => b[code] - a[code]).slice(0, 3).map((r) => r.prop);

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Material Guide" title="Choose the right polymer" sub="Every polymer has its own shape of strengths. Hover a material to see where it shines." />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="radar mx-auto w-full max-w-xl">
            <Radar focus={focus} />
            <div className="mt-4 flex justify-center gap-6">
              {PRODUCTS.map((p) => (
                <span key={p.code} className="inline-flex items-center gap-2 text-sm font-semibold text-[#161C6E]">
                  <span className="h-3 w-3 rounded-full" style={{ background: POLY_COLORS[p.code] }} />
                  {p.code}
                </span>
              ))}
            </div>
          </Reveal>

          <div className="divide-y divide-slate-100" onMouseLeave={() => setFocus(null)}>
            {PRODUCTS.map((p) => {
              const on = focus === p.code;
              return (
                <button
                  key={p.code}
                  type="button"
                  onMouseEnter={() => setFocus(p.code)}
                  onFocus={() => setFocus(p.code)}
                  onClick={() => setFocus(on ? null : p.code)}
                  aria-pressed={on}
                  className={`relative flex w-full items-center gap-5 py-6 pl-6 text-left transition duration-300 ${focus && !on ? "opacity-50" : ""}`}
                >
                  <span className="absolute inset-y-4 left-0 w-1 rounded-full transition-all duration-300" style={{ background: POLY_COLORS[p.code], opacity: on ? 1 : 0.25 }} />
                  <img src={p.img} width="1000" height="812" loading="lazy" alt="" className="hidden h-20 w-24 shrink-0 object-contain sm:block" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Choose</p>
                    <p className={`${display} text-4xl font-bold leading-none`} style={{ color: POLY_COLORS[p.code] }}>
                      {p.code} <span className="text-base font-semibold normal-case tracking-normal text-slate-400">· {p.tagline}</span>
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {strengths(p.code).map((x) => (
                        <span key={x} className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
                          <Icon name="check" className="h-3.5 w-3.5" />
                          {x}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Icon name="arrow" className={`h-5 w-5 shrink-0 transition ${on ? "translate-x-1 text-[#161C6E]" : "text-slate-300"}`} />
                </button>
              );
            })}
            <p className="pt-6 text-sm text-slate-400">
              Indicative ratings for general-purpose grades. Need exact values?{" "}
              <a href="#contact" className="font-semibold text-[#00A896] hover:underline">Ask for a data sheet →</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 7. Industries */
function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-18">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Industries We Serve" title="Powering the parts behind everyday life" sub="Our materials find their way into products across India's fastest-growing manufacturing sectors." />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((ind, i) => (
            <Reveal key={ind.name} delay={i * 80}>
              <div
                className="group relative h-full overflow-hidden rounded-3xl bg-white p-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(22,28,110,0.12)] ring-1 ring-slate-200/70 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-16px_rgba(22,28,110,0.18)]"
              >
                <div className="relative flex items-start justify-between">
                  <span
                    className="relative flex h-16 w-16 items-center justify-center rounded-2xl text-white transition duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                    style={{ background: `linear-gradient(135deg, ${ind.from}, ${ind.to})`, boxShadow: `0 12px 24px -8px ${ind.to}80, inset 0 1px 0 rgba(255,255,255,0.35)` }}
                  >
                    <span className="absolute inset-x-2 top-1 h-1/2 rounded-t-xl bg-gradient-to-b from-white/30 to-transparent" />
                    <Icon name={ind.icon} className="relative h-8 w-8" />
                  </span>
                  <span className={`${display} text-2xl font-bold text-slate-200 transition group-hover:text-slate-300`}>0{i + 1}</span>
                </div>

                <h3 className="relative mt-7 text-xl font-bold text-[#161C6E]">{ind.name}</h3>
                <p className="relative mt-2 leading-relaxed text-slate-600">{ind.text}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center justify-between gap-4 rounded-3xl bg-gradient-to-r from-[#E8F7FC] to-[#E6F6F3] px-8 py-6 text-center ring-1 ring-[#00B3DF]/20 sm:flex-row sm:text-left">
          <p className="text-lg font-semibold text-[#161C6E]">
            Don&apos;t see your industry? <span className="font-normal text-slate-600">We supply grades for many more applications.</span>
          </p>
          <a href="#contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-6 py-3 font-semibold text-white shadow-lg shadow-[#00B3DF]/30 transition hover:scale-[1.03]">
            Talk to us
            <Icon name="arrow" className="h-4 w-4" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* 8. Values */
function Values() {
  return (
    <section className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Our Values" title="Four promises in every bag" sub="The same four words printed on our packaging guide how we work every day." />
        <div className="mt-16 grid gap-px overflow-hidden rounded-[2rem] bg-slate-200 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 100} className="h-full">
              <div className="group relative h-full bg-white p-10 transition hover:bg-gradient-to-b hover:from-white hover:to-[#00B3DF]/5">
                <span className={`${display} absolute right-8 top-6 text-6xl font-bold text-slate-100`}>0{i + 1}</span>
                <span className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#00B3DF] text-[#161C6E] transition group-hover:bg-[#161C6E] group-hover:text-white">
                  <Icon name={v.icon} className="h-8 w-8" />
                </span>
                <h3 className={`${display} relative mt-6 text-2xl font-bold uppercase tracking-wide text-[#161C6E]`}>{v.title}</h3>
                <p className="relative mt-3 leading-relaxed text-slate-600">{v.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 9. Quality & Certifications */
function Quality() {
  return (
    <section id="quality" className="relative overflow-hidden bg-gradient-to-br from-[#00A896] to-[#008F80] py-24 lg:py-32">
      <svg className="pointer-events-none absolute -right-20 top-0 h-full w-1/2 opacity-30" viewBox="0 0 200 400" preserveAspectRatio="none" aria-hidden="true">
        <path d="M200 0 C 60 120, 40 220, 120 320 S 160 400, 100 400 L200 400Z" fill="#00B3DF" />
        <path d="M200 30 C 90 140, 80 220, 150 310 S 190 390, 160 400 L200 400Z" fill="#161C6E" />
      </svg>
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading light tag="Quality & Compliance" title="Certified to perform. Built to comply." />
        <div className="mt-16 grid items-center gap-16 lg:grid-cols-5">
        <Reveal className="lg:col-span-2">
          <p className="text-lg leading-relaxed text-white/80">
            Our management systems are certified to international standards, and our materials are RoHS compliant — giving you confidence in every batch you process.
          </p>
          <a href="#contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 font-semibold text-[#161C6E] shadow-xl transition hover:scale-[1.03]">
            Request certificates
            <Icon name="arrow" className="h-5 w-5" />
          </a>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-3">
          {CERTS.map((c, i) => (
            <Reveal key={c.title} delay={i * 80} className={i === 0 ? "sm:col-span-2" : ""}>
              <div className="flex h-full items-center gap-5 rounded-3xl bg-white/95 p-6 shadow-xl shadow-black/10 transition hover:-translate-y-1">
                <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#161C6E] text-white">
                  <span className="absolute inset-1 rounded-full border border-dashed border-white/40" />
                  <Icon name={i === 3 ? "shield" : i === 4 ? "pin" : "award"} className="h-7 w-7" />
                </span>
                <div>
                  <p className={`${display} text-2xl font-bold uppercase text-[#161C6E]`}>{c.title}</p>
                  <p className="text-sm text-slate-500">{c.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}

/* 10. Process — production-line journey */
const STEP_COLORS = ["#00B3DF", "#00A8C6", "#00A896", "#2B7FB8", "#3B46C4"];

function StepCard({ s, i }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(22,28,110,0.15)] ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(22,28,110,0.25)] hover:ring-[#00B3DF]/40">
      <span className={`${display} step-outline pointer-events-none absolute -right-2 -top-4 text-8xl font-bold leading-none`} aria-hidden="true">
        {s.n}
      </span>
      <p className="relative text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: STEP_COLORS[i] }}>
        Step {s.n}
      </p>
      <h3 className="relative mt-2 text-lg font-bold text-[#161C6E]">{s.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
      <span className="absolute bottom-0 left-6 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-16" style={{ background: STEP_COLORS[i] }} />
    </div>
  );
}

function StepNode({ s, i }) {
  return (
    <span
      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl text-white ring-8 ring-white transition duration-500 hover:rotate-6 hover:scale-110"
      style={{ background: `linear-gradient(135deg, ${STEP_COLORS[i]}, #161C6E)`, boxShadow: `0 0 0 1px ${STEP_COLORS[i]}66, 0 12px 30px -6px ${STEP_COLORS[i]}aa` }}
    >
      <Icon name={s.icon} className="h-7 w-7" />
    </span>
  );
}

function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-[#00B3DF]/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-[#3B46C4]/10 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="How We Work" title="From enquiry to your factory floor" sub="A clear, dependable process that keeps your production running on schedule." />

        {/* desktop: zig-zag cards around a flowing pipeline */}
        <Reveal className="relative mt-20 hidden lg:block">
          <div className="grid grid-cols-5 gap-x-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`flex flex-col justify-end ${i % 2 ? "invisible" : ""}`} aria-hidden={i % 2 ? true : undefined}>
                <StepCard s={s} i={i} />
                <span className="mx-auto h-8 w-px bg-gradient-to-b from-slate-300 to-transparent" />
              </div>
            ))}
          </div>

          <div className="relative my-2">
            <div className="absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200">
              <div className="pipe-flow absolute inset-0 opacity-70" />
              <span className="pipe-pellet absolute top-1/2 h-3 w-16 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-[#00B3DF] to-transparent blur-[2px]" />
            </div>
            <div className="relative grid grid-cols-5 gap-x-6">
              {STEPS.map((s, i) => (
                <div key={s.n} className="flex justify-center">
                  <StepNode s={s} i={i} />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-5 gap-x-6">
            {STEPS.map((s, i) => (
              <div key={s.n} className={`flex flex-col ${i % 2 ? "" : "invisible"}`} aria-hidden={i % 2 ? undefined : true}>
                <span className="mx-auto h-8 w-px bg-gradient-to-t from-slate-300 to-transparent" />
                <StepCard s={s} i={i} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* mobile / tablet: vertical timeline */}
        <div className="relative mt-14 lg:hidden">
          <div className="absolute bottom-8 left-8 top-8 w-1 -translate-x-1/2 overflow-hidden rounded-full bg-slate-100">
            <div className="pipe-flow-v absolute inset-0 opacity-70" />
          </div>
          <div className="space-y-6">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 80} className="relative flex items-start gap-5">
                <StepNode s={s} i={i} />
                <div className="min-w-0 flex-1">
                  <StepCard s={s} i={i} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="mt-16 flex justify-center">
          <a href="#contact" className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-7 py-4 font-semibold text-white shadow-xl shadow-[#00B3DF]/30 transition hover:scale-[1.03]">
            Start with step 01 — share your requirement
            <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* 12. Why choose us — bento + comparison */
function WhyUs() {
  const points = [
    { t: "Consistent batches", d: "Checked before packing so your moulding parameters stay stable from lot to lot.", icon: "shield", from: "#34D399", to: "#047857" },
    { t: "Responsive support", d: "Talk directly to people who understand material selection and processing.", icon: "users", from: "#A78BFA", to: "#6D28D9" },
    { t: "Full traceability", d: "Every 25 kg bag carries grade, batch number and colour code.", icon: "tag", from: "#38BDF8", to: "#0369A1" },
    { t: "Fast dispatch", d: "Delhi base for quick delivery to 430+ cities across India.", icon: "truck", from: "#FBBF24", to: "#EA580C" },
  ];
  const compare = [
    ["Specialised in PC, ABS & PBT", "Hundreds of unrelated products"],
    ["Batch-coded, sealed 25 kg bags", "Unmarked or mixed lots"],
    ["ISO 9001 & 14001 certified systems", "No certified processes"],
    ["Direct technical guidance on grades", "Sales-only contact"],
  ];
  const card = "rounded-3xl bg-white ring-1 ring-slate-200/70 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(22,28,110,0.12)]";

  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Why Yashana" title="The difference is in the details" sub="Three polymers, mastered completely — and a team that treats every bag like it's going into your own product." />

        {/* bento */}
        <div className="mt-16 grid gap-6 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className={`${card} group flex flex-col overflow-hidden lg:row-span-2`}>
            <div className="relative bg-white px-8 pt-8">
              <img src="/pbt-granules.webp" width="1000" height="812" loading="lazy" alt="Engineering polymer granules in multiple colours" className="mx-auto w-full max-w-sm transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-1 flex-col p-8 pt-4">
              <p className="text-xs font-bold uppercase tracking-widest text-[#00A896]">Focused expertise</p>
              <h3 className={`${display} mt-2 text-3xl font-bold uppercase leading-tight text-[#161C6E]`}>Three polymers. Nothing else.</h3>
              <p className="mt-3 leading-relaxed text-slate-600">We don&apos;t spread ourselves across hundreds of products — our attention stays on getting PC, ABS and PBT exactly right.</p>
              <div className="mt-auto flex gap-2 pt-6">
                {PRODUCTS.map((p) => (
                  <span key={p.code} className={`${display} rounded-full bg-slate-100 px-4 py-1.5 text-lg font-bold text-[#161C6E]`}>{p.code}</span>
                ))}
              </div>
            </div>
          </Reveal>

          {points.map((pt, i) => (
            <Reveal key={pt.t} delay={(i + 1) * 80} className={`${card} group p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_24px_48px_-16px_rgba(22,28,110,0.18)]`}>
              <span
                className="relative flex h-14 w-14 items-center justify-center rounded-2xl text-white transition duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]"
                style={{ background: `linear-gradient(135deg, ${pt.from}, ${pt.to})`, boxShadow: `0 12px 24px -8px ${pt.to}80` }}
              >
                <Icon name={pt.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-6 text-xl font-bold text-[#161C6E]">{pt.t}</h3>
              <p className="mt-2 leading-relaxed text-slate-600">{pt.d}</p>
            </Reveal>
          ))}
        </div>

        {/* comparison */}
        <Reveal className={`${card} mt-6 overflow-hidden`}>
          <div className="grid grid-cols-2 border-b border-slate-100">
            <p className="flex items-center gap-2 px-5 py-5 sm:px-8">
              <Logo className="h-7 w-auto" />
              <span className={`${display} text-xl font-bold uppercase text-[#161C6E]`}>Yashana</span>
            </p>
            <p className={`${display} border-l border-slate-100 px-5 py-5 text-xl font-bold uppercase text-slate-400 sm:px-8`}>The usual way</p>
          </div>
          {compare.map(([yes, no]) => (
            <div key={yes} className="grid grid-cols-2 border-b border-slate-100 last:border-0">
              <p className="flex items-start gap-3 px-5 py-4 font-medium text-[#161C6E] sm:px-8">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00A896] text-white">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                {yes}
              </p>
              <p className="flex items-start gap-3 border-l border-slate-100 px-5 py-4 text-slate-400 sm:px-8">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                  <Icon name="close" className="h-3.5 w-3.5" />
                </span>
                {no}
              </p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* 13. Custom grades CTA band */
function CustomCTA() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#E8F7FC] via-white to-[#E6F6F3] px-8 py-16 ring-1 ring-[#00B3DF]/20 sm:px-16 lg:py-20">
        <svg className="absolute inset-y-0 right-0 h-full w-1/3 opacity-90 sm:w-1/4" viewBox="0 0 300 300" preserveAspectRatio="none" aria-hidden="true">
          <path d="M300 0 C 120 80, 100 160, 190 230 S 240 300, 170 300 L300 300Z" fill="#00B3DF" />
          <path d="M300 0 C 170 80, 160 160, 240 230 S 280 300, 230 300 L300 300Z" fill="#00A896" />
        </svg>
        <div className="relative">
          <SectionTag>Custom Solutions</SectionTag>
          <h2 className={`${display} mt-5 text-4xl font-bold uppercase leading-[1.05] text-[#161C6E] sm:text-5xl lg:whitespace-nowrap xl:text-6xl`}>
            Need a specific grade or colour?
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-slate-600">
            From colour-matched compounds to fire-retardant grades, tell us your application and we'll help you find the right material.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-7 py-4 font-semibold text-white shadow-lg shadow-[#00B3DF]/30 transition hover:scale-[1.03]">
              Discuss your requirement
              <Icon name="arrow" className="h-5 w-5" />
            </a>
            <a href="tel:+919217958610" className="inline-flex items-center gap-2 rounded-full border border-[#161C6E]/20 bg-white px-7 py-4 font-semibold text-[#161C6E] transition hover:border-[#00A896] hover:text-[#00A896]">
              <Icon name="phone" className="h-5 w-5" />
              Call now
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* 14. FAQ */
function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" className="bg-slate-50 py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Heading tag="FAQ" title="Questions, answered" />
        <div className="mt-14 space-y-4">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`overflow-hidden rounded-2xl bg-white ring-1 transition ${isOpen ? "shadow-lg shadow-[#161C6E]/10 ring-[#00B3DF]/40" : "ring-slate-100"}`}>
                <button onClick={() => setOpen(isOpen ? -1 : i)} className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left" aria-expanded={isOpen}>
                  <span className="text-lg font-semibold text-[#161C6E]">{f.q}</span>
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition ${isOpen ? "rotate-45 bg-[#00A896] text-white" : "bg-slate-100 text-[#161C6E]"}`}>
                    <Icon name="plus" className="h-5 w-5" />
                  </span>
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-slate-600">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 15. Contact */
function Contact() {
  const [form, setForm] = useState({ name: "", company: "", phone: "", material: "PC", qty: "", message: "" });
  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const body = `Name: ${form.name}\nCompany: ${form.company}\nPhone: ${form.phone}\nMaterial: ${form.material}\nQuantity: ${form.qty}\n\n${form.message}`;
    window.location.href = `mailto:Yashanapolymers1326@gmail.com?subject=${encodeURIComponent(`Enquiry: ${form.material} — ${form.company || form.name}`)}&body=${encodeURIComponent(body)}`;
  };

  const input = "w-full rounded-xl border-0 bg-slate-50 px-4 py-3.5 text-slate-800 ring-1 ring-slate-200 transition placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00B3DF]";

  const contacts = [
    { icon: "phone", label: "Mobile", lines: [{ t: "+91 92179 58610", h: "tel:+919217958610" }, { t: "+91 98917 93980", h: "tel:+919891793980" }] },
    { icon: "mail", label: "Email", lines: [{ t: "Yashanapolymers1326@gmail.com", h: "mailto:Yashanapolymers1326@gmail.com" }] },
    { icon: "globe", label: "Website", lines: [{ t: "www.yashanapolymers.com", h: "https://www.yashanapolymers.com" }] },
    { icon: "pin", label: "Location", lines: [{ t: "Delhi, India" }] },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-[#00B3DF]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Get in Touch" title="Let's talk polymers" sub="Send us your requirement and our team will get back to you with availability and pricing." />
        <div className="mt-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-100">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00A896] to-[#00B3DF] text-white">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">{c.label}</p>
                  {c.lines.map((l) =>
                    l.h ? (
                      <a key={l.t} href={l.h} className="block break-all font-semibold text-[#161C6E] transition hover:text-[#00A896]">{l.t}</a>
                    ) : (
                      <p key={l.t} className="font-semibold text-[#161C6E]">{l.t}</p>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={submit} className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-[#161C6E]/10 ring-1 ring-slate-200 sm:p-10 lg:col-span-3">
          <h3 className={`${display} text-3xl font-bold uppercase text-[#161C6E]`}>Request a quote</h3>
          <p className="mt-1 text-slate-500">We usually reply within one working day.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <input required className={input} placeholder="Your name *" value={form.name} onChange={update("name")} />
            <input className={input} placeholder="Company" value={form.company} onChange={update("company")} />
            <input required type="tel" className={input} placeholder="Phone *" value={form.phone} onChange={update("phone")} />
            <input className={input} placeholder="Monthly quantity (kg)" value={form.qty} onChange={update("qty")} />
          </div>
          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold text-slate-600">Material of interest</p>
            <div className="grid grid-cols-4 gap-3">
              {["PC", "ABS", "PBT", "Other"].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setForm({ ...form, material: m })}
                  className={`${display} rounded-xl py-3 text-xl font-bold transition ${form.material === m ? "bg-[#161C6E] text-white shadow-lg" : "bg-slate-50 text-[#161C6E] ring-1 ring-slate-200 hover:ring-[#00B3DF]"}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <textarea rows={4} className={`${input} mt-5`} placeholder="Grade, colour code, application…" value={form.message} onChange={update("message")} />
          <button type="submit" className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-7 py-4 font-semibold text-white shadow-xl shadow-[#00B3DF]/30 transition hover:scale-[1.01]">
            Send enquiry
            <Icon name="arrow" className="h-5 w-5 transition group-hover:translate-x-1" />
          </button>
        </form>
        </div>
      </div>
    </section>
  );
}

/* 16. Footer */
function Footer() {
  return (
    <footer className="bg-[#080B36] pt-16 text-white/60">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <Logo light className="h-12 w-auto" />
            <Wordmark light />
          </div>
          <p className="mt-5 max-w-md leading-relaxed">
            Manufacturer and supplier of premium PC, ABS and PBT engineering polymers. Sustainable · Innovative · Reliable · Responsible.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["ISO 9001:2015", "ISO 14001:2015", "RoHS", "Make in India"].map((b) => (
              <span key={b} className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-white/70">{b}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-widest text-white">Explore</p>
          <ul className="mt-5 space-y-3">
            {NAV.map((n) => (
              <li key={n.href}><a href={n.href} className="transition hover:text-[#7FE3F7]">{n.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-semibold uppercase tracking-widest text-white">Contact</p>
          <ul className="mt-5 space-y-3">
            <li><a href="tel:+919217958610" className="hover:text-[#7FE3F7]">+91 92179 58610</a></li>
            <li><a href="tel:+919891793980" className="hover:text-[#7FE3F7]">+91 98917 93980</a></li>
            <li><a href="mailto:Yashanapolymers1326@gmail.com" className="break-all hover:text-[#7FE3F7]">Yashanapolymers1326@gmail.com</a></li>
            <li>Delhi, India</li>
          </ul>
        </div>
      </div>
      <div className="h-1.5 bg-gradient-to-r from-[#161C6E] via-[#00B3DF] to-[#00A896]" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm sm:flex-row sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} Yashana Polymers. All rights reserved.</p>
        <p>www.yashanapolymers.com</p>
      </div>
    </footer>
  );
}

/* ============================== PAGE ============================== */

export default function Home() {
  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden bg-white text-slate-800">
      <style>{`
        html { scroll-behavior: smooth; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .reveal.in { opacity: 1; transform: none; }
        .radar-shapes { transform: scale(0); transform-origin: 220px 210px; transition: transform 1.1s cubic-bezier(.2,.8,.2,1) .2s; }
        .radar.in .radar-shapes { transform: none; }
        .step-outline { color: transparent; -webkit-text-stroke: 1px rgba(22,28,110,.08); }
        .pipe-flow { background: repeating-linear-gradient(90deg, #00B3DF 0 14px, transparent 14px 28px); animation: pipe 1.2s linear infinite; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
        .pipe-flow-v { background: repeating-linear-gradient(180deg, #00B3DF 0 10px, transparent 10px 20px); animation: pipev 1s linear infinite; }
        @keyframes pipe { to { background-position: 28px 0; } }
        @keyframes pipev { to { background-position: 0 20px; } }
        .pipe-pellet { animation: pellet-run 4s cubic-bezier(.45,0,.55,1) infinite; }
        @keyframes pellet-run { from { left: -4rem; } to { left: 100%; } }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100% { transform: translateY(0) rotate(-1.5deg); } 50% { transform: translateY(-14px) rotate(1deg); } }
        .pellet { animation: pellet 7s ease-in-out infinite; box-shadow: 0 0 20px currentColor; }
        @keyframes pellet { 0%,100% { transform: translate(0,0); } 50% { transform: translate(12px,-22px); } }
        .marquee { animation: marquee 35s linear infinite; }
        @keyframes marquee { to { transform: translateX(-50%); } }
        .marquee-mask { mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
        .grid-bg { background-image: linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px); background-size: 48px 48px; }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1; transform: none; }
          .radar-shapes { transform: none; }
          .float, .pellet, .marquee, .pipe-flow, .pipe-flow-v, .pipe-pellet { animation: none; }
        }
      `}</style>

      <Navbar />
      <Hero />
      <TrustStrip />
      <Stats />
      <Products />
      <About />
      <Compare />
      <Industries />
      <Values />
      <Quality />
      <Process />
      <WhyUs />
      <CustomCTA />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}
