/**
 * Multi-Model AI Delegation Configuration
 * Configures OpenCode (Grok) and Gemini CLI for task delegation
 */

export type TaskType =
  | 'content.blog-post'
  | 'content.project-description'
  | 'content.documentation'
  | 'research.technology'
  | 'research.analysis'
  | 'research.quick'
  | 'testing.unit-tests'
  | 'testing.component-tests'
  | 'code.generation'
  | 'code.review'
  | 'reasoning.complex'

export type ClientType = 'opencode' | 'gemini'

export interface ClientConfig {
  path: string
  defaultModel: string
  availableModels: string[]
}

export interface ModelCapability {
  client: ClientType
  strengths: string[]
  costTier: 'very-low' | 'low' | 'medium' | 'high'
  features?: string[]
}

export const DELEGATION_CONFIG = {
  // Default model selection
  defaultModel: 'xai/grok-fast-1',

  // Client paths (assumes in PATH)
  clients: {
    opencode: {
      path: process.env.OPENCODE_PATH || 'opencode',
      defaultModel: 'xai/grok-fast-1',
      availableModels: ['xai/grok-fast-1', 'xai/grok-2']
    } as ClientConfig,
    gemini: {
      path: process.env.GEMINI_CLI_PATH || 'gemini',
      defaultModel: 'gemini-2.5-flash',
      availableModels: ['gemini-2.5-flash', 'gemini-2.5-flash-lite']
    } as ClientConfig
  },

  // Model capabilities matrix
  modelCapabilities: {
    'xai/grok-fast-1': {
      client: 'opencode' as ClientType,
      strengths: ['code-generation', 'technical-writing', 'speed', 'testing'],
      costTier: 'medium' as const
    },
    'gemini-2.5-flash': {
      client: 'gemini' as ClientType,
      strengths: ['reasoning', 'analysis', 'speed', 'large-context', 'caching'],
      costTier: 'low' as const,
      features: ['prompt-caching', 'fast-response']
    },
    'gemini-2.5-flash-lite': {
      client: 'gemini' as ClientType,
      strengths: ['ultra-fast', 'low-cost', 'simple-tasks'],
      costTier: 'very-low' as const,
      features: ['minimal-latency', 'cost-optimized']
    }
  } as Record<string, ModelCapability>,

  // Model routing rules (task type → model)
  routing: {
    'content.blog-post': 'xai/grok-fast-1',
    'content.project-description': 'xai/grok-fast-1',
    'content.documentation': 'xai/grok-fast-1',
    'research.technology': 'gemini-2.5-flash',
    'research.analysis': 'gemini-2.5-flash',
    'research.quick': 'gemini-2.5-flash-lite',
    'testing.unit-tests': 'xai/grok-fast-1',
    'testing.component-tests': 'xai/grok-fast-1',
    'code.generation': 'xai/grok-fast-1',
    'code.review': 'gemini-2.5-flash',
    'reasoning.complex': 'gemini-2.5-flash'
  } as Record<TaskType, string>,

  // General settings
  outputDir: process.env.AI_DELEGATION_OUTPUT_DIR || '.ai-generated',

  logging: {
    enabled: true,
    level: (process.env.AI_DELEGATION_LOG_LEVEL || 'info') as 'debug' | 'info' | 'warn' | 'error'
  },

  retry: {
    maxAttempts: 3,
    backoffMs: 1000
  },

  // Fallback strategy
  fallback: {
    enabled: true,
    onFailure: 'try-alternate-client' as 'try-alternate-client' | 'fail'
  }
} as const

export type DelegationConfig = typeof DELEGATION_CONFIG
