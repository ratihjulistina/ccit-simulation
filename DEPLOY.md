# Deploying the CCIT Simulation site to cPanel

The public site is a set of plain HTML/CSS/JS files. No Node.js server is needed
on the hosting account.

## 1. Build on your computer

```bash
bun install
bun run build
```

`build` first runs `scripts/generate-static-data.ts`, which:

- reads every **published** case study from the database,
- downloads its cover image into `public/case-study-images/`,
- writes `src/data/case-studies.generated.json` and `src/data/prerender-pages.json`.

Then Vite renders one HTML page per public route (home, services, case studies
list, every case-study detail page, projects & training, our team, about,
contact).

Keep the `.env` file next to `package.json` — the export step needs it.

## 2. Upload

Copy **everything inside** the client build output folder (`.output/public/`,
or `dist/client/` depending on the build target) into `public_html/` on cPanel.
The `.htaccess` file is included in that output; make sure hidden files are
visible in File Manager so it gets uploaded too.

## 3. Editing content afterwards

1. Sign in at `/admin` on the live site and add or edit case studies.
2. Because the public pages are static, changes are **not** live yet.
3. Run `bun run build` again and re-upload to publish them.

## Notes

- `/admin` and `/auth` load in the browser and talk to the database directly,
  so they keep working on static hosting.
- The contact form still opens the visitor's email app.
- Case-study images are served from `/case-study-images/` as uploaded files.
