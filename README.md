# Data Science Subject Laboratory

A responsive academic laboratory portal and student portfolio built with React and Vite. The site brings course information, practical exercises, learning tools, and resume details together in one place for students, faculty, and internship reviewers.

## Project overview

The application presents the Data Science subject laboratory at Mohan Babu University alongside a read-only student portfolio for Munga Anusha, a B.Tech Computer Science and Engineering student specializing in Data Science. Profile and resume information is maintained in the project source data.

## Features

- Responsive home page with a digital student ID, faculty and course details, syllabus, and complete resume.
- Five course modules and ten experiment pages with videos, editable code examples, browser-based code execution, copy, reset, and download actions.
- Searchable modules, experiments, tools, and learning resources.
- Official tool and documentation links open in a new tab with safe external-link attributes.
- Downloadable local course resources and interactive study-note books with print and download actions.
- Profile, resume, faculty, and course information is defined in `src/data/siteData.js` and remains consistent across refreshes and deployments.
- Resume text download and print / save as PDF.
- Responsive navigation with active-route state and a light/dark theme toggle.

## Technology

- React 18
- Vite 5
- React Router
- Lucide React icons
- TypeScript project checks

## Requirements

- Node.js and npm (use a current LTS release).

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## Production build

```bash
npm run build
npm run preview
```

The production-ready site is generated in `dist/`.

## Updating project information

- Student, faculty, course, resume details, and social URLs: `src/data/siteData.js`.
- Course modules: `src/data/modules.js`.
- Practical experiments and video references: `src/data/experiments.js`.
- Tools and their official website URLs: `src/data/tools.js`.
- Learning links and downloadable resource paths: `src/data/resources.js`.
- Study-note book content: `src/data/notes.js`.
- Downloadable local files: add them under `public/resources/` and update the relevant resource path.

The GitHub, LinkedIn, and LeetCode profile URLs were supplied for the portfolio. Instagram is not linked because a profile URL was not provided. The syllabus and resource files currently include placeholders where final course documents have not been supplied.

Attendance records are stored in browser local storage on the current device and browser. They are personal demonstration data, are not synchronized with faculty or university systems, and can be lost if browser storage is cleared. No official attendance status is implied.

## Privacy and customization

The public website is read-only. Final profile and resume details are stored in project source data rather than browser storage. Do not add credentials or other sensitive information to the site data.
