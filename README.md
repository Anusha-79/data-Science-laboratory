# Data Science Subject Laboratory

A responsive academic laboratory portal and student portfolio built with React and Vite. The site brings course information, practical exercises, learning tools, and resume details together in one place for students, faculty, and internship reviewers.

## Project overview

The application presents the Data Science subject laboratory at Mohan Babu University alongside a student profile for Munga Anusha, a B.Tech Computer Science and Engineering student specializing in Data Science. Resume information is maintained in the existing site data module and can be updated in the Admin page.

## Features

- Responsive home page with student ID, faculty and course details, syllabus, and resume profile.
- Five course modules and ten experiment pages with videos, editable code examples, browser-based code execution, copy, reset, and download actions.
- Searchable modules, experiments, tools, and learning resources.
- Official tool and documentation links open in a new tab with safe external-link attributes.
- Downloadable local course resources and interactive study-note books with print and download actions.
- Editable student, faculty, course, and resume information, saved in browser local storage.
- Resume text download and print / save as PDF.
- Responsive navigation with active-route state and a light/dark theme toggle.
- Personal lab attendance tracker with editable records, configurable eligibility threshold, filters, print report, and CSV export.

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

- Student, faculty, course, resume details, and social URLs: `src/data/siteData.js` or the in-app **Admin** page.
- Course modules: `src/data/modules.js`.
- Practical experiments and video references: `src/data/experiments.js`.
- Tools and their official website URLs: `src/data/tools.js`.
- Learning links and downloadable resource paths: `src/data/resources.js`.
- Study-note book content: `src/data/notes.js`.
- Attendance subjects are sourced from `src/data/modules.js` and `src/data/experiments.js`; attendance records and the configurable minimum percentage are saved in browser local storage under `ds-lab-attendance`.
- Downloadable local files: add them under `public/resources/` and update the relevant resource path.

Contact email, phone, GitHub, and LinkedIn details are intentionally left blank until the student supplies the information they want to publish; these fields can be updated in Admin. The student ID's roll-number field is marked as not provided; update it in Admin if it should be displayed. The syllabus and resource files currently include placeholders where final course documents have not been supplied.

Attendance records are stored in browser local storage on the current device and browser. They are personal demonstration data, are not synchronized with faculty or university systems, and can be lost if browser storage is cleared. No official attendance status is implied.

## Privacy and customization

Editable site details are stored in this browser's local storage and are not uploaded by the application. Update personal details and profile links before publishing a public deployment. Do not add credentials or other sensitive information to the site data.
