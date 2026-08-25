# Protobuf atlas — host telemetry wire format (0.24.0)

**Evidence:** shipped `dist/host/host-main.cjs` — protobufjs static-generated classes.
**Extraction:** deterministic structure walk over the `.opentelemetry` namespace tree
(balanced-paren scope parser, `scripts/analyze-proto.mjs`; validator `scripts/validate-proto.mjs`).
**Confidence: A** for message/field/enum/service names, field numbers, wire types and
repetition (all read from generated `decode` switch statements); **A-** for oneof
groupings (`oneOfGetter` sites) and `getTypeUrl` bindings.

This is the only protobuf surface in the shipped bundles: it is the OpenTelemetry
export wire format used by the host plane. Application RPC traffic does not use
protobuf (see `main-rpc.md` / `coordinator.md`).

## Counts

| Kind | Count |
| --- | --- |
| Messages | 43 |
| Enums | 7 |
| Services | 3 (one method each) |
| Fields | 161 |
| Unresolved fields | 0 |

Packages: `opentelemetry.proto.{common,resource,trace,metrics,logs}.v1` +
`opentelemetry.proto.collector.{trace,metrics,logs}.v1`.

## Services

All three collector services expose exactly one method `Export(Request) → Response`
with a matching `Export*PartialSuccess`:

- `collector.trace.v1.TraceService.Export(ExportTraceServiceRequest) → ExportTraceServiceResponse`
- `collector.metrics.v1.MetricsService.Export(...) → ...`
- `collector.logs.v1.LogsService.Export(...) → ...`

## Enums

StatusCode (UNSET/OK/ERROR), SpanFlags, SpanKind, LogRecordFlags, SeverityNumber
(1–24 incl. sub-ranges), AggregationTemporality, DataPointFlags.

## Structural notes

- Nested types present as separate descriptors: `Span.Event`, `Span.Link`,
  `ExponentialHistogramDataPoint.Buckets`, `SummaryDataPoint.ValueAtQuantile`.
- Packed repeated scalars recovered: `HistogramDataPoint.bucketCounts` (fixed64),
  `HistogramDataPoint.explicitBounds` (double).
- `AnyValue` carries a single oneof across its seven value fields.

Machine-readable atlas: `evidence/generated/proto-atlas.json` (gitignored, reproducible).
Clean-room TS interfaces: [`src/wire/otel-proto.generated.ts`](../../src/wire/otel-proto.generated.ts).
