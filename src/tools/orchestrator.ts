import {orchestrateReverseTask} from '../reverse/ReverseTaskOrchestrator.js';
import {buildOrchestrationAgentHints} from '../reverse/ReverseTaskAgentProtocol.js';
import {zod} from '../third_party/index.js';

import {ToolCategory} from './categories.js';
import {defineTool} from './ToolDefinition.js';
import {getJSHookRuntime} from './runtime.js';

function inferBlockedBy(failureType: string | undefined): string | undefined {
  if (failureType === 'env_error') {
    return 'environment';
  }
  if (failureType === 'external_error') {
    return 'external_dependency';
  }
  if (failureType === 'validation_error') {
    return 'input_validation';
  }
  if (failureType === 'tool_error') {
    return 'tooling';
  }
  if (failureType === 'unknown') {
    return 'unknown';
  }
  return undefined;
}

function buildOrchestrationContinuationFields(result: {
  fallbackPlan?: {steps: Array<{tool: string; params: Record<string, unknown>}>; recommendedStrategy?: string};
  execution?: {failedStep?: {failureType?: string; retryable?: boolean; error?: string} | unknown; recovery?: {shouldResume?: boolean}};
  agentGuidance?: {summary?: string; recommendedTool?: string; recommendedParams?: Record<string, unknown>; recommendedStrategy?: string; resumeHint?: string};
}): {
  outcome: 'success' | 'partial' | 'blocked';
  shouldResume: boolean;
  shouldSwitchStrategy: boolean;
  nextBestTool?: string;
  nextBestParams?: Record<string, unknown>;
  errorCode?: string;
  errorType?: string;
  retryable?: boolean;
  blockedBy?: string;
  detailLevel: 'minimal' | 'standard';
  continuation: {
    ready: boolean;
    reason: string;
    tool?: string;
    params?: Record<string, unknown>;
    strategy?: string;
    resumeCommand?: string;
    actionKey?: string;
  };
} {
  const shouldResume = Boolean(result.execution?.recovery?.shouldResume);
  const nextStep = result.fallbackPlan?.steps[0];
  const failedStep = result.execution?.failedStep as {failureType?: string; retryable?: boolean; error?: string} | undefined;
  const outcome = result.execution?.failedStep
    ? (shouldResume ? 'partial' : 'blocked')
    : 'success';
  const nextBestTool = nextStep?.tool ?? result.agentGuidance?.recommendedTool;
  const nextBestParams = nextStep?.params ?? result.agentGuidance?.recommendedParams;
  return {
    outcome,
    shouldResume,
    shouldSwitchStrategy: Boolean(result.fallbackPlan?.recommendedStrategy),
    ...(nextBestTool ? {nextBestTool} : {}),
    ...(nextBestParams ? {nextBestParams} : {}),
    ...(failedStep?.failureType ? {errorCode: failedStep.failureType, errorType: failedStep.failureType} : {}),
    ...(failedStep?.retryable !== undefined ? {retryable: failedStep.retryable} : {}),
    ...(inferBlockedBy(failedStep?.failureType) ? {blockedBy: inferBlockedBy(failedStep?.failureType)} : {}),
    detailLevel: 'standard',
    continuation: {
      ready: outcome !== 'blocked',
      reason: result.agentGuidance?.summary ?? '已生成下一步编排建议。',
      ...(nextBestTool ? {tool: nextBestTool} : {}),
      ...(nextBestParams ? {params: nextBestParams} : {}),
      ...(result.fallbackPlan?.recommendedStrategy ?? result.agentGuidance?.recommendedStrategy
        ? {strategy: result.fallbackPlan?.recommendedStrategy ?? result.agentGuidance?.recommendedStrategy}
        : {}),
      ...(result.agentGuidance?.resumeHint ? {resumeCommand: result.agentGuidance.resumeHint} : {}),
      ...(nextBestTool ? {actionKey: nextBestTool} : {}),
    },
  };
}

export const orchestrateReverseTaskTool = defineTool({
  name: 'orchestrate_reverse_task',
  description: 'High-level reverse-task orchestrator that syncs task state, picks the primary next step, and returns a compact execution plan.',
  annotations: {category: ToolCategory.REVERSE_ENGINEERING, readOnlyHint: false},
  schema: {
    taskId: zod.string().min(1),
    persistState: zod.boolean().optional(),
    includeSummary: zod.boolean().optional(),
    execute: zod.boolean().optional(),
    resume: zod.boolean().optional(),
    stopOnError: zod.boolean().optional(),
    strategy: zod.enum(['observe-first', 'rebuild-first', 'env-fix', 'artifact-sync', 'evidence-only']).optional(),
    outputMode: zod.enum(['compact', 'verbose']).optional(),
    skipSteps: zod.array(zod.string()).optional(),
    fromStep: zod.string().optional(),
    onlySteps: zod.array(zod.string()).optional(),
    executionOverrides: zod.record(zod.string(), zod.object({
      status: zod.enum(['ok', 'error']),
      result: zod.string().optional(),
      error: zod.string().optional(),
    })).optional(),
  },
  handler: async (request, response) => {
    const runtime = getJSHookRuntime();
    const result = await orchestrateReverseTask(runtime.reverseTaskStore, request.params.taskId, {
      persistState: request.params.persistState,
      includeSummary: request.params.includeSummary,
      execute: request.params.execute,
      resume: request.params.resume,
      stopOnError: request.params.stopOnError,
      strategy: request.params.strategy,
      outputMode: request.params.outputMode,
      skipSteps: request.params.skipSteps,
      fromStep: request.params.fromStep,
      onlySteps: request.params.onlySteps,
      executionOverrides: request.params.executionOverrides,
    });
    response.appendResponseLine('```json');
    const agentGuidance = buildOrchestrationAgentHints({
      taskId: result.taskId,
      primaryStep: result.orchestration.primaryStep,
      execution: result.execution,
      confidence: result.advice.confidence,
    });
    response.appendResponseLine(JSON.stringify({
      ok: true,
      responseSummary: request.params.outputMode === 'compact'
        ? `已生成任务 ${result.taskId} 的 compact orchestration plan。`
        : `已生成任务 ${result.taskId} 的 orchestration plan。`,
      diagnostics: {
        responseStatus: 'ok',
        outputMode: result.outputMode,
        taskId: result.taskId,
        hasFallbackPlan: Boolean(result.fallbackPlan),
        executed: Boolean(result.execution?.executed),
      },
      ...buildOrchestrationContinuationFields({
        fallbackPlan: result.fallbackPlan,
        execution: result.execution,
        agentGuidance,
      }),
      ...result,
      agentGuidance,
    }, null, 2));
    response.appendResponseLine('```');
  },
});
