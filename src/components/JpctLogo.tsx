import React from 'react';

interface JpctLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'horizontal';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const JpctLogo: React.FC<JpctLogoProps> = ({
  className = '',
  variant = 'horizontal',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { h: 36, text: 'text-base', sub: 'text-[9px]' },
    md: { h: 46, text: 'text-xl', sub: 'text-[10px]' },
    lg: { h: 56, text: 'text-2xl', sub: 'text-xs' },
    xl: { h: 72, text: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size];

  // SVG Mark representing the 3D Portal / Open Doors from the official logo
  const LogoMark = (
    <div
      className="relative shrink-0 flex items-center justify-center select-none"
      style={{ width: currentSize.h, height: currentSize.h }}
    >
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
      >
        <defs>
          <linearGradient id="jpctPortalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="35%" stopColor="#0B5ED7" />
            <stop offset="70%" stopColor="#6F42C1" />
            <stop offset="100%" stopColor="#4A148C" />
          </linearGradient>
          <linearGradient id="doorLeftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0096C7" />
            <stop offset="100%" stopColor="#0077B6" />
          </linearGradient>
          <linearGradient id="doorRightGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5A189A" />
            <stop offset="100%" stopColor="#7B2CBF" />
          </linearGradient>
          <linearGradient id="lintelGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00B4D8" />
            <stop offset="50%" stopColor="#0B5ED7" />
            <stop offset="100%" stopColor="#7B2CBF" />
          </linearGradient>
        </defs>

        {/* Outer Architectural Lintel Steps */}
        <polygon points="35,16 85,16 80,22 40,22" fill="url(#lintelGrad)" />
        <polygon points="28,22 92,22 87,29 33,29" fill="url(#lintelGrad)" />

        {/* Left Open Door Panel in Perspective */}
        <path
          d="M33,31 L58,36 L58,95 L33,88 Z"
          fill="none"
          stroke="url(#doorLeftGrad)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M40,41 L53,44 L53,88 L40,84 Z"
          fill="#EAF4FF"
          opacity="0.3"
        />

        {/* Right Open Door Panel in Perspective */}
        <path
          d="M87,31 L62,36 L62,95 L87,88 Z"
          fill="none"
          stroke="url(#doorRightGrad)"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        <path
          d="M80,41 L67,44 L67,88 L80,84 Z"
          fill="#F3E8FF"
          opacity="0.3"
        />

        {/* Bottom Base Threshold Pedestal */}
        <polygon points="24,94 96,94 102,102 18,102" fill="url(#lintelGrad)" />

        {/* Bold Serif JPCT across the center portal */}
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fill="#0F172A"
          fontFamily="Georgia, serif"
          fontWeight="900"
          fontSize="24"
          letterSpacing="1"
        >
          JPCT
        </text>
      </svg>
    </div>
  );

  if (variant === 'mark') {
    return <div className={`inline-flex items-center ${className}`}>{LogoMark}</div>;
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        {LogoMark}
        <span className={`font-serif font-black tracking-wider text-slate-900 ${currentSize.text} mt-1`}>
          JPCT
        </span>
        <span className="font-serif text-[10px] tracking-[0.2em] text-[#063B7A] uppercase font-bold">
          Prestação de Serviços
        </span>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {LogoMark}
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-1.5">
          <span className={`font-serif font-black tracking-wide text-[#063B7A] ${currentSize.text} leading-none`}>
            JPCT
          </span>
          <span className="text-[9px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-blue-100 text-[#0B5ED7]">
            LDA
          </span>
        </div>
        <span className={`font-serif font-semibold text-slate-600 ${currentSize.sub} tracking-wider uppercase mt-0.5 leading-tight`}>
          Prestação de Serviços
        </span>
      </div>
    </div>
  );
};
