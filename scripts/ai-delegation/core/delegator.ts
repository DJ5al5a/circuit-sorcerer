/**
 * Unified Delegator
 * Core orchestrator for delegating tasks to OpenCode/Grok or Gemini
 */

import { OpenCodeClient } from '../clients/opencode-client'
import { GeminiClient } from '../clients/gemini-client'
import { ModelRouter } from './model-router'
import { DELEGATION_CONFIG, TaskType, ClientType } from '../config'

export interface DelegateOptions {
  prompt: string
  task?: TaskType
  model?: string
  files?: string[]
  format?: 'text' | 'json' | 'code' | 'markdown'
  context?: Record<string, any>
  background?: boolean
}

export interface DelegationResult {
  success: boolean
  output: string
  parsed?: any
  model: string
  client: ClientType
  error?: string
}

export class Delegator {
  private readonly opencodeClient: OpenCodeClient
  private readonly geminiClient: GeminiClient
  private readonly modelRouter: ModelRouter

  constructor() {
    this.opencodeClient = new OpenCodeClient()
    this.geminiClient = new GeminiClient()
    this.modelRouter = new ModelRouter()
  }

  /**
   * Delegate a task to the appropriate AI model
   * This is the PRIMARY interface for all delegations
   */
  async delegate(options: DelegateOptions): Promise<DelegationResult> {
    // 1. Select model (auto or explicit)
    const selection = this.modelRouter.selectModel(options.task, {
      model: options.model
    })

    if (DELEGATION_CONFIG.logging.enabled) {
      console.log(
        `[Delegator] Routing to ${selection.model} (${selection.client}) - Reason: ${selection.reason}`
      )
    }

    // 2. Route to appropriate client
    let result
    try {
      result = selection.client === 'opencode'
        ? await this.executeOpenCode(options, selection.model)
        : await this.executeGemini(options, selection.model)
    } catch (error) {
      // 3. Fallback if enabled
      if (DELEGATION_CONFIG.fallback.enabled && DELEGATION_CONFIG.fallback.onFailure === 'try-alternate-client') {
        const alternateClient = this.modelRouter.getAlternateClient(selection.client)
        const alternateModel = DELEGATION_CONFIG.clients[alternateClient].defaultModel

        console.warn(
          `[Delegator] ${selection.client} failed, trying alternate client: ${alternateClient}`
        )

        result = alternateClient === 'opencode'
          ? await this.executeOpenCode(options, alternateModel)
          : await this.executeGemini(options, alternateModel)

        return {
          ...result,
          model: alternateModel,
          client: alternateClient
        }
      }

      throw error
    }

    // 4. Return unified result
    return {
      ...result,
      model: selection.model,
      client: selection.client
    }
  }

  /**
   * Execute via OpenCode CLI (Grok)
   */
  private async executeOpenCode(
    options: DelegateOptions,
    model: string
  ): Promise<Omit<DelegationResult, 'model' | 'client'>> {
    const result = await this.opencodeClient.run({
      message: options.prompt,
      model,
      files: options.files,
      format: options.format === 'json' ? 'json' : 'default'
    })

    return {
      success: result.success,
      output: result.output,
      parsed: result.parsed,
      error: result.error
    }
  }

  /**
   * Execute via Gemini CLI
   */
  private async executeGemini(
    options: DelegateOptions,
    model: string
  ): Promise<Omit<DelegationResult, 'model' | 'client'>> {
    const result = await this.geminiClient.run({
      message: options.prompt,
      model,
      files: options.files,
      // Don't use YOLO mode - let Gemini CLI handle auth normally
      yolo: false,
      outputFormat: options.format === 'json' ? 'json' : 'text'
    })

    return {
      success: result.success,
      output: result.output,
      parsed: result.parsed,
      error: result.error
    }
  }

  /**
   * Run multiple delegations in parallel
   */
  async delegateParallel(tasks: DelegateOptions[]): Promise<DelegationResult[]> {
    return Promise.all(tasks.map(task => this.delegate(task)))
  }

  /**
   * Continue a session (multi-turn conversation)
   */
  async delegateSession(
    sessionId: string,
    message: string,
    client?: ClientType
  ): Promise<DelegationResult> {
    const selectedClient = client || 'opencode'
    const model = DELEGATION_CONFIG.clients[selectedClient].defaultModel

    if (selectedClient === 'opencode') {
      const result = await this.opencodeClient.run({
        message,
        session: sessionId,
        model
      })

      return {
        ...result,
        model,
        client: 'opencode'
      }
    } else {
      const result = await this.geminiClient.run({
        message,
        resume: sessionId,
        model
      })

      return {
        ...result,
        model,
        client: 'gemini'
      }
    }
  }
}

// Singleton instance for easy imports
export const delegator = new Delegator()
