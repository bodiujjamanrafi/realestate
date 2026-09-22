# Luxury Dark Mode Design System (Aura Estates Specification)

A comprehensive, production-ready design system guide crafted for high-end luxury digital products, editorial platforms, real estate portals, and premium web applications.

---

## 1. Brand Identity & Design Philosophy

- **Aesthetic Direction**: Ultra-Luxury Minimalist Dark Mode, High-Society Editorial Prestige, Architectural Modernism.
- **Atmosphere**: Deep obsidian layers, warm champagne/royal gold metallic accents, frosted glassmorphic panels, and subtle ambient glows.
- **Interaction Feel**: Smooth cubic-bezier transitions, floating card lift physics, luminous border glows on hover, and responsive typography scales.

---

## 2. Global Color Palette & Design Tokens

### CSS Root Variables (`:root`)

```css
:root {
  /* Surface & Background Layers */
  --bg-primary: #0A0C10;         /* Deepest obsidian foundation */
  --bg-secondary: #12161E;       /* Elevated dark slate container */
  --bg-card: #181E29;            /* Component card & item background */
  --bg-overlay: rgba(5, 6, 8, 0.92); /* Modal & dialog backdrop */

  /* Royal Gold Brand Hierarchy */
  --accent-gold: #D4AF37;        /* Signature royal gold */
  --accent-gold-rgb: 212, 175, 55;
  --accent-gold-hover: #C5A85C;  /* Muted gold hover state */
  --accent-gold-light: #F1E4C3;  /* Champagne highlight */
  --accent-gold-dim: rgba(212, 175, 55, 0.12); /* Subtle gold tint */

  /* Text & Content Hierarchy */
  --text-primary: #F8FAFC;      /* High-contrast pure white/slate */
  --text-secondary: #94A3B8;    /* Muted body text */
  --text-muted: #64748B;        /* Placeholders & captions */

  /* Borders & Glow Effects */
  --border-color: rgba(212, 175, 55, 0.12); /* Delicate gold wireframe */
  --border-glow: rgba(212, 175, 55, 0.35);  /* Hovered gold border */
  --border-subtle: rgba(255, 255, 255, 0.05);

  /* Shadows & Ambient Light */
  --glow-gold: 0 8px 32px 0 rgba(212, 175, 55, 0.08);
  --shadow-premium: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
  --shadow-card-hover: 0 24px 48px -12px rgba(0, 0, 0, 0.8), 0 0 24px rgba(212, 175, 55, 0.15);

  /* Semantic Financial & Status Indicators */
  --status-positive: #34D399;    /* Luminous Emerald / Mint */
  --status-positive-bg: rgba(52, 211, 153, 0.12);
  --status-negative: #FB7185;    /* Refined Crimson / Rose */
  --status-negative-bg: rgba(251, 113, 133, 0.12);
  --status-info: #60A5FA;        /* Sapphire Blue */

  /* Font Families */
  --font-headings: 'Syne', sans-serif;
  --font-body: 'Plus Jakarta Sans', sans-serif;

  /* Motion & Transitions */
  --transition-fast: all 0.15s ease;
  --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-bounce: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);

  color-scheme: dark;
}
```

### Color Reference Table

| Role | Variable | Hex / RGBA | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas Background** | `--bg-primary` | `#0A0C10` | Full page body background |
| **Section Background** | `--bg-secondary` | `#12161E` | Secondary containers, sidebar panels |
| **Card Background** | `--bg-card` | `#181E29` | Cards, dropdown menus, grid items |
| **Primary Accent** | `--accent-gold` | `#D4AF37` | Primary buttons, active tabs, key highlights |
| **Hover Accent** | `--accent-gold-hover`| `#C5A85C` | Button hover states, interactive focus |
| **Primary Text** | `--text-primary` | `#F8FAFC` | Headings, emphasized text, metric values |
| **Secondary Text** | `--text-secondary` | `#94A3B8` | Paragraphs, descriptions, secondary stats |
| **Muted Text** | `--text-muted` | `#64748B` | Labels, placeholders, footers |
| **Gold Border** | `--border-color` | `rgba(212, 175, 55, 0.12)` | Subtle glass card borders |
| **Luminous Green** | `--status-positive` | `#34D399` | Positive yield, verified status, gains |
| **Refined Rose** | `--status-negative` | `#FB7185` | Expenses, alerts, decreases |

---

## 3. Typography Hierarchy

### Google Fonts Setup

Add to `<head>` in `index.html`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@500..800&display=swap" rel="stylesheet">
```

### Typography Scale & Rules

| Level | Font Family | Size (Desktop) | Size (Mobile) | Weight | Tracking / Line Height |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display / Hero H1** | Syne | `clamp(2.5rem, 5vw, 4.5rem)` | `2.15rem` | 800 | `-0.03em` / `1.15` |
| **Section Title H2** | Syne | `2.5rem` (`40px`) | `1.65rem` | 800 | `-0.02em` / `1.2` |
| **Card Title H3** | Syne | `1.35rem` (`22px`) | `1.15rem` | 700 | `-0.01em` / `1.3` |
| **Subtitle H4 / Lead** | Plus Jakarta Sans | `1.1rem` (`18px`) | `0.95rem` | 600 | `0.02em` / `1.4` |
| **Body Text** | Plus Jakarta Sans | `0.95rem` (`15px`) | `0.85rem` | 400 | `0` / `1.6` |
| **Captions / Form Labels** | Plus Jakarta Sans | `0.85rem` (`13px`) | `0.75rem` | 600 (Uppercase) | `0.08em` / `1.4` |
| **Micro Badges** | Plus Jakarta Sans | `0.75rem` (`12px`) | `0.65rem` | 800 (Uppercase) | `0.12em` / `1.2` |

### Metallic Gold Gradient Text Utility

```css
.text-gold-gradient {
  background: linear-gradient(135deg, #FFFFFF 0%, #F1E4C3 50%, var(--accent-gold) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;
}

.text-gold {
  color: var(--accent-gold);
}
```

---

## 4. Spacing, Layout & Grid Systems

### Spacing Scale

| Token | Size | Common Use Case |
| :--- | :--- | :--- |
| `space-1` | `4px` | Micro gaps between icon and text |
| `space-2` | `8px` | Badge internal padding, inline element gap |
| `space-3` | `12px` | Form group spacing, icon badge padding |
| `space-4` | `16px` | Card internal content gap, input vertical padding |
| `space-6` | `24px` | Card padding, grid gap on tablet/mobile |
| `space-8` | `32px` | Grid gap on desktop, modal interior padding |
| `space-12` | `48px` | Section header bottom margin |
| `section-y` | `100px` (Desktop) / `50px` (Mobile) | Full-width section vertical padding |

### Global Layout Container

```css
.container {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-padding {
  padding: 100px 0;
}

@media (max-width: 768px) {
  .container {
    padding: 0 16px;
  }
  .section-padding {
    padding: 50px 0;
  }
}
```

### Standard Grid Layouts

- **3-Column Feature Grid (Desktop)**:
  `grid-template-columns: repeat(3, 1fr); gap: 32px;`
- **2-Column Split (Tablet / Hero / Form & Info)**:
  `grid-template-columns: repeat(2, 1fr); gap: 24px;`
- **Single Column (Mobile)**:
  `grid-template-columns: 1fr; gap: 20px;`

---

## 5. Glassmorphism & Elevation Specs

### `.glass-panel` (Section containers, Modals, Navbars)
```css
.glass-panel {
  background: rgba(18, 22, 30, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid var(--border-color);
}
```

### `.glass-card` (Interactive feature cards, Listings, Grids)
```css
.glass-card {
  background: rgba(24, 30, 41, 0.6);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  transition: var(--transition-smooth);
}

.glass-card:hover {
  border-color: rgba(212, 175, 55, 0.3);
  transform: translateY(-6px);
  box-shadow: var(--shadow-premium), var(--glow-gold);
}
```

### Ambient Atmospheric Glow Orbs
Placed behind dark sections for high-end atmospheric depth:
```jsx
<div 
  style={{
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'rgba(212, 175, 55, 0.04)',
    filter: 'blur(100px)',
    borderRadius: '50%',
    pointerEvents: 'none'
  }} 
/>
```

---

## 6. Core Component Library

### A. Buttons (`.btn`)

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 28px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: var(--font-body);
  border-radius: 8px;
  cursor: pointer;
  transition: var(--transition-smooth);
  text-decoration: none;
}

/* Primary Gold Button */
.btn-primary {
  background: var(--accent-gold);
  color: var(--bg-primary);
  border: 1px solid var(--accent-gold);
}

.btn-primary:hover {
  background: var(--accent-gold-hover);
  border-color: var(--accent-gold-hover);
  box-shadow: 0 0 20px rgba(212, 175, 55, 0.35);
  transform: translateY(-2px);
}

/* Secondary Ghost Wireframe Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
}

.btn-secondary:hover {
  border-color: var(--accent-gold);
  background: rgba(212, 175, 55, 0.05);
  transform: translateY(-2px);
}

/* Circular Icon Action Button */
.btn-icon {
  width: 44px;
  height: 44px;
  padding: 0;
  border-radius: 50%;
  background: rgba(18, 22, 30, 0.8);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--transition-smooth);
}

.btn-icon:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  transform: scale(1.08);
}
```

### B. Form Inputs & Select Controls

```css
.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;
}

.form-label {
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--accent-gold);
}

.form-input, .form-select, .form-textarea {
  background: rgba(10, 12, 16, 0.6);
  border: 1px solid var(--border-color);
  color: var(--text-primary);
  padding: 14px 18px;
  border-radius: 8px;
  font-family: var(--font-body);
  font-size: 0.95rem;
  transition: var(--transition-smooth);
  width: 100%;
}

.form-input:focus, .form-select:focus, .form-textarea:focus {
  outline: none;
  border-color: var(--accent-gold);
  box-shadow: 0 0 0 3px rgba(212, 175, 55, 0.15);
}

.form-input::placeholder {
  color: var(--text-muted);
}
```

### C. Badges & Tags

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  border-radius: 99px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Luxury Asymmetric Gold Brand Badge */
.badge-gold {
  background: linear-gradient(90deg, rgba(212, 175, 55, 0.16) 0%, rgba(212, 175, 55, 0.02) 100%);
  color: var(--accent-gold);
  border: none;
  border-left: 3px solid var(--accent-gold);
  border-radius: 2px 12px 12px 2px;
  padding: 6px 14px 6px 10px;
  letter-spacing: 0.12em;
  font-weight: 800;
}

/* Green Status / Verified Badge */
.badge-green {
  background: rgba(34, 197, 94, 0.1);
  color: #34d399;
  border: 1px solid rgba(52, 211, 153, 0.2);
}

/* Squircle Icon Badge */
.premium-icon-badge {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(212, 175, 55, 0.02) 100%);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(212, 175, 55, 0.2);
  box-shadow: 0 4px 15px rgba(212, 175, 55, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: var(--transition-smooth);
}

.premium-icon-badge:hover {
  transform: translateY(-2px) scale(1.05);
  border-color: rgba(212, 175, 55, 0.4);
  box-shadow: 0 6px 20px rgba(212, 175, 55, 0.15);
}
```

### D. Modal & Dialog Backdrop

```css
/* Modal Backdrop Container */
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-overlay);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  z-index: 1100;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Modal Inner Panel */
.modal-window {
  width: 100%;
  max-width: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: var(--shadow-premium), var(--glow-gold);
  position: relative;
  padding: 40px 32px;
}
```

### E. Custom Luxury Scrollbar

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-primary);
}

::-webkit-scrollbar-thumb {
  background: rgba(212, 175, 55, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--accent-gold);
}
```

---

## 7. Animation & Motion Design

### Keyframe Declarations

```css
/* Smooth Fade Up Entrance */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Radar Pulse Marker Animation (Virtual Tour / Map Hotspots) */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(212, 175, 55, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
  }
}

.hotspot-pulse {
  position: absolute;
  width: 20px;
  height: 20px;
  background: var(--accent-gold);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s infinite;
}

/* Luxury Compass / Logo Spinner */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulseCompass {
  0%, 100% {
    transform: scale(1);
    filter: drop-shadow(0 0 10px rgba(212, 175, 55, 0.2));
  }
  50% {
    transform: scale(1.08);
    filter: drop-shadow(0 0 25px rgba(212, 175, 55, 0.6));
  }
}
```

---

## 8. Mobile Responsiveness Guidelines

| Component | Desktop (`>1024px`) | Tablet (`768px - 1024px`) | Mobile (`<768px`) |
| :--- | :--- | :--- | :--- |
| **Section Vertical Padding** | `100px` | `70px` | `50px` |
| **Main Heading H1** | `4.5rem` | `3.2rem` | `2.15rem` |
| **Section Heading H2** | `2.5rem` | `2.0rem` | `1.65rem` |
| **Feature Grids** | 3 Columns (`repeat(3, 1fr)`) | 2 Columns (`repeat(2, 1fr)`) | 1 Column (`1fr`) |
| **Modal Width** | `480px` - `1000px` (Multi-tab) | `90%` | `95%` (Max height: `92vh`, single column stacked) |
| **Card Image Height** | `260px` | `220px` | `180px` |
| **Footer Links** | 4-5 Column Row | 3 Column Grid | 2 Column Grid (`repeat(2, 1fr)`) |

---

## 9. Quick Implementation Template for New Projects

To recreate this exact design system in any new React / Vite / Next.js project:

### Step 1: Install Dependencies
```bash
npm install lucide-react lottie-react canvas-confetti
```

### Step 2: Add Google Fonts to `index.html`
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&family=Syne:wght@500..800&display=swap" rel="stylesheet">
```

### Step 3: Import Design System CSS
Create `src/index.css` and include the CSS variable definitions, glassmorphism utilities, badge styles, buttons, and animations detailed in Sections 2–7 of this document.

### Step 4: Sample Component Boilerplate (Hero / Feature Card)

```jsx
import { Compass, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LuxuryCard({ title, subtitle, price, tag }) {
  return (
    <div className="glass-card" style={{ padding: '24px', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <span className="badge badge-gold">{tag || 'Exclusive'}</span>
        <div className="premium-icon-badge">
          <Compass size={20} />
        </div>
      </div>
      
      <h3 style={{ fontSize: '1.35rem', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontSize: '0.9rem', marginBottom: '20px' }}>{subtitle}</p>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Acquisition</span>
          <div className="text-gold-gradient" style={{ fontSize: '1.25rem', fontWeight: 800 }}>{price}</div>
        </div>
        
        <button className="btn btn-primary">
          Explore <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
```
