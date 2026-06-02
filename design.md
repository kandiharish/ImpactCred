# Impact Cred UI/UX Design System Specification (Gen Z Style Options)

This document outlines three distinct Gen Z-focused design systems for the **Impact Cred** platform. Please select one by commenting on this document or approving the preferred option, or modify the document to customize.

---

## Option 1: Neobrutalism (Recommended for bold, high-energy, startup vibe)
*A high-contrast, bold aesthetic that feels retro-modern, raw, and highly engaging.*

### 1. Color Palette
- **Primary Accent:** `#FFDF00` (Cyber Yellow) or `#FF5E3A` (Vivid Coral)
- **Secondary Accent:** `#00F5D4` (Neon Teal)
- **Background:** `#F8F9FA` (Off-white / light cream)
- **Borders & Shadows:** `#000000` (Pure Black)
- **Card Backgrounds:** `#FFFFFF` (Pure White) or very light pastel accents.

### 2. Styling Tokens (Vanilla CSS)
- **Borders:** `3px solid #000000` or `4px solid #000000`
- **Shadows:** Hard, non-blurry offset shadows: `box-shadow: 4px 4px 0px 0px #000000;`
- **Typography:** Heavy sans-serif headings (`Outfit` or `Space Grotesk`) with monospace code tags.
- **Border Radius:** Low-to-medium roundness (`8px` or `12px`) for a structured blocky look.
- **Hover Transitions:** Instant movement on hover (`transform: translate(-2px, -2px); box-shadow: 6px 6px 0px 0px #000;`).

---

## Option 2: Glassmorphism 2.0 (Recommended for clean, premium tech, futuristic feel)
*A sleek, modern, layered design using transparent cards, frosted glass, vibrant gradients, and soft glowing elements.*

### 1. Color Palette
- **Gradients:** `linear-gradient(135deg, #6366F1 0%, #A855F7 100%)` (Indigo-to-Purple)
- **Background:** `#FAF9F6` (Warm linen) with floating blurred background blobs (`#6366F1` and `#EC4899` at 8% opacity).
- **Glass Card Background:** `rgba(255, 255, 255, 0.7)` with `backdrop-filter: blur(16px);`
- **Card Border:** `rgba(255, 255, 255, 0.6)`
- **Shadows:** Very soft, large blur shadows: `box-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05);`

### 2. Styling Tokens (Vanilla CSS)
- **Borders:** Thin, semi-transparent white border.
- **Typography:** Sleek geometric sans-serif (`Outfit`).
- **Border Radius:** Very round corners (`20px` to `24px`) for cards and inputs.
- **Hover Transitions:** Smooth easing (`transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);`), scale changes, and glowing border glow effects.

---

## Option 3: Minimalist Pastel & Editorial (Recommended for organic, trustworthy, impact-driven feel)
*A sophisticated, editorial aesthetic utilizing soft warm tones, elegant serif typography, and clean spacious layouts.*

### 1. Color Palette
- **Primary Accent:** `#0F4C3A` (Deep Forest Green - represents social impact and growth)
- **Secondary Accent:** `#D4AF37` (Muted Warm Gold)
- **Background:** `#FAF7F2` (Soft sand / light beige)
- **Muted Elements:** `#E6DFD5`
- **Text:** `#1C2E24` (Very dark charcoal green)

### 2. Styling Tokens (Vanilla CSS)
- **Borders:** Subtly thin border: `1px solid #E6DFD5`
- **Shadows:** None or extremely minimal card shadows (`box-shadow: 0 4px 12px rgba(0, 0, 0, 0.02);`)
- **Typography:** Serif headings (`Playfair Display` or `DM Serif Display`) with clean sans-serif body text (`Inter` or `Outfit`).
- **Border Radius:** Soft minimal corners (`6px` or `8px`).
- **Hover Transitions:** Fade and color shift effects (`transition: color 0.2s ease, background-color 0.2s ease;`).

---

## Design System Variable Mapping (`index.css`)

We will use CSS variables in `index.css` to dynamically change the theme depending on the option selected.

```css
/* CURRENT SELECTION: OPTION 2 (Glassmorphism 2.0) */
:root {
  --primary-accent: #6366f1;
  --secondary-accent: #a855f7;
  --bg-color: #faf9f6;
  --card-bg: rgba(255, 255, 255, 0.7);
  --card-border: rgba(255, 255, 255, 0.6);
  --text-main: #0f172a;
  --text-muted: #64748b;
  --border-radius: 20px;
  --glass-shadow: 0 8px 32px 0 rgba(99, 102, 241, 0.05);
  --transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  --font-family: 'Outfit', sans-serif;
}
```
