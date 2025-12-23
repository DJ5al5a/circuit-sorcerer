/**
 * Gemini CLI Client
 * Wrapper for invoking Gemini CLI via subprocess
 */

import { spawn } from 'child_process'
import { readFile } from 'fs/promises'
import { DELEGATION_CONFIG } from '../config'

export interface GeminiRunOptions {
  message: string
  model?: string
  files?: string[]
  yolo?: boolean
  approvalMode?: 'default' | 'auto_edit' | 'yolo'
  outputFormat?: 'text' | 'json' | 'stream-json'
  resume?: string
  sandbox?: boolean
}

export interface RunResult {
  success: boolean
  output: string
  parsed?: any
  sessionId?: string
  error?: string
  model: string
}

export class GeminiClient {
  private readonly path: string
  private readonly defaultModel: string

  constructor() {
    this.path = DELEGATION_CONFIG.clients.gemini.path
    this.defaultModel = DELEGATION_CONFIG.clients.gemini.defaultModel
  }

  async run(options: GeminiRunOptions): Promise<RunResult> {
    const model = options.model || this.defaultModel

    // Embed file contents in prompt (Gemini doesn't support --file flag)
    const message = options.files && options.files.length > 0
      ? await this.embedFilesInPrompt(options.message, options.files)
      : options.message

    const args = this.buildArgs({ ...options, message }, model)

    try {
      const output = await this.execute(args)
      const parsed = options.outputFormat === 'json' ? this.tryParseJSON(output) : undefined

      return {
        success: true,
        output,
        parsed,
        model
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

  private async embedFilesInPrompt(prompt: string, files: string[]): Promise<string> {
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const content = await readFile(file, 'utf-8')
          return `\n\n--- File: ${file} ---\n${content}\n--- End of ${file} ---`
        } catch (error) {
          return `\n\n--- File: ${file} (Error reading: ${error}) ---`
        }
      })
    )

    return `${prompt}\n\nContext files:${fileContents.join('\n')}`
  }

  private buildArgs(options: GeminiRunOptions, model: string): string[] {
    const args: string[] = []

    // Model selection
    if (model) {
      args.push('-m', model)
    }

    // YOLO mode (auto-approve) - only add if explicitly true
    // Skip YOLO mode to avoid auth issues in delegation context
    if (options.yolo === true) {
      args.push('-y')
    }

    // Approval mode
    if (options.approvalMode && options.approvalMode !== 'default') {
      args.push('--approval-mode', options.approvalMode)
    }

    // Output format
    if (options.outputFormat && options.outputFormat !== 'text') {
      args.push('-o', options.outputFormat)
    }

    // Resume session
    if (options.resume) {
      args.push('-r', options.resume)
    }

    // Sandbox mode
    if (options.sandbox) {
      args.push('-s')
    }

    // Message - use -p flag for prompt
    args.push('-p', options.message)

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
          reject(new Error(`Gemini CLI exited with code ${code}: ${stderr}`))
        }
      })

      process.on('error', (error) => {
        reject(new Error(`Failed to spawn Gemini CLI: ${error.message}`))
      })
    })
  }

  private tryParseJSON(output: string): any {
    try {
      return JSON.parse(output)
    } catch {
      return undefined
    }
  }
}
