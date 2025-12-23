/**
 * Test OpenCode/Grok Delegation
 * Simpler test focusing on Grok Fast 1 via OpenCode
 */

import { delegator } from '../ai-delegation'

async function testOpenCodeDelegation() {
  console.log('🚀 Testing OpenCode/Grok Delegation\n')

  console.log('Running 2 tasks for Circuit Sorcerer project:\n')

  const tasks = [
    {
      name: 'Generate Button Component Code',
      options: {
        model: 'xai/grok-fast-1',  // Force Grok
        prompt: `Create a reusable Button component in TypeScript for Next.js with Tailwind CSS.

Include:
- Primary and secondary variants
- Small, medium, large sizes
- Proper TypeScript types
- Focus and hover states

Keep it under 50 lines. Return only the code.`,
        format: 'code' as const
      }
    },
    {
      name: 'Explain Server Components',
      options: {
        model: 'xai/grok-fast-1',  // Force Grok
        prompt: `In 3 sentences, explain when to use Server Components vs Client Components in Next.js 16.`,
        format: 'text' as const
      }
    }
  ]

  console.log('Delegating to Grok Fast 1 via OpenCode...\n')

  const startTime = Date.now()
  const results = await delegator.delegateParallel(tasks.map(t => t.options))
  const duration = ((Date.now() - startTime) / 1000).toFixed(2)

  console.log(`✅ Tasks completed in ${duration}s\n`)
  console.log('═'.repeat(70))

  results.forEach((result, i) => {
    const task = tasks[i]
    console.log(`\n📋 ${task.name}`)
    console.log(`🤖 Model: ${result.model}`)
    console.log('─'.repeat(70))

    if (result.success) {
      console.log(result.output.trim().substring(0, 500))
      if (result.output.length > 500) {
        console.log('\n... (output truncated)')
      }
    } else {
      console.log(`❌ Error: ${result.error}`)
    }
  })

  console.log('\n' + '═'.repeat(70))
  console.log('✨ OpenCode delegation test complete!')
}

testOpenCodeDelegation().catch((error) => {
  console.error('❌ Error:', error)
  process.exit(1)
})
