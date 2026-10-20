<div align="center">

# STARAID Foundation

### Every student deserves to finish.

The official website of **STARAID**, the Students and Community Empowerment Foundation, a registered Nigerian NGO (RC No. 9022409) keeping talented students in school.

<br />

![React](https://img.shields.io/badge/React-18-20232a?style=for-the-badge&logo=react&logoColor=61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646cff?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88ce02?style=for-the-badge&logo=greensock&logoColor=black)

</div>

---

## Why STARAID exists

Every day we meet brilliant secondary and university students whose dreams are cut short, not by lack of talent, but by lack of textbooks, upkeep, accommodation, transport and healthcare.

**When a student is empowered, a whole community is transformed.**

STARAID supports students who have the talent but not the means, and runs health outreaches, literacy classes and vocational training for underserved communities across Nigeria.

## Seven ways we keep a student in school

|     | Programme                       | What it does                                                                                    |
| --- | ------------------------------- | ----------------------------------------------------------------------------------------------- |
| 🎓  | **Scholarship**                 | Full or part-time scholarships that keep deserving students in secondary school and university. |
| 💵  | **Monthly Upkeep**              | A steady monthly allowance for deserving students.                                              |
| 🍲  | **Food & Provisions**           | Food items and provisions for students and families.                                            |
| 🚌  | **Accommodation & Transport**   | A safe place to stay and a reliable way to get to class.                                        |
| 👁️  | **Healthcare & Eye Care**       | Free medical outreaches, eye tests and glasses, plus healthcare items.                          |
| 🤝  | **Mentorship & Counselling**    | Registered mentors and counsellors who walk with students who need guidance.                    |
| 📚  | **Community Literacy & Skills** | Literacy classes and vocational training that lift whole households.                            |

## Where we work

Port Harcourt · Abuja · Lagos, and we are growing across the rest of Africa.

## Get involved

- **Donate.** Give by bank transfer from the Donate page of the website (`/donate`).
- **Partner.** Corporate and individual partners are recognised in three groups:
  - **Platinum Group (Life Members):** a lifetime commitment, recognised with a Platinum Medal and Certificate of Honour.
  - **Gold Elite Group:** a partnership of one to five years, recognised with a Gold Medal and Certificate of Recognition.
  - **Gold Contact Group (Volunteers):** time, professional skills, mentorship and counselling, recognised with a Service Medal and Certificate.
- **Volunteer.** Give your time and skills as a mentor or counsellor.
- **Say hello.** Use the contact form on the website, or write to [STARAIDfoundation@gmail.com](mailto:STARAIDfoundation@gmail.com).

Our international strategic partner is [Voitheia Inc.](https://voitheia.ngo/), a California-based 501(c)(3) non-profit.

---

## About this website

A fast, accessible, animated site that tells the STARAID story and makes it easy to give, partner or volunteer.

**Pages**

| Route     | Purpose                                                                                                                      |
| --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/`       | The home page: hero, our mission, programmes, why partner, recognition, FAQ, international partner, contact form and footer. |
| `/donate` | Bank transfer details with a one-tap copy button for the account number.                                                     |

**Highlights**

- **Scroll storytelling** with GSAP and ScrollTrigger: a pinned mission statement, a pinned step-by-step "reasons" section and a drifting programmes carousel.
- **Accessible by default:** semantic landmarks, keyboard-friendly accordion and forms, visible focus states, labelled controls, and full support for `prefers-reduced-motion`.
- **Mobile first.** Designed from 375px up, with `100svh` full-screen sections.
- **Contact and newsletter forms** with inline validation, honeypot spam protection, and clear success and error states.
- **Design tokens only.** Every colour, font, radius and shadow lives in one file, [`src/styles/tokens.css`](src/styles/tokens.css).
- **Content separated from code.** All copy lives in [`src/content/`](src/content), so wording can change without touching components.

## Tech stack

- [React 18](https://react.dev/) and [TypeScript](https://www.typescriptlang.org/) (strict)
- [Vite](https://vite.dev/) for the build
- [Tailwind CSS v4](https://tailwindcss.com/)
- [GSAP](https://gsap.com/) with `@gsap/react` and ScrollTrigger
- [React Router](https://reactrouter.com/) (`BrowserRouter`)
- [React Icons](https://react-icons.github.io/react-icons/) (Font Awesome 6)
- ESLint and Prettier

## Getting started

You need [Node.js](https://nodejs.org/) 20 or newer.

```bash
# 1. Install dependencies
npm install

# 2. Create your local environment file
cp .env.example .env

# 3. Start the dev server
npm run dev
```

Open the local address Vite prints (usually <http://localhost:5173>).

### Environment variables

| Variable                   | Purpose                                                                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `VITE_CONTACT_ENDPOINT`    | URL that receives the contact form as a JSON `POST` (`firstName`, `companyName`, `interest`, `email`, `message`). A 2xx response counts as success. If it is not set, submitting shows the form's error message. |
| `VITE_NEWSLETTER_ENDPOINT` | URL that receives the footer newsletter signup as a JSON `POST` (`email`). A 2xx response counts as success. If it is not set, submitting shows the form's error message.                                        |

### Scripts

| Command             | What it does                                         |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the development server.                        |
| `npm run build`     | Type-check and create a production build in `dist/`. |
| `npm run typecheck` | Run the TypeScript compiler without emitting files.  |
| `npm run lint`      | Lint the code with ESLint.                           |
| `npm run format`    | Format the code with Prettier.                       |

## Project structure

```
src/
  components/
    layout/      Header, Footer, Logo, ScrollManager
    sections/    one file per home page section
    ui/          small reusable pieces (Button, FormField, CopyButton, ...)
  pages/         HomePage and DonatePage (lazy loaded)
  content/       all copy, links and FAQs, typed
  config/        typed constants (motion, form rules)
  lib/           GSAP setup, reveal helper, form validation and submission
  hooks/         custom hooks
  styles/        design tokens and global styles
  types/         shared types
  assets/        images and icons
```

## Deployment

This is a single-page app with client-side routing, so the host must send every path to `index.html` (otherwise opening `/donate` directly returns a 404). Both common setups are already included:

- **Vercel:** [`vercel.json`](vercel.json)
- **Netlify / Cloudflare Pages:** [`public/_redirects`](public/_redirects)

Run `npm run build` and publish the `dist/` folder. Remember to set the two environment variables above in your host's settings.

## Credits

Photography is sourced from [Unsplash](https://unsplash.com/) and [Pexels](https://www.pexels.com/). Fonts are served through [Fontsource](https://fontsource.org/).

---

<div align="center">

**Build the nation through its youth.**

</div>
