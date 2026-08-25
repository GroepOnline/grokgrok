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
  setWebauthnProxyEnabled: { args: "object", payloadKeys: ["enabled"] },
  getUpdateStatus: { args: "none" },
  checkForUpdates: { args: "none", payloadKeys: ["trigger"] },
  setUpdateTrack: { args: "object", payloadKeys: ["track"] },
  quitAndInstallUpdate: { args: "object", payloadKeys: ["expectedVersion"] },
  setAutoUpdateWhenIdleOptIn: { args: "object", payloadKeys: ["enabled"] },
  getBoxMigrationStatus: { args: "none" },
  markDeepLinksReady: { args: "none" },
  getOnboardingSeen: { args: "none" },
  setOnboardingSeen: { args: "object", payloadKeys: ["seen"] },
  getTimeZone: { args: "none", payloadKeys: ["detectedTimeZone", "overrideTimeZone"] },
  setTimeZoneOverride: { args: "object", payloadKeys: ["timeZone"] },
  getAutoReviewInstructions: { args: "none" },
  setAutoReviewInstructions: { args: "object", payloadKeys: ["instructions"] },
  getLocalToolPermission: { args: "none" },
  getLocalToolPermissionCeiling: { args: "none" },
  setLocalToolPermission: { args: "object" },
  recordLocalToolApproval: { args: "object", payloadKeys: ["approvalId", "action", "target"] },
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
  updateComputer: { args: "object", payloadKeys: ["id", "requestId", "acknowledgeTerminalUpgradeSchedule"] },
  getComputerUpgradeSchedule: { args: "none" },
  scheduleComputerUpgrade: { args: "object" },
  rescheduleComputerUpgrade: { args: "object" },
  cancelComputerUpgrade: { args: "object" },
  forceReconnectGateway: { args: "none" },
  getExperimentsSnapshot: { args: "none" },
  applyFeatureFlagOverride: { args: "object", payloadKeys: ["command"] },
  refreshFeatureFlags: { args: "none" },
  startRpcTraceWindow: { args: "none" },
  getAgentDefaultModel: { args: "none" },
  setAgentDefaultModel: { args: "object", payloadKeys: ["model"] },
  readTranscriptStoreTail: { args: "object" },
  getPublicBotTemplate: { args: "object", payloadKeys: ["shareId"] },
  getComputerUseModel: { args: "none" },
  setComputerUseModel: { args: "object", payloadKeys: ["model"] },
  getHostPinnedAgents: { args: "none" },
  setHostPinnedAgents: { args: "object", payloadKeys: ["pinnedAgentIds"] },
  getHostSidebarSections: { args: "none" },
  setHostSidebarSections: { args: "object", payloadKeys: ["sections"] },
  getAvailableModels: { args: "none" },
  transcribeAudio: { args: "object", payloadKeys: ["audio", "mimeType", "language"] },
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
  reportBoxVisibility: { args: "object", payloadKeys: ["report", "senderDocumentKey"] },
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
  openCloudAgent: { args: "object", payloadKeys: ["bcId"] },
  getLinkMetadata: { args: "object", payloadKeys: ["url"] },
  listSecrets: { args: "none", payloadKeys: ["keys", "isPersistent"] },
  revealSecret: { args: "object", payloadKeys: ["key"] },
  upsertSecrets: { args: "object", payloadKeys: ["entries"] },
  removeSecrets: { args: "object", payloadKeys: ["keys"] },
  readClientPersistence: { args: "object", payloadKeys: ["key"] },
  writeClientPersistence: { args: "object", payloadKeys: ["key", "value"] },
  removeClientPersistence: { args: "object", payloadKeys: ["key"] },
  listClientPersistenceKeys: { args: "object", payloadKeys: ["prefix"] },
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
  importChromeCookies: { args: "object", payloadKeys: ["cookies"] },
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
export interface ProvenPayloads {
  checkForUpdates: { readonly trigger: unknown };
  setUpdateTrack: { readonly track: unknown };
  quitAndInstallUpdate: { readonly expectedVersion: unknown };
  setAutoUpdateWhenIdleOptIn: { readonly enabled: unknown };
  getTimeZone: { readonly detectedTimeZone: unknown; readonly overrideTimeZone: unknown };
  setTimeZoneOverride: { readonly timeZone: unknown };
  setAutoReviewInstructions: { readonly instructions: unknown };
  recordLocalToolApproval: { readonly approvalId: unknown; readonly action: unknown; readonly target: unknown };
  setThemePreference: { readonly preference: unknown };
  setLanguagePreference: { readonly preference: unknown };
  setHardwareAccelerationEnabled: { readonly enabled: unknown };
  setAgentDefaultModel: { readonly model: unknown };
  setComputerUseModel: { readonly model: unknown };
  setHostPinnedAgents: { readonly pinnedAgentIds: unknown };
  setHostSidebarSections: { readonly sections: unknown };
  getPublicBotTemplate: { readonly shareId: unknown };
  setEgressTunnelEnabled: { readonly enabled: unknown };
  setWebauthnProxyEnabled: { readonly enabled: unknown };
  setOnboardingSeen: { readonly seen: unknown };
  openExternal: { readonly url: unknown };
  openCloudAgent: { readonly bcId: unknown };
  updateComputer: { readonly id: unknown; readonly requestId: unknown; readonly acknowledgeTerminalUpgradeSchedule: unknown };
  setTitleBarOverlayTone: { readonly isOverlayTone: unknown };
  resizeWindowWidth: { readonly deltaWidth: unknown };
  generateAgentAvatarImage: { readonly description: unknown };
  resolveAttachmentMedia: { readonly source: unknown };
  readAttachmentText: { readonly path: unknown };
  readAttachmentBytes: { readonly path: unknown; readonly maxBytes: unknown };
  stageAttachmentBytes: { readonly filename: unknown; readonly bytes: unknown };
  downloadAttachment: { readonly path: unknown; readonly suggestedName: unknown };
  commitStagedAttachments: { readonly paths: unknown; readonly filenames: unknown };
  discardStagedAttachment: { readonly path: unknown };
  getLinkMetadata: { readonly url: unknown };
  switchCursorAccount: { readonly accountId: unknown };
  updateCursorAccountName: { readonly name: unknown };
  updateSandMachineLabel: { readonly machineId: unknown; readonly label: unknown };
  transcribeAudio: { readonly audio: unknown; readonly mimeType: unknown; readonly language: unknown };
  reportBoxVisibility: { readonly report: unknown; readonly senderDocumentKey: unknown };
  applyFeatureFlagOverride: { readonly command: unknown };
  listSecrets: { readonly keys: unknown; readonly isPersistent: unknown };
  revealSecret: { readonly key: unknown };
  upsertSecrets: { readonly entries: unknown };
  removeSecrets: { readonly keys: unknown };
  readClientPersistence: { readonly key: unknown };
  writeClientPersistence: { readonly key: unknown; readonly value: unknown };
  removeClientPersistence: { readonly key: unknown };
  listClientPersistenceKeys: { readonly prefix: unknown };
  migrateClientPersistence: { readonly entries: unknown };
  setAttachProdBoxEnabled: { readonly enabled: unknown; readonly isRestartMainApp: unknown };
  importChromeCookies: { readonly cookies: unknown };
}