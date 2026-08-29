import React from 'react';

interface LogoProps {
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ showTagline = true, className = '' }) => {
  return (
    <div className={`flex flex-col ${className}`} id="brand-logo-container">
      {/* Top row: Globe Icon + Wordmark */}
      <div className="flex items-center gap-2.5">
        {/* Globe icon with cityscape cutout */}
        <div className="relative w-10 h-10 shrink-0">
          <svg viewBox="0 0 48 48" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vila-globe-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="45%" stopColor="#10B981" />
                <stop offset="85%" stopColor="#2563EB" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="vila-roof-sun" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#D97706" />
              </linearGradient>
            </defs>

            {/* Globe circular outline with multi-color brand gradient */}
            <circle
              cx="24"
              cy="24"
              r="22"
              stroke="url(#vila-globe-grad)"
              strokeWidth="2.5"
              fill="#FFFFFF"
            />

            {/* Subtle latitude/longitude curved background lines */}
            <path
              d="M6 18C12 21 36 21 42 18"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
            <path
              d="M7 30C13 27 35 27 41 30"
              stroke="#E2E8F0"
              strokeWidth="1.2"
              strokeLinecap="round"
            />

            {/* City skyline silhouettes inside the globe */}
            {/* Left yellow/amber building with spire */}
            <path
              d="M10 33V22L14 18L18 22V33H10Z"
              fill="url(#vila-roof-sun)"
            />
            {/* Central tallest emerald building with steeple/roof */}
            <path
              d="M17 33V17L22 12L27 17V33H17Z"
              fill="#10B981"
            />
            {/* Center-right highrise / dome */}
            <path
              d="M26 33V19L31 14L36 19V33H26Z"
              fill="#2563EB"
            />
            {/* Far-right church / tower */}
            <path
              d="M34 33V23L38 19L40 21V33H34Z"
              fill="#1E40AF"
            />

            {/* Base swoosh / foundation */}
            <path
              d="M9 33C14 38 34 38 39 33"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Wordmark: V I L A with styled A */}
        <div className="flex items-center">
          <span className="text-[26px] font-extrabold tracking-widest text-[#1E3A5F] font-['Outfit'] flex items-center leading-none">
            <span>VIL</span>
            <span className="relative inline-flex items-center justify-center text-[#2563EB] ml-0.5">
              <svg viewBox="0 0 24 28" className="w-5 h-6" fill="none">
                {/* Triangular styled 'A' matching reference */}
                <path
                  d="M12 2L2 26H7L12 14L17 26H22L12 2Z"
                  fill="#2563EB"
                />
                <circle cx="12" cy="18" r="2" fill="#10B981" />
              </svg>
            </span>
          </span>
        </div>
      </div>

      {/* 2-line Tagline in Uppercase matching reference screenshot */}
      {showTagline && (
        <div className="mt-1.5 text-[9.5px] font-bold tracking-wider text-slate-400 leading-tight uppercase font-['Outfit'] pl-0.5">
          <p>O MUNDO É UMA VILA.</p>
          <p>
            E NÓS SOMOS <span className="text-[#10B981] font-extrabold">UM.</span>
          </p>
        </div>
      )}
    </div>
  );
};
