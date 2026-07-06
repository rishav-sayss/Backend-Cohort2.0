# Project File Guide

This file lists the important files in this Next.js project and what each one is for. It focuses on the source and configuration files you actually use while building and maintaining the app.

## Root Files

- `package.json` - project name, scripts, and dependencies.
- `package-lock.json` - locked dependency versions.
- `next.config.ts` - Next.js configuration.
- `tsconfig.json` - TypeScript configuration.
- `eslint.config.mjs` - ESLint rules and setup.
- `postcss.config.mjs` - PostCSS/Tailwind configuration.
- `next-env.d.ts` - Next.js TypeScript types.
- `README.md` - starter project documentation.
- `.gitignore` - files and folders excluded from Git.
- `.env.local` - local environment variables for database, auth, and AI keys.

## Public Assets

- `public/file.svg` - static asset used by the app or landing page.
- `public/globe.svg` - static asset used by the app or landing page.
- `public/next.svg` - static asset used by the app or landing page.
- `public/vercel.svg` - static asset used by the app or landing page.
- `public/window.svg` - static asset used by the app or landing page.

## App Files

- `src/app/layout.tsx` - root layout shared across all pages.
- `src/app/page.tsx` - main home page.
- `src/app/globals.css` - global styles.
- `src/app/favicon.ico` - site icon.

## API Routes

### Auth

- `src/app/api/auth/login/route.ts` - login endpoint.
- `src/app/api/auth/register/route.ts` - register endpoint.

### Resume

- `src/app/api/resume/create/route.ts` - create resume endpoint.

### AI

- `src/app/api/ai/ats-store/route.ts` - stores ATS-related data.
- `src/app/api/ai/improve-content/route.ts` - improves resume content.
- `src/app/api/ai/generate-experience-description/route.ts` - generates experience text.
- `src/app/api/ai/generate-skills/route.ts` - generates skills text.
- `src/app/api/ai/generate-project-description/route.ts` - generates project text.
- `src/app/api/ai/Generateapi-summery/route.ts` - generates summary text.

## Library Files

- `src/lib/mongodb.ts` - connects the app to MongoDB.
- `src/lib/jwt.ts` - creates and verifies JWT tokens.
- `src/lib/getCurrentUser.ts` - gets the currently logged-in user.
- `src/lib/gemini.ts` - wraps Gemini AI access.

## Models

- `src/models/userModel.ts` - MongoDB user schema and model.
- `src/models/resumemodel.ts` - MongoDB resume schema and model.

## Types

- `src/types/user.types.ts` - user-related TypeScript types.
- `src/types/resume.types.ts` - resume-related TypeScript types.
- `src/types/api.typs.ts` - API response/request types.
- `src/types/ai.types.ts` - AI-related TypeScript types.

## Notes

- The `node_modules/` and `.next/` folders are generated and should not be edited directly.
- The `src/app/api/ai/Generateapi-summery/` folder name is written exactly as it exists in the project.