# Gellsoft Website Guide

Design and implementation reference for the approved logo-themed, animated 3D website.
Last documented: 2026-09-21. Values below describe the local source, not a verified live deployment.

## 1. Overview

- Brand: Gellsoft.
- Public website: https://www.gellsoft.com.
- Purpose: introduce custom web, Windows desktop, billing, and Android development services and collect enquiries.
- Visual direction: black, white, and green drawn from the supplied logo, with an animated 3D hero, numbered service rows, and alternating light/dark sections.
- Approved direction: retain the 3D animation. The photographic hero was an intermediate design and is no longer used.
- Technology: semantic HTML, custom CSS, vanilla JavaScript, Three.js, and Lucide icons.
- Architecture: a single static page. No application framework, bundler, package manifest, database, or form backend is included.

## 2. File Map

| File | Responsibility |
| --- | --- |
| [index.html](index.html) | Page content, section order, navigation, form, metadata, font and script imports |
| [css/style.css](css/style.css) | Colors, typography, spacing, components, responsive rules, CSS animation |
| [js/main.js](js/main.js) | Mobile menu, enquiry preparation, 3D scene, pause behavior, scroll reveals, copyright year |
| [Gellsoft_logo.jpeg](Gellsoft_logo.jpeg) | Supplied logo used in navigation, About, footer, and favicon |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Preview instructions, production file list, hosting and dependency notes |
| [README.md](README.md) | Original project overview and hosting context |

The downloaded workspace photograph in the assets directory is unused and is not required for the current design.

## 3. Typography

### Font Families

| Font | Usage | Requested weights | Fallback |
| --- | --- | --- | --- |
| DM Sans | Body copy, navigation, buttons, form controls, labels, helper text | 400, 500, 600, 700 | `sans-serif` |
| Space Grotesk | H1/H2/H3, text wordmark, hero supporting headline, discipline strip, process numbers, hero index | 400, 500, 600, 700 | `sans-serif` |

Fonts load from Google Fonts in the HTML head with `display=swap`. Preconnect links target `fonts.googleapis.com` and `fonts.gstatic.com`. If fonts cannot load, the browser uses its generic sans-serif font.

The lettering inside the JPEG logo is part of the image; its original typeface is not identified by the website source. The separate HTML wordmark, `gellsoft.`, uses Space Grotesk.

### Type Sizes

Sizes are in CSS pixels. Breakpoint rules cascade; the height-specific hero rules below take precedence when they apply.

| Element / selector | Desktop default | At 820px or narrower | At 560px or narrower |
| --- | --- | --- | --- |
| Body | 16 | 16 | 16 |
| Hero H1 `.hero h1` | 92 | 78 | 64 |
| Hero supporting headline `.hero-heading` | 38 | 34 | 28 |
| Hero description `.hero-sub` | 16 | 16 | 14 |
| Section H2 | 44 | 36 | 30 |
| About H2 `.about-copy h2` | 38 | 30 | 30 |
| CTA H2 `.cta-inner h2` | 48 | 38 | 36 |
| Service headings `.service-title h3` | 23; 21 at 1100px or narrower | 21 | 21 |
| Process headings `.step h3` | 20; 18 at 1100px or narrower | 18 | 18 |
| Text wordmark `.logo-text` | 28 | 25 | 25 |
| Navigation links | 13 | 13 | 13 |
| Standard buttons | 14 | 14 | 14 |
| Section labels `.eyebrow` | 11 | 11 | 11; hero label 9 |
| Form labels | 12 | 12 | 12 |
| Form input/select/textarea text | 14 | 14 | 16 |

- At widths up to 360px, the hero H1 is 56px and its supporting headline is 25px.
- At heights up to 760px and widths from 821px, these hero sizes become 72px and 30px.
- At heights up to 700px and widths up to 560px, these hero sizes become 48px and 24px; the description becomes 13px.
- Body line height: `1.65`. H2: `1.16`. H3: `1.3`. Hero H1: `1`. Hero supporting headline: `1.2`. Hero description: `1.7`.
- Heading weight defaults to `500`; hero H1 uses `600`; wordmark uses `700`; standard buttons use `600`.
- Headings, wordmark, and uppercase section labels explicitly use zero letter spacing.

To change fonts, update both the Google Fonts URL in the HTML and the corresponding `font-family` rules in the CSS.

## 4. Color Palette

Primary tokens live in `:root` in [css/style.css](css/style.css).

| Token | Hex | Main use |
| --- | --- | --- |
| `--ink` | `#171b16` | Main text, dark buttons, process section |
| `--paper` | `#ffffff` | Main page background |
| `--soft` | `#f3f5f1` | About section, contact form, footer |
| `--green` | `#548e28` | Brand accents, icons, focus outlines, wordmark dot |
| `--lime` | `#b4e77e` | Hero CTA, discipline strip, CTA band, text selection |
| `--muted` | `#64705f` | Secondary text |
| `--line` | `#dce1d8` | Dividers and borders |

Additional component colors:

| Color | Use |
| --- | --- |
| `#0b0f0b` | Hero background and text-protecting overlay |
| `#345b1b` | Dark button hover |
| `#d1f5ad` | Green button hover |
| `#366c1c` | Floating WhatsApp link |
| `#a9b3a3` | Muted text on the dark process section |
| `#cbd3c5` | Form field borders |

The browser theme-color meta tag is `#548e28`. Three.js has a separate numeric color palette in JavaScript; changing CSS variables does not recolor the scene automatically.

## 5. Logo and Icons

- Keep the original logo's aspect ratio and white background. Header/footer images use `object-fit: contain`.
- Header/footer image boxes: 64 x 64px normally, 56 x 56px at 820px or narrower.
- The About section displays the larger logo; on phones its maximum rendered width is 260px.
- Header/footer logo images use empty alt text because the surrounding link already has the accessible name "Gellsoft home". The About image has descriptive alt text.
- The favicon currently uses the same JPEG, not a dedicated small-size icon asset.
- Icons come from Lucide `0.468.0`, loaded from unpkg and initialized with `createIcons()`.
- Service icons: `globe`, `monitor`, `receipt`, and `smartphone`.
- Process icons: `messages-square`, `pencil-ruler`, `code-2`, and `rocket`.
- Other icons include arrows, `mail`, `phone`, `message-circle`, `pause`, and `play`. The WhatsApp shortcut uses a generic message icon, not a WhatsApp brand logo.
- Base icon size is 20 x 20px with CSS stroke width `1.7`; service icons use 26px and process icons use 24px.

## 6. Layout and Components

### Page Order

1. Sticky navigation: logo, section links, contact CTA, mobile menu toggle.
2. `#home`: animated 3D hero, brand name, supporting copy, two CTAs, pause control.
3. Discipline strip: web platforms, desktop software, billing systems, Android apps.
4. `#services`: four numbered rows with descriptions, capability tags, and enquiry links.
5. `#about`: large logo and three reasons to work with Gellsoft.
6. `#process`: understand, define, build, and launch stages.
7. CTA band: green background with a subtle 80px grid pattern.
8. `#contact`: contact channels and enquiry form.
9. Footer: logo, links, back-to-top link, copyright.
10. Persistent WhatsApp shortcut at the bottom right.

### Dimensions

| Setting | Desktop default | Responsive changes |
| --- | --- | --- |
| Content maximum width | 1240px (`--max`) | Width-based rules use available width minus gutters |
| Container side gutters | At least 48px | 32px at <=1100px; 20px at <=560px |
| Standard section padding | 112px top/bottom | 80px at <=820px; 64px at <=560px |
| Navigation minimum height | 88px | 76px at <=820px; 72px at <=560px |
| Standard button | Minimum height 54px; padding 16px 24px | Hero buttons use minimum 50px height on phones |
| Corner radii | Buttons 4px; inputs 3px; logo box 2px | Icon links and floating controls are circular |
| Service link control | 48px diameter | 38px at <=560px |
| Motion control | 42px diameter | 36px at <=560px |
| WhatsApp control | 50px diameter, 24px from right/bottom | 16px from right/bottom at <=560px |
| Contact form padding | 36px | 28px at <=1100px; 24px 20px at <=560px; 16px horizontal at <=360px |

The hero canvas fills the hero without a surrounding card. The text overlay protects readability. Desktop hero height is `min(730px, calc(100svh - 154px))` with a 590px minimum; smaller-screen and short-height rules override this.

### Responsive Rules

| Condition | Main changes |
| --- | --- |
| Width <=1100px | Smaller gutters, grid gaps, service/process type, and form padding |
| Width <=820px | Collapsible menu, two-column discipline strip/process, stacked section introductions, single-column contact area, compact 3D composition |
| Width <=560px | Hidden header CTA, single-column About and name/phone fields, smaller type/controls, stacked CTA band and footer |
| Width <=360px | Single-column process, vertically arranged hero actions |
| Height <=760px and width >=821px | More compact desktop hero |
| Height <=700px and width <=560px | Compact phone hero; bottom hero caption hidden |
| Reduced motion requested | No CSS animations/transitions or smooth scrolling; static 3D scene |

## 7. 3D Hero and Motion

The scene is implemented by `initHero()` in [js/main.js](js/main.js), using Three.js `r128` from cdnjs. There is no external 3D model or texture download.

### Scene Configuration

| Setting | Current value |
| --- | --- |
| Renderer | WebGL, transparent canvas, antialiasing enabled |
| Device pixel ratio | Capped at 1.5 |
| Color output / tone mapping | sRGB, ACES filmic, exposure 1.25 |
| Camera | Perspective, 42-degree field of view, near 0.1, far 80, position `(0, 0, 17)` |
| Main geometry | Three blocks, each containing a 3 x 3 x 3 group of cubes: 81 cubes total |
| Cube dimensions / spacing | 0.78 units per side; 0.86-unit center spacing |
| Block colors | `0x548e28`, `0x83b54a`, `0x131e12` |
| Materials | Standard material, metalness 0.48, roughness 0.29 |
| Cube edge color / opacity | `0xd9f9ba` / 0.32 |
| Outer frame | 7.3-unit cube edges; `0x82b650`, opacity 0.2 |
| Floor grid | 32-unit size, 32 divisions, Y = -5.1, opacity 0.32 |
| Lighting | Hemisphere light plus white key and green rim directional lights |

### Behavior

- The assembly rotates slowly; each block bobs vertically and the outer wireframe rotates separately.
- Mouse movement adds smoothed tilt. Touch pointer movement does not drive the tilt.
- Rotation is time-based; per-frame delta is capped at 0.05 seconds to limit jumps.
- At 820px or narrower, the assembly is scaled and repositioned for a compact composition.
- `ResizeObserver` updates renderer size and camera aspect ratio; window resize is the fallback.
- `IntersectionObserver` and document visibility suspend continuous rendering when the hero is off-screen or the tab is hidden.
- The pause control updates its icon, tooltip, accessible label, and `aria-pressed` state. Pause state is not persisted across reloads.
- Reduced-motion preference renders the scene without continuous motion and hides the animation toggle.
- If Three.js is missing or WebGL cannot initialize, the hero copy and links remain on the dark background. There is no alternate 3D screenshot fallback.
- WebGL context-loss/restoration listeners stop rendering and attempt to resume after restoration.

Other motion: hero content enters over 0.8 seconds from a 15px offset. `.reveal` sections fade in over 0.6 seconds from a 20px offset when at least 8% intersects the viewport. Button color transitions use 0.2 seconds.

## 8. Navigation and Contact Behavior

### Navigation

- Navigation becomes visually elevated after scrolling more than 20px.
- The mobile menu updates `aria-expanded` and its open/close label.
- It closes after a navigation link, outside click, outside focus, Escape, or crossing the 820px breakpoint. Escape returns focus to the toggle.
- Without JavaScript, mobile navigation links remain displayed instead of being hidden behind an unusable toggle.
- Anchor scroll offset is 110px normally and 88px at phone widths.
- The footer year is set from the visitor's current date; the HTML fallback is 2026.

### Contact Channels

| Channel | Destination |
| --- | --- |
| Email | `rrkrishna33@gmail.com` |
| Telephone | `+91 88254 20422` via `tel:+918825420422` |
| WhatsApp | `https://wa.me/918825420422` |

### Enquiry Form

| Field | Required | Limit / validation |
| --- | --- | --- |
| Name | Yes | Maximum 120 characters |
| Phone | Yes | Maximum 40 characters; `type="tel"`, no custom number pattern |
| Email | Yes | Maximum 254 characters; native browser email validation |
| Service | Has a default selection | Defaults to `Not sure yet` |
| Message | Yes | Maximum 3000 characters |

Service links preselect the form using their `data-service` attribute. Its value must exactly match an option value: `Web Development`, `Windows Desktop Application`, `Billing Software`, or `Android App Development`.

`buildEnquiryUrl()` builds a `mailto:` URL with an encoded subject (`New enquiry: {service}`) and body containing all fields. Submit opens the visitor's email handler; the visitor still needs to send the message. The live status text is not a delivery confirmation.

No form data is stored by this site's code or submitted to a site-owned backend. A configured email handler is needed, and long drafts may encounter browser/email-client URL limits. The HTML form has a basic mailto fallback without JavaScript; that behavior is email-client dependent. Phone and WhatsApp are alternatives.

## 9. Accessibility, Dependencies, and Metadata

Implemented features include a skip link, semantic landmarks, named navigation regions, associated form labels, native validation, autocomplete, a polite live form status, visible keyboard outlines, named icon-only controls, hidden decorative icons/canvas, and reduced-motion support. These features do not constitute a formal accessibility certification.

| External dependency | Version / source | If unavailable |
| --- | --- | --- |
| DM Sans and Space Grotesk | Google Fonts; requested weights 400-700 | Generic sans-serif fallback |
| Lucide | 0.468.0, unpkg | Icons do not render; named links/controls retain their underlying behavior |
| Three.js | r128, cdnjs | Static hero background with text and CTAs |

Scripts use `defer` and load in order: Lucide, Three.js, then local JavaScript. There is no package lockfile. Review APIs before upgrading Three.js: this version uses `outputEncoding` and `sRGBEncoding`. External fonts and scripts require network access and make requests to their providers; the site is not fully self-contained offline.

Current metadata in [index.html](index.html):

- Title: `Gellsoft | Custom Software, Built Around You`.
- Description: custom web platforms, Windows software, GST billing systems, and Android apps built around the business workflow.
- UTF-8 encoding, responsive viewport, English document language, green browser theme color, JPEG favicon.
- No canonical URL, Open Graph/Twitter preview tags, structured data, analytics integration, or consent system is currently included. A sitemap and robots file are not part of this project.

## 10. Maintenance and Deployment

| Change | Where to edit |
| --- | --- |
| Wording, service descriptions, section order | [index.html](index.html) |
| Fonts | Google Fonts import in [index.html](index.html) and font rules in [css/style.css](css/style.css) |
| Brand colors | CSS `:root`; also theme-color in HTML and numeric 3D colors in JavaScript |
| Sizes, spacing, responsive layout | Component selectors and media queries in [css/style.css](css/style.css) |
| Animation speed, lighting, geometry | `initHero()` in [js/main.js](js/main.js) |
| Contact email | HTML email link, form action/status text, and `buildEnquiryUrl()` in JavaScript |
| Phone/WhatsApp | Contact links and floating shortcut in [index.html](index.html) |
| Service choices | Form option values and matching `data-service` links in HTML |
| Logo | Replace [Gellsoft_logo.jpeg](Gellsoft_logo.jpeg), preserving its filename or updating all references |

Open [index.html](index.html) directly for a local preview. There is no build step. See [DEPLOYMENT.md](DEPLOYMENT.md) for the production file list and static hosting notes.

The user hosts the site on a VPS and keeps the source in GitHub. Server address, SSH user, web root, repository URL, branch, and automated deployment details are not specified here. Do not assume a Git push deploys the site. Documentation and local checks do not publish changes.

### Verification Checklist

1. Run `node --check js/main.js` if Node.js is installed; Node is only needed for this optional check, not to serve the site.
2. Run `git diff --check` for whitespace errors.
3. Test representative desktop, tablet, and phone widths, including 320px and short-height screens.
4. Check text wrapping, header/menu layout, logo loading, and horizontal overflow.
5. Confirm the 3D canvas is nonblank, visibly animates, responds to a mouse, and pauses/resumes.
6. Test reduced motion, scrolling off-screen, tab switching, and unavailable WebGL/CDN behavior.
7. Test menu keyboard behavior, focus outlines, skip link, and icon-control labels.
8. Test all service preselection links and form validation. Inspect an email draft without sending a test enquiry to the owner.
9. After deployment, check relative asset paths, browser console/network failures, and cached styles/scripts.

Earlier local checks found no editor diagnostics and passed JavaScript syntax and diff checks. Navigation, service preselection, and email draft construction were checked during the redesign. The restored 3D canvas rendered and changed between sampled frames, but its final automated interaction/viewport checks were inconclusive because of browser-tool coordinate and viewport inconsistencies. Do not treat those as a complete mobile, cross-browser, or accessibility pass. This is a manual checklist, not an installed automated test suite.