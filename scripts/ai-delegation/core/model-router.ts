/**
 * Model Router
 * Intelligently selects which AI model to use for each task
 */

import { DELEGATION_CONFIG, TaskType, ClientType } from '../config'

export interface ModelSelection {
  model: string
  client: ClientType
  reason: 'explicit' | 'task-optimized' | 'default'
}

export interface SelectOptions {
  model?: string  // Explicit model override
  preferredClient?: ClientType
}

export class ModelRouter {
  /**
   * Select the best model for a given task type
   */
  selectModel(taskType?: TaskType, options?: SelectOptions): ModelSelection {
    // 1. Explicit model override takes highest precedence
    if (options?.model) {
      const client = this.getClientForModel(options.model)
      return {
        model: options.model,
        client,
        reason: 'explicit'
      }
    }

    // 2. Task-based routing
    if (taskType && DELEGATION_CONFIG.routing[taskType]) {
      const model = DELEGATION_CONFIG.routing[taskType]
      const client = this.getClientForModel(model)
      return {
        model,
        client,
        reason: 'task-optimized'
      }
    }

    // 3. Client preference
    if (options?.preferredClient) {
      const model = DELEGATION_CONFIG.clients[options.preferredClient].defaultModel
      return {
        model,
        client: options.preferredClient,
        reason: 'default'
      }
    }

    // 4. Fallback to default model
    const defaultModel = DELEGATION_CONFIG.defaultModel
    const client = this.getClientForModel(defaultModel)
    return {
      model: defaultModel,
      client,
      reason: 'default'
    }
  }

  /**
   * Get the client type for a given model
   */
  private getClientForModel(model: string): ClientType {
    const capability = DELEGATION_CONFIG.modelCapabilities[model]
    if (capability) {
      return capability.client
    }

    // Fallback: guess based on model name
    if (model.startsWith('xai/') || model.includes('grok')) {
      return 'opencode'
    }
    if (model.startsWith('gemini') || model.includes('gemini')) {
      return 'gemini'
    }

    // Ultimate fallback
    return 'opencode'
  }

  /**
   * Get alternate client for fallback
   */
  getAlternateClient(client: ClientType): ClientType {
    return client === 'opencode' ? 'gemini' : 'opencode'
  }

  /**
   * Get model capabilities
   */
  getModelCapabilities(model: string) {
    return DELEGATION_CONFIG.modelCapabilities[model]
  }

  /**
   * List all available models
   */
  getAllModels(): string[] {
    return [
      ...DELEGATION_CONFIG.clients.opencode.availableModels,
      ...DELEGATION_CONFIG.clients.gemini.availableModels
    ]
  }
}
