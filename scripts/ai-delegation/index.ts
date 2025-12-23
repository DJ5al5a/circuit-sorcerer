/**
 * Multi-Model AI Delegation System
 * Public API exports
 */

export { Delegator, delegator } from './core/delegator'
export { ModelRouter } from './core/model-router'
export { OpenCodeClient } from './clients/opencode-client'
export { GeminiClient } from './clients/gemini-client'
export { DELEGATION_CONFIG } from './config'

export type {
  DelegateOptions,
  DelegationResult
} from './core/delegator'

export type {
  ModelSelection,
  SelectOptions
} from './core/model-router'

export type {
  TaskType,
  ClientType,
  ClientConfig,
  ModelCapability
} from './config'
