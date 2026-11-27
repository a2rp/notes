# 06. Audio, video, and embedded content

[Back to notes index](../README.md)

| Previous | Notes index | Next |
| --- | --- | --- |
| [Previous: Images, figures, and responsive sources](./05-images-figures-and-responsive-sources.md) | [Notes index](../README.md) | [Next: Tables and accessible data](./07-tables-and-accessible-data.md) |

## Add audio with native controls

The audio element can play a sound file with controls supplied by the browser.

~~~html
<audio controls preload="metadata">
  <source src="./media/field-recording.mp3" type="audio/mpeg" />
  <source src="./media/field-recording.ogg" type="audio/ogg" />
  <p>
    Your browser cannot play this audio.
    <a href="./media/field-recording.mp3">Download the recording</a>.
  </p>
</audio>
~~~

The browser tries supported source elements in order. controls gives users play, pause, and volume controls. preload="metadata" asks the browser to load basic file information without fetching the entire media before the user starts playback.

## Add video with captions

Provide controls and a track with captions when the video contains speech or meaningful sounds.

~~~html
<video controls preload="metadata" width="960" poster="./images/field-poster.jpg">
  <source src="./media/field-guide.mp4" type="video/mp4" />
  <track
    kind="captions"
    src="./media/field-guide-en.vtt"
    srclang="en"
    label="English captions"
    default
  />
  <p>
    Your browser cannot play this video.
    <a href="./media/field-guide.mp4">Download the video</a>.
  </p>
</video>
~~~

Captions include spoken dialogue and relevant sound information. Subtitles commonly translate dialogue into another language. Choose the text track type that matches the audience need and provide a valid WebVTT file.

## Choose loading and playback behavior deliberately

Avoid autoplaying audio. Unexpected sound can interrupt the user. If a video must start automatically for a clear reason, browsers commonly require it to be muted, and it should still have controls or another way to stop it.

Use loading="lazy" on an iframe that is below the initial viewport. Do not delay media that is central to the page before the user can find it.

## Give embedded frames a title

An iframe embeds another document. Give it a concise title that describes its content.

~~~html
<iframe
  src="https://example.com/map"
  title="Map showing the garden entrance"
  width="600"
  height="400"
  loading="lazy"
></iframe>
~~~

Only embed content from a source the page is allowed to load. An iframe can have security and privacy implications, so use sandbox and permissions deliberately when the embedded service supports them.

## Practice questions

1. Which element plays audio?
2. What does controls provide?
3. How does the browser use multiple source elements?
4. What does preload="metadata" request?
5. What kind of information belongs in captions?
6. What does the track element add to video?
7. Why should unexpected audio autoplay be avoided?
8. Why does an iframe need a title?

## Main references

- [Audio and video content](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Structuring_content/HTML_video_and_audio)
- [The audio element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/audio)
- [The video element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/video)
- [The track element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/track)
- [The iframe element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/iframe)