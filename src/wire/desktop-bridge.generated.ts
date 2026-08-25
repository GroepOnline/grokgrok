// GENERATED from Grok Bot 0.24.0 shipped bundles — do not hand-edit.
// Regenerate: npm run gen:desktop-bridge
// Evidence: dist/electron-preload/preload.cjs (arg styles, 145 methods)
//           dist/electron-main/main.cjs FGn/ma handler tables (payload keys)
// Clean-room interface reconstruction: method names, arg style, and destructured
// payload keys are artifact-proven; value types are unknown unless noted.

export type ArgsStyle = "none" | "object";

export interface RpcMethodInfo {
  readonly args: ArgsStyle;
  /** Destructured payload keys proven in the main-process handler, if any. */
  readonly payloadKeys?: readonly string[];
}

export const MAIN_EDGE = "main" as const;

export const MAIN_RPC_METHODS = {
  openExternal: { args: "object", payloadKeys: ["url"] },
  submitFeedback: { args: "object" },
  getDesktopEnvironment: { args: "none" },
  getWindowState: { args: "none" },
  minimizeWindow: { args: "none" },
  toggleMaximizeWindow: { args: "none" },
  closeWindow: { args: "none" },
  resizeWindowWidth: { args: "object", payloadKeys: ["deltaWidth"] },
  setTitleBarOverlayTone: { args: "object", payloadKeys: ["isOverlayTone"] },
  getThemeState: { args: "none" },
  setThemePreference: { args: "object", payloadKeys: ["preference"] },
  getHardwareAcceleration: { args: "none" },
  setHardwareAccelerationEnabled: { args: "object", payloadKeys: ["enabled"] },
  relaunchDesktop: { args: "none" },
  getLanguageState: { args: "none" },
  setLanguagePreference: { args: "object", payloadKeys: ["preference"] },
  getEgressTunnelEnabled: { args: "none" },
  setEgressTunnelEnabled: { args: "object", payloadKeys: ["enabled"] },
  getEgressTunnelStatus: { args: "none" },
  getWebauthnProxyEnabled: { args: "none" },
  setWebauthnProxyEnabled: { args: "object" },
  getUpdateStatus: { args: "none" },
  checkForUpdates: { args: "none" },
  setUpdateTrack: { args: "object", payloadKeys: ["track"] },
  quitAndInstallUpdate: { args: "object", payloadKeys: ["expectedVersion"] },
  setAutoUpdateWhenIdleOptIn: { args: "object", payloadKeys: ["enabled"] },
  getBoxMigrationStatus: { args: "none" },
  markDeepLinksReady: { args: "none" },
  getOnboardingSeen: { args: "none" },
  setOnboardingSeen: { args: "object", payloadKeys: ["seen"] },
  getTimeZone: { args: "none" },
  setTimeZoneOverride: { args: "object", payloadKeys: ["timeZone"] },
  getAutoReviewInstructions: { args: "none" },
  setAutoReviewInstructions: { args: "object" },
  getLocalToolPermission: { args: "none" },
  getLocalToolPermissionCeiling: { args: "none" },
  setLocalToolPermission: { args: "object" },
  recordLocalToolApproval: { args: "object" },
  clearLocalToolApprovals: { args: "none" },
  getSidebarCollapsed: { args: "none" },
  setSidebarCollapsed: { args: "object" },
  pickAvatarSource: { args: "none" },
  pickAvatarFile: { args: "none" },
  generateAgentAvatarImage: { args: "object", payloadKeys: ["description"] },
  resolveAttachmentMedia: { args: "object", payloadKeys: ["source"] },
  readAttachmentText: { args: "object", payloadKeys: ["path"] },
  readAttachmentBytes: { args: "object", payloadKeys: ["path", "maxBytes"] },
  stageAttachmentBytes: { args: "object", payloadKeys: ["filename", "bytes"] },
  downloadAttachment: { args: "object", payloadKeys: ["path", "suggestedName"] },
  commitStagedAttachments: { args: "object", payloadKeys: ["paths", "filenames"] },
  discardStagedAttachment: { args: "object", payloadKeys: ["path"] },
  forceRecreateComputer: { args: "none" },
  updateComputer: { args: "object" },
  getComputerUpgradeSchedule: { args: "none" },
  scheduleComputerUpgrade: { args: "object" },
  rescheduleComputerUpgrade: { args: "object" },
  cancelComputerUpgrade: { args: "object" },
  forceReconnectGateway: { args: "none" },
  getExperimentsSnapshot: { args: "none" },
  applyFeatureFlagOverride: { args: "object" },
  refreshFeatureFlags: { args: "none" },
  startRpcTraceWindow: { args: "none" },
  getAgentDefaultModel: { args: "none" },
  setAgentDefaultModel: { args: "object" },
  readTranscriptStoreTail: { args: "object" },
  getPublicBotTemplate: { args: "object", payloadKeys: ["shareId"] },
  getComputerUseModel: { args: "none" },
  setComputerUseModel: { args: "object", payloadKeys: ["model"] },
  getHostPinnedAgents: { args: "none" },
  setHostPinnedAgents: { args: "object", payloadKeys: ["pinnedAgentIds"] },
  getHostSidebarSections: { args: "none" },
  setHostSidebarSections: { args: "object", payloadKeys: ["sections"] },
  getAvailableModels: { args: "none" },
  transcribeAudio: { args: "object" },
  getCursorAuthStatus: { args: "none" },
  loginCursor: { args: "none" },
  cancelCursorLogin: { args: "none" },
  logoutCursor: { args: "none" },
  listCursorAccounts: { args: "none" },
  addCursorAccount: { args: "none" },
  switchCursorAccount: { args: "object", payloadKeys: ["accountId"] },
  updateCursorAccountName: { args: "object", payloadKeys: ["name"] },
  getCursorAvatar: { args: "none" },
  getSandMachines: { args: "none" },
  updateSandMachineLabel: { args: "object", payloadKeys: ["machineId", "label"] },
  getCursorWeeklyUsage: { args: "none" },
  getCursorUsageSummary: { args: "none" },
  getCursorPrReviewPreferences: { args: "none" },
  getCursorPrivacyModeEnabled: { args: "none" },
  getSandAccess: { args: "none" },
  getSandAccessFresh: { args: "none" },
  invokeCursorDashboardAction: { args: "object" },
  cancelCursorSandTrial: { args: "none" },
  reportAgentLoad: { args: "object" },
  reportAccessBlocked: { args: "object" },
  reportAgentsUnreachable: { args: "object" },
  reportRecoveryAction: { args: "object" },
  reportRebuildLifecycle: { args: "object" },
  reportReconciliation: { args: "object" },
  reportBoxVisibility: { args: "object" },
  reportSendLatency: { args: "object" },
  reportSendAck: { args: "object" },
  reportReactionAck: { args: "object" },
  reportRenderTtfr: { args: "object" },
  reportRenderStream: { args: "object" },
  reportVncSession: { args: "object" },
  reportVncLiveness: { args: "object" },
  reportOpenComputer: { args: "object" },
  reportUpdatePrompt: { args: "object" },
  reportSigninGate: { args: "object" },
  reportOnboardingStep: { args: "object" },
  reportClientFailure: { args: "object" },
  reportHeapMetrics: { args: "object" },
  noteSentryConversation: { args: "object" },
  openCloudAgent: { args: "object" },
  getLinkMetadata: { args: "object", payloadKeys: ["url"] },
  listSecrets: { args: "none" },
  revealSecret: { args: "object" },
  upsertSecrets: { args: "object" },
  removeSecrets: { args: "object" },
  readClientPersistence: { args: "object" },
  writeClientPersistence: { args: "object" },
  removeClientPersistence: { args: "object" },
  listClientPersistenceKeys: { args: "object" },
  migrateClientPersistence: { args: "object", payloadKeys: ["entries"] },
  getMcpState: { args: "none" },
  getEffectivePlugins: { args: "none" },
  getMcpCatalog: { args: "none" },
  getMcpTeamPopularity: { args: "none" },
  getMcpPluginLogo: { args: "object" },
  installEntry: { args: "object" },
  updatePluginInstall: { args: "object" },
  removeMcpServer: { args: "object" },
  uninstallPlugin: { args: "object" },
  authenticateMcpServer: { args: "object" },
  renameMcpAccount: { args: "object" },
  removeMcpAccount: { args: "object" },
  setMcpCustomInstructions: { args: "object" },
  listMcpServerTools: { args: "object" },
  toggleMcpToolDisabled: { args: "object" },
  devRestart: { args: "none" },
  attachProdBoxStatus: { args: "none" },
  setAttachProdBoxEnabled: { args: "object", payloadKeys: ["enabled", "isRestartMainApp"] },
  listChromeProfiles: { args: "none" },
  importChromeCookies: { args: "object" },
} as const satisfies Record<string, RpcMethodInfo>;

export type MainRpcMethod = keyof typeof MAIN_RPC_METHODS;

/** Main->renderer broadcast event names recovered from electron-main.cjs emit() sites. */
export const MAIN_RPC_EVENTS = [
  "assistive-tech-changed",
  "box-migration",
  "cursor-auth-changed",
  "deep-link",
  "dev-box-pull-progress",
  "dev-box-rebuild",
  "disconnect",
  "egress-tunnel-changed",
  "egress-tunnel-status-changed",
  "experiments-changed",
  "fieldsLimit",
  "file",
  "filesLimit",
  "focus-agent",
  "force-onboarding",
  "language-changed",
  "mcp-auth-completed",
  "open-about",
  "open-feedback",
  "preamble",
  "skip-onboarding",
  "theme-changed",
  "update-computer-dispatched",
  "update-status",
  "vnc-user-presence",
  "webauthn-proxy-changed",
  "widget-gallery",
  "window-state",
  "zoom-factor-changed",
] as const;

export type MainRpcEvent = (typeof MAIN_RPC_EVENTS)[number];

/** Payload shapes for methods whose object keys are artifact-proven (destructured in main handlers). */
type ProvenType = "string" | "number" | "boolean" | "array" | "object" | unknown;
export interface ProvenPayloads {
  setUpdateTrack: { readonly track: unknown | null };
  quitAndInstallUpdate: { readonly expectedVersion: string };
  setAutoUpdateWhenIdleOptIn: { readonly enabled: boolean };
  setTimeZoneOverride: { readonly timeZone: string | null };
  setThemePreference: { readonly preference: /* unresolved */ unknown };
  setLanguagePreference: { readonly preference: /* unresolved */ unknown };
  setHardwareAccelerationEnabled: { readonly enabled: boolean };
  setComputerUseModel: { readonly model: /* unresolved */ unknown };
  setHostPinnedAgents: { readonly pinnedAgentIds: /* unresolved */ unknown };
  setHostSidebarSections: { readonly sections: /* unresolved */ unknown };
  getPublicBotTemplate: { readonly shareId: string };
  setEgressTunnelEnabled: { readonly enabled: boolean };
  setOnboardingSeen: { readonly seen: boolean };
  openExternal: { readonly url: /* unresolved */ unknown };
  setTitleBarOverlayTone: { readonly isOverlayTone: boolean };
  resizeWindowWidth: { readonly deltaWidth: number };
  generateAgentAvatarImage: { readonly description: /* unresolved */ unknown };
  resolveAttachmentMedia: { readonly source: /* unresolved */ unknown };
  readAttachmentText: { readonly path: /* unresolved */ unknown };
  readAttachmentBytes: { readonly path: /* unresolved */ unknown; readonly maxBytes: /* unresolved */ unknown };
  stageAttachmentBytes: { readonly filename: /* unresolved */ unknown; readonly bytes: /* unresolved */ unknown };
  downloadAttachment: { readonly path: /* unresolved */ unknown; readonly suggestedName: /* unresolved */ unknown };
  commitStagedAttachments: { readonly paths: /* unresolved */ unknown; readonly filenames: /* unresolved */ unknown };
  discardStagedAttachment: { readonly path: /* unresolved */ unknown };
  getLinkMetadata: { readonly url: /* unresolved */ unknown };
  switchCursorAccount: { readonly accountId: /* unresolved */ unknown };
  updateCursorAccountName: { readonly name: /* unresolved */ unknown };
  updateSandMachineLabel: { readonly machineId: /* unresolved */ unknown; readonly label: /* unresolved */ unknown };
  migrateClientPersistence: { readonly entries: unknown[] };
  setAttachProdBoxEnabled: { readonly enabled: boolean; readonly isRestartMainApp: /* unresolved */ unknown };
}

/** Return-object shapes proven from handler bodies (arrow/return literals). */
export interface ProvenReturns {
  getTimeZone: { readonly detectedTimeZone: unknown | null; readonly overrideTimeZone: unknown | null };
  listSecrets: { readonly keys: unknown; readonly isPersistent: unknown };
}

/** Human-readable constraint strings recovered from main-process assertions. */
export const MAIN_RPC_CONSTRAINTS = {
  recordLocalToolApproval: [
    "A local-tool approval needs its request id and action.",
  ],
  setAgentDefaultModel: [
    "Couldn't reach the computer to save the default model.",
  ],
  readTranscriptStoreTail: [
    "A transcript store read requires an agent id, a positive limit, and a reason.",
  ],
  getPublicBotTemplate: [
    "A public Bot template requires a UUID share id.",
  ],
  updateComputer: [
    "A computer update names the agent by its string id.",
    "A computer update carries the caller's request id for the dispatch acknowledgement.",
  ],
  scheduleComputerUpgrade: [
    "A computer upgrade schedule requires a valid local time and IANA time zone.",
  ],
  rescheduleComputerUpgrade: [
    "A computer upgrade reschedule requires a valid local time and IANA time zone.",
  ],
  cancelComputerUpgrade: [
    "A computer upgrade cancellation requires a valid request.",
  ],
  transcribeAudio: [
    "transcribeAudio requires non-empty audio bytes.",
  ],
  importChromeCookies: [
    "A Chrome cookie import names the source profile by its directory id.",
  ],
} as const;