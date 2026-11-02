Run: open index.html with a local server (e.g. VS Code Live Server, or `python3 -m http.server`).

Use your own video:
  mkdir frames
  ffmpeg -i your_video.mp4 -vf scale=896:-2 -c:v libwebp -quality 42 frames/f%03d.webp
Then set FRAME_COUNT (number of files) and DURATION (seconds) at the top of script.js.

Scroll length: change #track height in style.css (700vh).
