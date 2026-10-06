# Data Science Subject Laboratory Website

A beginner-friendly React + Vite laboratory portal for a Data Science subject.

## Features

- Responsive academic dashboard
- Module, experiment, tools, and resources pages
- React Router navigation
- Search across modules, experiments, tools, and resources
- Editable content stored in data files
- Experiment code editor with copy/reset/run/download actions
- Browser-based Python execution with Pyodide-style safe runtime handling
- Placeholder resource files in the public folder

## Run locally

```bash
npm install
npm run dev -- --host 0.0.0.0
```

Then open the local URL shown in the terminal.

## Build for production

```bash
npm run build
```

## Edit content

- Student and faculty details: src/data/siteData.js
- Modules: src/data/modules.js
- Experiments: src/data/experiments.js
- Tools: src/data/tools.js
- Resources: src/data/resources.js

## Replace the logo

- Update the file at public/logo.png
- Or change the path in src/data/siteData.js under collegeLogo

## Add downloadable files

Add files to public/resources and point the relevant href links to those files.

## Notes

This project intentionally uses placeholder academic data so it is easy to customize for your college and course.
