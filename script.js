const parallaxItems = document.querySelectorAll("[data-parallax]");
const progressBar = document.querySelector(".motion-progress i");
const scrollVideo = document.querySelector(".scroll-video");
const scrollDuration = 40;
let youtubePlayer;
let videoDuration = 0;
let lastScrollTime = -1;

const updateParallax = () => {
  const viewport = window.innerHeight;
  parallaxItems.forEach((item) => {
    const bounds = item.getBoundingClientRect();
    const distance = (bounds.top + bounds.height / 2 - viewport / 2) * Number(item.dataset.parallax);
    const zoom = Number(item.dataset.zoom || 0);
    const progress = Math.min(1, Math.max(0, (viewport - bounds.top) / (viewport + bounds.height)));
    item.style.transform = `translate3d(0, ${distance}px, 0) scale(${1 + zoom + progress * zoom})`;
  });
};

window.onYouTubeIframeAPIReady = () => {
  youtubePlayer = new YT.Player("youtube-player", {
    videoId: "kfsKda_lNWs",
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      modestbranding: 1,
      mute: 1,
      playsinline: 1,
      playlist: "kfsKda_lNWs",
      rel: 0
    },
    events: {
      onReady: (event) => {
        videoDuration = event.target.getDuration();
        event.target.mute();
        event.target.playVideo();
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.ENDED) {
          event.target.seekTo(0);
          event.target.playVideo();
        }
      }
    }
  });
};

const updateScrollVideo = () => {
  if (!scrollVideo || !youtubePlayer || !videoDuration) return;

  const bounds = scrollVideo.getBoundingClientRect();
  const scrollRange = scrollVideo.offsetHeight - window.innerHeight;
  const progress = Math.min(1, Math.max(0, -bounds.top / scrollRange));
  const targetTime = Math.min(scrollDuration, videoDuration) * progress;

  if (progressBar) progressBar.style.transform = `scaleX(${progress})`;
  if (Math.abs(targetTime - lastScrollTime) > 0.08) {
    youtubePlayer.seekTo(targetTime, true);
    lastScrollTime = targetTime;
  }
};

let ticking = false;
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      updateParallax();
      updateScrollVideo();
      ticking = false;
    });
    ticking = true;
  }
}, { passive: true });

window.addEventListener("resize", updateParallax);
window.addEventListener("scroll", updateScrollVideo, { passive: true });
window.addEventListener("resize", updateScrollVideo);
updateParallax();
