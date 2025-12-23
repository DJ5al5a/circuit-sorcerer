/**
 * OpenCode CLI Client
 * Wrapper for invoking OpenCode via subprocess to run Grok models
 */

import { spawn } from 'child_process'
import { DELEGATION_CONFIG } from '../config'

export interface OpenCodeRunOptions {
  message: string
  model?: string
  files?: string[]
  format?: 'default' | 'json'
  session?: string
}

export interface RunResult {
  success: boolean
  output: string
  parsed?: any
  sessionId?: string
  error?: string
  model: string
}

export class OpenCodeClient {
  private readonly path: string
  private readonly defaultModel: string

  constructor() {
    this.path = DELEGATION_CONFIG.clients.opencode.path
    this.defaultModel = DELEGATION_CONFIG.clients.opencode.defaultModel
  }

  async run(options: OpenCodeRunOptions): Promise<RunResult> {
    const model = options.model || this.defaultModel
    const args = this.buildArgs(options, model)

    try {
      const output = await this.execute(args)
      return {
        success: true,
        output,
        model,
        sessionId: options.session
      }
    } catch (error) {
      return {
        success: false,
        output: '',
        error: error instanceof Error ? error.message : String(error),
        model
      }
    }
  }

  private buildArgs(options: OpenCodeRunOptions, model: string): string[] {
    const args: string[] = ['run']

    // Model selection
    if (model) {
      args.push('--model', model)
    }

    // File attachments (using -f short form)
    if (options.files && options.files.length > 0) {
      for (const file of options.files) {
        args.push('-f', file)
      }
    }

    // Session continuation
    if (options.session) {
      args.push('-s', options.session)
    }

    // Format
    if (options.format === 'json') {
      args.push('--format', 'json')
    }

    // Message as positional argument (comes last)
    args.push(options.message)

    return args
  }

  private execute(args: string[]): Promise<string> {
    return new Promise((resolve, reject) => {
      const process = spawn(this.path, args)
      let stdout = ''
      let stderr = ''

      process.stdout.on('data', (data) => {
        stdout += data.toString()
      })

      process.stderr.on('data', (data) => {
        stderr += data.toString()
      })

      process.on('close', (code) => {
        if (code === 0) {
          resolve(stdout)
        } else {
          reject(new Error(`OpenCode exited with code ${code}: ${stderr}`))
        }
      })

      process.on('error', (error) => {
        reject(new Error(`Failed to spawn OpenCode: ${error.message}`))
      })
    })
  }
}
