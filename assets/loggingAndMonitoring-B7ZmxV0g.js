import{G as e,K as t,M as n,P as r,St as i,Z as a,c as o,d as s,et as c,i as l,m as u,n as d,pt as f,ut as p,w as m,yt as h}from"./index-CiOkSCYJ.js";var g=i(h(),1),_={wrapper:`_wrapper_bu2al_1`,rot:`_rot_bu2al_272`,warn:`_warn_bu2al_756`},v=f(),y=()=>{let[i,f]=(0,g.useState)(!1),[h,y]=(0,g.useState)(null),b=(0,g.useMemo)(()=>[{key:`why`,title:`Why logging and monitoring exist`,icon:(0,v.jsx)(d,{}),summary:`Logs tell you what happened. Monitoring tells you what is happening. Together they make production debuggable.`,bullets:[`Without logs you guess. With logs you know what the code actually did.`,`Without monitoring you react late. With monitoring you see problems early.`,`In production, bugs are normal. Observability is the superpower that makes them solvable.`],mentalModel:{title:`Mental model`,text:`Logs are the story of past events. Monitoring is the live dashboard of system health.`},example:{title:`Example - what you want to answer fast`,code:`// Questions logs and monitoring should help answer
// - Which endpoint is failing right now
// - How many users are impacted
// - Is it database, cache, network, or code
// - When did it start and what changed`},gotchas:[`If you only log errors, you miss the cause.`,`If you log everything, you drown in noise and cost.`]},{key:`structuredLogs`,title:`Structured logs`,icon:(0,v.jsx)(m,{}),summary:`Structured logs are logs written as consistent fields, usually JSON, so machines can search, filter, and aggregate them reliably.`,bullets:[`A structured log has fields like level, message, requestId, userId, route, statusCode, durationMs.`,`Structured logs work best with log search tools because you can filter by fields.`,`Human readable text logs are fine for dev, but structured logs win in production.`],mentalModel:{title:`Mental model`,text:`A structured log is like a spreadsheet row. A plain string log is like a random sentence in a diary.`},example:{title:`Example - Node style structured log`,code:`// Example log object (could be JSON)
console.log(JSON.stringify({
  level: "info",
  msg: "request complete",
  requestId: "req_9f1c",
  method: "GET",
  path: "/api/users",
  statusCode: 200,
  durationMs: 37,
  ts: new Date().toISOString()
}));

// Why it helps:
// - filter by requestId
// - group by statusCode
// - average durationMs per route`},gotchas:[`Do not log passwords, tokens, cookies, or secrets.`,`Avoid logging full request bodies blindly.`]},{key:`correlationId`,title:`Correlation IDs`,icon:(0,v.jsx)(n,{}),summary:`A correlation ID (often called requestId) ties all logs for a single request across services so you can trace the full path.`,bullets:[`Generate a requestId at the edge (API gateway or first service).`,`Pass it through headers like x-request-id to downstream services.`,`Include requestId in every log line for that request.`],mentalModel:{title:`Mental model`,text:`Correlation ID is a tracking number for a request, like a courier shipment ID.`},example:{title:`Example - simple Express middleware`,code:`import crypto from "crypto";

app.use((req, res, next) => {
  const incoming = req.headers["x-request-id"];
  const requestId = incoming || crypto.randomUUID();

  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  next();
});

// Later in route handlers:
console.log(JSON.stringify({
  level: "info",
  msg: "fetching user",
  requestId: req.requestId,
  userId: "u_123"
}));`},gotchas:[`If requestId is missing, debugging distributed issues becomes painful.`]},{key:`metrics`,title:`Monitoring and metrics`,icon:(0,v.jsx)(d,{}),summary:`Monitoring is built on metrics. Metrics are numbers over time, like request rate, error rate, and latency.`,bullets:[`Common API metrics: requests per second, 4xx rate, 5xx rate, p95 latency, p99 latency.`,`Infra metrics: CPU, memory, disk, network, database connections.`,`A good monitoring setup detects issues before users complain.`],mentalModel:{title:`Mental model`,text:`Metrics are the vital signs of your system - pulse, blood pressure, oxygen levels.`},example:{title:`Example - what a useful dashboard shows`,code:`// A practical dashboard usually includes
// - Traffic: requests per second per route
// - Errors: 4xx and 5xx rate
// - Latency: p50, p95, p99
// - Dependencies: DB latency, Redis hit rate
// - Saturation: CPU and memory`},gotchas:[`Do not rely only on average latency. Use percentiles like p95 and p99.`]},{key:`alerts`,title:`Alerting`,icon:(0,v.jsx)(l,{}),summary:`Alerts are rules that notify you when something abnormal happens. Alerts should be actionable, not noisy.`,bullets:[`Alert when users are impacted: sustained 5xx spike, high latency, failed payments.`,`Use thresholds and time windows to avoid false alarms.`,`Add runbooks: short steps that tell what to check first.`],mentalModel:{title:`Mental model`,text:`Alerts are smoke alarms, not decoration. If they beep too often, people ignore them.`},example:{title:`Example - alert rule style`,code:`// Example alert ideas
// - 5xx rate > 2% for 5 minutes
// - p95 latency > 800ms for 10 minutes
// - DB connection errors > 10 per minute
// - Queue depth growing continuously`},gotchas:[`Too many alerts cause alert fatigue.`,`Alerts without context waste time.`]},{key:`errorTracking`,title:`Error tracking`,icon:(0,v.jsx)(a,{}),summary:`Error tracking tools collect exceptions with stack traces, group similar errors, and show impact. This is different from logs.`,bullets:[`Error tracking captures stack traces and context.`,`It groups errors by signature so you do not chase duplicates.`,`It can show release version so you know which deploy introduced the error.`],mentalModel:{title:`Mental model`,text:`Logs are raw events. Error tracking is curated crash reports with grouping and impact.`},example:{title:`Example - what error tracking should store`,code:`// Typical captured context
// - error message and stack trace
// - requestId
// - route and method
// - userId (if safe)
// - environment (prod, staging)
// - release version
// - tags: region, service, instance`},gotchas:[`Never send secrets to error trackers.`,`Sampling may be needed under high volume.`]},{key:`securityLogging`,title:`Security logging basics`,icon:(0,v.jsx)(c,{}),summary:`Security logs help detect abuse and attacks while staying privacy safe. Log signals, not sensitive data.`,bullets:[`Log auth failures, rate limit hits, suspicious IP patterns, unusual user agent spikes.`,`Mask sensitive fields. Never store tokens or passwords.`,`Keep audit logs for critical actions: role change, password reset, payouts, deletions.`],mentalModel:{title:`Mental model`,text:`Security logs are CCTV footage. You want useful evidence, not private information leaks.`},example:{title:`Example - safe audit log fields`,code:`// Audit log example fields
{
  level: "warn",
  msg: "role updated",
  actorUserId: "admin_9",
  targetUserId: "u_42",
  oldRole: "employee",
  newRole: "manager",
  requestId: "req_1a2b",
  ts: "2026-03-04T07:10:00.000Z"
}`},gotchas:[`Logging too much personal data can create compliance risk.`]},{key:`healthChecks`,title:`Health checks`,icon:(0,v.jsx)(p,{}),summary:`Health checks are endpoints that prove your service is alive and ready. They are used by load balancers and orchestration.`,bullets:[`Liveness means process is running.`,`Readiness means service can handle traffic (DB reachable, migrations done).`,`Keep health checks fast. Avoid heavy queries.`],mentalModel:{title:`Mental model`,text:`Liveness is breathing. Readiness is being awake and able to work.`},example:{title:`Example - typical endpoints`,code:`// Common endpoints
// GET /healthz  -> liveness
// GET /readyz   -> readiness

// In a simple Node service, /healthz can return 200 always.
// /readyz can check DB connection or key dependencies.`},gotchas:[`Do not make health checks slow or expensive.`]}],[]),x=()=>{f(e=>!e),i&&y(null)},S=e=>{y(t=>t===e?null:e)};return(0,v.jsxs)(`section`,{className:_.wrapper,children:[(0,v.jsxs)(`button`,{type:`button`,className:`sectionHeader ${i?`open`:``}`,onClick:x,"aria-expanded":i,children:[(0,v.jsxs)(`span`,{className:`left`,children:[(0,v.jsx)(`span`,{className:`sIcon`,children:(0,v.jsx)(s,{})}),(0,v.jsxs)(`span`,{className:`text`,children:[(0,v.jsx)(`span`,{className:`title`,children:`Logging and monitoring`}),(0,v.jsx)(`span`,{className:`sub`,children:`Structured logs, correlation IDs, metrics, alerts, error tracking, and health checks`})]})]}),(0,v.jsxs)(`span`,{className:`right`,children:[(0,v.jsx)(`span`,{className:`pill`,children:i?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(e,{}),` Collapse`]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(t,{}),` Expand`]})}),(0,v.jsx)(`span`,{className:`chev ${i?`rot`:``}`,children:(0,v.jsx)(u,{})})]})]}),(0,v.jsxs)(`div`,{className:`sectionBody ${i?`show`:``}`,children:[(0,v.jsxs)(`div`,{className:`intro`,children:[(0,v.jsx)(`div`,{className:`introIcon`,children:(0,v.jsx)(r,{})}),(0,v.jsxs)(`div`,{className:`introText`,children:[(0,v.jsx)(`div`,{className:`introTitle`,children:`Production debugging without guesswork`}),(0,v.jsx)(`div`,{className:`introSub`,children:`Logging and monitoring are the backbone of reliable backend systems. They help you detect issues early, understand impact, and fix problems faster.`})]})]}),(0,v.jsx)(`div`,{className:`grid`,children:b.map(e=>{let t=h===e.key;return(0,v.jsxs)(`div`,{className:`card ${t?`open`:``}`,children:[(0,v.jsxs)(`button`,{type:`button`,className:`cardHeader`,onClick:()=>S(e.key),"aria-expanded":t,children:[(0,v.jsxs)(`span`,{className:`cLeft`,children:[(0,v.jsx)(`span`,{className:`cIcon`,children:e.icon}),(0,v.jsxs)(`span`,{className:`cText`,children:[(0,v.jsx)(`span`,{className:`cTitle`,children:e.title}),(0,v.jsx)(`span`,{className:`cSummary`,children:e.summary})]})]}),(0,v.jsx)(`span`,{className:`cRight`,children:(0,v.jsx)(`span`,{className:`cChev ${t?`rot`:``}`,children:(0,v.jsx)(u,{})})})]}),(0,v.jsxs)(`div`,{className:`cardBody ${t?`show`:``}`,children:[(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:`Key points`}),(0,v.jsx)(`ul`,{className:`list`,children:e.bullets.map((t,n)=>(0,v.jsxs)(`li`,{children:[(0,v.jsx)(`span`,{className:`dot`}),(0,v.jsx)(`span`,{className:`liText`,children:t})]},`${e.key}-b-${n}`))})]}),(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:e.mentalModel.title}),(0,v.jsx)(`p`,{className:`para`,children:e.mentalModel.text})]}),(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:e.example.title}),(0,v.jsx)(`pre`,{className:`code`,children:(0,v.jsx)(`code`,{children:e.example.code})})]}),(0,v.jsxs)(`div`,{className:`block warn`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:`Common pitfalls`}),(0,v.jsx)(`ul`,{className:`list`,children:e.gotchas.map((t,n)=>(0,v.jsxs)(`li`,{children:[(0,v.jsx)(`span`,{className:`dot`}),(0,v.jsx)(`span`,{className:`liText`,children:t})]},`${e.key}-g-${n}`))})]}),(0,v.jsxs)(`div`,{className:`footerHint`,children:[(0,v.jsx)(`span`,{className:`hintIcon`,children:(0,v.jsx)(o,{})}),(0,v.jsxs)(`span`,{className:`hintText`,children:[`Revision tip: Explain `,e.title,` in 2 lines and give one real incident where it helps.`]})]})]})]},e.key)})}),(0,v.jsxs)(`div`,{className:`closing`,children:[(0,v.jsx)(`span`,{className:`closingIcon`,children:(0,v.jsx)(p,{})}),(0,v.jsx)(`span`,{className:`closingText`,children:`Strong backend teams treat logs and metrics as product features. If you cannot observe it, you cannot operate it.`})]})]})]})};export{y as default};