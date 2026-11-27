# 117 - Permissions, geolocation, and device APIs

This example is a small browser demo for location, camera and optional microphone access, clipboard writing, and device orientation. Each capability starts only after its button is selected. The page does not save or send readings anywhere.

## Create these files

Make a folder named \`device-api-demo\` and add the three files below.

### \`device-api-demo/index.html\`

\`\`\`html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#f5f7fa">
    <title>Device capability demo</title>
    <script src="/app.js" defer></script>
  </head>
  <body>
    <main>
      <h1>Device capability demo</h1>
      <p>
        Try each feature when you are ready. The browser may ask for permission.
        Location, camera, microphone, and motion access are optional.
      </p>

      <section aria-labelledby="location-heading">
        <h2 id="location-heading">Location</h2>
        <p id="location-status" role="status" aria-live="polite">
          Location has not been requested.
        </p>
        <button id="locate-button" type="button">Get my location once</button>
        <button id="watch-button" type="button">Start location watch</button>
        <button id="stop-watch-button" type="button" disabled>
          Stop location watch
        </button>
        <p id="coordinates">No coordinates received.</p>

        <form id="manual-place-form">
          <label for="manual-place">Or enter a place without sharing device location</label>
          <input
            id="manual-place"
            name="place"
            type="text"
            maxlength="120"
            autocomplete="off"
            required
          >
          <button type="submit">Use this place</button>
        </form>
        <p id="manual-place-status" role="status" aria-live="polite"></p>
      </section>

      <section aria-labelledby="camera-heading">
        <h2 id="camera-heading">Camera preview</h2>
        <p>
          The preview stays on this page. Nothing is recorded or uploaded.
          Microphone access is off unless you select the checkbox.
        </p>
        <label>
          <input id="include-microphone" type="checkbox">
          Include microphone access
        </label>
        <p>
          <button id="start-camera-button" type="button">Start preview</button>
          <button id="stop-camera-button" type="button" disabled>
            Stop camera and microphone
          </button>
        </p>
        <video id="camera-preview" autoplay muted playsinline></video>
        <p id="camera-status" role="status" aria-live="polite">
          Camera is off.
        </p>
      </section>

      <section aria-labelledby="clipboard-heading">
        <h2 id="clipboard-heading">Copy text</h2>
        <label for="copy-text">Text to copy</label>
        <input
          id="copy-text"
          type="text"
          value="I chose when to use this browser feature."
          readonly
        >
        <button id="copy-button" type="button">Copy text</button>
        <p id="copy-status" role="status" aria-live="polite"></p>
      </section>

      <section aria-labelledby="orientation-heading">
        <h2 id="orientation-heading">Device orientation</h2>
        <p>
          Some devices and browsers do not provide orientation readings.
          Enable them only while you want to view them.
        </p>
        <button id="start-orientation-button" type="button">
          Enable orientation
        </button>
        <button id="stop-orientation-button" type="button" disabled>
          Stop orientation
        </button>
        <p id="orientation-status" role="status" aria-live="polite">
          Orientation is off.
        </p>
        <p id="orientation-reading">No orientation reading.</p>
      </section>
    </main>
  </body>
</html>
\`\`\`

### \`device-api-demo/app.js\`

\`\`\`js
"use strict";

const locationStatus = document.querySelector("#location-status");
const coordinatesOutput = document.querySelector("#coordinates");
const locateButton = document.querySelector("#locate-button");
const watchButton = document.querySelector("#watch-button");
const stopWatchButton = document.querySelector("#stop-watch-button");

const manualPlaceForm = document.querySelector("#manual-place-form");
const manualPlaceInput = document.querySelector("#manual-place");
const manualPlaceStatus = document.querySelector("#manual-place-status");

const includeMicrophone = document.querySelector("#include-microphone");
const startCameraButton = document.querySelector("#start-camera-button");
const stopCameraButton = document.querySelector("#stop-camera-button");
const cameraPreview = document.querySelector("#camera-preview");
const cameraStatus = document.querySelector("#camera-status");

const copyText = document.querySelector("#copy-text");
const copyButton = document.querySelector("#copy-button");
const copyStatus = document.querySelector("#copy-status");

const startOrientationButton = document.querySelector(
  "#start-orientation-button"
);
const stopOrientationButton = document.querySelector(
  "#stop-orientation-button"
);
const orientationStatus = document.querySelector("#orientation-status");
const orientationReading = document.querySelector("#orientation-reading");

let locationWatchId = null;
let mediaStream = null;
let orientationIsActive = false;

function showPosition(position) {
  const { latitude, longitude, accuracy } = position.coords;

  coordinatesOutput.textContent =
    \`Latitude: \${latitude.toFixed(5)}, \` +
    \`longitude: \${longitude.toFixed(5)}, \` +
    \`accuracy estimate: about \${Math.round(accuracy)} meters.\`;
}

function describeLocationError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "Location access was not granted. You can enter a place manually.";
    case error.POSITION_UNAVAILABLE:
      return "The browser could not determine a position. Try entering a place.";
    case error.TIMEOUT:
      return "The location request timed out. Try again or enter a place.";
    default:
      return "Location is unavailable. You can enter a place manually.";
  }
}

function handleLocationError(error, isWatching = false) {
  if (isWatching) {
    stopLocationWatch();
  }

  locationStatus.textContent = describeLocationError(error);
}

function requestLocationOnce() {
  if (!navigator.geolocation) {
    locationStatus.textContent =
      "Location is not supported here. You can enter a place manually.";
    return;
  }

  locationStatus.textContent = "Waiting for a location result.";

  navigator.geolocation.getCurrentPosition(
    (position) => {
      showPosition(position);
      locationStatus.textContent = "A location result was received.";
    },
    (error) => handleLocationError(error),
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}

function stopLocationWatch() {
  if (locationWatchId !== null) {
    navigator.geolocation.clearWatch(locationWatchId);
    locationWatchId = null;
  }

  watchButton.disabled = false;
  stopWatchButton.disabled = true;
  locationStatus.textContent = "Location watch stopped.";
}

function startLocationWatch() {
  if (!navigator.geolocation) {
    locationStatus.textContent =
      "Location is not supported here. You can enter a place manually.";
    return;
  }

  if (locationWatchId !== null) {
    return;
  }

  locationStatus.textContent = "Location watch is running.";
  watchButton.disabled = true;
  stopWatchButton.disabled = false;

  try {
    locationWatchId = navigator.geolocation.watchPosition(
      showPosition,
      (error) => handleLocationError(error, true),
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 60000
      }
    );
  } catch {
    locationWatchId = null;
    watchButton.disabled = false;
    stopWatchButton.disabled = true;
    locationStatus.textContent = "The browser could not start a location watch.";
  }
}

manualPlaceForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const place = manualPlaceInput.value.trim();
  if (!place) {
    manualPlaceStatus.textContent = "Enter a place name first.";
    return;
  }

  manualPlaceStatus.textContent = \`Place entered: \${place}\`;
});

locateButton.addEventListener("click", requestLocationOnce);
watchButton.addEventListener("click", startLocationWatch);
stopWatchButton.addEventListener("click", stopLocationWatch);

async function startCamera() {
  if (!navigator.mediaDevices?.getUserMedia) {
    cameraStatus.textContent =
      "Camera access is not available in this browser or page context.";
    return;
  }

  startCameraButton.disabled = true;
  cameraStatus.textContent = "Waiting for camera permission.";

  try {
    mediaStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: includeMicrophone.checked
    });

    cameraPreview.srcObject = mediaStream;
    stopCameraButton.disabled = false;
    cameraStatus.textContent = includeMicrophone.checked
      ? "Camera preview and microphone access are active."
      : "Camera preview is active. Microphone access was not requested.";
  } catch {
    mediaStream = null;
    startCameraButton.disabled = false;
    cameraStatus.textContent =
      "The camera could not start. Check permission, device availability, and page context.";
  }
}

function stopCamera() {
  if (mediaStream) {
    for (const track of mediaStream.getTracks()) {
      track.stop();
    }

    mediaStream = null;
  }

  cameraPreview.srcObject = null;
  startCameraButton.disabled = false;
  stopCameraButton.disabled = true;
  cameraStatus.textContent = "Camera and microphone access are off.";
}

startCameraButton.addEventListener("click", startCamera);
stopCameraButton.addEventListener("click", stopCamera);

async function copyTextToClipboard() {
  copyStatus.textContent = "";

  if (navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(copyText.value);
      copyStatus.textContent = "Text copied.";
      return;
    } catch {
      // Continue to the manual selection fallback.
    }
  }

  copyText.focus();
  copyText.select();
  copyStatus.textContent =
    "Automatic copy was unavailable. The text is selected; copy it from the field.";
}

copyButton.addEventListener("click", copyTextToClipboard);

function formatAngle(value) {
  return Number.isFinite(value) ? \`\${value.toFixed(1)}°\` : "not available";
}

function handleOrientation(event) {
  orientationReading.textContent =
    \`Alpha: \${formatAngle(event.alpha)}, \` +
    \`beta: \${formatAngle(event.beta)}, \` +
    \`gamma: \${formatAngle(event.gamma)}.\`;
}

function stopOrientation() {
  if (orientationIsActive) {
    window.removeEventListener("deviceorientation", handleOrientation);
    orientationIsActive = false;
  }

  startOrientationButton.disabled = false;
  stopOrientationButton.disabled = true;
  orientationStatus.textContent = "Orientation is off.";
  orientationReading.textContent = "No orientation reading.";
}

async function startOrientation() {
  if (!("DeviceOrientationEvent" in window)) {
    orientationStatus.textContent =
      "Device orientation is not supported in this browser.";
    return;
  }

  startOrientationButton.disabled = true;
  orientationStatus.textContent = "Checking orientation access.";

  try {
    if (
      typeof DeviceOrientationEvent.requestPermission === "function"
    ) {
      const permission = await DeviceOrientationEvent.requestPermission();

      if (permission !== "granted") {
        orientationStatus.textContent =
          "Orientation access was not granted.";
        startOrientationButton.disabled = false;
        return;
      }
    }

    window.addEventListener("deviceorientation", handleOrientation);
    orientationIsActive = true;
    stopOrientationButton.disabled = false;
    orientationStatus.textContent =
      "Orientation is active. Readings depend on browser and device support.";
  } catch {
    startOrientationButton.disabled = false;
    orientationStatus.textContent =
      "The browser could not enable orientation access.";
  }
}

startOrientationButton.addEventListener("click", startOrientation);
stopOrientationButton.addEventListener("click", stopOrientation);
\`\`\`

### \`device-api-demo/server.mjs\`

This tiny development server uses only Node.js built-in modules. It serves a fixed list of files, so a URL cannot request arbitrary files from the computer.

\`\`\`js
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";

const files = new Map([
  ["/", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/index.html", { name: "index.html", type: "text/html; charset=utf-8" }],
  ["/app.js", { name: "app.js", type: "text/javascript; charset=utf-8" }]
]);

const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, "http://localhost").pathname;
  const file = files.get(pathname);

  if (!file) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  try {
    const contents = await readFile(new URL(file.name, import.meta.url));

    response.writeHead(200, {
      "Content-Type": file.type,
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self'; style-src 'self'; " +
        "media-src 'self' blob:; object-src 'none'; base-uri 'none'; " +
        "frame-ancestors 'none'"
    });
    response.end(contents);
  } catch {
    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Could not read the demo file");
  }
});

server.listen(4173, "127.0.0.1", () => {
  console.log("Open http://localhost:4173");
});
\`\`\`

## Start the demo

Open a terminal in the folder that contains \`device-api-demo\`, then run:

\`\`\`sh
node device-api-demo/server.mjs
\`\`\`

Open \`http://localhost:4173\` in a browser. Localhost is suitable for this development demo. A deployed version should use HTTPS for device features that require a secure context.

## What to try

1. Select **Get my location once** and decide whether to grant the browser request.
2. Try **Start location watch**, then select **Stop location watch**. The watch is cleared when stopped.
3. Deny location or use a browser without location support, then enter a place manually.
4. Start the camera preview. Microphone permission is requested only if its checkbox is selected. Stop the preview when finished.
5. Select **Copy text**. If the clipboard API is unavailable or rejects the request, the text field is selected for manual copying.
6. Try orientation on a supported device. Stop it when you are done.

## Expected result

The page initially reports that each capability is inactive. Successful location access displays coordinates and an accuracy estimate. A location error provides a message and leaves the manual place form available. Camera and optional microphone access show a live preview only while active. Clipboard copying either reports success or selects the text. Orientation shows angle readings only on a device and browser that provide them.

Exact prompts and available APIs vary by browser, operating system, device, permissions, and embedding policy. A denied, unavailable, or unsupported feature is a normal outcome. The rest of the page remains usable.

## Why the example is structured this way

- Each sensitive capability starts in response to a clear user action.
- The location watch has a matching stop action that calls \`clearWatch()\`.
- The camera and optional microphone tracks are stopped with \`MediaStreamTrack.stop()\`.
- The orientation listener is removed when the user stops the feature.
- The clipboard action has a manual fallback.
- Readings are placed into text with \`textContent\`, not interpreted as HTML.
- The manual place field provides a route that does not request device location.
- No location, media, clipboard content, or orientation reading is stored or sent.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter lesson | Next chapter |
| --- | --- | --- | --- |
| [116 - WebSockets, Server-Sent Events, and real-time updates](../lessons/116-websockets-server-sent-events-and-real-time-updates.md) | [Open Q&A](../qnas/117-permissions-geolocation-and-device-apis.md) | [Open lesson](../lessons/117-permissions-geolocation-and-device-apis.md) | [118 - Accessibility, keyboard interaction, and dynamic content](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) |
