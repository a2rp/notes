# 21 - Audio and video: Questions and Answers

Practice questions for [Lesson 21 - Audio and video](../lessons/21-audio-and-video.md). Each question is followed by its answer and an explanation or worked example where useful.

## Multiple-choice questions

### 1. Which HTML element is used to play audio without a video playback area?

- A. sound
- B. audio
- C. source
- D. track

**Answer: B.** The audio element embeds an audio player in the page.

### 2. Which attribute asks the browser to display playback controls?

- A. controls
- B. buttons
- C. player
- D. visible

**Answer: A.** Add controls so visitors can start, pause, seek, and adjust playback.

### 3. What does the src value on a source element identify?

- A. The media file location.
- B. The caption text.
- C. The media's width.
- D. The player's language.

**Answer: A.** The src attribute points to the audio or video resource.

### 4. Why can a source element include a type attribute?

- A. It gives the browser a media type hint before it tries the file.
- B. It turns the file into a different format.
- C. It displays a caption.
- D. It adds playback controls.

**Answer: A.** A media type helps the browser determine whether it can play that source.

### 5. Which video attribute points to a preview image shown before playback?

- A. preview
- B. thumbnail
- C. poster
- D. cover

**Answer: C.** The poster attribute provides an image for the video before video data is available.

### 6. Which track kind is suitable for synchronized text that includes dialogue and important sounds?

- A. captions
- B. poster
- C. source
- D. preview

**Answer: A.** Captions include speech and meaningful audio information such as sound effects or music cues.

### 7. What is a WebVTT caption file's usual extension?

- A. .html
- B. .mp3
- C. .vtt
- D. .jpg

**Answer: C.** WebVTT text track files commonly use the .vtt extension and include a WEBVTT header and timed cues.

### 8. Where should a transcript link usually appear?

- A. Near the related media player.
- B. Only in the browser address bar.
- C. Inside the media file name.
- D. As the value of poster.

**Answer: A.** Placing a transcript link near the player makes the text alternative easy to find.

### 9. What happens with the boolean attribute muted="false"?

- A. Muted is off because its value is false.
- B. Muted is on because the attribute is present.
- C. The media is deleted.
- D. The browser shows captions.

**Answer: B.** Boolean attributes are enabled by their presence. Remove muted to turn it off.

### 10. What does preload="metadata" guarantee?

- A. That the entire file downloads before playback.
- B. That no data will load.
- C. It is a loading hint and does not guarantee a particular browser behavior.
- D. That autoplay will be enabled.

**Answer: C.** Preload is a hint. The browser can use its own judgment.

## True or false

### 1. Audio is useful for media that has sound but no visual playback area.

**Answer: True.** Use audio for sound-only playback.

### 2. A video element can play a file that also contains audio.

**Answer: True.** Video can include visual and audio tracks.

### 3. Playback controls appear automatically on every audio and video player.

**Answer: False.** Add the controls attribute to request the browser's native playback controls.

### 4. Multiple source elements can offer alternative media files.

**Answer: True.** A browser can choose a source it supports.

### 5. A type attribute converts a media file into a browser-supported format.

**Answer: False.** Type helps identify the media type. It does not convert the file.

### 6. The poster attribute is used on video to provide a preview image.

**Answer: True.** It gives the browser an image to show before video data is available.

### 7. A transcript and synchronized captions are exactly the same thing.

**Answer: False.** Captions appear in sync with playback. A transcript can be read independently and may include visual descriptions.

### 8. The track element should follow source elements when both are children of a media element.

**Answer: True.** Put source elements before track elements.

### 9. Automatically generated captions should be checked for errors.

**Answer: True.** Review words, speaker names, timing, and meaningful sounds.

### 10. The presence of muted="false" turns the muted boolean attribute off.

**Answer: False.** The attribute is still present and therefore enabled. Remove it to turn muted off.

## Fill in the blanks

### 1. The HTML element for sound-only playback is ______.

**Answer: audio.**

### 2. The HTML element for a video playback area is ______.

**Answer: video.**

### 3. Add the ______ attribute to request a native playback interface.

**Answer: controls.**

### 4. The ______ element can provide alternative media files inside an audio or video player.

**Answer: source.**

### 5. The ______ attribute on a source can tell the browser the media type.

**Answer: type.**

### 6. The ______ element connects a timed text file, such as captions, to a media element.

**Answer: track.**

### 7. The ______ attribute provides a video preview image.

**Answer: poster.**

### 8. A WebVTT file commonly uses the ______ extension.

**Answer: .vtt.**

## Short-answer questions

### 1. What is the purpose of the controls attribute?

**Answer:** It asks the browser to show playback controls, such as play, pause, seeking, and volume controls.

### 2. Why might a page include more than one source element?

**Answer:** Different browsers or devices may support different media formats. Multiple sources give the browser alternatives to try.

### 3. What does the type attribute on source do?

**Answer:** It identifies the media type as a hint so the browser can decide whether it can play that source. It does not convert the file.

### 4. What information should captions for a video include?

**Answer:** Captions should include the speech and other meaningful audio information, such as speaker identification when needed and important sounds or music cues.

### 5. How are captions different from subtitles?

**Answer:** Captions include spoken words and relevant non-speech sounds. Subtitles commonly present dialogue in another language. The terms can vary by region and context.

### 6. How is a transcript different from captions?

**Answer:** Captions are synchronized with media playback. A transcript is readable text that can be consumed independently, and a video transcript may include descriptions of important visuals.

### 7. What does preload do?

**Answer:** It provides a hint about how much media data to load before playback. Values include none, metadata, and auto, but the browser may use its own judgment.

### 8. Why is unexpected autoplay usually a poor choice?

**Answer:** It can interrupt visitors, create unwanted sound or movement, and make the page harder to use. Give visitors control over playback.

## Practical coding questions

### 1. Add an audio player with controls and a nearby transcript link.

**Answer:**

~~~html
<audio controls>
  <source src="audio/interview.mp3" type="audio/mpeg">
  <p>Your browser cannot play this audio.</p>
</audio>

<p><a href="transcripts/interview.html">Read the transcript</a></p>
~~~

Controls makes the player usable, and the transcript is easy to find near it.

### 2. Add a video player with controls, dimensions, and a poster image.

**Answer:**

~~~html
<video
  controls
  width="640"
  height="360"
  poster="images/lesson-preview.jpg">
  <source src="video/lesson.mp4" type="video/mp4">
  <p>Your browser cannot play this video.</p>
</video>
~~~

The poster image previews the video. The paragraph provides fallback content.

### 3. Offer two audio sources and include a download fallback.

**Answer:**

~~~html
<audio controls>
  <source src="audio/story.mp3" type="audio/mpeg">
  <source src="audio/story.ogg" type="audio/ogg">
  <p>
    Your browser cannot play this audio.
    <a href="audio/story.mp3">Download the MP3 file</a>.
  </p>
</audio>
~~~

The browser can select a source it supports. Type values identify each source format.

### 4. Add an English captions track to a video.

**Answer:**

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

The track follows the source. The language and label identify the captions for the browser and its users.

### 5. Fix the order of the elements in this media player.

~~~html
<video controls>
  <track kind="captions" src="captions/film-en.vtt" srclang="en" label="English">
  <source src="video/film.mp4" type="video/mp4">
</video>
~~~

**Answer:**

~~~html
<video controls>
  <source src="video/film.mp4" type="video/mp4">
  <track kind="captions" src="captions/film-en.vtt" srclang="en" label="English">
</video>
~~~

Put source elements before track elements.

### 6. Write two WebVTT cues: one important sound and one spoken line.

**Answer:**

~~~vtt
WEBVTT

00:00:00.000 --> 00:00:02.000
[Phone rings]

00:00:02.000 --> 00:00:04.000
Ravi: Hello, this is the help desk.
~~~

Each cue has a start time, an end time, and text. The file begins with the WEBVTT header.

### 7. Add a link near a video to a transcript that also describes important visual information.

**Answer:**

~~~html
<video controls>
  <source src="video/planting.mp4" type="video/mp4">
  <track
    kind="captions"
    src="captions/planting-en.vtt"
    srclang="en"
    label="English captions">
</video>

<p>
  <a href="transcripts/planting.html">
    Read the transcript with visual descriptions
  </a>
</p>
~~~

Captions provide synchronized audio text. The transcript can also explain important visuals.

### 8. Fix this boolean attribute so the video is not muted.

~~~html
<video controls muted="false" src="video/clip.mp4"></video>
~~~

**Answer:**

~~~html
<video controls src="video/clip.mp4"></video>
~~~

Boolean attributes are enabled when present. Remove muted instead of setting it to false.

## Related lesson

- [Lesson 21 - Audio and video](../lessons/21-audio-and-video.md)

## Chapter navigation

| Previous chapter | Chapter lesson | Chapter example | Next chapter |
| :--- | --- | --- | ---: |
| [20 - Figures and captions](20-figures-and-captions.md) | [Lesson](../lessons/21-audio-and-video.md) | [Example](../examples/21-audio-and-video.md) | [22 - The iframe element and embedded pages](22-iframes-and-embedded-pages.md) |
