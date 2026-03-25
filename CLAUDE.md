# CLAUDE.md — 転職エージェントナビ

AI assistant reference for working on this codebase.

---

## Project Overview

**転職エージェントナビ** ("Job Change Agent Navigator") is a Japanese affiliate marketing website that ranks and compares job-change recruitment agencies (転職エージェント). The site is monetized through affiliate links and targets Japanese users researching which recruitment service to use.

- **Production URL:** https://tensyoku-navi.vercel.app
- **Deployment:** Vercel (automatic deploy from git push to `master`)
- **Language:** Japanese (all UI text, content, and comments are in Japanese)
- **Stack:** Pure static HTML/CSS/JS — no build tools, no frameworks, no backend

---

## Repository Structure

```
tensyoku-navi/
├── index.html              # Homepage — hero, ranking table, category card grid, CTA
├── privacy.html            # Privacy policy page
├── affiliate.html          # Affiliate disclosure page
├── robots.txt              # Allows all crawlers; points to sitemap
├── sitemap.xml             # Two URLs listed (homepage + agent-compare article)
├── css/
│   └── style.css           # Single global stylesheet (283 lines)
├── js/
│   └── main.js             # Single JavaScript file (58 lines)
└── articles/
    └── agent-compare.html  # Full 30-company comparison article page
```

### Planned but not yet created article pages (linked from index.html)
- `articles/agent-20s.html` — Guide for 20s / second-job-seekers
- `articles/agent-30s.html` — Guide for 30s / career advancement
- `articles/agent-it.html` — Guide for IT engineers
- `articles/agent-salary.html` — Guide for salary increase
- `articles/agent-women.html` — Guide for women / working mothers

These pages are linked from the card grid in `index.html` but do not exist yet. Creating them is the primary content expansion task.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Markup | Vanilla HTML5 (semantic elements) |
| Styling | Vanilla CSS3 with custom properties |
| Scripting | Vanilla JavaScript (ES6+, no frameworks) |
| Fonts | Google Fonts CDN — Noto Sans JP (400, 600, 700, 900) |
| Deployment | Vercel (static site) |
| Analytics | Google Analytics (referenced in privacy policy) |

**No package manager, no build step, no transpilation.** Files are served exactly as written.

---

## CSS Architecture

### Custom Properties (css/style.css:11–24)
```css
--primary:      #1a73e8   /* Blue — main brand color */
--primary-dark: #1557b0   /* Darker blue — hover states */
--accent:       #f4b400   /* Yellow — CTAs, highlights */
--dark:         #1a1a1a   /* Near-black — body text */
--gray:         #555      /* Secondary text */
--light:        #f8f9fa   /* Section alternating background */
--light-gray:   #f5f5f5   /* Table even rows */
--white:        #ffffff
--border:       #e0e0e0
--font-main:    'Noto Sans JP', 'Hiragino Sans', sans-serif
--shadow:       0 4px 20px rgba(0,0,0,0.1)
--radius:       12px
```

Always use these variables. Never hardcode color values.

### Responsive Breakpoint
Single breakpoint at `768px`. Mobile nav collapses to hamburger menu. Footer grid collapses to single column.

### Key CSS Components
- `.btn-primary` — Yellow CTA button with hover lift effect
- `.btn-secondary` — Ghost button (used on dark backgrounds)
- `.btn-cta` — Rounded blue nav button
- `.card` — Article card with hover lift; animated in by JS
- `.compare-table` — Full-width ranking table with zebra striping
- `.rank-badge` — Circular rank number (`.rank-1` gold, `.rank-2` silver, `.rank-3` bronze)
- `.agent-card` — 3-column grid card used in article pages
- `.notice-box` — Yellow left-border callout box
- `.info-box` — Green left-border callout box
- `.article-header` / `.article-body` — Article page layout (max-width 800px)
- `.section-title::after` — Blue underline accent

---

## JavaScript Behavior (js/main.js)

All logic runs on `DOMContentLoaded`. Three features:

1. **Hamburger menu** — Toggles `nav.open` class on click; closes on anchor link selection.

2. **Smooth scroll** — For all `a[href^="#"]` links; scrolls using `scrollIntoView`.

3. **Affiliate UTM injection** — All `<a data-affiliate="...">` links get UTM parameters appended automatically:
   ```
   ?utm_source=tensyoku-navi&utm_medium=affiliate&utm_campaign={data-affiliate value}
   ```
   Also sets `target="_blank"` and `rel="noopener noreferrer nofollow"`.

4. **Scroll animation** — `IntersectionObserver` watches `.card` and `.compare-table` elements. On intersection, adds class `.visible` which sets `opacity: 1` and `transform: translateY(0)`. Initial hidden state set inline by JS.

---

## HTML Conventions

### Affiliate Links
Use `data-affiliate` attribute with a slug identifying the agency. UTM params are added automatically by JS:
```html
<a href="https://doda.jp"
   class="btn-primary"
   data-affiliate="doda"
   target="_blank"
   rel="noopener noreferrer nofollow">無料登録</a>
```

### External links that are NOT affiliate links
Still require `target="_blank" rel="noopener noreferrer"` but omit `nofollow` and `data-affiliate`.

### Naming conventions
- CSS classes: kebab-case
- Data attributes: kebab-case slugs matching agency names (e.g., `recruit-agent`, `levtech-career`)
- Section IDs: kebab-case (e.g., `#ranking`, `#by-type`, `#articles`)

### Page structure (all pages)
```
<header>  ← sticky, shared across all pages
<main content sections>
<footer>  ← shared across all pages
<script src="js/main.js">  ← always last
```

### Article pages (under articles/)
```
<header>  ← logo href="../index.html", nav hrefs prefix "../"
<div class="article-header">  ← dark gradient, title, meta
<div class="article-body">   ← max-width 800px content
<footer>
```
Note: article pages load CSS via `../css/style.css` (one level up).

---

## Recruitment Agencies Referenced

### Top 5 (main ranking table)
| Rank | Name | Slug | Speciality |
|---|---|---|---|
| 1 | リクルートエージェント | `recruit-agent` | All ages, all industries |
| 2 | doda | `doda` | 20s–30s |
| 3 | マイナビエージェント | `mynavi-agent` | 20s, second-job-seekers |
| 4 | パソナキャリア | `pasona-career` | 30s–40s, management |
| 5 | レバテックキャリア | `levtech-career` | IT / engineers |

### Also mentioned in articles
ビズリーチ (Bizreach), JACリクルートメント (JAC Recruitment), Green, Geekly

---

## SEO Conventions

- `<title>` format: `{Page Title}｜転職エージェントナビ`
- `<meta name="description">` required on every page (aim for 80–120 characters)
- Heading hierarchy: one `<h1>` per page, then `<h2>` for major sections, `<h3>` for sub-sections
- All pages must be added to `sitemap.xml` when created
- `robots.txt` allows all crawlers; do not restrict any new pages

---

## Development Workflow

### No build process
Edit files directly. There is no `npm install`, no compilation, no bundling.

### Testing locally
Open `index.html` in a browser, or use any static file server:
```bash
python3 -m http.server 8080
# or
npx serve .
```

### Adding a new article page
1. Create `articles/agent-{slug}.html` based on the pattern in `articles/agent-compare.html`
2. Use `../css/style.css` and `../js/main.js` paths
3. Use `../index.html` for logo link and nav internal links
4. Add the URL to `sitemap.xml`
5. The card linking to it already exists in `index.html` — no changes needed there

### Git workflow
- `master` — production branch, deploys automatically to Vercel
- Feature branches follow the pattern `claude/{description}-{id}`
- Commit messages: either Japanese (「...」) or English imperative style
- There is no PR requirement specified; pushes to master deploy directly

---

## Content Style Guide

- All user-facing text is in Japanese
- Tone: professional, informative, slightly editorial ("編集部" voice)
- Numbers and statistics should feel authoritative (e.g., "50万件+" for job counts)
- Dates in articles use Japanese format: `2025年6月更新`
- Avoid placeholder/lorem text — all content must be real or plausible
- Affiliate disclosure is legally required per Japanese guidelines; the footer always includes: `本サイトはアフィリエイト広告を含みます。`

---

## What NOT to Do

- Do not add a JavaScript framework (React, Vue, etc.) — the site is intentionally zero-dependency
- Do not add a CSS preprocessor — use native CSS variables
- Do not add TypeScript — plain JS only
- Do not add a test framework — there are no tests and none are expected
- Do not modify `robots.txt` to disallow any paths
- Do not remove `nofollow` from affiliate links
- Do not hardcode color values in CSS — always use `var(--variable-name)`
- Do not inline `<style>` blocks in `index.html` — article pages may add page-scoped styles inline but the main page should not
