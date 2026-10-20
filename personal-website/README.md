# bashem.app

Personal resume and portfolio built with Next.js App Router, React, and TypeScript. Pages are rendered at build time and exported as static files for GitHub Pages. Resume content lives in one JSON file, validated with Zod. The Python generator has been replaced by React components.

## Structure

```text
personal-website/
├── app/                  # Page, layout, global CSS, sitemap, and robots metadata
├── components/           # Sidebar and individual resume sections
├── data/
│   ├── resume.json       # Edit your content here
│   ├── schema.ts         # Validation rules and inferred TypeScript types
│   └── resume.ts         # Validated data and shared navigation
├── public/assets/        # Original resume PDF and favicon
├── scripts/              # Prepare domain and static hosting files
├── next.config.ts        # Static export configuration
├── package.json
└── out/                  # Generated production website (ignored by Git)
```

Everything specific to the website is inside `personal-website/`, except the deployment workflow, which GitHub requires under `.github/workflows/`. The root profile README remains omitted.

## Run locally

Use Node.js 22 or newer. From the repository root:

```sh
cd personal-website
npm ci
npm run dev
```

Open http://localhost:3000/mbashem/. The local path follows the pathname in `site.url`. Editing the JSON, components, or CSS refreshes the development site. Restart the development server after changing `site.url`, because Next.js reads `basePath` at startup. Stop the server with Ctrl+C.

From the `personal-website` directory, build and check the production site with:

```sh
npm run build
npm run typecheck
```

`npm run build` validates content, checks the PDF exists, prepares the custom-domain file, and exports the complete website to `out/`. There is no production Node.js server. Publish `out/`, not `public/` or the source directory. Do not edit generated files in `out/` or `.next/`.

## Update content

1. Edit `personal-website/data/resume.json`. Personal information, resume content, section headings, contact links, ratings, and page copy are defined here.
2. Add or reorder jobs, projects, skills, ratings, contests, or education by editing their arrays. Entries display in the order listed. Copy an existing object as a starting point.
3. Use plain text, `\n` for line breaks, and `**bold text**` for emphasis in paragraphs and experience points. React escapes HTML rather than executing it.
4. Each job's `highlights` array contains every experience bullet, including the first point. There is no separate summary field. Each job requires at least one role.
5. Set `current` to `true` for your current job and `false` for previous jobs. The hero uses the first current job's first role automatically.
6. Replace `personal-website/public/assets/resume.pdf` separately and update `resume.updated` using `YYYY-MM-DD`. `resume.path` is relative to `public/`. The PDF's contents are not generated from the JSON.
7. Push content changes to `main` after configuring Pages. GitHub Actions builds and publishes the latest data automatically.

For a new project, add an object to `projects.items`:

```json
{
  "name": "My new project",
  "category": "Web application",
  "period": "2026–present",
  "paragraphs": ["What it does and who it helps."],
  "stack": ["TypeScript", "Go"],
  "links": [{ "label": "Source code", "url": "https://github.com/mbashem/my-project" }]
}
```

Project `artwork` is optional. Omit it for a text-only entry, or copy an existing object and choose `tracker` or `chart`. Employer and contest `url` fields are optional and may be empty strings. A role's `note` is optional. Empty experience or project arrays hide those sections and adjust navigation numbering. Empty education, awards, highlights, stack, and link arrays are supported.

Contact information is shared from `profile`, so updating an email or social link updates all its appearances. `site.url` drives Next.js `basePath`, public asset links, the canonical URL, social URL, sitemap, and robots file. The current URL is `https://mbashem.github.io/mbashem/`, so CSS, JavaScript, PDF, and favicon paths include `/mbashem`. A build is required after changing this value.

For a custom domain later, set `site.url` to its root (for example, `https://bashem.app/`), configure that domain in GitHub Pages settings, and configure DNS. The next build automatically switches back to root paths. No DNS changes are needed for the default GitHub URL.

Edit `app/globals.css` for styling and the relevant file in `components/` for layout. `data/schema.ts` reports invalid fields during the build; it also provides the types used by the components. Fix errors before publishing.

## Enable GitHub Pages

1. Keep the repository public on GitHub Free, or use a plan supporting Pages from private repositories.
2. In **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
3. The workflow at `.github/workflows/pages.yml` installs locked npm dependencies, builds the static export, and checks TypeScript. Pull requests build without deploying. Pushes to `main` and manual workflow runs upload only `personal-website/out/` and deploy it to GitHub Pages.
4. To use the default URL, leave **Custom domain** empty. The site is served at `https://mbashem.github.io/mbashem/`.

The following steps are only needed when switching to `bashem.app` later:

5. Set `site.url` to `https://bashem.app/` and verify domain ownership under your account's **Settings → Pages**, using GitHub's TXT record.
6. In this repository's Pages settings, set the custom domain to `bashem.app` before pointing DNS at GitHub.
7. Configure the apex (`@`) with these four A records:

   ```text
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```

8. Add a `www` CNAME record pointing to `mbashem.github.io`. Preserve existing mail records and avoid wildcard DNS records.
9. Once GitHub provisions the certificate, enable **Enforce HTTPS** and check both domain variants.
10. Set the repository and GitHub profile website URLs to `https://bashem.app`.

Builds generate `.nojekyll` in `public/`, which Next.js copies into `out/`. For a custom hostname, builds also generate `public/CNAME`. For a `github.io` URL, builds remove any stale CNAME file. The CNAME file alone does not configure your GitHub custom domain. Local builds do not enable hosting or change DNS.

[Next.js static exports](https://nextjs.org/docs/app/guides/static-exports) · [GitHub Pages setup](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site) · [Custom domain setup](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

Ratings are personal bests, not live statistics. LeetCode's maximum is displayed as 2457, rounded from 2456.789, with the Guardian badge. Update these values in `data/resume.json` when needed.
