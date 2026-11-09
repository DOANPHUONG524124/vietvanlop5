import React, { useState, useEffect } from 'react';
import { bgmPlayer, BGM_TRACKS, BgmTheme } from '../utils/bgmAudio.ts';
import { Volume2, VolumeX, Music, Disc3, Sparkles } from 'lucide-react';

export const MusicPlayerControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [theme, setTheme] = useState<BgmTheme>('forest');
  const [volume, setVolume] = useState(0.18);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    const unsub = bgmPlayer.subscribe((state) => {
      setIsPlaying(state.isPlaying);
      setTheme(state.theme);
      setVolume(state.volume);
    });
    return unsub;
  }, []);

  const handleToggle = () => {
    bgmPlayer.toggle();
  };

  const handleSelectTrack = (trackId: BgmTheme) => {
    bgmPlayer.setTheme(trackId);
    if (!isPlaying) {
      bgmPlayer.start();
    }
    setIsOpenMenu(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseFloat(e.target.value);
    setVolume(newVol);
    bgmPlayer.setVolume(newVol);
  };

  const currentTrack = BGM_TRACKS.find((t) => t.id === theme) || BGM_TRACKS[0];

  return (
    <div className="relative inline-flex items-center">
      {/* Main Music Toggle Pill */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-50 to-emerald-50 border border-emerald-300 shadow-xs hover:border-emerald-400 transition-all">
        <button
          type="button"
          onClick={handleToggle}
          className={`p-1.5 rounded-full cursor-pointer transition-transform ${
            isPlaying
              ? 'bg-emerald-600 text-white animate-spin [animation-duration:8s]'
              : 'bg-slate-200 text-slate-600 hover:bg-emerald-500 hover:text-white'
          }`}
          title={isPlaying ? 'Tạm dừng nhạc nền nhẹ nhàng' : 'Bật nhạc nền nhẹ nhàng'}
          aria-label={isPlaying ? 'Dừng nhạc' : 'Phát nhạc'}
        >
          {isPlaying ? <Disc3 className="w-4 h-4" /> : <Music className="w-4 h-4" />}
        </button>

        <button
          type="button"
          onClick={() => setIsOpenMenu(!isOpenMenu)}
          className="text-left cursor-pointer group flex items-center gap-1"
          title="Chọn điệu nhạc hoặc chỉnh âm lượng"
        >
          <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
            <span>{currentTrack.icon}</span>
            <span className="hidden sm:inline">Nhạc nền:</span>
          </div>
          <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-700 max-w-[100px] truncate hidden md:inline">
            {currentTrack.title.split('(')[0]}
          </span>
          <span className="text-[10px] text-emerald-600">▼</span>
        </button>

        {isPlaying && (
          <div className="flex items-center gap-0.5 px-1">
            <span className="w-1 h-3 bg-emerald-500 rounded-full animate-bounce [animation-delay:0ms]" />
            <span className="w-1 h-4 bg-emerald-600 rounded-full animate-bounce [animation-delay:150ms]" />
            <span className="w-1 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:300ms]" />
          </div>
        )}
      </div>

      {/* Dropdown Menu for choosing track and volume */}
      {isOpenMenu && (
        <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border-2 border-emerald-200 p-3 z-50 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-emerald-100">
            <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Giai Điệu Nhẹ Nhàng Bé Nghe</span>
            </span>
            <button
              onClick={() => setIsOpenMenu(false)}
              className="text-slate-400 hover:text-slate-600 text-xs px-1 font-bold"
            >
              ✕
            </button>
          </div>

          <div className="space-y-1.5 mb-3">
            {BGM_TRACKS.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectTrack(t.id)}
                className={`w-full text-left p-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors cursor-pointer ${
                  theme === t.id && isPlaying
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : 'hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">{t.icon}</span>
                  <span>{t.title}</span>
                </div>
                {theme === t.id && isPlaying && (
                  <span className="text-emerald-700 text-xs">▶ Đang phát</span>
                )}
              </button>
            ))}
          </div>

          {/* Volume Slider */}
          <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
            <button
              onClick={() => {
                const next = volume > 0 ? 0 : 0.18;
                setVolume(next);
                bgmPlayer.setVolume(next);
              }}
              className="text-slate-500 hover:text-emerald-700 cursor-pointer"
            >
              {volume === 0 ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-emerald-600" />}
            </button>
            <input
              type="range"
              min="0"
              max="0.4"
              step="0.02"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
            />
            <span className="text-[10px] font-bold text-slate-500 w-8 text-right">
              {Math.round((volume / 0.4) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
