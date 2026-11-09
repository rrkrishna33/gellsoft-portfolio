# Preview and Deployment

This is a static website. No build step, Node.js runtime, or backend is required.
Open `index.html` in a browser to preview it locally.

For fonts, colors, layout, responsive behavior, animation settings, and maintenance,
see [WEBSITE_GUIDE.md](WEBSITE_GUIDE.md).

## Deploy

Publish these files together using your existing GitHub/VPS deployment workflow:

- `index.html`
- `css/style.css`
- `js/main.js`
- `Gellsoft_logo.jpeg`
- `privacy/billpro/index.html` (the GellSoft BillPro Android app's privacy policy,
  served at `/privacy/billpro/`; this is the URL entered in Google Play Console)
- `privacy/billpro/delete-data/index.html` (how to delete data and the account; the
  "Delete data URL" entered in the Play Console Data safety form)
- `billpro/index.html` (the GellSoft BillPro app home page, served at `/billpro/`; used as
  the app home page on the Google OAuth consent screen)
- `terms/billpro/index.html` (the app's terms of service, served at `/terms/billpro/`)
- `rentpro/index.html`, `privacy/rentpro/index.html`, `privacy/rentpro/delete-data/index.html` and
  `terms/rentpro/index.html` (the same four pages for the GellSoft RentPro app: home page, privacy policy,
  "delete your data" page and terms of service, served at `/rentpro/`, `/privacy/rentpro/`,
  `/privacy/rentpro/delete-data/` and `/terms/rentpro/`)

Keep the same relative paths and filename casing on the VPS. The existing Caddy
static-file configuration can continue serving the site without routing changes.
`index.html` loads `css/style.css?v=N` and `js/main.js?v=N`. Whenever you change
the CSS or JavaScript, increase `N` in both links so browsers fetch the new files
instead of serving a stale cached copy alongside the new HTML.

The redesign does not commit, push, or deploy files automatically.

## Contact Form

The form prepares a draft in the visitor's email application addressed to
`info@gellsoft.com` (or `support@gellsoft.com` when the visitor picks the support option). It does not send messages through a backend. Phone and
WhatsApp links remain available for visitors without a configured email client.

## Assets and Dependencies

- Logo: the supplied `Gellsoft_logo.jpeg`.
- Hero: logo-inspired 3D blocks rendered with Three.js r128 from cdnjs.
  The animation pauses off-screen and supports a pause control and reduced motion.
  If WebGL or the library is unavailable, the hero text and links remain usable.
- The unused `assets/workspace.jpg` came from https://images.unsplash.com/photo-1497366811353-6870744d04b2 and is not needed for deployment.
- Fonts: DM Sans and Space Grotesk, loaded from Google Fonts with local fallbacks.
- Icons: Lucide 0.468.0, loaded from unpkg. Internet access is needed for external fonts, icons, and Three.js.

Navigation and direct contact links remain usable without JavaScript. Reduced
motion preferences disable animated reveals, 3D motion, and smooth scrolling.