import{A as e,B as t,Bt as n,Pt as r,U as i,Ut as a,at as o,bt as s,dt as c,h as l,ht as u,it as d,m as f,q as p,r as m,y as h}from"./index-COQIkgJQ.js";var g=a(n(),1),_={wrapper:`_wrapper_dl51y_1`,rot:`_rot_dl51y_276`,active:`_active_dl51y_670`},v=r(),y=()=>{let[n,r]=(0,g.useState)(!1),[a,y]=(0,g.useState)(`basics`),b=(0,g.useMemo)(()=>[{key:`basics`,title:`What are structured logs`,icon:(0,v.jsx)(i,{}),summary:`Structured logs are logs written as objects (usually JSON) so machines can filter, search, and alert reliably.`,points:[`Normal logs are free text - hard to parse consistently.`,`Structured logs are key-value data - easy to query and aggregate.`,`You can answer questions like 'show all errors for userId 42' without regex pain.`],code:`// Unstructured (hard to query)
console.log("User 42 failed to pay, order 9, reason: card_declined");

// Structured (easy to query)
console.log(JSON.stringify({
  level: "error",
  msg: "payment_failed",
  userId: "42",
  orderId: "9",
  reason: "card_declined"
}));`},{key:`fields`,title:`Core fields to include`,icon:(0,v.jsx)(s,{}),summary:`A consistent log shape makes dashboards, alerts, and debugging fast.`,points:[`level - debug, info, warn, error`,`msg - short event name, like 'payment_failed'`,`ts - timestamp (ISO string) or logger adds it automatically`,`service - service name, like 'billing-api'`,`env - dev, staging, prod`,`requestId - correlation id for one request across logs`,`userId - if available, but do not log sensitive info`,`durationMs - for performance visibility`,`err - error object fields (name, message, stack) for errors`],code:`// A good baseline shape
{
  "level": "info",
  "msg": "http_request_done",
  "service": "orders-api",
  "env": "prod",
  "requestId": "req_01J...",
  "method": "GET",
  "path": "/orders/9",
  "status": 200,
  "durationMs": 18
}`},{key:`nodeExample`,title:`Node.js example with requestId`,icon:(0,v.jsx)(p,{}),summary:`Add a requestId at the edge, then attach it to every log in that request.`,points:[`Generate requestId for each request (or accept from gateway).`,`Put requestId in response header so clients can share it.`,`Log start and end with durationMs.`,`On errors, include requestId and error fields.`],code:`import crypto from "crypto";
import express from "express";

const app = express();

const makeId = () => "req_" + crypto.randomBytes(8).toString("hex");

app.use((req, res, next) => {
  const requestId = req.header("x-request-id") || makeId();
  req.requestId = requestId;
  res.setHeader("x-request-id", requestId);

  const start = Date.now();

  console.log(JSON.stringify({
    level: "info",
    msg: "http_request_start",
    requestId,
    method: req.method,
    path: req.path
  }));

  res.on("finish", () => {
    console.log(JSON.stringify({
      level: "info",
      msg: "http_request_done",
      requestId,
      method: req.method,
      path: req.path,
      status: res.statusCode,
      durationMs: Date.now() - start
    }));
  });

  next();
});

app.get("/health", (req, res) => {
  console.log(JSON.stringify({
    level: "info",
    msg: "health_check",
    requestId: req.requestId
  }));
  res.json({ ok: true });
});

app.use((err, req, res, next) => {
  console.log(JSON.stringify({
    level: "error",
    msg: "unhandled_error",
    requestId: req.requestId,
    err: {
      name: err?.name,
      message: err?.message,
      stack: err?.stack
    }
  }));
  res.status(500).json({ error: "internal_error", requestId: req.requestId });
});

app.listen(3000);`},{key:`querying`,title:`How structured logs help in production`,icon:(0,v.jsx)(c,{}),summary:`They turn debugging into searching and filtering instead of guessing.`,points:[`Filter by requestId to see one request journey.`,`Group by msg to see top error types.`,`Track latency with durationMs percentiles.`,`Alert on error rate spikes for msg values like 'payment_failed'.`],code:`// Example queries (conceptual)
// Find a request
requestId = "req_abc123"

// Find all errors for an endpoint
msg = "http_request_done" AND path = "/orders" AND status >= 500

// Find slow requests
msg = "http_request_done" AND durationMs > 1000`},{key:`pitfalls`,title:`Common mistakes and rules`,icon:(0,v.jsx)(m,{}),summary:`Structured logs are powerful, but you must be disciplined.`,points:[`Do not log secrets - passwords, tokens, cookies, card data, OTPs.`,`Keep msg stable - treat it like an event name, not a paragraph.`,`Avoid huge payload logs - log ids, not full objects.`,`Do not mix shapes randomly - keep consistent keys across services.`,`Use proper levels - info for normal, warn for unusual, error for failures.`,`In production, prefer a logger library that writes JSON and handles errors well.`],code:`// Bad - leaks secrets
console.log(JSON.stringify({
  level: "info",
  msg: "login_attempt",
  email: "a@b.com",
  password: "123456"
}));

// Better - log minimal safe fields
console.log(JSON.stringify({
  level: "info",
  msg: "login_attempt",
  email: "a@b.com",
  hasPassword: true
}));`},{key:`checklist`,title:`Interview ready checklist`,icon:(0,v.jsx)(f,{}),summary:`Use these lines when explaining structured logs in interviews.`,points:[`Structured logs are machine readable key-value logs, usually JSON.`,`They enable filtering, aggregation, alerting, and correlation across services.`,`I include requestId, service, env, level, msg, and durationMs.`,`I avoid logging sensitive data and keep log shapes consistent.`],code:`// 2 line interview answer
// Structured logs are JSON key-value logs that tools can query reliably.
// With requestId and consistent fields, debugging becomes fast search and correlation.`}],[]),x=()=>{r(e=>!e)},S=e=>{y(e)},C=b.find(e=>e.key===a)||b[0];return(0,v.jsxs)(`section`,{className:_.wrapper,children:[(0,v.jsxs)(`button`,{type:`button`,className:`sectionHeader ${n?`open`:``}`,onClick:x,"aria-expanded":n,children:[(0,v.jsxs)(`span`,{className:`left`,children:[(0,v.jsx)(`span`,{className:`sIcon`,children:(0,v.jsx)(e,{})}),(0,v.jsxs)(`span`,{className:`text`,children:[(0,v.jsx)(`span`,{className:`title`,children:`Structured logs`}),(0,v.jsx)(`span`,{className:`sub`,children:`JSON logs, consistent fields, requestId correlation, production debugging`})]})]}),(0,v.jsxs)(`span`,{className:`right`,children:[(0,v.jsx)(`span`,{className:`pill`,children:n?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(d,{}),` Collapse`]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(o,{}),` Expand`]})}),(0,v.jsx)(`span`,{className:`chev ${n?`rot`:``}`,children:(0,v.jsx)(l,{})})]})]}),(0,v.jsxs)(`div`,{className:`sectionBody ${n?`show`:``}`,children:[(0,v.jsxs)(`div`,{className:`topHint`,children:[(0,v.jsx)(`div`,{className:`hintIcon`,children:(0,v.jsx)(t,{})}),(0,v.jsxs)(`div`,{className:`hintText`,children:[(0,v.jsx)(`div`,{className:`hintTitle`,children:`One rule that saves hours`}),(0,v.jsx)(`div`,{className:`hintSub`,children:`Every request should have a requestId, and every log line for that request should include it.`})]})]}),(0,v.jsxs)(`div`,{className:`layout`,children:[(0,v.jsx)(`div`,{className:`nav`,children:b.map(e=>{let t=e.key===a;return(0,v.jsxs)(`button`,{type:`button`,className:`navItem ${t?`active`:``}`,onClick:()=>S(e.key),"aria-current":t?`true`:`false`,children:[(0,v.jsx)(`span`,{className:`nIcon`,children:e.icon}),(0,v.jsxs)(`span`,{className:`nText`,children:[(0,v.jsx)(`span`,{className:`nTitle`,children:e.title}),(0,v.jsx)(`span`,{className:`nSub`,children:e.summary})]}),(0,v.jsx)(`span`,{className:`nRight`,children:(0,v.jsx)(l,{})})]},e.key)})}),(0,v.jsx)(`div`,{className:`content`,children:(0,v.jsxs)(`div`,{className:`card`,children:[(0,v.jsxs)(`div`,{className:`cardHead`,children:[(0,v.jsx)(`div`,{className:`cIcon`,children:C.icon}),(0,v.jsxs)(`div`,{className:`cText`,children:[(0,v.jsx)(`div`,{className:`cTitle`,children:C.title}),(0,v.jsx)(`div`,{className:`cSummary`,children:C.summary})]})]}),(0,v.jsxs)(`div`,{className:`cardBody`,children:[(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`bTitle`,children:`Key points`}),(0,v.jsx)(`ul`,{className:`list`,children:C.points.map((e,t)=>(0,v.jsxs)(`li`,{children:[(0,v.jsx)(`span`,{className:`dot`}),(0,v.jsx)(`span`,{className:`liText`,children:e})]},`${C.key}-p-${t}`))})]}),(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`bTitle`,children:`Example and pattern`}),(0,v.jsx)(`pre`,{className:`code`,children:(0,v.jsx)(`code`,{children:C.code})})]}),(0,v.jsxs)(`div`,{className:`miniGrid`,children:[(0,v.jsxs)(`div`,{className:`mini`,children:[(0,v.jsxs)(`div`,{className:`mTop`,children:[(0,v.jsx)(`span`,{className:`mIcon`,children:(0,v.jsx)(h,{})}),(0,v.jsx)(`span`,{className:`mTitle`,children:`Practical tip`})]}),(0,v.jsx)(`div`,{className:`mText`,children:`Prefer a JSON logger in production (pino, winston) so logs are valid JSON and include timestamps and error serializers.`})]}),(0,v.jsxs)(`div`,{className:`mini`,children:[(0,v.jsxs)(`div`,{className:`mTop`,children:[(0,v.jsx)(`span`,{className:`mIcon`,children:(0,v.jsx)(u,{})}),(0,v.jsx)(`span`,{className:`mTitle`,children:`Security tip`})]}),(0,v.jsx)(`div`,{className:`mText`,children:`Never log secrets - redact headers like Authorization, cookies, and payment data. Log ids, not payloads.`})]})]})]}),(0,v.jsxs)(`div`,{className:`cardFoot`,children:[(0,v.jsx)(`span`,{className:`fIcon`,children:(0,v.jsx)(m,{})}),(0,v.jsx)(`span`,{className:`fText`,children:`If logs are unstructured, on-call becomes guesswork. Structured logs turn on-call into search and filters.`})]})]})})]}),(0,v.jsxs)(`div`,{className:`glossary`,children:[(0,v.jsx)(`div`,{className:`gTitle`,children:`Mini glossary`}),(0,v.jsxs)(`div`,{className:`gGrid`,children:[(0,v.jsxs)(`div`,{className:`gItem`,children:[(0,v.jsx)(`div`,{className:`k`,children:`requestId`}),(0,v.jsx)(`div`,{className:`v`,children:`A unique id for one request, used to correlate logs.`})]}),(0,v.jsxs)(`div`,{className:`gItem`,children:[(0,v.jsx)(`div`,{className:`k`,children:`correlation`}),(0,v.jsx)(`div`,{className:`v`,children:`Linking logs across services using requestId or trace id.`})]}),(0,v.jsxs)(`div`,{className:`gItem`,children:[(0,v.jsx)(`div`,{className:`k`,children:`log level`}),(0,v.jsx)(`div`,{className:`v`,children:`Severity of a log - debug, info, warn, error.`})]}),(0,v.jsxs)(`div`,{className:`gItem`,children:[(0,v.jsx)(`div`,{className:`k`,children:`msg`}),(0,v.jsx)(`div`,{className:`v`,children:`Short stable event name, like "payment_failed".`})]})]})]})]})]})};export{y as default};