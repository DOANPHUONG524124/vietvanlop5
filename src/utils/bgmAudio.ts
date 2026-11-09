/**
 * Gentle Background Music (BGM) Generator using Web Audio API
 * Provides soothing, ambient study melodies for primary school kids
 * No external MP3 downloads required - runs 100% reliably in any browser!
 */

type BgmTheme = 'forest' | 'musicbox' | 'piano';

interface BgmTrack {
  id: BgmTheme;
  title: string;
  icon: string;
  tempo: number; // BPM
  notes: number[]; // Frequencies
}

// Gentle pentatonic scales that always sound harmonious and calming
const TRACKS: Record<BgmTheme, BgmTrack> = {
  forest: {
    id: 'forest',
    title: 'Rừng Tri Thức Xanh (Lofi Êm Ái)',
    icon: '🍃',
    tempo: 72,
    // C Major Pentatonic: C4, D4, E4, G4, A4, C5, D5, E5
    notes: [
      261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 440.00, 392.00,
      329.63, 293.66, 261.63, 329.63, 392.00, 523.25, 587.33, 523.25,
      440.00, 392.00, 329.63, 293.66, 261.63, 196.00, 220.00, 261.63,
    ],
  },
  musicbox: {
    id: 'musicbox',
    title: 'Hộp Nhạc Thần Tiên (Music Box)',
    icon: '🎵',
    tempo: 84,
    // G Major Pentatonic: G4, A4, B4, D5, E5, G5
    notes: [
      392.00, 440.00, 493.88, 587.33, 659.25, 783.99, 659.25, 587.33,
      493.88, 440.00, 392.00, 493.88, 587.33, 783.99, 880.00, 783.99,
      659.25, 587.33, 493.88, 440.00, 392.00, 293.66, 329.63, 392.00,
    ],
  },
  piano: {
    id: 'piano',
    title: 'Phím Đàn Dịu Dàng (Piano Luyện Văn)',
    icon: '🎹',
    tempo: 64,
    // F Major Lyrical notes
    notes: [
      349.23, 392.00, 440.00, 523.25, 587.33, 698.46, 587.33, 523.25,
      440.00, 392.00, 349.23, 440.00, 523.25, 698.46, 783.99, 698.46,
      587.33, 523.25, 440.00, 392.00, 349.23, 261.63, 293.66, 349.23,
    ],
  },
};

class BgmPlayer {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private volume = 0.18;
  private currentTheme: BgmTheme = 'forest';
  private timerId: number | null = null;
  private noteIndex = 0;
  private masterGain: GainNode | null = null;
  private listeners: Array<(state: { isPlaying: boolean; theme: BgmTheme; volume: number }) => void> = [];

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  private playGentleNote(freq: number, duration: number, theme: BgmTheme) {
    if (!this.ctx || !this.masterGain) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      // Filter for warmth (removes harsh high frequencies)
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(theme === 'musicbox' ? 1800 : 900, now);

      if (theme === 'musicbox') {
        osc.type = 'sine';
      } else if (theme === 'piano') {
        osc.type = 'triangle';
      } else {
        osc.type = 'sine';
      }

      osc.frequency.setValueAtTime(freq, now);

      // Smooth attack & soft exponential decay
      const attack = 0.08;
      const decay = duration * 0.95;

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.25, now + attack);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + attack + decay + 0.1);

      // Play soft harmonic fifth for extra warmth in forest/piano
      if ((theme === 'forest' || theme === 'piano') && Math.random() > 0.4) {
        const harmonyOsc = this.ctx.createOscillator();
        const harmGain = this.ctx.createGain();
        harmonyOsc.type = 'triangle';
        harmonyOsc.frequency.setValueAtTime(freq * 0.5, now); // 1 octave lower soft pad

        harmGain.gain.setValueAtTime(0.0001, now);
        harmGain.gain.exponentialRampToValueAtTime(0.08, now + attack * 2);
        harmGain.gain.exponentialRampToValueAtTime(0.0001, now + attack + decay * 1.2);

        harmonyOsc.connect(filter);
        harmGain.connect(this.masterGain);
        harmonyOsc.start(now);
        harmonyOsc.stop(now + attack + decay * 1.3);
      }
    } catch (e) {
      // Audio playback safety catch
    }
  }

  private scheduleNext() {
    if (!this.isPlaying) return;

    const track = TRACKS[this.currentTheme];
    const freq = track.notes[this.noteIndex % track.notes.length];
    const beatDuration = 60 / track.tempo;

    this.playGentleNote(freq, beatDuration * 1.5, this.currentTheme);
    this.noteIndex++;

    this.timerId = window.setTimeout(() => {
      this.scheduleNext();
    }, beatDuration * 1000);
  }

  public start() {
    this.initContext();
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.scheduleNext();
    this.notify();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notify();
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.pause();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public setTheme(theme: BgmTheme) {
    this.currentTheme = theme;
    this.noteIndex = 0;
    this.notify();
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.notify();
  }

  public getState() {
    return {
      isPlaying: this.isPlaying,
      theme: this.currentTheme,
      volume: this.volume,
      tracks: Object.values(TRACKS),
    };
  }

  public subscribe(fn: (state: { isPlaying: boolean; theme: BgmTheme; volume: number }) => void) {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    const s = { isPlaying: this.isPlaying, theme: this.currentTheme, volume: this.volume };
    this.listeners.forEach((fn) => fn(s));
  }
}

export const bgmPlayer = new BgmPlayer();
export const BGM_TRACKS = Object.values(TRACKS);
export type { BgmTheme };
