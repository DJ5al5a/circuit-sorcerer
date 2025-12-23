#!/usr/bin/env tsx

/**
 * CLI for AI Delegation System
 * Usage: npm run delegate -- [task-type] [options]
 */

import { delegator } from '../ai-delegation'
import { TaskType } from '../ai-delegation/config'

interface CLIArgs {
  taskType?: TaskType
  prompt?: string
  files?: string[]
  model?: string
  format?: 'text' | 'json' | 'code' | 'markdown'
  help?: boolean
}

function parseArgs(): CLIArgs {
  const args = process.argv.slice(2)
  const parsed: CLIArgs = {}

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === '--help' || arg === '-h') {
      parsed.help = true
    } else if (arg === '--type' || arg === '-t') {
      parsed.taskType = args[++i] as TaskType
    } else if (arg === '--prompt' || arg === '-p') {
      parsed.prompt = args[++i]
    } else if (arg === '--files' || arg === '-f') {
      parsed.files = args[++i].split(',')
    } else if (arg === '--model' || arg === '-m') {
      parsed.model = args[++i]
    } else if (arg === '--format') {
      parsed.format = args[++i] as 'text' | 'json' | 'code' | 'markdown'
    } else if (!arg.startsWith('--') && !parsed.taskType) {
      // First positional arg is task type
      parsed.taskType = arg as TaskType
    } else if (!arg.startsWith('--') && !parsed.prompt) {
      // Second positional arg is prompt
      parsed.prompt = arg
    }
  }

  return parsed
}

function showHelp() {
  console.log(`
AI Delegation CLI

Usage:
  npm run delegate -- [task-type] [prompt] [options]
  npm run delegate:content -- --type blog-post --prompt "Write about Docker"
  npm run delegate:research -- --prompt "Compare Next.js vs Remix"

Task Types:
  Content:
    - content.blog-post          Write blog posts
    - content.project-description  Generate project descriptions
    - content.documentation      Create documentation

  Research:
    - research.technology        Research technologies
    - research.analysis          Analyze topics
    - research.quick             Quick research queries

  Testing:
    - testing.unit-tests         Generate unit tests
    - testing.component-tests    Generate component tests

  Code:
    - code.generation            Generate code
    - code.review                Review code

  Reasoning:
    - reasoning.complex          Complex reasoning tasks

Options:
  --type, -t <type>      Task type (required)
  --prompt, -p <text>    Prompt/question (required)
  --files, -f <paths>    Comma-separated file paths
  --model, -m <model>    Override model selection
  --format <format>      Output format (text|json|code|markdown)
  --help, -h             Show this help

Examples:
  # Generate blog post
  npm run delegate:content -- --type blog-post --prompt "Write about self-hosting"

  # Research technology
  npm run delegate:research -- --type technology --prompt "Explain Kubernetes"

  # Generate tests for a file
  npm run delegate -- testing.unit-tests --files src/utils.ts --prompt "Generate tests"

  # Use specific model
  npm run delegate -- code.review --model gemini-2.5-flash --prompt "Review this code" --files src/app.ts
`)
}

async function main() {
  const args = parseArgs()

  if (args.help) {
    showHelp()
    process.exit(0)
  }

  if (!args.taskType) {
    console.error('❌ Error: Task type is required')
    console.log('Run with --help for usage information')
    process.exit(1)
  }

  if (!args.prompt) {
    console.error('❌ Error: Prompt is required')
    console.log('Run with --help for usage information')
    process.exit(1)
  }

  console.log(`🚀 Delegating task: ${args.taskType}`)
  console.log(`📝 Prompt: ${args.prompt}`)
  if (args.files) {
    console.log(`📁 Files: ${args.files.join(', ')}`)
  }
  if (args.model) {
    console.log(`🤖 Model: ${args.model}`)
  }
  console.log()

  try {
    const result = await delegator.delegate({
      task: args.taskType,
      prompt: args.prompt,
      files: args.files,
      model: args.model,
      format: args.format || 'text'
    })

    if (result.success) {
      console.log(`✅ Success! (Model: ${result.model}, Client: ${result.client})`)
      console.log()
      console.log('━'.repeat(80))
      console.log(result.output)
      console.log('━'.repeat(80))

      if (result.parsed) {
        console.log()
        console.log('📊 Parsed Output:')
        console.log(JSON.stringify(result.parsed, null, 2))
      }
    } else {
      console.error('❌ Delegation failed')
      if (result.error) {
        console.error(`Error: ${result.error}`)
      }
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error)
    process.exit(1)
  }
}

main()
