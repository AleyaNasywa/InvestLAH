// Utility functions for Web Audio applause/cheer sound, aggressive screen shake, bouncy gegar, emoji bursts, currency formatting, and Tab 9 Final Boss Confetti

export const fmtRM = (n: number): string => {
  const prefix = n < 0 ? '-' : '';
  return `${prefix}RM${Math.round(Math.abs(n)).toLocaleString('en-MY')}`;
};

export const fmtRMSpaced = (n: number): string => {
  const prefix = n < 0 ? '-' : '';
  return `${prefix}RM ${Math.round(Math.abs(n)).toLocaleString('en-MY')}`;
};

export const fmtRM2 = (n: number): string => {
  return (
    'RM ' +
    n.toLocaleString('en-MY', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );
};

export const rnd = <T,>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

export const storage = {
  get<T>(key: string, defaultVal: T): T {
    try {
      const raw = localStorage.getItem('il_' + key);
      if (raw === null) return defaultVal;
      return JSON.parse(raw) ?? defaultVal;
    } catch {
      return defaultVal;
    }
  },
  set<T>(key: string, val: T): void {
    try {
      localStorage.setItem('il_' + key, JSON.stringify(val));
    } catch {
      // Ignore storage errors in restricted environments
    }
  },
};

// Web Audio Synthesizer: Celebratory Victory Chime + Applause Claps & Error Buzz
let audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (AudioCtxClass) {
      audioCtx = new AudioCtxClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function playCheerAndClap(): void {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Play upbeat major arpeggio chime (C5 -> E5 -> G5 -> C6)
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + idx * 0.07);

      gain.gain.setValueAtTime(0.001, now + idx * 0.07);
      gain.gain.exponentialRampToValueAtTime(0.14, now + idx * 0.07 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.07);
      osc.stop(now + idx * 0.07 + 0.32);
    });

    // 2. Synthesize rhythmic hand-claps (applause burst)
    const clapTimes = [0.05, 0.13, 0.21, 0.29, 0.37, 0.45];
    clapTimes.forEach((offset) => {
      const bufferSize = ctx.sampleRate * 0.06;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200 + Math.random() * 300;
      filter.Q.value = 1.8;

      const clapGain = ctx.createGain();
      clapGain.gain.setValueAtTime(0.15, now + offset);
      clapGain.gain.exponentialRampToValueAtTime(0.005, now + offset + 0.055);

      whiteNoise.connect(filter);
      filter.connect(clapGain);
      clapGain.connect(ctx.destination);

      whiteNoise.start(now + offset);
      whiteNoise.stop(now + offset + 0.06);
    });
  } catch {
    // Ignore audio context restrictions
  }
}

export function playErrorBuzz(): void {
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.linearRampToValueAtTime(110, now + 0.22);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.25);
  } catch {
    // Ignore audio context restrictions
  }
}

export function triggerGegar(): void {
  if (typeof document === 'undefined') return;
  const mainEl = document.querySelector('main');
  if (!mainEl) return;
  mainEl.classList.remove('animate-gegar');
  void (mainEl as HTMLElement).offsetWidth;
  mainEl.classList.add('animate-gegar');
  setTimeout(() => mainEl.classList.remove('animate-gegar'), 500);
}

export function triggerShake(): void {
  if (typeof document === 'undefined') return;
  playErrorBuzz();
  const mainEl = document.querySelector('main');
  if (!mainEl) return;
  mainEl.classList.remove('animate-shake');
  void (mainEl as HTMLElement).offsetWidth;
  mainEl.classList.add('animate-shake');
  setTimeout(() => mainEl.classList.remove('animate-shake'), 550);
}

export function floatEmoji(x: number, y: number, emoji: string): void {
  if (typeof document === 'undefined') return;
  const span = document.createElement('span');
  span.className = 'fx-float';
  span.textContent = emoji;
  span.style.left = `${x}px`;
  span.style.top = `${y}px`;
  span.style.setProperty('--dx', `${Math.random() * 60 - 30}px`);
  span.style.setProperty('--rot', `${Math.random() * 40 - 20}deg`);
  document.body.appendChild(span);
  setTimeout(() => span.remove(), 1150);
}

export function burstEmoji(
  x: number,
  y: number,
  emoji: string,
  count = 5
): void {
  if (typeof document === 'undefined') return;
  const safeCount = Math.min(count, 6);
  for (let i = 0; i < safeCount; i++) {
    const span = document.createElement('span');
    span.className = 'fx-burst';
    span.textContent = emoji;
    const angle = (Math.PI * 2 * i) / safeCount + Math.random() * 0.4;
    const dist = 65 + Math.random() * 55;
    span.style.left = `${x}px`;
    span.style.top = `${y}px`;
    span.style.setProperty('--dx', `${Math.cos(angle) * dist}px`);
    span.style.setProperty('--dy', `${Math.sin(angle) * dist}px`);
    span.style.setProperty('--rot', `${Math.random() * 90 - 45}deg`);
    document.body.appendChild(span);
    setTimeout(() => span.remove(), 820);
  }
}

// Confetti Engine — STRICT RULE: Reserved for Tab 9 (Final Boss Quiz) only!
interface ConfettiParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  c: string;
  rot: number;
  vr: number;
  life: number;
  sq: boolean;
}

const CONFETTI_COLORS = [
  '#10D989',
  '#FF4766',
  '#3B82F6',
  '#FDE047',
  '#FB923C',
  '#000000',
];

let particles: ConfettiParticle[] = [];
let rafId: number | null = null;

function getCanvas(): HTMLCanvasElement | null {
  if (typeof document === 'undefined') return null;
  return document.getElementById('confetti-canvas') as HTMLCanvasElement | null;
}

function tickConfetti(): void {
  const cv = getCanvas();
  if (!cv) {
    rafId = null;
    return;
  }
  const cx = cv.getContext('2d');
  if (!cx) return;

  const dpr = window.devicePixelRatio || 1;
  if (
    cv.width !== window.innerWidth * dpr ||
    cv.height !== window.innerHeight * dpr
  ) {
    cv.width = window.innerWidth * dpr;
    cv.height = window.innerHeight * dpr;
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  cx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (const p of particles) {
    p.vy += 0.26;
    p.vx *= 0.99;
    p.x += p.vx;
    p.y += p.vy;
    p.rot += p.vr;
    p.life++;

    cx.save();
    cx.translate(p.x, p.y);
    cx.rotate(p.rot);
    cx.fillStyle = p.c;
    if (p.sq) {
      cx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r);
    } else {
      cx.beginPath();
      cx.arc(0, 0, p.r / 1.2, 0, Math.PI * 2);
      cx.fill();
    }
    cx.restore();
  }

  particles = particles.filter(
    (p) => p.y < window.innerHeight + 60 && p.life < 320
  );

  if (particles.length > 0) {
    rafId = requestAnimationFrame(tickConfetti);
  } else {
    rafId = null;
    cx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

export function fireConfetti(
  count = 90,
  x = typeof window !== 'undefined' ? window.innerWidth / 2 : 500,
  y = typeof window !== 'undefined' ? window.innerHeight * 0.3 : 300
): void {
  if (typeof window === 'undefined') return;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * 14;
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 8,
      r: 5 + Math.random() * 5,
      c: rnd(CONFETTI_COLORS),
      rot: Math.random() * 6,
      vr: (Math.random() - 0.5) * 0.35,
      life: 0,
      sq: Math.random() < 0.65,
    });
  }
  if (!rafId) {
    rafId = requestAnimationFrame(tickConfetti);
  }
}

// Tabs 1-8 Celebration: Snappy audio chime + applause + bouncy gegar (NO confetti on Tabs 1-8!)
export function fireBigConfetti(): void {
  playCheerAndClap();
  triggerGegar();
}

// Tab 9 Final Boss Quiz ONLY: Massive Full-Screen Confetti Explosion!
export function fireMassiveBossConfetti(): void {
  if (typeof window === 'undefined') return;
  playCheerAndClap();
  triggerGegar();
  fireConfetti(110, window.innerWidth * 0.5, window.innerHeight * 0.3);
  setTimeout(() => {
    fireConfetti(85, window.innerWidth * 0.2, window.innerHeight * 0.4);
    fireConfetti(85, window.innerWidth * 0.8, window.innerHeight * 0.4);
  }, 240);
}
