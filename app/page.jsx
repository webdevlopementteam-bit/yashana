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
  { label: "PC Dana", href: "#pc-dana" },
  { label: "Products", href: "#products" },
  { label: "About", href: "#about" },
  { label: "Industries", href: "#industries" },
  { label: "Quality", href: "#quality" },
  { label: "Process", href: "#process" },
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
// each stat gets its own colour, echoing the blue / yellow / red granules in the hero
const STATS = [
  { value: 200, suffix: "+", label: "Regular clients", desc: "Moulders & OEMs who keep coming back", icon: "users", from: "#2563EB", to: "#00B3DF" },
  { value: 430, suffix: "+", label: "Cities across India", desc: "Supplied from our Delhi plant", icon: "pin", from: "#F59E0B", to: "#F97316" },
  { value: 3000, suffix: "+", unit: "MT", label: "Production capacity", desc: "Ready for bulk & repeat orders", icon: "gear", from: "#F43F5E", to: "#C026D3" },
];

const INDUSTRIES = [
  { name: "Electrical & Switchgear", icon: "bolt", from: "#FBBF24", to: "#EA580C", text: "Switches, MCB parts, connectors and insulating components." },
  { name: "Automotive", icon: "car", from: "#FB7185", to: "#BE123C", text: "Interior trims, lamp housings and under-hood electricals." },
  { name: "Home Appliances", icon: "home", from: "#A78BFA", to: "#6D28D9", text: "Housings, panels and functional parts for everyday devices." },
  { name: "LED & Lighting", icon: "bulb", from: "#38BDF8", to: "#0369A1", text: "Diffusers, covers and heat-tolerant fixture components." },
  { name: "Consumer Electronics", icon: "chip", from: "#818CF8", to: "#3730A3", text: "Casings, chargers and accessory mouldings." },
  { name: "Industrial & Packaging", icon: "box", from: "#34D399", to: "#047857", text: "Durable parts, fixtures and engineered components." },
];

const CERTS = [
  { title: "ISO 9001:2015", sub: "Quality Management", img: "/certs/iso-9001.png" },
  { title: "ISO 14001:2015", sub: "Environmental Management", img: "/certs/iso-14001.png" },
  { title: "MSME Registered", sub: "Govt. of India registered", img: "/certs/msme.png" },
  { title: "RoHS Compliant", sub: "Hazardous-substance free", img: "/certs/rohs.png" },
];

const STEPS = [
  { n: "01", icon: "mail", title: "Share your requirement", text: "Tell us the polymer, grade, colour code and monthly volume you need." },
  { n: "02", icon: "bulb", title: "Grade recommendation", text: "Our team suggests the right material for your part and process." },
  { n: "03", icon: "shield", title: "Quality check", text: "Each lot is checked before packing so your line runs without surprises." },
  { n: "04", icon: "box", title: "Packed & coded", text: "Sealed 25 kg bags marked with grade, batch number and colour code." },
  { n: "05", icon: "truck", title: "On-time dispatch", text: "Prompt delivery from Delhi to manufacturers across India." },
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
    whatsapp: <path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3Z" />,
    award: <g {...p}><circle cx="12" cy="9" r="6" /><path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" /></g>,
    tag: <g {...p}><path d="M3 12V4h8l10 10-8 8L3 12Z" /><circle cx="7.5" cy="8.5" r="1.5" /></g>,
  };
  return <svg viewBox="0 0 24 24" className={className} aria-hidden="true">{paths[name]}</svg>;
}

/* ------------------------------ Logo ------------------------------- */

// public/logo.jpg is the "YP" mark (white background); the wordmark is rendered as text beside it
function Logo({ className = "h-20 w-auto", textClassName = "text-2xl" }) {
  return (
    <span className="inline-flex items-center gap-1">
      {/* aspect + object-cover trims the JPG's side padding so the mark sits close to the text */}
      <img src="/logo.jpg" width="255" height="90" alt="" className={`aspect-[142/90] object-cover ${className}`} />
      <span className={`whitespace-nowrap font-[family-name:var(--font-brand)] font-black italic leading-none tracking-tight ${textClassName}`}>
        <span className="text-[#13318C]">YASHANA</span>{" "}
        <span className="text-[#2E7D32]">POLYMERS</span>
        <sup className="ml-0.5 align-super text-[0.4em] not-italic text-[#13318C]">TM</sup>
      </span>
    </span>
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
    <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-lg shadow-[#161C6E]/10" : "border-b border-slate-100"}`}>
      {/* Top bar */}
      <div className="bg-[#0E1352] text-xs text-white/80">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5">
            <a href="tel:+919217960445" className="inline-flex items-center gap-1.5 transition hover:text-[#7FE3F7]">
              <Icon name="phone" className="h-3.5 w-3.5 text-[#00B3DF]" />
              +91 92179 60445
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

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-1 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center">
          <Logo className="h-12 w-auto sm:h-16 lg:h-[72px]" textClassName="text-xl sm:text-2xl lg:text-3xl" />
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className=" font-medium text-slate-700 transition hover:text-[#00B3DF]">
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
    <section id="top" className="relative bg-white">
      <h1 className="sr-only">Yashana Polymers — High performance PC, ABS and PBT polymer granules manufacturer</h1>
      <div className="relative">
        <picture>
          <source media="(min-width: 768px)" srcSet="/desktop-banner.png" width="1942" height="809" />
          <img
            src="/mobile-banner.png"
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
    <section className="relative overflow-hidden bg-slate-50 py-16 lg:py-20">
      <div className="pointer-events-none absolute -left-32 top-0 h-72 w-72 rounded-full bg-[#2563EB]/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-[#F43F5E]/10 blur-[100px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
        <Reveal className="text-center lg:col-span-4 lg:text-left">
          <SectionTag>By the Numbers</SectionTag>
          <h2 className={`${display} mt-4 text-3xl font-bold uppercase leading-none text-[#161C6E] sm:text-5xl`}>
            Growing with manufacturers across India
          </h2>
          <p className="mt-4 text-slate-600">Consistent quality and on-time supply have made us a trusted name for moulders nationwide.</p>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100} className="h-full">
              <div className="relative flex h-full items-center gap-4 overflow-hidden rounded-3xl bg-white p-4 shadow-[0_10px_30px_-12px_rgba(22,28,110,0.18)] ring-1 ring-slate-100 transition hover:-translate-y-1 sm:flex-col sm:items-start sm:gap-0 sm:p-7">
                <span className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, ${s.from}, ${s.to})` }} />
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-white sm:h-14 sm:w-14"
                  style={{ background: `linear-gradient(135deg, ${s.from}, ${s.to})`, boxShadow: `0 10px 20px -8px ${s.from}88` }}
                >
                  <Icon name={s.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                </span>
                <div className="sm:mt-6">
                  <p className={`${display} flex items-start whitespace-nowrap text-4xl font-bold leading-none sm:text-5xl xl:text-6xl`}>
                    <span className="bg-clip-text text-transparent" style={{ backgroundImage: `linear-gradient(135deg, ${s.from}, ${s.to})` }}>
                      <Counter value={s.value} suffix={s.suffix} />
                    </span>
                    {s.unit && (
                      <span className="ml-1.5 rounded-md px-1.5 py-0.5 font-[family-name:var(--font-body)] text-[10px] font-bold sm:text-xs uppercase tracking-wider" style={{ color: s.from, background: `${s.from}1A` }}>
                        {s.unit}
                      </span>
                    )}
                  </p>
                  <p className="mt-1.5 text-sm font-bold uppercase tracking-wider text-[#161C6E] sm:mt-2 sm:text-base">{s.label}</p>
                  <p className="mt-0.5 text-xs text-slate-500 sm:mt-1 sm:text-sm">{s.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* 4. About */
function About() {
  return (
    <section id="about" className="relative bg-slate-50 py-24 lg:py-32">
      {/* mobile order: intro → image → pointers; desktop: text on the left, image on the right */}
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-8 lg:px-8">
        <Reveal className="lg:col-start-1 lg:row-start-1 lg:self-end">
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
        </Reveal>
        <Reveal className="order-last lg:order-none lg:col-start-1 lg:row-start-2 lg:self-start">
          <ul className="grid gap-4 sm:grid-cols-2">
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
        <Reveal delay={120} className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-[#00B3DF]/20 to-[#00A896]/20 blur-2xl" />
          <div className="relative overflow-hidden rounded-xl bg-white sm:rounded-[2rem] shadow-2xl shadow-[#161C6E]/15 ring-1 ring-slate-200">
            <img
              src="/about.webp"
              width="1600"
              height="1134"
              loading="lazy"
              alt="Yashana Polymers 25 kg packaging for PC, ABS and PBT granules"
              className="block h-auto w-full"
            />
          </div>
          <div className="absolute -bottom-8 left-4 hidden rounded-3xl bg-white p-5 sm:block shadow-2xl shadow-[#161C6E]/15 ring-1 ring-slate-100 sm:-left-8 sm:p-6">
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

/* 4b. PC dana spotlight — our priority product, shown in its real colour range */
const PC_SHADES = [
  { name: "Natural White", type: "Opaque", img: "/pc/natural-white.webp", dot: "#F1F1EE" },
  { name: "Transparent Blue", type: "Transparent", img: "/pc/transparent-blue.webp", dot: "#1E3FA8" },
  { name: "Transparent Red", type: "Transparent", img: "/pc/transparent-red.webp", dot: "#D4232B" },
  { name: "Transparent Teal", type: "Transparent", img: "/pc/transparent-teal.webp", dot: "#14988E" },
  { name: "Transparent Orange", type: "Transparent", img: "/pc/transparent-orange.webp", dot: "#F26A1B" },
  { name: "Jet Black", type: "Opaque", img: "/pc/jet-black.webp", dot: "#1C1C1E" },
  { name: "Lime & Orange", type: "Opaque", img: "/pc/lime-orange.webp", dot: "linear-gradient(135deg, #C6DD4A 50%, #F0561D 50%)" },
  { name: "Sky Blue", type: "Opaque", img: "/pc/sky-blue.webp", dot: "#3E9FD6" },
];

const PC_POINTS = [
  { icon: "shield", t: "High impact strength", d: "Tough parts that resist cracking" },
  { icon: "bulb", t: "Crystal-clear grades", d: "Ideal for lighting & diffusers" },
  { icon: "bolt", t: "Heat & flame resistant", d: "Stable in electrical housings" },
  { icon: "gear", t: "Easy to mould", d: "Uniform granules, consistent flow" },
];

function PcDana() {
  const [active, setActive] = useState(0);
  const shade = PC_SHADES[active];

  return (
    <section id="pc-dana" className="relative overflow-hidden bg-gradient-to-b from-white to-slate-50 py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-[#00B3DF]/15 blur-[120px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#00A896]/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* mobile order: intro → colour viewer → points; desktop: copy on the left, viewer on the right */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8">
          {/* intro */}
          <Reveal className="lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:self-end">
            <SectionTag>Our Speciality</SectionTag>
            <h2 className={`${display} mt-5 text-5xl font-bold uppercase leading-[0.95] text-[#161C6E] sm:text-6xl`}>
              Polycarbonate
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              Premium PC granules in natural, opaque and transparent shades — colour-matched to your requirement and packed in batch-coded 25 kg bags.
            </p>
          </Reveal>

          {/* points + CTAs */}
          <Reveal className="order-last lg:order-none lg:col-span-5 lg:col-start-1 lg:row-start-2">
            <ul className="grid gap-4 sm:grid-cols-2">
              {PC_POINTS.map((p) => (
                <li key={p.t} className="flex gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#00B3DF] to-[#00A896] text-white">
                    <Icon name={p.icon} className="h-5 w-5" />
                  </span>
                  <span>
                    <span className="block font-semibold text-[#161C6E]">{p.t}</span>
                    <span className="block text-sm text-slate-500">{p.d}</span>
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-3 py-3.5 text-sm font-semibold sm:px-6 sm:text-base text-white shadow-lg shadow-[#00B3DF]/30 transition hover:scale-[1.03]">
                Get PC Dana price
                <Icon name="arrow" className="h-5 w-5 max-[380px]:hidden" />
              </a>
              <a
                href={`https://wa.me/919217958610?text=${encodeURIComponent("Hi, I need a quote for PC dana.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-white px-3 py-3.5 text-sm font-semibold text-[#161C6E] sm:px-6 sm:text-base ring-1 ring-slate-200 transition hover:bg-[#25D366] hover:text-white hover:ring-[#25D366]"
              >
                <Icon name="whatsapp" className="h-5 w-5" />
                WhatsApp us
              </a>
            </div>
          </Reveal>

          {/* colour viewer */}
          <Reveal className="lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-center" delay={150}>
            <div className="relative overflow-hidden rounded-[2rem] shadow-2xl shadow-[#161C6E]/20 ring-1 ring-slate-200">
              <div className="relative aspect-square bg-slate-100 sm:aspect-[1232/656]">
                {PC_SHADES.map((s, i) => (
                  <img
                    key={s.img}
                    src={s.img}
                    width="1232"
                    height="656"
                    loading={i ? "lazy" : undefined}
                    alt={`${s.name} polycarbonate (PC) dana granules`}
                    className={`absolute inset-0 h-full w-full object-cover transition duration-700 ${i === active ? "scale-100 opacity-100" : "scale-105 opacity-0"}`}
                  />
                ))}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 text-white">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#7FE3F7]">{shade.type} PC</p>
                    <p className={`${display} text-3xl font-bold uppercase leading-none sm:text-4xl`}>{shade.name}</p>
                  </div>
                  <p className={`${display} text-lg font-bold text-white/70`}>
                    {String(active + 1).padStart(2, "0")} / {String(PC_SHADES.length).padStart(2, "0")}
                  </p>
                </div>
              </div>
            </div>

            {/* swatches */}
            <div className="mt-5 grid grid-cols-4 gap-3 sm:grid-cols-8" role="tablist" aria-label="PC dana colours">
              {PC_SHADES.map((s, i) => (
                <button
                  key={s.name}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={s.name}
                  onClick={() => setActive(i)}
                  className={`group relative aspect-square overflow-hidden rounded-xl ring-2 transition ${i === active ? "ring-[#00B3DF]" : "ring-slate-200 hover:ring-[#00B3DF]/50"}`}
                >
                  <img src={s.img} width="1232" height="656" loading="lazy" alt="" className="h-full w-full scale-150 object-cover transition duration-500 group-hover:scale-[1.7]" />
                  <span className="absolute bottom-1.5 left-1.5 h-3.5 w-3.5 rounded-full ring-2 ring-white" style={{ background: s.dot }} />
                </button>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-500">Tap a colour to preview · Custom shades available on request</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* 5. Products */
function Products() {
  return (
    <section id="products" className="relative overflow-hidden bg-white pb-15 pt-12 lg:pb-32 lg:pt-16">
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

/* Polymer accent colours (used by the thermal section) */
const POLY_COLORS = { PC: "#00B3DF", ABS: "#00A896", PBT: "#2B37A8" };

/* 6b. Thermal properties — temperature probe across heat lanes */
const T_MAX = 350;

const THERMAL = [
  { code: "PC", type: "Amorphous", tg: 147, tm: null, cut: 125, proc: [280, 320], note: "Holds shape close to its Tg — the heat champion of the amorphous pair." },
  { code: "ABS", type: "Amorphous", tg: 105, tm: null, cut: 80, proc: [220, 260], note: "Easy, low-temperature moulding — best kept below ~80 °C in service." },
  { code: "PBT", type: "Semi-crystalline", tg: 50, tm: 225, cut: 140, proc: [240, 270], note: "Crystals keep it rigid well above Tg, with a sharp melt at 225 °C." },
];

const PRESETS = [
  { t: 25, label: "Room" },
  { t: 85, label: "Hot car cabin" },
  { t: 100, label: "Boiling water" },
  { t: 130, label: "Under-hood" },
  { t: 250, label: "Moulding" },
];

function thermalState(t, d) {
  // color = dot/tint, ink = readable text on white
  if (t <= d.cut) return { label: "Service-ready", color: "#10B981", ink: "#047857" };
  if (t < (d.tm ?? d.tg)) return { label: "Beyond rated use", color: "#F59E0B", ink: "#B45309" };
  if (t < d.proc[0]) return { label: d.tm ? "Melted" : "Softened", color: "#F97316", ink: "#C2410C" };
  if (t <= d.proc[1]) return { label: "Moulding window", color: "#0EA5E9", ink: "#0369A1" };
  return { label: "Degradation risk", color: "#F43F5E", ink: "#BE123C" };
}

// cold cyan → hot red, for the probe readout
const heatColor = (t) => `hsl(${Math.round(195 - Math.min(t / 300, 1) * 195)} 85% 45%)`;
const pct = (t) => `${(t / T_MAX) * 100}%`;

function Thermal() {
  const [temp, setTemp] = useState(100);

  return (
    <section id="thermal" className="relative overflow-hidden bg-slate-50 py-18 lg:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[28rem] w-[28rem] rounded-full bg-[#00B3DF]/10 blur-[120px]" />
        <div className="absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full blur-[140px] transition-colors duration-500" style={{ background: heatColor(temp), opacity: 0.1 }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Heat Behaviour" title="Thermal properties of polymers" sub="Drag the probe to any temperature and watch how PC, ABS and PBT respond — from everyday service to the moulding barrel." />

        <Reveal className="mt-16 rounded-[2rem] bg-white p-5 shadow-[0_8px_32px_-12px_rgba(22,28,110,0.15)] ring-1 ring-slate-200/80 sm:p-8 lg:p-10">
          {/* probe readout + presets */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Probe temperature</p>
              <p className={`${display} mt-1 text-6xl font-bold leading-none tabular-nums transition-colors duration-300 sm:text-7xl`} style={{ color: heatColor(temp) }}>
                {temp}
                <span className="ml-1 text-3xl text-slate-400 sm:text-4xl">°C</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map((p) => (
                <button
                  key={p.t}
                  type="button"
                  onClick={() => setTemp(p.t)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${temp === p.t ? "bg-[#161C6E] text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
                >
                  {p.label} · {p.t}°
                </button>
              ))}
            </div>
          </div>

          {/* slider + axis */}
          <div className="mt-8">
            <input
              type="range"
              min="0"
              max={T_MAX}
              value={temp}
              onChange={(e) => setTemp(Number(e.target.value))}
              aria-label="Probe temperature in degrees Celsius"
              className="thermo-range w-full"
            />
            {/* px-3 = half the thumb width, so 0° and 350° line up with the thumb centre */}
            <div className="px-3">
              <div className="relative mt-2 h-4 text-[10px] font-semibold text-slate-400 sm:text-xs">
                {[0, 50, 100, 150, 200, 250, 300, 350].map((t) => (
                  <span key={t} className="absolute -translate-x-1/2" style={{ left: pct(t) }}>
                    {t}°
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* heat lanes */}
          <div className="px-3">
          <div className="relative mt-8 space-y-8">
            <span className="pointer-events-none absolute -bottom-2 -top-2 z-10 w-0.5 -translate-x-1/2 rounded-full transition-[left] duration-150" style={{ left: pct(temp), background: heatColor(temp), boxShadow: `0 0 10px ${heatColor(temp)}` }} />

            {THERMAL.map((d) => {
              const st = thermalState(temp, d);
              const c = POLY_COLORS[d.code];
              return (
                <div key={d.code}>
                  <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                    <p className="flex items-baseline gap-3">
                      <span className={`${display} text-3xl font-bold leading-none`} style={{ color: c }}>{d.code}</span>
                      <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">{d.type}</span>
                    </p>
                    <span className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ring-1 transition-colors duration-300" style={{ color: st.ink, background: `${st.color}14`, "--tw-ring-color": `${st.color}55` }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: st.color }} />
                      {st.label}
                    </span>
                  </div>

                  {/* markers above track */}
                  <div className="relative mt-3 h-5 text-[10px] font-bold uppercase tracking-wider text-[#161C6E] sm:text-xs">
                    <span className="absolute -translate-x-1/2 whitespace-nowrap" style={{ left: pct(d.tg) }}>Tg {d.tg}°</span>
                    {d.tm && <span className="absolute -translate-x-1/2 whitespace-nowrap text-[#C2410C]" style={{ left: pct(d.tm) }}>Tm {d.tm}°</span>}
                  </div>

                  {/* track */}
                  <div className="relative h-4 rounded-full bg-slate-100 ring-1 ring-slate-200">
                    <span className="absolute inset-y-0 left-0 rounded-full" style={{ width: pct(d.cut), background: `linear-gradient(90deg, ${c}55, ${c})` }} />
                    <span className="thermo-hatch absolute inset-y-0 rounded-full" style={{ left: pct(d.proc[0]), width: pct(d.proc[1] - d.proc[0]) }} />
                    <span className="absolute inset-y-0 right-0 rounded-r-full bg-gradient-to-r from-transparent to-[#F43F5E]/30" style={{ left: pct(d.proc[1]) }} />
                    <span className="absolute -inset-y-1 w-0.5 -translate-x-1/2 bg-[#161C6E]" style={{ left: pct(d.tg) }} />
                    {d.tm && <span className="absolute -inset-y-1 w-0.5 -translate-x-1/2 bg-[#F97316]" style={{ left: pct(d.tm) }} />}
                  </div>

                  {/* markers below track */}
                  <div className="relative mt-2 h-5 text-[10px] font-semibold text-slate-500 sm:text-xs">
                    <span className="absolute -translate-x-full whitespace-nowrap pr-1" style={{ left: pct(d.cut) }}>max use {d.cut}°</span>
                    <span className="absolute -translate-x-1/2 whitespace-nowrap text-[#0369A1]" style={{ left: pct((d.proc[0] + d.proc[1]) / 2) }}>{d.proc[0]}–{d.proc[1]}°</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-500">{d.note}</p>
                </div>
              );
            })}
          </div>
          </div>

          {/* legend */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-100 pt-6 text-xs font-medium text-slate-500">
            <span className="inline-flex items-center gap-2"><span className="h-2.5 w-6 rounded-full bg-gradient-to-r from-slate-200 to-slate-500" />Continuous service range</span>
            <span className="inline-flex items-center gap-2"><span className="thermo-hatch h-2.5 w-6 rounded-full" />Melt / moulding window</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-0.5 bg-[#161C6E]" />Glass transition (Tg)</span>
            <span className="inline-flex items-center gap-2"><span className="h-3 w-0.5 bg-[#F97316]" />Crystalline melt (Tm)</span>
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-slate-400">
          Typical values for unfilled, general-purpose grades — exact figures vary by grade.{" "}
          <a href="#contact" className="font-semibold text-[#00A896] hover:underline">Request a grade-specific TDS →</a>
        </p>
      </div>
    </section>
  );
}

/* 6c. In-house testing lab — every step a batch goes through before dispatch */
const LAB_STEPS = [
  { slug: "colour-sampling", title: "Colour Sampling", text: "Granules loaded into the dryer for a colour-matched trial batch." },
  { slug: "machine-setup", title: "Machine Setup", text: "Moulding parameters set for the exact grade under test." },
  { slug: "specimen-moulding", title: "Specimen Moulding", text: "Standard test bars moulded from the same batch." },
  { slug: "notch-cutting", title: "Notch Cutting", text: "Precision notches cut into bars for impact testing." },
  { slug: "dimension-check", title: "Dimension Check", text: "Every specimen measured with digital callipers." },
  { slug: "specimen-trimming", title: "Specimen Trimming", text: "Runners removed for clean, uniform test pieces." },
  { slug: "melt-flow-index", title: "Melt Flow Index", text: "MFI checked to confirm consistent processing flow." },
  { slug: "impact-testing", title: "Impact Testing", text: "Pendulum impact test measures the material's toughness." },
  { slug: "colour-measurement", title: "Colour Measurement", text: "Spectrophotometer verifies the shade against the standard." },
  { slug: "tensile-testing", title: "Tensile Testing", text: "UTM checks tensile strength and elongation." },
];

function Lab() {
  return (
    <section id="lab" className="relative overflow-hidden bg-white py-20 lg:py-28">
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-[#00B3DF]/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#00A896]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Our Testing Lab" title="Tested in-house, batch after batch" sub="Every lot goes through our lab before it is packed — from colour sampling to tensile strength." />

        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-5">
          {LAB_STEPS.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 5) * 70} className="h-full">
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgba(22,28,110,0.18)] ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(22,28,110,0.3)] sm:rounded-3xl">
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
                  <img
                    src={`/lab/${s.slug}.webp`}
                    width="1200"
                    height="675"
                    loading="lazy"
                    alt={`${s.title} in the Yashana Polymers testing lab`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <span className={`${display} absolute left-2.5 top-2.5 rounded-lg bg-gradient-to-br from-[#00A896] to-[#00B3DF] px-2 py-0.5 text-sm font-bold text-white shadow-lg sm:left-3 sm:top-3 sm:text-base`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-3 sm:p-4">
                  <h3 className="text-sm font-bold leading-snug text-[#161C6E] sm:text-base">{s.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">{s.text}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#00A896] to-[#00B3DF] px-7 py-3.5 font-semibold text-white shadow-lg shadow-[#00B3DF]/30 transition hover:scale-[1.03]">
            Request a test report
            <Icon name="arrow" className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* 7. Industries */
function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-20">
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

/* 9. Quality & Certifications */
function Quality() {
  return (
    <section id="quality" className="border-y border-slate-100 bg-white py-14 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="flex flex-col items-center gap-10 lg:flex-row lg:gap-16">
          {/* intro */}
          <div className="text-center lg:w-1/3 lg:text-left">
            <SectionTag>Quality &amp; Compliance</SectionTag>
            <h2 className={`${display} mt-4 text-4xl font-bold uppercase leading-none text-[#161C6E] sm:text-5xl`}>Certified &amp; trusted</h2>
            <p className="mt-3 text-slate-600">Recognised standards behind every batch we supply.</p>
            <a href="#contact" className="mt-5 inline-flex items-center gap-2 border-b-2 border-[#00A896] pb-1 font-semibold text-[#161C6E] transition hover:gap-3 hover:text-[#00A896]">
              Request certificates
              <Icon name="arrow" className="h-4 w-4" />
            </a>
          </div>

          {/* badges */}
          <ul className="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:w-2/3">
            {CERTS.map((c) => (
              <li key={c.title} className="flex flex-col items-center rounded-2xl bg-slate-50 px-3 py-5 text-center ring-1 ring-slate-100 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg hover:shadow-[#161C6E]/10">
                <img src={c.img} width="140" height="140" loading="lazy" alt={`${c.title} badge`} className="h-20 w-20 object-contain sm:h-24 sm:w-24" />
                <p className="mt-3 text-sm font-bold text-[#161C6E]">{c.title}</p>
                <p className="mt-0.5 text-xs leading-snug text-slate-500">{c.sub}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* 10. Process — production-line journey */
// one colour per step: gradient for the icon tile, `ink` for readable text on white
const STEP_COLORS = [
  { from: "#3B82F6", to: "#06B6D4", ink: "#2563EB" },
  { from: "#F59E0B", to: "#F97316", ink: "#D97706" },
  { from: "#10B981", to: "#14B8A6", ink: "#059669" },
  { from: "#EC4899", to: "#F43F5E", ink: "#DB2777" },
  { from: "#8B5CF6", to: "#6366F1", ink: "#7C3AED" },
];

function StepCard({ s, i }) {
  return (
    <div className="group relative overflow-hidden rounded-3xl bg-white p-6 shadow-[0_8px_24px_-12px_rgba(22,28,110,0.15)] ring-1 ring-slate-200/80 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(22,28,110,0.25)] hover:ring-[#00B3DF]/40">
      <span className={`${display} step-outline pointer-events-none absolute -right-2 -top-4 text-8xl font-bold leading-none`} aria-hidden="true">
        {s.n}
      </span>
      <p className="relative text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: STEP_COLORS[i].ink }}>
        Step {s.n}
      </p>
      <h3 className="relative mt-2 text-lg font-bold text-[#161C6E]">{s.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
      <span className="absolute bottom-0 left-6 h-0.5 w-0 rounded-full transition-all duration-500 group-hover:w-16" style={{ background: STEP_COLORS[i].from }} />
    </div>
  );
}

function StepNode({ s, i }) {
  return (
    <span
      className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl text-white ring-8 ring-white transition duration-500 hover:rotate-6 hover:scale-110"
      style={{ background: `linear-gradient(135deg, ${STEP_COLORS[i].from}, ${STEP_COLORS[i].to})`, boxShadow: `0 0 0 1px ${STEP_COLORS[i].from}55, 0 12px 30px -6px ${STEP_COLORS[i].from}aa` }}
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
            <p className="flex items-center px-5 py-3 sm:px-8">
              <Logo className="h-7 w-auto sm:h-10" textClassName="text-sm sm:text-xl" />
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
            <a href="tel:+919217960445" className="inline-flex items-center gap-2 rounded-full border border-[#161C6E]/20 bg-white px-7 py-4 font-semibold text-[#161C6E] transition hover:border-[#00A896] hover:text-[#00A896]">
              <Icon name="phone" className="h-5 w-5" />
              Call now
            </a>
          </div>
        </div>
      </Reveal>
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
    { icon: "phone", label: "Mobile", from: "#3B82F6", to: "#06B6D4", lines: [{ t: "+91 92179 60445", h: "tel:+919217960445" }] },
    { icon: "whatsapp", label: "WhatsApp", from: "#25D366", to: "#128C7E", lines: [{ t: "+91 92179 58610", h: "https://wa.me/919217958610", ext: true }] },
    { icon: "mail", label: "Email", from: "#F59E0B", to: "#F97316", lines: [{ t: "Yashanapolymers1326@gmail.com", wrapAt: "@", h: "mailto:Yashanapolymers1326@gmail.com" }] },
    { icon: "globe", label: "Website", from: "#8B5CF6", to: "#6366F1", lines: [{ t: "www.yashanapolymers.com", h: "https://www.yashanapolymers.com" }] },
    { icon: "pin", label: "Address", from: "#EC4899", to: "#F43F5E", lines: [{ t: "Plot No. 30, Pocket C, Sector 2," }, { t: "Bawana DSIIDC Industrial Area," }, { t: "Delhi - 110039" }] },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 ">
      <div className="pointer-events-none absolute -right-40 top-0 h-[30rem] w-[30rem] rounded-full bg-[#00B3DF]/10 blur-[120px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Heading tag="Get in Touch" title="Let's talk polymers" sub="Send us your requirement and our team will get back to you with availability and pricing." />
        <div className="mt-16 grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          {/* on desktop the cards stretch so this column matches the form's height */}
          <div className="space-y-4 lg:flex lg:h-full lg:flex-col lg:gap-4 lg:space-y-0">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:items-start sm:gap-4 sm:p-5 lg:flex-1 lg:items-center">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white sm:h-12 sm:w-12"
                  style={{ background: `linear-gradient(135deg, ${c.from}, ${c.to})`, boxShadow: `0 8px 18px -8px ${c.from}aa` }}
                >
                  <Icon name={c.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                </span>
                <div className="min-w-0 text-[15px] leading-snug sm:text-base sm:leading-normal">
                  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-500 sm:text-xs">{c.label}</p>
                  {c.lines.map((l) => {
                    // let long values (the email) wrap at a natural point instead of mid-word
                    const text = l.wrapAt ? <>{l.t.split(l.wrapAt)[0]}<wbr />{l.wrapAt}{l.t.split(l.wrapAt)[1]}</> : l.t;
                    return l.h ? (
                      <a key={l.t} href={l.h} {...(l.ext && { target: "_blank", rel: "noopener noreferrer" })} className="mt-0.5 block font-semibold text-[#161C6E] [overflow-wrap:anywhere] transition hover:text-[#00A896]">{text}</a>
                    ) : (
                      <p key={l.t} className="font-semibold text-[#161C6E]">{text}</p>
                    );
                  })}
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
/* Floating contact buttons: full-width split bar on mobile, round buttons on desktop */
function FloatingContact() {
  return (
    <>
      <a
        href="tel:+919217960445"
        aria-label="Call +91 92179 60445"
        className="fixed bottom-0 left-0 z-50 flex h-14 w-1/2 items-center justify-center gap-2 bg-[#161C6E] font-semibold text-white transition hover:bg-[#0E1352] md:bottom-6 md:left-6 md:h-14 md:w-14 md:rounded-full md:shadow-lg md:shadow-[#161C6E]/30 md:hover:scale-110"
      >
        <Icon name="phone" className="h-6 w-6" />
        <span className="md:hidden">Call</span>
      </a>
      <a
        href="https://wa.me/919217958610"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp +91 92179 58610"
        className="fixed bottom-0 right-0 z-50 flex h-14 w-1/2 items-center justify-center gap-2 bg-[#25D366] font-semibold text-white transition hover:bg-[#1EBE5A] md:bottom-6 md:right-6 md:h-14 md:w-14 md:rounded-full md:shadow-lg md:shadow-[#25D366]/40 md:hover:scale-110"
      >
        <Icon name="whatsapp" className="h-7 w-7" />
        <span className="md:hidden">WhatsApp</span>
      </a>
    </>
  );
}

/* Google Map: full width, below the contact section */
function MapEmbed() {
  return (
    <section aria-label="Our location on Google Maps" className="bg-white">
      <iframe
        title="Yashana Polymers location"
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3496.245922488292!2d77.04684067550703!3d28.801744475572733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDQ4JzA2LjMiTiA3N8KwMDInNTcuOSJF!5e0!3m2!1sen!2sin!4v1791530943477!5m2!1sen!2sin"
        className="block h-[350px] w-full border-0 md:h-[450px]"
        allowFullScreen
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
      />
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#080B36] pb-14 pt-16 text-white/60 md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pb-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          {/* white card so the JPG's white background sits cleanly on the dark footer */}
          <div className="inline-flex rounded-2xl bg-white px-4 py-2">
            <Logo className="h-12 w-auto" textClassName="text-xl sm:text-2xl" />
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
            <li><a href="tel:+919217960445" className="hover:text-[#7FE3F7]">+91 92179 60445</a></li>
            <li><a href="mailto:Yashanapolymers1326@gmail.com" className="break-all hover:text-[#7FE3F7]">Yashanapolymers1326@gmail.com</a></li>
            <li>Plot No. 30, Pocket C, Sector 2, Bawana DSIIDC Industrial Area, Delhi - 110039</li>
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

  // overflow-x-clip (not hidden) so the sticky header keeps working
  return (
    <main className="overflow-x-clip bg-white text-slate-800">
      <style>{`
        html { scroll-behavior: smooth; scroll-padding-top: 144px; }
        .reveal { opacity: 0; transform: translateY(28px); transition: opacity .8s ease, transform .8s ease; }
        .reveal.in { opacity: 1; transform: none; }
        .radar-shapes { transform: scale(0); transform-origin: 220px 210px; transition: transform 1.1s cubic-bezier(.2,.8,.2,1) .2s; }
        .radar.in .radar-shapes { transform: none; }
        .thermo-range { -webkit-appearance: none; appearance: none; height: 10px; border-radius: 999px; background: linear-gradient(90deg, #38BDF8, #34D399 30%, #FBBF24 50%, #FB923C 70%, #F43F5E); cursor: pointer; }
        .thermo-range::-webkit-slider-thumb { -webkit-appearance: none; height: 24px; width: 24px; border-radius: 999px; background: #fff; border: 4px solid #161C6E; box-shadow: 0 4px 12px rgba(22,28,110,.3); }
        .thermo-range::-moz-range-thumb { height: 16px; width: 16px; border-radius: 999px; background: #fff; border: 4px solid #161C6E; box-shadow: 0 4px 12px rgba(22,28,110,.3); }
        .thermo-range:focus-visible { outline: 2px solid #00B3DF; outline-offset: 6px; }
        .thermo-hatch { background: repeating-linear-gradient(135deg, #38BDF8 0 4px, rgba(56,189,248,.25) 4px 8px); }
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
      <Quality />
      <Products />
      <About />
      <PcDana />
      <Stats />
      <Thermal />
      <Lab />
      <Industries />
      <Process />
      <WhyUs />
      <CustomCTA />
      <Contact />
      <MapEmbed />
      <Footer />
      <FloatingContact />
    </main>
  );
}
