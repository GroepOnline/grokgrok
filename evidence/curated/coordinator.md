# Coordinator and agent runtime — command atlas

**Evidence:** shipped `dist/node-agent-coordinator/main.cjs` (89 KB) from Grok Bot 0.24.0.
**Confidence: A** for command names/arg styles/reply kinds (declared in method tables);
**B+** for frame protocol (handshake + channel shapes observed at multiple sites);
**C** for port-ownership details (partially inferred, see HYPOTHESES).

## Edges and transport

- Three edges: `coordinator-control` (with events), `coordinator-main`, `coordinator`.
- Named IPC channels: `coordinator-transport-state`, `coordinator-control`, `coordinator-main-data`.
  Frames travel as `{channel:"coordinator-control", frame:{...}}` envelopes.
- Control-frame kinds: `lifecycle | request | cancel | reply | event`.
- Handshake: provider sends `{kind:"welcome", providerId}`; client replies
  `{kind:"hello", computerId?, label?}`; lifecycle phases carry a numeric `protocolVersion`
  (`1` observed). Protocol violations are surfaced as `protocol-breach`.
- Lifecycle phases: shutdown, hello, absent, active, failed, adopting, replacing, ready.

## Command surface (103 commands, deduplicated across tables)

Full generated list: [`src/wire/coordinator-bridge.generated.ts`](../../src/wire/coordinator-bridge.generated.ts).
Representative groups (all names artifact-proven):

- **Agent CRUD / roster:** listAgents, countAgents, searchAgents, searchMedia, createAgent,
  updateAgent, deleteAgents, duplicateAgent, kickstartAgent, interruptAgentRun, broadcastToAgents
- **Subagents:** getSubagents (also create/status/steer surfaces appear as workflow/task commands)
- **Conversations:** getConversationOutline, getAgentTranscriptTail/openAgentTail (reply `transcript-page`),
  sendPrompt, promptAcceptanceStatus, respondToWidget, reactToMessage, dismissWidget, voteFeedback
- **Groups/shared rooms:** createGroup, setGroupMembers, createRoomFromAgent, createRoomInvite,
  joinSharedRoom, respondToRoomJoinRequest, setSharedRoomTyping, leaveSharedRoom, …
- **Workflows:** getAgentWorkflows, create/update/deleteAgentWorkflow, runAgentWorkflowNow,
  importAgentWorkflowText/Url, portAgentLocalSkills
- **Skills/plugins:** skillsCatalog, syncPluginSkills, getPluginSyncStatus,
  getSkillPublishTargets, publishSkill, resyncPublishedSkill, unpublishSkill
- **Teach-a-task:** startTeachRecording, stopTeachRecording, getTeachRecordingStatus
- **Automations/routines:** getAgentAutomations, listAllAutomations, create/update/deleteAgentAutomation,
  runAgentAutomationNow, getAutomationWebhookCredential, setAgentAutomationEnabled
- **Computers/box:** getForeverBoxStatus, ensureForeverBox, handBackForeverBox, updateForeverBox,
  setBoxSecrets, getBoxSecretsStatus
- **Channels/integrations:** connectChannel/disconnectChannel/refreshChannel, getListenerIntegrations,
  getListenerConnectUrl, getAgentChannels
- **Sidebar/notification state:** setAgentUnread, setAgentHiddenFromSidebar,
  setAgentNotificationsEnabled, setAgentNotifyOnUpdates, get/setAgentAvatarBytes
- **Host settings/attachments:** uploadAttachment, readAttachmentImage/Text/Chunk,
  getHostSettings/setHostSettings, refreshMcp, listBoxMcpServers, injectChromeCookies

## Target-machine semantics

`computerId` travels in hello frames; VNC access builds `websockify?…` URLs using
`port_token` or `network_token`; cloud agents surface via getCloudAgentInfo.
Same-machine vs cloud vs self-hosted distinction is carried by computer identity +
token kind (port vs network), not by separate code paths visible here.

## Model-selection boundary

The coordinator never names inference models; model selection lives behind
desktop-side commands (getAvailableModels/getAgentDefaultModel/setComputerUseModel)
and gateway streams. Env flags observed: SAND_GATEWAY_* liveness/health toggles,
SAND_SEND_POST_TIMEOUT_MS, SAND_ROSTER_READ_TIMEOUT_MS.

## HYPOTHESES (labelled, not implementation claims)

- H1: "forever box" = long-lived warm sandbox kept across runs (ensure/handBack semantics suggest lease-like ownership). Confidence C.
- H2: port ownership/broker: electron main owns the coordinator child process and brokers
  the `desktop.coordinatorPort` sync binding to renderer; reconnect via forceReconnectGateway. Confidence B-.
- H3: `adopting`/`replacing` phases correspond to reattaching to an existing agent run after crash/restart. Confidence C.
