# ANIME / DAR

ANIME / DAR is a cinematic anime archive landing page built with HTML, CSS, and vanilla JavaScript. It combines parallax imagery, a scroll-controlled YouTube motion section, and a frame-by-frame anime sequence.

## Features

- Full-screen hero section with parallax artwork
- Introductory collection text and archive navigation
- Scroll-controlled anime frame animation using 289 WebP frames
- Scroll-controlled YouTube video section
- Responsive layout for desktop and mobile screens
- No build tools or framework required

## Run locally

Open `index.html` with a local web server so the frame assets and YouTube API load correctly.

For example:

```bash
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Project files

- `index.html` - Main page structure and content
- `styles.css` - Main page styling
- `script.js` - YouTube video and parallax behavior
- `script2.js` - Frame preloading and scroll playback
- `frames/` - WebP animation frames
- `aime Frames.html` - Standalone frame animation page

## Replacing the frame animation

Place numbered WebP files in `frames/` using the format `f001.webp`, `f002.webp`, and so on. Update `FRAME_COUNT` and `DURATION` at the top of `script2.js` to match the new sequence.
