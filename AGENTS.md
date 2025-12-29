# AGENTS.md - Circuit Sorcerer Portfolio Website

## Overview
This document provides comprehensive guidelines for coding agents working on the Circuit Sorcerer portfolio website. The project is a Next.js 16 application with TypeScript, Tailwind CSS, and static export for hosting on Synology NAS. It includes a contact form system with n8n backend integration for processing submissions.

## Build, Lint, and Test Commands

### Build Commands
- `npm run build` - Creates static export in `out/` directory for production deployment
- `npm run dev` - Starts development server on localhost:3000 with hot reloading
- `npm run start` - Serves the built application (not used for static export)

### Linting
- `npm run lint` - Runs ESLint using Next.js configuration (core-web-vitals + TypeScript rules)
- Configuration: `eslint.config.mjs` with Next.js presets
- No custom rules currently; follows Next.js recommended practices
- Ignores: `.next/`, `out/`, `build/`, `next-env.d.ts`

### Testing
- **No test framework currently configured**
- **To add testing**: Install Jest and React Testing Library
- **Recommended setup**:
  ```bash
  npm install --save-dev jest @testing-library/react @testing-library/jest-dom jest-environment-jsdom
  ```
- **Running tests** (once set up):
  - `npm test` - Run all tests
  - `npm test -- <test-file>` - Run specific test file
  - `npm test -- --testNamePattern="specific test name"` - Run single test
  - `npm test -- --watch` - Watch mode for development

## Code Style Guidelines

### General Principles
- **Language**: TypeScript with strict mode enabled
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 with custom design system
- **Deployment**: Static export (no server-side rendering)
- **Target**: ES2017 for broad compatibility
- **Module System**: ES modules with bundler resolution

### Project Structure
- `src/app/` - Next.js App Router pages
- `src/components/` - Reusable React components
- `src/config/` - Static data and configuration
- `src/lib/` - Utility functions and constants
- `src/types/` - TypeScript type definitions
- `public/` - Static assets (images, videos)

### Imports and Dependencies
- Use `@/` path alias for `src/` directory imports
- Group imports in this order:
  1. React and React-related imports
  2. Third-party libraries (alphabetical)
  3. Local imports (components, utils, types)
- Prefer named imports over default imports
- Avoid relative imports; use path aliases
- Example:
  ```typescript
  import { useState } from 'react'
  import { motion } from 'framer-motion'
  import { Mail } from 'lucide-react'

  import { Button } from '@/components/ui/Button'
  import { siteConfig } from '@/config/site'
  import type { ContactForm } from '@/types/contact'
  ```

### Naming Conventions
- **Components**: PascalCase (e.g., `ContactForm`, `HeroSection`)
- **Files**: 
  - Pages: `kebab-case.tsx` (e.g., `contact.tsx`, `about.tsx`)
  - Components: `PascalCase.tsx` (e.g., `Navigation.tsx`, `ProjectCard.tsx`)
  - Utils/Config: `camelCase.ts` (e.g., `utils.ts`, `siteConfig.ts`)
- **Variables/Functions**: camelCase (e.g., `contactForm`, `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- **Types/Interfaces**: PascalCase (e.g., `ContactFormData`, `Project`)
- **Enums**: PascalCase (e.g., `Status`, `Theme`)

### TypeScript Types and Interfaces
- Enable strict mode in `tsconfig.json`
- Use interfaces for object shapes, especially props
- Avoid `any`; use `unknown`, unions, or specific types
- Type all function parameters and return values
- Use utility types where appropriate (`Partial`, `Pick`, `Omit`)
- Example:
  ```typescript
  interface ContactFormProps {
    onSubmit: (data: ContactFormData) => Promise<void>
    isLoading: boolean
  }

  type ContactFormData = {
    name: string
    email: string
    message: string
  }

  function ContactForm({ onSubmit, isLoading }: ContactFormProps) {
    // Implementation
  }
  ```

### Formatting and Style
- **Indentation**: 2 spaces (configured in tsconfig)
- **Quotes**: Single quotes for strings, double for JSX attributes
- **Semicolons**: Required
- **Line Length**: Aim for 80-100 characters
- **Trailing Commas**: Include in multiline objects/arrays
- **Empty Lines**: Use sparingly for logical grouping
- Example:
  ```typescript
  const handleSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        // Success handling
      }
    } catch (error) {
      console.error('Submission failed:', error)
    }
  }
  ```

### React Components
- Use functional components with hooks
- Prefer custom hooks for reusable logic
- Destructure props at component level
- Use TypeScript for prop types
- Example:
  ```typescript
  interface ButtonProps {
    children: React.ReactNode
    variant?: 'primary' | 'secondary'
    onClick: () => void
  }

  export function Button({ children, variant = 'primary', onClick }: ButtonProps) {
    return (
      <button
        className={cn(
          'btn',
          variant === 'primary' && 'btn-primary',
          variant === 'secondary' && 'btn-secondary'
        )}
        onClick={onClick}
      >
        {children}
      </button>
    )
  }
  ```

### State Management
- Use `useState` for local component state
- Use `useReducer` for complex state logic
- Avoid prop drilling; consider context for shared state
- Initialize state with proper types
- Example:
  ```typescript
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })

  const updateFormData = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }
  ```

### Asynchronous Operations
- Use `async/await` over Promise chains
- Handle errors with try/catch blocks
- Use loading states for user feedback
- Example:
  ```typescript
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert('Message sent successfully!')
        resetForm()
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  ```

### Error Handling
- Use try/catch for async operations
- Provide user-friendly error messages
- Log technical details for debugging
- Handle network errors and API failures
- Example patterns:
  ```typescript
  // API call error
  try {
    const response = await fetch(url)
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('API call failed:', error)
    throw new Error('Failed to load data. Please try again.')
  }

  // Form validation
  if (!email.includes('@')) {
    alert('Please enter a valid email address')
    return
  }
  ```

### Styling with Tailwind CSS
- Use utility-first approach
- Leverage custom CSS variables for theme colors
- Follow mobile-first responsive design
- Use `class-variance-authority` and `clsx` for conditional classes
- Example:
  ```typescript
  import { cn } from '@/lib/utils'

  interface CardProps {
    variant?: 'default' | 'elevated'
    children: React.ReactNode
  }

  export function Card({ variant = 'default', children }: CardProps) {
    return (
      <div
        className={cn(
          'rounded-lg border p-4',
          variant === 'default' && 'bg-surface border-border',
          variant === 'elevated' && 'bg-surface-elevated border-primary/20'
        )}
      >
        {children}
      </div>
    )
  }
  ```

### API Integration and Webhooks
- Use native `fetch` API with async/await
- Set proper Content-Type headers
- Handle JSON parsing and response validation
- Use environment variables for URLs (when available)
- Example:
  ```typescript
  const submitContactForm = async (data: ContactFormData) => {
    const response = await fetch(process.env.NEXT_PUBLIC_CONTACT_WEBHOOK || '/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to submit form')
    }

    return response.json()
  }
  ```

### Database and Backend Integration
- Use PostgreSQL for data storage
- Implement secure password hashing (PBKDF2 or bcrypt)
- Validate and sanitize input data
- Use parameterized queries to prevent SQL injection
- Handle database connection errors gracefully

### Performance Considerations
- Optimize images with Next.js Image component (unoptimized: true for static export)
- Use dynamic imports for heavy components
- Minimize bundle size by tree-shaking unused code
- Implement proper loading states to improve perceived performance

### Accessibility
- Use semantic HTML elements
- Provide alt text for images
- Ensure keyboard navigation support
- Maintain sufficient color contrast
- Add ARIA labels where needed

### Security Best Practices
- Validate and sanitize user inputs
- Use HTTPS for all external requests
- Implement proper CORS policies
- Avoid exposing sensitive data in client-side code
- Use secure password hashing for any authentication

### Git and Version Control
- Follow conventional commit messages
- Create feature branches for new work
- Write clear, descriptive commit messages
- Keep commits atomic and focused

### Documentation
- Add JSDoc comments for complex functions
- Document component props and usage
- Keep this AGENTS.md file updated with project changes
- Use README.md for setup and deployment instructions

## No Existing Cursor or Copilot Rules Found
No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` files were found in the repository. The guidelines above are based on the current codebase analysis and Next.js/TypeScript best practices.