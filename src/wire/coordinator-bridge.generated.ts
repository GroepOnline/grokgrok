// GENERATED from Grok Bot 0.24.0 dist/node-agent-coordinator/main.cjs — do not hand-edit.
// Regenerate: npm run gen:coordinator-bridge
// Frame protocol evidence and channel constants live in evidence/generated/coordinator-atlas.json.
// Clean-room reconstruction: command names, arg style, reply kinds artifact-proven; payload value types unknown.

export type ArgsStyle = "none" | "object";

export interface CoordinatorCommandInfo {
  readonly args: ArgsStyle;
  /** Reply frame kind where the protocol declares one (e.g. transcript-page). */
  readonly reply?: string;
}

export const COORDINATOR_EDGES = ["coordinator-control","coordinator-main","coordinator"] as const;

export const COORDINATOR_CHANNELS = ["coordinator-transport-state","coordinator-control","coordinator-main-data"] as const;

export const COORDINATOR_COMMANDS = {
  addOwnAgentToSharedRoom: { args: "object", reply: "record" },
  broadcastToAgents: { args: "object", reply: "record" },
  clearTrays: { args: "none", reply: "void" },
  connectChannel: { args: "object", reply: "channels-view" },
  countAgents: { args: "none", reply: "count" },
  createAgent: { args: "object", reply: "record" },
  createAgentAutomation: { args: "object", reply: "array" },
  createAgentWorkflow: { args: "object", reply: "array" },
  createGroup: { args: "object", reply: "record" },
  createRoomFromAgent: { args: "object", reply: "record" },
  createRoomInvite: { args: "object", reply: "record" },
  createSharedRoom: { args: "object", reply: "record" },
  deleteAgentAutomation: { args: "object", reply: "array" },
  deleteAgents: { args: "object", reply: "record" },
  deleteAgentWorkflow: { args: "object", reply: "array" },
  disconnectChannel: { args: "object", reply: "channels-view" },
  dismissTray: { args: "object", reply: "void" },
  dismissWidget: { args: "object", reply: "record" },
  duplicateAgent: { args: "object", reply: "record" },
  ensureForeverBox: { args: "object", reply: "box-status" },
  getAgentAutomations: { args: "object", reply: "array" },
  getAgentAvatar: { args: "object", reply: "record" },
  getAgentChannels: { args: "object", reply: "channels-view" },
  getAgentTranscriptTail: { args: "object", reply: "transcript-page" },
  getAgentWorkflows: { args: "object", reply: "array" },
  getAsyncTasks: { args: "object", reply: "array" },
  getAutomationWebhookCredential: { args: "object", reply: "record" },
  getBoxSecretsStatus: { args: "none", reply: "box-secrets" },
  getCloudAgentInfo: { args: "object", reply: "record-or-null" },
  getConversationOutline: { args: "object", reply: "array" },
  getForeverBoxStatus: { args: "object", reply: "box-status" },
  getHostSettings: { args: "none" },
  getHostStatus: { args: "none" },
  getListenerConnectUrl: { args: "object", reply: "connect-url" },
  getListenerIntegrations: { args: "none", reply: "record" },
  getPluginSyncStatus: { args: "none", reply: "record" },
  getSharingState: { args: "none", reply: "record" },
  getSkillPublishTargets: { args: "none", reply: "record" },
  getSubagents: { args: "object", reply: "array" },
  getTeachRecordingStatus: { args: "none", reply: "record" },
  getTrays: { args: "none", reply: "array" },
  handBackForeverBox: { args: "object", reply: "void" },
  importAgentWorkflowText: { args: "object", reply: "import-result" },
  importAgentWorkflowUrl: { args: "object", reply: "import-result" },
  injectChromeCookies: { args: "object" },
  interruptAgentRun: { args: "object", reply: "record" },
  isAgentNetworkEnabled: { args: "none", reply: "boolean" },
  isEgressTunnelAvailable: { args: "none", reply: "boolean" },
  isGlobalSearchEnabled: { args: "none", reply: "boolean" },
  joinSharedRoom: { args: "object", reply: "record" },
  kickstartAgent: { args: "object", reply: "record-or-null" },
  leaveSharedRoom: { args: "object", reply: "record" },
  listAgents: { args: "none", reply: "array" },
  listAllAutomations: { args: "none", reply: "array" },
  listBoxMcpServers: { args: "object" },
  openAgentTail: { args: "object", reply: "transcript-page" },
  portAgentLocalSkills: { args: "object", reply: "import-result" },
  promptAcceptanceStatus: { args: "object", reply: "acceptance-lookup" },
  publishSkill: { args: "object", reply: "record" },
  reactToMessage: { args: "object", reply: "void" },
  readAttachmentChunk: { args: "object" },
  readAttachmentImage: { args: "object" },
  readAttachmentText: { args: "object" },
  refreshChannel: { args: "object", reply: "channels-view" },
  refreshMcp: { args: "object" },
  removeOwnAgentFromSharedRoom: { args: "object", reply: "record" },
  requestDiskSaverAudit: { args: "object", reply: "record-or-null" },
  resolveAutoReviewApproval: { args: "object", reply: "void" },
  resolveLocalToolPermission: { args: "object", reply: "void" },
  respondToRoomJoinRequest: { args: "object", reply: "record" },
  respondToWidget: { args: "object", reply: "record-or-null" },
  resyncPublishedSkill: { args: "object", reply: "record" },
  runAgentAutomationNow: { args: "object", reply: "void" },
  runAgentWorkflowNow: { args: "object", reply: "void" },
  searchAgents: { args: "object", reply: "array" },
  searchMedia: { args: "object", reply: "array" },
  sendPrompt: { args: "object", reply: "send-result" },
  setAgentAutomationEnabled: { args: "object", reply: "array" },
  setAgentAvatarBytes: { args: "object", reply: "record-or-null" },
  setAgentHiddenFromSidebar: { args: "object", reply: "void" },
  setAgentNotificationsEnabled: { args: "object", reply: "void" },
  setAgentNotifyOnUpdates: { args: "object", reply: "void" },
  setAgentUnread: { args: "object", reply: "void" },
  setBoxSecrets: { args: "object" },
  setDevGatewayOffline: { args: "object" },
  setGatewayPaused: { args: "object" },
  setGroupMembers: { args: "object", reply: "record-or-null" },
  setHostSettings: { args: "object" },
  setSharedRoomTyping: { args: "object", reply: "void" },
  setWindowFocused: { args: "object" },
  skillsCatalog: { args: "none", reply: "array" },
  startTeachRecording: { args: "object", reply: "record" },
  stopTeachRecording: { args: "object", reply: "record" },
  submitSecret: { args: "object", reply: "void" },
  syncPluginSkills: { args: "none", reply: "array" },
  unpublishSkill: { args: "object", reply: "record" },
  updateAgent: { args: "object", reply: "record-or-null" },
  updateAgentAutomation: { args: "object", reply: "array" },
  updateAgentWorkflow: { args: "object", reply: "array" },
  updateBotTemplate: { args: "object", reply: "record" },
  updateForeverBox: { args: "object" },
  uploadAttachment: { args: "object" },
  voteFeedback: { args: "object", reply: "void" },
} as const satisfies Record<string, CoordinatorCommandInfo>;

export type CoordinatorCommand = keyof typeof COORDINATOR_COMMANDS;

/** Control-frame kinds on the coordinator-control channel. */
export const FRAME_KINDS = ["hello","cancel","request","reply","event","lifecycle"] as const;

/** Lifecycle phases observed in the hello/ready handshake and run states. */
export const LIFECYCLE_PHASES = ["shutdown","hello","absent","active","failed","adopting","replacing","ready"] as const;
