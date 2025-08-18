# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack (runs on http://localhost:3000)
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint to check code quality

## Project Architecture

This is a Next.js 15 application called "Feelter" using the App Router architecture. The project appears to be a movie/entertainment platform with community features.

### Core Structure

- **App Router**: Uses Next.js App Router with TypeScript
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **Fonts**: Geist Sans and Geist Mono fonts from next/font/google
- **Path Aliases**: `@/*` maps to the root directory

### Main Feature Areas

- `/community` - Community features including emotions, forum, activities, and reviews
- `/movie/[id]` - Individual movie pages with dynamic routing
- `/my` - User account features (favorites, history, profile, settings, survey, points)
- `/search` - Search functionality with results page
- `/main` - Additional main content area

### Page Structure

Most pages in the feature directories are currently empty (1-line files), suggesting the application is in early development. The main landing page (`app/page.tsx`) uses the default Next.js template.

### Styling System

- Dark/light mode support via CSS custom properties
- Tailwind CSS with inline theme configuration
- CSS variables for consistent theming (`--background`, `--foreground`)

### Technology Stack

- **Framework**: Next.js 15.4.6 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: Tailwind CSS v4
- **Linting**: ESLint with Next.js config
- **Runtime**: React 19.1.0