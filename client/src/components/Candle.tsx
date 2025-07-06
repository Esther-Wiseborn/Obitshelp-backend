interface CandleProps {
  className?: string;
}

export function Candle({ className = "" }: CandleProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg 
        width="80" 
        height="120" 
        viewBox="0 0 80 120" 
        className="opacity-60"
      >
        {/* Candle body */}
        <rect 
          x="25" 
          y="30" 
          width="30" 
          height="70" 
          rx="2" 
          fill="#f8f8f8" 
          stroke="#d0d0d0" 
          strokeWidth="1"
        />
        
        {/* Candle base */}
        <rect 
          x="20" 
          y="95" 
          width="40" 
          height="20" 
          rx="3" 
          fill="#e8e8e8" 
          stroke="#c0c0c0" 
          strokeWidth="1"
        />
        
        {/* Wick */}
        <line 
          x1="40" 
          y1="30" 
          x2="40" 
          y2="20" 
          stroke="#2a2a2a" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
        
        {/* Flame */}
        <ellipse 
          cx="40" 
          cy="15" 
          rx="8" 
          ry="12" 
          fill="url(#flameGradient)" 
          opacity="0.9"
        />
        
        {/* Inner flame */}
        <ellipse 
          cx="40" 
          cy="16" 
          rx="4" 
          ry="8" 
          fill="url(#innerFlameGradient)" 
          opacity="0.8"
        />
        
        {/* Flame glow */}
        <ellipse 
          cx="40" 
          cy="15" 
          rx="12" 
          ry="16" 
          fill="url(#glowGradient)" 
          opacity="0.3"
        />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="flameGradient" cx="0.5" cy="0.8" r="0.8">
            <stop offset="0%" stopColor="#ffeb3b" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#ff9800" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff5722" stopOpacity="0.7" />
          </radialGradient>
          
          <radialGradient id="innerFlameGradient" cx="0.5" cy="0.8" r="0.6">
            <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ffeb3b" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffc107" stopOpacity="0.7" />
          </radialGradient>
          
          <radialGradient id="glowGradient" cx="0.5" cy="0.7" r="1">
            <stop offset="0%" stopColor="#fff9c4" stopOpacity="0.4" />
            <stop offset="30%" stopColor="#ffeb3b" stopOpacity="0.3" />
            <stop offset="70%" stopColor="#ff9800" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Flame animation */}
        <style>
          {`
            @keyframes flicker {
              0%, 100% { transform: scale(1) rotate(0deg); }
              25% { transform: scale(1.05) rotate(-1deg); }
              50% { transform: scale(0.95) rotate(1deg); }
              75% { transform: scale(1.02) rotate(-0.5deg); }
            }
            
            ellipse[fill*="flameGradient"] {
              animation: flicker 2s ease-in-out infinite;
              transform-origin: 40px 27px;
            }
            
            ellipse[fill*="innerFlameGradient"] {
              animation: flicker 2.5s ease-in-out infinite reverse;
              transform-origin: 40px 27px;
            }
          `}
        </style>
      </svg>
    </div>
  );
}