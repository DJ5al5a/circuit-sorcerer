/**
 * Multi-Model Delegation Example
 * Demonstrates Claude Code delegating tasks to both Grok and Gemini in parallel
 */

import { delegator } from '../ai-delegation'

async function demonstrateMultiModelDelegation() {
  console.log('🚀 Multi-Model AI Delegation Demo\n')

  console.log('Running 3 tasks in parallel:')
  console.log('  1. Blog post generation (→ Grok)')
  console.log('  2. Technology research (→ Gemini)')
  console.log('  3. Quick query (→ Gemini Lite)\n')

  const [blogPost, research, quickQuery] = await delegator.delegateParallel([
    {
      task: 'content.blog-post',
      prompt: 'Write a brief introduction paragraph for a blog post about setting up a Proxmox home lab for infrastructure learning. Keep it under 100 words.',
      format: 'markdown'
    },
    {
      task: 'research.technology',
      prompt: 'Compare MDX vs Markdown for a Next.js blog. Give pros and cons in 3 bullet points each.',
      format: 'text'
    },
    {
      task: 'research.quick',
      prompt: 'What is the latest stable version of Next.js as of 2025?',
      format: 'text'
    }
  ])

  console.log('✅ All tasks completed!\n')

  console.log('═'.repeat(60))
  console.log('RESULT 1: Blog Post Introduction')
  console.log(`Model: ${blogPost.model} (${blogPost.client})`)
  console.log('─'.repeat(60))
  console.log(blogPost.output.trim())
  console.log('\n')

  console.log('═'.repeat(60))
  console.log('RESULT 2: Technology Research')
  console.log(`Model: ${research.model} (${research.client})`)
  console.log('─'.repeat(60))
  console.log(research.output.trim())
  console.log('\n')

  console.log('═'.repeat(60))
  console.log('RESULT 3: Quick Query')
  console.log(`Model: ${quickQuery.model} (${quickQuery.client})`)
  console.log('─'.repeat(60))
  console.log(quickQuery.output.trim())
  console.log('\n')

  console.log('✨ Demo complete! Multi-model delegation working perfectly.')
}

// Run the demo
demonstrateMultiModelDelegation().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
