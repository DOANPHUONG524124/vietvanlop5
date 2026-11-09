/**
 * Vietnamese Text-to-Speech & Sound Effects Helper
 * Optimized for Primary School Students (Lớp 5)
 */

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      cachedVoices = voices;
      resolve(voices);
      return;
    }

    const handler = () => {
      const v = window.speechSynthesis.getVoices();
      cachedVoices = v;
      window.speechSynthesis.onvoiceschanged = null;
      resolve(v);
    };

    window.speechSynthesis.onvoiceschanged = handler;
    // Timeout fallback after 1 second if onvoiceschanged doesn't fire
    setTimeout(() => {
      if (cachedVoices.length === 0) {
        cachedVoices = window.speechSynthesis.getVoices();
      }
      resolve(cachedVoices);
    }, 1000);
  });
}

// Initial preload
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadVoices();
}

/**
 * Find the most natural Vietnamese voice available
 */
export async function getBestVietnameseVoice(): Promise<SpeechSynthesisVoice | null> {
  const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
  if (!voices || voices.length === 0) return null;

  // 1. Prioritize natural Vietnamese online/cloud voices (Edge/Chrome)
  const vietnameseVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith('vi') ||
      v.lang.toLowerCase().includes('vie') ||
      v.name.toLowerCase().includes('vietnam') ||
      v.name.toLowerCase().includes('tiếng việt')
  );

  if (vietnameseVoices.length === 0) return null;

  // Prefer high quality Microsoft HoaiMy, Google Tiếng Việt, or natural female storytelling voices
  const preferred =
    vietnameseVoices.find((v) => v.name.includes('HoaiMy') || v.name.includes('NamMinh')) ||
    vietnameseVoices.find((v) => v.name.toLowerCase().includes('google')) ||
    vietnameseVoices.find((v) => v.name.toLowerCase().includes('natural')) ||
    vietnameseVoices[0];

  return preferred || null;
}

/**
 * Speak text in clear, warm, child-friendly Vietnamese
 */
export async function speakVietnamese(
  text: string,
  onEnd?: () => void,
  onError?: (err: any) => void
): Promise<boolean> {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return false;
  }

  try {
    window.speechSynthesis.cancel(); // Stop any ongoing utterance

    // Clean text: strip markdown, urls, emojis, duplicate spaces
    const cleanText = text
      .replace(/[*_#`~[\]()>]/g, ' ')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

    if (!cleanText) {
      onEnd?.();
      return false;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.92; // slightly gentle pace for elementary school
    utterance.pitch = 1.05; // warm, friendly tone

    const bestVoice = await getBestVietnameseVoice();
    if (bestVoice) {
      utterance.voice = bestVoice;
    }

    utterance.onend = () => {
      onEnd?.();
    };

    utterance.onerror = (e) => {
      console.warn('Speech synthesis ended with event:', e);
      onError?.(e);
      onEnd?.();
    };

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.warn('Speech synthesis error:', err);
    onError?.(err);
    onEnd?.();
    return false;
  }
}

/**
 * Stop any current speech playback
 */
export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Play a cheerful celebration chime sound via Web Audio API (Ting-ting sound for reward)
 */
export function playRewardChime(): void {
  if (typeof window === 'undefined') return;
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 (Bright cheerful chord)
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

      gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + idx * 0.08 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
    });

    setTimeout(() => {
      ctx.close().catch(() => {});
    }, 1000);
  } catch (e) {
    // audio context might be blocked or unsupported
  }
}
