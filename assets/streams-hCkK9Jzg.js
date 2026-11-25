import{C as e,G as t,K as n,P as r,St as i,Y as a,c as o,ct as s,d as c,i as l,m as u,ot as d,pt as f,tt as p,ut as m,yt as h}from"./index-CiOkSCYJ.js";var g=i(h(),1),_={wrapper:`_wrapper_813ja_1`,rot:`_rot_813ja_272`,warn:`_warn_813ja_756`},v=f(),y=()=>{let[i,f]=(0,g.useState)(!1),[h,y]=(0,g.useState)(null),b=(0,g.useMemo)(()=>[{key:`what`,title:`What are streams`,icon:(0,v.jsx)(s,{}),summary:`Streams process data in chunks. You do not load everything into memory at once.`,bullets:[`Streams are built for large data: files, network responses, uploads, logs, video, zip, etc.`,`Instead of reading the full content, Node reads and writes small chunks over time.`,`This keeps memory stable and lets you start sending data immediately.`],mentalModel:{title:`Mental model`,text:`Streams are like a conveyor belt. Items arrive one by one, and you process each item without waiting for the whole truck to unload.`},example:{title:`Example - why streams matter`,code:`// Bad for large files (loads everything into memory)
const data = await fs.promises.readFile("./big.mp4");
res.send(data);

// Good for large files (streams chunks)
fs.createReadStream("./big.mp4").pipe(res);`},gotchas:[`Avoid readFile for very large files in APIs.`,`Streaming starts response early, which is good for user experience.`]},{key:`types`,title:`Types of streams`,icon:(0,v.jsx)(p,{}),summary:`Node streams are mainly Readable, Writable, Duplex, and Transform.`,bullets:[`Readable - produces data chunks. Example: fs.createReadStream.`,`Writable - consumes chunks. Example: fs.createWriteStream.`,`Duplex - readable + writable. Example: TCP socket.`,`Transform - duplex that modifies chunks. Example: gzip compression.`],mentalModel:{title:`Mental model`,text:`Readable is a tap, Writable is a bucket, Duplex is a pipe both ways, Transform is a filter between tap and bucket.`},example:{title:`Example - transform with gzip`,code:`import fs from "fs";
import zlib from "zlib";

const gzip = zlib.createGzip();

fs.createReadStream("./big.txt")
  .pipe(gzip)
  .pipe(fs.createWriteStream("./big.txt.gz"));`},gotchas:[`Transform streams are perfect for compression, encryption, and parsing.`]},{key:`pipe`,title:`pipe`,icon:(0,v.jsx)(a,{}),summary:`pipe connects streams and automatically handles flow control and backpressure.`,bullets:[`pipe forwards chunks from readable to writable.`,`pipe pauses reading if writable is slow, preventing memory growth.`,`pipe is safer than manual data event handling for most cases.`],mentalModel:{title:`Mental model`,text:`pipe is an automatic hose with a smart valve. If the bucket fills too fast, it slows the water.`},example:{title:`Example - file download`,code:`import fs from "fs";

app.get("/download", (req, res) => {
  res.setHeader("Content-Type", "application/octet-stream");
  fs.createReadStream("./big.zip").pipe(res);
});`},gotchas:[`Always attach error handlers, especially for file streams.`]},{key:`backpressure`,title:`Backpressure`,icon:(0,v.jsx)(m,{}),summary:`Backpressure means the receiver cannot keep up with the sender. Streams support this to prevent memory explosion.`,bullets:[`If the writable is slower, readable must pause to avoid buffering too much.`,`pipe manages backpressure automatically.`,`Without backpressure, Node can buffer huge amounts and crash your process.`],mentalModel:{title:`Mental model`,text:`Backpressure is traffic control. If the road ahead is jammed, you slow down cars entering the road.`},example:{title:`Example - manual data handling needs control`,code:`// If you do manual streaming, you must handle pause/resume
readable.on("data", (chunk) => {
  const ok = writable.write(chunk);
  if (!ok) readable.pause();
});

writable.on("drain", () => {
  readable.resume();
});`},gotchas:[`Most bugs in manual streaming come from ignoring backpressure.`]},{key:`errors`,title:`Error handling`,icon:(0,v.jsx)(l,{}),summary:`Streams can fail mid-way. Always handle errors to avoid crashes and partial responses.`,bullets:[`File missing, permission issues, broken network, client disconnect.`,`If you do not listen for error events, Node can crash.`,`When streaming to HTTP response, handle both stream errors and res close events.`],mentalModel:{title:`Mental model`,text:`A stream is a long-running operation. Anything can break during the journey, so you must handle failures along the way.`},example:{title:`Example - safe streaming to response`,code:`import fs from "fs";

app.get("/download", (req, res) => {
  const stream = fs.createReadStream("./big.zip");

  stream.on("error", () => {
    if (!res.headersSent) res.status(500).send("File error");
    else res.end();
  });

  res.on("close", () => {
    // client disconnected
    stream.destroy();
  });

  stream.pipe(res);
});`},gotchas:[`If client disconnects, destroy the stream to save resources.`,`If headers already sent, you cannot change status code.`]},{key:`realUse`,title:`Real backend uses`,icon:(0,v.jsx)(d,{}),summary:`Streams show up in many backend features. Knowing them improves performance and stability.`,bullets:[`File uploads and downloads`,`Proxying request bodies to another service`,`Logging pipelines and ETL style processing`,`Compression and encryption middleware`,`Large JSON parsing with streaming parsers`],mentalModel:{title:`Mental model`,text:`Any time data is big or continuous, streaming is the safest and most scalable shape.`},example:{title:`Example - streaming upload to disk`,code:`import fs from "fs";

// req is a readable stream in Node HTTP
app.post("/upload", (req, res) => {
  const out = fs.createWriteStream("./upload.bin");
  req.pipe(out);

  out.on("finish", () => res.send("uploaded"));
  out.on("error", () => res.status(500).send("write failed"));
});`},gotchas:[`Validate size and type for uploads. Streams do not remove security risks.`]}],[]),x=()=>{f(e=>!e),i&&y(null)},S=e=>{y(t=>t===e?null:e)};return(0,v.jsxs)(`section`,{className:_.wrapper,children:[(0,v.jsxs)(`button`,{type:`button`,className:`sectionHeader ${i?`open`:``}`,onClick:x,"aria-expanded":i,children:[(0,v.jsxs)(`span`,{className:`left`,children:[(0,v.jsx)(`span`,{className:`sIcon`,children:(0,v.jsx)(c,{})}),(0,v.jsxs)(`span`,{className:`text`,children:[(0,v.jsx)(`span`,{className:`title`,children:`Streams`}),(0,v.jsx)(`span`,{className:`sub`,children:`Chunked data flow, pipe, backpressure, error handling`})]})]}),(0,v.jsxs)(`span`,{className:`right`,children:[(0,v.jsx)(`span`,{className:`pill`,children:i?(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(t,{}),` Collapse`]}):(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(n,{}),` Expand`]})}),(0,v.jsx)(`span`,{className:`chev ${i?`rot`:``}`,children:(0,v.jsx)(u,{})})]})]}),(0,v.jsxs)(`div`,{className:`sectionBody ${i?`show`:``}`,children:[(0,v.jsxs)(`div`,{className:`intro`,children:[(0,v.jsx)(`div`,{className:`introIcon`,children:(0,v.jsx)(r,{})}),(0,v.jsxs)(`div`,{className:`introText`,children:[(0,v.jsx)(`div`,{className:`introTitle`,children:`Why streams are a core backend skill`}),(0,v.jsx)(`div`,{className:`introSub`,children:`Streams help you build fast and memory-safe APIs. They are critical for large files, network proxying, uploads, downloads, and compression pipelines.`})]})]}),(0,v.jsx)(`div`,{className:`grid`,children:b.map(e=>{let t=h===e.key;return(0,v.jsxs)(`div`,{className:`card ${t?`open`:``}`,children:[(0,v.jsxs)(`button`,{type:`button`,className:`cardHeader`,onClick:()=>S(e.key),"aria-expanded":t,children:[(0,v.jsxs)(`span`,{className:`cLeft`,children:[(0,v.jsx)(`span`,{className:`cIcon`,children:e.icon}),(0,v.jsxs)(`span`,{className:`cText`,children:[(0,v.jsx)(`span`,{className:`cTitle`,children:e.title}),(0,v.jsx)(`span`,{className:`cSummary`,children:e.summary})]})]}),(0,v.jsx)(`span`,{className:`cRight`,children:(0,v.jsx)(`span`,{className:`cChev ${t?`rot`:``}`,children:(0,v.jsx)(u,{})})})]}),(0,v.jsxs)(`div`,{className:`cardBody ${t?`show`:``}`,children:[(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:`Key points`}),(0,v.jsx)(`ul`,{className:`list`,children:e.bullets.map((t,n)=>(0,v.jsxs)(`li`,{children:[(0,v.jsx)(`span`,{className:`dot`}),(0,v.jsx)(`span`,{className:`liText`,children:t})]},`${e.key}-b-${n}`))})]}),(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:e.mentalModel.title}),(0,v.jsx)(`p`,{className:`para`,children:e.mentalModel.text})]}),(0,v.jsxs)(`div`,{className:`block`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:e.example.title}),(0,v.jsx)(`pre`,{className:`code`,children:(0,v.jsx)(`code`,{children:e.example.code})})]}),(0,v.jsxs)(`div`,{className:`block warn`,children:[(0,v.jsx)(`div`,{className:`blockTitle`,children:`Common pitfalls`}),(0,v.jsx)(`ul`,{className:`list`,children:e.gotchas.map((t,n)=>(0,v.jsxs)(`li`,{children:[(0,v.jsx)(`span`,{className:`dot`}),(0,v.jsx)(`span`,{className:`liText`,children:t})]},`${e.key}-g-${n}`))})]}),(0,v.jsxs)(`div`,{className:`footerHint`,children:[(0,v.jsx)(`span`,{className:`hintIcon`,children:(0,v.jsx)(o,{})}),(0,v.jsx)(`span`,{className:`hintText`,children:`Revision tip: Explain streams and backpressure with a simple "tap and bucket" story.`})]})]})]},e.key)})}),(0,v.jsxs)(`div`,{className:`closing`,children:[(0,v.jsx)(`span`,{className:`closingIcon`,children:(0,v.jsx)(e,{})}),(0,v.jsx)(`span`,{className:`closingText`,children:`Production habit: Prefer streaming for big data. It saves memory, reduces latency, and avoids backend crashes.`})]})]})]})};export{y as default};