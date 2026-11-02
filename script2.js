const FRAME_COUNT = 289;      // number of files in /frames
const DURATION = 12.04;       // video length in seconds
const frameUrl = i => `frames/f${String(i + 1).padStart(3, "0")}.webp`;

const track = document.querySelector(".frame-track") || document.getElementById("track");
const canvas = document.getElementById("frame-canvas") || document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const loader = document.getElementById("frame-loader") || document.getElementById("loader");
const percentage = document.getElementById("frame-pct") || document.getElementById("pct");
const fill = document.getElementById("frame-fill") || document.getElementById("fill");
const hint = document.getElementById("frame-hint") || document.getElementById("hint");
const time = document.getElementById("frame-time") || document.getElementById("time");
const images = [];
let loaded = 0, current = 0, target = 0, lastDrawn = -1;

// 1. Preload every frame
for (let i = 0; i < FRAME_COUNT; i++) {
  const img = new Image();
  img.src = frameUrl(i);
  img.onload = img.onerror = () => {
    loaded++;
    percentage.textContent = Math.round(loaded / FRAME_COUNT * 100) + "%";
    if (loaded === FRAME_COUNT) {
      loader.classList.add("done");
      resize();
    }
  };
  images.push(img);
}

// 2. Draw one frame, scaled to cover the screen
function draw(progress, force = false) {
  const i = Math.round(progress * (FRAME_COUNT - 1));
  if (i === lastDrawn && !force) return;
  const img = images[i];
  if (!img || !img.complete || !img.naturalWidth) return;
  lastDrawn = i;
  const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
  const w = img.naturalWidth * scale, h = img.naturalHeight * scale;
  ctx.drawImage(img, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h);
}

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;
  draw(current, true);
}

// 3. Scroll position (0 to 1) becomes the playback position
function readScroll() {
  const max = track.offsetHeight - innerHeight;
  const progress = -track.getBoundingClientRect().top;
  target = max > 0 ? Math.min(1, Math.max(0, progress / max)) : 0;
}

// 4. Ease toward the target so playback feels smooth
function loop() {
  current += (target - current) * 0.18;
  if (Math.abs(target - current) < 0.0002) current = target;
  draw(current);
  fill.style.width = current * 100 + "%";
  time.textContent = (current * DURATION).toFixed(1) + "s / " + DURATION.toFixed(1) + "s";
  hint.style.opacity = current > 0.03 ? 0 : 1;
  requestAnimationFrame(loop);
}

addEventListener("scroll", readScroll, { passive: true });
addEventListener("resize", () => { resize(); readScroll(); });
resize();
readScroll();
loop();
