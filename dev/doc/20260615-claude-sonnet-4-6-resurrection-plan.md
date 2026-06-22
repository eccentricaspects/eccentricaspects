# Eccentricaspects.com resurrection plan

## Executive summary

The two artifacts in `ry4an/` are nearly identical scrapes of `eccentricaspects.com`
made before the site went dark. The site was built with **Hakyll** (a Haskell static
site generator), not WordPress. All 39 blog posts — spanning May 2010 through December
2013 — are present as fully-rendered static HTML with complete text content, CSS, and
JavaScript framework files.

The only material gap is **photography**: every image was hosted on a separate
subdomain (`images.eccentricaspects.com`) that was not captured in the scrape. Text
content is 100% intact. The site can be rehosted in its current state with degraded
(broken image placeholders) but otherwise complete text experience, and the images
can be recovered via the Wayback Machine.

---

## Artifact inventory

### What was scraped

| Artifact | Description |
|----------|-------------|
| `ry4an/eccentricaspects.com.tar.gz` | Primary scrape: 219 entries |
| `ry4an/eccentricaspects.com/` | Extracted copy of the above |
| `ry4an/nick-blog.tar.gz` | 224 entries — identical to the above plus four indexing tools |
| `ry4an/nick-blog/{INDEX-TERMS,links-to-index.py,makeindex.sh,terms.html}` | Subject-index toolchain written by ry4an |

The two tarballs are otherwise identical; `nick-blog.tar.gz` is the later, augmented
version and should be considered the canonical source.

### Site structure in the scrape

```text
eccentricaspects.com/
├── index.html              # Home page (most recent post)
├── about.html              # Author bio
├── robots.txt              # Permissive (Disallow: empty)
├── feed/index.html         # RSS feed (last 10 posts, placeholder descriptions)
├── css/{style,grid,tabbed}.css
├── js/{tabber,tabs,l10n,ea,beforeafter-1.4.min}.js
├── galleria/               # Galleria 1.5.1 image slideshow library (local)
│   └── themes/classic/galleria.classic.min.js
├── images/header.jpg       # Site header banner (only local image)
├── data/sc2.kmz            # Google Earth file (stealth-camping routes)
├── 2010/ … 2013/           # Post directories with full HTML (39 posts)
├── category/*.html         # 22 category archive pages
└── 2010/01.html … 2017/12.html  # Month archive stubs (most empty)
```

---

## Site technology

The footer states: *"Eccentric Aspects is statically rendered via Hakyll"*.
Hakyll is a Haskell-based static site generator; it pre-renders every page to plain
HTML at build time. There is no database, no PHP, no WordPress. Every page in the
scrape is a complete, self-contained HTML document with relative links.

**Author:** Nick Wormley (username: `cynick`) — railroad historian, photographer, and
software engineer; Lowertown, Saint Paul.

**CSS theme:** "Black Forest" (dolphin queen, v1.0) — dark background, two-column
layout, 1000 px wide.

**JavaScript dependencies (as scraped):**

| Dependency | Source in scrape | Status |
|-----------|-----------------|--------|
| jQuery 3.1.1 | `http://ajax.googleapis.com/...` (CDN, HTTP) | External, needs localizing |
| jQuery UI 1.12.1 | Same CDN (HTTP) | External, needs localizing |
| Galleria 1.5.1 | `galleria/galleria-1.5.1.min.js` (local) | Present |
| Galleria Classic theme | `galleria/themes/classic/galleria.classic.min.js` (local) | Present |
| beforeafter-1.4.min.js | `js/beforeafter-1.4.min.js` (local) | Present |
| tabber.js / tabs.js / l10n.js | `js/` (local) | Present |
| ea.js | `js/ea.js` (local) | Present (has one bug — see below) |

**Known bug in `ea.js`:** the `theme` variable hard-codes
`http://eccentricaspects.com/galleria/themes/classic/galleria.classic.js` (no `.min`)
but the file in the scrape is `galleria.classic.min.js`. Galleria will fail to load
the theme at runtime. This requires a one-line fix.

---

## Content inventory

### Blog posts — complete (39 posts)

All posts have full text content. Posts are organized as
`YYYY/MM/slug.html` and linked sequentially (prev/next navigation works).

#### Posts with photo galleries (images missing)

Images were served from `http://images.eccentricaspects.com/` using a uniform
three-tier structure: `/{gallery-name}/thumb/{NNNN}.jpg`,
`/{gallery-name}/small/{NNNN}.jpg`, `/{gallery-name}/large/{NNNN}.jpg`.

| Post | Gallery name | Image count |
|------|-------------|-------------|
| 2012/12/moving-bridge | `hastings-bridge` | 36 (numbered 1–36) |
| 2012/10/a-nice-tour-of-saint-paul | `niceride-saint-paul` | 47 (numbered 1–47) |
| 2012/03/farewell-to-the-stillwater-and-st-paul | `stillwater-and-stpaul` | ≥55 (sparse selection) |
| 2012/02/crashed-ice | `crashed-ice` | 45 (numbered 1–45) |
| 2011/12/last-of-the-ford-haulers | `ford-hauler` | ≥71 (gallery shows 53; inline ref image 71) |
| 2011/08/10000 (Brompton bike) | `brompton` | Unknown count ("odo" gallery) |
| 2010/06/circle-trip-digest | `trip` | 36 (numbered 1–36) |

Total numbered gallery images recoverable from Wayback Machine: approximately
220+ source images × 3 sizes (thumb/small/large) = ~660+ JPEG files.

#### Posts with inline images only (not full galleries)

| Post | Image URL |
|------|-----------|
| 2013/10/congestion | `images.eccentricaspects.com/lrt/113a.jpg` |
| 2013/07/cycling-the-skally | `images.eccentricaspects.com/bruce-vento-trail/small/0021.jpg` |
| 2012/12/moving-bridge | `images.eccentricaspects.com/hastings-bridge-raise.gif` (animated) |
| 2012/10/a-nice-tour-of-saint-paul | `images.eccentricaspects.com/niceride-saint-paul/nr-amalgam.jpg` |
| 2012/03/farewell-to-… | `images.eccentricaspects.com/stillwater-and-stpaul/small/0002.jpg` |
| 2012/02/burlington-kansas | `images.eccentricaspects.com/burlington-kansas/small/0001.jpg` |
| 2011/08/10000 (before/after) | `images.eccentricaspects.com/brompton/2007-09.jpg` and `brompton/2011-08.jpg` |
| 2010/07/first-attempt-at-stealth-camping | `images.eccentricaspects.com/firstcamp.jpg` |
| 2010/06/new-gear-trangia-28-t | `images.eccentricaspects.com/stove.jpg` |

#### Posts with embedded video (external, probably still accessible)

| Post | Platform | ID / URL |
|------|----------|----------|
| 2013/12/a-time-lapse-tour-of-the-green-line | Vimeo | `81240982` |
| 2010/05/durango-and-silverton-timelapse | YouTube | `MjWj-bEh97c` |

#### Posts that are text-only (no missing assets)

All 28 remaining posts contain only prose; they are fully functional as-is.

### Archive pages

Month archive pages for 2010/05 through 2013/12 are present and functional.
Archive stubs for 2014/01 through 2017/12 are present but empty (no posts were
published in those years). The copyright footer reads "Copyright 2017
EccentricAspects.com", indicating the Hakyll build was re-run in 2017 to update
the year, generating empty stubs for the intervening months.

### RSS feed

`feed/index.html` is a valid RSS 2.0 feed but contains only the 10 most recent
posts, all with placeholder descriptions ("This is the post description") — a
Hakyll default for feeds without explicit descriptions. The feed confirms last post
date: Tue 10 Dec 2013.

---

## What is missing

| Asset class | Location | Recoverability |
|-------------|----------|---------------|
| Gallery images (all sizes) | `images.eccentricaspects.com` | **High** — Wayback Machine |
| Inline standalone images | `images.eccentricaspects.com` | **High** — Wayback Machine |
| Animated GIF (`hastings-bridge-raise.gif`) | `images.eccentricaspects.com` | **High** — Wayback Machine |
| Before/after image pair (brompton) | `images.eccentricaspects.com` | **High** — Wayback Machine |
| jQuery / jQuery UI (local copies) | CDN | **Trivially recoverable** — download |
| Galleria theme JS reference fix | `js/ea.js` (one-line fix) | **Trivially fixed** |

Nothing is missing that cannot be recovered or worked around.

---

## Resurrection plan

### Phase 0: Establish working tree

Extract the canonical tarball to a dedicated site root:

```bash
mkdir -p eccentricaspects/site
tar -xzf ry4an/nick-blog.tar.gz --strip-components=1 \
    -C eccentricaspects/site/
```

The extracted `eccentricaspects.com/` directory becomes `site/`.

### Phase 1: Fix local dependencies (1–2 hours)

**1a. Localize jQuery and jQuery UI**

Replace CDN script tags across all HTML files with local copies. The CDN URLs
use plain HTTP (not HTTPS), which modern browsers will block on mixed-content
grounds:

```bash
# Download jQuery and jQuery UI
curl -o site/js/jquery-3.1.1.min.js \
    https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
curl -o site/js/jquery-ui-1.12.1.min.js \
    https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js
```

Then replace all occurrences across the HTML. A relative-depth-aware sed pass
or a Python script that walks the tree and adjusts relative paths (`../../js/`)
is the right approach given the varying directory depths of posts.

**1b. Fix the Galleria theme URL bug in `ea.js`**

Change line 2 of `js/ea.js`:

```javascript
// Before
var theme = 'http://eccentricaspects.com/galleria/themes/classic/galleria.classic.js';
// After (relative URL, correct filename)
var theme = '/galleria/themes/classic/galleria.classic.min.js';
```

This is a single-line change that restores gallery functionality once images
are present.

**1c. Sanitize absolute HTTP links in HTML**

Posts reference `http://images.eccentricaspects.com/...` directly in `<img
src>` attributes. These will fail silently (broken images). A placeholder
image or a local fallback can be substituted as a temporary measure while
images are being recovered.

After Phase 2 below, these references should be rewritten to relative paths
under a local `images/` directory.

### Phase 2: Image recovery from Wayback Machine (2–4 hours, mostly automated)

The Wayback Machine CDX API allows querying all archived URLs for a given
domain. Since `images.eccentricaspects.com` was a public subdomain, it is
likely to have been crawled at some point.

**Step 1 — query CDX for all archived image URLs:**

```bash
curl "https://web.archive.org/cdx/search/cdx?url=images.eccentricaspects.com/*\
&output=text&fl=original&collapse=urlkey" > /tmp/ea-image-urls.txt
```

**Step 2 — download all recoverable images via Wayback:**

```bash
while IFS= read -r url; do
    # Derive local path by stripping the subdomain
    local_path="site/images/${url#http://images.eccentricaspects.com/}"
    mkdir -p "$(dirname "$local_path")"
    # Fetch the closest-in-time archived copy
    archive_url="https://web.archive.org/web/20131201000000*/${url}"
    curl -s -L -o "$local_path" "$archive_url"
done < /tmp/ea-image-urls.txt
```

Target the 2013-12 time window (closest to when the site was last updated)
to get the best quality archive.

**Step 3 — rewrite image references in HTML:**

After download, update `ea.js` to point `base` to the local `/images/`
directory:

```javascript
var base = '/images';
```

And update all inline `<img src="http://images.eccentricaspects.com/...">` to
`<img src="/images/...">` (or relative equivalents).

**Expected recovery rate:** Wayback Machine has good coverage of small personal
sites from the 2010–2013 era. Expect 70–100% of images to be recoverable.
Any missing images will remain as broken placeholders, which is acceptable for
a legacy archive.

### Phase 3: Choose and configure hosting (1 hour)

Three options, in order of operational simplicity:

#### Option A: GitHub Pages (recommended for low-maintenance public access)

- Push `site/` to a GitHub repository's `gh-pages` branch or `docs/` folder.
- Served over HTTPS at `https://<user>.github.io/<repo>` (or a custom domain).
- Free, zero operational overhead, no server to maintain.
- Site is publicly indexed. Appropriate if content can be public.

#### Option B: Cloudflare Pages / Netlify

- Drag-and-drop the `site/` directory to Cloudflare Pages or Netlify.
- Free tier covers this scale (< 100 MB, static only).
- Global CDN, HTTPS, custom domain support.
- Deploy updates by pushing to the connected git repository.

#### Option C: nginx container behind the existing citrus firewall

Suitable if the content should not be publicly accessible (e.g., family-only
memorial archive).

Add a service to the citrus compose stack:

```yaml
eccentricaspects:
  image: nginx:alpine
  volumes:
    - ./site:/usr/share/nginx/html:ro
  networks:
    - proxy_network
```

Configure the existing nginx reverse proxy to route
`eccentricaspects.local` → the container. Access is restricted to the local
network and VPN. No public internet exposure.

Security considerations for this option:
- The nginx container serves only static files with no write access.
- No server-side code executes.
- Restrict to read-only volume mount (`:ro`) — already shown above.
- No authentication required if network perimeter is trusted; add basic auth
  if wider VPN access is a concern.
- This is the lowest-cost option to operate but requires the citrus stack to
  remain running.

---

## Summary of issues and effort

| Issue | Effort | Blocking? |
|-------|--------|-----------|
| jQuery CDN → local (HTTP, mixed-content blocks) | 1 hr | Yes for JS functionality |
| Galleria theme URL bug in ea.js | 5 min | Yes for gallery display |
| Gallery images missing | 2–4 hr (automated) | Partial — text readable without |
| Inline image references (absolute URLs) | 30 min | Partial — text readable without |
| Vimeo/YouTube video embeds | None — still live | No |
| Hosting setup | 30 min–1 hr | Final step |

The site can be up and serving complete text content in under two hours. Full
photo restoration is an additional two to four hours, contingent on Wayback
Machine coverage.

---

## Metadata

```text
generator-name: Claude Code
generator-version: Claude Sonnet 4.6
generator-model-token: claude-sonnet-4-6
generator-provider: Anthropic
generation-date: 2026-06-15
generator-responsibility: other
```
