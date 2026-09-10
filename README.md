# Sagnik Panda — Portfolio

A Next.js portfolio built from your resume, in a "ronin scholar" ink/ember
theme — dark by default, with a light mode toggle. Your name is the hero
focus; two personal images sit in the background as interactive accents
rather than the main event.

## What's interactive

- **Hero** — the samurai illustration is grayscale by default; moving your
  cursor over it opens a spotlight mask that reveals the full-color version
  underneath. Your name tilts slightly toward the cursor too. Scrolling
  parallaxes and darkens the image as the page moves into content.
- **Theme toggle** — top right, next to the menu button. Switches between
  dark and light palettes (all driven by CSS variables), remembers your
  choice via `localStorage`, and sets the theme before paint so there's no
  flash of the wrong mode on load.
- **Scroll seal** — the small ring in the bottom-right corner fills in as
  you scroll, standing in for a normal progress bar.
- **Portrait (Archive section)** — your photo, cropped tight and vignette-
  masked so it blends into the dark background instead of sitting in a hard
  frame. It tilts in 3D toward the cursor, and hovering it slides a small
  "about me" ribbon in over the photo; moving away sends the ribbon
  slipping off in a different direction rather than just fading out.
- **Scroll reveals** — section headers, cards, and the timeline fade/slide
  in via `IntersectionObserver` as they enter the viewport.

## Project structure

```
app/
  layout.js     — HTML shell, Google Fonts, imports style.css,
                   inline script that sets the theme before hydration
  page.js       — all page content (as data arrays) + every interaction
                   (theme toggle, hero spotlight, scroll seal, portrait
                   tilt + ribbon, scroll reveals)
  style.css     — the separate stylesheet: design tokens (dark + light),
                   layout, components, animations
public/
  images/
    ronin.jpg     — hero background
    portrait.jpg  — your photo, cropped for the Archive section
```

## Run it locally

```bash
npm install
npm run dev
```

Then open https://sagnikpandaportfolio.netlify.app

## Customize

- **Copy**: all content (skills, experience, projects, education, certs)
  lives as plain arrays near the top of `app/page.js` — edit the values,
  no need to touch markup. The hero name/tagline and the "Archive" intro
  paragraph are inline further down the same file.
- **Colors**: dark-mode tokens are under `:root` in `app/style.css`;
  light-mode overrides are under `[data-theme="light"]` right below it
  (`--ink`, `--paper`, `--blood`, etc). Everything else references these
  variables, so changing a token updates the whole site.
- **Fonts**: `Shippori Mincho` (headings), `Manrope` (body), `JetBrains
  Mono` (labels/tags) — swap the Google Fonts link in `app/layout.js` and
  the `--f-display` / `--f-body` / `--f-mono` variables in `style.css`.
- **Images**: replace the files in `public/images/` (keep the filenames,
  or update the `src` paths in `app/page.js`). The portrait uses a CSS
  mask (`mask-image` on `.archive-img`) to fade its edges — adjust the
  ellipse values in `style.css` if you crop a different photo.
- **Ribbon text**: the line that slides over your portrait on hover is the
  `<span className="portrait-ribbon">` content inside the Archive section
  of `app/page.js`.
- **Contact links**: update email/phone/LinkedIn/GitHub in the
  `menu-foot` and `dispatch` sections of `app/page.js`.

## Deploy

Works out of the box on Vercel: push to a GitHub repo and import it at
vercel.com/new, or run `npx vercel` from this folder.
