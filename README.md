# Yerosan Girma Portfolio

A modern personal portfolio website for Yerosan Girma, built to showcase skills, featured projects, experience, social links, and a working contact form.

## Overview

This site presents Yerosan Girma as a Full Stack MERN Developer. It includes an animated landing section, project portfolio, skills overview, experience section, and EmailJS-powered contact form.

## Features

- Animated splash screen and hero section
- Responsive portfolio layout for desktop and mobile
- Skills and technology showcase
- Featured project cards with details, demos, and GitHub links
- Experience section
- Contact form using EmailJS
- Social links for GitHub, LinkedIn, and email
- Vercel-ready deployment configuration

## Tech Stack

- React 18
- Vite
- TypeScript
- Tailwind CSS
- Motion animations
- Lucide React icons
- EmailJS contact form
- Vercel hosting

## Project Structure

```text
src/
  app/
    App.tsx
    components/
      portfolio/
        About.tsx
        Contact.tsx
        Experience.tsx
        Footer.tsx
        Hero.tsx
        Navbar.tsx
        Projects.tsx
        Skills.tsx
      image/
        yeroimage1.jpg
        yeroimage2.jpg
        yeroimage3.jpg
    pages/
      PortfolioPage.tsx
  styles/
    index.css
```

## Environment Variables

The contact form uses EmailJS. Create a local `.env` file with:

```env
VITE_EMAILJS_SERVICE_ID=your_emailjs_service_id
VITE_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
```

The project includes `.env.example` as a template. The real `.env` file is ignored by git.

Important: Vite exposes `VITE_` variables in the browser build, so do not put private server secrets in these values. EmailJS public keys are intended for browser use.

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

The production build is written to the `dist` folder.

## Vercel Deployment

This project is configured for Vercel in `vercel.json`.

Use these Vercel settings:

```text
Framework Preset: Vite
Install Command: npm install
Build Command: npm run build
Output Directory: dist
```

Add these environment variables in Vercel:

```env
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

Recommended Vercel steps:

1. Push this repository to GitHub, GitLab, or Bitbucket.
2. Open Vercel and choose Add New > Project.
3. Import the repository.
4. Confirm the project settings above.
5. Add the EmailJS environment variables.
6. Deploy the project.

## Notes

- `vercel.json` rewrites all app routes to `index.html`, which keeps the single-page app working on direct links.
- The contact form will show an error if EmailJS environment variables are missing.
- The site currently renders the portfolio page directly from `src/app/App.tsx`.
