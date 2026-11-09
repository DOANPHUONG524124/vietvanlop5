import React from 'react';

interface OwlAvatarProps {
  mood?: 'idle' | 'happy' | 'thinking' | 'mentoring';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isSpeaking?: boolean;
  className?: string;
}

export const OwlAvatar: React.FC<OwlAvatarProps> = ({
  mood = 'idle',
  size = 'md',
  isSpeaking = false,
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36',
  };

  return (
    <div className={`relative inline-flex items-center justify-center ${sizeMap[size]} ${className}`}>
      {/* Background glow when speaking or mentoring */}
      {isSpeaking && (
        <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping -z-10" />
      )}

      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md transition-transform duration-300 hover:scale-105"
      >
        {/* Soft forest aura circle */}
        <circle cx="60" cy="62" r="54" fill="#E8F5E9" stroke="#A5D6A7" strokeWidth="2" />

        {/* Owl Ear tufts */}
        <path d="M36 28L28 42L42 40Z" fill="#795548" />
        <path d="M84 28L78 40L92 42Z" fill="#795548" />

        {/* Owl Body */}
        <ellipse cx="60" cy="68" rx="36" ry="40" fill="#8D6E63" />

        {/* Belly with feather scallop pattern */}
        <ellipse cx="60" cy="74" rx="24" ry="28" fill="#FFF8E1" />
        <path d="M48 68Q60 74 72 68" stroke="#D7CCC8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M50 78Q60 84 70 78" stroke="#D7CCC8" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M52 88Q60 92 68 88" stroke="#D7CCC8" strokeWidth="2.5" strokeLinecap="round" />

        {/* Wings */}
        <path
          d={
            isSpeaking || mood === 'mentoring'
              ? 'M24 64C16 72 20 90 32 94C30 84 28 74 24 64Z'
              : 'M26 62C22 72 26 88 34 90C31 80 29 70 26 62Z'
          }
          fill="#6D4C41"
          className={isSpeaking ? 'animate-bounce' : ''}
        />
        <path
          d={
            isSpeaking || mood === 'mentoring'
              ? 'M96 64C104 72 100 90 88 94C90 84 92 74 96 64Z'
              : 'M94 62C98 72 94 88 86 90C89 80 91 70 94 62Z'
          }
          fill="#6D4C41"
        />

        {/* Eye surrounds */}
        <circle cx="45" cy="50" r="15" fill="#FFFFFF" stroke="#D7CCC8" strokeWidth="1.5" />
        <circle cx="75" cy="50" r="15" fill="#FFFFFF" stroke="#D7CCC8" strokeWidth="1.5" />

        {/* Eyeballs */}
        <circle cx="46" cy="50" r="9" fill="#2E7D32" />
        <circle cx="74" cy="50" r="9" fill="#2E7D32" />

        {/* Pupils */}
        <circle cx={mood === 'thinking' ? '44' : '47'} cy="50" r="5" fill="#1B5E20" />
        <circle cx={mood === 'thinking' ? '72' : '75'} cy="50" r="5" fill="#1B5E20" />

        {/* Light glints in eyes */}
        <circle cx="49" cy="48" r="2.5" fill="#FFFFFF" />
        <circle cx="77" cy="48" r="2.5" fill="#FFFFFF" />
        <circle cx="45" cy="52" r="1" fill="#FFFFFF" />
        <circle cx="73" cy="52" r="1" fill="#FFFFFF" />

        {/* Glasses (Spectacles of Wisdom) */}
        <circle cx="45" cy="50" r="15" fill="none" stroke="#F59E0B" strokeWidth="3" />
        <circle cx="75" cy="50" r="15" fill="none" stroke="#F59E0B" strokeWidth="3" />
        <path d="M60 50L60 48" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />

        {/* Beak */}
        <polygon points="56,58 64,58 60,67" fill="#F59E0B" />

        {/* Graduation Cap / Scholar Hat */}
        <polygon points="60,14 92,25 60,34 28,25" fill="#1E293B" />
        <path d="M42 29L42 37C42 41 78 41 78 37L78 29" fill="#0F172A" />
        <circle cx="60" cy="24" r="3" fill="#F59E0B" />
        {/* Tassel */}
        <path d="M60 24C70 24 78 30 80 42" stroke="#F59E0B" strokeWidth="2" fill="none" />
        <circle cx="80" cy="43" r="2.5" fill="#F59E0B" />

        {/* Talons / Feet resting on branch */}
        <ellipse cx="48" cy="107" rx="5" ry="3" fill="#F59E0B" />
        <ellipse cx="54" cy="107" rx="5" ry="3" fill="#F59E0B" />
        <ellipse cx="66" cy="107" rx="5" ry="3" fill="#F59E0B" />
        <ellipse cx="72" cy="107" rx="5" ry="3" fill="#F59E0B" />

        {/* Wooden branch */}
        <path d="M12 110Q60 106 108 110" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" />
        <path d="M90 108Q98 102 104 104" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </div>
  );
};
