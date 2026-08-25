// GENERATED from Grok Bot 0.24.0 shipped-bundle atlases — do not hand-edit.
// Regenerate: npm run gen:contracts (requires local artifact cache)
// Every name below is string-proven in the shipped bundles. Presence is
// capability evidence only; behavioural semantics live in docs/subsystems/.

export interface ServiceMethod {
  readonly rpcName: string;
  readonly kind: "Unary" | "ServerStreaming" | "ClientStreaming" | "BiDiStreaming";
}

export interface ProtoService {
  readonly service: string;
  readonly bundle: string;
  readonly methods: Readonly<Record<string, ServiceMethod>>;
}

/** ConnectRPC service tables recovered from shipped bundles (17 services, 2244 methods). */
export const SERVICES: readonly ProtoService[] = [
  {
    "service": "agent.v1.AgentService",
    "bundle": "host-main.cjs",
    "methods": {
      "run": {
        "rpcName": "Run",
        "kind": "BiDiStreaming"
      },
      "runSSE": {
        "rpcName": "RunSSE",
        "kind": "ServerStreaming"
      },
      "runPoll": {
        "rpcName": "RunPoll",
        "kind": "ServerStreaming"
      },
      "nameAgent": {
        "rpcName": "NameAgent",
        "kind": "Unary"
      },
      "updateConversationMetadata": {
        "rpcName": "UpdateConversationMetadata",
        "kind": "Unary"
      },
      "createTranscriptOverview": {
        "rpcName": "CreateTranscriptOverview",
        "kind": "Unary"
      },
      "getUsableModels": {
        "rpcName": "GetUsableModels",
        "kind": "Unary"
      },
      "getDefaultModelForCli": {
        "rpcName": "GetDefaultModelForCli",
        "kind": "Unary"
      },
      "getAllowedModelIntents": {
        "rpcName": "GetAllowedModelIntents",
        "kind": "Unary"
      },
      "uploadConversationBlobs": {
        "rpcName": "UploadConversationBlobs",
        "kind": "Unary"
      },
      "uploadLocalAgentRunToPromptQuality": {
        "rpcName": "UploadLocalAgentRunToPromptQuality",
        "kind": "Unary"
      },
      "getSignedUrlForAttachedMedia": {
        "rpcName": "GetSignedUrlForAttachedMedia",
        "kind": "Unary"
      },
      "notifyConversationClone": {
        "rpcName": "NotifyConversationClone",
        "kind": "Unary"
      },
      "getNewChatNudgeLegacyModelPicker": {
        "rpcName": "GetNewChatNudgeLegacyModelPicker",
        "kind": "Unary"
      },
      "getNewChatNudgeParameterizedModelPicker": {
        "rpcName": "GetNewChatNudgeParameterizedModelPicker",
        "kind": "Unary"
      },
      "getPromptContextUsage": {
        "rpcName": "GetPromptContextUsage",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "agent.v1.ControlService",
    "bundle": "host-main.cjs",
    "methods": {
      "ping": {
        "rpcName": "Ping",
        "kind": "Unary"
      },
      "getCapabilities": {
        "rpcName": "GetCapabilities",
        "kind": "Unary"
      },
      "exec": {
        "rpcName": "Exec",
        "kind": "ServerStreaming"
      },
      "listDirectory": {
        "rpcName": "ListDirectory",
        "kind": "Unary"
      },
      "readTextFile": {
        "rpcName": "ReadTextFile",
        "kind": "Unary"
      },
      "writeTextFile": {
        "rpcName": "WriteTextFile",
        "kind": "Unary"
      },
      "readBinaryFile": {
        "rpcName": "ReadBinaryFile",
        "kind": "Unary"
      },
      "writeBinaryFile": {
        "rpcName": "WriteBinaryFile",
        "kind": "Unary"
      },
      "exportFile": {
        "rpcName": "ExportFile",
        "kind": "ServerStreaming"
      },
      "getDiff": {
        "rpcName": "GetDiff",
        "kind": "Unary"
      },
      "batchGetDiff": {
        "rpcName": "BatchGetDiff",
        "kind": "Unary"
      },
      "getWorkspaceChangesHash": {
        "rpcName": "GetWorkspaceChangesHash",
        "kind": "Unary"
      },
      "refreshGithubAccessToken": {
        "rpcName": "RefreshGithubAccessToken",
        "kind": "Unary"
      },
      "warmRemoteAccessServer": {
        "rpcName": "WarmRemoteAccessServer",
        "kind": "Unary"
      },
      "listArtifacts": {
        "rpcName": "ListArtifacts",
        "kind": "Unary"
      },
      "uploadArtifacts": {
        "rpcName": "UploadArtifacts",
        "kind": "Unary"
      },
      "persistArtifactsToAgentStore": {
        "rpcName": "PersistArtifactsToAgentStore",
        "kind": "Unary"
      },
      "persistArtifactsToParentStore": {
        "rpcName": "PersistArtifactsToParentStore",
        "kind": "Unary"
      },
      "restoreArtifacts": {
        "rpcName": "RestoreArtifacts",
        "kind": "Unary"
      },
      "getMcpRefreshTokens": {
        "rpcName": "GetMcpRefreshTokens",
        "kind": "Unary"
      },
      "downloadCursorServer": {
        "rpcName": "DownloadCursorServer",
        "kind": "Unary"
      },
      "updateEnvironmentVariables": {
        "rpcName": "UpdateEnvironmentVariables",
        "kind": "Unary"
      },
      "reloadAgentSkills": {
        "rpcName": "ReloadAgentSkills",
        "kind": "Unary"
      },
      "reloadPlugins": {
        "rpcName": "ReloadPlugins",
        "kind": "Unary"
      },
      "installPluginArtifact": {
        "rpcName": "InstallPluginArtifact",
        "kind": "Unary"
      },
      "loadMcpServers": {
        "rpcName": "LoadMcpServers",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "agent.v1.ExecService",
    "bundle": "host-main.cjs",
    "methods": {
      "exec": {
        "rpcName": "Exec",
        "kind": "ServerStreaming"
      }
    }
  },
  {
    "service": "aiserver.v1.AiService",
    "bundle": "electron-main.cjs",
    "methods": {
      "serverTime": {
        "rpcName": "ServerTime",
        "kind": "Unary"
      },
      "healthCheck": {
        "rpcName": "HealthCheck",
        "kind": "Unary"
      },
      "privacyCheck": {
        "rpcName": "PrivacyCheck",
        "kind": "Unary"
      },
      "timeLeftHealthCheck": {
        "rpcName": "TimeLeftHealthCheck",
        "kind": "Unary"
      },
      "throwErrorCheck": {
        "rpcName": "ThrowErrorCheck",
        "kind": "Unary"
      },
      "availableModels": {
        "rpcName": "AvailableModels",
        "kind": "Unary"
      },
      "streamChatTryReallyHard": {
        "rpcName": "StreamChatTryReallyHard",
        "kind": "ServerStreaming"
      },
      "rerankDocuments": {
        "rpcName": "RerankDocuments",
        "kind": "Unary"
      },
      "streamComposer": {
        "rpcName": "StreamComposer",
        "kind": "ServerStreaming"
      },
      "streamComposerContext": {
        "rpcName": "StreamComposerContext",
        "kind": "ServerStreaming"
      },
      "warmComposerCache": {
        "rpcName": "WarmComposerCache",
        "kind": "Unary"
      },
      "keepComposerCacheWarm": {
        "rpcName": "KeepComposerCacheWarm",
        "kind": "Unary"
      },
      "countTokens": {
        "rpcName": "CountTokens",
        "kind": "Unary"
      },
      "streamPotentialLocs": {
        "rpcName": "StreamPotentialLocs",
        "kind": "ServerStreaming"
      },
      "streamPotentialLocsUnderneath": {
        "rpcName": "StreamPotentialLocsUnderneath",
        "kind": "ServerStreaming"
      },
      "streamPotentialLocsInitialQueries": {
        "rpcName": "StreamPotentialLocsInitialQueries",
        "kind": "ServerStreaming"
      },
      "getChatTitle": {
        "rpcName": "GetChatTitle",
        "kind": "Unary"
      },
      "getCompletion": {
        "rpcName": "GetCompletion",
        "kind": "Unary"
      },
      "isolatedTreesitter": {
        "rpcName": "IsolatedTreesitter",
        "kind": "Unary"
      },
      "getSimplePrompt": {
        "rpcName": "GetSimplePrompt",
        "kind": "Unary"
      },
      "getPassthroughPrompt": {
        "rpcName": "GetPassthroughPrompt",
        "kind": "Unary"
      },
      "suggestQuickActions": {
        "rpcName": "SuggestQuickActions",
        "kind": "Unary"
      },
      "checkLongFilesFit": {
        "rpcName": "CheckLongFilesFit",
        "kind": "Unary"
      },
      "getEvaluationPrompt": {
        "rpcName": "GetEvaluationPrompt",
        "kind": "Unary"
      },
      "getUserInfo": {
        "rpcName": "GetUserInfo",
        "kind": "Unary"
      },
      "streamChat": {
        "rpcName": "StreamChat",
        "kind": "ServerStreaming"
      },
      "streamChatWeb": {
        "rpcName": "StreamChatWeb",
        "kind": "ServerStreaming"
      },
      "warmChatCache": {
        "rpcName": "WarmChatCache",
        "kind": "Unary"
      },
      "streamEdit": {
        "rpcName": "StreamEdit",
        "kind": "ServerStreaming"
      },
      "preloadEdit": {
        "rpcName": "PreloadEdit",
        "kind": "Unary"
      },
      "streamFastEdit": {
        "rpcName": "StreamFastEdit",
        "kind": "ServerStreaming"
      },
      "streamGenerate": {
        "rpcName": "StreamGenerate",
        "kind": "ServerStreaming"
      },
      "streamInlineLongCompletion": {
        "rpcName": "StreamInlineLongCompletion",
        "kind": "ServerStreaming"
      },
      "slashEdit": {
        "rpcName": "SlashEdit",
        "kind": "ServerStreaming"
      },
      "slashEditFollowUpWithPreviousEdits": {
        "rpcName": "SlashEditFollowUpWithPreviousEdits",
        "kind": "ServerStreaming"
      },
      "streamAiPreviews": {
        "rpcName": "StreamAiPreviews",
        "kind": "ServerStreaming"
      },
      "shouldTurnOnCppOnboarding": {
        "rpcName": "ShouldTurnOnCppOnboarding",
        "kind": "Unary"
      },
      "getComposerAutocomplete": {
        "rpcName": "GetComposerAutocomplete",
        "kind": "Unary"
      },
      "streamReview": {
        "rpcName": "StreamReview",
        "kind": "ServerStreaming"
      },
      "streamReviewChat": {
        "rpcName": "StreamReviewChat",
        "kind": "ServerStreaming"
      },
      "checkQueuePosition": {
        "rpcName": "CheckQueuePosition",
        "kind": "Unary"
      },
      "checkUsageBasedPrice": {
        "rpcName": "CheckUsageBasedPrice",
        "kind": "Unary"
      },
      "doThisForMeCheck": {
        "rpcName": "DoThisForMeCheck",
        "kind": "Unary"
      },
      "streamDoThisForMe": {
        "rpcName": "StreamDoThisForMe",
        "kind": "ServerStreaming"
      },
      "streamChatToolformer": {
        "rpcName": "StreamChatToolformer",
        "kind": "ServerStreaming"
      },
      "streamChatToolformerContinue": {
        "rpcName": "StreamChatToolformerContinue",
        "kind": "ServerStreaming"
      },
      "pushAiThought": {
        "rpcName": "PushAiThought",
        "kind": "Unary"
      },
      "checkDoableAsTask": {
        "rpcName": "CheckDoableAsTask",
        "kind": "Unary"
      },
      "reportGroundTruthCandidate": {
        "rpcName": "ReportGroundTruthCandidate",
        "kind": "Unary"
      },
      "reportCmdKFate": {
        "rpcName": "ReportCmdKFate",
        "kind": "Unary"
      },
      "showWelcomeScreen": {
        "rpcName": "ShowWelcomeScreen",
        "kind": "Unary"
      },
      "interfaceAgentInit": {
        "rpcName": "InterfaceAgentInit",
        "kind": "Unary"
      },
      "streamInterfaceAgentStatus": {
        "rpcName": "StreamInterfaceAgentStatus",
        "kind": "ServerStreaming"
      },
      "taskGetInterfaceAgentStatus": {
        "rpcName": "TaskGetInterfaceAgentStatus",
        "kind": "ServerStreaming"
      },
      "updateVscodeProfile": {
        "rpcName": "UpdateVscodeProfile",
        "kind": "Unary"
      },
      "taskInit": {
        "rpcName": "TaskInit",
        "kind": "Unary"
      },
      "taskPause": {
        "rpcName": "TaskPause",
        "kind": "Unary"
      },
      "taskInfo": {
        "rpcName": "TaskInfo",
        "kind": "Unary"
      },
      "taskStreamLog": {
        "rpcName": "TaskStreamLog",
        "kind": "ServerStreaming"
      },
      "taskSendMessage": {
        "rpcName": "TaskSendMessage",
        "kind": "Unary"
      },
      "taskProvideResult": {
        "rpcName": "TaskProvideResult",
        "kind": "Unary"
      },
      "createExperimentalIndex": {
        "rpcName": "CreateExperimentalIndex",
        "kind": "Unary"
      },
      "listExperimentalIndexFiles": {
        "rpcName": "ListExperimentalIndexFiles",
        "kind": "Unary"
      },
      "listenExperimentalIndex": {
        "rpcName": "ListenExperimentalIndex",
        "kind": "ServerStreaming"
      },
      "registerFileToIndex": {
        "rpcName": "RegisterFileToIndex",
        "kind": "Unary"
      },
      "setupIndexDependencies": {
        "rpcName": "SetupIndexDependencies",
        "kind": "Unary"
      },
      "computeIndexTopoSort": {
        "rpcName": "ComputeIndexTopoSort",
        "kind": "Unary"
      },
      "streamChatDeepContext": {
        "rpcName": "StreamChatDeepContext",
        "kind": "ServerStreaming"
      },
      "chooseCodeReferences": {
        "rpcName": "ChooseCodeReferences",
        "kind": "Unary"
      },
      "registerCodeReferences": {
        "rpcName": "RegisterCodeReferences",
        "kind": "Unary"
      },
      "extractPaths": {
        "rpcName": "ExtractPaths",
        "kind": "Unary"
      },
      "summarizeWithReferences": {
        "rpcName": "SummarizeWithReferences",
        "kind": "Unary"
      },
      "documentationQuery": {
        "rpcName": "DocumentationQuery",
        "kind": "Unary"
      },
      "availableDocs": {
        "rpcName": "AvailableDocs",
        "kind": "Unary"
      },
      "runWebSearch": {
        "rpcName": "RunWebSearch",
        "kind": "Unary"
      },
      "runWebFetch": {
        "rpcName": "RunWebFetch",
        "kind": "Unary"
      },
      "runGenerateImage": {
        "rpcName": "RunGenerateImage",
        "kind": "Unary"
      },
      "reportFeedback": {
        "rpcName": "ReportFeedback",
        "kind": "Unary"
      },
      "reportBug": {
        "rpcName": "ReportBug",
        "kind": "Unary"
      },
      "streamChatContext": {
        "rpcName": "StreamChatContext",
        "kind": "ServerStreaming"
      },
      "generateTldr": {
        "rpcName": "GenerateTldr",
        "kind": "Unary"
      },
      "taskStreamChatContext": {
        "rpcName": "TaskStreamChatContext",
        "kind": "ServerStreaming"
      },
      "rerankResults": {
        "rpcName": "RerankResults",
        "kind": "Unary"
      },
      "modelQuery": {
        "rpcName": "ModelQuery",
        "kind": "Unary"
      },
      "intentPrediction": {
        "rpcName": "IntentPrediction",
        "kind": "Unary"
      },
      "getChatSuggestions": {
        "rpcName": "GetChatSuggestions",
        "kind": "Unary"
      },
      "getUserInstructions": {
        "rpcName": "GetUserInstructions",
        "kind": "Unary"
      },
      "streamCursorTutor": {
        "rpcName": "StreamCursorTutor",
        "kind": "ServerStreaming"
      },
      "checkFeatureStatus": {
        "rpcName": "CheckFeatureStatus",
        "kind": "Unary"
      },
      "checkFeaturesStatus": {
        "rpcName": "CheckFeaturesStatus",
        "kind": "Unary"
      },
      "checkFeatureStatusUnauthenticated": {
        "rpcName": "CheckFeatureStatusUnauthenticated",
        "kind": "Unary"
      },
      "getEffectiveTokenLimit": {
        "rpcName": "GetEffectiveTokenLimit",
        "kind": "Unary"
      },
      "getContextScores": {
        "rpcName": "GetContextScores",
        "kind": "Unary"
      },
      "streamCpp": {
        "rpcName": "StreamCpp",
        "kind": "ServerStreaming"
      },
      "cppConfig": {
        "rpcName": "CppConfig",
        "kind": "Unary"
      },
      "cppEditHistoryStatus": {
        "rpcName": "CppEditHistoryStatus",
        "kind": "Unary"
      },
      "cppAppend": {
        "rpcName": "CppAppend",
        "kind": "Unary"
      },
      "refreshTabContext": {
        "rpcName": "RefreshTabContext",
        "kind": "Unary"
      },
      "checkNumberConfig": {
        "rpcName": "CheckNumberConfig",
        "kind": "Unary"
      },
      "checkNumberConfigUnauthenticated": {
        "rpcName": "CheckNumberConfigUnauthenticated",
        "kind": "Unary"
      },
      "checkNumberConfigs": {
        "rpcName": "CheckNumberConfigs",
        "kind": "Unary"
      },
      "streamTerminalAutocomplete": {
        "rpcName": "StreamTerminalAutocomplete",
        "kind": "ServerStreaming"
      },
      "streamPseudocodeGenerator": {
        "rpcName": "StreamPseudocodeGenerator",
        "kind": "ServerStreaming"
      },
      "streamPseudocodeMapper": {
        "rpcName": "StreamPseudocodeMapper",
        "kind": "ServerStreaming"
      },
      "acknowledgeGracePeriodDisclaimer": {
        "rpcName": "AcknowledgeGracePeriodDisclaimer",
        "kind": "Unary"
      },
      "streamAiLintBug": {
        "rpcName": "StreamAiLintBug",
        "kind": "ServerStreaming"
      },
      "streamAiCursorHelp": {
        "rpcName": "StreamAiCursorHelp",
        "kind": "ServerStreaming"
      },
      "logUserLintReply": {
        "rpcName": "LogUserLintReply",
        "kind": "Unary"
      },
      "logLinterExplicitUserFeedback": {
        "rpcName": "LogLinterExplicitUserFeedback",
        "kind": "Unary"
      },
      "streamFixMarkers": {
        "rpcName": "StreamFixMarkers",
        "kind": "ServerStreaming"
      },
      "reportInlineAction": {
        "rpcName": "ReportInlineAction",
        "kind": "Unary"
      },
      "streamPriomptPrompt": {
        "rpcName": "StreamPriomptPrompt",
        "kind": "ServerStreaming"
      },
      "streamLint": {
        "rpcName": "StreamLint",
        "kind": "ServerStreaming"
      },
      "streamNewLintRule": {
        "rpcName": "StreamNewLintRule",
        "kind": "ServerStreaming"
      },
      "aiProject": {
        "rpcName": "AiProject",
        "kind": "ServerStreaming"
      },
      "toCamelCase": {
        "rpcName": "ToCamelCase",
        "kind": "Unary"
      },
      "reportGenerationFeedback": {
        "rpcName": "ReportGenerationFeedback",
        "kind": "Unary"
      },
      "reportAgentFeedback": {
        "rpcName": "ReportAgentFeedback",
        "kind": "Unary"
      },
      "reportAgentMessageFeedback": {
        "rpcName": "ReportAgentMessageFeedback",
        "kind": "Unary"
      },
      "reportAutoRoutingResultFeedback": {
        "rpcName": "ReportAutoRoutingResultFeedback",
        "kind": "Unary"
      },
      "getThoughtAnnotation": {
        "rpcName": "GetThoughtAnnotation",
        "kind": "Unary"
      },
      "streamNextCursorPrediction": {
        "rpcName": "StreamNextCursorPrediction",
        "kind": "ServerStreaming"
      },
      "isCursorPredictionEnabled": {
        "rpcName": "IsCursorPredictionEnabled",
        "kind": "Unary"
      },
      "getCppEditClassification": {
        "rpcName": "GetCppEditClassification",
        "kind": "Unary"
      },
      "getTerminalCompletion": {
        "rpcName": "GetTerminalCompletion",
        "kind": "Unary"
      },
      "takeNotesOnCommitDiff": {
        "rpcName": "TakeNotesOnCommitDiff",
        "kind": "Unary"
      },
      "bulkEmbed": {
        "rpcName": "BulkEmbed",
        "kind": "Unary"
      },
      "backgroundCmdKEval": {
        "rpcName": "BackgroundCmdKEval",
        "kind": "ServerStreaming"
      },
      "backgroundCmdK": {
        "rpcName": "BackgroundCmdK",
        "kind": "ServerStreaming"
      },
      "calculateAutoSelection": {
        "rpcName": "CalculateAutoSelection",
        "kind": "Unary"
      },
      "getAtSymbolSuggestions": {
        "rpcName": "GetAtSymbolSuggestions",
        "kind": "Unary"
      },
      "getCodebaseQuestions": {
        "rpcName": "GetCodebaseQuestions",
        "kind": "Unary"
      },
      "cppEditHistoryAppend": {
        "rpcName": "CppEditHistoryAppend",
        "kind": "Unary"
      },
      "devOnlyGetPastRequestIds": {
        "rpcName": "DevOnlyGetPastRequestIds",
        "kind": "Unary"
      },
      "getFilesForComposer": {
        "rpcName": "GetFilesForComposer",
        "kind": "Unary"
      },
      "tryParseTypeScriptTreeSitter": {
        "rpcName": "TryParseTypeScriptTreeSitter",
        "kind": "Unary"
      },
      "nameTab": {
        "rpcName": "NameTab",
        "kind": "Unary"
      },
      "testModelStatus": {
        "rpcName": "TestModelStatus",
        "kind": "Unary"
      },
      "findBugs": {
        "rpcName": "FindBugs",
        "kind": "Unary"
      },
      "contextReranking": {
        "rpcName": "ContextReranking",
        "kind": "Unary"
      },
      "autoContext": {
        "rpcName": "AutoContext",
        "kind": "Unary"
      },
      "writeGitCommitMessage": {
        "rpcName": "WriteGitCommitMessage",
        "kind": "Unary"
      },
      "writeGitBranchName": {
        "rpcName": "WriteGitBranchName",
        "kind": "Unary"
      },
      "streamBugBot": {
        "rpcName": "StreamBugBot",
        "kind": "ServerStreaming"
      },
      "streamBugBotAgentic": {
        "rpcName": "StreamBugBotAgentic",
        "kind": "BiDiStreaming"
      },
      "streamBugBotAgenticSSE": {
        "rpcName": "StreamBugBotAgenticSSE",
        "kind": "ServerStreaming"
      },
      "streamBugBotAgenticPoll": {
        "rpcName": "StreamBugBotAgenticPoll",
        "kind": "ServerStreaming"
      },
      "streamUiBestOfNJudge": {
        "rpcName": "StreamUiBestOfNJudge",
        "kind": "BiDiStreaming"
      },
      "streamUiBestOfNJudgeSSE": {
        "rpcName": "StreamUiBestOfNJudgeSSE",
        "kind": "ServerStreaming"
      },
      "streamUiBestOfNJudgePoll": {
        "rpcName": "StreamUiBestOfNJudgePoll",
        "kind": "ServerStreaming"
      },
      "checkBugBotPrice": {
        "rpcName": "CheckBugBotPrice",
        "kind": "Unary"
      },
      "checkBugBotTelemetryHealthy": {
        "rpcName": "CheckBugBotTelemetryHealthy",
        "kind": "Unary"
      },
      "recordIdeBugReaction": {
        "rpcName": "RecordIdeBugReaction",
        "kind": "Unary"
      },
      "getSuggestedBugBotIterations": {
        "rpcName": "GetSuggestedBugBotIterations",
        "kind": "Unary"
      },
      "getEditorBugbotAutoRunStatus": {
        "rpcName": "GetEditorBugbotAutoRunStatus",
        "kind": "Unary"
      },
      "testBidi": {
        "rpcName": "TestBidi",
        "kind": "BiDiStreaming"
      },
      "streamDiffReview": {
        "rpcName": "StreamDiffReview",
        "kind": "ServerStreaming"
      },
      "streamDiffReviewByFile": {
        "rpcName": "StreamDiffReviewByFile",
        "kind": "ServerStreaming"
      },
      "getModelLabels": {
        "rpcName": "GetModelLabels",
        "kind": "Unary"
      },
      "getLastDefaultModelNudge": {
        "rpcName": "GetLastDefaultModelNudge",
        "kind": "Unary"
      },
      "getDefaultModelNudgeData": {
        "rpcName": "GetDefaultModelNudgeData",
        "kind": "Unary"
      },
      "getDefaultModel": {
        "rpcName": "GetDefaultModel",
        "kind": "Unary"
      },
      "reportCommitAiAnalytics": {
        "rpcName": "ReportCommitAiAnalytics",
        "kind": "Unary"
      },
      "testBedrockCredentials": {
        "rpcName": "TestBedrockCredentials",
        "kind": "Unary"
      },
      "reportAiCodeChangeMetrics": {
        "rpcName": "ReportAiCodeChangeMetrics",
        "kind": "Unary"
      },
      "reportProcessMetrics": {
        "rpcName": "ReportProcessMetrics",
        "kind": "Unary"
      },
      "reportSandProcessMetrics": {
        "rpcName": "ReportSandProcessMetrics",
        "kind": "Unary"
      },
      "reportClientNumericMetrics": {
        "rpcName": "ReportClientNumericMetrics",
        "kind": "Unary"
      },
      "potentiallyGenerateMemory": {
        "rpcName": "PotentiallyGenerateMemory",
        "kind": "Unary"
      },
      "knowledgeBaseAdd": {
        "rpcName": "KnowledgeBaseAdd",
        "kind": "Unary"
      },
      "knowledgeBaseList": {
        "rpcName": "KnowledgeBaseList",
        "kind": "Unary"
      },
      "knowledgeBaseRemove": {
        "rpcName": "KnowledgeBaseRemove",
        "kind": "Unary"
      },
      "knowledgeBaseUpdate": {
        "rpcName": "KnowledgeBaseUpdate",
        "kind": "Unary"
      },
      "fetchRelevantKnowledgeForConversation": {
        "rpcName": "FetchRelevantKnowledgeForConversation",
        "kind": "Unary"
      },
      "inferBackgroundComposerScripts": {
        "rpcName": "InferBackgroundComposerScripts",
        "kind": "Unary"
      },
      "getBackgroundComposerFeedbackLink": {
        "rpcName": "GetBackgroundComposerFeedbackLink",
        "kind": "Unary"
      },
      "getUsableModels": {
        "rpcName": "GetUsableModels",
        "kind": "Unary"
      },
      "getDefaultModelForCli": {
        "rpcName": "GetDefaultModelForCli",
        "kind": "Unary"
      },
      "streamComposerEnhancer": {
        "rpcName": "StreamComposerEnhancer",
        "kind": "BiDiStreaming"
      },
      "streamComposerEnhancerSSE": {
        "rpcName": "StreamComposerEnhancerSSE",
        "kind": "ServerStreaming"
      },
      "streamComposerEnhancerPoll": {
        "rpcName": "StreamComposerEnhancerPoll",
        "kind": "ServerStreaming"
      },
      "streamStt": {
        "rpcName": "StreamStt",
        "kind": "BiDiStreaming"
      },
      "streamSttSSE": {
        "rpcName": "StreamSttSSE",
        "kind": "ServerStreaming"
      },
      "streamSttPoll": {
        "rpcName": "StreamSttPoll",
        "kind": "ServerStreaming"
      },
      "transcribeAudio": {
        "rpcName": "TranscribeAudio",
        "kind": "Unary"
      },
      "nameAgent": {
        "rpcName": "NameAgent",
        "kind": "Unary"
      },
      "evaluatePromptHook": {
        "rpcName": "EvaluatePromptHook",
        "kind": "Unary"
      },
      "getCloudSetupBlockers": {
        "rpcName": "GetCloudSetupBlockers",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.AiService",
    "bundle": "host-main.cjs",
    "methods": {
      "serverTime": {
        "rpcName": "ServerTime",
        "kind": "Unary"
      },
      "healthCheck": {
        "rpcName": "HealthCheck",
        "kind": "Unary"
      },
      "privacyCheck": {
        "rpcName": "PrivacyCheck",
        "kind": "Unary"
      },
      "timeLeftHealthCheck": {
        "rpcName": "TimeLeftHealthCheck",
        "kind": "Unary"
      },
      "throwErrorCheck": {
        "rpcName": "ThrowErrorCheck",
        "kind": "Unary"
      },
      "availableModels": {
        "rpcName": "AvailableModels",
        "kind": "Unary"
      },
      "streamChatTryReallyHard": {
        "rpcName": "StreamChatTryReallyHard",
        "kind": "ServerStreaming"
      },
      "rerankDocuments": {
        "rpcName": "RerankDocuments",
        "kind": "Unary"
      },
      "streamComposer": {
        "rpcName": "StreamComposer",
        "kind": "ServerStreaming"
      },
      "streamComposerContext": {
        "rpcName": "StreamComposerContext",
        "kind": "ServerStreaming"
      },
      "warmComposerCache": {
        "rpcName": "WarmComposerCache",
        "kind": "Unary"
      },
      "keepComposerCacheWarm": {
        "rpcName": "KeepComposerCacheWarm",
        "kind": "Unary"
      },
      "countTokens": {
        "rpcName": "CountTokens",
        "kind": "Unary"
      },
      "streamPotentialLocs": {
        "rpcName": "StreamPotentialLocs",
        "kind": "ServerStreaming"
      },
      "streamPotentialLocsUnderneath": {
        "rpcName": "StreamPotentialLocsUnderneath",
        "kind": "ServerStreaming"
      },
      "streamPotentialLocsInitialQueries": {
        "rpcName": "StreamPotentialLocsInitialQueries",
        "kind": "ServerStreaming"
      },
      "getChatTitle": {
        "rpcName": "GetChatTitle",
        "kind": "Unary"
      },
      "getCompletion": {
        "rpcName": "GetCompletion",
        "kind": "Unary"
      },
      "isolatedTreesitter": {
        "rpcName": "IsolatedTreesitter",
        "kind": "Unary"
      },
      "getSimplePrompt": {
        "rpcName": "GetSimplePrompt",
        "kind": "Unary"
      },
      "getPassthroughPrompt": {
        "rpcName": "GetPassthroughPrompt",
        "kind": "Unary"
      },
      "suggestQuickActions": {
        "rpcName": "SuggestQuickActions",
        "kind": "Unary"
      },
      "checkLongFilesFit": {
        "rpcName": "CheckLongFilesFit",
        "kind": "Unary"
      },
      "getEvaluationPrompt": {
        "rpcName": "GetEvaluationPrompt",
        "kind": "Unary"
      },
      "getUserInfo": {
        "rpcName": "GetUserInfo",
        "kind": "Unary"
      },
      "streamChat": {
        "rpcName": "StreamChat",
        "kind": "ServerStreaming"
      },
      "streamChatWeb": {
        "rpcName": "StreamChatWeb",
        "kind": "ServerStreaming"
      },
      "warmChatCache": {
        "rpcName": "WarmChatCache",
        "kind": "Unary"
      },
      "streamEdit": {
        "rpcName": "StreamEdit",
        "kind": "ServerStreaming"
      },
      "preloadEdit": {
        "rpcName": "PreloadEdit",
        "kind": "Unary"
      },
      "streamFastEdit": {
        "rpcName": "StreamFastEdit",
        "kind": "ServerStreaming"
      },
      "streamGenerate": {
        "rpcName": "StreamGenerate",
        "kind": "ServerStreaming"
      },
      "streamInlineLongCompletion": {
        "rpcName": "StreamInlineLongCompletion",
        "kind": "ServerStreaming"
      },
      "slashEdit": {
        "rpcName": "SlashEdit",
        "kind": "ServerStreaming"
      },
      "slashEditFollowUpWithPreviousEdits": {
        "rpcName": "SlashEditFollowUpWithPreviousEdits",
        "kind": "ServerStreaming"
      },
      "streamAiPreviews": {
        "rpcName": "StreamAiPreviews",
        "kind": "ServerStreaming"
      },
      "shouldTurnOnCppOnboarding": {
        "rpcName": "ShouldTurnOnCppOnboarding",
        "kind": "Unary"
      },
      "getComposerAutocomplete": {
        "rpcName": "GetComposerAutocomplete",
        "kind": "Unary"
      },
      "streamReview": {
        "rpcName": "StreamReview",
        "kind": "ServerStreaming"
      },
      "streamReviewChat": {
        "rpcName": "StreamReviewChat",
        "kind": "ServerStreaming"
      },
      "checkQueuePosition": {
        "rpcName": "CheckQueuePosition",
        "kind": "Unary"
      },
      "checkUsageBasedPrice": {
        "rpcName": "CheckUsageBasedPrice",
        "kind": "Unary"
      },
      "doThisForMeCheck": {
        "rpcName": "DoThisForMeCheck",
        "kind": "Unary"
      },
      "streamDoThisForMe": {
        "rpcName": "StreamDoThisForMe",
        "kind": "ServerStreaming"
      },
      "streamChatToolformer": {
        "rpcName": "StreamChatToolformer",
        "kind": "ServerStreaming"
      },
      "streamChatToolformerContinue": {
        "rpcName": "StreamChatToolformerContinue",
        "kind": "ServerStreaming"
      },
      "pushAiThought": {
        "rpcName": "PushAiThought",
        "kind": "Unary"
      },
      "checkDoableAsTask": {
        "rpcName": "CheckDoableAsTask",
        "kind": "Unary"
      },
      "reportGroundTruthCandidate": {
        "rpcName": "ReportGroundTruthCandidate",
        "kind": "Unary"
      },
      "reportCmdKFate": {
        "rpcName": "ReportCmdKFate",
        "kind": "Unary"
      },
      "showWelcomeScreen": {
        "rpcName": "ShowWelcomeScreen",
        "kind": "Unary"
      },
      "interfaceAgentInit": {
        "rpcName": "InterfaceAgentInit",
        "kind": "Unary"
      },
      "streamInterfaceAgentStatus": {
        "rpcName": "StreamInterfaceAgentStatus",
        "kind": "ServerStreaming"
      },
      "taskGetInterfaceAgentStatus": {
        "rpcName": "TaskGetInterfaceAgentStatus",
        "kind": "ServerStreaming"
      },
      "updateVscodeProfile": {
        "rpcName": "UpdateVscodeProfile",
        "kind": "Unary"
      },
      "taskInit": {
        "rpcName": "TaskInit",
        "kind": "Unary"
      },
      "taskPause": {
        "rpcName": "TaskPause",
        "kind": "Unary"
      },
      "taskInfo": {
        "rpcName": "TaskInfo",
        "kind": "Unary"
      },
      "taskStreamLog": {
        "rpcName": "TaskStreamLog",
        "kind": "ServerStreaming"
      },
      "taskSendMessage": {
        "rpcName": "TaskSendMessage",
        "kind": "Unary"
      },
      "taskProvideResult": {
        "rpcName": "TaskProvideResult",
        "kind": "Unary"
      },
      "createExperimentalIndex": {
        "rpcName": "CreateExperimentalIndex",
        "kind": "Unary"
      },
      "listExperimentalIndexFiles": {
        "rpcName": "ListExperimentalIndexFiles",
        "kind": "Unary"
      },
      "listenExperimentalIndex": {
        "rpcName": "ListenExperimentalIndex",
        "kind": "ServerStreaming"
      },
      "registerFileToIndex": {
        "rpcName": "RegisterFileToIndex",
        "kind": "Unary"
      },
      "setupIndexDependencies": {
        "rpcName": "SetupIndexDependencies",
        "kind": "Unary"
      },
      "computeIndexTopoSort": {
        "rpcName": "ComputeIndexTopoSort",
        "kind": "Unary"
      },
      "streamChatDeepContext": {
        "rpcName": "StreamChatDeepContext",
        "kind": "ServerStreaming"
      },
      "chooseCodeReferences": {
        "rpcName": "ChooseCodeReferences",
        "kind": "Unary"
      },
      "registerCodeReferences": {
        "rpcName": "RegisterCodeReferences",
        "kind": "Unary"
      },
      "extractPaths": {
        "rpcName": "ExtractPaths",
        "kind": "Unary"
      },
      "summarizeWithReferences": {
        "rpcName": "SummarizeWithReferences",
        "kind": "Unary"
      },
      "documentationQuery": {
        "rpcName": "DocumentationQuery",
        "kind": "Unary"
      },
      "availableDocs": {
        "rpcName": "AvailableDocs",
        "kind": "Unary"
      },
      "runWebSearch": {
        "rpcName": "RunWebSearch",
        "kind": "Unary"
      },
      "runWebFetch": {
        "rpcName": "RunWebFetch",
        "kind": "Unary"
      },
      "runGenerateImage": {
        "rpcName": "RunGenerateImage",
        "kind": "Unary"
      },
      "reportFeedback": {
        "rpcName": "ReportFeedback",
        "kind": "Unary"
      },
      "reportBug": {
        "rpcName": "ReportBug",
        "kind": "Unary"
      },
      "streamChatContext": {
        "rpcName": "StreamChatContext",
        "kind": "ServerStreaming"
      },
      "generateTldr": {
        "rpcName": "GenerateTldr",
        "kind": "Unary"
      },
      "taskStreamChatContext": {
        "rpcName": "TaskStreamChatContext",
        "kind": "ServerStreaming"
      },
      "rerankResults": {
        "rpcName": "RerankResults",
        "kind": "Unary"
      },
      "modelQuery": {
        "rpcName": "ModelQuery",
        "kind": "Unary"
      },
      "intentPrediction": {
        "rpcName": "IntentPrediction",
        "kind": "Unary"
      },
      "getChatSuggestions": {
        "rpcName": "GetChatSuggestions",
        "kind": "Unary"
      },
      "getUserInstructions": {
        "rpcName": "GetUserInstructions",
        "kind": "Unary"
      },
      "streamCursorTutor": {
        "rpcName": "StreamCursorTutor",
        "kind": "ServerStreaming"
      },
      "checkFeatureStatus": {
        "rpcName": "CheckFeatureStatus",
        "kind": "Unary"
      },
      "checkFeaturesStatus": {
        "rpcName": "CheckFeaturesStatus",
        "kind": "Unary"
      },
      "checkFeatureStatusUnauthenticated": {
        "rpcName": "CheckFeatureStatusUnauthenticated",
        "kind": "Unary"
      },
      "getEffectiveTokenLimit": {
        "rpcName": "GetEffectiveTokenLimit",
        "kind": "Unary"
      },
      "getContextScores": {
        "rpcName": "GetContextScores",
        "kind": "Unary"
      },
      "streamCpp": {
        "rpcName": "StreamCpp",
        "kind": "ServerStreaming"
      },
      "cppConfig": {
        "rpcName": "CppConfig",
        "kind": "Unary"
      },
      "cppEditHistoryStatus": {
        "rpcName": "CppEditHistoryStatus",
        "kind": "Unary"
      },
      "cppAppend": {
        "rpcName": "CppAppend",
        "kind": "Unary"
      },
      "refreshTabContext": {
        "rpcName": "RefreshTabContext",
        "kind": "Unary"
      },
      "checkNumberConfig": {
        "rpcName": "CheckNumberConfig",
        "kind": "Unary"
      },
      "checkNumberConfigUnauthenticated": {
        "rpcName": "CheckNumberConfigUnauthenticated",
        "kind": "Unary"
      },
      "checkNumberConfigs": {
        "rpcName": "CheckNumberConfigs",
        "kind": "Unary"
      },
      "streamTerminalAutocomplete": {
        "rpcName": "StreamTerminalAutocomplete",
        "kind": "ServerStreaming"
      },
      "streamPseudocodeGenerator": {
        "rpcName": "StreamPseudocodeGenerator",
        "kind": "ServerStreaming"
      },
      "streamPseudocodeMapper": {
        "rpcName": "StreamPseudocodeMapper",
        "kind": "ServerStreaming"
      },
      "acknowledgeGracePeriodDisclaimer": {
        "rpcName": "AcknowledgeGracePeriodDisclaimer",
        "kind": "Unary"
      },
      "streamAiLintBug": {
        "rpcName": "StreamAiLintBug",
        "kind": "ServerStreaming"
      },
      "streamAiCursorHelp": {
        "rpcName": "StreamAiCursorHelp",
        "kind": "ServerStreaming"
      },
      "logUserLintReply": {
        "rpcName": "LogUserLintReply",
        "kind": "Unary"
      },
      "logLinterExplicitUserFeedback": {
        "rpcName": "LogLinterExplicitUserFeedback",
        "kind": "Unary"
      },
      "streamFixMarkers": {
        "rpcName": "StreamFixMarkers",
        "kind": "ServerStreaming"
      },
      "reportInlineAction": {
        "rpcName": "ReportInlineAction",
        "kind": "Unary"
      },
      "streamPriomptPrompt": {
        "rpcName": "StreamPriomptPrompt",
        "kind": "ServerStreaming"
      },
      "streamLint": {
        "rpcName": "StreamLint",
        "kind": "ServerStreaming"
      },
      "streamNewLintRule": {
        "rpcName": "StreamNewLintRule",
        "kind": "ServerStreaming"
      },
      "aiProject": {
        "rpcName": "AiProject",
        "kind": "ServerStreaming"
      },
      "toCamelCase": {
        "rpcName": "ToCamelCase",
        "kind": "Unary"
      },
      "reportGenerationFeedback": {
        "rpcName": "ReportGenerationFeedback",
        "kind": "Unary"
      },
      "reportAgentFeedback": {
        "rpcName": "ReportAgentFeedback",
        "kind": "Unary"
      },
      "reportAgentMessageFeedback": {
        "rpcName": "ReportAgentMessageFeedback",
        "kind": "Unary"
      },
      "reportAutoRoutingResultFeedback": {
        "rpcName": "ReportAutoRoutingResultFeedback",
        "kind": "Unary"
      },
      "getThoughtAnnotation": {
        "rpcName": "GetThoughtAnnotation",
        "kind": "Unary"
      },
      "streamNextCursorPrediction": {
        "rpcName": "StreamNextCursorPrediction",
        "kind": "ServerStreaming"
      },
      "isCursorPredictionEnabled": {
        "rpcName": "IsCursorPredictionEnabled",
        "kind": "Unary"
      },
      "getCppEditClassification": {
        "rpcName": "GetCppEditClassification",
        "kind": "Unary"
      },
      "getTerminalCompletion": {
        "rpcName": "GetTerminalCompletion",
        "kind": "Unary"
      },
      "takeNotesOnCommitDiff": {
        "rpcName": "TakeNotesOnCommitDiff",
        "kind": "Unary"
      },
      "bulkEmbed": {
        "rpcName": "BulkEmbed",
        "kind": "Unary"
      },
      "backgroundCmdKEval": {
        "rpcName": "BackgroundCmdKEval",
        "kind": "ServerStreaming"
      },
      "backgroundCmdK": {
        "rpcName": "BackgroundCmdK",
        "kind": "ServerStreaming"
      },
      "calculateAutoSelection": {
        "rpcName": "CalculateAutoSelection",
        "kind": "Unary"
      },
      "getAtSymbolSuggestions": {
        "rpcName": "GetAtSymbolSuggestions",
        "kind": "Unary"
      },
      "getCodebaseQuestions": {
        "rpcName": "GetCodebaseQuestions",
        "kind": "Unary"
      },
      "cppEditHistoryAppend": {
        "rpcName": "CppEditHistoryAppend",
        "kind": "Unary"
      },
      "devOnlyGetPastRequestIds": {
        "rpcName": "DevOnlyGetPastRequestIds",
        "kind": "Unary"
      },
      "getFilesForComposer": {
        "rpcName": "GetFilesForComposer",
        "kind": "Unary"
      },
      "tryParseTypeScriptTreeSitter": {
        "rpcName": "TryParseTypeScriptTreeSitter",
        "kind": "Unary"
      },
      "nameTab": {
        "rpcName": "NameTab",
        "kind": "Unary"
      },
      "testModelStatus": {
        "rpcName": "TestModelStatus",
        "kind": "Unary"
      },
      "findBugs": {
        "rpcName": "FindBugs",
        "kind": "Unary"
      },
      "contextReranking": {
        "rpcName": "ContextReranking",
        "kind": "Unary"
      },
      "autoContext": {
        "rpcName": "AutoContext",
        "kind": "Unary"
      },
      "writeGitCommitMessage": {
        "rpcName": "WriteGitCommitMessage",
        "kind": "Unary"
      },
      "writeGitBranchName": {
        "rpcName": "WriteGitBranchName",
        "kind": "Unary"
      },
      "streamBugBot": {
        "rpcName": "StreamBugBot",
        "kind": "ServerStreaming"
      },
      "streamBugBotAgentic": {
        "rpcName": "StreamBugBotAgentic",
        "kind": "BiDiStreaming"
      },
      "streamBugBotAgenticSSE": {
        "rpcName": "StreamBugBotAgenticSSE",
        "kind": "ServerStreaming"
      },
      "streamBugBotAgenticPoll": {
        "rpcName": "StreamBugBotAgenticPoll",
        "kind": "ServerStreaming"
      },
      "streamUiBestOfNJudge": {
        "rpcName": "StreamUiBestOfNJudge",
        "kind": "BiDiStreaming"
      },
      "streamUiBestOfNJudgeSSE": {
        "rpcName": "StreamUiBestOfNJudgeSSE",
        "kind": "ServerStreaming"
      },
      "streamUiBestOfNJudgePoll": {
        "rpcName": "StreamUiBestOfNJudgePoll",
        "kind": "ServerStreaming"
      },
      "checkBugBotPrice": {
        "rpcName": "CheckBugBotPrice",
        "kind": "Unary"
      },
      "checkBugBotTelemetryHealthy": {
        "rpcName": "CheckBugBotTelemetryHealthy",
        "kind": "Unary"
      },
      "recordIdeBugReaction": {
        "rpcName": "RecordIdeBugReaction",
        "kind": "Unary"
      },
      "getSuggestedBugBotIterations": {
        "rpcName": "GetSuggestedBugBotIterations",
        "kind": "Unary"
      },
      "getEditorBugbotAutoRunStatus": {
        "rpcName": "GetEditorBugbotAutoRunStatus",
        "kind": "Unary"
      },
      "testBidi": {
        "rpcName": "TestBidi",
        "kind": "BiDiStreaming"
      },
      "streamDiffReview": {
        "rpcName": "StreamDiffReview",
        "kind": "ServerStreaming"
      },
      "streamDiffReviewByFile": {
        "rpcName": "StreamDiffReviewByFile",
        "kind": "ServerStreaming"
      },
      "getModelLabels": {
        "rpcName": "GetModelLabels",
        "kind": "Unary"
      },
      "getLastDefaultModelNudge": {
        "rpcName": "GetLastDefaultModelNudge",
        "kind": "Unary"
      },
      "getDefaultModelNudgeData": {
        "rpcName": "GetDefaultModelNudgeData",
        "kind": "Unary"
      },
      "getDefaultModel": {
        "rpcName": "GetDefaultModel",
        "kind": "Unary"
      },
      "reportCommitAiAnalytics": {
        "rpcName": "ReportCommitAiAnalytics",
        "kind": "Unary"
      },
      "testBedrockCredentials": {
        "rpcName": "TestBedrockCredentials",
        "kind": "Unary"
      },
      "reportAiCodeChangeMetrics": {
        "rpcName": "ReportAiCodeChangeMetrics",
        "kind": "Unary"
      },
      "reportProcessMetrics": {
        "rpcName": "ReportProcessMetrics",
        "kind": "Unary"
      },
      "reportSandProcessMetrics": {
        "rpcName": "ReportSandProcessMetrics",
        "kind": "Unary"
      },
      "reportClientNumericMetrics": {
        "rpcName": "ReportClientNumericMetrics",
        "kind": "Unary"
      },
      "potentiallyGenerateMemory": {
        "rpcName": "PotentiallyGenerateMemory",
        "kind": "Unary"
      },
      "knowledgeBaseAdd": {
        "rpcName": "KnowledgeBaseAdd",
        "kind": "Unary"
      },
      "knowledgeBaseList": {
        "rpcName": "KnowledgeBaseList",
        "kind": "Unary"
      },
      "knowledgeBaseRemove": {
        "rpcName": "KnowledgeBaseRemove",
        "kind": "Unary"
      },
      "knowledgeBaseUpdate": {
        "rpcName": "KnowledgeBaseUpdate",
        "kind": "Unary"
      },
      "fetchRelevantKnowledgeForConversation": {
        "rpcName": "FetchRelevantKnowledgeForConversation",
        "kind": "Unary"
      },
      "inferBackgroundComposerScripts": {
        "rpcName": "InferBackgroundComposerScripts",
        "kind": "Unary"
      },
      "getBackgroundComposerFeedbackLink": {
        "rpcName": "GetBackgroundComposerFeedbackLink",
        "kind": "Unary"
      },
      "getUsableModels": {
        "rpcName": "GetUsableModels",
        "kind": "Unary"
      },
      "getDefaultModelForCli": {
        "rpcName": "GetDefaultModelForCli",
        "kind": "Unary"
      },
      "streamComposerEnhancer": {
        "rpcName": "StreamComposerEnhancer",
        "kind": "BiDiStreaming"
      },
      "streamComposerEnhancerSSE": {
        "rpcName": "StreamComposerEnhancerSSE",
        "kind": "ServerStreaming"
      },
      "streamComposerEnhancerPoll": {
        "rpcName": "StreamComposerEnhancerPoll",
        "kind": "ServerStreaming"
      },
      "streamStt": {
        "rpcName": "StreamStt",
        "kind": "BiDiStreaming"
      },
      "streamSttSSE": {
        "rpcName": "StreamSttSSE",
        "kind": "ServerStreaming"
      },
      "streamSttPoll": {
        "rpcName": "StreamSttPoll",
        "kind": "ServerStreaming"
      },
      "transcribeAudio": {
        "rpcName": "TranscribeAudio",
        "kind": "Unary"
      },
      "nameAgent": {
        "rpcName": "NameAgent",
        "kind": "Unary"
      },
      "evaluatePromptHook": {
        "rpcName": "EvaluatePromptHook",
        "kind": "Unary"
      },
      "getCloudSetupBlockers": {
        "rpcName": "GetCloudSetupBlockers",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.AnalyticsService",
    "bundle": "electron-main.cjs",
    "methods": {
      "trackEvents": {
        "rpcName": "TrackEvents",
        "kind": "Unary"
      },
      "batch": {
        "rpcName": "Batch",
        "kind": "Unary"
      },
      "bootstrapStatsig": {
        "rpcName": "BootstrapStatsig",
        "kind": "Unary"
      },
      "getFirstWindowStatsigDecision": {
        "rpcName": "GetFirstWindowStatsigDecision",
        "kind": "Unary"
      },
      "submitLogs": {
        "rpcName": "SubmitLogs",
        "kind": "Unary"
      },
      "ingestConversation": {
        "rpcName": "IngestConversation",
        "kind": "Unary"
      },
      "uploadIssueTrace": {
        "rpcName": "UploadIssueTrace",
        "kind": "Unary"
      },
      "downloadIssueTraces": {
        "rpcName": "DownloadIssueTraces",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.AnalyticsService",
    "bundle": "host-main.cjs",
    "methods": {
      "trackEvents": {
        "rpcName": "TrackEvents",
        "kind": "Unary"
      },
      "batch": {
        "rpcName": "Batch",
        "kind": "Unary"
      },
      "bootstrapStatsig": {
        "rpcName": "BootstrapStatsig",
        "kind": "Unary"
      },
      "getFirstWindowStatsigDecision": {
        "rpcName": "GetFirstWindowStatsigDecision",
        "kind": "Unary"
      },
      "submitLogs": {
        "rpcName": "SubmitLogs",
        "kind": "Unary"
      },
      "ingestConversation": {
        "rpcName": "IngestConversation",
        "kind": "Unary"
      },
      "uploadIssueTrace": {
        "rpcName": "UploadIssueTrace",
        "kind": "Unary"
      },
      "downloadIssueTraces": {
        "rpcName": "DownloadIssueTraces",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.AutomationsService",
    "bundle": "host-main.cjs",
    "methods": {
      "createAutomation": {
        "rpcName": "CreateAutomation",
        "kind": "Unary"
      },
      "listAutomations": {
        "rpcName": "ListAutomations",
        "kind": "Unary"
      },
      "getAutomation": {
        "rpcName": "GetAutomation",
        "kind": "Unary"
      },
      "updateAutomation": {
        "rpcName": "UpdateAutomation",
        "kind": "Unary"
      },
      "createSandAutomation": {
        "rpcName": "CreateSandAutomation",
        "kind": "Unary"
      },
      "listSandAutomations": {
        "rpcName": "ListSandAutomations",
        "kind": "Unary"
      },
      "getSandAutomation": {
        "rpcName": "GetSandAutomation",
        "kind": "Unary"
      },
      "updateSandAutomation": {
        "rpcName": "UpdateSandAutomation",
        "kind": "Unary"
      },
      "deleteSandAutomation": {
        "rpcName": "DeleteSandAutomation",
        "kind": "Unary"
      },
      "reassignAutomationOwner": {
        "rpcName": "ReassignAutomationOwner",
        "kind": "Unary"
      },
      "updateAutomationAuthoringMode": {
        "rpcName": "UpdateAutomationAuthoringMode",
        "kind": "Unary"
      },
      "validateAutomationSpec": {
        "rpcName": "ValidateAutomationSpec",
        "kind": "Unary"
      },
      "applyAutomationSpec": {
        "rpcName": "ApplyAutomationSpec",
        "kind": "Unary"
      },
      "deleteAutomation": {
        "rpcName": "DeleteAutomation",
        "kind": "Unary"
      },
      "testAutomation": {
        "rpcName": "TestAutomation",
        "kind": "Unary"
      },
      "testAutomationFilter": {
        "rpcName": "TestAutomationFilter",
        "kind": "Unary"
      },
      "listAutomationRuns": {
        "rpcName": "ListAutomationRuns",
        "kind": "Unary"
      },
      "getAutomationRun": {
        "rpcName": "GetAutomationRun",
        "kind": "Unary"
      },
      "listAllRuns": {
        "rpcName": "ListAllRuns",
        "kind": "Unary"
      },
      "getRunSummary": {
        "rpcName": "GetRunSummary",
        "kind": "Unary"
      },
      "getSecuritybotResolutionStats": {
        "rpcName": "GetSecuritybotResolutionStats",
        "kind": "Unary"
      },
      "getApprovalAgentAnalytics": {
        "rpcName": "GetApprovalAgentAnalytics",
        "kind": "Unary"
      },
      "getManagedAutomationTeamSettings": {
        "rpcName": "GetManagedAutomationTeamSettings",
        "kind": "Unary"
      },
      "updateManagedAutomationTeamSettings": {
        "rpcName": "UpdateManagedAutomationTeamSettings",
        "kind": "Unary"
      },
      "cancelAutomationRun": {
        "rpcName": "CancelAutomationRun",
        "kind": "Unary"
      },
      "cancelAllAutomationRuns": {
        "rpcName": "CancelAllAutomationRuns",
        "kind": "Unary"
      },
      "retryAutomationRun": {
        "rpcName": "RetryAutomationRun",
        "kind": "Unary"
      },
      "listAutomationMemories": {
        "rpcName": "ListAutomationMemories",
        "kind": "Unary"
      },
      "getAutomationMemory": {
        "rpcName": "GetAutomationMemory",
        "kind": "Unary"
      },
      "updateAutomationMemory": {
        "rpcName": "UpdateAutomationMemory",
        "kind": "Unary"
      },
      "deleteAutomationMemory": {
        "rpcName": "DeleteAutomationMemory",
        "kind": "Unary"
      },
      "listWorkflowTemplates": {
        "rpcName": "ListWorkflowTemplates",
        "kind": "Unary"
      },
      "getWorkflowTemplate": {
        "rpcName": "GetWorkflowTemplate",
        "kind": "Unary"
      },
      "createWorkflowFromTemplate": {
        "rpcName": "CreateWorkflowFromTemplate",
        "kind": "Unary"
      },
      "validateAutomationTools": {
        "rpcName": "ValidateAutomationTools",
        "kind": "Unary"
      },
      "builderCompletion": {
        "rpcName": "BuilderCompletion",
        "kind": "Unary"
      },
      "disableAutomationForTeamShutdown": {
        "rpcName": "DisableAutomationForTeamShutdown",
        "kind": "Unary"
      },
      "getSentryAuthUrl": {
        "rpcName": "GetSentryAuthUrl",
        "kind": "Unary"
      },
      "connectSentryCallback": {
        "rpcName": "ConnectSentryCallback",
        "kind": "Unary"
      },
      "getSentryStatus": {
        "rpcName": "GetSentryStatus",
        "kind": "Unary"
      },
      "getSentryProjects": {
        "rpcName": "GetSentryProjects",
        "kind": "Unary"
      },
      "disconnectSentry": {
        "rpcName": "DisconnectSentry",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.BackgroundComposerService",
    "bundle": "electron-main.cjs",
    "methods": {
      "listBackgroundComposers": {
        "rpcName": "ListBackgroundComposers",
        "kind": "Unary"
      },
      "pinBackgroundComposers": {
        "rpcName": "PinBackgroundComposers",
        "kind": "Unary"
      },
      "unpinBackgroundComposers": {
        "rpcName": "UnpinBackgroundComposers",
        "kind": "Unary"
      },
      "attachBackgroundComposer": {
        "rpcName": "AttachBackgroundComposer",
        "kind": "ServerStreaming"
      },
      "streamConversation": {
        "rpcName": "StreamConversation",
        "kind": "ServerStreaming"
      },
      "getLatestAgentConversationState": {
        "rpcName": "GetLatestAgentConversationState",
        "kind": "Unary"
      },
      "getBlobForAgentKV": {
        "rpcName": "GetBlobForAgentKV",
        "kind": "Unary"
      },
      "attachBackgroundComposerLogs": {
        "rpcName": "AttachBackgroundComposerLogs",
        "kind": "ServerStreaming"
      },
      "attachAgentStartupTrace": {
        "rpcName": "AttachAgentStartupTrace",
        "kind": "ServerStreaming"
      },
      "startBackgroundComposerFromSnapshot": {
        "rpcName": "StartBackgroundComposerFromSnapshot",
        "kind": "Unary"
      },
      "forkBackgroundComposer": {
        "rpcName": "ForkBackgroundComposer",
        "kind": "Unary"
      },
      "startSideChatBackgroundComposer": {
        "rpcName": "StartSideChatBackgroundComposer",
        "kind": "Unary"
      },
      "listBackgroundComposerChildren": {
        "rpcName": "ListBackgroundComposerChildren",
        "kind": "Unary"
      },
      "makePRBackgroundComposer": {
        "rpcName": "MakePRBackgroundComposer",
        "kind": "Unary"
      },
      "openPRBackgroundComposer": {
        "rpcName": "OpenPRBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerStatus": {
        "rpcName": "GetBackgroundComposerStatus",
        "kind": "Unary"
      },
      "addAsyncFollowupBackgroundComposer": {
        "rpcName": "AddAsyncFollowupBackgroundComposer",
        "kind": "Unary"
      },
      "injectBackgroundComposerContext": {
        "rpcName": "InjectBackgroundComposerContext",
        "kind": "Unary"
      },
      "submitInteractionResponseBackgroundComposer": {
        "rpcName": "SubmitInteractionResponseBackgroundComposer",
        "kind": "Unary"
      },
      "listPendingFollowups": {
        "rpcName": "ListPendingFollowups",
        "kind": "Unary"
      },
      "updatePendingFollowup": {
        "rpcName": "UpdatePendingFollowup",
        "kind": "Unary"
      },
      "deletePendingFollowup": {
        "rpcName": "DeletePendingFollowup",
        "kind": "Unary"
      },
      "reorderPendingFollowup": {
        "rpcName": "ReorderPendingFollowup",
        "kind": "Unary"
      },
      "submitPendingFollowupNow": {
        "rpcName": "SubmitPendingFollowupNow",
        "kind": "Unary"
      },
      "markFollowupEditing": {
        "rpcName": "MarkFollowupEditing",
        "kind": "Unary"
      },
      "getCursorServerUrl": {
        "rpcName": "GetCursorServerUrl",
        "kind": "Unary"
      },
      "warmCursorServerDownload": {
        "rpcName": "WarmCursorServerDownload",
        "kind": "Unary"
      },
      "preWarmPod": {
        "rpcName": "PreWarmPod",
        "kind": "Unary"
      },
      "wakeBackgroundComposer": {
        "rpcName": "WakeBackgroundComposer",
        "kind": "Unary"
      },
      "pauseBackgroundComposer": {
        "rpcName": "PauseBackgroundComposer",
        "kind": "Unary"
      },
      "cancelBackgroundComposerToolCall": {
        "rpcName": "CancelBackgroundComposerToolCall",
        "kind": "Unary"
      },
      "resumeBackgroundComposer": {
        "rpcName": "ResumeBackgroundComposer",
        "kind": "Unary"
      },
      "archiveBackgroundComposer": {
        "rpcName": "ArchiveBackgroundComposer",
        "kind": "Unary"
      },
      "archiveRepoBackgroundComposers": {
        "rpcName": "ArchiveRepoBackgroundComposers",
        "kind": "Unary"
      },
      "deleteBackgroundComposer": {
        "rpcName": "DeleteBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerInfo": {
        "rpcName": "GetBackgroundComposerInfo",
        "kind": "Unary"
      },
      "getBackgroundComposerEnvironmentVersion": {
        "rpcName": "GetBackgroundComposerEnvironmentVersion",
        "kind": "Unary"
      },
      "getEnvironmentHistory": {
        "rpcName": "GetEnvironmentHistory",
        "kind": "Unary"
      },
      "getBackgroundComposerTimings": {
        "rpcName": "GetBackgroundComposerTimings",
        "kind": "Unary"
      },
      "getBackgroundComposerRepositoryInfo": {
        "rpcName": "GetBackgroundComposerRepositoryInfo",
        "kind": "Unary"
      },
      "getMachine": {
        "rpcName": "GetMachine",
        "kind": "Unary"
      },
      "listWorkspaceFiles": {
        "rpcName": "ListWorkspaceFiles",
        "kind": "Unary"
      },
      "listDetailedBackgroundComposers": {
        "rpcName": "ListDetailedBackgroundComposers",
        "kind": "Unary"
      },
      "listCloudAgentRunsForDashboard": {
        "rpcName": "ListCloudAgentRunsForDashboard",
        "kind": "Unary"
      },
      "aggregateCloudAgentRunsForDashboard": {
        "rpcName": "AggregateCloudAgentRunsForDashboard",
        "kind": "Unary"
      },
      "getCloudAgentRunForDashboard": {
        "rpcName": "GetCloudAgentRunForDashboard",
        "kind": "Unary"
      },
      "listCloudAgentRunEventsForDashboard": {
        "rpcName": "ListCloudAgentRunEventsForDashboard",
        "kind": "Unary"
      },
      "listNamedAgents": {
        "rpcName": "ListNamedAgents",
        "kind": "Unary"
      },
      "listNamedAgentSessions": {
        "rpcName": "ListNamedAgentSessions",
        "kind": "Unary"
      },
      "listEventSubscriptions": {
        "rpcName": "ListEventSubscriptions",
        "kind": "Unary"
      },
      "closeEventSubscription": {
        "rpcName": "CloseEventSubscription",
        "kind": "Unary"
      },
      "getGithubAccessTokenForRepos": {
        "rpcName": "GetGithubAccessTokenForRepos",
        "kind": "Unary"
      },
      "makeGithubRequest": {
        "rpcName": "MakeGithubRequest",
        "kind": "Unary"
      },
      "getBackgroundComposerDiffDetails": {
        "rpcName": "GetBackgroundComposerDiffDetails",
        "kind": "Unary"
      },
      "getOptimizedDiffDetails": {
        "rpcName": "GetOptimizedDiffDetails",
        "kind": "Unary"
      },
      "listPrCodeTourRevisions": {
        "rpcName": "ListPrCodeTourRevisions",
        "kind": "Unary"
      },
      "getBackgroundComposerChangesHash": {
        "rpcName": "GetBackgroundComposerChangesHash",
        "kind": "Unary"
      },
      "getBackgroundComposerPullRequest": {
        "rpcName": "GetBackgroundComposerPullRequest",
        "kind": "Unary"
      },
      "refreshGithubAccessTokenInBackgroundComposer": {
        "rpcName": "RefreshGithubAccessTokenInBackgroundComposer",
        "kind": "Unary"
      },
      "createBackgroundComposerPod": {
        "rpcName": "CreateBackgroundComposerPod",
        "kind": "Unary"
      },
      "attachBackgroundComposerPod": {
        "rpcName": "AttachBackgroundComposerPod",
        "kind": "ServerStreaming"
      },
      "createBackgroundComposerPodSnapshot": {
        "rpcName": "CreateBackgroundComposerPodSnapshot",
        "kind": "Unary"
      },
      "changeBackgroundComposerSnapshotVisibility": {
        "rpcName": "ChangeBackgroundComposerSnapshotVisibility",
        "kind": "Unary"
      },
      "getBackgroundComposerSnapshotInfo": {
        "rpcName": "GetBackgroundComposerSnapshotInfo",
        "kind": "Unary"
      },
      "listBackgroundComposerSnapshotsByBcId": {
        "rpcName": "ListBackgroundComposerSnapshotsByBcId",
        "kind": "Unary"
      },
      "listBackgroundComposerSnapshotStatusesByBcIds": {
        "rpcName": "ListBackgroundComposerSnapshotStatusesByBcIds",
        "kind": "Unary"
      },
      "getBackgroundComposerSnapshotState": {
        "rpcName": "GetBackgroundComposerSnapshotState",
        "kind": "Unary"
      },
      "watchBackgroundComposerSnapshotState": {
        "rpcName": "WatchBackgroundComposerSnapshotState",
        "kind": "ServerStreaming"
      },
      "getBackgroundComposerConversation": {
        "rpcName": "GetBackgroundComposerConversation",
        "kind": "Unary"
      },
      "renameBackgroundComposer": {
        "rpcName": "RenameBackgroundComposer",
        "kind": "Unary"
      },
      "updateProjectAppearance": {
        "rpcName": "UpdateProjectAppearance",
        "kind": "Unary"
      },
      "publishBackgroundComposerTempRepo": {
        "rpcName": "PublishBackgroundComposerTempRepo",
        "kind": "Unary"
      },
      "reparentBackgroundComposer": {
        "rpcName": "ReparentBackgroundComposer",
        "kind": "Unary"
      },
      "setWorkerManager": {
        "rpcName": "SetWorkerManager",
        "kind": "Unary"
      },
      "createProjectWorker": {
        "rpcName": "CreateProjectWorker",
        "kind": "Unary"
      },
      "clearWorkerManager": {
        "rpcName": "ClearWorkerManager",
        "kind": "Unary"
      },
      "listWorkersForManager": {
        "rpcName": "ListWorkersForManager",
        "kind": "Unary"
      },
      "streamBackgroundComposerUpdates": {
        "rpcName": "StreamBackgroundComposerUpdates",
        "kind": "ServerStreaming"
      },
      "updateBackgroundComposerExperimentalModelOptOut": {
        "rpcName": "UpdateBackgroundComposerExperimentalModelOptOut",
        "kind": "Unary"
      },
      "commitBackgroundComposer": {
        "rpcName": "CommitBackgroundComposer",
        "kind": "Unary"
      },
      "setPersonalEnvironmentJson": {
        "rpcName": "SetPersonalEnvironmentJson",
        "kind": "Unary"
      },
      "getPersonalEnvironmentJson": {
        "rpcName": "GetPersonalEnvironmentJson",
        "kind": "Unary"
      },
      "getEnvironmentJsonCandidates": {
        "rpcName": "GetEnvironmentJsonCandidates",
        "kind": "Unary"
      },
      "listPersonalEnvironments": {
        "rpcName": "ListPersonalEnvironments",
        "kind": "Unary"
      },
      "deletePersonalEnvironmentJson": {
        "rpcName": "DeletePersonalEnvironmentJson",
        "kind": "Unary"
      },
      "publishEnvironment": {
        "rpcName": "PublishEnvironment",
        "kind": "Unary"
      },
      "publishPersonalEnvironment": {
        "rpcName": "PublishPersonalEnvironment",
        "kind": "Unary"
      },
      "listTeamEnvironments": {
        "rpcName": "ListTeamEnvironments",
        "kind": "Unary"
      },
      "deleteTeamEnvironment": {
        "rpcName": "DeleteTeamEnvironment",
        "kind": "Unary"
      },
      "setTeamEnvironmentJson": {
        "rpcName": "SetTeamEnvironmentJson",
        "kind": "Unary"
      },
      "restoreEnvironmentVersion": {
        "rpcName": "RestoreEnvironmentVersion",
        "kind": "Unary"
      },
      "listEnvironments": {
        "rpcName": "ListEnvironments",
        "kind": "Unary"
      },
      "getEnvironment": {
        "rpcName": "GetEnvironment",
        "kind": "Unary"
      },
      "renameEnvironment": {
        "rpcName": "RenameEnvironment",
        "kind": "Unary"
      },
      "listEnvironmentBuilds": {
        "rpcName": "ListEnvironmentBuilds",
        "kind": "Unary"
      },
      "getEnvironmentActiveBuild": {
        "rpcName": "GetEnvironmentActiveBuild",
        "kind": "Unary"
      },
      "getEnvironmentPersistentRecurringBuildFailures": {
        "rpcName": "GetEnvironmentPersistentRecurringBuildFailures",
        "kind": "Unary"
      },
      "getEnvironmentBuild": {
        "rpcName": "GetEnvironmentBuild",
        "kind": "Unary"
      },
      "updateEnvironmentBuild": {
        "rpcName": "UpdateEnvironmentBuild",
        "kind": "Unary"
      },
      "triggerEnvironmentBuild": {
        "rpcName": "TriggerEnvironmentBuild",
        "kind": "Unary"
      },
      "attachEnvironmentBuildLog": {
        "rpcName": "AttachEnvironmentBuildLog",
        "kind": "ServerStreaming"
      },
      "cancelEnvironmentBuild": {
        "rpcName": "CancelEnvironmentBuild",
        "kind": "Unary"
      },
      "getEnvironmentBuildSettings": {
        "rpcName": "GetEnvironmentBuildSettings",
        "kind": "Unary"
      },
      "updateEnvironmentBuildSettings": {
        "rpcName": "UpdateEnvironmentBuildSettings",
        "kind": "Unary"
      },
      "resolveOrCreateMultiRepoEnvironment": {
        "rpcName": "ResolveOrCreateMultiRepoEnvironment",
        "kind": "Unary"
      },
      "resolveOrCreateDraftEnvironment": {
        "rpcName": "ResolveOrCreateDraftEnvironment",
        "kind": "Unary"
      },
      "snapshotAndSaveEnvironment": {
        "rpcName": "SnapshotAndSaveEnvironment",
        "kind": "Unary"
      },
      "listReposWithLocalEnvironment": {
        "rpcName": "ListReposWithLocalEnvironment",
        "kind": "Unary"
      },
      "markBackgroundComposerRead": {
        "rpcName": "MarkBackgroundComposerRead",
        "kind": "Unary"
      },
      "markBackgroundComposerUnread": {
        "rpcName": "MarkBackgroundComposerUnread",
        "kind": "Unary"
      },
      "notifyBackgroundComposerShown": {
        "rpcName": "NotifyBackgroundComposerShown",
        "kind": "Unary"
      },
      "fetchBackgroundComposer": {
        "rpcName": "FetchBackgroundComposer",
        "kind": "Unary"
      },
      "getTurnSummaryBackgroundComposer": {
        "rpcName": "GetTurnSummaryBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerName": {
        "rpcName": "GetBackgroundComposerName",
        "kind": "Unary"
      },
      "getBackgroundComposerPrompt": {
        "rpcName": "GetBackgroundComposerPrompt",
        "kind": "Unary"
      },
      "readBinaryFile": {
        "rpcName": "ReadBinaryFile",
        "kind": "Unary"
      },
      "listBackgroundComposerArtifacts": {
        "rpcName": "ListBackgroundComposerArtifacts",
        "kind": "Unary"
      },
      "getBackgroundComposerArtifact": {
        "rpcName": "GetBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "getBackgroundComposerArtifactBytes": {
        "rpcName": "GetBackgroundComposerArtifactBytes",
        "kind": "Unary"
      },
      "streamBackgroundComposerArtifact": {
        "rpcName": "StreamBackgroundComposerArtifact",
        "kind": "ServerStreaming"
      },
      "listSharedBackgroundComposerArtifacts": {
        "rpcName": "ListSharedBackgroundComposerArtifacts",
        "kind": "Unary"
      },
      "shareBackgroundComposerArtifact": {
        "rpcName": "ShareBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "unshareBackgroundComposerArtifact": {
        "rpcName": "UnshareBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "getPublicBackgroundComposerArtifact": {
        "rpcName": "GetPublicBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "updateBackgroundComposerUserSettings": {
        "rpcName": "UpdateBackgroundComposerUserSettings",
        "kind": "Unary"
      },
      "getBackgroundComposerUserSettings": {
        "rpcName": "GetBackgroundComposerUserSettings",
        "kind": "Unary"
      },
      "updateBackgroundComposerEnvironment": {
        "rpcName": "UpdateBackgroundComposerEnvironment",
        "kind": "Unary"
      },
      "getRepositoryBranches": {
        "rpcName": "GetRepositoryBranches",
        "kind": "Unary"
      },
      "getPullRequestMergeStatus": {
        "rpcName": "GetPullRequestMergeStatus",
        "kind": "Unary"
      },
      "getDetailedPullRequestStatus": {
        "rpcName": "GetDetailedPullRequestStatus",
        "kind": "Unary"
      },
      "checkPullRequestMergeability": {
        "rpcName": "CheckPullRequestMergeability",
        "kind": "Unary"
      },
      "getPullRequestDiscussions": {
        "rpcName": "GetPullRequestDiscussions",
        "kind": "Unary"
      },
      "getPullRequestCommits": {
        "rpcName": "GetPullRequestCommits",
        "kind": "Unary"
      },
      "getPullRequestTimelineEvents": {
        "rpcName": "GetPullRequestTimelineEvents",
        "kind": "Unary"
      },
      "replyToReviewThread": {
        "rpcName": "ReplyToReviewThread",
        "kind": "Unary"
      },
      "resolveReviewThread": {
        "rpcName": "ResolveReviewThread",
        "kind": "Unary"
      },
      "unresolveReviewThread": {
        "rpcName": "UnresolveReviewThread",
        "kind": "Unary"
      },
      "deletePullRequestReviewComment": {
        "rpcName": "DeletePullRequestReviewComment",
        "kind": "Unary"
      },
      "addPullRequestReviewComment": {
        "rpcName": "AddPullRequestReviewComment",
        "kind": "Unary"
      },
      "mergePullRequest": {
        "rpcName": "MergePullRequest",
        "kind": "Unary"
      },
      "enablePullRequestAutoMerge": {
        "rpcName": "EnablePullRequestAutoMerge",
        "kind": "Unary"
      },
      "disablePullRequestAutoMerge": {
        "rpcName": "DisablePullRequestAutoMerge",
        "kind": "Unary"
      },
      "convertPullRequestFromDraft": {
        "rpcName": "ConvertPullRequestFromDraft",
        "kind": "Unary"
      },
      "updatePullRequestBranch": {
        "rpcName": "UpdatePullRequestBranch",
        "kind": "Unary"
      },
      "registerPushNotificationToken": {
        "rpcName": "RegisterPushNotificationToken",
        "kind": "Unary"
      },
      "deletePushNotificationToken": {
        "rpcName": "DeletePushNotificationToken",
        "kind": "Unary"
      },
      "syncLiveActivity": {
        "rpcName": "SyncLiveActivity",
        "kind": "Unary"
      },
      "deleteLiveActivity": {
        "rpcName": "DeleteLiveActivity",
        "kind": "Unary"
      },
      "verifyBackgroundComposerAccess": {
        "rpcName": "VerifyBackgroundComposerAccess",
        "kind": "Unary"
      },
      "startSlackStreamingForFollowup": {
        "rpcName": "StartSlackStreamingForFollowup",
        "kind": "Unary"
      },
      "startGithubStreamingForFollowup": {
        "rpcName": "StartGithubStreamingForFollowup",
        "kind": "Unary"
      },
      "startLinearStreamingForFollowup": {
        "rpcName": "StartLinearStreamingForFollowup",
        "kind": "Unary"
      },
      "getGithubInstallations": {
        "rpcName": "GetGithubInstallations",
        "kind": "Unary"
      },
      "fetchAllInstallationRepos": {
        "rpcName": "FetchAllInstallationRepos",
        "kind": "Unary"
      },
      "getBackgroundComposerVmUsage": {
        "rpcName": "GetBackgroundComposerVmUsage",
        "kind": "Unary"
      },
      "listGrindModeComposers": {
        "rpcName": "ListGrindModeComposers",
        "kind": "Unary"
      },
      "getCloudAgentDebugDetails": {
        "rpcName": "GetCloudAgentDebugDetails",
        "kind": "Unary"
      },
      "getCloudAgentMemoryDbLogs": {
        "rpcName": "GetCloudAgentMemoryDbLogs",
        "kind": "Unary"
      },
      "createAgentShare": {
        "rpcName": "CreateAgentShare",
        "kind": "Unary"
      },
      "getAgentSharePreview": {
        "rpcName": "GetAgentSharePreview",
        "kind": "Unary"
      },
      "listPrivateWorkers": {
        "rpcName": "ListPrivateWorkers",
        "kind": "Unary"
      },
      "listPrivateWorkerPools": {
        "rpcName": "ListPrivateWorkerPools",
        "kind": "Unary"
      },
      "registerPrivateWorkerPool": {
        "rpcName": "RegisterPrivateWorkerPool",
        "kind": "Unary"
      },
      "deregisterPrivateWorkerPool": {
        "rpcName": "DeregisterPrivateWorkerPool",
        "kind": "Unary"
      },
      "adminListUserPrivateWorkers": {
        "rpcName": "AdminListUserPrivateWorkers",
        "kind": "Unary"
      },
      "adminKillBackgroundComposer": {
        "rpcName": "AdminKillBackgroundComposer",
        "kind": "Unary"
      },
      "adminListActiveBackgroundComposers": {
        "rpcName": "AdminListActiveBackgroundComposers",
        "kind": "Unary"
      },
      "adminKillAllActiveBackgroundComposers": {
        "rpcName": "AdminKillAllActiveBackgroundComposers",
        "kind": "Unary"
      },
      "listPendingPrivateWorkerRequests": {
        "rpcName": "ListPendingPrivateWorkerRequests",
        "kind": "Unary"
      },
      "streamPendingPrivateWorkerRequests": {
        "rpcName": "StreamPendingPrivateWorkerRequests",
        "kind": "ServerStreaming"
      },
      "claimPendingPrivateWorkerRequest": {
        "rpcName": "ClaimPendingPrivateWorkerRequest",
        "kind": "Unary"
      },
      "getPrivateWorkersSummary": {
        "rpcName": "GetPrivateWorkersSummary",
        "kind": "Unary"
      },
      "getPrivateWorker": {
        "rpcName": "GetPrivateWorker",
        "kind": "Unary"
      },
      "releasePrivateWorker": {
        "rpcName": "ReleasePrivateWorker",
        "kind": "Unary"
      },
      "batchRefreshPullRequestStatus": {
        "rpcName": "BatchRefreshPullRequestStatus",
        "kind": "Unary"
      },
      "listAgentStores": {
        "rpcName": "ListAgentStores",
        "kind": "Unary"
      },
      "listAgentStoreEntries": {
        "rpcName": "ListAgentStoreEntries",
        "kind": "Unary"
      },
      "readAgentStoreFile": {
        "rpcName": "ReadAgentStoreFile",
        "kind": "Unary"
      },
      "mintAgentStoreToken": {
        "rpcName": "MintAgentStoreToken",
        "kind": "Unary"
      },
      "listAgentStoreFiles": {
        "rpcName": "ListAgentStoreFiles",
        "kind": "Unary"
      },
      "listAgentStoreDirectory": {
        "rpcName": "ListAgentStoreDirectory",
        "kind": "Unary"
      },
      "presignAgentStoreReads": {
        "rpcName": "PresignAgentStoreReads",
        "kind": "Unary"
      },
      "presignAgentStoreWrites": {
        "rpcName": "PresignAgentStoreWrites",
        "kind": "Unary"
      },
      "completeAgentStoreMultipartWrites": {
        "rpcName": "CompleteAgentStoreMultipartWrites",
        "kind": "Unary"
      },
      "abortAgentStoreMultipartWrites": {
        "rpcName": "AbortAgentStoreMultipartWrites",
        "kind": "Unary"
      },
      "presignPromptUpload": {
        "rpcName": "PresignPromptUpload",
        "kind": "Unary"
      },
      "completePromptUpload": {
        "rpcName": "CompletePromptUpload",
        "kind": "Unary"
      },
      "abortPromptUpload": {
        "rpcName": "AbortPromptUpload",
        "kind": "Unary"
      },
      "acquireAgentStoreFileLock": {
        "rpcName": "AcquireAgentStoreFileLock",
        "kind": "Unary"
      },
      "renewAgentStoreFileLock": {
        "rpcName": "RenewAgentStoreFileLock",
        "kind": "Unary"
      },
      "releaseAgentStoreFileLock": {
        "rpcName": "ReleaseAgentStoreFileLock",
        "kind": "Unary"
      },
      "getAgentStoreFileLock": {
        "rpcName": "GetAgentStoreFileLock",
        "kind": "Unary"
      },
      "deleteAgentStoreFiles": {
        "rpcName": "DeleteAgentStoreFiles",
        "kind": "Unary"
      },
      "shareAgentStore": {
        "rpcName": "ShareAgentStore",
        "kind": "Unary"
      },
      "unshareAgentStore": {
        "rpcName": "UnshareAgentStore",
        "kind": "Unary"
      },
      "listSharedAgentStores": {
        "rpcName": "ListSharedAgentStores",
        "kind": "Unary"
      },
      "provisionSyntheticsServiceAccounts": {
        "rpcName": "ProvisionSyntheticsServiceAccounts",
        "kind": "Unary"
      },
      "startCloudAgentLoadTest": {
        "rpcName": "StartCloudAgentLoadTest",
        "kind": "Unary"
      },
      "ensureModelRoutingLoadTestStarted": {
        "rpcName": "EnsureModelRoutingLoadTestStarted",
        "kind": "Unary"
      },
      "cancelModelRoutingLoadTest": {
        "rpcName": "CancelModelRoutingLoadTest",
        "kind": "Unary"
      },
      "mintCustomerPrivatelinkProxyToken": {
        "rpcName": "MintCustomerPrivatelinkProxyToken",
        "kind": "Unary"
      },
      "adminListTeamNamedAgents": {
        "rpcName": "AdminListTeamNamedAgents",
        "kind": "Unary"
      },
      "adminDeleteNamedAgent": {
        "rpcName": "AdminDeleteNamedAgent",
        "kind": "Unary"
      },
      "listKeyrings": {
        "rpcName": "ListKeyrings",
        "kind": "Unary"
      },
      "getKeyring": {
        "rpcName": "GetKeyring",
        "kind": "Unary"
      },
      "createKeyring": {
        "rpcName": "CreateKeyring",
        "kind": "Unary"
      },
      "createKeyringFromTeamSecrets": {
        "rpcName": "CreateKeyringFromTeamSecrets",
        "kind": "Unary"
      },
      "copyTeamSecretsToKeyring": {
        "rpcName": "CopyTeamSecretsToKeyring",
        "kind": "Unary"
      },
      "renameKeyring": {
        "rpcName": "RenameKeyring",
        "kind": "Unary"
      },
      "deleteKeyring": {
        "rpcName": "DeleteKeyring",
        "kind": "Unary"
      },
      "listKeyringSecrets": {
        "rpcName": "ListKeyringSecrets",
        "kind": "Unary"
      },
      "createKeyringSecret": {
        "rpcName": "CreateKeyringSecret",
        "kind": "Unary"
      },
      "updateKeyringSecret": {
        "rpcName": "UpdateKeyringSecret",
        "kind": "Unary"
      },
      "revokeKeyringSecret": {
        "rpcName": "RevokeKeyringSecret",
        "kind": "Unary"
      },
      "listKeyringGrants": {
        "rpcName": "ListKeyringGrants",
        "kind": "Unary"
      },
      "grantKeyringPermissions": {
        "rpcName": "GrantKeyringPermissions",
        "kind": "Unary"
      },
      "updateKeyringPermissions": {
        "rpcName": "UpdateKeyringPermissions",
        "kind": "Unary"
      },
      "revokeKeyringPermissions": {
        "rpcName": "RevokeKeyringPermissions",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.BackgroundComposerService",
    "bundle": "host-main.cjs",
    "methods": {
      "listBackgroundComposers": {
        "rpcName": "ListBackgroundComposers",
        "kind": "Unary"
      },
      "pinBackgroundComposers": {
        "rpcName": "PinBackgroundComposers",
        "kind": "Unary"
      },
      "unpinBackgroundComposers": {
        "rpcName": "UnpinBackgroundComposers",
        "kind": "Unary"
      },
      "attachBackgroundComposer": {
        "rpcName": "AttachBackgroundComposer",
        "kind": "ServerStreaming"
      },
      "streamConversation": {
        "rpcName": "StreamConversation",
        "kind": "ServerStreaming"
      },
      "getLatestAgentConversationState": {
        "rpcName": "GetLatestAgentConversationState",
        "kind": "Unary"
      },
      "getBlobForAgentKV": {
        "rpcName": "GetBlobForAgentKV",
        "kind": "Unary"
      },
      "attachBackgroundComposerLogs": {
        "rpcName": "AttachBackgroundComposerLogs",
        "kind": "ServerStreaming"
      },
      "attachAgentStartupTrace": {
        "rpcName": "AttachAgentStartupTrace",
        "kind": "ServerStreaming"
      },
      "startBackgroundComposerFromSnapshot": {
        "rpcName": "StartBackgroundComposerFromSnapshot",
        "kind": "Unary"
      },
      "forkBackgroundComposer": {
        "rpcName": "ForkBackgroundComposer",
        "kind": "Unary"
      },
      "startSideChatBackgroundComposer": {
        "rpcName": "StartSideChatBackgroundComposer",
        "kind": "Unary"
      },
      "listBackgroundComposerChildren": {
        "rpcName": "ListBackgroundComposerChildren",
        "kind": "Unary"
      },
      "makePRBackgroundComposer": {
        "rpcName": "MakePRBackgroundComposer",
        "kind": "Unary"
      },
      "openPRBackgroundComposer": {
        "rpcName": "OpenPRBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerStatus": {
        "rpcName": "GetBackgroundComposerStatus",
        "kind": "Unary"
      },
      "addAsyncFollowupBackgroundComposer": {
        "rpcName": "AddAsyncFollowupBackgroundComposer",
        "kind": "Unary"
      },
      "injectBackgroundComposerContext": {
        "rpcName": "InjectBackgroundComposerContext",
        "kind": "Unary"
      },
      "submitInteractionResponseBackgroundComposer": {
        "rpcName": "SubmitInteractionResponseBackgroundComposer",
        "kind": "Unary"
      },
      "listPendingFollowups": {
        "rpcName": "ListPendingFollowups",
        "kind": "Unary"
      },
      "updatePendingFollowup": {
        "rpcName": "UpdatePendingFollowup",
        "kind": "Unary"
      },
      "deletePendingFollowup": {
        "rpcName": "DeletePendingFollowup",
        "kind": "Unary"
      },
      "reorderPendingFollowup": {
        "rpcName": "ReorderPendingFollowup",
        "kind": "Unary"
      },
      "submitPendingFollowupNow": {
        "rpcName": "SubmitPendingFollowupNow",
        "kind": "Unary"
      },
      "markFollowupEditing": {
        "rpcName": "MarkFollowupEditing",
        "kind": "Unary"
      },
      "getCursorServerUrl": {
        "rpcName": "GetCursorServerUrl",
        "kind": "Unary"
      },
      "warmCursorServerDownload": {
        "rpcName": "WarmCursorServerDownload",
        "kind": "Unary"
      },
      "preWarmPod": {
        "rpcName": "PreWarmPod",
        "kind": "Unary"
      },
      "wakeBackgroundComposer": {
        "rpcName": "WakeBackgroundComposer",
        "kind": "Unary"
      },
      "pauseBackgroundComposer": {
        "rpcName": "PauseBackgroundComposer",
        "kind": "Unary"
      },
      "cancelBackgroundComposerToolCall": {
        "rpcName": "CancelBackgroundComposerToolCall",
        "kind": "Unary"
      },
      "resumeBackgroundComposer": {
        "rpcName": "ResumeBackgroundComposer",
        "kind": "Unary"
      },
      "archiveBackgroundComposer": {
        "rpcName": "ArchiveBackgroundComposer",
        "kind": "Unary"
      },
      "archiveRepoBackgroundComposers": {
        "rpcName": "ArchiveRepoBackgroundComposers",
        "kind": "Unary"
      },
      "deleteBackgroundComposer": {
        "rpcName": "DeleteBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerInfo": {
        "rpcName": "GetBackgroundComposerInfo",
        "kind": "Unary"
      },
      "getBackgroundComposerEnvironmentVersion": {
        "rpcName": "GetBackgroundComposerEnvironmentVersion",
        "kind": "Unary"
      },
      "getEnvironmentHistory": {
        "rpcName": "GetEnvironmentHistory",
        "kind": "Unary"
      },
      "getBackgroundComposerTimings": {
        "rpcName": "GetBackgroundComposerTimings",
        "kind": "Unary"
      },
      "getBackgroundComposerRepositoryInfo": {
        "rpcName": "GetBackgroundComposerRepositoryInfo",
        "kind": "Unary"
      },
      "getMachine": {
        "rpcName": "GetMachine",
        "kind": "Unary"
      },
      "listWorkspaceFiles": {
        "rpcName": "ListWorkspaceFiles",
        "kind": "Unary"
      },
      "listDetailedBackgroundComposers": {
        "rpcName": "ListDetailedBackgroundComposers",
        "kind": "Unary"
      },
      "listCloudAgentRunsForDashboard": {
        "rpcName": "ListCloudAgentRunsForDashboard",
        "kind": "Unary"
      },
      "aggregateCloudAgentRunsForDashboard": {
        "rpcName": "AggregateCloudAgentRunsForDashboard",
        "kind": "Unary"
      },
      "getCloudAgentRunForDashboard": {
        "rpcName": "GetCloudAgentRunForDashboard",
        "kind": "Unary"
      },
      "listCloudAgentRunEventsForDashboard": {
        "rpcName": "ListCloudAgentRunEventsForDashboard",
        "kind": "Unary"
      },
      "listNamedAgents": {
        "rpcName": "ListNamedAgents",
        "kind": "Unary"
      },
      "listNamedAgentSessions": {
        "rpcName": "ListNamedAgentSessions",
        "kind": "Unary"
      },
      "listEventSubscriptions": {
        "rpcName": "ListEventSubscriptions",
        "kind": "Unary"
      },
      "closeEventSubscription": {
        "rpcName": "CloseEventSubscription",
        "kind": "Unary"
      },
      "getGithubAccessTokenForRepos": {
        "rpcName": "GetGithubAccessTokenForRepos",
        "kind": "Unary"
      },
      "makeGithubRequest": {
        "rpcName": "MakeGithubRequest",
        "kind": "Unary"
      },
      "getBackgroundComposerDiffDetails": {
        "rpcName": "GetBackgroundComposerDiffDetails",
        "kind": "Unary"
      },
      "getOptimizedDiffDetails": {
        "rpcName": "GetOptimizedDiffDetails",
        "kind": "Unary"
      },
      "listPrCodeTourRevisions": {
        "rpcName": "ListPrCodeTourRevisions",
        "kind": "Unary"
      },
      "getBackgroundComposerChangesHash": {
        "rpcName": "GetBackgroundComposerChangesHash",
        "kind": "Unary"
      },
      "getBackgroundComposerPullRequest": {
        "rpcName": "GetBackgroundComposerPullRequest",
        "kind": "Unary"
      },
      "refreshGithubAccessTokenInBackgroundComposer": {
        "rpcName": "RefreshGithubAccessTokenInBackgroundComposer",
        "kind": "Unary"
      },
      "createBackgroundComposerPod": {
        "rpcName": "CreateBackgroundComposerPod",
        "kind": "Unary"
      },
      "attachBackgroundComposerPod": {
        "rpcName": "AttachBackgroundComposerPod",
        "kind": "ServerStreaming"
      },
      "createBackgroundComposerPodSnapshot": {
        "rpcName": "CreateBackgroundComposerPodSnapshot",
        "kind": "Unary"
      },
      "changeBackgroundComposerSnapshotVisibility": {
        "rpcName": "ChangeBackgroundComposerSnapshotVisibility",
        "kind": "Unary"
      },
      "getBackgroundComposerSnapshotInfo": {
        "rpcName": "GetBackgroundComposerSnapshotInfo",
        "kind": "Unary"
      },
      "listBackgroundComposerSnapshotsByBcId": {
        "rpcName": "ListBackgroundComposerSnapshotsByBcId",
        "kind": "Unary"
      },
      "listBackgroundComposerSnapshotStatusesByBcIds": {
        "rpcName": "ListBackgroundComposerSnapshotStatusesByBcIds",
        "kind": "Unary"
      },
      "getBackgroundComposerSnapshotState": {
        "rpcName": "GetBackgroundComposerSnapshotState",
        "kind": "Unary"
      },
      "watchBackgroundComposerSnapshotState": {
        "rpcName": "WatchBackgroundComposerSnapshotState",
        "kind": "ServerStreaming"
      },
      "getBackgroundComposerConversation": {
        "rpcName": "GetBackgroundComposerConversation",
        "kind": "Unary"
      },
      "renameBackgroundComposer": {
        "rpcName": "RenameBackgroundComposer",
        "kind": "Unary"
      },
      "updateProjectAppearance": {
        "rpcName": "UpdateProjectAppearance",
        "kind": "Unary"
      },
      "publishBackgroundComposerTempRepo": {
        "rpcName": "PublishBackgroundComposerTempRepo",
        "kind": "Unary"
      },
      "reparentBackgroundComposer": {
        "rpcName": "ReparentBackgroundComposer",
        "kind": "Unary"
      },
      "setWorkerManager": {
        "rpcName": "SetWorkerManager",
        "kind": "Unary"
      },
      "createProjectWorker": {
        "rpcName": "CreateProjectWorker",
        "kind": "Unary"
      },
      "clearWorkerManager": {
        "rpcName": "ClearWorkerManager",
        "kind": "Unary"
      },
      "listWorkersForManager": {
        "rpcName": "ListWorkersForManager",
        "kind": "Unary"
      },
      "streamBackgroundComposerUpdates": {
        "rpcName": "StreamBackgroundComposerUpdates",
        "kind": "ServerStreaming"
      },
      "updateBackgroundComposerExperimentalModelOptOut": {
        "rpcName": "UpdateBackgroundComposerExperimentalModelOptOut",
        "kind": "Unary"
      },
      "commitBackgroundComposer": {
        "rpcName": "CommitBackgroundComposer",
        "kind": "Unary"
      },
      "setPersonalEnvironmentJson": {
        "rpcName": "SetPersonalEnvironmentJson",
        "kind": "Unary"
      },
      "getPersonalEnvironmentJson": {
        "rpcName": "GetPersonalEnvironmentJson",
        "kind": "Unary"
      },
      "getEnvironmentJsonCandidates": {
        "rpcName": "GetEnvironmentJsonCandidates",
        "kind": "Unary"
      },
      "listPersonalEnvironments": {
        "rpcName": "ListPersonalEnvironments",
        "kind": "Unary"
      },
      "deletePersonalEnvironmentJson": {
        "rpcName": "DeletePersonalEnvironmentJson",
        "kind": "Unary"
      },
      "publishEnvironment": {
        "rpcName": "PublishEnvironment",
        "kind": "Unary"
      },
      "publishPersonalEnvironment": {
        "rpcName": "PublishPersonalEnvironment",
        "kind": "Unary"
      },
      "listTeamEnvironments": {
        "rpcName": "ListTeamEnvironments",
        "kind": "Unary"
      },
      "deleteTeamEnvironment": {
        "rpcName": "DeleteTeamEnvironment",
        "kind": "Unary"
      },
      "setTeamEnvironmentJson": {
        "rpcName": "SetTeamEnvironmentJson",
        "kind": "Unary"
      },
      "restoreEnvironmentVersion": {
        "rpcName": "RestoreEnvironmentVersion",
        "kind": "Unary"
      },
      "listEnvironments": {
        "rpcName": "ListEnvironments",
        "kind": "Unary"
      },
      "getEnvironment": {
        "rpcName": "GetEnvironment",
        "kind": "Unary"
      },
      "renameEnvironment": {
        "rpcName": "RenameEnvironment",
        "kind": "Unary"
      },
      "listEnvironmentBuilds": {
        "rpcName": "ListEnvironmentBuilds",
        "kind": "Unary"
      },
      "getEnvironmentActiveBuild": {
        "rpcName": "GetEnvironmentActiveBuild",
        "kind": "Unary"
      },
      "getEnvironmentPersistentRecurringBuildFailures": {
        "rpcName": "GetEnvironmentPersistentRecurringBuildFailures",
        "kind": "Unary"
      },
      "getEnvironmentBuild": {
        "rpcName": "GetEnvironmentBuild",
        "kind": "Unary"
      },
      "updateEnvironmentBuild": {
        "rpcName": "UpdateEnvironmentBuild",
        "kind": "Unary"
      },
      "triggerEnvironmentBuild": {
        "rpcName": "TriggerEnvironmentBuild",
        "kind": "Unary"
      },
      "attachEnvironmentBuildLog": {
        "rpcName": "AttachEnvironmentBuildLog",
        "kind": "ServerStreaming"
      },
      "cancelEnvironmentBuild": {
        "rpcName": "CancelEnvironmentBuild",
        "kind": "Unary"
      },
      "getEnvironmentBuildSettings": {
        "rpcName": "GetEnvironmentBuildSettings",
        "kind": "Unary"
      },
      "updateEnvironmentBuildSettings": {
        "rpcName": "UpdateEnvironmentBuildSettings",
        "kind": "Unary"
      },
      "resolveOrCreateMultiRepoEnvironment": {
        "rpcName": "ResolveOrCreateMultiRepoEnvironment",
        "kind": "Unary"
      },
      "resolveOrCreateDraftEnvironment": {
        "rpcName": "ResolveOrCreateDraftEnvironment",
        "kind": "Unary"
      },
      "snapshotAndSaveEnvironment": {
        "rpcName": "SnapshotAndSaveEnvironment",
        "kind": "Unary"
      },
      "listReposWithLocalEnvironment": {
        "rpcName": "ListReposWithLocalEnvironment",
        "kind": "Unary"
      },
      "markBackgroundComposerRead": {
        "rpcName": "MarkBackgroundComposerRead",
        "kind": "Unary"
      },
      "markBackgroundComposerUnread": {
        "rpcName": "MarkBackgroundComposerUnread",
        "kind": "Unary"
      },
      "notifyBackgroundComposerShown": {
        "rpcName": "NotifyBackgroundComposerShown",
        "kind": "Unary"
      },
      "fetchBackgroundComposer": {
        "rpcName": "FetchBackgroundComposer",
        "kind": "Unary"
      },
      "getTurnSummaryBackgroundComposer": {
        "rpcName": "GetTurnSummaryBackgroundComposer",
        "kind": "Unary"
      },
      "getBackgroundComposerName": {
        "rpcName": "GetBackgroundComposerName",
        "kind": "Unary"
      },
      "getBackgroundComposerPrompt": {
        "rpcName": "GetBackgroundComposerPrompt",
        "kind": "Unary"
      },
      "readBinaryFile": {
        "rpcName": "ReadBinaryFile",
        "kind": "Unary"
      },
      "listBackgroundComposerArtifacts": {
        "rpcName": "ListBackgroundComposerArtifacts",
        "kind": "Unary"
      },
      "getBackgroundComposerArtifact": {
        "rpcName": "GetBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "getBackgroundComposerArtifactBytes": {
        "rpcName": "GetBackgroundComposerArtifactBytes",
        "kind": "Unary"
      },
      "streamBackgroundComposerArtifact": {
        "rpcName": "StreamBackgroundComposerArtifact",
        "kind": "ServerStreaming"
      },
      "listSharedBackgroundComposerArtifacts": {
        "rpcName": "ListSharedBackgroundComposerArtifacts",
        "kind": "Unary"
      },
      "shareBackgroundComposerArtifact": {
        "rpcName": "ShareBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "unshareBackgroundComposerArtifact": {
        "rpcName": "UnshareBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "getPublicBackgroundComposerArtifact": {
        "rpcName": "GetPublicBackgroundComposerArtifact",
        "kind": "Unary"
      },
      "updateBackgroundComposerUserSettings": {
        "rpcName": "UpdateBackgroundComposerUserSettings",
        "kind": "Unary"
      },
      "getBackgroundComposerUserSettings": {
        "rpcName": "GetBackgroundComposerUserSettings",
        "kind": "Unary"
      },
      "updateBackgroundComposerEnvironment": {
        "rpcName": "UpdateBackgroundComposerEnvironment",
        "kind": "Unary"
      },
      "getRepositoryBranches": {
        "rpcName": "GetRepositoryBranches",
        "kind": "Unary"
      },
      "getPullRequestMergeStatus": {
        "rpcName": "GetPullRequestMergeStatus",
        "kind": "Unary"
      },
      "getDetailedPullRequestStatus": {
        "rpcName": "GetDetailedPullRequestStatus",
        "kind": "Unary"
      },
      "checkPullRequestMergeability": {
        "rpcName": "CheckPullRequestMergeability",
        "kind": "Unary"
      },
      "getPullRequestDiscussions": {
        "rpcName": "GetPullRequestDiscussions",
        "kind": "Unary"
      },
      "getPullRequestCommits": {
        "rpcName": "GetPullRequestCommits",
        "kind": "Unary"
      },
      "getPullRequestTimelineEvents": {
        "rpcName": "GetPullRequestTimelineEvents",
        "kind": "Unary"
      },
      "replyToReviewThread": {
        "rpcName": "ReplyToReviewThread",
        "kind": "Unary"
      },
      "resolveReviewThread": {
        "rpcName": "ResolveReviewThread",
        "kind": "Unary"
      },
      "unresolveReviewThread": {
        "rpcName": "UnresolveReviewThread",
        "kind": "Unary"
      },
      "deletePullRequestReviewComment": {
        "rpcName": "DeletePullRequestReviewComment",
        "kind": "Unary"
      },
      "addPullRequestReviewComment": {
        "rpcName": "AddPullRequestReviewComment",
        "kind": "Unary"
      },
      "mergePullRequest": {
        "rpcName": "MergePullRequest",
        "kind": "Unary"
      },
      "enablePullRequestAutoMerge": {
        "rpcName": "EnablePullRequestAutoMerge",
        "kind": "Unary"
      },
      "disablePullRequestAutoMerge": {
        "rpcName": "DisablePullRequestAutoMerge",
        "kind": "Unary"
      },
      "convertPullRequestFromDraft": {
        "rpcName": "ConvertPullRequestFromDraft",
        "kind": "Unary"
      },
      "updatePullRequestBranch": {
        "rpcName": "UpdatePullRequestBranch",
        "kind": "Unary"
      },
      "registerPushNotificationToken": {
        "rpcName": "RegisterPushNotificationToken",
        "kind": "Unary"
      },
      "deletePushNotificationToken": {
        "rpcName": "DeletePushNotificationToken",
        "kind": "Unary"
      },
      "syncLiveActivity": {
        "rpcName": "SyncLiveActivity",
        "kind": "Unary"
      },
      "deleteLiveActivity": {
        "rpcName": "DeleteLiveActivity",
        "kind": "Unary"
      },
      "verifyBackgroundComposerAccess": {
        "rpcName": "VerifyBackgroundComposerAccess",
        "kind": "Unary"
      },
      "startSlackStreamingForFollowup": {
        "rpcName": "StartSlackStreamingForFollowup",
        "kind": "Unary"
      },
      "startGithubStreamingForFollowup": {
        "rpcName": "StartGithubStreamingForFollowup",
        "kind": "Unary"
      },
      "startLinearStreamingForFollowup": {
        "rpcName": "StartLinearStreamingForFollowup",
        "kind": "Unary"
      },
      "getGithubInstallations": {
        "rpcName": "GetGithubInstallations",
        "kind": "Unary"
      },
      "fetchAllInstallationRepos": {
        "rpcName": "FetchAllInstallationRepos",
        "kind": "Unary"
      },
      "getBackgroundComposerVmUsage": {
        "rpcName": "GetBackgroundComposerVmUsage",
        "kind": "Unary"
      },
      "listGrindModeComposers": {
        "rpcName": "ListGrindModeComposers",
        "kind": "Unary"
      },
      "getCloudAgentDebugDetails": {
        "rpcName": "GetCloudAgentDebugDetails",
        "kind": "Unary"
      },
      "getCloudAgentMemoryDbLogs": {
        "rpcName": "GetCloudAgentMemoryDbLogs",
        "kind": "Unary"
      },
      "createAgentShare": {
        "rpcName": "CreateAgentShare",
        "kind": "Unary"
      },
      "getAgentSharePreview": {
        "rpcName": "GetAgentSharePreview",
        "kind": "Unary"
      },
      "listPrivateWorkers": {
        "rpcName": "ListPrivateWorkers",
        "kind": "Unary"
      },
      "listPrivateWorkerPools": {
        "rpcName": "ListPrivateWorkerPools",
        "kind": "Unary"
      },
      "registerPrivateWorkerPool": {
        "rpcName": "RegisterPrivateWorkerPool",
        "kind": "Unary"
      },
      "deregisterPrivateWorkerPool": {
        "rpcName": "DeregisterPrivateWorkerPool",
        "kind": "Unary"
      },
      "adminListUserPrivateWorkers": {
        "rpcName": "AdminListUserPrivateWorkers",
        "kind": "Unary"
      },
      "adminKillBackgroundComposer": {
        "rpcName": "AdminKillBackgroundComposer",
        "kind": "Unary"
      },
      "adminListActiveBackgroundComposers": {
        "rpcName": "AdminListActiveBackgroundComposers",
        "kind": "Unary"
      },
      "adminKillAllActiveBackgroundComposers": {
        "rpcName": "AdminKillAllActiveBackgroundComposers",
        "kind": "Unary"
      },
      "listPendingPrivateWorkerRequests": {
        "rpcName": "ListPendingPrivateWorkerRequests",
        "kind": "Unary"
      },
      "streamPendingPrivateWorkerRequests": {
        "rpcName": "StreamPendingPrivateWorkerRequests",
        "kind": "ServerStreaming"
      },
      "claimPendingPrivateWorkerRequest": {
        "rpcName": "ClaimPendingPrivateWorkerRequest",
        "kind": "Unary"
      },
      "getPrivateWorkersSummary": {
        "rpcName": "GetPrivateWorkersSummary",
        "kind": "Unary"
      },
      "getPrivateWorker": {
        "rpcName": "GetPrivateWorker",
        "kind": "Unary"
      },
      "releasePrivateWorker": {
        "rpcName": "ReleasePrivateWorker",
        "kind": "Unary"
      },
      "batchRefreshPullRequestStatus": {
        "rpcName": "BatchRefreshPullRequestStatus",
        "kind": "Unary"
      },
      "listAgentStores": {
        "rpcName": "ListAgentStores",
        "kind": "Unary"
      },
      "listAgentStoreEntries": {
        "rpcName": "ListAgentStoreEntries",
        "kind": "Unary"
      },
      "readAgentStoreFile": {
        "rpcName": "ReadAgentStoreFile",
        "kind": "Unary"
      },
      "mintAgentStoreToken": {
        "rpcName": "MintAgentStoreToken",
        "kind": "Unary"
      },
      "listAgentStoreFiles": {
        "rpcName": "ListAgentStoreFiles",
        "kind": "Unary"
      },
      "listAgentStoreDirectory": {
        "rpcName": "ListAgentStoreDirectory",
        "kind": "Unary"
      },
      "presignAgentStoreReads": {
        "rpcName": "PresignAgentStoreReads",
        "kind": "Unary"
      },
      "presignAgentStoreWrites": {
        "rpcName": "PresignAgentStoreWrites",
        "kind": "Unary"
      },
      "completeAgentStoreMultipartWrites": {
        "rpcName": "CompleteAgentStoreMultipartWrites",
        "kind": "Unary"
      },
      "abortAgentStoreMultipartWrites": {
        "rpcName": "AbortAgentStoreMultipartWrites",
        "kind": "Unary"
      },
      "presignPromptUpload": {
        "rpcName": "PresignPromptUpload",
        "kind": "Unary"
      },
      "completePromptUpload": {
        "rpcName": "CompletePromptUpload",
        "kind": "Unary"
      },
      "abortPromptUpload": {
        "rpcName": "AbortPromptUpload",
        "kind": "Unary"
      },
      "acquireAgentStoreFileLock": {
        "rpcName": "AcquireAgentStoreFileLock",
        "kind": "Unary"
      },
      "renewAgentStoreFileLock": {
        "rpcName": "RenewAgentStoreFileLock",
        "kind": "Unary"
      },
      "releaseAgentStoreFileLock": {
        "rpcName": "ReleaseAgentStoreFileLock",
        "kind": "Unary"
      },
      "getAgentStoreFileLock": {
        "rpcName": "GetAgentStoreFileLock",
        "kind": "Unary"
      },
      "deleteAgentStoreFiles": {
        "rpcName": "DeleteAgentStoreFiles",
        "kind": "Unary"
      },
      "shareAgentStore": {
        "rpcName": "ShareAgentStore",
        "kind": "Unary"
      },
      "unshareAgentStore": {
        "rpcName": "UnshareAgentStore",
        "kind": "Unary"
      },
      "listSharedAgentStores": {
        "rpcName": "ListSharedAgentStores",
        "kind": "Unary"
      },
      "provisionSyntheticsServiceAccounts": {
        "rpcName": "ProvisionSyntheticsServiceAccounts",
        "kind": "Unary"
      },
      "startCloudAgentLoadTest": {
        "rpcName": "StartCloudAgentLoadTest",
        "kind": "Unary"
      },
      "ensureModelRoutingLoadTestStarted": {
        "rpcName": "EnsureModelRoutingLoadTestStarted",
        "kind": "Unary"
      },
      "cancelModelRoutingLoadTest": {
        "rpcName": "CancelModelRoutingLoadTest",
        "kind": "Unary"
      },
      "mintCustomerPrivatelinkProxyToken": {
        "rpcName": "MintCustomerPrivatelinkProxyToken",
        "kind": "Unary"
      },
      "adminListTeamNamedAgents": {
        "rpcName": "AdminListTeamNamedAgents",
        "kind": "Unary"
      },
      "adminDeleteNamedAgent": {
        "rpcName": "AdminDeleteNamedAgent",
        "kind": "Unary"
      },
      "listKeyrings": {
        "rpcName": "ListKeyrings",
        "kind": "Unary"
      },
      "getKeyring": {
        "rpcName": "GetKeyring",
        "kind": "Unary"
      },
      "createKeyring": {
        "rpcName": "CreateKeyring",
        "kind": "Unary"
      },
      "createKeyringFromTeamSecrets": {
        "rpcName": "CreateKeyringFromTeamSecrets",
        "kind": "Unary"
      },
      "copyTeamSecretsToKeyring": {
        "rpcName": "CopyTeamSecretsToKeyring",
        "kind": "Unary"
      },
      "renameKeyring": {
        "rpcName": "RenameKeyring",
        "kind": "Unary"
      },
      "deleteKeyring": {
        "rpcName": "DeleteKeyring",
        "kind": "Unary"
      },
      "listKeyringSecrets": {
        "rpcName": "ListKeyringSecrets",
        "kind": "Unary"
      },
      "createKeyringSecret": {
        "rpcName": "CreateKeyringSecret",
        "kind": "Unary"
      },
      "updateKeyringSecret": {
        "rpcName": "UpdateKeyringSecret",
        "kind": "Unary"
      },
      "revokeKeyringSecret": {
        "rpcName": "RevokeKeyringSecret",
        "kind": "Unary"
      },
      "listKeyringGrants": {
        "rpcName": "ListKeyringGrants",
        "kind": "Unary"
      },
      "grantKeyringPermissions": {
        "rpcName": "GrantKeyringPermissions",
        "kind": "Unary"
      },
      "updateKeyringPermissions": {
        "rpcName": "UpdateKeyringPermissions",
        "kind": "Unary"
      },
      "revokeKeyringPermissions": {
        "rpcName": "RevokeKeyringPermissions",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.DashboardService",
    "bundle": "electron-main.cjs",
    "methods": {
      "getTeams": {
        "rpcName": "GetTeams",
        "kind": "Unary"
      },
      "getMe": {
        "rpcName": "GetMe",
        "kind": "Unary"
      },
      "getAgenticOnboardingConfig": {
        "rpcName": "GetAgenticOnboardingConfig",
        "kind": "Unary"
      },
      "getUserOrganizations": {
        "rpcName": "GetUserOrganizations",
        "kind": "Unary"
      },
      "setUserDefaultTeam": {
        "rpcName": "SetUserDefaultTeam",
        "kind": "Unary"
      },
      "getOrganizationMembers": {
        "rpcName": "GetOrganizationMembers",
        "kind": "Unary"
      },
      "getOrganizationMember": {
        "rpcName": "GetOrganizationMember",
        "kind": "Unary"
      },
      "listOrganizationIdentityProviders": {
        "rpcName": "ListOrganizationIdentityProviders",
        "kind": "Unary"
      },
      "updateOrganizationIdentityProviderSsoSettings": {
        "rpcName": "UpdateOrganizationIdentityProviderSsoSettings",
        "kind": "Unary"
      },
      "setOrganizationIdentityProviderAllowDomainJoin": {
        "rpcName": "SetOrganizationIdentityProviderAllowDomainJoin",
        "kind": "Unary"
      },
      "addOrganizationIdentityProviderDomainJoin": {
        "rpcName": "AddOrganizationIdentityProviderDomainJoin",
        "kind": "Unary"
      },
      "removeOrganizationIdentityProviderDomainJoin": {
        "rpcName": "RemoveOrganizationIdentityProviderDomainJoin",
        "kind": "Unary"
      },
      "mergeOrganizationIdentityProvider": {
        "rpcName": "MergeOrganizationIdentityProvider",
        "kind": "Unary"
      },
      "preflightMergeOrganizationIdentityProvider": {
        "rpcName": "PreflightMergeOrganizationIdentityProvider",
        "kind": "Unary"
      },
      "getOrganizationMergeIdpRequest": {
        "rpcName": "GetOrganizationMergeIdpRequest",
        "kind": "Unary"
      },
      "listOrganizationMergeIdpRequests": {
        "rpcName": "ListOrganizationMergeIdpRequests",
        "kind": "Unary"
      },
      "moveOrganizationMemberToTeam": {
        "rpcName": "MoveOrganizationMemberToTeam",
        "kind": "Unary"
      },
      "setOrganizationMemberTeams": {
        "rpcName": "SetOrganizationMemberTeams",
        "kind": "Unary"
      },
      "bulkMoveOrganizationMembers": {
        "rpcName": "BulkMoveOrganizationMembers",
        "kind": "Unary"
      },
      "startBulkMoveOrganizationMembers": {
        "rpcName": "StartBulkMoveOrganizationMembers",
        "kind": "Unary"
      },
      "getBackgroundJob": {
        "rpcName": "GetBackgroundJob",
        "kind": "Unary"
      },
      "setOrganizationMemberRole": {
        "rpcName": "SetOrganizationMemberRole",
        "kind": "Unary"
      },
      "updateOrganization": {
        "rpcName": "UpdateOrganization",
        "kind": "Unary"
      },
      "updateOrganizationTeam": {
        "rpcName": "UpdateOrganizationTeam",
        "kind": "Unary"
      },
      "createOrganizationTeam": {
        "rpcName": "CreateOrganizationTeam",
        "kind": "Unary"
      },
      "getOrganizationTeamAdminCandidates": {
        "rpcName": "GetOrganizationTeamAdminCandidates",
        "kind": "Unary"
      },
      "getDirectoryGroups": {
        "rpcName": "GetDirectoryGroups",
        "kind": "Unary"
      },
      "updateDirectoryGroupSettings": {
        "rpcName": "UpdateDirectoryGroupSettings",
        "kind": "Unary"
      },
      "getOrganizationGroups": {
        "rpcName": "GetOrganizationGroups",
        "kind": "Unary"
      },
      "getOrganizationGroup": {
        "rpcName": "GetOrganizationGroup",
        "kind": "Unary"
      },
      "getOrganizationGroupMembers": {
        "rpcName": "GetOrganizationGroupMembers",
        "kind": "Unary"
      },
      "createOrganizationGroup": {
        "rpcName": "CreateOrganizationGroup",
        "kind": "Unary"
      },
      "updateOrganizationGroup": {
        "rpcName": "UpdateOrganizationGroup",
        "kind": "Unary"
      },
      "deleteOrganizationGroup": {
        "rpcName": "DeleteOrganizationGroup",
        "kind": "Unary"
      },
      "addOrganizationGroupMembers": {
        "rpcName": "AddOrganizationGroupMembers",
        "kind": "Unary"
      },
      "removeOrganizationGroupMembers": {
        "rpcName": "RemoveOrganizationGroupMembers",
        "kind": "Unary"
      },
      "updateOrganizationGroupMember": {
        "rpcName": "UpdateOrganizationGroupMember",
        "kind": "Unary"
      },
      "getOrganizationGroupAutorunSettings": {
        "rpcName": "GetOrganizationGroupAutorunSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupAutorunSettings": {
        "rpcName": "UpdateOrganizationGroupAutorunSettings",
        "kind": "Unary"
      },
      "getOrganizationGroupModelAllowlist": {
        "rpcName": "GetOrganizationGroupModelAllowlist",
        "kind": "Unary"
      },
      "updateOrganizationGroupModelAllowlist": {
        "rpcName": "UpdateOrganizationGroupModelAllowlist",
        "kind": "Unary"
      },
      "getOrganizationGroupAutoReviewSettings": {
        "rpcName": "GetOrganizationGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupAutoReviewSettings": {
        "rpcName": "UpdateOrganizationGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "getOrganizationGroupSmartAutoSettings": {
        "rpcName": "GetOrganizationGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupSmartAutoSettings": {
        "rpcName": "UpdateOrganizationGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "createOrganizationGroupAnthropicCyberEnrollmentUrl": {
        "rpcName": "CreateOrganizationGroupAnthropicCyberEnrollmentUrl",
        "kind": "Unary"
      },
      "getTeamGroups": {
        "rpcName": "GetTeamGroups",
        "kind": "Unary"
      },
      "getTeamGroup": {
        "rpcName": "GetTeamGroup",
        "kind": "Unary"
      },
      "getTeamGroupMembers": {
        "rpcName": "GetTeamGroupMembers",
        "kind": "Unary"
      },
      "createTeamGroup": {
        "rpcName": "CreateTeamGroup",
        "kind": "Unary"
      },
      "updateTeamGroup": {
        "rpcName": "UpdateTeamGroup",
        "kind": "Unary"
      },
      "deleteTeamGroup": {
        "rpcName": "DeleteTeamGroup",
        "kind": "Unary"
      },
      "addTeamGroupMembers": {
        "rpcName": "AddTeamGroupMembers",
        "kind": "Unary"
      },
      "removeTeamGroupMembers": {
        "rpcName": "RemoveTeamGroupMembers",
        "kind": "Unary"
      },
      "updateTeamGroupMember": {
        "rpcName": "UpdateTeamGroupMember",
        "kind": "Unary"
      },
      "getTeamGroupAutorunSettings": {
        "rpcName": "GetTeamGroupAutorunSettings",
        "kind": "Unary"
      },
      "updateTeamGroupAutorunSettings": {
        "rpcName": "UpdateTeamGroupAutorunSettings",
        "kind": "Unary"
      },
      "getTeamGroupModelAllowlist": {
        "rpcName": "GetTeamGroupModelAllowlist",
        "kind": "Unary"
      },
      "updateTeamGroupModelAllowlist": {
        "rpcName": "UpdateTeamGroupModelAllowlist",
        "kind": "Unary"
      },
      "getTeamGroupAutoReviewSettings": {
        "rpcName": "GetTeamGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "updateTeamGroupAutoReviewSettings": {
        "rpcName": "UpdateTeamGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "getTeamSandNetworkSettings": {
        "rpcName": "GetTeamSandNetworkSettings",
        "kind": "Unary"
      },
      "updateTeamSandNetworkSettings": {
        "rpcName": "UpdateTeamSandNetworkSettings",
        "kind": "Unary"
      },
      "getTeamGroupSandNetworkSettings": {
        "rpcName": "GetTeamGroupSandNetworkSettings",
        "kind": "Unary"
      },
      "updateTeamGroupSandNetworkSettings": {
        "rpcName": "UpdateTeamGroupSandNetworkSettings",
        "kind": "Unary"
      },
      "getTeamGroupSmartAutoSettings": {
        "rpcName": "GetTeamGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "updateTeamGroupSmartAutoSettings": {
        "rpcName": "UpdateTeamGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "createTeamGroupAnthropicCyberEnrollmentUrl": {
        "rpcName": "CreateTeamGroupAnthropicCyberEnrollmentUrl",
        "kind": "Unary"
      },
      "listTeamGroupScimDirectories": {
        "rpcName": "ListTeamGroupScimDirectories",
        "kind": "Unary"
      },
      "listTeamGroupScimGroupsFromUpstream": {
        "rpcName": "ListTeamGroupScimGroupsFromUpstream",
        "kind": "Unary"
      },
      "listTeamGroupScimTargetMappings": {
        "rpcName": "ListTeamGroupScimTargetMappings",
        "kind": "Unary"
      },
      "createTeamGroupScimTargetMapping": {
        "rpcName": "CreateTeamGroupScimTargetMapping",
        "kind": "Unary"
      },
      "deleteTeamGroupScimTargetMapping": {
        "rpcName": "DeleteTeamGroupScimTargetMapping",
        "kind": "Unary"
      },
      "getGroups": {
        "rpcName": "GetGroups",
        "kind": "Unary"
      },
      "getGroupMembers": {
        "rpcName": "GetGroupMembers",
        "kind": "Unary"
      },
      "createGroup": {
        "rpcName": "CreateGroup",
        "kind": "Unary"
      },
      "updateGroup": {
        "rpcName": "UpdateGroup",
        "kind": "Unary"
      },
      "deleteGroup": {
        "rpcName": "DeleteGroup",
        "kind": "Unary"
      },
      "addGroupMembers": {
        "rpcName": "AddGroupMembers",
        "kind": "Unary"
      },
      "removeGroupMembers": {
        "rpcName": "RemoveGroupMembers",
        "kind": "Unary"
      },
      "bulkAssignGroupMembers": {
        "rpcName": "BulkAssignGroupMembers",
        "kind": "Unary"
      },
      "previewAttachGroupToDirectory": {
        "rpcName": "PreviewAttachGroupToDirectory",
        "kind": "Unary"
      },
      "detachGroupFromDirectory": {
        "rpcName": "DetachGroupFromDirectory",
        "kind": "Unary"
      },
      "getScimConflicts": {
        "rpcName": "GetScimConflicts",
        "kind": "Unary"
      },
      "listScimDirectories": {
        "rpcName": "ListScimDirectories",
        "kind": "Unary"
      },
      "getOrganizationScimConfigurationLinks": {
        "rpcName": "GetOrganizationScimConfigurationLinks",
        "kind": "Unary"
      },
      "createScimDirectory": {
        "rpcName": "CreateScimDirectory",
        "kind": "Unary"
      },
      "updateScimDirectorySyncSettings": {
        "rpcName": "UpdateScimDirectorySyncSettings",
        "kind": "Unary"
      },
      "deleteScimDirectory": {
        "rpcName": "DeleteScimDirectory",
        "kind": "Unary"
      },
      "listScimGroupsFromUpstream": {
        "rpcName": "ListScimGroupsFromUpstream",
        "kind": "Unary"
      },
      "listScimTargetMappings": {
        "rpcName": "ListScimTargetMappings",
        "kind": "Unary"
      },
      "listOrganizationGroupTargetMappings": {
        "rpcName": "ListOrganizationGroupTargetMappings",
        "kind": "Unary"
      },
      "createScimTargetMapping": {
        "rpcName": "CreateScimTargetMapping",
        "kind": "Unary"
      },
      "deleteScimTargetMapping": {
        "rpcName": "DeleteScimTargetMapping",
        "kind": "Unary"
      },
      "getActivationCheckoutUrl": {
        "rpcName": "GetActivationCheckoutUrl",
        "kind": "Unary"
      },
      "checkPromotionEligibility": {
        "rpcName": "CheckPromotionEligibility",
        "kind": "Unary"
      },
      "activatePromotion": {
        "rpcName": "ActivatePromotion",
        "kind": "Unary"
      },
      "getTeamCustomerPortalUrl": {
        "rpcName": "GetTeamCustomerPortalUrl",
        "kind": "Unary"
      },
      "cancelPendingTeamSubscriptionNow": {
        "rpcName": "CancelPendingTeamSubscriptionNow",
        "kind": "Unary"
      },
      "createPendingTeamProCheckout": {
        "rpcName": "CreatePendingTeamProCheckout",
        "kind": "Unary"
      },
      "getTeamMembers": {
        "rpcName": "GetTeamMembers",
        "kind": "Unary"
      },
      "sendTeamInvite": {
        "rpcName": "SendTeamInvite",
        "kind": "Unary"
      },
      "getTeamInviteLink": {
        "rpcName": "GetTeamInviteLink",
        "kind": "Unary"
      },
      "acceptInvite": {
        "rpcName": "AcceptInvite",
        "kind": "Unary"
      },
      "getTeamInviteMetadata": {
        "rpcName": "GetTeamInviteMetadata",
        "kind": "Unary"
      },
      "listContactImportConnections": {
        "rpcName": "ListContactImportConnections",
        "kind": "Unary"
      },
      "getGoogleContactImportAuthUrl": {
        "rpcName": "GetGoogleContactImportAuthUrl",
        "kind": "Unary"
      },
      "connectGoogleContactImportCallback": {
        "rpcName": "ConnectGoogleContactImportCallback",
        "kind": "Unary"
      },
      "listContactImportContacts": {
        "rpcName": "ListContactImportContacts",
        "kind": "Unary"
      },
      "getContactImportAvatar": {
        "rpcName": "GetContactImportAvatar",
        "kind": "Unary"
      },
      "disconnectContactImportConnection": {
        "rpcName": "DisconnectContactImportConnection",
        "kind": "Unary"
      },
      "createTeam": {
        "rpcName": "CreateTeam",
        "kind": "Unary"
      },
      "getJoinableTeamsByDomain": {
        "rpcName": "GetJoinableTeamsByDomain",
        "kind": "Unary"
      },
      "joinTeamByDomain": {
        "rpcName": "JoinTeamByDomain",
        "kind": "Unary"
      },
      "updateTeamDomainJoinSetting": {
        "rpcName": "UpdateTeamDomainJoinSetting",
        "kind": "Unary"
      },
      "getTeamMemberDomains": {
        "rpcName": "GetTeamMemberDomains",
        "kind": "Unary"
      },
      "getTeamIdForReactivation": {
        "rpcName": "GetTeamIdForReactivation",
        "kind": "Unary"
      },
      "changeSeat": {
        "rpcName": "ChangeSeat",
        "kind": "Unary"
      },
      "changeTeamSubscription": {
        "rpcName": "ChangeTeamSubscription",
        "kind": "Unary"
      },
      "connectGithubCallback": {
        "rpcName": "ConnectGithubCallback",
        "kind": "Unary"
      },
      "registerGithubCursorCode": {
        "rpcName": "RegisterGithubCursorCode",
        "kind": "Unary"
      },
      "prepareGithubConnectFlow": {
        "rpcName": "PrepareGithubConnectFlow",
        "kind": "Unary"
      },
      "completeGithubConnectFlow": {
        "rpcName": "CompleteGithubConnectFlow",
        "kind": "Unary"
      },
      "disconnectGithub": {
        "rpcName": "DisconnectGithub",
        "kind": "Unary"
      },
      "prepareSetupGithubEnterpriseApp": {
        "rpcName": "PrepareSetupGithubEnterpriseApp",
        "kind": "Unary"
      },
      "finishSetupGithubEnterpriseApp": {
        "rpcName": "FinishSetupGithubEnterpriseApp",
        "kind": "Unary"
      },
      "listGithubEnterpriseApps": {
        "rpcName": "ListGithubEnterpriseApps",
        "kind": "Unary"
      },
      "deleteGithubEnterpriseApp": {
        "rpcName": "DeleteGithubEnterpriseApp",
        "kind": "Unary"
      },
      "setupGitlabEnterpriseInstance": {
        "rpcName": "SetupGitlabEnterpriseInstance",
        "kind": "Unary"
      },
      "listGitlabEnterpriseInstances": {
        "rpcName": "ListGitlabEnterpriseInstances",
        "kind": "Unary"
      },
      "setGitlabEnterpriseHostControlledServiceAccountToken": {
        "rpcName": "SetGitlabEnterpriseHostControlledServiceAccountToken",
        "kind": "Unary"
      },
      "rotateGitlabEnterpriseWebhookSecret": {
        "rpcName": "RotateGitlabEnterpriseWebhookSecret",
        "kind": "Unary"
      },
      "deleteGitlabEnterpriseInstance": {
        "rpcName": "DeleteGitlabEnterpriseInstance",
        "kind": "Unary"
      },
      "setupBitbucketServerInstance": {
        "rpcName": "SetupBitbucketServerInstance",
        "kind": "Unary"
      },
      "listBitbucketServerInstances": {
        "rpcName": "ListBitbucketServerInstances",
        "kind": "Unary"
      },
      "updateBitbucketServerInstanceToken": {
        "rpcName": "UpdateBitbucketServerInstanceToken",
        "kind": "Unary"
      },
      "deleteBitbucketServerInstance": {
        "rpcName": "DeleteBitbucketServerInstance",
        "kind": "Unary"
      },
      "syncGitlabRepos": {
        "rpcName": "SyncGitlabRepos",
        "kind": "Unary"
      },
      "getGitlabReposSyncStatus": {
        "rpcName": "GetGitlabReposSyncStatus",
        "kind": "Unary"
      },
      "updateRole": {
        "rpcName": "UpdateRole",
        "kind": "Unary"
      },
      "removeMember": {
        "rpcName": "RemoveMember",
        "kind": "Unary"
      },
      "getMemberRemovalInsights": {
        "rpcName": "GetMemberRemovalInsights",
        "kind": "Unary"
      },
      "getSignUpType": {
        "rpcName": "GetSignUpType",
        "kind": "Unary"
      },
      "getHardLimit": {
        "rpcName": "GetHardLimit",
        "kind": "Unary"
      },
      "setHardLimit": {
        "rpcName": "SetHardLimit",
        "kind": "Unary"
      },
      "getSpendLimitPolicy": {
        "rpcName": "GetSpendLimitPolicy",
        "kind": "Unary"
      },
      "setSpendLimitPolicy": {
        "rpcName": "SetSpendLimitPolicy",
        "kind": "Unary"
      },
      "getOrgTeamBudgets": {
        "rpcName": "GetOrgTeamBudgets",
        "kind": "Unary"
      },
      "setOrgTeamBudget": {
        "rpcName": "SetOrgTeamBudget",
        "kind": "Unary"
      },
      "getOrgDailySpendByCategory": {
        "rpcName": "GetOrgDailySpendByCategory",
        "kind": "Unary"
      },
      "enableOnDemandSpend": {
        "rpcName": "EnableOnDemandSpend",
        "kind": "Unary"
      },
      "deleteAccount": {
        "rpcName": "DeleteAccount",
        "kind": "Unary"
      },
      "sendDownloadEmail": {
        "rpcName": "SendDownloadEmail",
        "kind": "Unary"
      },
      "getMonthlyInvoice": {
        "rpcName": "GetMonthlyInvoice",
        "kind": "Unary"
      },
      "listInvoiceCycles": {
        "rpcName": "ListInvoiceCycles",
        "kind": "Unary"
      },
      "getDailySpendByCategory": {
        "rpcName": "GetDailySpendByCategory",
        "kind": "Unary"
      },
      "getPricingHistory": {
        "rpcName": "GetPricingHistory",
        "kind": "Unary"
      },
      "listBackgroundComposerSecrets": {
        "rpcName": "ListBackgroundComposerSecrets",
        "kind": "Unary"
      },
      "createBackgroundComposerSecret": {
        "rpcName": "CreateBackgroundComposerSecret",
        "kind": "Unary"
      },
      "createBackgroundComposerSecretBatch": {
        "rpcName": "CreateBackgroundComposerSecretBatch",
        "kind": "Unary"
      },
      "revokeBackgroundComposerSecret": {
        "rpcName": "RevokeBackgroundComposerSecret",
        "kind": "Unary"
      },
      "updateBackgroundComposerSecret": {
        "rpcName": "UpdateBackgroundComposerSecret",
        "kind": "Unary"
      },
      "getMcpConfig": {
        "rpcName": "GetMcpConfig",
        "kind": "Unary"
      },
      "getEffectiveMcpConfigForUser": {
        "rpcName": "GetEffectiveMcpConfigForUser",
        "kind": "Unary"
      },
      "getAvailableMcpServers": {
        "rpcName": "GetAvailableMcpServers",
        "kind": "Unary"
      },
      "getMcpServerUsageSummary": {
        "rpcName": "GetMcpServerUsageSummary",
        "kind": "Unary"
      },
      "setMcpConfig": {
        "rpcName": "SetMcpConfig",
        "kind": "Unary"
      },
      "updateUserDefaultMcpSettings": {
        "rpcName": "UpdateUserDefaultMcpSettings",
        "kind": "Unary"
      },
      "markMcpServersSeen": {
        "rpcName": "MarkMcpServersSeen",
        "kind": "Unary"
      },
      "storeMcpOAuthToken": {
        "rpcName": "StoreMcpOAuthToken",
        "kind": "Unary"
      },
      "getMcpOAuthTokens": {
        "rpcName": "GetMcpOAuthTokens",
        "kind": "Unary"
      },
      "listSandMcpTools": {
        "rpcName": "ListSandMcpTools",
        "kind": "Unary"
      },
      "executeSandMcpTool": {
        "rpcName": "ExecuteSandMcpTool",
        "kind": "Unary"
      },
      "classifySandAutoReview": {
        "rpcName": "ClassifySandAutoReview",
        "kind": "Unary"
      },
      "recordSandAuditEvents": {
        "rpcName": "RecordSandAuditEvents",
        "kind": "Unary"
      },
      "mcpOAuthRefreshLockBegin": {
        "rpcName": "McpOAuthRefreshLockBegin",
        "kind": "Unary"
      },
      "mcpOAuthRefreshLockRelease": {
        "rpcName": "McpOAuthRefreshLockRelease",
        "kind": "Unary"
      },
      "deleteMcpOAuthToken": {
        "rpcName": "DeleteMcpOAuthToken",
        "kind": "Unary"
      },
      "validateMcpOAuthTokens": {
        "rpcName": "ValidateMcpOAuthTokens",
        "kind": "Unary"
      },
      "checkHttpMcpStatus": {
        "rpcName": "CheckHttpMcpStatus",
        "kind": "Unary"
      },
      "storeMcpOAuthPendingState": {
        "rpcName": "StoreMcpOAuthPendingState",
        "kind": "Unary"
      },
      "getMcpOAuthPendingState": {
        "rpcName": "GetMcpOAuthPendingState",
        "kind": "Unary"
      },
      "renameMcpOAuthAccount": {
        "rpcName": "RenameMcpOAuthAccount",
        "kind": "Unary"
      },
      "deleteMcpOAuthAccount": {
        "rpcName": "DeleteMcpOAuthAccount",
        "kind": "Unary"
      },
      "completeMcpOAuth": {
        "rpcName": "CompleteMcpOAuth",
        "kind": "Unary"
      },
      "getPluginMcpConfig": {
        "rpcName": "GetPluginMcpConfig",
        "kind": "Unary"
      },
      "batchGetPluginMcpConfig": {
        "rpcName": "BatchGetPluginMcpConfig",
        "kind": "Unary"
      },
      "addMcpServersFromPlugin": {
        "rpcName": "AddMcpServersFromPlugin",
        "kind": "Unary"
      },
      "moveUserMcpServerToTeam": {
        "rpcName": "MoveUserMcpServerToTeam",
        "kind": "Unary"
      },
      "migrateTeamMcpServersToDefaultMarketplace": {
        "rpcName": "MigrateTeamMcpServersToDefaultMarketplace",
        "kind": "Unary"
      },
      "probeMcpUrl": {
        "rpcName": "ProbeMcpUrl",
        "kind": "Unary"
      },
      "createTeamWithFreeTrial": {
        "rpcName": "CreateTeamWithFreeTrial",
        "kind": "Unary"
      },
      "createTeamWithOrg": {
        "rpcName": "CreateTeamWithOrg",
        "kind": "Unary"
      },
      "getTeamHasValidPaymentMethod": {
        "rpcName": "GetTeamHasValidPaymentMethod",
        "kind": "Unary"
      },
      "getTeamPrivacyModeForced": {
        "rpcName": "GetTeamPrivacyModeForced",
        "kind": "Unary"
      },
      "switchTeamPrivacyMode": {
        "rpcName": "SwitchTeamPrivacyMode",
        "kind": "Unary"
      },
      "updateFastRequests": {
        "rpcName": "UpdateFastRequests",
        "kind": "Unary"
      },
      "getFastRequests": {
        "rpcName": "GetFastRequests",
        "kind": "Unary"
      },
      "getDownloadLink": {
        "rpcName": "GetDownloadLink",
        "kind": "Unary"
      },
      "getCliDownloadUrl": {
        "rpcName": "GetCliDownloadUrl",
        "kind": "Unary"
      },
      "getSsoConfigurationLinks": {
        "rpcName": "GetSsoConfigurationLinks",
        "kind": "Unary"
      },
      "getScimConfigurationLinks": {
        "rpcName": "GetScimConfigurationLinks",
        "kind": "Unary"
      },
      "setAdminOnlyUsagePricing": {
        "rpcName": "SetAdminOnlyUsagePricing",
        "kind": "Unary"
      },
      "getYearlyUpgradeEligibility": {
        "rpcName": "GetYearlyUpgradeEligibility",
        "kind": "Unary"
      },
      "upgradeToYearly": {
        "rpcName": "UpgradeToYearly",
        "kind": "Unary"
      },
      "getEnterpriseCTAEligibility": {
        "rpcName": "GetEnterpriseCTAEligibility",
        "kind": "Unary"
      },
      "getUsageBasedPremiumRequests": {
        "rpcName": "GetUsageBasedPremiumRequests",
        "kind": "Unary"
      },
      "setUsageBasedPremiumRequests": {
        "rpcName": "SetUsageBasedPremiumRequests",
        "kind": "Unary"
      },
      "getReferrals": {
        "rpcName": "GetReferrals",
        "kind": "Unary"
      },
      "getReferralCodes": {
        "rpcName": "GetReferralCodes",
        "kind": "Unary"
      },
      "checkReferralAllowlist": {
        "rpcName": "CheckReferralAllowlist",
        "kind": "Unary"
      },
      "checkReferralCode": {
        "rpcName": "CheckReferralCode",
        "kind": "Unary"
      },
      "redeemGiftCode": {
        "rpcName": "RedeemGiftCode",
        "kind": "Unary"
      },
      "getEventCodeInfo": {
        "rpcName": "GetEventCodeInfo",
        "kind": "Unary"
      },
      "redeemEventCode": {
        "rpcName": "RedeemEventCode",
        "kind": "Unary"
      },
      "getTeamRepos": {
        "rpcName": "GetTeamRepos",
        "kind": "Unary"
      },
      "getTeamReposOrEmptyIfNotInTeam": {
        "rpcName": "GetTeamReposOrEmptyIfNotInTeam",
        "kind": "Unary"
      },
      "getTeamRules": {
        "rpcName": "GetTeamRules",
        "kind": "Unary"
      },
      "createTeamRule": {
        "rpcName": "CreateTeamRule",
        "kind": "Unary"
      },
      "updateTeamRule": {
        "rpcName": "UpdateTeamRule",
        "kind": "Unary"
      },
      "deleteTeamRule": {
        "rpcName": "DeleteTeamRule",
        "kind": "Unary"
      },
      "getTeamHooks": {
        "rpcName": "GetTeamHooks",
        "kind": "Unary"
      },
      "createTeamHook": {
        "rpcName": "CreateTeamHook",
        "kind": "Unary"
      },
      "updateTeamHook": {
        "rpcName": "UpdateTeamHook",
        "kind": "Unary"
      },
      "deleteTeamHook": {
        "rpcName": "DeleteTeamHook",
        "kind": "Unary"
      },
      "getTeamCommands": {
        "rpcName": "GetTeamCommands",
        "kind": "Unary"
      },
      "createTeamCommand": {
        "rpcName": "CreateTeamCommand",
        "kind": "Unary"
      },
      "updateTeamCommand": {
        "rpcName": "UpdateTeamCommand",
        "kind": "Unary"
      },
      "deleteTeamCommand": {
        "rpcName": "DeleteTeamCommand",
        "kind": "Unary"
      },
      "getGlobalCommands": {
        "rpcName": "GetGlobalCommands",
        "kind": "Unary"
      },
      "getRepoSlashCommands": {
        "rpcName": "GetRepoSlashCommands",
        "kind": "Unary"
      },
      "getBackgroundComposerSlashCommands": {
        "rpcName": "GetBackgroundComposerSlashCommands",
        "kind": "Unary"
      },
      "getCloudAgentPluginsSnapshot": {
        "rpcName": "GetCloudAgentPluginsSnapshot",
        "kind": "Unary"
      },
      "getBugbotTeamRules": {
        "rpcName": "GetBugbotTeamRules",
        "kind": "Unary"
      },
      "createBugbotTeamRule": {
        "rpcName": "CreateBugbotTeamRule",
        "kind": "Unary"
      },
      "updateBugbotTeamRule": {
        "rpcName": "UpdateBugbotTeamRule",
        "kind": "Unary"
      },
      "deleteBugbotTeamRule": {
        "rpcName": "DeleteBugbotTeamRule",
        "kind": "Unary"
      },
      "getBugbotLearnedRules": {
        "rpcName": "GetBugbotLearnedRules",
        "kind": "Unary"
      },
      "updateBugbotLearnedRule": {
        "rpcName": "UpdateBugbotLearnedRule",
        "kind": "Unary"
      },
      "deleteBugbotLearnedRule": {
        "rpcName": "DeleteBugbotLearnedRule",
        "kind": "Unary"
      },
      "createBugbotManualRepositoryRule": {
        "rpcName": "CreateBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "getBugbotManualRepositoryRules": {
        "rpcName": "GetBugbotManualRepositoryRules",
        "kind": "Unary"
      },
      "updateBugbotManualRepositoryRule": {
        "rpcName": "UpdateBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "deleteBugbotManualRepositoryRule": {
        "rpcName": "DeleteBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "runDiamondToBugbotMigration": {
        "rpcName": "RunDiamondToBugbotMigration",
        "kind": "Unary"
      },
      "getBugbotRuleAnalytics": {
        "rpcName": "GetBugbotRuleAnalytics",
        "kind": "Unary"
      },
      "getBugbotRuleById": {
        "rpcName": "GetBugbotRuleById",
        "kind": "Unary"
      },
      "createTeamRepo": {
        "rpcName": "CreateTeamRepo",
        "kind": "Unary"
      },
      "deleteTeamRepo": {
        "rpcName": "DeleteTeamRepo",
        "kind": "Unary"
      },
      "addRepoPattern": {
        "rpcName": "AddRepoPattern",
        "kind": "Unary"
      },
      "removeRepoPattern": {
        "rpcName": "RemoveRepoPattern",
        "kind": "Unary"
      },
      "setTeamRepoType": {
        "rpcName": "SetTeamRepoType",
        "kind": "Unary"
      },
      "getTeamAdminSettings": {
        "rpcName": "GetTeamAdminSettings",
        "kind": "Unary"
      },
      "getTeamAdminSettingsOrEmptyIfNotInTeam": {
        "rpcName": "GetTeamAdminSettingsOrEmptyIfNotInTeam",
        "kind": "Unary"
      },
      "getBaseTeamAdminSettings": {
        "rpcName": "GetBaseTeamAdminSettings",
        "kind": "Unary"
      },
      "updateTeamAdminSettings": {
        "rpcName": "UpdateTeamAdminSettings",
        "kind": "Unary"
      },
      "getTeamCustomerTelemetryDestinations": {
        "rpcName": "GetTeamCustomerTelemetryDestinations",
        "kind": "Unary"
      },
      "createTeamCustomerTelemetryDestination": {
        "rpcName": "CreateTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "updateTeamCustomerTelemetryDestination": {
        "rpcName": "UpdateTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "deleteTeamCustomerTelemetryDestination": {
        "rpcName": "DeleteTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "testTeamCustomerTelemetryDestinationConnection": {
        "rpcName": "TestTeamCustomerTelemetryDestinationConnection",
        "kind": "Unary"
      },
      "getTeamCustomerTelemetryDestinationHealth": {
        "rpcName": "GetTeamCustomerTelemetryDestinationHealth",
        "kind": "Unary"
      },
      "getTeamLlmGatewayCredentialStatus": {
        "rpcName": "GetTeamLlmGatewayCredentialStatus",
        "kind": "Unary"
      },
      "setTeamLlmGatewayCredential": {
        "rpcName": "SetTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "replaceTeamLlmGatewayCredential": {
        "rpcName": "ReplaceTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "clearTeamLlmGatewayCredential": {
        "rpcName": "ClearTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "setTeamNoZdrModelConsent": {
        "rpcName": "SetTeamNoZdrModelConsent",
        "kind": "Unary"
      },
      "setOrganizationNoZdrModelConsent": {
        "rpcName": "SetOrganizationNoZdrModelConsent",
        "kind": "Unary"
      },
      "getOrganizationOnDemandSpendDisabled": {
        "rpcName": "GetOrganizationOnDemandSpendDisabled",
        "kind": "Unary"
      },
      "setOrganizationOnDemandSpendDisabled": {
        "rpcName": "SetOrganizationOnDemandSpendDisabled",
        "kind": "Unary"
      },
      "setUserNoZdrModelConsent": {
        "rpcName": "SetUserNoZdrModelConsent",
        "kind": "Unary"
      },
      "setTeamMemberNoZdrModelConsent": {
        "rpcName": "SetTeamMemberNoZdrModelConsent",
        "kind": "Unary"
      },
      "getNoZdrModelConsentStatus": {
        "rpcName": "GetNoZdrModelConsentStatus",
        "kind": "Unary"
      },
      "updateTeamInviteLinkTTLSetting": {
        "rpcName": "UpdateTeamInviteLinkTTLSetting",
        "kind": "Unary"
      },
      "updateTeamMemberInviteSetting": {
        "rpcName": "UpdateTeamMemberInviteSetting",
        "kind": "Unary"
      },
      "updateTeamSandOnboardingCompleted": {
        "rpcName": "UpdateTeamSandOnboardingCompleted",
        "kind": "Unary"
      },
      "markTeamSandOnboardingSeen": {
        "rpcName": "MarkTeamSandOnboardingSeen",
        "kind": "Unary"
      },
      "getProtectedGitScopes": {
        "rpcName": "GetProtectedGitScopes",
        "kind": "Unary"
      },
      "createProtectedGitScope": {
        "rpcName": "CreateProtectedGitScope",
        "kind": "Unary"
      },
      "deleteProtectedGitScope": {
        "rpcName": "DeleteProtectedGitScope",
        "kind": "Unary"
      },
      "createTeamFreeTrialCode": {
        "rpcName": "CreateTeamFreeTrialCode",
        "kind": "Unary"
      },
      "createTeamFreeTrialCodeInternal": {
        "rpcName": "CreateTeamFreeTrialCodeInternal",
        "kind": "Unary"
      },
      "setTrialSpendLimitOverrideInternal": {
        "rpcName": "SetTrialSpendLimitOverrideInternal",
        "kind": "Unary"
      },
      "getTrialSpendLimitInternal": {
        "rpcName": "GetTrialSpendLimitInternal",
        "kind": "Unary"
      },
      "getTeamAnalytics": {
        "rpcName": "GetTeamAnalytics",
        "kind": "Unary"
      },
      "getUserAnalytics": {
        "rpcName": "GetUserAnalytics",
        "kind": "Unary"
      },
      "getTeamRawData": {
        "rpcName": "GetTeamRawData",
        "kind": "Unary"
      },
      "getClientUsageData": {
        "rpcName": "GetClientUsageData",
        "kind": "Unary"
      },
      "getCurrentPeriodUsage": {
        "rpcName": "GetCurrentPeriodUsage",
        "kind": "Unary"
      },
      "useSandBankedReset": {
        "rpcName": "UseSandBankedReset",
        "kind": "Unary"
      },
      "listSandBankedResets": {
        "rpcName": "ListSandBankedResets",
        "kind": "Unary"
      },
      "getSandUsageStatus": {
        "rpcName": "GetSandUsageStatus",
        "kind": "Unary"
      },
      "startSandTrial": {
        "rpcName": "StartSandTrial",
        "kind": "Unary"
      },
      "isEligibleForSandTrial": {
        "rpcName": "IsEligibleForSandTrial",
        "kind": "Unary"
      },
      "getSandTrialClaimStatus": {
        "rpcName": "GetSandTrialClaimStatus",
        "kind": "Unary"
      },
      "cancelSandTrial": {
        "rpcName": "CancelSandTrial",
        "kind": "Unary"
      },
      "getSandAccessStatus": {
        "rpcName": "GetSandAccessStatus",
        "kind": "Unary"
      },
      "registerSandMachine": {
        "rpcName": "RegisterSandMachine",
        "kind": "Unary"
      },
      "listSandMachines": {
        "rpcName": "ListSandMachines",
        "kind": "Unary"
      },
      "updateSandMachineLabel": {
        "rpcName": "UpdateSandMachineLabel",
        "kind": "Unary"
      },
      "requestSandTeamAccess": {
        "rpcName": "RequestSandTeamAccess",
        "kind": "Unary"
      },
      "listPendingUserAccessRequests": {
        "rpcName": "ListPendingUserAccessRequests",
        "kind": "Unary"
      },
      "getUsageSignalsProjectionSnapshot": {
        "rpcName": "GetUsageSignalsProjectionSnapshot",
        "kind": "Unary"
      },
      "getPlanInfo": {
        "rpcName": "GetPlanInfo",
        "kind": "Unary"
      },
      "verifyAppleTransaction": {
        "rpcName": "VerifyAppleTransaction",
        "kind": "Unary"
      },
      "getCursorReviewEntitlement": {
        "rpcName": "GetCursorReviewEntitlement",
        "kind": "Unary"
      },
      "getUsageLimitPolicyStatus": {
        "rpcName": "GetUsageLimitPolicyStatus",
        "kind": "Unary"
      },
      "getUsageLimitStatusAndActiveGrants": {
        "rpcName": "GetUsageLimitStatusAndActiveGrants",
        "kind": "Unary"
      },
      "getCreditGrantsBalance": {
        "rpcName": "GetCreditGrantsBalance",
        "kind": "Unary"
      },
      "getClientVisibleCreditGrants": {
        "rpcName": "GetClientVisibleCreditGrants",
        "kind": "Unary"
      },
      "getAdvancedAnalyticsEnabled": {
        "rpcName": "GetAdvancedAnalyticsEnabled",
        "kind": "Unary"
      },
      "getTokenUsage": {
        "rpcName": "GetTokenUsage",
        "kind": "Unary"
      },
      "validateBedrockIamRole": {
        "rpcName": "ValidateBedrockIamRole",
        "kind": "Unary"
      },
      "getTeamSpend": {
        "rpcName": "GetTeamSpend",
        "kind": "Unary"
      },
      "getTeamSeatUpgradeRecommendations": {
        "rpcName": "GetTeamSeatUpgradeRecommendations",
        "kind": "Unary"
      },
      "getPendingSeatTierUpgradeRequests": {
        "rpcName": "GetPendingSeatTierUpgradeRequests",
        "kind": "Unary"
      },
      "getCurrentBillingCycle": {
        "rpcName": "GetCurrentBillingCycle",
        "kind": "Unary"
      },
      "getMonthlyBillingCycle": {
        "rpcName": "GetMonthlyBillingCycle",
        "kind": "Unary"
      },
      "getBugbotSettings": {
        "rpcName": "GetBugbotSettings",
        "kind": "Unary"
      },
      "getBugBotPRAnalytics": {
        "rpcName": "GetBugBotPRAnalytics",
        "kind": "Unary"
      },
      "getGithubInstallations": {
        "rpcName": "GetGithubInstallations",
        "kind": "Unary"
      },
      "getBugbotSuggestedRepos": {
        "rpcName": "GetBugbotSuggestedRepos",
        "kind": "Unary"
      },
      "getScmConnectionStatus": {
        "rpcName": "GetScmConnectionStatus",
        "kind": "Unary"
      },
      "getInstallationRepos": {
        "rpcName": "GetInstallationRepos",
        "kind": "Unary"
      },
      "fetchAllInstallationRepos": {
        "rpcName": "FetchAllInstallationRepos",
        "kind": "Unary"
      },
      "getInstallationGithubUsers": {
        "rpcName": "GetInstallationGithubUsers",
        "kind": "Unary"
      },
      "getUserAdminOrganizations": {
        "rpcName": "GetUserAdminOrganizations",
        "kind": "Unary"
      },
      "getTeamGithubUsers": {
        "rpcName": "GetTeamGithubUsers",
        "kind": "Unary"
      },
      "addGithubUsersToTeam": {
        "rpcName": "AddGithubUsersToTeam",
        "kind": "Unary"
      },
      "getUserPullRequests": {
        "rpcName": "GetUserPullRequests",
        "kind": "Unary"
      },
      "getUserReviewRequests": {
        "rpcName": "GetUserReviewRequests",
        "kind": "Unary"
      },
      "getPullRequestForBranch": {
        "rpcName": "GetPullRequestForBranch",
        "kind": "Unary"
      },
      "updateGithubRepoSettings": {
        "rpcName": "UpdateGithubRepoSettings",
        "kind": "Unary"
      },
      "updateGithubInstallationSettings": {
        "rpcName": "UpdateGithubInstallationSettings",
        "kind": "Unary"
      },
      "updateAllGithubRepoSettings": {
        "rpcName": "UpdateAllGithubRepoSettings",
        "kind": "Unary"
      },
      "updateGithubInstallationTeamScope": {
        "rpcName": "UpdateGithubInstallationTeamScope",
        "kind": "Unary"
      },
      "updateSelfGithubAllowlist": {
        "rpcName": "UpdateSelfGithubAllowlist",
        "kind": "Unary"
      },
      "getTeamBugbotSettings": {
        "rpcName": "GetTeamBugbotSettings",
        "kind": "Unary"
      },
      "updateTeamBugbotSettings": {
        "rpcName": "UpdateTeamBugbotSettings",
        "kind": "Unary"
      },
      "migrateTeamBugbotToUsageBasedBilling": {
        "rpcName": "MigrateTeamBugbotToUsageBasedBilling",
        "kind": "Unary"
      },
      "getBugbotMergedPrScanSummary": {
        "rpcName": "GetBugbotMergedPrScanSummary",
        "kind": "Unary"
      },
      "getBugbotMode": {
        "rpcName": "GetBugbotMode",
        "kind": "Unary"
      },
      "updateBugbotMode": {
        "rpcName": "UpdateBugbotMode",
        "kind": "Unary"
      },
      "getBugBotProUserMode": {
        "rpcName": "GetBugBotProUserMode",
        "kind": "Unary"
      },
      "updateBugBotProUserMode": {
        "rpcName": "UpdateBugBotProUserMode",
        "kind": "Unary"
      },
      "getBugbotUserSettings": {
        "rpcName": "GetBugbotUserSettings",
        "kind": "Unary"
      },
      "updateBugbotUserSettings": {
        "rpcName": "UpdateBugbotUserSettings",
        "kind": "Unary"
      },
      "getFullSelfDrivingUserSettings": {
        "rpcName": "GetFullSelfDrivingUserSettings",
        "kind": "Unary"
      },
      "updateFullSelfDrivingUserSettings": {
        "rpcName": "UpdateFullSelfDrivingUserSettings",
        "kind": "Unary"
      },
      "listFullSelfDrivingRepoSettings": {
        "rpcName": "ListFullSelfDrivingRepoSettings",
        "kind": "Unary"
      },
      "setFullSelfDrivingRepoEnabled": {
        "rpcName": "SetFullSelfDrivingRepoEnabled",
        "kind": "Unary"
      },
      "getFullSelfDrivingTeamSettings": {
        "rpcName": "GetFullSelfDrivingTeamSettings",
        "kind": "Unary"
      },
      "updateFullSelfDrivingTeamSettings": {
        "rpcName": "UpdateFullSelfDrivingTeamSettings",
        "kind": "Unary"
      },
      "listFullSelfDrivingTeamRepoSettings": {
        "rpcName": "ListFullSelfDrivingTeamRepoSettings",
        "kind": "Unary"
      },
      "setFullSelfDrivingTeamRepoEnabled": {
        "rpcName": "SetFullSelfDrivingTeamRepoEnabled",
        "kind": "Unary"
      },
      "listFullSelfDrivingActiveAgents": {
        "rpcName": "ListFullSelfDrivingActiveAgents",
        "kind": "Unary"
      },
      "listFullSelfDrivingTeamActiveAgents": {
        "rpcName": "ListFullSelfDrivingTeamActiveAgents",
        "kind": "Unary"
      },
      "updateFullSelfDrivingPrConfig": {
        "rpcName": "UpdateFullSelfDrivingPrConfig",
        "kind": "Unary"
      },
      "getBugBotProUserSettings": {
        "rpcName": "GetBugBotProUserSettings",
        "kind": "Unary"
      },
      "updateBugBotProUserSettings": {
        "rpcName": "UpdateBugBotProUserSettings",
        "kind": "Unary"
      },
      "migrateBugBotProUserToUsageBasedBilling": {
        "rpcName": "MigrateBugBotProUserToUsageBasedBilling",
        "kind": "Unary"
      },
      "getGlassEarlyPreviewEnrollment": {
        "rpcName": "GetGlassEarlyPreviewEnrollment",
        "kind": "Unary"
      },
      "enrollInGlassEarlyPreview": {
        "rpcName": "EnrollInGlassEarlyPreview",
        "kind": "Unary"
      },
      "unenrollFromGlassEarlyPreview": {
        "rpcName": "UnenrollFromGlassEarlyPreview",
        "kind": "Unary"
      },
      "recordBugbotDeeplinkEvent": {
        "rpcName": "RecordBugbotDeeplinkEvent",
        "kind": "Unary"
      },
      "recordBugbotDeeplinkEventUnauthenticated": {
        "rpcName": "RecordBugbotDeeplinkEventUnauthenticated",
        "kind": "Unary"
      },
      "revokeBugBotLicenses": {
        "rpcName": "RevokeBugBotLicenses",
        "kind": "Unary"
      },
      "revokeUserBugbotLicense": {
        "rpcName": "RevokeUserBugbotLicense",
        "kind": "Unary"
      },
      "startBugbotBackfillLearning": {
        "rpcName": "StartBugbotBackfillLearning",
        "kind": "Unary"
      },
      "getBugbotBackfillStatus": {
        "rpcName": "GetBugbotBackfillStatus",
        "kind": "Unary"
      },
      "setSlackAuth": {
        "rpcName": "SetSlackAuth",
        "kind": "Unary"
      },
      "getSlackTeamSettings": {
        "rpcName": "GetSlackTeamSettings",
        "kind": "Unary"
      },
      "updateSlackTeamSettings": {
        "rpcName": "UpdateSlackTeamSettings",
        "kind": "Unary"
      },
      "getSlackSettings": {
        "rpcName": "GetSlackSettings",
        "kind": "Unary"
      },
      "getSlackModelOptions": {
        "rpcName": "GetSlackModelOptions",
        "kind": "Unary"
      },
      "getSlackInstallUrl": {
        "rpcName": "GetSlackInstallUrl",
        "kind": "Unary"
      },
      "getSlackInstallUrlPublic": {
        "rpcName": "GetSlackInstallUrlPublic",
        "kind": "Unary"
      },
      "getSlackInstallUrlPublicWithUserScopes": {
        "rpcName": "GetSlackInstallUrlPublicWithUserScopes",
        "kind": "Unary"
      },
      "getFilteredUsageEvents": {
        "rpcName": "GetFilteredUsageEvents",
        "kind": "Unary"
      },
      "getAggregatedUsageEvents": {
        "rpcName": "GetAggregatedUsageEvents",
        "kind": "Unary"
      },
      "getAuditLogs": {
        "rpcName": "GetAuditLogs",
        "kind": "Unary"
      },
      "getOrganizationAuditLogs": {
        "rpcName": "GetOrganizationAuditLogs",
        "kind": "Unary"
      },
      "getUserPrivacyMode": {
        "rpcName": "GetUserPrivacyMode",
        "kind": "Unary"
      },
      "setUserPrivacyMode": {
        "rpcName": "SetUserPrivacyMode",
        "kind": "Unary"
      },
      "webAcknowledgeGracePeriodDisclaimer": {
        "rpcName": "WebAcknowledgeGracePeriodDisclaimer",
        "kind": "Unary"
      },
      "skipPrivacyModeGracePeriod": {
        "rpcName": "SkipPrivacyModeGracePeriod",
        "kind": "Unary"
      },
      "needsPrivacyModeMigration": {
        "rpcName": "NeedsPrivacyModeMigration",
        "kind": "Unary"
      },
      "updateTeamPrivacyModeMigrationOptOut": {
        "rpcName": "UpdateTeamPrivacyModeMigrationOptOut",
        "kind": "Unary"
      },
      "shareConversation": {
        "rpcName": "ShareConversation",
        "kind": "Unary"
      },
      "getSharedConversation": {
        "rpcName": "GetSharedConversation",
        "kind": "Unary"
      },
      "getPublicSharedConversation": {
        "rpcName": "GetPublicSharedConversation",
        "kind": "Unary"
      },
      "listSharedConversations": {
        "rpcName": "ListSharedConversations",
        "kind": "Unary"
      },
      "deleteSharedConversation": {
        "rpcName": "DeleteSharedConversation",
        "kind": "Unary"
      },
      "updateSharedConversationVisibility": {
        "rpcName": "UpdateSharedConversationVisibility",
        "kind": "Unary"
      },
      "shareCanvas": {
        "rpcName": "ShareCanvas",
        "kind": "Unary"
      },
      "getSharedCanvas": {
        "rpcName": "GetSharedCanvas",
        "kind": "Unary"
      },
      "getPublicSharedCanvas": {
        "rpcName": "GetPublicSharedCanvas",
        "kind": "Unary"
      },
      "listSharedCanvases": {
        "rpcName": "ListSharedCanvases",
        "kind": "Unary"
      },
      "deleteSharedCanvas": {
        "rpcName": "DeleteSharedCanvas",
        "kind": "Unary"
      },
      "lookupSharedCanvasByKey": {
        "rpcName": "LookupSharedCanvasByKey",
        "kind": "Unary"
      },
      "listUserCanvases": {
        "rpcName": "ListUserCanvases",
        "kind": "Unary"
      },
      "getCanvasMetadata": {
        "rpcName": "GetCanvasMetadata",
        "kind": "Unary"
      },
      "getCanvasPayload": {
        "rpcName": "GetCanvasPayload",
        "kind": "Unary"
      },
      "getTeamSharedConversationSettings": {
        "rpcName": "GetTeamSharedConversationSettings",
        "kind": "Unary"
      },
      "updateTeamSharedConversationSettings": {
        "rpcName": "UpdateTeamSharedConversationSettings",
        "kind": "Unary"
      },
      "getTeamSharedCanvasSettings": {
        "rpcName": "GetTeamSharedCanvasSettings",
        "kind": "Unary"
      },
      "updateTeamSharedCanvasSettings": {
        "rpcName": "UpdateTeamSharedCanvasSettings",
        "kind": "Unary"
      },
      "getTeamPublicProfileSettings": {
        "rpcName": "GetTeamPublicProfileSettings",
        "kind": "Unary"
      },
      "updateTeamPublicProfileSettings": {
        "rpcName": "UpdateTeamPublicProfileSettings",
        "kind": "Unary"
      },
      "getTeamSmartAutoSettings": {
        "rpcName": "GetTeamSmartAutoSettings",
        "kind": "Unary"
      },
      "updateTeamSmartAutoSettings": {
        "rpcName": "UpdateTeamSmartAutoSettings",
        "kind": "Unary"
      },
      "getTeamPromptCachingSettings": {
        "rpcName": "GetTeamPromptCachingSettings",
        "kind": "Unary"
      },
      "updateTeamPromptCachingSettings": {
        "rpcName": "UpdateTeamPromptCachingSettings",
        "kind": "Unary"
      },
      "getUserSmartAutoSettings": {
        "rpcName": "GetUserSmartAutoSettings",
        "kind": "Unary"
      },
      "updateUserSmartAutoSettings": {
        "rpcName": "UpdateUserSmartAutoSettings",
        "kind": "Unary"
      },
      "getTeamBackgroundAgentSettings": {
        "rpcName": "GetTeamBackgroundAgentSettings",
        "kind": "Unary"
      },
      "updateTeamBackgroundAgentSettings": {
        "rpcName": "UpdateTeamBackgroundAgentSettings",
        "kind": "Unary"
      },
      "getRepoSourcePreference": {
        "rpcName": "GetRepoSourcePreference",
        "kind": "Unary"
      },
      "updateUserRepoSourcePreference": {
        "rpcName": "UpdateUserRepoSourcePreference",
        "kind": "Unary"
      },
      "updateTeamRepoSourcePreference": {
        "rpcName": "UpdateTeamRepoSourcePreference",
        "kind": "Unary"
      },
      "resolvePrCreationForge": {
        "rpcName": "ResolvePrCreationForge",
        "kind": "Unary"
      },
      "revokeTeamInviteLink": {
        "rpcName": "RevokeTeamInviteLink",
        "kind": "Unary"
      },
      "listTeamInviteLinks": {
        "rpcName": "ListTeamInviteLinks",
        "kind": "Unary"
      },
      "updateUserName": {
        "rpcName": "UpdateUserName",
        "kind": "Unary"
      },
      "uploadUserProfilePicture": {
        "rpcName": "UploadUserProfilePicture",
        "kind": "Unary"
      },
      "updateUserProfilePicture": {
        "rpcName": "UpdateUserProfilePicture",
        "kind": "Unary"
      },
      "listInvoices": {
        "rpcName": "ListInvoices",
        "kind": "Unary"
      },
      "listBlockingCheckoutInvoices": {
        "rpcName": "ListBlockingCheckoutInvoices",
        "kind": "Unary"
      },
      "listPayableTeamInvoices": {
        "rpcName": "ListPayableTeamInvoices",
        "kind": "Unary"
      },
      "getRemainingRefunds": {
        "rpcName": "GetRemainingRefunds",
        "kind": "Unary"
      },
      "getServiceAccountSpendLimit": {
        "rpcName": "GetServiceAccountSpendLimit",
        "kind": "Unary"
      },
      "setServiceAccountSpendLimit": {
        "rpcName": "SetServiceAccountSpendLimit",
        "kind": "Unary"
      },
      "setUserHardLimit": {
        "rpcName": "SetUserHardLimit",
        "kind": "Unary"
      },
      "setUserMonthlyLimit": {
        "rpcName": "SetUserMonthlyLimit",
        "kind": "Unary"
      },
      "toggleMarketingEmailOpt": {
        "rpcName": "ToggleMarketingEmailOpt",
        "kind": "Unary"
      },
      "getMarketingEmailOpt": {
        "rpcName": "GetMarketingEmailOpt",
        "kind": "Unary"
      },
      "getGlobalLeaderboardOptIn": {
        "rpcName": "GetGlobalLeaderboardOptIn",
        "kind": "Unary"
      },
      "setGlobalLeaderboardOptIn": {
        "rpcName": "SetGlobalLeaderboardOptIn",
        "kind": "Unary"
      },
      "createTeamApiKey": {
        "rpcName": "CreateTeamApiKey",
        "kind": "Unary"
      },
      "revokeTeamApiKey": {
        "rpcName": "RevokeTeamApiKey",
        "kind": "Unary"
      },
      "listTeamApiKeys": {
        "rpcName": "ListTeamApiKeys",
        "kind": "Unary"
      },
      "createOrganizationApiKey": {
        "rpcName": "CreateOrganizationApiKey",
        "kind": "Unary"
      },
      "revokeOrganizationApiKey": {
        "rpcName": "RevokeOrganizationApiKey",
        "kind": "Unary"
      },
      "listOrganizationApiKeys": {
        "rpcName": "ListOrganizationApiKeys",
        "kind": "Unary"
      },
      "createAutomationWebhookApiKey": {
        "rpcName": "CreateAutomationWebhookApiKey",
        "kind": "Unary"
      },
      "createTeamServiceAccount": {
        "rpcName": "CreateTeamServiceAccount",
        "kind": "Unary"
      },
      "listTeamServiceAccounts": {
        "rpcName": "ListTeamServiceAccounts",
        "kind": "Unary"
      },
      "deleteTeamServiceAccount": {
        "rpcName": "DeleteTeamServiceAccount",
        "kind": "Unary"
      },
      "archiveTeamServiceAccount": {
        "rpcName": "ArchiveTeamServiceAccount",
        "kind": "Unary"
      },
      "rotateServiceAccountApiKey": {
        "rpcName": "RotateServiceAccountApiKey",
        "kind": "Unary"
      },
      "getTeamRepositoriesForServiceAccountScope": {
        "rpcName": "GetTeamRepositoriesForServiceAccountScope",
        "kind": "Unary"
      },
      "updateServiceAccountRepoScope": {
        "rpcName": "UpdateServiceAccountRepoScope",
        "kind": "Unary"
      },
      "createUserApiKey": {
        "rpcName": "CreateUserApiKey",
        "kind": "Unary"
      },
      "revokeUserApiKey": {
        "rpcName": "RevokeUserApiKey",
        "kind": "Unary"
      },
      "listUserApiKeys": {
        "rpcName": "ListUserApiKeys",
        "kind": "Unary"
      },
      "confirmGithubInstallation": {
        "rpcName": "ConfirmGithubInstallation",
        "kind": "Unary"
      },
      "updateTeamName": {
        "rpcName": "UpdateTeamName",
        "kind": "Unary"
      },
      "updateTeamDashboardAnalyticsSetting": {
        "rpcName": "UpdateTeamDashboardAnalyticsSetting",
        "kind": "Unary"
      },
      "updateTeamOriginSetting": {
        "rpcName": "UpdateTeamOriginSetting",
        "kind": "Unary"
      },
      "updateTeamScimRequireUserDirectorySetting": {
        "rpcName": "UpdateTeamScimRequireUserDirectorySetting",
        "kind": "Unary"
      },
      "getTeamScimRequireUserDirectoryPreview": {
        "rpcName": "GetTeamScimRequireUserDirectoryPreview",
        "kind": "Unary"
      },
      "getSlackUserSettings": {
        "rpcName": "GetSlackUserSettings",
        "kind": "Unary"
      },
      "updateSlackUserSettings": {
        "rpcName": "UpdateSlackUserSettings",
        "kind": "Unary"
      },
      "getSlackRepoRoutingRules": {
        "rpcName": "GetSlackRepoRoutingRules",
        "kind": "Unary"
      },
      "createSlackRepoRoutingRule": {
        "rpcName": "CreateSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "updateSlackRepoRoutingRule": {
        "rpcName": "UpdateSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "deleteSlackRepoRoutingRule": {
        "rpcName": "DeleteSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "getSlackDefaultWorkerRules": {
        "rpcName": "GetSlackDefaultWorkerRules",
        "kind": "Unary"
      },
      "setSlackDefaultWorkerRule": {
        "rpcName": "SetSlackDefaultWorkerRule",
        "kind": "Unary"
      },
      "deleteSlackDefaultWorkerRule": {
        "rpcName": "DeleteSlackDefaultWorkerRule",
        "kind": "Unary"
      },
      "isOnNewPricing": {
        "rpcName": "IsOnNewPricing",
        "kind": "Unary"
      },
      "getLinearAuthUrl": {
        "rpcName": "GetLinearAuthUrl",
        "kind": "Unary"
      },
      "connectLinearCallback": {
        "rpcName": "ConnectLinearCallback",
        "kind": "Unary"
      },
      "getMicrosoftTeamsLinkContext": {
        "rpcName": "GetMicrosoftTeamsLinkContext",
        "kind": "Unary"
      },
      "setMicrosoftTeamsAuth": {
        "rpcName": "SetMicrosoftTeamsAuth",
        "kind": "Unary"
      },
      "getLinearStatus": {
        "rpcName": "GetLinearStatus",
        "kind": "Unary"
      },
      "disconnectLinear": {
        "rpcName": "DisconnectLinear",
        "kind": "Unary"
      },
      "getLinearTeams": {
        "rpcName": "GetLinearTeams",
        "kind": "Unary"
      },
      "getLinearSettings": {
        "rpcName": "GetLinearSettings",
        "kind": "Unary"
      },
      "updateLinearTeamSetting": {
        "rpcName": "UpdateLinearTeamSetting",
        "kind": "Unary"
      },
      "updateLinearProjectSetting": {
        "rpcName": "UpdateLinearProjectSetting",
        "kind": "Unary"
      },
      "getLinearLabels": {
        "rpcName": "GetLinearLabels",
        "kind": "Unary"
      },
      "getLinearIssues": {
        "rpcName": "GetLinearIssues",
        "kind": "Unary"
      },
      "getXaiTeamLinkStatus": {
        "rpcName": "GetXaiTeamLinkStatus",
        "kind": "Unary"
      },
      "startXaiTeamLink": {
        "rpcName": "StartXaiTeamLink",
        "kind": "Unary"
      },
      "confirmXaiTeamLink": {
        "rpcName": "ConfirmXaiTeamLink",
        "kind": "Unary"
      },
      "cancelXaiTeamLinkProposal": {
        "rpcName": "CancelXaiTeamLinkProposal",
        "kind": "Unary"
      },
      "unlinkXaiTeam": {
        "rpcName": "UnlinkXaiTeam",
        "kind": "Unary"
      },
      "transferXaiCredits": {
        "rpcName": "TransferXaiCredits",
        "kind": "Unary"
      },
      "getXaiCreditTransferStatus": {
        "rpcName": "GetXaiCreditTransferStatus",
        "kind": "Unary"
      },
      "listXaiCreditTransfers": {
        "rpcName": "ListXaiCreditTransfers",
        "kind": "Unary"
      },
      "getPagerDutyAuthUrl": {
        "rpcName": "GetPagerDutyAuthUrl",
        "kind": "Unary"
      },
      "connectPagerDutyCallback": {
        "rpcName": "ConnectPagerDutyCallback",
        "kind": "Unary"
      },
      "getPagerDutyStatus": {
        "rpcName": "GetPagerDutyStatus",
        "kind": "Unary"
      },
      "getPagerDutyServices": {
        "rpcName": "GetPagerDutyServices",
        "kind": "Unary"
      },
      "disconnectPagerDuty": {
        "rpcName": "DisconnectPagerDuty",
        "kind": "Unary"
      },
      "getJiraInstallUrl": {
        "rpcName": "GetJiraInstallUrl",
        "kind": "Unary"
      },
      "linkJiraInstallation": {
        "rpcName": "LinkJiraInstallation",
        "kind": "Unary"
      },
      "getJiraStatus": {
        "rpcName": "GetJiraStatus",
        "kind": "Unary"
      },
      "getBitbucketForgeStatus": {
        "rpcName": "GetBitbucketForgeStatus",
        "kind": "Unary"
      },
      "disconnectJira": {
        "rpcName": "DisconnectJira",
        "kind": "Unary"
      },
      "disconnectBitbucketForge": {
        "rpcName": "DisconnectBitbucketForge",
        "kind": "Unary"
      },
      "getJiraProjects": {
        "rpcName": "GetJiraProjects",
        "kind": "Unary"
      },
      "getJiraTeamSettings": {
        "rpcName": "GetJiraTeamSettings",
        "kind": "Unary"
      },
      "updateJiraTeamSettings": {
        "rpcName": "UpdateJiraTeamSettings",
        "kind": "Unary"
      },
      "getJiraRoutingRules": {
        "rpcName": "GetJiraRoutingRules",
        "kind": "Unary"
      },
      "createJiraRoutingRule": {
        "rpcName": "CreateJiraRoutingRule",
        "kind": "Unary"
      },
      "updateJiraRoutingRule": {
        "rpcName": "UpdateJiraRoutingRule",
        "kind": "Unary"
      },
      "deleteJiraRoutingRule": {
        "rpcName": "DeleteJiraRoutingRule",
        "kind": "Unary"
      },
      "linkJiraUser": {
        "rpcName": "LinkJiraUser",
        "kind": "Unary"
      },
      "listJiraUserLinks": {
        "rpcName": "ListJiraUserLinks",
        "kind": "Unary"
      },
      "unlinkJiraUser": {
        "rpcName": "UnlinkJiraUser",
        "kind": "Unary"
      },
      "deleteBedrockIamRole": {
        "rpcName": "DeleteBedrockIamRole",
        "kind": "Unary"
      },
      "unlinkSlackAccess": {
        "rpcName": "UnlinkSlackAccess",
        "kind": "Unary"
      },
      "listSlackConversations": {
        "rpcName": "ListSlackConversations",
        "kind": "Unary"
      },
      "listMicrosoftTeamsChannels": {
        "rpcName": "ListMicrosoftTeamsChannels",
        "kind": "Unary"
      },
      "getSlackConversationsByIds": {
        "rpcName": "GetSlackConversationsByIds",
        "kind": "Unary"
      },
      "logSlackbotAuthConversionFunnel": {
        "rpcName": "LogSlackbotAuthConversionFunnel",
        "kind": "Unary"
      },
      "logClickedConnectSlack": {
        "rpcName": "LogClickedConnectSlack",
        "kind": "Unary"
      },
      "checkUserApiKeyAccess": {
        "rpcName": "CheckUserApiKeyAccess",
        "kind": "Unary"
      },
      "isAllowedFreeTrialUsage": {
        "rpcName": "IsAllowedFreeTrialUsage",
        "kind": "Unary"
      },
      "isNextSetupRunFree": {
        "rpcName": "IsNextSetupRunFree",
        "kind": "Unary"
      },
      "completedLinkSlackAccount": {
        "rpcName": "CompletedLinkSlackAccount",
        "kind": "Unary"
      },
      "notifyBugbotTeamAdmins": {
        "rpcName": "NotifyBugbotTeamAdmins",
        "kind": "Unary"
      },
      "getAdminNotificationStatus": {
        "rpcName": "GetAdminNotificationStatus",
        "kind": "Unary"
      },
      "optOutNewPricing": {
        "rpcName": "OptOutNewPricing",
        "kind": "Unary"
      },
      "submitFeedback": {
        "rpcName": "SubmitFeedback",
        "kind": "Unary"
      },
      "submitFeedbackAnon": {
        "rpcName": "SubmitFeedbackAnon",
        "kind": "Unary"
      },
      "getActiveOffboardingBanner": {
        "rpcName": "GetActiveOffboardingBanner",
        "kind": "Unary"
      },
      "clientAction": {
        "rpcName": "ClientAction",
        "kind": "Unary"
      },
      "listUsageAlerts": {
        "rpcName": "ListUsageAlerts",
        "kind": "Unary"
      },
      "createUsageAlerts": {
        "rpcName": "CreateUsageAlerts",
        "kind": "Unary"
      },
      "deleteUsageAlerts": {
        "rpcName": "DeleteUsageAlerts",
        "kind": "Unary"
      },
      "updateUsageAlerts": {
        "rpcName": "UpdateUsageAlerts",
        "kind": "Unary"
      },
      "requestIndividualLimitsOptOut": {
        "rpcName": "RequestIndividualLimitsOptOut",
        "kind": "Unary"
      },
      "listMarketplacePlugins": {
        "rpcName": "ListMarketplacePlugins",
        "kind": "Unary"
      },
      "getUserProfile": {
        "rpcName": "GetUserProfile",
        "kind": "Unary"
      },
      "updateUserProfile": {
        "rpcName": "UpdateUserProfile",
        "kind": "Unary"
      },
      "claimUserProfileHandle": {
        "rpcName": "ClaimUserProfileHandle",
        "kind": "Unary"
      },
      "getPublicProfileByHandle": {
        "rpcName": "GetPublicProfileByHandle",
        "kind": "Unary"
      },
      "getViewableProfileByHandle": {
        "rpcName": "GetViewableProfileByHandle",
        "kind": "Unary"
      },
      "getTeamMemberProfileByHandle": {
        "rpcName": "GetTeamMemberProfileByHandle",
        "kind": "Unary"
      },
      "getPlugin": {
        "rpcName": "GetPlugin",
        "kind": "Unary"
      },
      "createPlugin": {
        "rpcName": "CreatePlugin",
        "kind": "Unary"
      },
      "updatePluginMcpConfig": {
        "rpcName": "UpdatePluginMcpConfig",
        "kind": "Unary"
      },
      "publishPlugin": {
        "rpcName": "PublishPlugin",
        "kind": "Unary"
      },
      "unpublishPlugin": {
        "rpcName": "UnpublishPlugin",
        "kind": "Unary"
      },
      "parseGitHubRepoForPlugins": {
        "rpcName": "ParseGitHubRepoForPlugins",
        "kind": "Unary"
      },
      "parsePluginPublisherRepoInternal": {
        "rpcName": "ParsePluginPublisherRepoInternal",
        "kind": "Unary"
      },
      "previewReindexPluginRepoInternal": {
        "rpcName": "PreviewReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "applyReindexPluginRepoInternal": {
        "rpcName": "ApplyReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "previewMigrateReindexPluginRepoInternal": {
        "rpcName": "PreviewMigrateReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "applyMigrateReindexPluginRepoInternal": {
        "rpcName": "ApplyMigrateReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "updateTeamMarketplaceOriginDistributionInternal": {
        "rpcName": "UpdateTeamMarketplaceOriginDistributionInternal",
        "kind": "Unary"
      },
      "createSupportImpersonationSessionInternal": {
        "rpcName": "CreateSupportImpersonationSessionInternal",
        "kind": "Unary"
      },
      "submitPluginForApproval": {
        "rpcName": "SubmitPluginForApproval",
        "kind": "Unary"
      },
      "approvePlugin": {
        "rpcName": "ApprovePlugin",
        "kind": "Unary"
      },
      "rejectPlugin": {
        "rpcName": "RejectPlugin",
        "kind": "Unary"
      },
      "listUserPluginInstalls": {
        "rpcName": "ListUserPluginInstalls",
        "kind": "Unary"
      },
      "installUserPlugin": {
        "rpcName": "InstallUserPlugin",
        "kind": "Unary"
      },
      "updateUserPluginInstall": {
        "rpcName": "UpdateUserPluginInstall",
        "kind": "Unary"
      },
      "uninstallUserPlugin": {
        "rpcName": "UninstallUserPlugin",
        "kind": "Unary"
      },
      "listTeamPluginInstalls": {
        "rpcName": "ListTeamPluginInstalls",
        "kind": "Unary"
      },
      "getTeamPluginPopularity": {
        "rpcName": "GetTeamPluginPopularity",
        "kind": "Unary"
      },
      "getTeamPluginPrimitiveUsage": {
        "rpcName": "GetTeamPluginPrimitiveUsage",
        "kind": "Unary"
      },
      "listTeamAvailableMarketplacePlugins": {
        "rpcName": "ListTeamAvailableMarketplacePlugins",
        "kind": "Unary"
      },
      "getTeamPinnedMarketplacePlugins": {
        "rpcName": "GetTeamPinnedMarketplacePlugins",
        "kind": "Unary"
      },
      "updateTeamPinnedMarketplacePlugins": {
        "rpcName": "UpdateTeamPinnedMarketplacePlugins",
        "kind": "Unary"
      },
      "installTeamPlugin": {
        "rpcName": "InstallTeamPlugin",
        "kind": "Unary"
      },
      "updateTeamPluginInstall": {
        "rpcName": "UpdateTeamPluginInstall",
        "kind": "Unary"
      },
      "uninstallTeamPlugin": {
        "rpcName": "UninstallTeamPlugin",
        "kind": "Unary"
      },
      "getEffectiveUserPlugins": {
        "rpcName": "GetEffectiveUserPlugins",
        "kind": "Unary"
      },
      "resolvePluginsByRef": {
        "rpcName": "ResolvePluginsByRef",
        "kind": "Unary"
      },
      "listMarketplaces": {
        "rpcName": "ListMarketplaces",
        "kind": "Unary"
      },
      "addMarketplace": {
        "rpcName": "AddMarketplace",
        "kind": "Unary"
      },
      "getOrCreateDefaultTeamMarketplace": {
        "rpcName": "GetOrCreateDefaultTeamMarketplace",
        "kind": "Unary"
      },
      "updateMarketplace": {
        "rpcName": "UpdateMarketplace",
        "kind": "Unary"
      },
      "removeMarketplace": {
        "rpcName": "RemoveMarketplace",
        "kind": "Unary"
      },
      "refreshMarketplace": {
        "rpcName": "RefreshMarketplace",
        "kind": "Unary"
      },
      "reindexAndApplyTeamMarketplaceChanges": {
        "rpcName": "ReindexAndApplyTeamMarketplaceChanges",
        "kind": "Unary"
      },
      "registerMarketplaceAndPlugins": {
        "rpcName": "RegisterMarketplaceAndPlugins",
        "kind": "Unary"
      },
      "updateTeamMarketplaceConfig": {
        "rpcName": "UpdateTeamMarketplaceConfig",
        "kind": "Unary"
      },
      "setTeamMarketplaceRepository": {
        "rpcName": "SetTeamMarketplaceRepository",
        "kind": "Unary"
      },
      "setMarketplaceOriginDistribution": {
        "rpcName": "SetMarketplaceOriginDistribution",
        "kind": "Unary"
      },
      "getMarketplaceOriginDistributionStatus": {
        "rpcName": "GetMarketplaceOriginDistributionStatus",
        "kind": "Unary"
      },
      "setTeamMarketplacePluginPolicies": {
        "rpcName": "SetTeamMarketplacePluginPolicies",
        "kind": "Unary"
      },
      "setTeamMarketplacePluginPolicyVariables": {
        "rpcName": "SetTeamMarketplacePluginPolicyVariables",
        "kind": "Unary"
      },
      "applyTeamMarketplaceRequiredPlugins": {
        "rpcName": "ApplyTeamMarketplaceRequiredPlugins",
        "kind": "Unary"
      },
      "linkPluginsToTeamMarketplace": {
        "rpcName": "LinkPluginsToTeamMarketplace",
        "kind": "Unary"
      },
      "unlinkPluginsFromTeamMarketplace": {
        "rpcName": "UnlinkPluginsFromTeamMarketplace",
        "kind": "Unary"
      },
      "previewTeamMarketplaceMcpImpact": {
        "rpcName": "PreviewTeamMarketplaceMcpImpact",
        "kind": "Unary"
      },
      "getManagedSkills": {
        "rpcName": "GetManagedSkills",
        "kind": "Unary"
      },
      "getCursorUserState": {
        "rpcName": "GetCursorUserState",
        "kind": "Unary"
      },
      "setJobData": {
        "rpcName": "SetJobData",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.DashboardService",
    "bundle": "host-main.cjs",
    "methods": {
      "getTeams": {
        "rpcName": "GetTeams",
        "kind": "Unary"
      },
      "getMe": {
        "rpcName": "GetMe",
        "kind": "Unary"
      },
      "getAgenticOnboardingConfig": {
        "rpcName": "GetAgenticOnboardingConfig",
        "kind": "Unary"
      },
      "getUserOrganizations": {
        "rpcName": "GetUserOrganizations",
        "kind": "Unary"
      },
      "setUserDefaultTeam": {
        "rpcName": "SetUserDefaultTeam",
        "kind": "Unary"
      },
      "getOrganizationMembers": {
        "rpcName": "GetOrganizationMembers",
        "kind": "Unary"
      },
      "getOrganizationMember": {
        "rpcName": "GetOrganizationMember",
        "kind": "Unary"
      },
      "listOrganizationIdentityProviders": {
        "rpcName": "ListOrganizationIdentityProviders",
        "kind": "Unary"
      },
      "updateOrganizationIdentityProviderSsoSettings": {
        "rpcName": "UpdateOrganizationIdentityProviderSsoSettings",
        "kind": "Unary"
      },
      "setOrganizationIdentityProviderAllowDomainJoin": {
        "rpcName": "SetOrganizationIdentityProviderAllowDomainJoin",
        "kind": "Unary"
      },
      "addOrganizationIdentityProviderDomainJoin": {
        "rpcName": "AddOrganizationIdentityProviderDomainJoin",
        "kind": "Unary"
      },
      "removeOrganizationIdentityProviderDomainJoin": {
        "rpcName": "RemoveOrganizationIdentityProviderDomainJoin",
        "kind": "Unary"
      },
      "mergeOrganizationIdentityProvider": {
        "rpcName": "MergeOrganizationIdentityProvider",
        "kind": "Unary"
      },
      "preflightMergeOrganizationIdentityProvider": {
        "rpcName": "PreflightMergeOrganizationIdentityProvider",
        "kind": "Unary"
      },
      "getOrganizationMergeIdpRequest": {
        "rpcName": "GetOrganizationMergeIdpRequest",
        "kind": "Unary"
      },
      "listOrganizationMergeIdpRequests": {
        "rpcName": "ListOrganizationMergeIdpRequests",
        "kind": "Unary"
      },
      "moveOrganizationMemberToTeam": {
        "rpcName": "MoveOrganizationMemberToTeam",
        "kind": "Unary"
      },
      "setOrganizationMemberTeams": {
        "rpcName": "SetOrganizationMemberTeams",
        "kind": "Unary"
      },
      "bulkMoveOrganizationMembers": {
        "rpcName": "BulkMoveOrganizationMembers",
        "kind": "Unary"
      },
      "startBulkMoveOrganizationMembers": {
        "rpcName": "StartBulkMoveOrganizationMembers",
        "kind": "Unary"
      },
      "getBackgroundJob": {
        "rpcName": "GetBackgroundJob",
        "kind": "Unary"
      },
      "setOrganizationMemberRole": {
        "rpcName": "SetOrganizationMemberRole",
        "kind": "Unary"
      },
      "updateOrganization": {
        "rpcName": "UpdateOrganization",
        "kind": "Unary"
      },
      "updateOrganizationTeam": {
        "rpcName": "UpdateOrganizationTeam",
        "kind": "Unary"
      },
      "createOrganizationTeam": {
        "rpcName": "CreateOrganizationTeam",
        "kind": "Unary"
      },
      "getOrganizationTeamAdminCandidates": {
        "rpcName": "GetOrganizationTeamAdminCandidates",
        "kind": "Unary"
      },
      "getDirectoryGroups": {
        "rpcName": "GetDirectoryGroups",
        "kind": "Unary"
      },
      "updateDirectoryGroupSettings": {
        "rpcName": "UpdateDirectoryGroupSettings",
        "kind": "Unary"
      },
      "getOrganizationGroups": {
        "rpcName": "GetOrganizationGroups",
        "kind": "Unary"
      },
      "getOrganizationGroup": {
        "rpcName": "GetOrganizationGroup",
        "kind": "Unary"
      },
      "getOrganizationGroupMembers": {
        "rpcName": "GetOrganizationGroupMembers",
        "kind": "Unary"
      },
      "createOrganizationGroup": {
        "rpcName": "CreateOrganizationGroup",
        "kind": "Unary"
      },
      "updateOrganizationGroup": {
        "rpcName": "UpdateOrganizationGroup",
        "kind": "Unary"
      },
      "deleteOrganizationGroup": {
        "rpcName": "DeleteOrganizationGroup",
        "kind": "Unary"
      },
      "addOrganizationGroupMembers": {
        "rpcName": "AddOrganizationGroupMembers",
        "kind": "Unary"
      },
      "removeOrganizationGroupMembers": {
        "rpcName": "RemoveOrganizationGroupMembers",
        "kind": "Unary"
      },
      "updateOrganizationGroupMember": {
        "rpcName": "UpdateOrganizationGroupMember",
        "kind": "Unary"
      },
      "getOrganizationGroupAutorunSettings": {
        "rpcName": "GetOrganizationGroupAutorunSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupAutorunSettings": {
        "rpcName": "UpdateOrganizationGroupAutorunSettings",
        "kind": "Unary"
      },
      "getOrganizationGroupModelAllowlist": {
        "rpcName": "GetOrganizationGroupModelAllowlist",
        "kind": "Unary"
      },
      "updateOrganizationGroupModelAllowlist": {
        "rpcName": "UpdateOrganizationGroupModelAllowlist",
        "kind": "Unary"
      },
      "getOrganizationGroupAutoReviewSettings": {
        "rpcName": "GetOrganizationGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupAutoReviewSettings": {
        "rpcName": "UpdateOrganizationGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "getOrganizationGroupSmartAutoSettings": {
        "rpcName": "GetOrganizationGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "updateOrganizationGroupSmartAutoSettings": {
        "rpcName": "UpdateOrganizationGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "createOrganizationGroupAnthropicCyberEnrollmentUrl": {
        "rpcName": "CreateOrganizationGroupAnthropicCyberEnrollmentUrl",
        "kind": "Unary"
      },
      "getTeamGroups": {
        "rpcName": "GetTeamGroups",
        "kind": "Unary"
      },
      "getTeamGroup": {
        "rpcName": "GetTeamGroup",
        "kind": "Unary"
      },
      "getTeamGroupMembers": {
        "rpcName": "GetTeamGroupMembers",
        "kind": "Unary"
      },
      "createTeamGroup": {
        "rpcName": "CreateTeamGroup",
        "kind": "Unary"
      },
      "updateTeamGroup": {
        "rpcName": "UpdateTeamGroup",
        "kind": "Unary"
      },
      "deleteTeamGroup": {
        "rpcName": "DeleteTeamGroup",
        "kind": "Unary"
      },
      "addTeamGroupMembers": {
        "rpcName": "AddTeamGroupMembers",
        "kind": "Unary"
      },
      "removeTeamGroupMembers": {
        "rpcName": "RemoveTeamGroupMembers",
        "kind": "Unary"
      },
      "updateTeamGroupMember": {
        "rpcName": "UpdateTeamGroupMember",
        "kind": "Unary"
      },
      "getTeamGroupAutorunSettings": {
        "rpcName": "GetTeamGroupAutorunSettings",
        "kind": "Unary"
      },
      "updateTeamGroupAutorunSettings": {
        "rpcName": "UpdateTeamGroupAutorunSettings",
        "kind": "Unary"
      },
      "getTeamGroupModelAllowlist": {
        "rpcName": "GetTeamGroupModelAllowlist",
        "kind": "Unary"
      },
      "updateTeamGroupModelAllowlist": {
        "rpcName": "UpdateTeamGroupModelAllowlist",
        "kind": "Unary"
      },
      "getTeamGroupAutoReviewSettings": {
        "rpcName": "GetTeamGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "updateTeamGroupAutoReviewSettings": {
        "rpcName": "UpdateTeamGroupAutoReviewSettings",
        "kind": "Unary"
      },
      "getTeamSandNetworkSettings": {
        "rpcName": "GetTeamSandNetworkSettings",
        "kind": "Unary"
      },
      "updateTeamSandNetworkSettings": {
        "rpcName": "UpdateTeamSandNetworkSettings",
        "kind": "Unary"
      },
      "getTeamGroupSandNetworkSettings": {
        "rpcName": "GetTeamGroupSandNetworkSettings",
        "kind": "Unary"
      },
      "updateTeamGroupSandNetworkSettings": {
        "rpcName": "UpdateTeamGroupSandNetworkSettings",
        "kind": "Unary"
      },
      "getTeamGroupSmartAutoSettings": {
        "rpcName": "GetTeamGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "updateTeamGroupSmartAutoSettings": {
        "rpcName": "UpdateTeamGroupSmartAutoSettings",
        "kind": "Unary"
      },
      "createTeamGroupAnthropicCyberEnrollmentUrl": {
        "rpcName": "CreateTeamGroupAnthropicCyberEnrollmentUrl",
        "kind": "Unary"
      },
      "listTeamGroupScimDirectories": {
        "rpcName": "ListTeamGroupScimDirectories",
        "kind": "Unary"
      },
      "listTeamGroupScimGroupsFromUpstream": {
        "rpcName": "ListTeamGroupScimGroupsFromUpstream",
        "kind": "Unary"
      },
      "listTeamGroupScimTargetMappings": {
        "rpcName": "ListTeamGroupScimTargetMappings",
        "kind": "Unary"
      },
      "createTeamGroupScimTargetMapping": {
        "rpcName": "CreateTeamGroupScimTargetMapping",
        "kind": "Unary"
      },
      "deleteTeamGroupScimTargetMapping": {
        "rpcName": "DeleteTeamGroupScimTargetMapping",
        "kind": "Unary"
      },
      "getGroups": {
        "rpcName": "GetGroups",
        "kind": "Unary"
      },
      "getGroupMembers": {
        "rpcName": "GetGroupMembers",
        "kind": "Unary"
      },
      "createGroup": {
        "rpcName": "CreateGroup",
        "kind": "Unary"
      },
      "updateGroup": {
        "rpcName": "UpdateGroup",
        "kind": "Unary"
      },
      "deleteGroup": {
        "rpcName": "DeleteGroup",
        "kind": "Unary"
      },
      "addGroupMembers": {
        "rpcName": "AddGroupMembers",
        "kind": "Unary"
      },
      "removeGroupMembers": {
        "rpcName": "RemoveGroupMembers",
        "kind": "Unary"
      },
      "bulkAssignGroupMembers": {
        "rpcName": "BulkAssignGroupMembers",
        "kind": "Unary"
      },
      "previewAttachGroupToDirectory": {
        "rpcName": "PreviewAttachGroupToDirectory",
        "kind": "Unary"
      },
      "detachGroupFromDirectory": {
        "rpcName": "DetachGroupFromDirectory",
        "kind": "Unary"
      },
      "getScimConflicts": {
        "rpcName": "GetScimConflicts",
        "kind": "Unary"
      },
      "listScimDirectories": {
        "rpcName": "ListScimDirectories",
        "kind": "Unary"
      },
      "getOrganizationScimConfigurationLinks": {
        "rpcName": "GetOrganizationScimConfigurationLinks",
        "kind": "Unary"
      },
      "createScimDirectory": {
        "rpcName": "CreateScimDirectory",
        "kind": "Unary"
      },
      "updateScimDirectorySyncSettings": {
        "rpcName": "UpdateScimDirectorySyncSettings",
        "kind": "Unary"
      },
      "deleteScimDirectory": {
        "rpcName": "DeleteScimDirectory",
        "kind": "Unary"
      },
      "listScimGroupsFromUpstream": {
        "rpcName": "ListScimGroupsFromUpstream",
        "kind": "Unary"
      },
      "listScimTargetMappings": {
        "rpcName": "ListScimTargetMappings",
        "kind": "Unary"
      },
      "listOrganizationGroupTargetMappings": {
        "rpcName": "ListOrganizationGroupTargetMappings",
        "kind": "Unary"
      },
      "createScimTargetMapping": {
        "rpcName": "CreateScimTargetMapping",
        "kind": "Unary"
      },
      "deleteScimTargetMapping": {
        "rpcName": "DeleteScimTargetMapping",
        "kind": "Unary"
      },
      "getActivationCheckoutUrl": {
        "rpcName": "GetActivationCheckoutUrl",
        "kind": "Unary"
      },
      "checkPromotionEligibility": {
        "rpcName": "CheckPromotionEligibility",
        "kind": "Unary"
      },
      "activatePromotion": {
        "rpcName": "ActivatePromotion",
        "kind": "Unary"
      },
      "getTeamCustomerPortalUrl": {
        "rpcName": "GetTeamCustomerPortalUrl",
        "kind": "Unary"
      },
      "cancelPendingTeamSubscriptionNow": {
        "rpcName": "CancelPendingTeamSubscriptionNow",
        "kind": "Unary"
      },
      "createPendingTeamProCheckout": {
        "rpcName": "CreatePendingTeamProCheckout",
        "kind": "Unary"
      },
      "getTeamMembers": {
        "rpcName": "GetTeamMembers",
        "kind": "Unary"
      },
      "sendTeamInvite": {
        "rpcName": "SendTeamInvite",
        "kind": "Unary"
      },
      "getTeamInviteLink": {
        "rpcName": "GetTeamInviteLink",
        "kind": "Unary"
      },
      "acceptInvite": {
        "rpcName": "AcceptInvite",
        "kind": "Unary"
      },
      "getTeamInviteMetadata": {
        "rpcName": "GetTeamInviteMetadata",
        "kind": "Unary"
      },
      "listContactImportConnections": {
        "rpcName": "ListContactImportConnections",
        "kind": "Unary"
      },
      "getGoogleContactImportAuthUrl": {
        "rpcName": "GetGoogleContactImportAuthUrl",
        "kind": "Unary"
      },
      "connectGoogleContactImportCallback": {
        "rpcName": "ConnectGoogleContactImportCallback",
        "kind": "Unary"
      },
      "listContactImportContacts": {
        "rpcName": "ListContactImportContacts",
        "kind": "Unary"
      },
      "getContactImportAvatar": {
        "rpcName": "GetContactImportAvatar",
        "kind": "Unary"
      },
      "disconnectContactImportConnection": {
        "rpcName": "DisconnectContactImportConnection",
        "kind": "Unary"
      },
      "createTeam": {
        "rpcName": "CreateTeam",
        "kind": "Unary"
      },
      "getJoinableTeamsByDomain": {
        "rpcName": "GetJoinableTeamsByDomain",
        "kind": "Unary"
      },
      "joinTeamByDomain": {
        "rpcName": "JoinTeamByDomain",
        "kind": "Unary"
      },
      "updateTeamDomainJoinSetting": {
        "rpcName": "UpdateTeamDomainJoinSetting",
        "kind": "Unary"
      },
      "getTeamMemberDomains": {
        "rpcName": "GetTeamMemberDomains",
        "kind": "Unary"
      },
      "getTeamIdForReactivation": {
        "rpcName": "GetTeamIdForReactivation",
        "kind": "Unary"
      },
      "changeSeat": {
        "rpcName": "ChangeSeat",
        "kind": "Unary"
      },
      "changeTeamSubscription": {
        "rpcName": "ChangeTeamSubscription",
        "kind": "Unary"
      },
      "connectGithubCallback": {
        "rpcName": "ConnectGithubCallback",
        "kind": "Unary"
      },
      "registerGithubCursorCode": {
        "rpcName": "RegisterGithubCursorCode",
        "kind": "Unary"
      },
      "prepareGithubConnectFlow": {
        "rpcName": "PrepareGithubConnectFlow",
        "kind": "Unary"
      },
      "completeGithubConnectFlow": {
        "rpcName": "CompleteGithubConnectFlow",
        "kind": "Unary"
      },
      "disconnectGithub": {
        "rpcName": "DisconnectGithub",
        "kind": "Unary"
      },
      "prepareSetupGithubEnterpriseApp": {
        "rpcName": "PrepareSetupGithubEnterpriseApp",
        "kind": "Unary"
      },
      "finishSetupGithubEnterpriseApp": {
        "rpcName": "FinishSetupGithubEnterpriseApp",
        "kind": "Unary"
      },
      "listGithubEnterpriseApps": {
        "rpcName": "ListGithubEnterpriseApps",
        "kind": "Unary"
      },
      "deleteGithubEnterpriseApp": {
        "rpcName": "DeleteGithubEnterpriseApp",
        "kind": "Unary"
      },
      "setupGitlabEnterpriseInstance": {
        "rpcName": "SetupGitlabEnterpriseInstance",
        "kind": "Unary"
      },
      "listGitlabEnterpriseInstances": {
        "rpcName": "ListGitlabEnterpriseInstances",
        "kind": "Unary"
      },
      "setGitlabEnterpriseHostControlledServiceAccountToken": {
        "rpcName": "SetGitlabEnterpriseHostControlledServiceAccountToken",
        "kind": "Unary"
      },
      "rotateGitlabEnterpriseWebhookSecret": {
        "rpcName": "RotateGitlabEnterpriseWebhookSecret",
        "kind": "Unary"
      },
      "deleteGitlabEnterpriseInstance": {
        "rpcName": "DeleteGitlabEnterpriseInstance",
        "kind": "Unary"
      },
      "setupBitbucketServerInstance": {
        "rpcName": "SetupBitbucketServerInstance",
        "kind": "Unary"
      },
      "listBitbucketServerInstances": {
        "rpcName": "ListBitbucketServerInstances",
        "kind": "Unary"
      },
      "updateBitbucketServerInstanceToken": {
        "rpcName": "UpdateBitbucketServerInstanceToken",
        "kind": "Unary"
      },
      "deleteBitbucketServerInstance": {
        "rpcName": "DeleteBitbucketServerInstance",
        "kind": "Unary"
      },
      "syncGitlabRepos": {
        "rpcName": "SyncGitlabRepos",
        "kind": "Unary"
      },
      "getGitlabReposSyncStatus": {
        "rpcName": "GetGitlabReposSyncStatus",
        "kind": "Unary"
      },
      "updateRole": {
        "rpcName": "UpdateRole",
        "kind": "Unary"
      },
      "removeMember": {
        "rpcName": "RemoveMember",
        "kind": "Unary"
      },
      "getMemberRemovalInsights": {
        "rpcName": "GetMemberRemovalInsights",
        "kind": "Unary"
      },
      "getSignUpType": {
        "rpcName": "GetSignUpType",
        "kind": "Unary"
      },
      "getHardLimit": {
        "rpcName": "GetHardLimit",
        "kind": "Unary"
      },
      "setHardLimit": {
        "rpcName": "SetHardLimit",
        "kind": "Unary"
      },
      "getSpendLimitPolicy": {
        "rpcName": "GetSpendLimitPolicy",
        "kind": "Unary"
      },
      "setSpendLimitPolicy": {
        "rpcName": "SetSpendLimitPolicy",
        "kind": "Unary"
      },
      "getOrgTeamBudgets": {
        "rpcName": "GetOrgTeamBudgets",
        "kind": "Unary"
      },
      "setOrgTeamBudget": {
        "rpcName": "SetOrgTeamBudget",
        "kind": "Unary"
      },
      "getOrgDailySpendByCategory": {
        "rpcName": "GetOrgDailySpendByCategory",
        "kind": "Unary"
      },
      "enableOnDemandSpend": {
        "rpcName": "EnableOnDemandSpend",
        "kind": "Unary"
      },
      "deleteAccount": {
        "rpcName": "DeleteAccount",
        "kind": "Unary"
      },
      "sendDownloadEmail": {
        "rpcName": "SendDownloadEmail",
        "kind": "Unary"
      },
      "getMonthlyInvoice": {
        "rpcName": "GetMonthlyInvoice",
        "kind": "Unary"
      },
      "listInvoiceCycles": {
        "rpcName": "ListInvoiceCycles",
        "kind": "Unary"
      },
      "getDailySpendByCategory": {
        "rpcName": "GetDailySpendByCategory",
        "kind": "Unary"
      },
      "getPricingHistory": {
        "rpcName": "GetPricingHistory",
        "kind": "Unary"
      },
      "listBackgroundComposerSecrets": {
        "rpcName": "ListBackgroundComposerSecrets",
        "kind": "Unary"
      },
      "createBackgroundComposerSecret": {
        "rpcName": "CreateBackgroundComposerSecret",
        "kind": "Unary"
      },
      "createBackgroundComposerSecretBatch": {
        "rpcName": "CreateBackgroundComposerSecretBatch",
        "kind": "Unary"
      },
      "revokeBackgroundComposerSecret": {
        "rpcName": "RevokeBackgroundComposerSecret",
        "kind": "Unary"
      },
      "updateBackgroundComposerSecret": {
        "rpcName": "UpdateBackgroundComposerSecret",
        "kind": "Unary"
      },
      "getMcpConfig": {
        "rpcName": "GetMcpConfig",
        "kind": "Unary"
      },
      "getEffectiveMcpConfigForUser": {
        "rpcName": "GetEffectiveMcpConfigForUser",
        "kind": "Unary"
      },
      "getAvailableMcpServers": {
        "rpcName": "GetAvailableMcpServers",
        "kind": "Unary"
      },
      "getMcpServerUsageSummary": {
        "rpcName": "GetMcpServerUsageSummary",
        "kind": "Unary"
      },
      "setMcpConfig": {
        "rpcName": "SetMcpConfig",
        "kind": "Unary"
      },
      "updateUserDefaultMcpSettings": {
        "rpcName": "UpdateUserDefaultMcpSettings",
        "kind": "Unary"
      },
      "markMcpServersSeen": {
        "rpcName": "MarkMcpServersSeen",
        "kind": "Unary"
      },
      "storeMcpOAuthToken": {
        "rpcName": "StoreMcpOAuthToken",
        "kind": "Unary"
      },
      "getMcpOAuthTokens": {
        "rpcName": "GetMcpOAuthTokens",
        "kind": "Unary"
      },
      "listSandMcpTools": {
        "rpcName": "ListSandMcpTools",
        "kind": "Unary"
      },
      "executeSandMcpTool": {
        "rpcName": "ExecuteSandMcpTool",
        "kind": "Unary"
      },
      "classifySandAutoReview": {
        "rpcName": "ClassifySandAutoReview",
        "kind": "Unary"
      },
      "recordSandAuditEvents": {
        "rpcName": "RecordSandAuditEvents",
        "kind": "Unary"
      },
      "mcpOAuthRefreshLockBegin": {
        "rpcName": "McpOAuthRefreshLockBegin",
        "kind": "Unary"
      },
      "mcpOAuthRefreshLockRelease": {
        "rpcName": "McpOAuthRefreshLockRelease",
        "kind": "Unary"
      },
      "deleteMcpOAuthToken": {
        "rpcName": "DeleteMcpOAuthToken",
        "kind": "Unary"
      },
      "validateMcpOAuthTokens": {
        "rpcName": "ValidateMcpOAuthTokens",
        "kind": "Unary"
      },
      "checkHttpMcpStatus": {
        "rpcName": "CheckHttpMcpStatus",
        "kind": "Unary"
      },
      "storeMcpOAuthPendingState": {
        "rpcName": "StoreMcpOAuthPendingState",
        "kind": "Unary"
      },
      "getMcpOAuthPendingState": {
        "rpcName": "GetMcpOAuthPendingState",
        "kind": "Unary"
      },
      "renameMcpOAuthAccount": {
        "rpcName": "RenameMcpOAuthAccount",
        "kind": "Unary"
      },
      "deleteMcpOAuthAccount": {
        "rpcName": "DeleteMcpOAuthAccount",
        "kind": "Unary"
      },
      "completeMcpOAuth": {
        "rpcName": "CompleteMcpOAuth",
        "kind": "Unary"
      },
      "getPluginMcpConfig": {
        "rpcName": "GetPluginMcpConfig",
        "kind": "Unary"
      },
      "batchGetPluginMcpConfig": {
        "rpcName": "BatchGetPluginMcpConfig",
        "kind": "Unary"
      },
      "addMcpServersFromPlugin": {
        "rpcName": "AddMcpServersFromPlugin",
        "kind": "Unary"
      },
      "moveUserMcpServerToTeam": {
        "rpcName": "MoveUserMcpServerToTeam",
        "kind": "Unary"
      },
      "migrateTeamMcpServersToDefaultMarketplace": {
        "rpcName": "MigrateTeamMcpServersToDefaultMarketplace",
        "kind": "Unary"
      },
      "probeMcpUrl": {
        "rpcName": "ProbeMcpUrl",
        "kind": "Unary"
      },
      "createTeamWithFreeTrial": {
        "rpcName": "CreateTeamWithFreeTrial",
        "kind": "Unary"
      },
      "createTeamWithOrg": {
        "rpcName": "CreateTeamWithOrg",
        "kind": "Unary"
      },
      "getTeamHasValidPaymentMethod": {
        "rpcName": "GetTeamHasValidPaymentMethod",
        "kind": "Unary"
      },
      "getTeamPrivacyModeForced": {
        "rpcName": "GetTeamPrivacyModeForced",
        "kind": "Unary"
      },
      "switchTeamPrivacyMode": {
        "rpcName": "SwitchTeamPrivacyMode",
        "kind": "Unary"
      },
      "updateFastRequests": {
        "rpcName": "UpdateFastRequests",
        "kind": "Unary"
      },
      "getFastRequests": {
        "rpcName": "GetFastRequests",
        "kind": "Unary"
      },
      "getDownloadLink": {
        "rpcName": "GetDownloadLink",
        "kind": "Unary"
      },
      "getCliDownloadUrl": {
        "rpcName": "GetCliDownloadUrl",
        "kind": "Unary"
      },
      "getSsoConfigurationLinks": {
        "rpcName": "GetSsoConfigurationLinks",
        "kind": "Unary"
      },
      "getScimConfigurationLinks": {
        "rpcName": "GetScimConfigurationLinks",
        "kind": "Unary"
      },
      "setAdminOnlyUsagePricing": {
        "rpcName": "SetAdminOnlyUsagePricing",
        "kind": "Unary"
      },
      "getYearlyUpgradeEligibility": {
        "rpcName": "GetYearlyUpgradeEligibility",
        "kind": "Unary"
      },
      "upgradeToYearly": {
        "rpcName": "UpgradeToYearly",
        "kind": "Unary"
      },
      "getEnterpriseCTAEligibility": {
        "rpcName": "GetEnterpriseCTAEligibility",
        "kind": "Unary"
      },
      "getUsageBasedPremiumRequests": {
        "rpcName": "GetUsageBasedPremiumRequests",
        "kind": "Unary"
      },
      "setUsageBasedPremiumRequests": {
        "rpcName": "SetUsageBasedPremiumRequests",
        "kind": "Unary"
      },
      "getReferrals": {
        "rpcName": "GetReferrals",
        "kind": "Unary"
      },
      "getReferralCodes": {
        "rpcName": "GetReferralCodes",
        "kind": "Unary"
      },
      "checkReferralAllowlist": {
        "rpcName": "CheckReferralAllowlist",
        "kind": "Unary"
      },
      "checkReferralCode": {
        "rpcName": "CheckReferralCode",
        "kind": "Unary"
      },
      "redeemGiftCode": {
        "rpcName": "RedeemGiftCode",
        "kind": "Unary"
      },
      "getEventCodeInfo": {
        "rpcName": "GetEventCodeInfo",
        "kind": "Unary"
      },
      "redeemEventCode": {
        "rpcName": "RedeemEventCode",
        "kind": "Unary"
      },
      "getTeamRepos": {
        "rpcName": "GetTeamRepos",
        "kind": "Unary"
      },
      "getTeamReposOrEmptyIfNotInTeam": {
        "rpcName": "GetTeamReposOrEmptyIfNotInTeam",
        "kind": "Unary"
      },
      "getTeamRules": {
        "rpcName": "GetTeamRules",
        "kind": "Unary"
      },
      "createTeamRule": {
        "rpcName": "CreateTeamRule",
        "kind": "Unary"
      },
      "updateTeamRule": {
        "rpcName": "UpdateTeamRule",
        "kind": "Unary"
      },
      "deleteTeamRule": {
        "rpcName": "DeleteTeamRule",
        "kind": "Unary"
      },
      "getTeamHooks": {
        "rpcName": "GetTeamHooks",
        "kind": "Unary"
      },
      "createTeamHook": {
        "rpcName": "CreateTeamHook",
        "kind": "Unary"
      },
      "updateTeamHook": {
        "rpcName": "UpdateTeamHook",
        "kind": "Unary"
      },
      "deleteTeamHook": {
        "rpcName": "DeleteTeamHook",
        "kind": "Unary"
      },
      "getTeamCommands": {
        "rpcName": "GetTeamCommands",
        "kind": "Unary"
      },
      "createTeamCommand": {
        "rpcName": "CreateTeamCommand",
        "kind": "Unary"
      },
      "updateTeamCommand": {
        "rpcName": "UpdateTeamCommand",
        "kind": "Unary"
      },
      "deleteTeamCommand": {
        "rpcName": "DeleteTeamCommand",
        "kind": "Unary"
      },
      "getGlobalCommands": {
        "rpcName": "GetGlobalCommands",
        "kind": "Unary"
      },
      "getRepoSlashCommands": {
        "rpcName": "GetRepoSlashCommands",
        "kind": "Unary"
      },
      "getBackgroundComposerSlashCommands": {
        "rpcName": "GetBackgroundComposerSlashCommands",
        "kind": "Unary"
      },
      "getCloudAgentPluginsSnapshot": {
        "rpcName": "GetCloudAgentPluginsSnapshot",
        "kind": "Unary"
      },
      "getBugbotTeamRules": {
        "rpcName": "GetBugbotTeamRules",
        "kind": "Unary"
      },
      "createBugbotTeamRule": {
        "rpcName": "CreateBugbotTeamRule",
        "kind": "Unary"
      },
      "updateBugbotTeamRule": {
        "rpcName": "UpdateBugbotTeamRule",
        "kind": "Unary"
      },
      "deleteBugbotTeamRule": {
        "rpcName": "DeleteBugbotTeamRule",
        "kind": "Unary"
      },
      "getBugbotLearnedRules": {
        "rpcName": "GetBugbotLearnedRules",
        "kind": "Unary"
      },
      "updateBugbotLearnedRule": {
        "rpcName": "UpdateBugbotLearnedRule",
        "kind": "Unary"
      },
      "deleteBugbotLearnedRule": {
        "rpcName": "DeleteBugbotLearnedRule",
        "kind": "Unary"
      },
      "createBugbotManualRepositoryRule": {
        "rpcName": "CreateBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "getBugbotManualRepositoryRules": {
        "rpcName": "GetBugbotManualRepositoryRules",
        "kind": "Unary"
      },
      "updateBugbotManualRepositoryRule": {
        "rpcName": "UpdateBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "deleteBugbotManualRepositoryRule": {
        "rpcName": "DeleteBugbotManualRepositoryRule",
        "kind": "Unary"
      },
      "runDiamondToBugbotMigration": {
        "rpcName": "RunDiamondToBugbotMigration",
        "kind": "Unary"
      },
      "getBugbotRuleAnalytics": {
        "rpcName": "GetBugbotRuleAnalytics",
        "kind": "Unary"
      },
      "getBugbotRuleById": {
        "rpcName": "GetBugbotRuleById",
        "kind": "Unary"
      },
      "createTeamRepo": {
        "rpcName": "CreateTeamRepo",
        "kind": "Unary"
      },
      "deleteTeamRepo": {
        "rpcName": "DeleteTeamRepo",
        "kind": "Unary"
      },
      "addRepoPattern": {
        "rpcName": "AddRepoPattern",
        "kind": "Unary"
      },
      "removeRepoPattern": {
        "rpcName": "RemoveRepoPattern",
        "kind": "Unary"
      },
      "setTeamRepoType": {
        "rpcName": "SetTeamRepoType",
        "kind": "Unary"
      },
      "getTeamAdminSettings": {
        "rpcName": "GetTeamAdminSettings",
        "kind": "Unary"
      },
      "getTeamAdminSettingsOrEmptyIfNotInTeam": {
        "rpcName": "GetTeamAdminSettingsOrEmptyIfNotInTeam",
        "kind": "Unary"
      },
      "getBaseTeamAdminSettings": {
        "rpcName": "GetBaseTeamAdminSettings",
        "kind": "Unary"
      },
      "updateTeamAdminSettings": {
        "rpcName": "UpdateTeamAdminSettings",
        "kind": "Unary"
      },
      "getTeamCustomerTelemetryDestinations": {
        "rpcName": "GetTeamCustomerTelemetryDestinations",
        "kind": "Unary"
      },
      "createTeamCustomerTelemetryDestination": {
        "rpcName": "CreateTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "updateTeamCustomerTelemetryDestination": {
        "rpcName": "UpdateTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "deleteTeamCustomerTelemetryDestination": {
        "rpcName": "DeleteTeamCustomerTelemetryDestination",
        "kind": "Unary"
      },
      "testTeamCustomerTelemetryDestinationConnection": {
        "rpcName": "TestTeamCustomerTelemetryDestinationConnection",
        "kind": "Unary"
      },
      "getTeamCustomerTelemetryDestinationHealth": {
        "rpcName": "GetTeamCustomerTelemetryDestinationHealth",
        "kind": "Unary"
      },
      "getTeamLlmGatewayCredentialStatus": {
        "rpcName": "GetTeamLlmGatewayCredentialStatus",
        "kind": "Unary"
      },
      "setTeamLlmGatewayCredential": {
        "rpcName": "SetTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "replaceTeamLlmGatewayCredential": {
        "rpcName": "ReplaceTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "clearTeamLlmGatewayCredential": {
        "rpcName": "ClearTeamLlmGatewayCredential",
        "kind": "Unary"
      },
      "setTeamNoZdrModelConsent": {
        "rpcName": "SetTeamNoZdrModelConsent",
        "kind": "Unary"
      },
      "setOrganizationNoZdrModelConsent": {
        "rpcName": "SetOrganizationNoZdrModelConsent",
        "kind": "Unary"
      },
      "getOrganizationOnDemandSpendDisabled": {
        "rpcName": "GetOrganizationOnDemandSpendDisabled",
        "kind": "Unary"
      },
      "setOrganizationOnDemandSpendDisabled": {
        "rpcName": "SetOrganizationOnDemandSpendDisabled",
        "kind": "Unary"
      },
      "setUserNoZdrModelConsent": {
        "rpcName": "SetUserNoZdrModelConsent",
        "kind": "Unary"
      },
      "setTeamMemberNoZdrModelConsent": {
        "rpcName": "SetTeamMemberNoZdrModelConsent",
        "kind": "Unary"
      },
      "getNoZdrModelConsentStatus": {
        "rpcName": "GetNoZdrModelConsentStatus",
        "kind": "Unary"
      },
      "updateTeamInviteLinkTTLSetting": {
        "rpcName": "UpdateTeamInviteLinkTTLSetting",
        "kind": "Unary"
      },
      "updateTeamMemberInviteSetting": {
        "rpcName": "UpdateTeamMemberInviteSetting",
        "kind": "Unary"
      },
      "updateTeamSandOnboardingCompleted": {
        "rpcName": "UpdateTeamSandOnboardingCompleted",
        "kind": "Unary"
      },
      "markTeamSandOnboardingSeen": {
        "rpcName": "MarkTeamSandOnboardingSeen",
        "kind": "Unary"
      },
      "getProtectedGitScopes": {
        "rpcName": "GetProtectedGitScopes",
        "kind": "Unary"
      },
      "createProtectedGitScope": {
        "rpcName": "CreateProtectedGitScope",
        "kind": "Unary"
      },
      "deleteProtectedGitScope": {
        "rpcName": "DeleteProtectedGitScope",
        "kind": "Unary"
      },
      "createTeamFreeTrialCode": {
        "rpcName": "CreateTeamFreeTrialCode",
        "kind": "Unary"
      },
      "createTeamFreeTrialCodeInternal": {
        "rpcName": "CreateTeamFreeTrialCodeInternal",
        "kind": "Unary"
      },
      "setTrialSpendLimitOverrideInternal": {
        "rpcName": "SetTrialSpendLimitOverrideInternal",
        "kind": "Unary"
      },
      "getTrialSpendLimitInternal": {
        "rpcName": "GetTrialSpendLimitInternal",
        "kind": "Unary"
      },
      "getTeamAnalytics": {
        "rpcName": "GetTeamAnalytics",
        "kind": "Unary"
      },
      "getUserAnalytics": {
        "rpcName": "GetUserAnalytics",
        "kind": "Unary"
      },
      "getTeamRawData": {
        "rpcName": "GetTeamRawData",
        "kind": "Unary"
      },
      "getClientUsageData": {
        "rpcName": "GetClientUsageData",
        "kind": "Unary"
      },
      "getCurrentPeriodUsage": {
        "rpcName": "GetCurrentPeriodUsage",
        "kind": "Unary"
      },
      "useSandBankedReset": {
        "rpcName": "UseSandBankedReset",
        "kind": "Unary"
      },
      "listSandBankedResets": {
        "rpcName": "ListSandBankedResets",
        "kind": "Unary"
      },
      "getSandUsageStatus": {
        "rpcName": "GetSandUsageStatus",
        "kind": "Unary"
      },
      "startSandTrial": {
        "rpcName": "StartSandTrial",
        "kind": "Unary"
      },
      "isEligibleForSandTrial": {
        "rpcName": "IsEligibleForSandTrial",
        "kind": "Unary"
      },
      "getSandTrialClaimStatus": {
        "rpcName": "GetSandTrialClaimStatus",
        "kind": "Unary"
      },
      "cancelSandTrial": {
        "rpcName": "CancelSandTrial",
        "kind": "Unary"
      },
      "getSandAccessStatus": {
        "rpcName": "GetSandAccessStatus",
        "kind": "Unary"
      },
      "registerSandMachine": {
        "rpcName": "RegisterSandMachine",
        "kind": "Unary"
      },
      "listSandMachines": {
        "rpcName": "ListSandMachines",
        "kind": "Unary"
      },
      "updateSandMachineLabel": {
        "rpcName": "UpdateSandMachineLabel",
        "kind": "Unary"
      },
      "requestSandTeamAccess": {
        "rpcName": "RequestSandTeamAccess",
        "kind": "Unary"
      },
      "listPendingUserAccessRequests": {
        "rpcName": "ListPendingUserAccessRequests",
        "kind": "Unary"
      },
      "getUsageSignalsProjectionSnapshot": {
        "rpcName": "GetUsageSignalsProjectionSnapshot",
        "kind": "Unary"
      },
      "getPlanInfo": {
        "rpcName": "GetPlanInfo",
        "kind": "Unary"
      },
      "verifyAppleTransaction": {
        "rpcName": "VerifyAppleTransaction",
        "kind": "Unary"
      },
      "getCursorReviewEntitlement": {
        "rpcName": "GetCursorReviewEntitlement",
        "kind": "Unary"
      },
      "getUsageLimitPolicyStatus": {
        "rpcName": "GetUsageLimitPolicyStatus",
        "kind": "Unary"
      },
      "getUsageLimitStatusAndActiveGrants": {
        "rpcName": "GetUsageLimitStatusAndActiveGrants",
        "kind": "Unary"
      },
      "getCreditGrantsBalance": {
        "rpcName": "GetCreditGrantsBalance",
        "kind": "Unary"
      },
      "getClientVisibleCreditGrants": {
        "rpcName": "GetClientVisibleCreditGrants",
        "kind": "Unary"
      },
      "getAdvancedAnalyticsEnabled": {
        "rpcName": "GetAdvancedAnalyticsEnabled",
        "kind": "Unary"
      },
      "getTokenUsage": {
        "rpcName": "GetTokenUsage",
        "kind": "Unary"
      },
      "validateBedrockIamRole": {
        "rpcName": "ValidateBedrockIamRole",
        "kind": "Unary"
      },
      "getTeamSpend": {
        "rpcName": "GetTeamSpend",
        "kind": "Unary"
      },
      "getTeamSeatUpgradeRecommendations": {
        "rpcName": "GetTeamSeatUpgradeRecommendations",
        "kind": "Unary"
      },
      "getPendingSeatTierUpgradeRequests": {
        "rpcName": "GetPendingSeatTierUpgradeRequests",
        "kind": "Unary"
      },
      "getCurrentBillingCycle": {
        "rpcName": "GetCurrentBillingCycle",
        "kind": "Unary"
      },
      "getMonthlyBillingCycle": {
        "rpcName": "GetMonthlyBillingCycle",
        "kind": "Unary"
      },
      "getBugbotSettings": {
        "rpcName": "GetBugbotSettings",
        "kind": "Unary"
      },
      "getBugBotPRAnalytics": {
        "rpcName": "GetBugBotPRAnalytics",
        "kind": "Unary"
      },
      "getGithubInstallations": {
        "rpcName": "GetGithubInstallations",
        "kind": "Unary"
      },
      "getBugbotSuggestedRepos": {
        "rpcName": "GetBugbotSuggestedRepos",
        "kind": "Unary"
      },
      "getScmConnectionStatus": {
        "rpcName": "GetScmConnectionStatus",
        "kind": "Unary"
      },
      "getInstallationRepos": {
        "rpcName": "GetInstallationRepos",
        "kind": "Unary"
      },
      "fetchAllInstallationRepos": {
        "rpcName": "FetchAllInstallationRepos",
        "kind": "Unary"
      },
      "getInstallationGithubUsers": {
        "rpcName": "GetInstallationGithubUsers",
        "kind": "Unary"
      },
      "getUserAdminOrganizations": {
        "rpcName": "GetUserAdminOrganizations",
        "kind": "Unary"
      },
      "getTeamGithubUsers": {
        "rpcName": "GetTeamGithubUsers",
        "kind": "Unary"
      },
      "addGithubUsersToTeam": {
        "rpcName": "AddGithubUsersToTeam",
        "kind": "Unary"
      },
      "getUserPullRequests": {
        "rpcName": "GetUserPullRequests",
        "kind": "Unary"
      },
      "getUserReviewRequests": {
        "rpcName": "GetUserReviewRequests",
        "kind": "Unary"
      },
      "getPullRequestForBranch": {
        "rpcName": "GetPullRequestForBranch",
        "kind": "Unary"
      },
      "updateGithubRepoSettings": {
        "rpcName": "UpdateGithubRepoSettings",
        "kind": "Unary"
      },
      "updateGithubInstallationSettings": {
        "rpcName": "UpdateGithubInstallationSettings",
        "kind": "Unary"
      },
      "updateAllGithubRepoSettings": {
        "rpcName": "UpdateAllGithubRepoSettings",
        "kind": "Unary"
      },
      "updateGithubInstallationTeamScope": {
        "rpcName": "UpdateGithubInstallationTeamScope",
        "kind": "Unary"
      },
      "updateSelfGithubAllowlist": {
        "rpcName": "UpdateSelfGithubAllowlist",
        "kind": "Unary"
      },
      "getTeamBugbotSettings": {
        "rpcName": "GetTeamBugbotSettings",
        "kind": "Unary"
      },
      "updateTeamBugbotSettings": {
        "rpcName": "UpdateTeamBugbotSettings",
        "kind": "Unary"
      },
      "migrateTeamBugbotToUsageBasedBilling": {
        "rpcName": "MigrateTeamBugbotToUsageBasedBilling",
        "kind": "Unary"
      },
      "getBugbotMergedPrScanSummary": {
        "rpcName": "GetBugbotMergedPrScanSummary",
        "kind": "Unary"
      },
      "getBugbotMode": {
        "rpcName": "GetBugbotMode",
        "kind": "Unary"
      },
      "updateBugbotMode": {
        "rpcName": "UpdateBugbotMode",
        "kind": "Unary"
      },
      "getBugBotProUserMode": {
        "rpcName": "GetBugBotProUserMode",
        "kind": "Unary"
      },
      "updateBugBotProUserMode": {
        "rpcName": "UpdateBugBotProUserMode",
        "kind": "Unary"
      },
      "getBugbotUserSettings": {
        "rpcName": "GetBugbotUserSettings",
        "kind": "Unary"
      },
      "updateBugbotUserSettings": {
        "rpcName": "UpdateBugbotUserSettings",
        "kind": "Unary"
      },
      "getFullSelfDrivingUserSettings": {
        "rpcName": "GetFullSelfDrivingUserSettings",
        "kind": "Unary"
      },
      "updateFullSelfDrivingUserSettings": {
        "rpcName": "UpdateFullSelfDrivingUserSettings",
        "kind": "Unary"
      },
      "listFullSelfDrivingRepoSettings": {
        "rpcName": "ListFullSelfDrivingRepoSettings",
        "kind": "Unary"
      },
      "setFullSelfDrivingRepoEnabled": {
        "rpcName": "SetFullSelfDrivingRepoEnabled",
        "kind": "Unary"
      },
      "getFullSelfDrivingTeamSettings": {
        "rpcName": "GetFullSelfDrivingTeamSettings",
        "kind": "Unary"
      },
      "updateFullSelfDrivingTeamSettings": {
        "rpcName": "UpdateFullSelfDrivingTeamSettings",
        "kind": "Unary"
      },
      "listFullSelfDrivingTeamRepoSettings": {
        "rpcName": "ListFullSelfDrivingTeamRepoSettings",
        "kind": "Unary"
      },
      "setFullSelfDrivingTeamRepoEnabled": {
        "rpcName": "SetFullSelfDrivingTeamRepoEnabled",
        "kind": "Unary"
      },
      "listFullSelfDrivingActiveAgents": {
        "rpcName": "ListFullSelfDrivingActiveAgents",
        "kind": "Unary"
      },
      "listFullSelfDrivingTeamActiveAgents": {
        "rpcName": "ListFullSelfDrivingTeamActiveAgents",
        "kind": "Unary"
      },
      "updateFullSelfDrivingPrConfig": {
        "rpcName": "UpdateFullSelfDrivingPrConfig",
        "kind": "Unary"
      },
      "getBugBotProUserSettings": {
        "rpcName": "GetBugBotProUserSettings",
        "kind": "Unary"
      },
      "updateBugBotProUserSettings": {
        "rpcName": "UpdateBugBotProUserSettings",
        "kind": "Unary"
      },
      "migrateBugBotProUserToUsageBasedBilling": {
        "rpcName": "MigrateBugBotProUserToUsageBasedBilling",
        "kind": "Unary"
      },
      "getGlassEarlyPreviewEnrollment": {
        "rpcName": "GetGlassEarlyPreviewEnrollment",
        "kind": "Unary"
      },
      "enrollInGlassEarlyPreview": {
        "rpcName": "EnrollInGlassEarlyPreview",
        "kind": "Unary"
      },
      "unenrollFromGlassEarlyPreview": {
        "rpcName": "UnenrollFromGlassEarlyPreview",
        "kind": "Unary"
      },
      "recordBugbotDeeplinkEvent": {
        "rpcName": "RecordBugbotDeeplinkEvent",
        "kind": "Unary"
      },
      "recordBugbotDeeplinkEventUnauthenticated": {
        "rpcName": "RecordBugbotDeeplinkEventUnauthenticated",
        "kind": "Unary"
      },
      "revokeBugBotLicenses": {
        "rpcName": "RevokeBugBotLicenses",
        "kind": "Unary"
      },
      "revokeUserBugbotLicense": {
        "rpcName": "RevokeUserBugbotLicense",
        "kind": "Unary"
      },
      "startBugbotBackfillLearning": {
        "rpcName": "StartBugbotBackfillLearning",
        "kind": "Unary"
      },
      "getBugbotBackfillStatus": {
        "rpcName": "GetBugbotBackfillStatus",
        "kind": "Unary"
      },
      "setSlackAuth": {
        "rpcName": "SetSlackAuth",
        "kind": "Unary"
      },
      "getSlackTeamSettings": {
        "rpcName": "GetSlackTeamSettings",
        "kind": "Unary"
      },
      "updateSlackTeamSettings": {
        "rpcName": "UpdateSlackTeamSettings",
        "kind": "Unary"
      },
      "getSlackSettings": {
        "rpcName": "GetSlackSettings",
        "kind": "Unary"
      },
      "getSlackModelOptions": {
        "rpcName": "GetSlackModelOptions",
        "kind": "Unary"
      },
      "getSlackInstallUrl": {
        "rpcName": "GetSlackInstallUrl",
        "kind": "Unary"
      },
      "getSlackInstallUrlPublic": {
        "rpcName": "GetSlackInstallUrlPublic",
        "kind": "Unary"
      },
      "getSlackInstallUrlPublicWithUserScopes": {
        "rpcName": "GetSlackInstallUrlPublicWithUserScopes",
        "kind": "Unary"
      },
      "getFilteredUsageEvents": {
        "rpcName": "GetFilteredUsageEvents",
        "kind": "Unary"
      },
      "getAggregatedUsageEvents": {
        "rpcName": "GetAggregatedUsageEvents",
        "kind": "Unary"
      },
      "getAuditLogs": {
        "rpcName": "GetAuditLogs",
        "kind": "Unary"
      },
      "getOrganizationAuditLogs": {
        "rpcName": "GetOrganizationAuditLogs",
        "kind": "Unary"
      },
      "getUserPrivacyMode": {
        "rpcName": "GetUserPrivacyMode",
        "kind": "Unary"
      },
      "setUserPrivacyMode": {
        "rpcName": "SetUserPrivacyMode",
        "kind": "Unary"
      },
      "webAcknowledgeGracePeriodDisclaimer": {
        "rpcName": "WebAcknowledgeGracePeriodDisclaimer",
        "kind": "Unary"
      },
      "skipPrivacyModeGracePeriod": {
        "rpcName": "SkipPrivacyModeGracePeriod",
        "kind": "Unary"
      },
      "needsPrivacyModeMigration": {
        "rpcName": "NeedsPrivacyModeMigration",
        "kind": "Unary"
      },
      "updateTeamPrivacyModeMigrationOptOut": {
        "rpcName": "UpdateTeamPrivacyModeMigrationOptOut",
        "kind": "Unary"
      },
      "shareConversation": {
        "rpcName": "ShareConversation",
        "kind": "Unary"
      },
      "getSharedConversation": {
        "rpcName": "GetSharedConversation",
        "kind": "Unary"
      },
      "getPublicSharedConversation": {
        "rpcName": "GetPublicSharedConversation",
        "kind": "Unary"
      },
      "listSharedConversations": {
        "rpcName": "ListSharedConversations",
        "kind": "Unary"
      },
      "deleteSharedConversation": {
        "rpcName": "DeleteSharedConversation",
        "kind": "Unary"
      },
      "updateSharedConversationVisibility": {
        "rpcName": "UpdateSharedConversationVisibility",
        "kind": "Unary"
      },
      "shareCanvas": {
        "rpcName": "ShareCanvas",
        "kind": "Unary"
      },
      "getSharedCanvas": {
        "rpcName": "GetSharedCanvas",
        "kind": "Unary"
      },
      "getPublicSharedCanvas": {
        "rpcName": "GetPublicSharedCanvas",
        "kind": "Unary"
      },
      "listSharedCanvases": {
        "rpcName": "ListSharedCanvases",
        "kind": "Unary"
      },
      "deleteSharedCanvas": {
        "rpcName": "DeleteSharedCanvas",
        "kind": "Unary"
      },
      "lookupSharedCanvasByKey": {
        "rpcName": "LookupSharedCanvasByKey",
        "kind": "Unary"
      },
      "listUserCanvases": {
        "rpcName": "ListUserCanvases",
        "kind": "Unary"
      },
      "getCanvasMetadata": {
        "rpcName": "GetCanvasMetadata",
        "kind": "Unary"
      },
      "getCanvasPayload": {
        "rpcName": "GetCanvasPayload",
        "kind": "Unary"
      },
      "getTeamSharedConversationSettings": {
        "rpcName": "GetTeamSharedConversationSettings",
        "kind": "Unary"
      },
      "updateTeamSharedConversationSettings": {
        "rpcName": "UpdateTeamSharedConversationSettings",
        "kind": "Unary"
      },
      "getTeamSharedCanvasSettings": {
        "rpcName": "GetTeamSharedCanvasSettings",
        "kind": "Unary"
      },
      "updateTeamSharedCanvasSettings": {
        "rpcName": "UpdateTeamSharedCanvasSettings",
        "kind": "Unary"
      },
      "getTeamPublicProfileSettings": {
        "rpcName": "GetTeamPublicProfileSettings",
        "kind": "Unary"
      },
      "updateTeamPublicProfileSettings": {
        "rpcName": "UpdateTeamPublicProfileSettings",
        "kind": "Unary"
      },
      "getTeamSmartAutoSettings": {
        "rpcName": "GetTeamSmartAutoSettings",
        "kind": "Unary"
      },
      "updateTeamSmartAutoSettings": {
        "rpcName": "UpdateTeamSmartAutoSettings",
        "kind": "Unary"
      },
      "getTeamPromptCachingSettings": {
        "rpcName": "GetTeamPromptCachingSettings",
        "kind": "Unary"
      },
      "updateTeamPromptCachingSettings": {
        "rpcName": "UpdateTeamPromptCachingSettings",
        "kind": "Unary"
      },
      "getUserSmartAutoSettings": {
        "rpcName": "GetUserSmartAutoSettings",
        "kind": "Unary"
      },
      "updateUserSmartAutoSettings": {
        "rpcName": "UpdateUserSmartAutoSettings",
        "kind": "Unary"
      },
      "getTeamBackgroundAgentSettings": {
        "rpcName": "GetTeamBackgroundAgentSettings",
        "kind": "Unary"
      },
      "updateTeamBackgroundAgentSettings": {
        "rpcName": "UpdateTeamBackgroundAgentSettings",
        "kind": "Unary"
      },
      "getRepoSourcePreference": {
        "rpcName": "GetRepoSourcePreference",
        "kind": "Unary"
      },
      "updateUserRepoSourcePreference": {
        "rpcName": "UpdateUserRepoSourcePreference",
        "kind": "Unary"
      },
      "updateTeamRepoSourcePreference": {
        "rpcName": "UpdateTeamRepoSourcePreference",
        "kind": "Unary"
      },
      "resolvePrCreationForge": {
        "rpcName": "ResolvePrCreationForge",
        "kind": "Unary"
      },
      "revokeTeamInviteLink": {
        "rpcName": "RevokeTeamInviteLink",
        "kind": "Unary"
      },
      "listTeamInviteLinks": {
        "rpcName": "ListTeamInviteLinks",
        "kind": "Unary"
      },
      "updateUserName": {
        "rpcName": "UpdateUserName",
        "kind": "Unary"
      },
      "uploadUserProfilePicture": {
        "rpcName": "UploadUserProfilePicture",
        "kind": "Unary"
      },
      "updateUserProfilePicture": {
        "rpcName": "UpdateUserProfilePicture",
        "kind": "Unary"
      },
      "listInvoices": {
        "rpcName": "ListInvoices",
        "kind": "Unary"
      },
      "listBlockingCheckoutInvoices": {
        "rpcName": "ListBlockingCheckoutInvoices",
        "kind": "Unary"
      },
      "listPayableTeamInvoices": {
        "rpcName": "ListPayableTeamInvoices",
        "kind": "Unary"
      },
      "getRemainingRefunds": {
        "rpcName": "GetRemainingRefunds",
        "kind": "Unary"
      },
      "getServiceAccountSpendLimit": {
        "rpcName": "GetServiceAccountSpendLimit",
        "kind": "Unary"
      },
      "setServiceAccountSpendLimit": {
        "rpcName": "SetServiceAccountSpendLimit",
        "kind": "Unary"
      },
      "setUserHardLimit": {
        "rpcName": "SetUserHardLimit",
        "kind": "Unary"
      },
      "setUserMonthlyLimit": {
        "rpcName": "SetUserMonthlyLimit",
        "kind": "Unary"
      },
      "toggleMarketingEmailOpt": {
        "rpcName": "ToggleMarketingEmailOpt",
        "kind": "Unary"
      },
      "getMarketingEmailOpt": {
        "rpcName": "GetMarketingEmailOpt",
        "kind": "Unary"
      },
      "getGlobalLeaderboardOptIn": {
        "rpcName": "GetGlobalLeaderboardOptIn",
        "kind": "Unary"
      },
      "setGlobalLeaderboardOptIn": {
        "rpcName": "SetGlobalLeaderboardOptIn",
        "kind": "Unary"
      },
      "createTeamApiKey": {
        "rpcName": "CreateTeamApiKey",
        "kind": "Unary"
      },
      "revokeTeamApiKey": {
        "rpcName": "RevokeTeamApiKey",
        "kind": "Unary"
      },
      "listTeamApiKeys": {
        "rpcName": "ListTeamApiKeys",
        "kind": "Unary"
      },
      "createOrganizationApiKey": {
        "rpcName": "CreateOrganizationApiKey",
        "kind": "Unary"
      },
      "revokeOrganizationApiKey": {
        "rpcName": "RevokeOrganizationApiKey",
        "kind": "Unary"
      },
      "listOrganizationApiKeys": {
        "rpcName": "ListOrganizationApiKeys",
        "kind": "Unary"
      },
      "createAutomationWebhookApiKey": {
        "rpcName": "CreateAutomationWebhookApiKey",
        "kind": "Unary"
      },
      "createTeamServiceAccount": {
        "rpcName": "CreateTeamServiceAccount",
        "kind": "Unary"
      },
      "listTeamServiceAccounts": {
        "rpcName": "ListTeamServiceAccounts",
        "kind": "Unary"
      },
      "deleteTeamServiceAccount": {
        "rpcName": "DeleteTeamServiceAccount",
        "kind": "Unary"
      },
      "archiveTeamServiceAccount": {
        "rpcName": "ArchiveTeamServiceAccount",
        "kind": "Unary"
      },
      "rotateServiceAccountApiKey": {
        "rpcName": "RotateServiceAccountApiKey",
        "kind": "Unary"
      },
      "getTeamRepositoriesForServiceAccountScope": {
        "rpcName": "GetTeamRepositoriesForServiceAccountScope",
        "kind": "Unary"
      },
      "updateServiceAccountRepoScope": {
        "rpcName": "UpdateServiceAccountRepoScope",
        "kind": "Unary"
      },
      "createUserApiKey": {
        "rpcName": "CreateUserApiKey",
        "kind": "Unary"
      },
      "revokeUserApiKey": {
        "rpcName": "RevokeUserApiKey",
        "kind": "Unary"
      },
      "listUserApiKeys": {
        "rpcName": "ListUserApiKeys",
        "kind": "Unary"
      },
      "confirmGithubInstallation": {
        "rpcName": "ConfirmGithubInstallation",
        "kind": "Unary"
      },
      "updateTeamName": {
        "rpcName": "UpdateTeamName",
        "kind": "Unary"
      },
      "updateTeamDashboardAnalyticsSetting": {
        "rpcName": "UpdateTeamDashboardAnalyticsSetting",
        "kind": "Unary"
      },
      "updateTeamOriginSetting": {
        "rpcName": "UpdateTeamOriginSetting",
        "kind": "Unary"
      },
      "updateTeamScimRequireUserDirectorySetting": {
        "rpcName": "UpdateTeamScimRequireUserDirectorySetting",
        "kind": "Unary"
      },
      "getTeamScimRequireUserDirectoryPreview": {
        "rpcName": "GetTeamScimRequireUserDirectoryPreview",
        "kind": "Unary"
      },
      "getSlackUserSettings": {
        "rpcName": "GetSlackUserSettings",
        "kind": "Unary"
      },
      "updateSlackUserSettings": {
        "rpcName": "UpdateSlackUserSettings",
        "kind": "Unary"
      },
      "getSlackRepoRoutingRules": {
        "rpcName": "GetSlackRepoRoutingRules",
        "kind": "Unary"
      },
      "createSlackRepoRoutingRule": {
        "rpcName": "CreateSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "updateSlackRepoRoutingRule": {
        "rpcName": "UpdateSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "deleteSlackRepoRoutingRule": {
        "rpcName": "DeleteSlackRepoRoutingRule",
        "kind": "Unary"
      },
      "getSlackDefaultWorkerRules": {
        "rpcName": "GetSlackDefaultWorkerRules",
        "kind": "Unary"
      },
      "setSlackDefaultWorkerRule": {
        "rpcName": "SetSlackDefaultWorkerRule",
        "kind": "Unary"
      },
      "deleteSlackDefaultWorkerRule": {
        "rpcName": "DeleteSlackDefaultWorkerRule",
        "kind": "Unary"
      },
      "isOnNewPricing": {
        "rpcName": "IsOnNewPricing",
        "kind": "Unary"
      },
      "getLinearAuthUrl": {
        "rpcName": "GetLinearAuthUrl",
        "kind": "Unary"
      },
      "connectLinearCallback": {
        "rpcName": "ConnectLinearCallback",
        "kind": "Unary"
      },
      "getMicrosoftTeamsLinkContext": {
        "rpcName": "GetMicrosoftTeamsLinkContext",
        "kind": "Unary"
      },
      "setMicrosoftTeamsAuth": {
        "rpcName": "SetMicrosoftTeamsAuth",
        "kind": "Unary"
      },
      "getLinearStatus": {
        "rpcName": "GetLinearStatus",
        "kind": "Unary"
      },
      "disconnectLinear": {
        "rpcName": "DisconnectLinear",
        "kind": "Unary"
      },
      "getLinearTeams": {
        "rpcName": "GetLinearTeams",
        "kind": "Unary"
      },
      "getLinearSettings": {
        "rpcName": "GetLinearSettings",
        "kind": "Unary"
      },
      "updateLinearTeamSetting": {
        "rpcName": "UpdateLinearTeamSetting",
        "kind": "Unary"
      },
      "updateLinearProjectSetting": {
        "rpcName": "UpdateLinearProjectSetting",
        "kind": "Unary"
      },
      "getLinearLabels": {
        "rpcName": "GetLinearLabels",
        "kind": "Unary"
      },
      "getLinearIssues": {
        "rpcName": "GetLinearIssues",
        "kind": "Unary"
      },
      "getXaiTeamLinkStatus": {
        "rpcName": "GetXaiTeamLinkStatus",
        "kind": "Unary"
      },
      "startXaiTeamLink": {
        "rpcName": "StartXaiTeamLink",
        "kind": "Unary"
      },
      "confirmXaiTeamLink": {
        "rpcName": "ConfirmXaiTeamLink",
        "kind": "Unary"
      },
      "cancelXaiTeamLinkProposal": {
        "rpcName": "CancelXaiTeamLinkProposal",
        "kind": "Unary"
      },
      "unlinkXaiTeam": {
        "rpcName": "UnlinkXaiTeam",
        "kind": "Unary"
      },
      "transferXaiCredits": {
        "rpcName": "TransferXaiCredits",
        "kind": "Unary"
      },
      "getXaiCreditTransferStatus": {
        "rpcName": "GetXaiCreditTransferStatus",
        "kind": "Unary"
      },
      "listXaiCreditTransfers": {
        "rpcName": "ListXaiCreditTransfers",
        "kind": "Unary"
      },
      "getPagerDutyAuthUrl": {
        "rpcName": "GetPagerDutyAuthUrl",
        "kind": "Unary"
      },
      "connectPagerDutyCallback": {
        "rpcName": "ConnectPagerDutyCallback",
        "kind": "Unary"
      },
      "getPagerDutyStatus": {
        "rpcName": "GetPagerDutyStatus",
        "kind": "Unary"
      },
      "getPagerDutyServices": {
        "rpcName": "GetPagerDutyServices",
        "kind": "Unary"
      },
      "disconnectPagerDuty": {
        "rpcName": "DisconnectPagerDuty",
        "kind": "Unary"
      },
      "getJiraInstallUrl": {
        "rpcName": "GetJiraInstallUrl",
        "kind": "Unary"
      },
      "linkJiraInstallation": {
        "rpcName": "LinkJiraInstallation",
        "kind": "Unary"
      },
      "getJiraStatus": {
        "rpcName": "GetJiraStatus",
        "kind": "Unary"
      },
      "getBitbucketForgeStatus": {
        "rpcName": "GetBitbucketForgeStatus",
        "kind": "Unary"
      },
      "disconnectJira": {
        "rpcName": "DisconnectJira",
        "kind": "Unary"
      },
      "disconnectBitbucketForge": {
        "rpcName": "DisconnectBitbucketForge",
        "kind": "Unary"
      },
      "getJiraProjects": {
        "rpcName": "GetJiraProjects",
        "kind": "Unary"
      },
      "getJiraTeamSettings": {
        "rpcName": "GetJiraTeamSettings",
        "kind": "Unary"
      },
      "updateJiraTeamSettings": {
        "rpcName": "UpdateJiraTeamSettings",
        "kind": "Unary"
      },
      "getJiraRoutingRules": {
        "rpcName": "GetJiraRoutingRules",
        "kind": "Unary"
      },
      "createJiraRoutingRule": {
        "rpcName": "CreateJiraRoutingRule",
        "kind": "Unary"
      },
      "updateJiraRoutingRule": {
        "rpcName": "UpdateJiraRoutingRule",
        "kind": "Unary"
      },
      "deleteJiraRoutingRule": {
        "rpcName": "DeleteJiraRoutingRule",
        "kind": "Unary"
      },
      "linkJiraUser": {
        "rpcName": "LinkJiraUser",
        "kind": "Unary"
      },
      "listJiraUserLinks": {
        "rpcName": "ListJiraUserLinks",
        "kind": "Unary"
      },
      "unlinkJiraUser": {
        "rpcName": "UnlinkJiraUser",
        "kind": "Unary"
      },
      "deleteBedrockIamRole": {
        "rpcName": "DeleteBedrockIamRole",
        "kind": "Unary"
      },
      "unlinkSlackAccess": {
        "rpcName": "UnlinkSlackAccess",
        "kind": "Unary"
      },
      "listSlackConversations": {
        "rpcName": "ListSlackConversations",
        "kind": "Unary"
      },
      "listMicrosoftTeamsChannels": {
        "rpcName": "ListMicrosoftTeamsChannels",
        "kind": "Unary"
      },
      "getSlackConversationsByIds": {
        "rpcName": "GetSlackConversationsByIds",
        "kind": "Unary"
      },
      "logSlackbotAuthConversionFunnel": {
        "rpcName": "LogSlackbotAuthConversionFunnel",
        "kind": "Unary"
      },
      "logClickedConnectSlack": {
        "rpcName": "LogClickedConnectSlack",
        "kind": "Unary"
      },
      "checkUserApiKeyAccess": {
        "rpcName": "CheckUserApiKeyAccess",
        "kind": "Unary"
      },
      "isAllowedFreeTrialUsage": {
        "rpcName": "IsAllowedFreeTrialUsage",
        "kind": "Unary"
      },
      "isNextSetupRunFree": {
        "rpcName": "IsNextSetupRunFree",
        "kind": "Unary"
      },
      "completedLinkSlackAccount": {
        "rpcName": "CompletedLinkSlackAccount",
        "kind": "Unary"
      },
      "notifyBugbotTeamAdmins": {
        "rpcName": "NotifyBugbotTeamAdmins",
        "kind": "Unary"
      },
      "getAdminNotificationStatus": {
        "rpcName": "GetAdminNotificationStatus",
        "kind": "Unary"
      },
      "optOutNewPricing": {
        "rpcName": "OptOutNewPricing",
        "kind": "Unary"
      },
      "submitFeedback": {
        "rpcName": "SubmitFeedback",
        "kind": "Unary"
      },
      "submitFeedbackAnon": {
        "rpcName": "SubmitFeedbackAnon",
        "kind": "Unary"
      },
      "getActiveOffboardingBanner": {
        "rpcName": "GetActiveOffboardingBanner",
        "kind": "Unary"
      },
      "clientAction": {
        "rpcName": "ClientAction",
        "kind": "Unary"
      },
      "listUsageAlerts": {
        "rpcName": "ListUsageAlerts",
        "kind": "Unary"
      },
      "createUsageAlerts": {
        "rpcName": "CreateUsageAlerts",
        "kind": "Unary"
      },
      "deleteUsageAlerts": {
        "rpcName": "DeleteUsageAlerts",
        "kind": "Unary"
      },
      "updateUsageAlerts": {
        "rpcName": "UpdateUsageAlerts",
        "kind": "Unary"
      },
      "requestIndividualLimitsOptOut": {
        "rpcName": "RequestIndividualLimitsOptOut",
        "kind": "Unary"
      },
      "listMarketplacePlugins": {
        "rpcName": "ListMarketplacePlugins",
        "kind": "Unary"
      },
      "getUserProfile": {
        "rpcName": "GetUserProfile",
        "kind": "Unary"
      },
      "updateUserProfile": {
        "rpcName": "UpdateUserProfile",
        "kind": "Unary"
      },
      "claimUserProfileHandle": {
        "rpcName": "ClaimUserProfileHandle",
        "kind": "Unary"
      },
      "getPublicProfileByHandle": {
        "rpcName": "GetPublicProfileByHandle",
        "kind": "Unary"
      },
      "getViewableProfileByHandle": {
        "rpcName": "GetViewableProfileByHandle",
        "kind": "Unary"
      },
      "getTeamMemberProfileByHandle": {
        "rpcName": "GetTeamMemberProfileByHandle",
        "kind": "Unary"
      },
      "getPlugin": {
        "rpcName": "GetPlugin",
        "kind": "Unary"
      },
      "createPlugin": {
        "rpcName": "CreatePlugin",
        "kind": "Unary"
      },
      "updatePluginMcpConfig": {
        "rpcName": "UpdatePluginMcpConfig",
        "kind": "Unary"
      },
      "publishPlugin": {
        "rpcName": "PublishPlugin",
        "kind": "Unary"
      },
      "unpublishPlugin": {
        "rpcName": "UnpublishPlugin",
        "kind": "Unary"
      },
      "parseGitHubRepoForPlugins": {
        "rpcName": "ParseGitHubRepoForPlugins",
        "kind": "Unary"
      },
      "parsePluginPublisherRepoInternal": {
        "rpcName": "ParsePluginPublisherRepoInternal",
        "kind": "Unary"
      },
      "previewReindexPluginRepoInternal": {
        "rpcName": "PreviewReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "applyReindexPluginRepoInternal": {
        "rpcName": "ApplyReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "previewMigrateReindexPluginRepoInternal": {
        "rpcName": "PreviewMigrateReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "applyMigrateReindexPluginRepoInternal": {
        "rpcName": "ApplyMigrateReindexPluginRepoInternal",
        "kind": "Unary"
      },
      "updateTeamMarketplaceOriginDistributionInternal": {
        "rpcName": "UpdateTeamMarketplaceOriginDistributionInternal",
        "kind": "Unary"
      },
      "createSupportImpersonationSessionInternal": {
        "rpcName": "CreateSupportImpersonationSessionInternal",
        "kind": "Unary"
      },
      "submitPluginForApproval": {
        "rpcName": "SubmitPluginForApproval",
        "kind": "Unary"
      },
      "approvePlugin": {
        "rpcName": "ApprovePlugin",
        "kind": "Unary"
      },
      "rejectPlugin": {
        "rpcName": "RejectPlugin",
        "kind": "Unary"
      },
      "listUserPluginInstalls": {
        "rpcName": "ListUserPluginInstalls",
        "kind": "Unary"
      },
      "installUserPlugin": {
        "rpcName": "InstallUserPlugin",
        "kind": "Unary"
      },
      "updateUserPluginInstall": {
        "rpcName": "UpdateUserPluginInstall",
        "kind": "Unary"
      },
      "uninstallUserPlugin": {
        "rpcName": "UninstallUserPlugin",
        "kind": "Unary"
      },
      "listTeamPluginInstalls": {
        "rpcName": "ListTeamPluginInstalls",
        "kind": "Unary"
      },
      "getTeamPluginPopularity": {
        "rpcName": "GetTeamPluginPopularity",
        "kind": "Unary"
      },
      "getTeamPluginPrimitiveUsage": {
        "rpcName": "GetTeamPluginPrimitiveUsage",
        "kind": "Unary"
      },
      "listTeamAvailableMarketplacePlugins": {
        "rpcName": "ListTeamAvailableMarketplacePlugins",
        "kind": "Unary"
      },
      "getTeamPinnedMarketplacePlugins": {
        "rpcName": "GetTeamPinnedMarketplacePlugins",
        "kind": "Unary"
      },
      "updateTeamPinnedMarketplacePlugins": {
        "rpcName": "UpdateTeamPinnedMarketplacePlugins",
        "kind": "Unary"
      },
      "installTeamPlugin": {
        "rpcName": "InstallTeamPlugin",
        "kind": "Unary"
      },
      "updateTeamPluginInstall": {
        "rpcName": "UpdateTeamPluginInstall",
        "kind": "Unary"
      },
      "uninstallTeamPlugin": {
        "rpcName": "UninstallTeamPlugin",
        "kind": "Unary"
      },
      "getEffectiveUserPlugins": {
        "rpcName": "GetEffectiveUserPlugins",
        "kind": "Unary"
      },
      "resolvePluginsByRef": {
        "rpcName": "ResolvePluginsByRef",
        "kind": "Unary"
      },
      "listMarketplaces": {
        "rpcName": "ListMarketplaces",
        "kind": "Unary"
      },
      "addMarketplace": {
        "rpcName": "AddMarketplace",
        "kind": "Unary"
      },
      "getOrCreateDefaultTeamMarketplace": {
        "rpcName": "GetOrCreateDefaultTeamMarketplace",
        "kind": "Unary"
      },
      "updateMarketplace": {
        "rpcName": "UpdateMarketplace",
        "kind": "Unary"
      },
      "removeMarketplace": {
        "rpcName": "RemoveMarketplace",
        "kind": "Unary"
      },
      "refreshMarketplace": {
        "rpcName": "RefreshMarketplace",
        "kind": "Unary"
      },
      "reindexAndApplyTeamMarketplaceChanges": {
        "rpcName": "ReindexAndApplyTeamMarketplaceChanges",
        "kind": "Unary"
      },
      "registerMarketplaceAndPlugins": {
        "rpcName": "RegisterMarketplaceAndPlugins",
        "kind": "Unary"
      },
      "updateTeamMarketplaceConfig": {
        "rpcName": "UpdateTeamMarketplaceConfig",
        "kind": "Unary"
      },
      "setTeamMarketplaceRepository": {
        "rpcName": "SetTeamMarketplaceRepository",
        "kind": "Unary"
      },
      "setMarketplaceOriginDistribution": {
        "rpcName": "SetMarketplaceOriginDistribution",
        "kind": "Unary"
      },
      "getMarketplaceOriginDistributionStatus": {
        "rpcName": "GetMarketplaceOriginDistributionStatus",
        "kind": "Unary"
      },
      "setTeamMarketplacePluginPolicies": {
        "rpcName": "SetTeamMarketplacePluginPolicies",
        "kind": "Unary"
      },
      "setTeamMarketplacePluginPolicyVariables": {
        "rpcName": "SetTeamMarketplacePluginPolicyVariables",
        "kind": "Unary"
      },
      "applyTeamMarketplaceRequiredPlugins": {
        "rpcName": "ApplyTeamMarketplaceRequiredPlugins",
        "kind": "Unary"
      },
      "linkPluginsToTeamMarketplace": {
        "rpcName": "LinkPluginsToTeamMarketplace",
        "kind": "Unary"
      },
      "unlinkPluginsFromTeamMarketplace": {
        "rpcName": "UnlinkPluginsFromTeamMarketplace",
        "kind": "Unary"
      },
      "previewTeamMarketplaceMcpImpact": {
        "rpcName": "PreviewTeamMarketplaceMcpImpact",
        "kind": "Unary"
      },
      "getManagedSkills": {
        "rpcName": "GetManagedSkills",
        "kind": "Unary"
      },
      "getCursorUserState": {
        "rpcName": "GetCursorUserState",
        "kind": "Unary"
      },
      "setJobData": {
        "rpcName": "SetJobData",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.GrokBotService",
    "bundle": "electron-main.cjs",
    "methods": {
      "ensureSandBox": {
        "rpcName": "EnsureSandBox",
        "kind": "Unary"
      },
      "ensureSandBoxWindow": {
        "rpcName": "EnsureSandBoxWindow",
        "kind": "Unary"
      },
      "recreateSandBox": {
        "rpcName": "RecreateSandBox",
        "kind": "Unary"
      },
      "forceRecreateSandBox": {
        "rpcName": "ForceRecreateSandBox",
        "kind": "Unary"
      },
      "adminRecreateSandBox": {
        "rpcName": "AdminRecreateSandBox",
        "kind": "Unary"
      },
      "adminForceRecreateSandBox": {
        "rpcName": "AdminForceRecreateSandBox",
        "kind": "Unary"
      },
      "presignSandBoxStoreWrites": {
        "rpcName": "PresignSandBoxStoreWrites",
        "kind": "Unary"
      },
      "completeSandBoxStoreMultipartWrites": {
        "rpcName": "CompleteSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "abortSandBoxStoreMultipartWrites": {
        "rpcName": "AbortSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "presignSandBoxStoreReads": {
        "rpcName": "PresignSandBoxStoreReads",
        "kind": "Unary"
      },
      "statSandBoxStoreObject": {
        "rpcName": "StatSandBoxStoreObject",
        "kind": "Unary"
      },
      "listSandBoxStoreObjects": {
        "rpcName": "ListSandBoxStoreObjects",
        "kind": "Unary"
      },
      "adminGetSandBoxStoreStatus": {
        "rpcName": "AdminGetSandBoxStoreStatus",
        "kind": "Unary"
      },
      "adminUpdateSandBoxHost": {
        "rpcName": "AdminUpdateSandBoxHost",
        "kind": "Unary"
      },
      "adminGetSandBoxHostStatus": {
        "rpcName": "AdminGetSandBoxHostStatus",
        "kind": "Unary"
      },
      "adminSnapshotSandBoxStore": {
        "rpcName": "AdminSnapshotSandBoxStore",
        "kind": "Unary"
      },
      "adminListSandBoxStoreManifestVersions": {
        "rpcName": "AdminListSandBoxStoreManifestVersions",
        "kind": "Unary"
      },
      "adminRestoreSandBoxStoreSnapshot": {
        "rpcName": "AdminRestoreSandBoxStoreSnapshot",
        "kind": "Unary"
      },
      "adminHibernateSandBox": {
        "rpcName": "AdminHibernateSandBox",
        "kind": "Unary"
      },
      "adminListSandAgents": {
        "rpcName": "AdminListSandAgents",
        "kind": "Unary"
      },
      "adminGetSandAgentTranscriptPage": {
        "rpcName": "AdminGetSandAgentTranscriptPage",
        "kind": "Unary"
      },
      "watchSandBoxMigration": {
        "rpcName": "WatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "adminWatchSandBoxMigration": {
        "rpcName": "AdminWatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "getSandBoxRunState": {
        "rpcName": "GetSandBoxRunState",
        "kind": "Unary"
      },
      "getSandBoxUpgradeSchedule": {
        "rpcName": "GetSandBoxUpgradeSchedule",
        "kind": "Unary"
      },
      "scheduleSandBoxUpgrade": {
        "rpcName": "ScheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "cancelSandBoxUpgrade": {
        "rpcName": "CancelSandBoxUpgrade",
        "kind": "Unary"
      },
      "rescheduleSandBoxUpgrade": {
        "rpcName": "RescheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "listSandBoxes": {
        "rpcName": "ListSandBoxes",
        "kind": "Unary"
      },
      "notifySandAgentTurnFinished": {
        "rpcName": "NotifySandAgentTurnFinished",
        "kind": "Unary"
      },
      "listSandSetupManifests": {
        "rpcName": "ListSandSetupManifests",
        "kind": "Unary"
      },
      "listTeamSandSetupManifests": {
        "rpcName": "ListTeamSandSetupManifests",
        "kind": "Unary"
      },
      "saveTeamSandSetupManifest": {
        "rpcName": "SaveTeamSandSetupManifest",
        "kind": "Unary"
      },
      "deleteTeamSandSetupManifest": {
        "rpcName": "DeleteTeamSandSetupManifest",
        "kind": "Unary"
      },
      "listTeamMemberSandBoxes": {
        "rpcName": "ListTeamMemberSandBoxes",
        "kind": "Unary"
      },
      "killTeamMemberSandBox": {
        "rpcName": "KillTeamMemberSandBox",
        "kind": "Unary"
      },
      "commitGrokBotTranscriptEntries": {
        "rpcName": "CommitGrokBotTranscriptEntries",
        "kind": "Unary"
      },
      "listGrokBotTranscriptEntries": {
        "rpcName": "ListGrokBotTranscriptEntries",
        "kind": "Unary"
      },
      "createGrokBotAgent": {
        "rpcName": "CreateGrokBotAgent",
        "kind": "Unary"
      },
      "listGrokBotAgents": {
        "rpcName": "ListGrokBotAgents",
        "kind": "Unary"
      },
      "updateGrokBotAgent": {
        "rpcName": "UpdateGrokBotAgent",
        "kind": "Unary"
      },
      "deleteGrokBotAgent": {
        "rpcName": "DeleteGrokBotAgent",
        "kind": "Unary"
      },
      "createGrokBotTemplate": {
        "rpcName": "CreateGrokBotTemplate",
        "kind": "Unary"
      },
      "updateGrokBotTemplate": {
        "rpcName": "UpdateGrokBotTemplate",
        "kind": "Unary"
      },
      "listGrokBotTemplates": {
        "rpcName": "ListGrokBotTemplates",
        "kind": "Unary"
      },
      "deleteGrokBotTemplate": {
        "rpcName": "DeleteGrokBotTemplate",
        "kind": "Unary"
      },
      "getPublicGrokBotTemplate": {
        "rpcName": "GetPublicGrokBotTemplate",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.GrokBotService",
    "bundle": "host-main.cjs",
    "methods": {
      "ensureSandBox": {
        "rpcName": "EnsureSandBox",
        "kind": "Unary"
      },
      "ensureSandBoxWindow": {
        "rpcName": "EnsureSandBoxWindow",
        "kind": "Unary"
      },
      "recreateSandBox": {
        "rpcName": "RecreateSandBox",
        "kind": "Unary"
      },
      "forceRecreateSandBox": {
        "rpcName": "ForceRecreateSandBox",
        "kind": "Unary"
      },
      "adminRecreateSandBox": {
        "rpcName": "AdminRecreateSandBox",
        "kind": "Unary"
      },
      "adminForceRecreateSandBox": {
        "rpcName": "AdminForceRecreateSandBox",
        "kind": "Unary"
      },
      "presignSandBoxStoreWrites": {
        "rpcName": "PresignSandBoxStoreWrites",
        "kind": "Unary"
      },
      "completeSandBoxStoreMultipartWrites": {
        "rpcName": "CompleteSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "abortSandBoxStoreMultipartWrites": {
        "rpcName": "AbortSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "presignSandBoxStoreReads": {
        "rpcName": "PresignSandBoxStoreReads",
        "kind": "Unary"
      },
      "statSandBoxStoreObject": {
        "rpcName": "StatSandBoxStoreObject",
        "kind": "Unary"
      },
      "listSandBoxStoreObjects": {
        "rpcName": "ListSandBoxStoreObjects",
        "kind": "Unary"
      },
      "adminGetSandBoxStoreStatus": {
        "rpcName": "AdminGetSandBoxStoreStatus",
        "kind": "Unary"
      },
      "adminUpdateSandBoxHost": {
        "rpcName": "AdminUpdateSandBoxHost",
        "kind": "Unary"
      },
      "adminGetSandBoxHostStatus": {
        "rpcName": "AdminGetSandBoxHostStatus",
        "kind": "Unary"
      },
      "adminSnapshotSandBoxStore": {
        "rpcName": "AdminSnapshotSandBoxStore",
        "kind": "Unary"
      },
      "adminListSandBoxStoreManifestVersions": {
        "rpcName": "AdminListSandBoxStoreManifestVersions",
        "kind": "Unary"
      },
      "adminRestoreSandBoxStoreSnapshot": {
        "rpcName": "AdminRestoreSandBoxStoreSnapshot",
        "kind": "Unary"
      },
      "adminHibernateSandBox": {
        "rpcName": "AdminHibernateSandBox",
        "kind": "Unary"
      },
      "adminListSandAgents": {
        "rpcName": "AdminListSandAgents",
        "kind": "Unary"
      },
      "adminGetSandAgentTranscriptPage": {
        "rpcName": "AdminGetSandAgentTranscriptPage",
        "kind": "Unary"
      },
      "watchSandBoxMigration": {
        "rpcName": "WatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "adminWatchSandBoxMigration": {
        "rpcName": "AdminWatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "getSandBoxRunState": {
        "rpcName": "GetSandBoxRunState",
        "kind": "Unary"
      },
      "getSandBoxUpgradeSchedule": {
        "rpcName": "GetSandBoxUpgradeSchedule",
        "kind": "Unary"
      },
      "scheduleSandBoxUpgrade": {
        "rpcName": "ScheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "cancelSandBoxUpgrade": {
        "rpcName": "CancelSandBoxUpgrade",
        "kind": "Unary"
      },
      "rescheduleSandBoxUpgrade": {
        "rpcName": "RescheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "listSandBoxes": {
        "rpcName": "ListSandBoxes",
        "kind": "Unary"
      },
      "notifySandAgentTurnFinished": {
        "rpcName": "NotifySandAgentTurnFinished",
        "kind": "Unary"
      },
      "listSandSetupManifests": {
        "rpcName": "ListSandSetupManifests",
        "kind": "Unary"
      },
      "listTeamSandSetupManifests": {
        "rpcName": "ListTeamSandSetupManifests",
        "kind": "Unary"
      },
      "saveTeamSandSetupManifest": {
        "rpcName": "SaveTeamSandSetupManifest",
        "kind": "Unary"
      },
      "deleteTeamSandSetupManifest": {
        "rpcName": "DeleteTeamSandSetupManifest",
        "kind": "Unary"
      },
      "listTeamMemberSandBoxes": {
        "rpcName": "ListTeamMemberSandBoxes",
        "kind": "Unary"
      },
      "killTeamMemberSandBox": {
        "rpcName": "KillTeamMemberSandBox",
        "kind": "Unary"
      },
      "commitGrokBotTranscriptEntries": {
        "rpcName": "CommitGrokBotTranscriptEntries",
        "kind": "Unary"
      },
      "listGrokBotTranscriptEntries": {
        "rpcName": "ListGrokBotTranscriptEntries",
        "kind": "Unary"
      },
      "createGrokBotAgent": {
        "rpcName": "CreateGrokBotAgent",
        "kind": "Unary"
      },
      "listGrokBotAgents": {
        "rpcName": "ListGrokBotAgents",
        "kind": "Unary"
      },
      "updateGrokBotAgent": {
        "rpcName": "UpdateGrokBotAgent",
        "kind": "Unary"
      },
      "deleteGrokBotAgent": {
        "rpcName": "DeleteGrokBotAgent",
        "kind": "Unary"
      },
      "createGrokBotTemplate": {
        "rpcName": "CreateGrokBotTemplate",
        "kind": "Unary"
      },
      "updateGrokBotTemplate": {
        "rpcName": "UpdateGrokBotTemplate",
        "kind": "Unary"
      },
      "listGrokBotTemplates": {
        "rpcName": "ListGrokBotTemplates",
        "kind": "Unary"
      },
      "deleteGrokBotTemplate": {
        "rpcName": "DeleteGrokBotTemplate",
        "kind": "Unary"
      },
      "getPublicGrokBotTemplate": {
        "rpcName": "GetPublicGrokBotTemplate",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.InferenceService",
    "bundle": "host-main.cjs",
    "methods": {
      "stream": {
        "rpcName": "Stream",
        "kind": "ServerStreaming"
      },
      "recordAgentFollowupClassification": {
        "rpcName": "RecordAgentFollowupClassification",
        "kind": "Unary"
      },
      "recordAgentPostTurnLabeling": {
        "rpcName": "RecordAgentPostTurnLabeling",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.MetricsService",
    "bundle": "host-main.cjs",
    "methods": {
      "reportIncrement": {
        "rpcName": "ReportIncrement",
        "kind": "Unary"
      },
      "reportDecrement": {
        "rpcName": "ReportDecrement",
        "kind": "Unary"
      },
      "reportDistribution": {
        "rpcName": "ReportDistribution",
        "kind": "Unary"
      },
      "reportGauge": {
        "rpcName": "ReportGauge",
        "kind": "Unary"
      },
      "submitPerformanceEvents": {
        "rpcName": "SubmitPerformanceEvents",
        "kind": "Unary"
      },
      "submitProfile": {
        "rpcName": "SubmitProfile",
        "kind": "Unary"
      },
      "submitInteractionWindow": {
        "rpcName": "SubmitInteractionWindow",
        "kind": "Unary"
      },
      "submitSpans": {
        "rpcName": "SubmitSpans",
        "kind": "Unary"
      },
      "submitToolCallEvents": {
        "rpcName": "SubmitToolCallEvents",
        "kind": "Unary"
      },
      "submitChatRequestEvents": {
        "rpcName": "SubmitChatRequestEvents",
        "kind": "Unary"
      }
    }
  },
  {
    "service": "aiserver.v1.SandBoxService",
    "bundle": "electron-main.cjs",
    "methods": {
      "ensureSandBox": {
        "rpcName": "EnsureSandBox",
        "kind": "Unary"
      },
      "ensureSandBoxWindow": {
        "rpcName": "EnsureSandBoxWindow",
        "kind": "Unary"
      },
      "recreateSandBox": {
        "rpcName": "RecreateSandBox",
        "kind": "Unary"
      },
      "forceRecreateSandBox": {
        "rpcName": "ForceRecreateSandBox",
        "kind": "Unary"
      },
      "adminRecreateSandBox": {
        "rpcName": "AdminRecreateSandBox",
        "kind": "Unary"
      },
      "adminForceRecreateSandBox": {
        "rpcName": "AdminForceRecreateSandBox",
        "kind": "Unary"
      },
      "presignSandBoxStoreWrites": {
        "rpcName": "PresignSandBoxStoreWrites",
        "kind": "Unary"
      },
      "completeSandBoxStoreMultipartWrites": {
        "rpcName": "CompleteSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "abortSandBoxStoreMultipartWrites": {
        "rpcName": "AbortSandBoxStoreMultipartWrites",
        "kind": "Unary"
      },
      "presignSandBoxStoreReads": {
        "rpcName": "PresignSandBoxStoreReads",
        "kind": "Unary"
      },
      "statSandBoxStoreObject": {
        "rpcName": "StatSandBoxStoreObject",
        "kind": "Unary"
      },
      "listSandBoxStoreObjects": {
        "rpcName": "ListSandBoxStoreObjects",
        "kind": "Unary"
      },
      "adminGetSandBoxStoreStatus": {
        "rpcName": "AdminGetSandBoxStoreStatus",
        "kind": "Unary"
      },
      "adminUpdateSandBoxHost": {
        "rpcName": "AdminUpdateSandBoxHost",
        "kind": "Unary"
      },
      "adminGetSandBoxHostStatus": {
        "rpcName": "AdminGetSandBoxHostStatus",
        "kind": "Unary"
      },
      "adminSnapshotSandBoxStore": {
        "rpcName": "AdminSnapshotSandBoxStore",
        "kind": "Unary"
      },
      "adminListSandBoxStoreManifestVersions": {
        "rpcName": "AdminListSandBoxStoreManifestVersions",
        "kind": "Unary"
      },
      "adminRestoreSandBoxStoreSnapshot": {
        "rpcName": "AdminRestoreSandBoxStoreSnapshot",
        "kind": "Unary"
      },
      "adminHibernateSandBox": {
        "rpcName": "AdminHibernateSandBox",
        "kind": "Unary"
      },
      "adminListSandAgents": {
        "rpcName": "AdminListSandAgents",
        "kind": "Unary"
      },
      "adminGetSandAgentTranscriptPage": {
        "rpcName": "AdminGetSandAgentTranscriptPage",
        "kind": "Unary"
      },
      "watchSandBoxMigration": {
        "rpcName": "WatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "adminWatchSandBoxMigration": {
        "rpcName": "AdminWatchSandBoxMigration",
        "kind": "ServerStreaming"
      },
      "getSandBoxRunState": {
        "rpcName": "GetSandBoxRunState",
        "kind": "Unary"
      },
      "getSandBoxUpgradeSchedule": {
        "rpcName": "GetSandBoxUpgradeSchedule",
        "kind": "Unary"
      },
      "scheduleSandBoxUpgrade": {
        "rpcName": "ScheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "cancelSandBoxUpgrade": {
        "rpcName": "CancelSandBoxUpgrade",
        "kind": "Unary"
      },
      "rescheduleSandBoxUpgrade": {
        "rpcName": "RescheduleSandBoxUpgrade",
        "kind": "Unary"
      },
      "listSandBoxes": {
        "rpcName": "ListSandBoxes",
        "kind": "Unary"
      },
      "notifySandAgentTurnFinished": {
        "rpcName": "NotifySandAgentTurnFinished",
        "kind": "Unary"
      },
      "listSandSetupManifests": {
        "rpcName": "ListSandSetupManifests",
        "kind": "Unary"
      },
      "listTeamSandSetupManifests": {
        "rpcName": "ListTeamSandSetupManifests",
        "kind": "Unary"
      },
      "saveTeamSandSetupManifest": {
        "rpcName": "SaveTeamSandSetupManifest",
        "kind": "Unary"
      },
      "deleteTeamSandSetupManifest": {
        "rpcName": "DeleteTeamSandSetupManifest",
        "kind": "Unary"
      },
      "listTeamMemberSandBoxes": {
        "rpcName": "ListTeamMemberSandBoxes",
        "kind": "Unary"
      },
      "killTeamMemberSandBox": {
        "rpcName": "KillTeamMemberSandBox",
        "kind": "Unary"
      }
    }
  }
];

export const SERVICE_NAMES = [
  "agent.v1.AgentService",
  "agent.v1.ControlService",
  "agent.v1.ExecService",
  "aiserver.v1.AiService",
  "aiserver.v1.AiService",
  "aiserver.v1.AnalyticsService",
  "aiserver.v1.AnalyticsService",
  "aiserver.v1.AutomationsService",
  "aiserver.v1.BackgroundComposerService",
  "aiserver.v1.BackgroundComposerService",
  "aiserver.v1.DashboardService",
  "aiserver.v1.DashboardService",
  "aiserver.v1.GrokBotService",
  "aiserver.v1.GrokBotService",
  "aiserver.v1.InferenceService",
  "aiserver.v1.MetricsService",
  "aiserver.v1.SandBoxService",
] as const;

export type ServiceName = (typeof SERVICE_NAMES)[number];

/** SAND_* environment vocabulary: config knobs grouped by prefix semantics. */
export const FEATURE_GATE_GROUPS: Readonly<Record<string, readonly string[]>> = {
  "product-misc": [
    "SAND_AGENT",
    "SAND_AGENT_MOCK_RESPONSE",
    "SAND_AGENT_MODEL",
    "SAND_AGENT_PROFILE_UPDATE",
    "SAND_AGENT_PROJECT_DIR",
    "SAND_ANALYTICS_DEBUG",
    "SAND_ATTACH_PROD_BOX",
    "SAND_AUTH_CLIENT_ID",
    "SAND_AUTO_REVIEW_MODE",
    "SAND_BACKEND_URL",
    "SAND_BOX",
    "SAND_BOX_AUTH_ID",
    "SAND_BOX_AUTO_UPDATE",
    "SAND_BOX_BOOT_ID",
    "SAND_BOX_BOOT_STAGES",
    "SAND_BOX_BOOT_STARTED_AT_MS",
    "SAND_BOX_COPY_IN_ATTEMPTS",
    "SAND_BOX_COPY_IN_STUCK_MS",
    "SAND_BOX_IMAGE",
    "SAND_BOX_LOG_SHIP_DISABLED",
    "SAND_BOX_MAX_WINDOWS",
    "SAND_BOX_OWNER_NAMESPACE",
    "SAND_BOX_TENANT_ID",
    "SAND_BOX_UPDATE_WATCH_INTERVAL_MS",
    "SAND_BOX_UPDATE_WATCH_JITTER_RATIO",
    "SAND_BROWSER_RESULT__",
    "SAND_BROWSER_VIEW_STATE__",
    "SAND_CHROME_IMPORT_SAFE_STORAGE_PASSWORD",
    "SAND_CLIENT_APP_VERSION",
    "SAND_CLIENT_PAUSE",
    "SAND_CLIENT_UPDATE_REQUIRED",
    "SAND_CODING_SUBAGENT",
    "SAND_CONVERSATION_GC",
    "SAND_CONVERSATION_HARD_LIMIT_BYTES",
    "SAND_CONVERSATION_SOFT_LIMIT_BYTES",
    "SAND_COOKIE_IMPORT_BATCH_PATH",
    "SAND_COOKIE_IMPORT_TOKEN",
    "SAND_CSNAPS_BIN",
    "SAND_CURSOR_WEBSITE_URL",
    "SAND_DATA_ROOT",
    "SAND_FEATURE_GATE_OVERRIDES",
    "SAND_FIRST_TOKEN_STALL_DEADLINE_MS",
    "SAND_FORCED_PAUSE_REAP_MS",
    "SAND_HEADLESS_STREAM_RETRY_ATTEMPTS",
    "SAND_HEADLESS_STREAM_RETRY_BASE_MS",
    "SAND_HEADLESS_STREAM_RETRY_MAX_MS",
    "SAND_HIDDEN_PROMPT",
    "SAND_INFERENCE_RENEWAL_CREDENTIAL",
    "SAND_LAB",
    "SAND_MANAGED_SETUP_FORCE",
    "SAND_MANIFEST_V2",
    "SAND_MODEL_EXPERIMENT_OVERRIDE",
    "SAND_MULTITASK",
    "SAND_OS_ACCENT",
    "SAND_OVERLOAD_STREAM_RETRY_ATTEMPTS",
    "SAND_OVERLOAD_STREAM_RETRY_BASE_MS",
    "SAND_OVERLOAD_STREAM_RETRY_MAX_MS",
    "SAND_PACKAGED",
    "SAND_PRODUCT_DISPLAY_NAME",
    "SAND_RESTART_EXIT_CODE",
    "SAND_ROSTER_READ_TIMEOUT_MS",
    "SAND_RUN_WATCHDOG_GRACE_MS",
    "SAND_RUN_WATCHDOG_MS",
    "SAND_SEND_POST_TIMEOUT_MS",
    "SAND_SENTRY_ENVIRONMENT",
    "SAND_SENTRY_RELEASE",
    "SAND_SHARED_BOX_ID",
    "SAND_SHARED_ROOM_BOX_TOOLS",
    "SAND_SHELL_REWATCH_POLL_MS",
    "SAND_SLIM_SYSTEM_PROMPT_EXPERIMENT_NAME",
    "SAND_SPOTLIGHT",
    "SAND_STALE_ROOT_GC",
    "SAND_STATE_S3_BACKSTOP",
    "SAND_STORE_BETTER_CLI",
    "SAND_STREAM_IDLE_DEADLINE_MS",
    "SAND_TEAM_ACCESS",
    "SAND_TRUSTED_AUTOMATION_PROMPT",
    "SAND_TURN_TRACE_SAMPLE_RATIO",
    "SAND_UPDATE_FEED_BASE_URL",
    "SAND_USER_DATA_DIR",
    "SAND_USER_NON_ROOT",
    "SAND_WEBAUTHN_SIGNER_PATH",
    "SAND_XUSER_SHARING_ALLOW_PROD"
  ],
  "kill-switches": [
    "SAND_DISABLE_ANALYTICS",
    "SAND_DISABLE_GATEWAY_HEALTH_TTL",
    "SAND_DISABLE_GATEWAY_SSE_GZIP",
    "SAND_DISABLE_GATEWAY_STREAM_LIVENESS",
    "SAND_DISABLE_LARGE_OUTPUT_SPILL",
    "SAND_DISABLE_MEMORY_FREEZE",
    "SAND_DISABLE_RECREATE_WAKE_CARRY",
    "SAND_DISABLE_RUN_SCHEDULER",
    "SAND_DISABLE_SEND_ACCEPT_RETURN",
    "SAND_DISABLE_SLIM_AVATARS",
    "SAND_DISABLE_TELEMETRY",
    "SAND_DISABLE_UPDATES",
    "SAND_DISABLE_USER_REPLY_REMINDER"
  ],
  "access-paywall": [
    "SAND_ACCESS_BLOCK_REASON_FREE_TRIAL_AVAILABLE",
    "SAND_ACCESS_BLOCK_REASON_NOT_OFFERED",
    "SAND_ACCESS_BLOCK_REASON_PAYWALL_INDIVIDUAL",
    "SAND_ACCESS_BLOCK_REASON_PAYWALL_TEAM_ADMIN",
    "SAND_ACCESS_BLOCK_REASON_PAYWALL_TEAM_MEMBER",
    "SAND_ACCESS_BLOCK_REASON_TEAM_ACCESS_REQUIRED",
    "SAND_ACCESS_BLOCK_REASON_TEAM_PRIVACY_MODE",
    "SAND_ACCESS_BLOCK_REASON_TEAM_SETUP_REQUIRED"
  ],
  "computers": [
    "SAND_BOX_CLUSTER",
    "SAND_BOX_COMPUTER",
    "SAND_BOX_COMPUTER_DOCKER_HOST",
    "SAND_BOX_COMPUTER_ENTRY",
    "SAND_BOX_COMPUTER_SHARED_CONTAINER",
    "SAND_BOX_COMPUTER_SHARED_DOCKER"
  ],
  "box-store": [
    "SAND_BOX_STORE_BACKEND",
    "SAND_BOX_STORE_COPY_IN",
    "SAND_BOX_STORE_COPY_IN_CONCURRENCY",
    "SAND_BOX_STORE_ID",
    "SAND_BOX_STORE_LOCAL_DIR",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_CHECKSUM_MISMATCH",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_INTERNAL",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_INVALID_PARTS",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_RESTART_REQUIRED",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_TRANSIENT",
    "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_UPLOAD_NOT_FOUND",
    "SAND_BOX_STORE_PACKS",
    "SAND_BOX_STORE_SYNC"
  ],
  "dev-only": [
    "SAND_DEV_ALLOW_ACCOUNT_REBIND",
    "SAND_DEV_APP_ICON",
    "SAND_DEV_BOX_CGROUPNS_HOST",
    "SAND_DEV_BOX_CONTAINER",
    "SAND_DEV_BOX_CONTROL_PLANE",
    "SAND_DEV_BOX_DOCKER_SOCKET",
    "SAND_DEV_BOX_NO_STORE",
    "SAND_DEV_CAPABILITY",
    "SAND_DEV_CONTROL_PORT",
    "SAND_DEV_INFERENCE_TOKEN_FILE",
    "SAND_DEV_LOGIN",
    "SAND_DEV_LOGIN_EMAIL",
    "SAND_DEV_XUSER_SHARING"
  ],
  "egress-tunnel": [
    "SAND_EGRESS_TUNNEL_ALLOW_PRIVATE",
    "SAND_EGRESS_TUNNEL_BEARER",
    "SAND_EGRESS_TUNNEL_ENABLED",
    "SAND_EGRESS_TUNNEL_NETWORK_TOKEN",
    "SAND_EGRESS_TUNNEL_URL"
  ],
  "host-local-exec": [
    "SAND_HOST_BUNDLE_S3_BASE_URL",
    "SAND_HOST_DEV_ERROR_DETAIL",
    "SAND_HOST_GATEWAY_NETWORK_TOKEN",
    "SAND_HOST_GATEWAY_TOKEN",
    "SAND_HOST_GATEWAY_URL",
    "SAND_HOST_IN_BOX",
    "SAND_HOST_LOG_FILE",
    "SAND_HOST_PORT",
    "SAND_LOCAL_EXEC_FILE_KEY",
    "SAND_LOCAL_EXEC_GENERATION",
    "SAND_LOCAL_EXEC_ROOT"
  ],
  "trial-claims": [
    "SAND_TRIAL_CLAIM_STATUS_REJECTED_DUPLICATE_CARD"
  ],
  "gateway": [
    "SAND_GATEWAY_BIND_HOST",
    "SAND_GATEWAY_REQUIRE_AUTH",
    "SAND_GATEWAY_TLS_CERT",
    "SAND_GATEWAY_TLS_KEY",
    "SAND_GATEWAY_TOKEN"
  ],
  "agent-memory-pipeline": [
    "SAND_MEMORY_EPISODE",
    "SAND_MEMORY_EPISODE_INTERVAL",
    "SAND_MEMORY_EXTRACTION",
    "SAND_MEMORY_SYNTHESIS_V1",
    "SAND_MEMORY_SYNTHESIS_VERIFICATION_V1"
  ]
};

export const FEATURE_GATE_ENUM_MEMBERS: readonly string[] = [
  "SAND_ACCESS_BLOCK_REASON_NONE",
  "SAND_ACCESS_BLOCK_REASON_UNSPECIFIED",
  "SAND_ACCESS_STATE_GRANTED",
  "SAND_ACCESS_STATE_PAYMENT_REQUIRED",
  "SAND_ACCESS_STATE_UNAVAILABLE",
  "SAND_ACCESS_STATE_UNSPECIFIED",
  "SAND_BOX_BLOCKED",
  "SAND_BOX_MIGRATION_PHASE_BACKING_UP",
  "SAND_BOX_MIGRATION_PHASE_CLEANING_UP",
  "SAND_BOX_MIGRATION_PHASE_CREATING",
  "SAND_BOX_MIGRATION_PHASE_DONE",
  "SAND_BOX_MIGRATION_PHASE_FAILED",
  "SAND_BOX_MIGRATION_PHASE_MOVING",
  "SAND_BOX_MIGRATION_PHASE_UNSPECIFIED",
  "SAND_BOX_MIGRATION_PHASE_WIPING",
  "SAND_BOX_RUN_STATE_ABSENT",
  "SAND_BOX_RUN_STATE_HIBERNATED",
  "SAND_BOX_RUN_STATE_RUNNING",
  "SAND_BOX_RUN_STATE_UNSPECIFIED",
  "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_PRECONDITION_FAILED",
  "SAND_BOX_STORE_MULTIPART_OPERATION_FAILURE_CODE_UNSPECIFIED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_CANCELLED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_CLAIMED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_COMPLETED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_FAILED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_MISSED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_RUNNING",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_SCHEDULED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_UNSPECIFIED",
  "SAND_BOX_UPGRADE_SCHEDULE_STATE_WAITING_FOR_IMAGE",
  "SAND_EGRESS_MODE_ALLOW_ALL",
  "SAND_EGRESS_MODE_DEFAULT_WITH_NETWORK_SETTINGS",
  "SAND_EGRESS_MODE_NETWORK_SETTINGS_ONLY",
  "SAND_EGRESS_MODE_UNSPECIFIED",
  "SAND_PURCHASE_CHANNEL_IN_APP",
  "SAND_PURCHASE_CHANNEL_MANAGE_IN_CURSOR",
  "SAND_PURCHASE_CHANNEL_MANAGE_ON_WEB",
  "SAND_PURCHASE_CHANNEL_UNSPECIFIED",
  "SAND_SETUP_MANIFEST_SCOPE_KIND_ORGANIZATION",
  "SAND_SETUP_MANIFEST_SCOPE_KIND_TEAM",
  "SAND_SETUP_MANIFEST_SCOPE_KIND_UNSPECIFIED",
  "SAND_SETUP_MANIFEST_SCOPE_KIND_USER",
  "SAND_SIMULATE_SECURE_STORAGE_UNAVAILABLE",
  "SAND_SOURCE_CAPABILITY_UNAVAILABLE",
  "SAND_TRIAL_CLAIM_STATUS_BLOCKED",
  "SAND_TRIAL_CLAIM_STATUS_GRANTED",
  "SAND_TRIAL_CLAIM_STATUS_NONE",
  "SAND_TRIAL_CLAIM_STATUS_PENDING_CARD",
  "SAND_TRIAL_CLAIM_STATUS_UNSPECIFIED"
];

export const FEATURE_GATE_MECHANISM = {
  "provider": "Statsig SDK",
  "endpoints": [
    "https://featureassets.org/v1 (fetch)",
    "https://statsigapi.net/v1/sdk_exception"
  ],
  "desktopCommands": [
    "getExperimentsSnapshot",
    "applyFeatureFlagOverride",
    "refreshFeatureFlags"
  ],
  "overrideEnv": [
    "SAND_FEATURE_GATE_OVERRIDES",
    "SAND_MODEL_EXPERIMENT_OVERRIDE"
  ]
} as const;

/** MCP/skills/plugins contract surface (artifact-proven keys and commands). */
export const MCP_CONTROL_SERVICE_METHODS = [
  "ReloadAgentSkills",
  "ReloadPlugins",
  "InstallPluginArtifact",
  "LoadMcpServers",
  "GetMcpRefreshTokens",
] as const;

export const MCP_COORDINATOR_COMMANDS = [
  "skillsCatalog",
  "syncPluginSkills",
  "getPluginSyncStatus",
  "publishSkill",
  "resyncPublishedSkill",
  "unpublishSkill",
  "portAgentLocalSkills",
  "refreshMcp",
  "listBoxMcpServers",
] as const;

export const SKILL_PLUGIN_PATHS = [
  ".cursor/agents",
  ".cursor/commands",
  ".cursor/plugins",
  ".cursor/rules",
  ".cursor/skills",
  ".cursor/skills-cursor",
  ".cursor/worktrees",
  "agent-skills",
] as const;

/** Native module inventory (N-API modules; win32-only payloads quarantined). */
export interface NativeModuleInfo {
  readonly file: string;
  readonly kind: string;
  readonly platform: string | null;
  readonly linuxRuntimeActive: boolean;
  readonly napiRegistered?: boolean;
}

export const NATIVE_MODULES: readonly NativeModuleInfo[] = [
  {
    "file": "dist/deps/@anysphere/tree-chunk-napi/tree-chunk-napi.linux-x64-gnu.node",
    "kind": "napi-module",
    "platform": "linux-x64-gnu",
    "linuxRuntimeActive": true,
    "napiRegistered": true
  },
  {
    "file": "dist/deps/@anysphere/tree-chunk-napi/tree-chunk-napi.win32-x64-msvc.node",
    "kind": "napi-module",
    "platform": "win32-x64-msvc",
    "linuxRuntimeActive": false,
    "napiRegistered": false
  },
  {
    "file": "dist/deps/better-sqlite3/build/Release/better_sqlite3.node",
    "kind": "napi-module",
    "platform": null,
    "linuxRuntimeActive": true,
    "napiRegistered": false
  },
  {
    "file": "dist/deps/cursor-proclist/build/Release/cursor_proclist.node",
    "kind": "napi-module",
    "platform": null,
    "linuxRuntimeActive": true,
    "napiRegistered": true
  },
  {
    "file": "dist/deps/tree-sitter-bash/prebuilds/linux-x64/tree-sitter-bash.node",
    "kind": "napi-module",
    "platform": "linux-x64",
    "linuxRuntimeActive": true,
    "napiRegistered": true
  },
  {
    "file": "dist/deps/tree-sitter-bash/prebuilds/win32-x64/tree-sitter-bash.node",
    "kind": "napi-module",
    "platform": "win32-x64",
    "linuxRuntimeActive": false,
    "napiRegistered": false
  },
  {
    "file": "dist/deps/tree-sitter/prebuilds/linux-x64/tree-sitter.node",
    "kind": "napi-module",
    "platform": "linux-x64",
    "linuxRuntimeActive": true,
    "napiRegistered": true
  },
  {
    "file": "dist/deps/whichlang-node-win32-x64-msvc/whichlang-node.win32-x64-msvc.node",
    "kind": "napi-module",
    "platform": "win32-x64-msvc",
    "linuxRuntimeActive": false,
    "napiRegistered": false
  },
  {
    "file": "dist/deps/whichlang-node/whichlang-node.linux-x64-gnu.node",
    "kind": "napi-module",
    "platform": "linux-x64-gnu",
    "linuxRuntimeActive": true,
    "napiRegistered": true
  },
  {
    "file": "dist/native/sand-webauthn-signer.exe",
    "kind": "windows-executable-helper",
    "platform": "win32",
    "linuxRuntimeActive": false
  }
];
