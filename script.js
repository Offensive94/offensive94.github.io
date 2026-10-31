const clock = document.getElementById('unix-clock');
const panel = document.getElementById('panel');
const copyButton = document.getElementById('copy-tg');
const copyFeedback = document.getElementById('copy-feedback');

function tick() {
  const now = Math.floor(Date.now() / 1000);
  clock.textContent = now;
  clock.dateTime = new Date(now * 1000).toISOString();
}

tick();
setInterval(tick, 1000);

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
  let frame = 0;
  panel.addEventListener('pointermove', (event) => {
    if (frame) return;
    if (frame === 0) {
      frame = requestAnimationFrame(() => {
        const r = panel.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width;
        const y = (event.clientY - r.top) / r.height;
        panel.style.setProperty('--mx', `${48 + x * 4}%`);
        panel.style.setProperty('--my', `${27 + y * 4}%`);
        frame = 0;
      });
    }
  });

  panel.addEventListener('pointerleave', () => {
    panel.style.setProperty('--mx', '50%');
    panel.style.setProperty('--my', '29%');
  });
}

let feedbackTimer;
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('@offensive94rep');
    copyFeedback.textContent = 'copied';
  } catch {
    copyFeedback.textContent = '@offensive94rep';
  }
  clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => { copyFeedback.textContent = ''; }, 2500);
});
