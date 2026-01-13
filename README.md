# The Westview Group

A production-ready Next.js 14+ website featuring a premium editorial design, built with TypeScript, TailwindCSS, shadcn/ui, and MDX content management.

## Features

- **Next.js 14+ App Router**: Modern React framework with server components
- **TypeScript**: Full type safety across the application
- **TailwindCSS**: Utility-first CSS with custom brand colors
- **shadcn/ui**: High-quality, accessible UI components
- **MDX Content**: Local MDX files for blog posts and case studies
- **SEO Optimized**: Metadata, OpenGraph, sitemap, and robots.txt
- **Mobile-First Design**: Responsive and accessible (WCAG-minded)
- **Premium Aesthetic**: Clean, editorial design with navy and gold brand colors

## Brand Identity

- **Primary Colors**: Deep navy (#003366), Gold (#e9d8a0), White
- **Typography**: Montserrat via next/font/google with system font fallbacks
- **Design Language**: Clean, premium, editorial

## Tech Stack

- Next.js 14.2.5
- React 18
- TypeScript 5
- TailwindCSS 3
- MDX for content
- Lucide React for icons
- next/font for optimized fonts

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd content-ops-starter
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with nav + footer
│   ├── page.tsx           # Home page
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── work/              # Work listing & case studies
│   ├── insights/          # Insights listing & blog posts
│   ├── contact/           # Contact page
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── sitemap.ts         # Sitemap generator
│   └── robots.ts          # Robots.txt generator
├── components/
│   ├── ui/                # shadcn/ui components
│   └── layout/            # Header, footer, navigation
├── content/
│   ├── work/              # Case study MDX files
│   └── insights/          # Blog post MDX files
├── lib/
│   ├── utils.ts           # Utility functions
│   ├── mdx.ts             # MDX content utilities
│   └── seo.ts             # SEO helpers
└── config/
    └── site.ts            # Site configuration
```

### Adding Content

#### Blog Posts (Insights)

Create a new MDX file in `content/insights/`:

```mdx
---
title: "Your Article Title"
description: "Brief description for SEO and previews"
date: "2026-01-15"
author: "Author Name"
category: "Category"
tags: ["Tag1", "Tag2"]
---

Your content here...
```

#### Case Studies (Work)

Create a new MDX file in `content/work/`:

```mdx
---
title: "Project Title"
description: "Brief project description"
date: "2026-01-15"
category: "Industry"
tags: ["Service1", "Service2"]
---

Your case study content...
```

### Customizing Styles

- **Colors**: Edit `tailwind.config.ts` to modify brand colors
- **Typography**: Update font in `app/layout.tsx`
- **Global Styles**: Modify `app/globals.css`

### SEO Configuration

Update site metadata in `config/site.ts`:

```typescript
export const siteConfig = {
  name: "Your Company",
  description: "Your description",
  url: "https://yoursite.com",
  // ... other settings
}
```

## Building for Production

1. Build the site:
```bash
npm run build
```

2. Test the production build:
```bash
npm start
```

The build will:
- Generate static pages for all routes
- Optimize images and fonts
- Create sitemap and robots.txt
- Bundle and minify assets

## Performance

This site is optimized for Lighthouse scores of 90+:

- Static generation where possible
- Optimized images with next/image
- Font optimization with next/font
- Minimal JavaScript bundle
- Fast navigation with App Router

## Deployment

This site can be deployed to:

- **Vercel** (recommended for Next.js)
- **Netlify**
- Any platform supporting Next.js

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Pages

- `/` - Home page with hero, services overview, and CTAs
- `/about` - Company mission, values, and story
- `/services` - Service offerings with detailed descriptions
- `/work` - Case studies listing
- `/work/[slug]` - Individual case study pages
- `/insights` - Blog posts listing
- `/insights/[slug]` - Individual blog post pages
- `/contact` - Contact form and information
- `/privacy` - Privacy policy
- `/terms` - Terms of service

## Accessibility

This site follows WCAG 2.1 guidelines:

- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- Color contrast ratios meet AA standards
- Responsive text sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Copyright © 2026 The Westview Group. All rights reserved.

## Support

For questions or support, contact hello@westviewgroup.com
