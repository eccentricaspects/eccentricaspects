# Eccentricaspects.com hosting design

## Purpose

This document describes the hosting design for `eccentricaspects.com`, a
memorial resurrection of the personal blog of Nick Wormley ("cynick"), a
deceased colleague. The site is a frozen archive — no new posts will ever be
published; the only future changes will be incorporation of additional
recovered artifacts (gallery images, if found in personal backups or other
archives).

The design goals are:

- **Immutable**: the site has zero runtime dependencies on any external
  service — no CDN, no Vimeo, no YouTube, no Google. Every asset is local.
- **Durable**: hosting should outlast any single maintainer. Minimal
  operational overhead; no server to patch, no certificate to renew, no
  container to restart.
- **Low cost**: free tier hosting. The only recurring cost is domain
  renewal (~$10/year at Cloudflare at-cost pricing).

---

## Current state of the site

The repository root contains the fully self-contained static archive:

| Category | Count | Size |
|----------|-------|------|
| Blog posts (HTML) | 39 | ~1.3 MB |
| Archive/category/index pages (HTML) | 122 | ~1.5 MB |
| Videos (MP4) | 3 | 174 MB |
| Images (JPG/GIF) | 36 | 8.5 MB |
| CSS/JS/Galleria | — | ~0.5 MB |
| Data (KMZ) | 1 | ~4 KB |
| **Total** | **~200 files** | **186 MB** |

All external dependencies have been eliminated:

- jQuery 3.1.1 and jQuery UI 1.12.1: localized from Google CDN
- Vimeo embed (Green Line timelapse): replaced with `<video>` tag + local MP4
- YouTube embeds (Durango-Silverton, Forsythia): replaced with `<video>` tag
  or local link + local MP4
- Gallery image base URL: rewritten from `images.eccentricaspects.com` to
  `/images/`
- Galleria theme URL bug: fixed (`.classic.js` → `.classic.min.js`)

### Remaining external links in post prose

These are editorial hyperlinks in the blog text — not dependencies. The site
functions fully without them. Some may be dead (link rot over 13+ years):

| Domain | Context |
|--------|---------|
| `forsythia.tv` | Referenced in the "Don't Quit Your Day Job II" post |
| `ry4an.org` | Ry4an Brase's personal site (the person who scraped the blog) |
| `en.wikipedia.org` | Seventh Street Improvement Arches article |
| Various travel/gear sites | Amazon, hotel and trail links in travel posts |

These links are part of the authored content and should not be modified. They
are a time capsule of the web as it existed when Nick wrote.

### RSS feed self-references

`feed/index.html` contains `http://eccentricaspects.com/feed` as `<link>`
and `<guid>` values. These should be updated to
`https://eccentricaspects.com/feed` once HTTPS is live (see preparation
steps below).

---

## Hosting: GitHub Pages with custom domain

GitHub Pages is the recommended hosting platform. It is free, requires zero
ongoing maintenance, provides automatic HTTPS via Let's Encrypt, and is
backed by GitHub's infrastructure SLA. The site's total size (186 MB) is
well within the 1 GB published-site limit.

### Repository: `eccentricaspects/eccentricaspects`

The `eccentricaspects` GitHub user has been established with an SSH key and
PAT. The repository will be created as `eccentricaspects/eccentricaspects`.

**Branch strategy:** single `main` branch. There is no development workflow —
changes are rare, deliberate, and consist only of recovered artifacts.

**Site root:** the repository root serves as the GitHub Pages site root. No
`docs/` subfolder or `gh-pages` branch. This is the simplest configuration
for a single-purpose archive repository.

### Video files and Git limits

GitHub warns on files > 50 MB and blocks files > 100 MB. All three video
files are under the block limit:

| File | Size |
|------|------|
| `video/green-line-timelapse.mp4` | 45 MB |
| `video/durango-silverton-timelapse.mp4` | 58 MB |
| `video/forsythia-s1e3-hobgob.mp4` | 72 MB |

**Git LFS is not an option** — GitHub Pages does not serve LFS-tracked files.
The videos must be committed as regular Git objects. The 50 MB warning on
push is harmless and expected. Since the repo will rarely (if ever) receive
new commits, the large-blob cost is a one-time event.

### Required special files

| File | Purpose |
|------|---------|
| `.nojekyll` | Empty file. Prevents GitHub Pages from running Jekyll, which would ignore directories starting with `_` and process files through Liquid templates. Required for any pre-built static site. |
| `CNAME` | Contains `eccentricaspects.com`. Tells GitHub Pages to serve the site on the custom domain. GitHub creates this automatically when the domain is configured in Settings, but committing it to the repo makes the configuration durable and self-documenting. |

---

## DNS: Route53 configuration

The `eccentricaspects.com` domain is managed in Route53. The following
records configure the apex domain and `www` subdomain for GitHub Pages.

### A records (apex domain → GitHub Pages IPv4)

```text
eccentricaspects.com.  A  185.199.108.153
eccentricaspects.com.  A  185.199.109.153
eccentricaspects.com.  A  185.199.110.153
eccentricaspects.com.  A  185.199.111.153
```

### AAAA records (apex domain → GitHub Pages IPv6)

```text
eccentricaspects.com.  AAAA  2606:50c0:8000::153
eccentricaspects.com.  AAAA  2606:50c0:8001::153
eccentricaspects.com.  AAAA  2606:50c0:8002::153
eccentricaspects.com.  AAAA  2606:50c0:8003::153
```

### CNAME record (www subdomain)

```text
www.eccentricaspects.com.  CNAME  eccentricaspects.github.io.
```

### TTL

Use a low TTL (300 seconds) during initial setup for fast iteration, then
increase to 3600 seconds once verified.

### HTTPS

After DNS propagates and GitHub verifies the domain, enable **Enforce
HTTPS** in the repository's Pages settings. GitHub provisions a Let's
Encrypt certificate automatically. Certificate renewal is fully managed —
no human intervention required.

---

## Landing page

The current `index.html` is the blog's natural homepage: it displays the
most recent post (the Green Line timelapse article, December 2013) with
sidebar navigation showing categories and monthly archives.

### Decision: memorial context

Since this is a memorial archive, the landing page should acknowledge that
context. Two approaches:

#### Option A: Memorial banner on existing homepage (recommended)

Add a short, respectful banner to the top of the existing `index.html` (and
only `index.html`) that provides context without altering the blog's
character. The banner would appear above the existing header:

```html
<div id="memorial">
  <p>
    This site is a memorial archive of the blog of
    <strong>Nick Wormley</strong> (1974–2023), a railroad
    historian, photographer, and software engineer from
    Lowertown, Saint Paul. The original site has been
    restored from archived copies. No new content will
    be published.
  </p>
</div>
```

Style the banner to be unobtrusive — muted text, small font, positioned
above the existing header. This preserves the site's look and feel while
providing necessary context for visitors who arrive at the domain cold.

**Adjust the dates and details** in the banner text; the example above uses
placeholder birth/death years that must be corrected before publication.

#### Option B: Separate memorial landing page

Create a new `memorial.html` and redirect `index.html` to it, with a link
through to the original blog. This separates the memorial context from the
blog content but adds a click-through step.

**Recommendation:** Option A. It keeps the blog front-and-center, which is
what Nick would have wanted — his writing, not a eulogy. The banner provides
context without being the focus.

---

## Cleanup before publishing

### Files to exclude from the published repository

The following files exist in the working tree but should not be committed
to the public `eccentricaspects/eccentricaspects` repo:

| File | Reason |
|------|--------|
| `ry4an/` | Source scrape tarballs and extracted copies — provenance artifacts, not part of the published site |
| `dev/` | Design documents, scripts — development artifacts |
| `fix-html.py` | Build-time fixup script, already applied |
| `fix-videos.py` | Build-time fixup script, already applied |
| `fetch-images.py` | Build-time fixup script, already applied |
| `.DS_Store` | macOS metadata files |

These should either live in a separate private repo (for provenance) or
be excluded via `.gitignore`. The published repo contains only `site/`
contents.

### Files to add to the published site

| File | Content |
|------|---------|
| `.nojekyll` | Empty file |
| `CNAME` | `eccentricaspects.com` |

### RSS feed self-references

Update `feed/index.html` to use `https://eccentricaspects.com/`:

```bash
http://eccentricaspects.com/feed       →  https://eccentricaspects.com/feed
http://eccentricaspects.com/feed/feed  →  https://eccentricaspects.com/feed/feed
```

### Prune empty archive stubs (optional)

The 2014–2017 month archive pages (e.g., `2014/01.html` through
`2017/12.html`) are empty — no posts were published in those years. They
were auto-generated by Hakyll when the site was last rebuilt. These 48 stub
pages add no value and clutter the archive sidebar.

Removing them is optional; they are harmless but produce a confusing
experience ("Archives for January 2014" with no posts listed). If removed,
the archive sidebar links in the sidebar template would need to be pruned
as well — a more involved edit affecting all 161 HTML files.

**Recommendation:** leave them. They do no harm, and modifying the sidebar
template across all files risks introducing errors for zero functional
benefit.

---

## Deployment procedure

### Step 1: Create the GitHub repository

```bash
# Authenticate as the eccentricaspects GitHub user
gh auth login --hostname github.com

# Create the repo (public, no template, no wiki, no projects)
gh repo create eccentricaspects/eccentricaspects \
    --public \
    --description "Memorial archive of eccentricaspects.com — the blog of Nick Wormley" \
    --disable-wiki \
    --disable-issues
```

### Step 2: Prepare the site root

```bash
cd /path/to/eccentricaspects/site

# Add GitHub Pages control files
touch .nojekyll
echo "eccentricaspects.com" > CNAME

# Update RSS feed self-references to HTTPS
sed -i '' 's|http://eccentricaspects.com/|https://eccentricaspects.com/|g' \
    feed/index.html

# Remove macOS metadata
find . -name '.DS_Store' -delete
```

### Step 3: Initialize and push

```bash
cd /path/to/eccentricaspects/site

git init
git remote add origin git@github.com:eccentricaspects/eccentricaspects.git
git add -A
git commit -m "Initial commit: memorial archive of eccentricaspects.com

Restored from archived scrapes of the original Hakyll-generated
static blog. All 39 posts (May 2010 – December 2013) with full
text content. Three locally-hosted video files. 34 recovered
images from the Wayback Machine. Zero external dependencies.

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"

git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

In the repository Settings → Pages:

1. **Source**: Deploy from a branch
2. **Branch**: `main` / `/ (root)`
3. **Custom domain**: `eccentricaspects.com`
4. Wait for DNS verification (may take up to 24 hours)
5. Enable **Enforce HTTPS** once the certificate is provisioned

Alternatively, via the GitHub API:

```bash
gh api repos/eccentricaspects/eccentricaspects/pages \
    --method POST \
    --field source='{"branch":"main","path":"/"}' \
    --field cname="eccentricaspects.com"
```

### Step 5: Configure Route53

In the AWS console (or via CLI), add the A, AAAA, and CNAME records
listed in the DNS section above to the `eccentricaspects.com` hosted zone.

```bash
# Example using AWS CLI (adjust hosted-zone-id)
aws route53 change-resource-record-sets \
    --hosted-zone-id ZXXXXXXXXXXXXX \
    --change-batch file://route53-changes.json
```

### Step 6: Verify

```bash
# Check DNS propagation
dig eccentricaspects.com +short
# Should return 185.199.10{8,9,10,11}.153

# Check HTTPS
curl -sI https://eccentricaspects.com/ | head -5
# Should return HTTP/2 200

# Check www redirect
curl -sI https://www.eccentricaspects.com/ | grep -i location
# Should redirect to https://eccentricaspects.com/
```

---

## Ongoing maintenance

Essentially none. The only actions anticipated are:

| Event | Action | Frequency |
|-------|--------|-----------|
| Additional recovered images | Commit to repo, push to main | If/when found |
| GitHub Pages IP change | Update Route53 A/AAAA records | Rare (years) |
| Domain renewal | Renew in Route53 | Annual (auto-renew recommended) |
| GitHub account maintenance | Keep PAT valid; respond to any security alerts | Annual |

There is no build step, no CI/CD pipeline, no container, no database,
no certificate to manage, and no server to patch. The site is a set of
static files served by GitHub's CDN.

---

## Cost summary

| Item | Cost |
|------|------|
| GitHub Pages hosting | Free |
| GitHub repository (public) | Free |
| Cloudflare DNS hosting | Free |
| `eccentricaspects.com` domain renewal | ~$10/year (Cloudflare at-cost) |
| HTTPS certificate | Free (Let's Encrypt via GitHub) |
| **Annual total** | **~$10/year** |

---

## Metadata

```text
generator-name: Claude Code
generator-version: Claude Sonnet 4.6
generator-model-token: claude-sonnet-4-6
generator-provider: Anthropic
generation-date: 2026-06-21
generator-responsibility: other
```
