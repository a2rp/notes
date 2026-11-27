# 117 - Permissions, geolocation, and device APIs: Q&A

Review the difference between permission state and API success, then practice handling location, media, clipboard, and motion capabilities. Each answer follows its question.

## Multiple-choice questions

### 1. What does `navigator.permissions.query()` do?

A. It grants access to the feature.  
B. It shows the browser permission prompt.  
C. It reports a browser permission state when the descriptor is supported.  
D. It checks whether the hardware is physically connected.

**Answer: C.**

**Explanation:** Querying observes permission state. It does not grant access or guarantee that the API operation will work.

### 2. When is a good time to request location access?

A. Immediately when the page loads  
B. After the user chooses a feature that needs location and understands why  
C. Every time the page renders  
D. Only after the user has left the page

**Answer: B.**

**Explanation:** A contextual request helps the user make an informed choice and avoids unnecessary prompts.

### 3. Which method requests one location reading?

A. `navigator.geolocation.getCurrentPosition()`  
B. `navigator.geolocation.watchPosition()`  
C. `navigator.position.read()`  
D. `navigator.location.get()`

**Answer: A.**

### 4. What does `watchPosition()` return?

A. A `MediaStream`  
B. A watch ID that can be passed to `clearWatch()`  
C. A permission state  
D. A `Promise` containing every future coordinate

**Answer: B.**

### 5. What does the `maximumAge` geolocation option control?

A. The maximum distance to travel  
B. How old a cached position may be and still be used  
C. The number of readings to collect  
D. The permission lifetime

**Answer: B.**

### 6. What does `enableHighAccuracy: true` mean?

A. The position is guaranteed to be exact.  
B. The browser is asked to try for higher accuracy, without a guarantee.  
C. The browser skips permission checks.  
D. The API continuously records location in the background.

**Answer: B.**

### 7. Which method requests camera or microphone media in the browser?

A. `navigator.mediaDevices.getUserMedia()`  
B. `navigator.camera.start()`  
C. `navigator.media.open()`  
D. `document.getMedia()`

**Answer: A.**

### 8. How should a page stop a camera stream when the preview ends?

A. Set `video.hidden = true` only.  
B. Call `stop()` on every stream track.  
C. Remove the `<video>` element only.  
D. Reload the page.

**Answer: B.**

### 9. Which API writes text to the system clipboard?

A. `navigator.clipboard.writeText()`  
B. `document.clipboard()`  
C. `window.copyText()`  
D. `navigator.copy()`

**Answer: A.**

### 10. What should the page do if `navigator.clipboard.writeText()` rejects?

A. Ignore the rejection and claim the text was copied.  
B. Show an error or a manual copy alternative.  
C. Retry forever.  
D. Assume the user's permission is permanently denied.

**Answer: B.**

### 11. What may be needed before listening for device orientation on some browsers?

A. Calling `DeviceOrientationEvent.requestPermission()` from a user gesture, if that method exists  
B. Calling `navigator.geolocation.watchPosition()`  
C. Adding a service worker  
D. Calling `window.location.reload()`

**Answer: A.**

**Explanation:** The method is not exposed identically everywhere, so feature-detect it and handle both permission and API failures.

### 12. What does a Permissions Policy do for an embedded page?

A. It records permanent user consent.  
B. It can restrict whether the embedded page may use a powerful feature.  
C. It makes every browser API available.  
D. It replaces authentication.

**Answer: B.**

## True or false

### 13. A permission state of `granted` guarantees that the requested device operation will succeed.

**Answer: False.**

**Explanation:** Hardware can be unavailable, the browser can still reject an operation, and other context or policy restrictions can apply.

### 14. Querying a permission is the same as requesting access to the feature.

**Answer: False.**

### 15. Every browser supports every permission descriptor passed to `navigator.permissions.query()`.

**Answer: False.**

**Explanation:** Unsupported descriptors can cause the query to reject. Handle that case.

### 16. A geolocation result always contains a non-null altitude, heading, and speed.

**Answer: False.**

**Explanation:** Optional coordinate values may be `null`.

### 17. A location's `accuracy` value is an estimate, not a promise of a precise position.

**Answer: True.**

### 18. A geolocation watch can be left active after a user leaves the feature because the browser always stops it automatically.

**Answer: False.**

**Explanation:** Store the watch ID and call `clearWatch()` when ongoing updates are no longer needed.

### 19. Hiding a camera preview stops its media tracks.

**Answer: False.**

**Explanation:** Stop every track explicitly with `track.stop()` and clear the element's `srcObject` when done.

### 20. A secure context and available API surface guarantee that a permission prompt will be accepted.

**Answer: False.**

**Explanation:** The user, browser settings, hardware, and embedding policy can still prevent access.

### 21. A Permissions Policy grant is the same as user consent.

**Answer: False.**

**Explanation:** Policy controls whether a page may request or use a capability. It does not override the user's choice.

### 22. Clipboard reads should be explained and performed only when useful to the user's task.

**Answer: True.**

**Explanation:** Clipboard contents may include data copied from outside the site.

### 23. Device orientation events are guaranteed on every browser and device.

**Answer: False.**

**Explanation:** Support and permission behavior vary. Feature-detect the API and provide an alternative.

### 24. A location, camera, or motion reading should be collected for longer than the related feature needs, just in case it becomes useful later.

**Answer: False.**

**Explanation:** Collect the least sensitive data for the shortest useful time.

## Short-answer questions

### 25. What are the common permission states exposed by the Permissions API?

**Answer:** `granted`, `denied`, and `prompt`.

**Explanation:** A state describes what the browser currently reports. It does not guarantee that the actual operation will succeed.

### 26. What is the difference between `getCurrentPosition()` and `watchPosition()`?

**Answer:** `getCurrentPosition()` requests one position. `watchPosition()` requests repeated updates and returns an ID that the page later passes to `clearWatch()`.

### 27. What are the three common geolocation error codes?

**Answer:** `1` is `PERMISSION_DENIED`, `2` is `POSITION_UNAVAILABLE`, and `3` is `TIMEOUT`.

### 28. Why should a geolocation feature offer manual entry or another alternative?

**Answer:** The API may be unsupported, denied, unavailable, or too slow. The user should still be able to complete the task when location is optional.

### 29. Why might an API exist in `navigator` but still fail when called?

**Answer:** The context may not be secure, permission may be denied, the device may be unavailable, a Permissions Policy may block it, or the operation may fail for another runtime reason.

### 30. What should a page do when a camera or microphone feature is no longer active?

**Answer:** Stop every media track, clear `video.srcObject` when applicable, remove listeners, and release references owned by the feature.

### 31. Why is a successful permission query not a replacement for handling API errors?

**Answer:** Permission can change, hardware can be missing, and the operation can fail for reasons other than permission. The API call still needs success and failure handling.

### 32. What does `PermissionStatus` let a page observe when supported?

**Answer:** It exposes the current state and can fire a `change` event when that state changes.

### 33. What does `maximumAge: 0` generally ask the geolocation API to do?

**Answer:** It does not accept an older cached position based on the caller's maximum-age setting. A new reading can still take time or fail.

### 34. Why should a page avoid reading clipboard contents without a clear user action?

**Answer:** The clipboard can contain sensitive text copied from another app. Reading it without a clear purpose can surprise the user and expose private information.

## Code and design questions

### 35. Complete the code so a geolocation watch is stopped.

```js
const watchId = navigator.geolocation.watchPosition(onSuccess, onError);

// Stop the watch.
```

**Answer:**

```js
navigator.geolocation.clearWatch(watchId);
```

### 36. Complete the cleanup so all tracks in a media stream are stopped.

```js
function stopStream(stream) {
  // Stop every track.
}
```

**Answer:**

```js
function stopStream(stream) {
  for (const track of stream.getTracks()) {
    track.stop();
  }
}
```

### 37. Write a feature check for the Geolocation API.

**Answer:**

```js
if ("geolocation" in navigator) {
  // The API surface exists. Still handle request success and failure.
} else {
  // Offer a non-location path.
}
```

### 38. A user presses a Copy button. Write code that tries to copy a string and reports success or failure.

**Answer:**

```js
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    showMessage("Copied.");
  } catch {
    showMessage("Clipboard access failed. Select and copy the text instead.");
  }
});
```

**Explanation:** A complete version should also feature-detect `navigator.clipboard?.writeText` before calling it.

### 39. An application needs a map centered near the user but can still work if location is unavailable. Describe an appropriate request and fallback.

**Answer:** Offer a clearly labeled **Use my location** action. Request one position with a reasonable timeout and cache age, explain failures in text, and let the user enter a place manually if the request fails or is denied.

### 40. An embedded map is denied location access even though the user allowed location on the top-level site. What else should the developer inspect?

**Answer:** Check whether the iframe and response Permissions Policy allow geolocation, whether the embedded origin is the expected one, and whether the API call itself reports another error.

**Explanation:** A parent page's permission grant does not automatically override policy restrictions on embedded content.

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| --- | --- | --- | --- |
| [116 - WebSockets, Server-Sent Events, and real-time updates](116-websockets-server-sent-events-and-real-time-updates.md) | [Open lesson](../lessons/117-permissions-geolocation-and-device-apis.md) | [Open example](../examples/117-permissions-geolocation-and-device-apis.md) | [118 - Accessibility, keyboard interaction, and dynamic content](../lessons/118-accessibility-keyboard-interaction-and-dynamic-content.md) |
