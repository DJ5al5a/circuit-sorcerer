# AGENTS.md - Coding Guidelines for Circuit Sorcerer Portfolio

## Commands
- **Build**: `npm run build` (static export for NAS deployment)
- **Dev**: `npm run dev` (starts dev server on localhost:3000)
- **Lint**: `npm run lint` (ESLint, some warnings allowed)
- **Test**: No test framework configured - add Jest/Vitest if needed

## Code Style Guidelines

### General
- **Language**: TypeScript + React (Next.js App Router)
- **Formatting**: Tailwind CSS classes, consistent spacing
- **Imports**: Use `@/` alias for internal imports, group external then internal

### Components
- **Naming**: PascalCase (e.g., `HeroSection.tsx`)
- **Client Components**: Add `'use client'` directive for hooks/state
- **Props**: Use TypeScript interfaces, optional props with `?`

### Types & Naming
- **Variables**: camelCase (e.g., `serverStatus`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `NEON_COLORS`)
- **Types**: PascalCase interfaces (e.g., `interface StatusType`)
- **Files**: kebab-case for pages, PascalCase for components

### Error Handling
- **Async Functions**: Use try/catch with user-friendly alerts
- **API Calls**: Handle errors gracefully, show loading states
- **Validation**: Client-side validation before submission

### Animations & Styling
- **Framer Motion**: Use predefined variants from `lib/animations.ts`
- **Styling**: Circuit Sorcerer theme colors, responsive design
- **Z-Index**: Nav at 50, content below

### Best Practices
- **Accessibility**: Alt text, keyboard navigation, screen readers
- **Performance**: Lazy loading, optimize images, static export
- **Security**: No secrets in code, validate inputs
- **Git**: Descriptive commits, clean repo (no build files)

No Cursor rules or Copilot instructions found.