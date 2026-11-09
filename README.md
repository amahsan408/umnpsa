# Pakistani Students Association — University of Minnesota

Static website for PSA at UMN, hosted free on GitHub Pages.
Instagram: [@umnpsa](https://www.instagram.com/umnpsa/)

## Files

```
index.html          Main page (layout)
404.html            "Page not found" page
css/styles.css      All styling (colors at the top under :root)
js/main.js          ✏️ SITE CONTENT — events, board, Instagram posts, links
assets/favicon.svg  Logo / browser tab icon
.nojekyll           Tells GitHub Pages to serve files as-is
```

## Updating the site (no coding needed)

Almost everything lives in the `CONFIG` object at the top of **`js/main.js`**:

| What | Field |
|------|-------|
| Sign-up button link (Google Form, GopherLink) | `signupUrl` |
| Contact email (blank = hidden) | `contactEmail` |
| Instagram posts to embed | `instagramPosts` — paste post URLs like `https://www.instagram.com/p/AbC123/` |
| Events | `events` — dates as `"YYYY-MM-DD"`; past events hide automatically |
| Executive board | `board` — put photos in `assets/board/` and set `photo: "assets/board/name.jpg"` |

You can edit right on github.com: open the file → pencil icon → edit → **Commit changes**.
The live site updates in ~1 minute.

## Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Why not a live Instagram feed?

Instagram doesn't allow pulling a profile's feed without an API token, and a token
can't be kept secret on a static site. Embedding individual posts (official
Instagram embeds) is free, safe, and needs no account setup. If you want a fully
automatic feed later, a free widget service like Behold or LightWidget can be
dropped into the `#ig-feed` div.
