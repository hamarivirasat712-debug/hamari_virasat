"use client";

import { useState } from "react";

/* ──────────────────────────────────────────────
   Color data & utilities
────────────────────────────────────────────── */

interface ColorInfo {
  hex: string;
  name: string;
  mood: string;
  personality: string;
  use: string;
  harmony: string;
  harmonyBadge: "perfect-fit" | "accent" | "contrast" | "neutral";
}

const CLIENT_COLORS: ColorInfo[] = [
  {
    hex: "#F4DEB0",
    name: "Sandy Warmth",
    mood: "Calm · Earthy · Inviting",
    personality:
      "A soft, golden-cream that evokes sunlit parchment and aged paper. It sits naturally beside the existing brand cream (#FAF6F0) and gold (#C9A84C), enriching the heritage warmth without overpowering.",
    use: "Section backgrounds, card fills, decorative dividers, hover states on light surfaces.",
    harmony: "Near-perfect fit — extends the existing warm-gold family.",
    harmonyBadge: "perfect-fit",
  },
  {
    hex: "#A0B0E0",
    name: "Periwinkle Dusk",
    mood: "Serene · Spiritual · Contemplative",
    personality:
      "A muted blue-violet that references twilight, sacred skies, and tranquility. It introduces a complementary cool note to an otherwise warm palette — useful for contrast without jarring the eye.",
    use: "Informational badges, secondary CTAs, progress steps, subtle icon fills.",
    harmony: "Complementary accent — adds depth when used sparingly (≤ 10% of surface area).",
    harmonyBadge: "accent",
  },
  {
    hex: "#F8B8A0",
    name: "Peachy Blush",
    mood: "Festive · Joyful · Tender",
    personality:
      "A warm coral-peach reminiscent of marigold sunsets and sindoor hues. It bridges saffron energy with floral softness, aligning tightly with the brand saffron (#BD5319) at lower saturation.",
    use: "Testimonial card backgrounds, celebration banners, tag chips, highlight rings.",
    harmony: "Excellent fit — a desaturated cousin of the existing saffron.",
    harmonyBadge: "perfect-fit",
  },
  {
    hex: "#A0E0F0",
    name: "Sky Mist",
    mood: "Fresh · Airy · Hopeful",
    personality:
      "A cool aqua-cyan that evokes clear morning skies and flowing water. Furthest from the existing warm palette — strongest contrast candidate for functional UI elements.",
    use: "Success states, feature highlight chips, focus ring outlines, alerts.",
    harmony: "Bold contrast — use only for functional highlights, not decorative fill.",
    harmonyBadge: "contrast",
  },
  {
    hex: "#D4AF37",
    name: "Classic Gold",
    mood: "Regal · Timeless · Prestigious",
    personality:
      "A slightly greener, more saturated gold than the existing brand gold (#C9A84C). It reads as true 'gold' and immediately communicates luxury and heritage. The closest new color to a drop-in brand upgrade.",
    use: "Primary CTAs, logo accents, premium badge borders, star ratings, price tags.",
    harmony: "Direct brand enhancement — could replace or companion the existing gold.",
    harmonyBadge: "perfect-fit",
  },
];

const EXISTING_COLORS = [
  { hex: "#2A1208", name: "Charcoal" },
  { hex: "#FAF6F0", name: "Cream" },
  { hex: "#BD5319", name: "Saffron" },
  { hex: "#C9A84C", name: "Gold" },
  { hex: "#E8D5A3", name: "Gold Light" },
  { hex: "#8C847C", name: "Muted" },
];

const BADGE_STYLES: Record<ColorInfo["harmonyBadge"], React.CSSProperties> = {
  "perfect-fit": { background: "#D4AF3722", color: "#8a6a00", border: "1px solid #D4AF3755" },
  accent:        { background: "#A0B0E022", color: "#3a4a8a", border: "1px solid #A0B0E055" },
  contrast:      { background: "#A0E0F022", color: "#006680", border: "1px solid #A0E0F055" },
  neutral:       { background: "#E0E0E022", color: "#666",    border: "1px solid #ccc" },
};

const BADGE_LABELS: Record<ColorInfo["harmonyBadge"], string> = {
  "perfect-fit": "✦ Perfect Fit",
  accent:        "◈ Complementary Accent",
  contrast:      "◇ Bold Contrast",
  neutral:       "○ Neutral",
};

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

function hexToHsl(hex: string) {
  let { r, g, b } = hexToRgb(hex);
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const toL = (c: number) => { const v = c / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  return 0.2126 * toL(r) + 0.7152 * toL(g) + 0.0722 * toL(b);
}

function contrastRatio(h1: string, h2: string) {
  const l1 = luminance(h1), l2 = luminance(h2);
  return parseFloat(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2));
}

function wcagGrade(ratio: number) {
  if (ratio >= 7)   return { label: "AAA",      color: "#166534" };
  if (ratio >= 4.5) return { label: "AA",       color: "#166534" };
  if (ratio >= 3)   return { label: "AA Large", color: "#854d0e" };
  return                   { label: "Fail",     color: "#991b1b" };
}

/* ──────────────────────────────────────────────
   ColorCard Component
────────────────────────────────────────────── */
function ColorCard({ color, index }: { color: ColorInfo; index: number }) {
  const [copied, setCopied] = useState(false);
  const { r, g, b } = hexToRgb(color.hex);
  const hsl = hexToHsl(color.hex);
  const cw = contrastRatio(color.hex, "#FFFFFF");
  const cd = contrastRatio(color.hex, "#2A1208");
  const gw = wcagGrade(cw);
  const gd = wcagGrade(cd);

  const copyHex = () => {
    navigator.clipboard.writeText(color.hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const textColor = cd > cw ? "#2A1208" : "#fff";

  return (
    <article
      id={`color-card-${index}`}
      style={{
        background: "#fff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(42,18,8,0.07)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(42,18,8,0.13)";
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 24px rgba(42,18,8,0.07)";
      }}
    >
      {/* Swatch */}
      <div onClick={copyHex} style={{ height: "200px", background: color.hex, position: "relative", cursor: "pointer" }}>
        <div style={{ position: "absolute", top: 12, left: 12, fontSize: "13px", fontWeight: 700, fontFamily: "monospace", background: "rgba(255,255,255,0.88)", backdropFilter: "blur(6px)", borderRadius: "8px", padding: "4px 10px", color: "#2A1208" }}>
          {color.hex}
        </div>
        <div style={{ position: "absolute", bottom: 12, right: 12, fontSize: "11px", background: "rgba(255,255,255,0.9)", borderRadius: "6px", padding: "3px 8px", color: "#555" }}>
          {copied ? "✓ Copied!" : "Click to copy"}
        </div>
        <div style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: "50%", background: "rgba(42,18,8,0.6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700 }}>
          {index + 1}
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column", gap: "16px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "20px", fontWeight: 700, color: "#2A1208", fontFamily: "Cormorant Garamond, Georgia, serif" }}>{color.name}</h2>
          <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#8C847C", fontStyle: "italic" }}>{color.mood}</p>
        </div>

        {/* Values */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {[{ l: "HEX", v: color.hex }, { l: "RGB", v: `${r}, ${g}, ${b}` }, { l: "HSL", v: `${hsl.h}° ${hsl.s}% ${hsl.l}%` }].map(({ l, v }) => (
            <div key={l} style={{ background: "#FAF6F0", borderRadius: "8px", padding: "6px 10px", fontSize: "11px" }}>
              <span style={{ color: "#8C847C", fontWeight: 600 }}>{l} </span>
              <span style={{ color: "#2A1208", fontFamily: "monospace" }}>{v}</span>
            </div>
          ))}
        </div>

        <p style={{ margin: 0, fontSize: "14px", color: "#5C564F", lineHeight: 1.6 }}>{color.personality}</p>

        {/* Harmony badge */}
        <div style={{ display: "inline-flex", alignSelf: "flex-start", borderRadius: "20px", padding: "4px 12px", fontSize: "11px", fontWeight: 600, ...BADGE_STYLES[color.harmonyBadge] }}>
          {BADGE_LABELS[color.harmonyBadge]}
        </div>

        {/* Use cases */}
        <div>
          <p style={{ margin: "0 0 4px", fontSize: "11px", fontWeight: 700, color: "#8C847C", textTransform: "uppercase", letterSpacing: "0.08em" }}>Recommended Uses</p>
          <p style={{ margin: 0, fontSize: "13px", color: "#5C564F", lineHeight: 1.5 }}>{color.use}</p>
        </div>

        {/* Contrast */}
        <div>
          <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 700, color: "#8C847C", textTransform: "uppercase", letterSpacing: "0.08em" }}>Accessibility (WCAG 2.1)</p>
          <div style={{ display: "flex", gap: "8px" }}>
            {[
              { bg: "#fff",    label: "on White",   ratio: cw, grade: gw, tc: "#8C847C" },
              { bg: "#2A1208", label: "on Charcoal", ratio: cd, grade: gd, tc: "#E8D5A3" },
            ].map(({ bg, label, ratio, grade, tc }) => (
              <div key={label} style={{ flex: 1, background: bg, border: "1px solid #EFEAE2", borderRadius: "10px", padding: "10px", display: "flex", flexDirection: "column", gap: "4px" }}>
                <span style={{ fontSize: "11px", color: tc }}>{label}</span>
                <span style={{ fontSize: "18px", fontWeight: 700, fontFamily: "monospace", color: color.hex }}>Aa</span>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: "11px", color: tc }}>{ratio}:1</span>
                  <span style={{ fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px", background: grade.color + "22", color: grade.color, border: `1px solid ${grade.color}44` }}>{grade.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Preview */}
        <div>
          <p style={{ margin: "0 0 8px", fontSize: "11px", fontWeight: 700, color: "#8C847C", textTransform: "uppercase", letterSpacing: "0.08em" }}>Live UI Preview</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
            <button style={{ background: color.hex, color: textColor, border: "none", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Book a Call</button>
            <button style={{ background: "transparent", color: "#2A1208", border: `2px solid ${color.hex}`, borderRadius: "8px", padding: "6px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer" }}>Learn More</button>
            <span style={{ background: color.hex, color: textColor, borderRadius: "20px", padding: "3px 10px", fontSize: "11px", fontWeight: 600 }}>Heritage</span>
            <span style={{ width: 36, height: 36, borderRadius: "50%", background: color.hex, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: "16px" }}>✦</span>
            <div style={{ height: "10px", flex: "1 0 100%", borderRadius: "6px", background: `linear-gradient(90deg, ${color.hex}, ${color.hex}88)`, marginTop: "4px" }} />
          </div>
        </div>
      </div>
    </article>
  );
}

/* ──────────────────────────────────────────────
   Harmony Board
────────────────────────────────────────────── */
function HarmonyBoard() {
  const allColors = [
    ...EXISTING_COLORS.map(c => ({ ...c, isNew: false })),
    ...CLIENT_COLORS.map(c => ({ hex: c.hex, name: c.name, isNew: true })),
  ];

  return (
    <section id="harmony-board" style={{ background: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 4px 24px rgba(42,18,8,0.07)", marginBottom: "48px" }}>
      <h2 style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: 700, fontFamily: "Cormorant Garamond, Georgia, serif", color: "#2A1208" }}>Full Palette Harmony Board</h2>
      <p style={{ margin: "0 0 32px", color: "#8C847C", fontSize: "14px" }}>Existing Virasat colors <strong>+</strong> proposed client colors — side by side.</p>

      <div style={{ display: "flex", borderRadius: "12px", overflow: "hidden", height: "80px", marginBottom: "24px" }}>
        {allColors.map((c, i) => (
          <div key={i} title={`${c.name} ${c.hex}`} style={{ flex: 1, background: c.hex, position: "relative", transition: "flex 0.3s ease", cursor: "default" }}
            onMouseEnter={e => (e.currentTarget.style.flex = "2")}
            onMouseLeave={e => (e.currentTarget.style.flex = "1")}
          >
            {c.isNew && <div style={{ position: "absolute", top: 4, left: "50%", transform: "translateX(-50%)", width: 6, height: 6, borderRadius: "50%", background: "rgba(255,255,255,0.9)", boxShadow: "0 0 4px rgba(0,0,0,0.3)" }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {allColors.map((c, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <span style={{ width: 16, height: 16, borderRadius: "4px", background: c.hex, display: "inline-block", border: "1px solid rgba(0,0,0,0.08)", outline: c.isNew ? "2px solid #D4AF37" : "none", outlineOffset: "1px" }} />
            <span style={{ fontSize: "12px", color: "#5C564F" }}>{c.name}{c.isNew && <span style={{ color: "#8a6a00", fontWeight: 600 }}> ✦new</span>}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: "32px" }}>
        <p style={{ margin: "0 0 16px", fontSize: "13px", fontWeight: 700, color: "#8C847C", textTransform: "uppercase", letterSpacing: "0.08em" }}>Suggested Pairings</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "12px" }}>
          {[
            { bg: "#F4DEB0", fg: "#2A1208", label: "Sandy Warmth on Charcoal",   desc: "Section backgrounds" },
            { bg: "#D4AF37", fg: "#FAF6F0", label: "Classic Gold on Cream",       desc: "Primary CTA" },
            { bg: "#FAF6F0", fg: "#D4AF37", label: "Cream on Classic Gold",       desc: "Hero headline" },
            { bg: "#F8B8A0", fg: "#2A1208", label: "Peachy Blush on Charcoal",    desc: "Testimonial cards" },
            { bg: "#2A1208", fg: "#A0B0E0", label: "Periwinkle on Charcoal",      desc: "Dark section accents" },
            { bg: "#2A1208", fg: "#A0E0F0", label: "Sky Mist on Charcoal",        desc: "Feature highlights" },
          ].map((p, i) => (
            <div key={i} style={{ borderRadius: "10px", overflow: "hidden", border: "1px solid #EFEAE2" }}>
              <div style={{ background: p.bg, padding: "16px", color: p.fg, fontSize: "15px", fontWeight: 600, fontFamily: "Cormorant Garamond, Georgia, serif" }}>{p.label}</div>
              <div style={{ padding: "8px 12px", background: "#FAFAFA", fontSize: "11px", color: "#8C847C" }}>{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Summary Table
────────────────────────────────────────────── */
function SummaryTable() {
  return (
    <section id="summary-table" style={{ background: "#fff", borderRadius: "20px", padding: "40px", boxShadow: "0 4px 24px rgba(42,18,8,0.07)", marginBottom: "48px", overflowX: "auto" }}>
      <h2 style={{ margin: "0 0 24px", fontSize: "28px", fontWeight: 700, fontFamily: "Cormorant Garamond, Georgia, serif", color: "#2A1208" }}>Analysis Summary</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
        <thead>
          <tr style={{ borderBottom: "2px solid #EFEAE2" }}>
            {["#","Swatch","Name & Hex","Mood","WCAG on White","WCAG on Dark","Harmony","Priority"].map(h => (
              <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: "11px", fontWeight: 700, color: "#8C847C", textTransform: "uppercase", letterSpacing: "0.08em" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {CLIENT_COLORS.map((c, i) => {
            const cw = contrastRatio(c.hex, "#FFFFFF");
            const cd = contrastRatio(c.hex, "#2A1208");
            const gw = wcagGrade(cw); const gd = wcagGrade(cd);
            const priority = c.harmonyBadge === "perfect-fit" ? "High" : c.harmonyBadge === "accent" ? "Medium" : "Functional";
            return (
              <tr key={i} style={{ borderBottom: "1px solid #EFEAE2" }}>
                <td style={{ padding: "12px" }}>{i + 1}</td>
                <td style={{ padding: "12px" }}><span style={{ display: "inline-block", width: 28, height: 28, borderRadius: "6px", background: c.hex, border: "1px solid rgba(0,0,0,0.08)" }} /></td>
                <td style={{ padding: "12px" }}><strong style={{ color: "#2A1208" }}>{c.name}</strong><br /><code style={{ fontSize: "11px", color: "#8C847C" }}>{c.hex}</code></td>
                <td style={{ padding: "12px", color: "#5C564F", fontStyle: "italic" }}>{c.mood}</td>
                <td style={{ padding: "12px" }}><span style={{ color: gw.color, fontWeight: 700 }}>{gw.label}</span><span style={{ color: "#aaa", marginLeft: "4px" }}>({cw}:1)</span></td>
                <td style={{ padding: "12px" }}><span style={{ color: gd.color, fontWeight: 700 }}>{gd.label}</span><span style={{ color: "#aaa", marginLeft: "4px" }}>({cd}:1)</span></td>
                <td style={{ padding: "12px", color: "#5C564F" }}>{c.harmony}</td>
                <td style={{ padding: "12px" }}>
                  <span style={{ padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, background: priority === "High" ? "#D4AF3722" : priority === "Medium" ? "#A0B0E022" : "#A0E0F022", color: priority === "High" ? "#8a6a00" : priority === "Medium" ? "#3a4a8a" : "#006680" }}>{priority}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

/* ──────────────────────────────────────────────
   Main Page
────────────────────────────────────────────── */
export default function ColorTestPage() {
  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #FAF6F0 0%, #F4DEB0 40%, #FAF6F0 100%)", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Dev-only banner */}
      <div style={{ background: "#2A1208", color: "#D4AF37", textAlign: "center", padding: "10px", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
        🔒 Local Preview Only · Color Palette Testing · Not Committed to Git
      </div>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "48px 24px" }}>
        {/* Header */}
        <header style={{ marginBottom: "56px" }}>
          <p style={{ margin: "0 0 8px", fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "#BD5319" }}>Hamari Virasat · Color Analysis</p>
          <h1 style={{ margin: "0 0 16px", fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 700, lineHeight: 1.1, color: "#2A1208", fontFamily: "Cormorant Garamond, Georgia, serif" }}>
            Client Color Palette Review
          </h1>
          <p style={{ margin: 0, fontSize: "16px", color: "#8C847C", maxWidth: "640px", lineHeight: 1.7 }}>
            Detailed analysis of 5 proposed hex codes — covering mood, personality, accessibility (WCAG 2.1),
            harmony with the existing Virasat palette, and live UI previews.
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "24px", flexWrap: "wrap" }}>
            <a href="#harmony-board" style={{ padding: "8px 16px", borderRadius: "8px", background: "#2A1208", color: "#D4AF37", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>↓ Harmony Board</a>
            <a href="#summary-table" style={{ padding: "8px 16px", borderRadius: "8px", background: "transparent", border: "2px solid #2A1208", color: "#2A1208", fontSize: "13px", fontWeight: 600, textDecoration: "none" }}>↓ Summary Table</a>
          </div>
        </header>

        {/* Color Cards Grid */}
        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "28px", marginBottom: "56px" }}>
          {CLIENT_COLORS.map((color, i) => <ColorCard key={color.hex} color={color} index={i} />)}
        </section>

        <HarmonyBoard />
        <SummaryTable />

        <footer style={{ textAlign: "center", color: "#8C847C", fontSize: "12px", padding: "24px 0" }}>
          Generated for Hamari Virasat · Local Preview · {new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </footer>
      </div>
    </div>
  );
}
