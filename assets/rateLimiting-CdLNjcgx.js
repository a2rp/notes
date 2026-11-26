import{Bt as e,Pt as t,Tt as n,U as r,Ut as i,_ as a,at as o,c as s,d as c,ft as l,h as u,ht as d,i as f,it as p,jt as m,m as h,n as g,w as _}from"./index-COQIkgJQ.js";var v=i(e(),1),y={wrapper:`_wrapper_1kpd1_1`,rot:`_rot_1kpd1_278`},b=t(),x=()=>{let[e,t]=(0,v.useState)(!1),[i,x]=(0,v.useState)(null),S=(0,v.useMemo)(()=>[{key:`what`,title:`What is rate limiting`,icon:(0,b.jsx)(g,{}),summary:`A safety gate that limits how many requests a client can make in a time window.`,points:[`Goal - protect your API from abuse, bots, and accidental overload`,`It is not just security - it is also reliability and cost control`,`Usually applied per IP, per user, per API key, or per route`],mentalModel:`Think of it like a traffic signal for requests. It does not stop traffic forever - it controls the flow so the road does not collapse.`},{key:`why`,title:`Why it matters in production`,icon:(0,b.jsx)(d,{}),summary:`Without it, one noisy client can slow down everyone and even crash your service.`,points:[`Stops brute force login attempts`,`Reduces spam and scraping`,`Prevents sudden spikes from taking down your servers`,`Helps keep database and downstream services stable`],mentalModel:`Rate limiting is a circuit breaker for traffic volume. You allow a safe amount and reject or slow down the rest.`},{key:`responses`,title:`How APIs respond`,icon:(0,b.jsx)(a,{}),summary:`Use clear status codes and headers so clients know what happened and when to retry.`,points:[`Common status - 429 Too Many Requests`,`Return a stable error shape so frontend can show a proper message`,`Send retry hints using headers when possible`],mentalModel:`Clients are not mind readers. If you reject requests, tell them when they can retry.`},{key:`strategies`,title:`Common strategies`,icon:(0,b.jsx)(n,{}),summary:`Different algorithms fit different traffic patterns. Choose based on fairness and burst handling.`,points:[`Fixed window - simplest, but allows boundary bursts`,`Sliding window - smoother limits, more accurate`,`Token bucket - allows bursts but controls average rate`,`Leaky bucket - smooth out traffic, steady output`],mentalModel:`Token bucket is like a wallet of tokens. Tokens refill over time. Each request spends one token.`},{key:`where`,title:`Where to apply it`,icon:(0,b.jsx)(l,{}),summary:`Best placed at the edge first, then in your app for route level rules.`,points:[`Edge - CDN / load balancer / reverse proxy (fastest rejection)`,`App - Express middleware for per route or per user rules`,`Downstream - protect expensive endpoints like search and login`],mentalModel:`Reject early - do not let bad traffic reach expensive code paths.`},{key:`state`,title:`Where to store counters`,icon:(0,b.jsx)(_,{}),summary:`In-memory works only for single instance. For multiple servers use shared storage like Redis.`,points:[`Single server - in-memory map can work but resets on restart`,`Multiple servers - need shared state (Redis is common)`,`Avoid database counters for high traffic limits - too slow and costly`],mentalModel:`If you have multiple servers, they must agree on counts. Redis helps them share the same truth.`}],[]),C=(0,v.useMemo)(()=>[{key:`expressMemory`,title:`Example - simple Express in-memory limiter`,icon:(0,b.jsx)(m,{}),note:`Good for learning and small apps. Not recommended for multi-instance production.`,code:`// Simple in-memory rate limiter (per IP per route)
// Limit: 10 requests per 60 seconds

const hits = new Map();

const rateLimit = (req, res, next) => {
  const ip = req.ip || "unknown";
  const key = \`\${ip}:\${req.path}\`;

  const now = Date.now();
  const windowMs = 60 * 1000;
  const limit = 10;

  const entry = hits.get(key) || { count: 0, start: now };

  // reset window
  if (now - entry.start >= windowMs) {
    entry.count = 0;
    entry.start = now;
  }

  entry.count += 1;
  hits.set(key, entry);

  if (entry.count > limit) {
    const retryAfterSec = Math.ceil((windowMs - (now - entry.start)) / 1000);

    res.setHeader("Retry-After", String(retryAfterSec));
    return res.status(429).json({
      ok: false,
      error: {
        code: "RATE_LIMITED",
        message: "Too many requests. Try again later.",
        retryAfterSec,
      },
    });
  }

  next();
};

// usage
app.use("/api/login", rateLimit);`},{key:`tokenBucketRedis`,title:`Example - token bucket mental model (Redis style)`,icon:(0,b.jsx)(_,{}),note:`This shows the idea. Real production code uses atomic operations and Lua scripts to avoid race conditions.`,code:`// Token bucket concept (pseudo)
// capacity = max tokens
// refillRate = tokens per second

// store in Redis per user:
// tokens, lastRefillTs

function allowRequest(userKey) {
  // read tokens and lastRefillTs
  // refill based on time passed
  // if tokens >= 1 -> decrement and allow
  // else reject with 429 and Retry-After hint
}

// Why Redis + Lua?
// To make read-refill-decrement atomic across servers.`},{key:`headers`,title:`Helpful headers to return`,icon:(0,b.jsx)(r,{}),note:`Different teams use different header names. Pick a convention and keep it consistent.`,code:`// Common patterns
// 429 Too Many Requests
// Retry-After: 12

// Some systems also send:
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 24
X-RateLimit-Reset: 1710000000`}],[]),w=(0,v.useMemo)(()=>[`Applying the same strict limit to all endpoints - login and search need different rules`,`Using only IP based limits - mobile networks and shared NAT can cause false blocks`,`No retry hints - clients keep hammering and things get worse`,`In-memory limits in multi-instance production - every server counts separately`,`Non-atomic counter updates - race conditions allow extra requests`,`No allowlist for trusted internal services - breaks your own systems`],[]),T=()=>{t(e=>!e),e&&x(null)},E=e=>{x(t=>t===e?null:e)};return(0,b.jsxs)(`section`,{className:y.wrapper,children:[(0,b.jsxs)(`button`,{type:`button`,className:`sectionHeader ${e?`open`:``}`,onClick:T,"aria-expanded":e,title:e?`Collapse section`:`Expand section`,children:[(0,b.jsxs)(`span`,{className:`left`,children:[(0,b.jsx)(`span`,{className:`sIcon`,children:(0,b.jsx)(d,{})}),(0,b.jsxs)(`span`,{className:`text`,children:[(0,b.jsx)(`span`,{className:`title`,children:`Rate limiting`}),(0,b.jsx)(`span`,{className:`sub`,children:`Protect APIs from abuse and overload using fair request limits`})]})]}),(0,b.jsxs)(`span`,{className:`right`,children:[(0,b.jsx)(`span`,{className:`pill`,children:e?(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(p,{}),` Collapse`]}):(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(o,{}),` Expand`]})}),(0,b.jsx)(`span`,{className:`chev ${e?`rot`:``}`,children:(0,b.jsx)(u,{})})]})]}),(0,b.jsxs)(`div`,{className:`sectionBody ${e?`show`:``}`,children:[(0,b.jsxs)(`div`,{className:`intro`,children:[(0,b.jsx)(`div`,{className:`introIcon`,children:(0,b.jsx)(c,{})}),(0,b.jsxs)(`div`,{className:`introText`,children:[(0,b.jsx)(`div`,{className:`introTitle`,children:`Rate limiting - quick definition`}),(0,b.jsx)(`div`,{className:`introSub`,children:`Rate limiting sets a maximum request rate so one client cannot overwhelm the system. You usually return 429 and provide retry hints so clients back off cleanly.`})]})]}),(0,b.jsx)(`div`,{className:`grid`,children:S.map(e=>{let t=i===e.key;return(0,b.jsxs)(`div`,{className:`card ${t?`open`:``}`,children:[(0,b.jsxs)(`button`,{type:`button`,className:`cardHeader`,onClick:()=>E(e.key),"aria-expanded":t,title:t?`Collapse`:`Expand`,children:[(0,b.jsxs)(`span`,{className:`cLeft`,children:[(0,b.jsx)(`span`,{className:`cIcon`,children:e.icon}),(0,b.jsxs)(`span`,{className:`cText`,children:[(0,b.jsx)(`span`,{className:`cTitle`,children:e.title}),(0,b.jsx)(`span`,{className:`cSummary`,children:e.summary})]})]}),(0,b.jsx)(`span`,{className:`cRight`,children:(0,b.jsx)(`span`,{className:`cChev ${t?`rot`:``}`,children:(0,b.jsx)(u,{})})})]}),(0,b.jsxs)(`div`,{className:`cardBody ${t?`show`:``}`,children:[(0,b.jsxs)(`div`,{className:`block`,children:[(0,b.jsx)(`div`,{className:`blockTitle`,children:`Key points`}),(0,b.jsx)(`ul`,{className:`list`,children:e.points.map((t,n)=>(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`span`,{className:`dot`}),(0,b.jsx)(`span`,{className:`liText`,children:t})]},`${e.key}-p-${n}`))})]}),(0,b.jsxs)(`div`,{className:`block`,children:[(0,b.jsx)(`div`,{className:`blockTitle`,children:`Mental model`}),(0,b.jsx)(`p`,{className:`para`,children:e.mentalModel})]}),(0,b.jsxs)(`div`,{className:`footerHint`,children:[(0,b.jsx)(`span`,{className:`hintIcon`,children:(0,b.jsx)(s,{})}),(0,b.jsx)(`span`,{className:`hintText`,children:`Interview line: Rate limiting is used to protect API reliability and security by controlling request volume per client.`})]})]})]},e.key)})}),(0,b.jsxs)(`div`,{className:`samples`,children:[(0,b.jsxs)(`div`,{className:`samplesTop`,children:[(0,b.jsx)(`div`,{className:`samplesIcon`,children:(0,b.jsx)(m,{})}),(0,b.jsxs)(`div`,{className:`samplesText`,children:[(0,b.jsx)(`div`,{className:`samplesTitle`,children:`Practical examples`}),(0,b.jsx)(`div`,{className:`samplesSub`,children:`These examples show patterns you can describe in interviews and use in small projects.`})]})]}),(0,b.jsx)(`div`,{className:`sampleGrid`,children:C.map(e=>(0,b.jsxs)(`div`,{className:`sampleCard`,children:[(0,b.jsx)(`div`,{className:`sampleHeader`,children:(0,b.jsxs)(`div`,{className:`sampleLeft`,children:[(0,b.jsx)(`span`,{className:`sampleIcon`,children:e.icon}),(0,b.jsxs)(`div`,{className:`sampleHeadText`,children:[(0,b.jsx)(`div`,{className:`sampleTitle`,children:e.title}),(0,b.jsx)(`div`,{className:`sampleNote`,children:e.note})]})]})}),(0,b.jsx)(`pre`,{className:`code`,children:(0,b.jsx)(`code`,{children:e.code})})]},e.key))})]}),(0,b.jsxs)(`div`,{className:`pitfalls`,children:[(0,b.jsxs)(`div`,{className:`pitTop`,children:[(0,b.jsx)(`div`,{className:`pitIcon`,children:(0,b.jsx)(f,{})}),(0,b.jsxs)(`div`,{className:`pitText`,children:[(0,b.jsx)(`div`,{className:`pitTitle`,children:`Common pitfalls`}),(0,b.jsx)(`div`,{className:`pitSub`,children:`Most real bugs come from wrong placement, wrong identity key, or wrong shared state.`})]})]}),(0,b.jsx)(`ul`,{className:`pitList`,children:w.map((e,t)=>(0,b.jsxs)(`li`,{children:[(0,b.jsx)(`span`,{className:`dotWarn`}),(0,b.jsx)(`span`,{className:`liText`,children:e})]},`pit-${t}`))})]}),(0,b.jsxs)(`div`,{className:`closing`,children:[(0,b.jsx)(`span`,{className:`closingIcon`,children:(0,b.jsx)(h,{})}),(0,b.jsx)(`span`,{className:`closingText`,children:`Best practice: enforce rate limits at the edge first, then add route specific rules inside the app, and use Redis for shared counters in multi-instance setups.`})]})]})]})};export{x as default};