# Example 21 - Audio and video

## Question

Create a garden page with an audio player and a video player. Offer alternative media files, visible controls, fallback download links, English captions for the video, and readable transcripts for both recordings.

## HTML code

~~~html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Garden Audio and Video</title>
  </head>
  <body>
    <main>
      <h1>Visit the community garden</h1>

      <section>
        <h2>Listen to the garden introduction</h2>
        <audio controls>
          <source src="media/garden-intro.mp3" type="audio/mpeg">
          <source src="media/garden-intro.ogg" type="audio/ogg">
          <p>
            Your browser cannot play this audio.
            <a href="media/garden-intro.mp3">Download the MP3 audio</a>.
          </p>
        </audio>
        <p><a href="#audio-transcript">Read the audio transcript</a></p>
      </section>

      <section>
        <h2>Watch a short garden tour</h2>
        <video
          controls
          width="640"
          height="360"
          poster="images/garden-tour-poster.jpg">
          <source src="media/garden-tour.mp4" type="video/mp4">
          <source src="media/garden-tour.webm" type="video/webm">
          <track
            kind="captions"
            src="captions/garden-tour-en.vtt"
            srclang="en"
            label="English captions"
            default>
          <p>
            Your browser cannot play this video.
            <a href="media/garden-tour.mp4">Download the MP4 video</a>.
          </p>
        </video>
        <p><a href="#video-transcript">Read the video transcript</a></p>
      </section>

      <section id="audio-transcript">
        <h2>Audio transcript</h2>
        <p>[Birds chirp.]</p>
        <p>
          Maya: The garden opens at sunrise. Water the soil when its surface
          feels dry.
        </p>
      </section>

      <section id="video-transcript">
        <h2>Video transcript</h2>
        <p>[A gate opens.]</p>
        <p>Maya: Welcome to the community garden.</p>
        <p>
          [Maya points to the soil in a raised bed.]
          Well-drained soil lets extra water drain away.
        </p>
      </section>
    </main>
  </body>
</html>
~~~

Save this text as captions/garden-tour-en.vtt:

~~~vtt
WEBVTT

00:00:00.000 --> 00:00:02.000
[Gate opens.]

00:00:02.000 --> 00:00:05.000
Maya: Welcome to the community garden.

00:00:05.000 --> 00:00:08.000
[Maya points to the soil in a raised bed.]
Well-drained soil lets extra water drain away.
~~~

## Expected output

The page displays an audio player with browser controls and a video player with controls and a poster image. If the media files are available and supported, visitors can play either recording. The video player offers English captions, and transcript links jump to readable text on the page.

If a browser cannot use one of the media elements, its fallback paragraph includes a download link. The WebVTT file supplies timed captions for the video. Replace the sample timestamps with timings that match the actual recording.

## Explanation

- The audio and video elements embed media. Their controls attributes provide the browser's playback interface.
- Each player has two source elements with type values. The browser can choose a supported file. The file paths must point to actual media files.
- The fallback paragraphs are for browsers that do not support the media element. The transcript sections remain available to readers using supported browsers too.
- The video track follows the source elements. Its kind identifies captions, srclang gives their language, label names the track, and default requests that it be enabled initially when appropriate.
- The WebVTT file starts with WEBVTT and contains timed cues. Review the words, timing, speaker names, and meaningful sounds against the video.
- The video transcript includes both speech and an important visual action. Captions are synchronized with playback; a transcript can also describe relevant visuals.
- The players do not use autoplay, so playback does not start unexpectedly.

## How to try it

Copy the HTML code block using its copy button and save it as garden-media.html. Create the media, images, and captions folders beside it, add matching media files and the WebVTT file, then open the page in a browser. Adjust the caption timestamps to match the video and read both transcripts to confirm they match the recordings.

This Markdown file displays the code as text. It does not execute the HTML.

## Related lesson

[Read lesson 21 - Audio and video](../lessons/21-audio-and-video.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter Q&A | Next chapter |
| :--- | --- | --- | ---: |
| [20 - Figures and captions](20-figures-and-captions.md) | [Lesson](../lessons/21-audio-and-video.md) | [Q&A](../qnas/21-audio-and-video.md) | [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) |
