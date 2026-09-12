# Clarify the build output: use dist/client, ignore dist/server

## What's happening

`bun run build` is working correctly. Because this project is built with TanStack
Start, the build always creates **two** folders:

- `dist/client/` — the plain HTML/CSS/JS files, including every prerendered page,
  `case-study-images/`, `.htaccess`, `favicon.png`, etc. **This is what you upload
  to cPanel.**
- `dist/server/` — the server bundle used by Lovable's hosting. You don't need it
  for cPanel; just ignore it.

I verified the output here: `dist/client/` exists and contains `index.html`,
`about/`, `case-studies/` (with one folder per case study), `case-study-images/`,
`contact/`, `our-team/`, `projects-training/`, and the assets.

So on your computer: after `bun run build`, open the `dist` folder and look inside
`client` — the website files are there. Upload **everything inside `dist/client`**
(not the folder itself, and not `dist/server`) into `public_html` on cPanel.

## What I will change

1. **Update `DEPLOY.md`** — state explicitly that the build creates two folders,
   that `dist/client` is the upload folder, that `dist/server` should be ignored,
   and show a `ls dist/client` check so you can confirm the files before uploading.
2. **Add a convenience script** `build:cpanel` in `package.json` that runs the
   normal build and then prints the exact upload path, so there's no ambiguity
   about which folder to upload.

## Verification

- Run `bun run build` and confirm `dist/client/index.html` and
  `dist/client/case-studies/<slug>/index.html` exist.
