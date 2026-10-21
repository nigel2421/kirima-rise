# KIRIMA RISE — Brand Design System & Implementation Guidelines

> **Document Version:** 2.0 (Aligned with Official Brand Guidelines 2.09.26)  
> **Entity:** Kirima Rise — an entity of the Estate of G.K. Kirima  
> **Target Platforms:** Websites, Web Applications, Transactional & Marketing Emails, Stationery, and Digital/Physical Collateral  

---

## 1. Executive Summary & Brand Essence

**Kirima Rise** represents heritage, trust, generational stability, and premier property regularisation and development under the Estate of G.K. Kirima. 

The visual identity combines timeless classical prestige with crisp modern authority:
- **Core Descriptor:** *"Kirima Rise is an entity of the Estate of G.K. Kirima"*
- **Visual Character:** Sophisticated, authoritative, transparent, enduring.
- **Key Visual Elements:** Lion emblem intertwined with stylized 'R', dignified serif typography, high-contrast regal red, and deep evergreen accents.

---

## 2. Brand Color Palette

The brand palette is strictly governed by the approved Pantone standards. Digital implementations must use the exact hex codes and RGB equivalents specified below.

### 2.1 Primary Brand Colors

| Swatch | Color Name | Pantone | Hex | RGB | CMYK | Role / Usage |
|---|---|---|---|---|---|---|
| ![#E10600](https://via.placeholder.com/20/E10600/000000?text=+) | **Kirima Red** | **Pantone 2357 C** | `#E10600` | `rgb(255, 6, 0)` | `0, 97, 100, 12` | Primary brand identifier, primary call-to-action buttons, hero badges, main headings, top alert banners, email headers. |
| ![#00491E](https://via.placeholder.com/20/00491E/000000?text=+) | **Heritage Forest Green** | **Pantone 3537 C** | `#00491E` | `rgb(0, 73, 39)` | `100, 0, 59, 71` | Secondary brand anchor, verification checks, secondary CTAs, trust badges, borders, button outlines, WhatsApp / direct contact highlights. |

### 2.2 Neutral & Supporting Palette

| Swatch | Color Name | Hex | RGB | Role / Usage |
|---|---|---|---|---|
| ![#FFFFFF](https://via.placeholder.com/20/FFFFFF/000000?text=+) | **Pure White** | `#FFFFFF` | `rgb(255, 255, 255)` | Card backgrounds, pure contrast negative spaces, reversed text on red/green surfaces. |
| ![#FAF7F2](https://via.placeholder.com/20/FAF7F2/000000?text=+) | **Warm Sand / Cream** | `#FAF7F2` | `rgb(250, 247, 242)` | Elevated surface fills, stationery parchment backgrounds, quotation cards, gentle section separators. |
| ![#1A1A1A](https://via.placeholder.com/20/1A1A1A/000000?text=+) | **Charcoal Black** | `#1A1A1A` | `rgb(26, 26, 26)` | High-readability body copy, dark subheadings, monochrome logos. |
| ![#555555](https://via.placeholder.com/20/555555/000000?text=+) | **Muted Slate** | `#555555` | `rgb(85, 85, 85)` | Meta-information, captions, secondary labels, helper text. |
| ![#E5E7EB](https://via.placeholder.com/20/E5E7EB/000000?text=+) | **Border Gray** | `#E5E7EB` | `rgb(229, 231, 235)` | Subtle dividers, form field borders, table boundaries. |
| ![#F3F4F6](https://via.placeholder.com/20/F3F4F6/000000?text=+) | **Surface Tint** | `#F3F4F6` | `rgb(243, 244, 246)` | Subtle table striping, input inactive backgrounds, light UI panels. |

### 2.3 Color Usage Rules
- **Never substitute** Kirima Red (`#E10600`) with generic crimson, brick red (`#B01F24` or `#970B10`), or orange.
- **Never substitute** Heritage Green (`#00491E`) with bright neon green or olive.
- **Contrast Compliance:** When placing text over Kirima Red (`#E10600`), use **Pure White (`#FFFFFF`)**. When placing text over Heritage Forest Green (`#00491E`), use **Pure White (`#FFFFFF`)**.

---

## 3. Typography System

The official primary typeface for Kirima Rise across all print and digital mediums is **EB Garamond**.

### 3.1 Primary Font: EB Garamond
- **Google Fonts Import:**
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap" rel="stylesheet">
  ```
- **CSS Font Family Declaration:**
  ```css
  font-family: 'EB Garamond', Georgia, 'Times New Roman', serif;
  ```

### 3.2 Typography Hierarchy & Specs

| Hierarchy | Weight | Desktop Size | Mobile Size | Line Height | Letter Spacing | Case | Role |
|---|---|---|---|---|---|---|---|
| **H1 Display** | Bold (700) | 56px – 72px | 36px – 44px | 1.15 | -0.01em | Title / Sentence | Main hero headers, page titles |
| **H2 Section** | Bold (700) | 36px – 44px | 28px – 32px | 1.25 | normal | Title Case | Major section headers |
| **H3 Subsection**| SemiBold (600) | 26px – 30px | 22px – 24px | 1.3 | normal | Title Case | Feature cards, parcel headers |
| **H4 Title** | SemiBold (600) | 20px – 22px | 18px – 20px | 1.35 | normal | Title Case | Modal titles, form group titles |
| **Lead / Subtitle**| Regular / Italic (400) | 20px – 22px | 17px – 18px | 1.5 | normal | Normal | Hero supporting text |
| **Body Text** | Regular (400) | 17px – 18px | 16px | 1.65 | normal | Normal | Standard article and narrative text |
| **Buttons / CTAs** | SemiBold (600) / Bold (700) | 15px – 16px | 14px – 15px | 1.0 | 0.05em | Uppercase | Buttons, menu items, action badges |
| **Caption / Meta** | Medium (500) | 13px – 14px | 12px – 13px | 1.4 | 0.02em | Normal | Dates, footer notes, image captions |

### 3.3 Supporting Sans-Serif (Functional Data Only)
Where numerical tables, micro badge indicators, or dense system data strictly require a sans-serif neutral for compact readability, use the clean modern sans stack:
```css
font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
```
*Note: All branding, titles, navigation links, and narrative paragraphs must remain in **EB Garamond**.*

---

## 4. Logo Anatomy & Usage Rules

### 4.1 Anatomy
The official logo consists of:
1. **The Emblem / Icon:** A stylized, regal lion facing left intertwined with the calligraphic letter **'R'**.
2. **The Brand Rule:** A sharp horizontal separation line tapering outward.
3. **The Logotype:**
   - **KIRIMA** — Displayed in high-contrast serif Roman capitals.
   - **RISE** — Displayed in tracked serif capitals centered beneath the divider line.
4. **Descriptor (Optional):** Centered beneath RISE (e.g., *"ESTATE OF G.K. KIRIMA"* or specific project division).

### 4.2 Approved Logo Variations
1. **Full Colour (Primary):**
   - Icon: Red (`#E10600`) and Forest Green (`#00491E`).
   - Logotype "KIRIMA": Red (`#E10600`).
   - Rule & "RISE": Forest Green (`#00491E`).
   - Use on: White and light cream backgrounds.
2. **Monochrome White (Reversed):**
   - Icon, rule, and type all solid white (`#FFFFFF`).
   - Use on: Kirima Red backgrounds, dark photography overlays, green brand surfaces.
3. **Monochrome Black:**
   - Icon, rule, and type all solid black (`#000000`).
   - Use on: Black & white print, official legal filings, grayscale documents.

### 4.3 Clear Space & Protection Zone
- The minimum clear space surrounding the logo is proportional to the height of the letter **'K'** in "KIRIMA".
- No text, icons, graphics, or borders may encroach into this protective perimeter.

### 4.4 Logo Don'ts
- ❌ Do NOT alter the colors of the icon or logotype.
- ❌ Do NOT stretch, squish, or distort the aspect ratio.
- ❌ Do NOT place the full-color logo over busy, low-contrast photographic backgrounds.
- ❌ Do NOT apply drop shadows, glows, or bevels to the logo.
- ❌ Do NOT rotate or tilt the logo.

---

## 5. Web Design System & CSS Implementation

### 5.1 Global CSS Variables
All websites and web applications must incorporate this core stylesheet foundation:

```css
:root {
  /* Brand Colors */
  --kr-color-red: #E10600;          /* Pantone 2357 C */
  --kr-color-green: #00491E;        /* Pantone 3537 C */
  --kr-color-white: #FFFFFF;
  --kr-color-cream: #FAF7F2;
  --kr-color-dark: #1A1A1A;
  --kr-color-gray-muted: #555555;
  --kr-color-border: #E5E7EB;
  --kr-color-surface: #F9FAFB;

  /* Typography */
  --kr-font-serif: 'EB Garamond', Georgia, 'Times New Roman', serif;
  --kr-font-sans: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;

  /* Elementor / Legacy Overrides */
  --e-global-color-primary: var(--kr-color-red) !important;
  --e-global-color-secondary: var(--kr-color-green) !important;
  --e-global-color-text: var(--kr-color-dark) !important;
  --e-global-color-accent: var(--kr-color-green) !important;
  --e-global-typography-primary-font-family: var(--kr-font-serif) !important;
  --e-global-typography-secondary-font-family: var(--kr-font-serif) !important;
  --e-global-typography-text-font-family: var(--kr-font-serif) !important;

  /* Radius & Shadows */
  --kr-radius-sm: 4px;
  --kr-radius-md: 8px;
  --kr-radius-lg: 12px;
  --kr-shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.05);
  --kr-shadow-card: 0 4px 16px rgba(0, 0, 0, 0.08);
  --kr-shadow-elevated: 0 10px 25px rgba(0, 0, 0, 0.12);
}
```

### 5.2 UI Components

#### Buttons
- **Primary CTA Button:**
  ```css
  .kr-btn-primary {
    background-color: var(--kr-color-red);
    color: var(--kr-color-white);
    font-family: var(--kr-font-serif);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 12px 28px;
    border: 2px solid var(--kr-color-red);
    border-radius: var(--kr-radius-sm);
    transition: all 0.25s ease-in-out;
  }
  .kr-btn-primary:hover {
    background-color: #be0500;
    border-color: #be0500;
    box-shadow: 0 4px 12px rgba(225, 6, 0, 0.3);
  }
  ```

- **Secondary Trust Button (Green):**
  ```css
  .kr-btn-secondary {
    background-color: var(--kr-color-green);
    color: var(--kr-color-white);
    font-family: var(--kr-font-serif);
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    padding: 12px 28px;
    border: 2px solid var(--kr-color-green);
    border-radius: var(--kr-radius-sm);
    transition: all 0.25s ease-in-out;
  }
  .kr-btn-secondary:hover {
    background-color: #003616;
    border-color: #003616;
  }
  ```

- **Outlined Button:**
  ```css
  .kr-btn-outline {
    background-color: transparent;
    color: var(--kr-color-green);
    border: 2px solid var(--kr-color-green);
    font-family: var(--kr-font-serif);
    font-weight: 700;
    text-transform: uppercase;
    padding: 12px 26px;
    border-radius: var(--kr-radius-sm);
    transition: all 0.25s ease;
  }
  .kr-btn-outline:hover {
    background-color: var(--kr-color-green);
    color: var(--kr-color-white);
  }
  ```

#### Form Controls
- Focus outline must always use **Heritage Forest Green (`#00491E`)** or **Kirima Red (`#E10600`)**.
- Input fields should feature crisp 1px borders in `#D1D5DB`, with 4px border-radius and 16px font-size to prevent mobile browser zoom.

---

## 6. Email System Design (Transactional & Notification)

All outgoing emails sent from the platform (e.g. via `send-enquiry.php`) must follow these strict brand standards:

### 6.1 Layout & Visual Container
- **Max Width:** `600px` to `620px` centered table layout.
- **Background:** Neutral off-white `#F7F7F7` outer canvas with pure white `#FFFFFF` content card.
- **Header Banner:**
  - Background: Kirima Red (`#E10600`).
  - Accent Trim: 3px solid Heritage Forest Green (`#00491E`).
  - Typography: Pure White `#FFFFFF`, `'EB Garamond', Georgia, serif`.
  - Content: Official brand logo or crisp title with descriptor.
- **Message Callout / Summary:**
  - Background: Light cream `#FAF7F2` or subtle tint `#FCF8F8`.
  - Border: 4px solid Kirima Red (`#E10600`).
- **Confirmation / Action Alerts:**
  - Border: 1px solid `#00491E`.
  - Icon / Check: Heritage Forest Green (`#00491E`).
- **Email Signature & Footer:**
  - Full company metadata, phone lines, P.O. Box, and mandatory legal descriptor:
    *"Kirima Rise is an entity of the Estate of G.K. Kirima"*.

---

## 7. Official Company Metadata & Stationery Standards

### 7.1 Contact & Entity Details
- **Company Name:** Kirima Rise
- **Parent Legal Entity:** Estate of G.K. Kirima
- **Mandatory Entity Line:** *"Kirima Rise is an entity of the Estate of G.K. Kirima"*
- **Physical Address:** Kirima House, Mezzanine Floor, Mokhtar Daddah Street, Nairobi, Kenya
- **Postal Address:** P.O. Box 29880, Nairobi, 00200, Kenya
- **Official Inquiries Email:** `info@kirimarise.co.ke`
- **System Dispatches Email:** `comms@kirimarise.co.ke`
- **Telephone Lines:**
  - `0723 261 973` / `+254 723 261 973`
  - `0716 953 637` / `+254 716 953 637`
- **Official Website:** `https://kirimarise.co.ke`

### 7.2 Physical Dimensions
- **Letterhead:** A4 standard (210mm wide × 297mm high)
- **Business Cards:** 90mm wide × 50mm high
- **ID Cards:** 85mm high × 54mm wide

---

## 8. Physical Collateral, Livery & Signage Overview

1. **Vehicle Livery:**
   - **Option 1 (White Vehicle):** Clean white exterior, full-color Kirima Rise logo on side doors, lion watermark in subtle red tint across rear panel, contact details in Heritage Forest Green.
   - **Option 2 (Red Vehicle):** Pure Kirima Red (`#E10600`) vehicle wrap, solid white reverse logo on front doors, deep maroon lion motif watermark on rear panels.
   - **Delivery Scooters:** White body with rear delivery box branded in full color.
2. **Signage (Streets & Courts):**
   - Estate street and court signage formatted with dark forest green or charcoal framing, clean white or brushed steel plaques, with the official Kirima Rise emblem and court designation set in bold EB Garamond.
3. **Rollup & Teardrop Banners:**
   - Dual variant approach: White backdrop banner paired with Kirima Red banner for high visual presence at sales offices and site showcases.
4. **Apparel & Uniforms:**
   - White golf shirts with embroidered chest crest, red & white caps, khaki safari field vests for land survey/documentation staff, and charcoal field jackets.
