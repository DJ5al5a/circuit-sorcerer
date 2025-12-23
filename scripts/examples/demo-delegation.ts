/**
 * Quick Delegation Demo
 * Shows the delegation system routing and structure
 */

import { delegator, DELEGATION_CONFIG } from '../ai-delegation'

async function demonstrateDelegation() {
  console.log('🎯 Multi-Model AI Delegation System Demo\n')
  console.log('═'.repeat(70))

  // Show configuration
  console.log('📊 CONFIGURED MODELS:\n')
  console.log('OpenCode/Grok:')
  console.log(`  • Path: ${DELEGATION_CONFIG.clients.opencode.path}`)
  console.log(`  • Default: ${DELEGATION_CONFIG.clients.opencode.defaultModel}`)
  console.log(`  • Available: ${DELEGATION_CONFIG.clients.opencode.availableModels.join(', ')}\n`)

  console.log('Gemini CLI:')
  console.log(`  • Path: ${DELEGATION_CONFIG.clients.gemini.path}`)
  console.log(`  • Default: ${DELEGATION_CONFIG.clients.gemini.defaultModel}`)
  console.log(`  • Available: ${DELEGATION_CONFIG.clients.gemini.availableModels.join(', ')}\n`)

  console.log('═'.repeat(70))
  console.log('📋 TASK ROUTING RULES:\n')

  const routingEntries = Object.entries(DELEGATION_CONFIG.routing)
  routingEntries.forEach(([task, model]) => {
    const capability = DELEGATION_CONFIG.modelCapabilities[model]
    console.log(`  ${task.padEnd(30)} → ${model.padEnd(25)} (${capability.client})`)
  })

  console.log('\n' + '═'.repeat(70))
  console.log('🔧 EXAMPLE USAGE:\n')

  console.log('// Automatic routing based on task type')
  console.log('await delegator.delegate({')
  console.log('  task: "content.blog-post",  // → Routes to Grok')
  console.log('  prompt: "Write a blog post..."')
  console.log('})\n')

  console.log('// Explicit model selection')
  console.log('await delegator.delegate({')
  console.log('  model: "gemini-2.5-flash",  // → Force Gemini')
  console.log('  prompt: "Analyze this code..."')
  console.log('})\n')

  console.log('// Parallel execution')
  console.log('await delegator.delegateParallel([')
  console.log('  { task: "code.generation", prompt: "..." },  // → Grok')
  console.log('  { task: "research.technology", prompt: "..." }  // → Gemini')
  console.log('])\n')

  console.log('═'.repeat(70))
  console.log('✅ Delegation system ready!')
  console.log('\n💡 Claude Code can now autonomously delegate tasks to:')
  console.log('   • Grok Fast 1 (via OpenCode) - code, tests, technical writing')
  console.log('   • Gemini 2.5 Flash - research, analysis, code review')
  console.log('   • Gemini 2.5 Flash Lite - quick queries, simple lookups\n')
}

demonstrateDelegation().catch(console.error)
