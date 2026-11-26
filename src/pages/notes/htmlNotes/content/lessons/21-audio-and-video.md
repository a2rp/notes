# 21 - Audio and video

HTML can place media players directly in a page. The &lt;audio&gt; element plays audio, and the &lt;video&gt; element plays video, with or without an audio track. Add controls so visitors can start, pause, seek, and adjust playback. For videos, provide captions when speech or meaningful sounds carry information.

## What you will learn

- How to add audio and video with native HTML elements.
- How controls, source, and track work together.
- How to offer multiple media files.
- How captions and subtitles use WebVTT text tracks.
- Why media needs useful text alternatives such as transcripts.
- How to add fallback content and avoid disruptive autoplay.

## Add an audio player

Use audio for sound without a visual playback area. The controls attribute asks the browser to show its playback interface.

~~~html
<audio controls>
  <source src="audio/welcome.mp3" type="audio/mpeg">
  <p>
    Your browser cannot play this audio.
    <a href="audio/welcome.mp3">Download the audio file</a>.
  </p>
</audio>

<p><a href="transcripts/welcome.html">Read the audio transcript</a></p>
~~~

The paragraph inside audio is fallback content for browsers that do not support the element. The transcript link is outside the player so visitors can find it while using a supported browser too.

## Add a video player

Use video when the content has a visual track. Add controls and, when useful, a poster image that represents the video before playback begins.

~~~html
<video
  controls
  width="640"
  height="360"
  poster="images/workshop-poster.jpg">
  <source src="video/workshop.mp4" type="video/mp4">
  <p>
    Your browser cannot play this video.
    <a href="video/workshop.mp4">Download the video file</a>.
  </p>
</video>
~~~

The width and height attributes provide the video playback area's dimensions. The poster attribute points to a preview image. A poster does not replace the video or its captions.

## Offer more than one media file

Different browsers and devices may support different media formats. Place source elements inside audio or video to give the browser alternatives. Add a type value so it can identify a format before trying to play it.

~~~html
<audio controls>
  <source src="audio/interview.mp3" type="audio/mpeg">
  <source src="audio/interview.ogg" type="audio/ogg">
  <p>
    Your browser cannot play this audio.
    <a href="audio/interview.mp3">Download the MP3 file</a>.
  </p>
</audio>
~~~

The browser can choose a source it supports. The file extension alone does not guarantee that a browser can decode the media. The encoding inside the file also matters.

A media element can also use a src attribute directly when only one media file is needed:

~~~html
<video controls src="video/demo.mp4">
  <p>Your browser cannot play this video.</p>
</video>
~~~

Use either a direct src or one or more source elements. When using source children, put them before any track elements.

## Add captions and subtitles

Captions show synchronized text for speech and meaningful sounds in a video. They can identify speakers and include sound cues such as music or a door closing. Subtitles commonly show dialogue in another language. The track element connects a text track file to a media player.

~~~html
<video controls>
  <source src="video/tour.mp4" type="video/mp4">
  <track
    kind="captions"
    src="captions/tour-en.vtt"
    srclang="en"
    label="English captions"
    default>
</video>
~~~

The track element belongs after source elements. The kind attribute says what the text track contains. The srclang value identifies its language. The label helps visitors choose the track, and default marks a track to be enabled by default when appropriate.

A WebVTT file is a plain text file with a WEBVTT header, timestamps, and cue text:

~~~vtt
WEBVTT

00:00:00.000 --> 00:00:02.500
[Door opens]

00:00:02.500 --> 00:00:05.000
Maya: Welcome to the museum.
~~~

Save the file with a .vtt extension and make the src point to its location. Check the captions for correct words, timing, speaker names, and meaningful non-speech sounds. Automatically generated captions need review and correction.

## Provide a transcript

A transcript is a readable text version of the media information. Put a link to it near the player or include it on the same page. For audio, a transcript can provide the spoken words and important sounds. For video, a descriptive transcript can also explain important visual information.

~~~html
<video controls>
  <source src="video/field-trip.mp4" type="video/mp4">
  <track
    kind="captions"
    src="captions/field-trip-en.vtt"
    srclang="en"
    label="English captions">
</video>

<p>
  <a href="transcripts/field-trip.html">
    Read the transcript with descriptions of the video
  </a>
</p>
~~~

Captions and transcripts are different. Captions appear in sync with playback. A transcript can be read independently and can include visual descriptions that are not present in the audio.

## Useful media attributes

- controls shows the browser's playback controls. Include it for a usable player.
- src points to a media file when the element uses one direct source.
- poster gives a video a preview image before playback.
- muted starts playback without sound when the attribute is present.
- loop repeats media after it reaches the end.
- preload is a hint about how much media data the browser should load before playback. Values include none, metadata, and auto. The browser may use its own judgment.
- width and height set the video playback area's dimensions.
- autoplay requests automatic playback. Avoid it for most content because unexpected sound or movement can interrupt visitors.

Boolean attributes such as controls, muted, and loop are enabled by their presence. For example, muted="false" still means muted is present and enabled. To turn a boolean attribute off, remove it.

## Common mistakes

- Leaving out controls, so visitors have no visible way to control playback.
- Using autoplay for media that starts unexpectedly.
- Assuming every browser supports every audio or video encoding.
- Placing track before source in a media element that has both.
- Providing subtitles that omit meaningful sounds when captions are needed.
- Publishing auto-generated captions without checking their accuracy.
- Assuming captions replace a transcript or a description of important visual information.
- Making a transcript difficult to find.
- Using fallback content as the only alternative; fallback text is mainly for unsupported media elements.

## Try it yourself

1. Add an audio player with controls and a visible link to its transcript.
2. Add a video player with controls, dimensions, and a poster image.
3. Offer two video sources with accurate type values.
4. Add an English captions track with a WebVTT file.
5. Write two WebVTT cues with timestamps, a speaker name, and an important sound.
6. Add a transcript link near a video player and include a short description of an important visual action.
7. Remove controls from a player and consider how a visitor would start or pause it. Add controls again.
8. Check captions for spelling, speaker identification, timing, and meaningful sounds.

## Key points

- Audio and video embed media in a page; controls provides the native playback interface.
- Source elements offer alternate media files, and type helps the browser identify each format.
- Track connects timed text such as captions or subtitles to a media element.
- Captions include speech and meaningful audio cues; subtitles commonly provide translated dialogue.
- A nearby transcript makes media information available in a readable form.
- Check captions for accuracy and avoid unexpected autoplay.

### Chapter navigation

| Previous chapter | Chapter Q&A | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [20 - Figures and captions](20-figures-and-captions.md) | [Q&A](../qnas/21-audio-and-video.md) | [Example](../examples/21-audio-and-video.md) | [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) |
