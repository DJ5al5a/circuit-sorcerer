/**
 * Test Delegation System on Circuit Sorcerer Project
 * Demonstrates real-world task delegation based on Gemini's analysis
 */

import { delegator } from '../ai-delegation'

async function testDelegationOnProject() {
  console.log('🧪 Testing Multi-Model Delegation on Circuit Sorcerer Project\n')
  console.log('Based on Gemini\'s project analysis, running 4 parallel tasks:\n')

  const tasks = [
    {
      name: 'Research: Server vs Client Components',
      options: {
        task: 'research.technology' as const,
        prompt: `Explain the best practices for Server Components vs Client Components in Next.js 16.
Focus on:
1. When to use Server Components vs Client Components
2. How to refactor a large Client Component like HeroSection into a Server Component with isolated interactive parts
3. Performance implications

Keep the answer concise (under 200 words) and actionable.`,
        format: 'text' as const
      }
    },
    {
      name: 'Code Generation: Reusable Button Component',
      options: {
        task: 'code.generation' as const,
        prompt: `Generate a reusable Button component for a Next.js + TypeScript + Tailwind project with the "Circuit Sorcerer" theme.

Requirements:
- TypeScript with proper types
- Support variants: primary, secondary, outline
- Support sizes: sm, md, lg
- Use class-variance-authority for variant management
- Include hover effects and focus states
- Match the existing neon/cyberpunk aesthetic (cyan, purple, gold colors)
- Export as both Button (button) and LinkButton (Next.js Link)

Return only the TypeScript code for src/components/ui/Button.tsx`,
        format: 'code' as const,
        files: ['src/app/globals.css']
      }
    },
    {
      name: 'Code Review: HeroSection Component',
      options: {
        task: 'code.review' as const,
        prompt: `Review this HeroSection component and suggest specific refactoring to make it a Server Component with isolated Client Components for interactive parts.

Provide:
1. Which parts should be Server Components
2. Which parts need to remain Client Components
3. Specific code structure recommendation

Keep it concise (under 150 words).`,
        format: 'text' as const,
        files: ['src/components/sections/HeroSection.tsx']
      }
    },
    {
      name: 'Documentation: Theme System',
      options: {
        task: 'content.documentation' as const,
        prompt: `Write concise documentation (under 200 words) explaining the Circuit Sorcerer theming system based on the globals.css file.

Cover:
1. Color palette (tech colors vs mystical colors)
2. Custom animations available
3. How to use the theme utilities in components

Format as markdown.`,
        format: 'markdown' as const,
        files: ['src/app/globals.css']
      }
    }
  ]

  console.log('Tasks queued:')
  tasks.forEach((task, i) => {
    console.log(`  ${i + 1}. ${task.name}`)
  })
  console.log('\n' + '═'.repeat(70) + '\n')

  // Execute all tasks in parallel
  const startTime = Date.now()
  const results = await delegator.delegateParallel(tasks.map(t => t.options))
  const duration = ((Date.now() - startTime) / 1000).toFixed(2)

  console.log(`✅ All tasks completed in ${duration}s\n`)

  // Display results
  results.forEach((result, i) => {
    const task = tasks[i]
    console.log('═'.repeat(70))
    console.log(`📋 ${task.name}`)
    console.log(`🤖 Model: ${result.model} (${result.client})`)
    console.log('─'.repeat(70))

    if (result.success) {
      console.log(result.output.trim())
    } else {
      console.log(`❌ Error: ${result.error}`)
    }

    console.log('\n')
  })

  console.log('═'.repeat(70))
  console.log('✨ Delegation test complete!')
  console.log('\nModel Distribution:')
  const modelCounts = results.reduce((acc, r) => {
    acc[r.model] = (acc[r.model] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  Object.entries(modelCounts).forEach(([model, count]) => {
    console.log(`  • ${model}: ${count} task(s)`)
  })
}

// Run the test
testDelegationOnProject().catch((error) => {
  console.error('❌ Test failed:', error)
  process.exit(1)
})
