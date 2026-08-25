// GENERATED clean-room structural interfaces from Grok Bot 0.24.0 shipped host bundle.
// Regenerate: node scripts/analyze-proto.mjs — do not hand-edit.
// Wire-format structure only (field names, numbers, types); no serialization logic.

export const proto_logs_v1_LogRecordFlags = {
  LOG_RECORD_FLAGS_DO_NOT_USE: 0,
  LOG_RECORD_FLAGS_TRACE_FLAGS_MASK: 255,
} as const;
export type proto_logs_v1_LogRecordFlags = (typeof proto_logs_v1_LogRecordFlags)[keyof typeof proto_logs_v1_LogRecordFlags];

export const proto_logs_v1_SeverityNumber = {
  SEVERITY_NUMBER_UNSPECIFIED: 0,
  SEVERITY_NUMBER_TRACE: 1,
  SEVERITY_NUMBER_TRACE2: 2,
  SEVERITY_NUMBER_TRACE3: 3,
  SEVERITY_NUMBER_TRACE4: 4,
  SEVERITY_NUMBER_DEBUG: 5,
  SEVERITY_NUMBER_DEBUG2: 6,
  SEVERITY_NUMBER_DEBUG3: 7,
  SEVERITY_NUMBER_DEBUG4: 8,
  SEVERITY_NUMBER_INFO: 9,
  SEVERITY_NUMBER_INFO2: 10,
  SEVERITY_NUMBER_INFO3: 11,
  SEVERITY_NUMBER_INFO4: 12,
  SEVERITY_NUMBER_WARN: 13,
  SEVERITY_NUMBER_WARN2: 14,
  SEVERITY_NUMBER_WARN3: 15,
  SEVERITY_NUMBER_WARN4: 16,
  SEVERITY_NUMBER_ERROR: 17,
  SEVERITY_NUMBER_ERROR2: 18,
  SEVERITY_NUMBER_ERROR3: 19,
  SEVERITY_NUMBER_ERROR4: 20,
  SEVERITY_NUMBER_FATAL: 21,
  SEVERITY_NUMBER_FATAL2: 22,
  SEVERITY_NUMBER_FATAL3: 23,
  SEVERITY_NUMBER_FATAL4: 24,
} as const;
export type proto_logs_v1_SeverityNumber = (typeof proto_logs_v1_SeverityNumber)[keyof typeof proto_logs_v1_SeverityNumber];

export const proto_metrics_v1_AggregationTemporality = {
  AGGREGATION_TEMPORALITY_UNSPECIFIED: 0,
  AGGREGATION_TEMPORALITY_DELTA: 1,
  AGGREGATION_TEMPORALITY_CUMULATIVE: 2,
} as const;
export type proto_metrics_v1_AggregationTemporality = (typeof proto_metrics_v1_AggregationTemporality)[keyof typeof proto_metrics_v1_AggregationTemporality];

export const proto_metrics_v1_DataPointFlags = {
  DATA_POINT_FLAGS_DO_NOT_USE: 0,
  DATA_POINT_FLAGS_NO_RECORDED_VALUE_MASK: 1,
} as const;
export type proto_metrics_v1_DataPointFlags = (typeof proto_metrics_v1_DataPointFlags)[keyof typeof proto_metrics_v1_DataPointFlags];

export const proto_trace_v1_Span_SpanKind = {
  SPAN_KIND_UNSPECIFIED: 0,
  SPAN_KIND_INTERNAL: 1,
  SPAN_KIND_SERVER: 2,
  SPAN_KIND_CLIENT: 3,
  SPAN_KIND_PRODUCER: 4,
  SPAN_KIND_CONSUMER: 5,
} as const;
export type proto_trace_v1_Span_SpanKind = (typeof proto_trace_v1_Span_SpanKind)[keyof typeof proto_trace_v1_Span_SpanKind];

export const proto_trace_v1_SpanFlags = {
  SPAN_FLAGS_DO_NOT_USE: 0,
  SPAN_FLAGS_TRACE_FLAGS_MASK: 255,
  SPAN_FLAGS_CONTEXT_HAS_IS_REMOTE_MASK: 256,
  SPAN_FLAGS_CONTEXT_IS_REMOTE_MASK: 512,
} as const;
export type proto_trace_v1_SpanFlags = (typeof proto_trace_v1_SpanFlags)[keyof typeof proto_trace_v1_SpanFlags];

export const proto_trace_v1_Status_StatusCode = {
  STATUS_CODE_UNSET: 0,
  STATUS_CODE_OK: 1,
  STATUS_CODE_ERROR: 2,
} as const;
export type proto_trace_v1_Status_StatusCode = (typeof proto_trace_v1_Status_StatusCode)[keyof typeof proto_trace_v1_Status_StatusCode];

export interface proto_collector_logs_v1_ExportLogsPartialSuccess {
  readonly rejectedLogRecords: string|number|bigint;
  readonly errorMessage: string;
}

export interface proto_collector_logs_v1_ExportLogsServiceRequest {
  readonly resourceLogs: Array<proto_logs_v1_ResourceLogs>;
}

export interface proto_collector_logs_v1_ExportLogsServiceResponse {
  readonly partialSuccess: proto_collector_logs_v1_ExportLogsPartialSuccess;
}

export interface proto_collector_metrics_v1_ExportMetricsPartialSuccess {
  readonly rejectedDataPoints: string|number|bigint;
  readonly errorMessage: string;
}

export interface proto_collector_metrics_v1_ExportMetricsServiceRequest {
  readonly resourceMetrics: Array<proto_metrics_v1_ResourceMetrics>;
}

export interface proto_collector_metrics_v1_ExportMetricsServiceResponse {
  readonly partialSuccess: proto_collector_metrics_v1_ExportMetricsPartialSuccess;
}

export interface proto_collector_trace_v1_ExportTracePartialSuccess {
  readonly rejectedSpans: string|number|bigint;
  readonly errorMessage: string;
}

export interface proto_collector_trace_v1_ExportTraceServiceRequest {
  readonly resourceSpans: Array<proto_trace_v1_ResourceSpans>;
}

export interface proto_collector_trace_v1_ExportTraceServiceResponse {
  readonly partialSuccess: proto_collector_trace_v1_ExportTracePartialSuccess;
}

export interface proto_common_v1_AnyValue {
  readonly stringValue?: string;
  readonly boolValue?: boolean;
  readonly intValue?: string|number|bigint;
  readonly doubleValue?: number;
  readonly arrayValue?: proto_common_v1_ArrayValue;
  readonly kvlistValue?: proto_common_v1_KeyValueList;
  readonly bytesValue?: number;
  /** oneof value */
  readonly value?: "stringValue" | "boolValue" | "intValue" | "doubleValue" | "arrayValue" | "kvlistValue" | "bytesValue";
}

export interface proto_common_v1_ArrayValue {
  readonly values: Array<proto_common_v1_AnyValue>;
}

export interface proto_common_v1_EntityRef {
  readonly schemaUrl: string;
  readonly type: string;
  readonly idKeys: Array<string>;
  readonly descriptionKeys: Array<string>;
}

export interface proto_common_v1_InstrumentationScope {
  readonly name: string;
  readonly version: string;
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
}

export interface proto_common_v1_KeyValue {
  readonly key: string;
  readonly value: proto_common_v1_AnyValue;
}

export interface proto_common_v1_KeyValueList {
  readonly values: Array<proto_common_v1_KeyValue>;
}

export interface proto_logs_v1_LogRecord {
  readonly timeUnixNano: string|number|bigint;
  readonly observedTimeUnixNano: string|number|bigint;
  readonly severityNumber: number;
  readonly severityText: string;
  readonly body: proto_common_v1_AnyValue;
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
  readonly flags: number;
  readonly traceId: number;
  readonly spanId: number;
  readonly eventName: string;
}

export interface proto_logs_v1_LogsData {
  readonly resourceLogs: Array<proto_logs_v1_ResourceLogs>;
}

export interface proto_logs_v1_ResourceLogs {
  readonly resource: proto_resource_v1_Resource;
  readonly scopeLogs: Array<proto_logs_v1_ScopeLogs>;
  readonly schemaUrl: string;
}

export interface proto_logs_v1_ScopeLogs {
  readonly scope: proto_common_v1_InstrumentationScope;
  readonly logRecords: Array<proto_logs_v1_LogRecord>;
  readonly schemaUrl: string;
}

export interface proto_metrics_v1_Exemplar {
  readonly filteredAttributes: Array<proto_common_v1_KeyValue>;
  readonly timeUnixNano: string|number|bigint;
  readonly asDouble?: number;
  readonly asInt?: string|number|bigint;
  readonly spanId: number;
  readonly traceId: number;
  /** oneof value */
  readonly value?: "asDouble" | "asInt";
}

export interface proto_metrics_v1_ExponentialHistogram {
  readonly dataPoints: Array<proto_metrics_v1_ExponentialHistogramDataPoint>;
  readonly aggregationTemporality: number;
}

export interface proto_metrics_v1_ExponentialHistogramDataPoint {
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly startTimeUnixNano: string|number|bigint;
  readonly timeUnixNano: string|number|bigint;
  readonly count: string|number|bigint;
  readonly sum?: number;
  readonly scale: number;
  readonly zeroCount: string|number|bigint;
  readonly positive: proto_metrics_v1_ExponentialHistogramDataPoint_Buckets;
  readonly negative: proto_metrics_v1_ExponentialHistogramDataPoint_Buckets;
  readonly flags: number;
  readonly exemplars: Array<proto_metrics_v1_Exemplar>;
  readonly min?: number;
  readonly max?: number;
  readonly zeroThreshold: number;
  /** oneof value */
  readonly value?: "sum";
}

export interface proto_metrics_v1_ExponentialHistogramDataPoint_Buckets {
  readonly offset: number;
  readonly bucketCounts: Array<string|number|bigint>;
}

export interface proto_metrics_v1_Gauge {
  readonly dataPoints: Array<proto_metrics_v1_NumberDataPoint>;
}

export interface proto_metrics_v1_Histogram {
  readonly dataPoints: Array<proto_metrics_v1_HistogramDataPoint>;
  readonly aggregationTemporality: number;
}

export interface proto_metrics_v1_HistogramDataPoint {
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly startTimeUnixNano: string|number|bigint;
  readonly timeUnixNano: string|number|bigint;
  readonly count: string|number|bigint;
  readonly sum?: number;
  readonly bucketCounts: Array<string|number|bigint>;
  readonly explicitBounds: Array<number>;
  readonly exemplars: Array<proto_metrics_v1_Exemplar>;
  readonly flags: number;
  readonly min?: number;
  readonly max?: number;
  /** oneof value */
  readonly value?: "sum";
}

export interface proto_metrics_v1_Metric {
  readonly name: string;
  readonly description: string;
  readonly unit: string;
  readonly gauge?: proto_metrics_v1_Gauge;
  readonly sum?: proto_metrics_v1_Sum;
  readonly histogram?: proto_metrics_v1_Histogram;
  readonly exponentialHistogram?: proto_metrics_v1_ExponentialHistogram;
  readonly summary?: proto_metrics_v1_Summary;
  readonly metadata: Array<proto_common_v1_KeyValue>;
  /** oneof value */
  readonly value?: "gauge" | "sum" | "histogram" | "exponentialHistogram" | "summary";
}

export interface proto_metrics_v1_MetricsData {
  readonly resourceMetrics: Array<proto_metrics_v1_ResourceMetrics>;
}

export interface proto_metrics_v1_NumberDataPoint {
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly startTimeUnixNano: string|number|bigint;
  readonly timeUnixNano: string|number|bigint;
  readonly asDouble?: number;
  readonly asInt?: string|number|bigint;
  readonly exemplars: Array<proto_metrics_v1_Exemplar>;
  readonly flags: number;
  /** oneof value */
  readonly value?: "asDouble" | "asInt";
}

export interface proto_metrics_v1_ResourceMetrics {
  readonly resource: proto_resource_v1_Resource;
  readonly scopeMetrics: Array<proto_metrics_v1_ScopeMetrics>;
  readonly schemaUrl: string;
}

export interface proto_metrics_v1_ScopeMetrics {
  readonly scope: proto_common_v1_InstrumentationScope;
  readonly metrics: Array<proto_metrics_v1_Metric>;
  readonly schemaUrl: string;
}

export interface proto_metrics_v1_Sum {
  readonly dataPoints: Array<proto_metrics_v1_NumberDataPoint>;
  readonly aggregationTemporality: number;
  readonly isMonotonic: boolean;
}

export interface proto_metrics_v1_Summary {
  readonly dataPoints: Array<proto_metrics_v1_SummaryDataPoint>;
}

export interface proto_metrics_v1_SummaryDataPoint {
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly startTimeUnixNano: string|number|bigint;
  readonly timeUnixNano: string|number|bigint;
  readonly count: string|number|bigint;
  readonly sum: number;
  readonly quantileValues: Array<proto_metrics_v1_SummaryDataPoint_ValueAtQuantile>;
  readonly flags: number;
}

export interface proto_metrics_v1_SummaryDataPoint_ValueAtQuantile {
  readonly quantile: number;
  readonly value: number;
}

export interface proto_resource_v1_Resource {
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
  readonly entityRefs: Array<proto_common_v1_EntityRef>;
}

export interface proto_trace_v1_ResourceSpans {
  readonly resource: proto_resource_v1_Resource;
  readonly scopeSpans: Array<proto_trace_v1_ScopeSpans>;
  readonly schemaUrl: string;
}

export interface proto_trace_v1_ScopeSpans {
  readonly scope: proto_common_v1_InstrumentationScope;
  readonly spans: Array<proto_trace_v1_Span>;
  readonly schemaUrl: string;
}

export interface proto_trace_v1_Span {
  readonly traceId: number;
  readonly spanId: number;
  readonly traceState: string;
  readonly parentSpanId: number;
  readonly flags: number;
  readonly name: string;
  readonly kind: number;
  readonly startTimeUnixNano: string|number|bigint;
  readonly endTimeUnixNano: string|number|bigint;
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
  readonly events: Array<proto_trace_v1_Span_Event>;
  readonly droppedEventsCount: number;
  readonly links: Array<proto_trace_v1_Span_Link>;
  readonly droppedLinksCount: number;
  readonly status: proto_trace_v1_Status;
}

export interface proto_trace_v1_Span_Event {
  readonly timeUnixNano: string|number|bigint;
  readonly name: string;
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
}

export interface proto_trace_v1_Span_Link {
  readonly traceId: number;
  readonly spanId: number;
  readonly traceState: string;
  readonly attributes: Array<proto_common_v1_KeyValue>;
  readonly droppedAttributesCount: number;
  readonly flags: number;
}

export interface proto_trace_v1_Status {
  readonly message: string;
  readonly code: number;
}

export interface proto_trace_v1_TracesData {
  readonly resourceSpans: Array<proto_trace_v1_ResourceSpans>;
}

export interface proto_collector_logs_v1_LogsService {
  Export: { input: proto_collector_logs_v1_ExportLogsServiceRequest; output: proto_collector_logs_v1_ExportLogsServiceResponse };
}

export interface proto_collector_metrics_v1_MetricsService {
  Export: { input: proto_collector_metrics_v1_ExportMetricsServiceRequest; output: proto_collector_metrics_v1_ExportMetricsServiceResponse };
}

export interface proto_collector_trace_v1_TraceService {
  Export: { input: proto_collector_trace_v1_ExportTraceServiceRequest; output: proto_collector_trace_v1_ExportTraceServiceResponse };
}

