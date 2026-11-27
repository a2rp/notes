# 117 - Permissions, geolocation, and device APIs

Browsers expose capabilities that can reveal sensitive data or use hardware. Examples include location, camera, microphone, clipboard contents, and device motion. These APIs let a page do useful work, but access is controlled by the browser and often depends on a user's choice, a secure context, the page's origin, and browser support.

A permission is not a promise that a feature will work. A user can deny access, revoke it later, or have the feature blocked by browser settings or an embedding policy. Build a useful path through the interface even when access is unavailable.

## Learning goals

After this lesson, you should be able to:

- feature-detect browser capabilities before using them;
- distinguish checking a permission from asking for access;
- request access at an appropriate moment and handle every result;
- get a position once or watch and clear changing positions;
- start and stop media tracks and other ongoing device work;
- use clipboard and orientation APIs with appropriate safeguards;
- protect sensitive data and offer alternatives when a capability is unavailable.

## A permission is a user-controlled capability

Location, camera, microphone, clipboard, and motion data can reveal information about a person or their surroundings. Browsers place limits on these capabilities. Depending on the API and browser, use can depend on:

- a **secure context**, usually HTTPS for a deployed site; localhost is commonly treated as trustworthy for development;
- the page's origin and browser privacy settings;
- the user granting, denying, or dismissing a request;
- whether an embedded page is allowed by the document's Permissions Policy;
- feature support and hardware availability.

Check for the API before calling it. A permission query can tell you about a browser-reported permission state, but it does not request access and does not guarantee the operation will succeed. Some permission descriptors are unsupported, so the query can reject.

```js
async function readGeolocationPermission() {
  if (!navigator.permissions?.query) {
    return "unknown";
  }

  try {
    const status = await navigator.permissions.query({ name: "geolocation" });
    return status.state;
  } catch {
    return "unknown";
  }
}
```

Common states are:

| State | Meaning for the page |
| --- | --- |
| `granted` | The browser currently allows the feature for this context. The operation can still fail for another reason. |
| `denied` | The browser currently blocks the feature. Explain how to continue without it. |
| `prompt` | The browser may ask the user when the feature is requested. It may also apply browser-specific rules. |

A query does not make a prompt appear. Call the feature API when the user understands why the page needs it, then handle the resulting success or error. Permission state can change while the page is open. Where supported, `PermissionStatus` can notify the page of that change:

```js
const status = await navigator.permissions.query({ name: "geolocation" });
status.addEventListener("change", () => {
  console.log("Permission state is now:", status.state);
});
```

Remove listeners and close resources when their owning interface is no longer active. Do not prompt on page load just to see what the user will choose.

## Geolocation

The Geolocation API can return an estimated position or watch for changes. It does not expose a raw GPS device. The browser and operating system may use GPS, nearby networks, IP-derived estimates, or other sources. Coordinates include an accuracy estimate and can be imprecise or stale.

### Request one position

The user should take an action that makes the reason for the request clear, such as selecting **Use my location**. Then call `getCurrentPosition()` and handle both callbacks:

```js
function requestPosition() {
  if (!navigator.geolocation) {
    showMessage("Location is unavailable in this browser. Enter a place instead.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      showMessage(
        `Position received with an accuracy estimate of about ${Math.round(accuracy)} meters.`
      );
      useCoordinates({ latitude, longitude });
    },
    (error) => {
      showMessage(describeLocationError(error));
    },
    {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 60000
    }
  );
}
```

`maximumAge` controls how old a cached position may be. `timeout` limits how long the request waits. `enableHighAccuracy` is a request to try for higher accuracy, not a guarantee. Higher accuracy can take longer or use more power.

A successful callback includes a `GeolocationPosition`. Its `coords` include latitude, longitude, accuracy, and sometimes altitude, heading, and speed. Optional values may be `null`. `timestamp` indicates when the reported position was acquired, not when the page received it.

### Handle errors

The error callback receives a `GeolocationPositionError`:

| Code | Constant | Possible response |
| --- | --- | --- |
| `1` | `PERMISSION_DENIED` | Explain the feature and offer manual entry or settings guidance. |
| `2` | `POSITION_UNAVAILABLE` | Say that a position could not be determined and offer another route. |
| `3` | `TIMEOUT` | Let the user try again or enter a place manually. |

A permission denial is not the only failure. Avoid displaying a raw browser error string as the entire user experience. Give the user a useful next step without implying that location is required when it is optional.

### Watch changing positions

`watchPosition()` repeatedly reports updates until it is stopped with `clearWatch()`:

```js
const watchId = navigator.geolocation.watchPosition(
  (position) => {
    updateMap(position.coords.latitude, position.coords.longitude);
  },
  (error) => {
    showMessage(describeLocationError(error));
  },
  { enableHighAccuracy: false, timeout: 10000, maximumAge: 5000 }
);

// When live location is no longer needed:
navigator.geolocation.clearWatch(watchId);
```

Store the watch ID with the view or feature that created it. Clear it when the user stops sharing location, navigates away from the live view, or the component is removed. Do not keep tracking in the background unless the product genuinely needs it and the user has clearly chosen that behavior.

## Camera and microphone

`navigator.mediaDevices.getUserMedia()` requests a media stream. Constraints describe what the page can use, while the browser and user select the actual device and settings:

```js
async function startCamera(videoElement) {
  if (!navigator.mediaDevices?.getUserMedia) {
    showMessage("Camera access is unavailable here.");
    return null;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: true
    });
    videoElement.srcObject = stream;
    return stream;
  } catch (error) {
    showMessage("Camera access was not available. You can continue without a preview.");
    return null;
  }
}
```

The user can deny access, have no matching device, or encounter a device or system error. Treat a rejected promise as a normal outcome. Do not infer the exact reason unless the error type gives enough reliable information to explain it.

Stop every track when the preview or call ends:

```js
function stopMedia(stream, videoElement) {
  if (!stream) {
    return;
  }

  for (const track of stream.getTracks()) {
    track.stop();
  }

  videoElement.srcObject = null;
}
```

Stopping the tracks releases the page's use of those media sources. Also remove event listeners and clear references when the feature is closed. A permission grant does not mean the page should keep the microphone or camera active when the user is no longer using it.

## Clipboard

The asynchronous Clipboard API can read or write clipboard data. Clipboard access is powerful because it may expose information copied from another application. Browsers restrict it based on context, permissions, and user activation.

A common use is writing text after a user presses a copy button:

```js
copyButton.addEventListener("click", async () => {
  if (!navigator.clipboard?.writeText) {
    showMessage("Clipboard writing is not available. Select and copy the text instead.");
    return;
  }

  try {
    await navigator.clipboard.writeText(textToCopy);
    showMessage("Copied.");
  } catch {
    showMessage("The browser did not allow clipboard access. Select and copy the text instead.");
  }
});
```

Clipboard reads should be especially clear to the user. Read only when needed, handle rejection, and do not transmit copied data elsewhere without an explicit, understandable action. Support differs among browsers and contexts, so keep a manual path available.

## Device orientation and motion

Some devices expose orientation and motion events. These can reveal how a device is being held or moved and may be subject to secure-context requirements, permission prompts, or browser-specific behavior. Do not assume a phone has these APIs or that a laptop can provide meaningful readings.

Where a browser exposes a permission request method, call it in a direct response to a user gesture and handle its result:

```js
async function requestOrientationAccess() {
  if (typeof DeviceOrientationEvent === "undefined") {
    showMessage("Device orientation is not available here.");
    return false;
  }

  if (typeof DeviceOrientationEvent.requestPermission === "function") {
    try {
      const result = await DeviceOrientationEvent.requestPermission();
      if (result !== "granted") {
        showMessage("Orientation access was not granted.");
        return false;
      }
    } catch {
      showMessage("The browser could not enable orientation access.");
      return false;
    }
  }

  window.addEventListener("deviceorientation", handleOrientation);
  return true;
}
```

The example feature-detects `requestPermission()` because the API is not exposed in the same way everywhere. A successful permission step does not guarantee meaningful events. Remove the event listener when the feature is turned off. Avoid collecting motion data continuously when a one-time reading or no reading is sufficient.

## Permissions Policy and embedded pages

A top-level page can restrict whether embedded content may use certain powerful features. For example, an iframe's `allow` attribute and the response's Permissions Policy can limit access. The embedded page can still be denied by the user or browser. A Permissions Policy grant is not user consent, and a user grant cannot override a policy that blocks the feature.

When a feature fails inside an iframe, check the embedding policy as well as permission state and API support. If you control both pages, configure the smallest policy that allows the required feature. Do not grant device access broadly to every embedded origin.

## Privacy, security, and accessible interaction

Use these APIs with data minimization and a clear user choice:

- Explain the feature and why it needs location, camera, microphone, clipboard, or motion access before asking.
- Ask only when the user starts the related task, not immediately on page load.
- Use the least precise or least broad access that works. Request high-accuracy location only when it changes the result.
- Provide a manual or non-device alternative when practical.
- Do not keep location or media active after the feature ends.
- Do not log or send sensitive readings unless the user expects that use and the server needs the data.
- Treat browser-provided values as untrusted input. Validate data on the server if it is sent there.
- Show permission and device failures in text, not only through color or an icon.
- Put focus and error guidance in a sensible place, and do not repeatedly announce high-frequency readings to assistive technology.

Permission state is controlled by both browser behavior and user settings. A page should adapt if access changes rather than treating a prior grant as permanent.

## A useful feature-detection pattern

Check the relevant method and still handle failures. Feature detection says that an API surface exists; it does not prove that hardware is present or that a request will be accepted.

```js
function canRequestLocation() {
  return "geolocation" in navigator;
}

async function copyText(text) {
  if (!navigator.clipboard?.writeText) {
    return false;
  }

  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
```

Avoid user-agent sniffing when capability detection is enough. If a feature is central, test on the actual browsers and devices your users rely on, and document unsupported cases.

## Common mistakes

- Treating a permission query as a way to show the prompt.
- Asking for access before the user understands the benefit.
- Assuming a `granted` state guarantees hardware availability or a successful operation.
- Treating a denied permission as an application error with no recovery path.
- Starting a location watch or camera stream and forgetting to stop it.
- Assuming high-accuracy location is exact or always available.
- Assuming all browsers expose the same permission descriptors or device APIs.
- Reading the clipboard without an explicit user action or explanation.
- Assuming an iframe can use an API just because the user granted permission.
- Keeping or transmitting sensitive readings beyond the feature that needs them.
- Using device data to infer more about a person than the user agreed to share.

## Key points

- Permission queries observe state; they do not grant access or guarantee success.
- Request powerful capabilities when the user starts a related feature, and explain the reason.
- Geolocation supports one-time reads and ongoing watches. Clear every watch when finished.
- Stop camera and microphone tracks when the user is done.
- Clipboard and motion APIs have context, permission, and support constraints.
- Permissions Policy can restrict embedded pages independently of user permission.
- Always handle unsupported, denied, unavailable, and failed cases with a useful alternative.

## Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [116 - WebSockets, Server-Sent Events, and real-time updates](116-websockets-server-sent-events-and-real-time-updates.md) | [Open Q&A](../qnas/117-permissions-geolocation-and-device-apis.md) | [Open example](../examples/117-permissions-geolocation-and-device-apis.md) | [118 - Accessibility, keyboard interaction, and dynamic content](118-accessibility-keyboard-interaction-and-dynamic-content.md) |
