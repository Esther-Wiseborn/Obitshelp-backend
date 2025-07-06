interface CandleProps {
  className?: string;
}

export function Candle({ className = "" }: CandleProps) {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <svg 
        width="100" 
        height="140" 
        viewBox="0 0 100 140" 
        className="opacity-70"
      >
        {/* Outer glow/halo */}
        <ellipse 
          cx="50" 
          cy="18" 
          rx="24" 
          ry="30" 
          fill="url(#outerGlow)" 
          opacity="0.15"
          className="flame-glow"
        />
        
        {/* Candle body */}
        <rect 
          x="30" 
          y="35" 
          width="40" 
          height="80" 
          rx="3" 
          fill="#64748b" 
          stroke="#475569" 
          strokeWidth="0.5"
        />
        
        {/* Candle base */}
        <rect 
          x="25" 
          y="110" 
          width="50" 
          height="25" 
          rx="4" 
          fill="#52525b" 
          stroke="#3f3f46" 
          strokeWidth="0.5"
        />
        
        {/* Wick */}
        <line 
          x1="50" 
          y1="35" 
          x2="50" 
          y2="25" 
          stroke="#1f2937" 
          strokeWidth="1.5" 
          strokeLinecap="round"
        />
        
        {/* Main flame body */}
        <path 
          d="M 50 25 
             C 45 20, 45 15, 48 12
             C 50 8, 52 8, 54 12
             C 55 15, 55 20, 50 25 Z" 
          fill="url(#mainFlame)" 
          opacity="0.85"
          className="flame-main"
        />
        
        {/* Inner flame */}
        <path 
          d="M 50 23 
             C 47 19, 47 16, 49 14
             C 50 12, 51 12, 52 14
             C 53 16, 53 19, 50 23 Z" 
          fill="url(#innerFlame)" 
          opacity="0.9"
          className="flame-inner"
        />
        
        {/* Flame core */}
        <ellipse 
          cx="50" 
          cy="19" 
          rx="2" 
          ry="4" 
          fill="url(#flameCore)" 
          opacity="0.95"
          className="flame-core"
        />
        
        {/* Gradients */}
        <defs>
          <radialGradient id="outerGlow" cx="0.5" cy="0.6" r="0.8">
            <stop offset="0%" stopColor="#fff4e6" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#ffcc80" stopOpacity="0.4" />
            <stop offset="70%" stopColor="#ff8f65" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          
          <radialGradient id="mainFlame" cx="0.5" cy="0.8" r="0.7">
            <stop offset="0%" stopColor="#fff8e1" stopOpacity="0.9" />
            <stop offset="30%" stopColor="#ffcc80" stopOpacity="0.85" />
            <stop offset="60%" stopColor="#ff8f65" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#d84315" stopOpacity="0.7" />
          </radialGradient>
          
          <radialGradient id="innerFlame" cx="0.5" cy="0.8" r="0.6">
            <stop offset="0%" stopColor="#fffde7" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#ffecb3" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffcc80" stopOpacity="0.85" />
          </radialGradient>
          
          <radialGradient id="flameCore" cx="0.5" cy="0.7" r="0.5">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
            <stop offset="60%" stopColor="#fff8e1" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffecb3" stopOpacity="0.9" />
          </radialGradient>
        </defs>
        

      </svg>
    </div>
  );
}