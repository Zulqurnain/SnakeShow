import React from 'react';

// Snake segment component with transparency and rainbow effects
export const SnakeSegment = ({ isHead = false, colorIndex = 0, opacity = 0.8 }) => {
  const colors = [
    'from-red-400 to-pink-500',
    'from-orange-400 to-red-500',
    'from-yellow-400 to-orange-500',
    'from-green-400 to-yellow-500',
    'from-blue-400 to-green-500',
    'from-indigo-400 to-blue-500',
    'from-purple-400 to-indigo-500',
    'from-pink-400 to-purple-500'
  ];

  const gradientClass = colors[colorIndex % colors.length];

  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      className={`snake-segment ${isHead ? 'rainbow-effect' : ''}`}
      style={{ opacity }}
    >
      <defs>
        <linearGradient id={`snakeGrad-${colorIndex}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ff6b6b" stopOpacity="0.9">
            <animate attributeName="stop-color" 
              values="#ff6b6b;#4ecdc4;#45b7d1;#96ceb4;#feca57;#ff9ff3;#ff6b6b" 
              dur="3s" 
              repeatCount="indefinite" />
          </stop>
          <stop offset="100%" stopColor="#4ecdc4" stopOpacity="0.9">
            <animate attributeName="stop-color" 
              values="#4ecdc4;#45b7d1;#96ceb4;#feca57;#ff9ff3;#ff6b6b;#4ecdc4" 
              dur="3s" 
              repeatCount="indefinite" />
          </stop>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      <rect
        x="1"
        y="1"
        width="18"
        height="18"
        rx="4"
        fill={`url(#snakeGrad-${colorIndex})`}
        filter={isHead ? "url(#glow)" : "none"}
      />
      
      {isHead && (
        <>
          {/* Snake eyes */}
          <circle cx="6" cy="7" r="1.5" fill="white" opacity="0.9" />
          <circle cx="14" cy="7" r="1.5" fill="white" opacity="0.9" />
          <circle cx="6" cy="7" r="0.8" fill="black" />
          <circle cx="14" cy="7" r="0.8" fill="black" />
        </>
      )}
    </svg>
  );
};

// Food items as random grocery SVGs
export const FoodItem = ({ type = 'apple' }) => {
  const foods = {
    apple: (
      <svg width="18" height="18" viewBox="0 0 24 24" className="food-item">
        <defs>
          <radialGradient id="appleGrad">
            <stop offset="0%" stopColor="#ff4757" />
            <stop offset="100%" stopColor="#c44569" />
          </radialGradient>
        </defs>
        <path
          d="M12 2C9 2 7 4 7 7c0 1.5.5 3 1.5 4.5C9.5 13 11 14.5 12 16c1-1.5 2.5-3 3.5-4.5C16.5 10 17 8.5 17 7c0-3-2-5-5-5z"
          fill="url(#appleGrad)"
        />
        <path d="M12 2s-1-1-2-1c-1 0-1 1-1 1" stroke="#2d8659" strokeWidth="2" fill="none" />
        <ellipse cx="11" cy="4" rx="1" ry="0.5" fill="#4CAF50" />
      </svg>
    ),
    banana: (
      <svg width="18" height="18" viewBox="0 0 24 24" className="food-item">
        <defs>
          <linearGradient id="bananaGrad">
            <stop offset="0%" stopColor="#f1c40f" />
            <stop offset="100%" stopColor="#f39c12" />
          </linearGradient>
        </defs>
        <path
          d="M6 4c0-1 1-2 2-2s2 1 2 2c0 2-1 4-2 6-2 4-3 8-2 10 0 1 1 2 2 2s2-1 2-2c0-2 2-6 4-8 1-2 2-4 2-6 0-1 1-2 2-2s2 1 2 2"
          fill="url(#bananaGrad)"
          stroke="#e67e22"
          strokeWidth="1"
        />
      </svg>
    ),
    orange: (
      <svg width="18" height="18" viewBox="0 0 24 24" className="food-item">
        <defs>
          <radialGradient id="orangeGrad">
            <stop offset="0%" stopColor="#ff7675" />
            <stop offset="100%" stopColor="#d63031" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="12" r="8" fill="url(#orangeGrad)" />
        <path d="M12 4c0 0-2 2-2 4s1 3 2 3 2-1 2-3-2-4-2-4z" fill="#00b894" />
        <circle cx="8" cy="8" r="0.8" fill="#ffffff" opacity="0.3" />
      </svg>
    ),
    grape: (
      <svg width="18" height="18" viewBox="0 0 24 24" className="food-item">
        <defs>
          <radialGradient id="grapeGrad">
            <stop offset="0%" stopColor="#a29bfe" />
            <stop offset="100%" stopColor="#6c5ce7" />
          </radialGradient>
        </defs>
        <circle cx="12" cy="8" r="2" fill="url(#grapeGrad)" />
        <circle cx="10" cy="11" r="2" fill="url(#grapeGrad)" />
        <circle cx="14" cy="11" r="2" fill="url(#grapeGrad)" />
        <circle cx="12" cy="14" r="2" fill="url(#grapeGrad)" />
        <circle cx="10" cy="17" r="2" fill="url(#grapeGrad)" />
        <circle cx="14" cy="17" r="2" fill="url(#grapeGrad)" />
        <path d="M12 2c0 0-1 1-2 2s0 2 1 2 2-1 2-2-1-2-1-2z" fill="#00b894" />
      </svg>
    )
  };

  return foods[type] || foods.apple;
};

// Get random food type
export const getRandomFoodType = () => {
  const types = ['apple', 'banana', 'orange', 'grape'];
  return types[Math.floor(Math.random() * types.length)];
};

// Animated lava wall
export const LavaWall = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="lava-wall">
    <defs>
      <linearGradient id="lavaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ff4500">
          <animate attributeName="stop-color" 
            values="#ff4500;#ff6600;#ff8800;#ffaa00;#ff6600;#ff4500" 
            dur="2s" 
            repeatCount="indefinite" />
        </stop>
        <stop offset="50%" stopColor="#ff6600">
          <animate attributeName="stop-color" 
            values="#ff6600;#ff8800;#ffaa00;#ff4500;#ff8800;#ff6600" 
            dur="2s" 
            repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="#cc3300">
          <animate attributeName="stop-color" 
            values="#cc3300;#ff4500;#ff6600;#ff8800;#ff4500;#cc3300" 
            dur="2s" 
            repeatCount="indefinite" />
        </stop>
      </linearGradient>
      
      <filter id="lavaBubble">
        <feTurbulence baseFrequency="0.9" numOctaves="4" result="noise" seed="1">
          <animate attributeName="baseFrequency" 
            values="0.9;1.2;0.9" 
            dur="3s" 
            repeatCount="indefinite" />
        </feTurbulence>
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="8" />
      </filter>
    </defs>
    
    <rect
      x="0"
      y="0"
      width="20"
      height="20"
      fill="url(#lavaGrad)"
      filter="url(#lavaBubble)"
    />
    
    {/* Lava bubbles */}
    <circle cx="5" cy="8" r="1.5" fill="#ffaa00" opacity="0.6">
      <animate attributeName="cy" values="8;4;8" dur="2s" repeatCount="indefinite" />
    </circle>
    <circle cx="15" cy="12" r="1" fill="#ff8800" opacity="0.4">
      <animate attributeName="cy" values="12;8;12" dur="1.5s" repeatCount="indefinite" />
    </circle>
    <circle cx="10" cy="15" r="1.2" fill="#ff6600" opacity="0.5">
      <animate attributeName="cy" values="15;10;15" dur="2.5s" repeatCount="indefinite" />
    </circle>
  </svg>
);

// Fire effect for walls
export const FireWall = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" className="lava-wall">
    <defs>
      <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ff4500" />
        <stop offset="50%" stopColor="#ff6600" />
        <stop offset="100%" stopColor="#ffaa00" />
      </linearGradient>
    </defs>
    
    <rect x="0" y="0" width="20" height="20" fill="#2c1810" />
    
    {/* Fire flames */}
    <path d="M2 20 Q4 15 3 10 Q5 12 7 8 Q6 14 8 10 Q10 13 12 7 Q11 12 13 9 Q15 14 17 8 Q16 15 18 10 L18 20 Z" 
          fill="url(#fireGrad)" opacity="0.8">
      <animateTransform attributeName="transform" 
        type="scale" 
        values="1 1;1.1 0.9;1 1" 
        dur="0.5s" 
        repeatCount="indefinite" />
    </path>
    
    <path d="M1 20 Q3 16 2 12 Q4 14 6 9 Q5 13 7 11 Q9 12 11 8 Q10 13 12 10 Q14 15 16 9 Q15 14 17 11 Q19 16 19 12 L19 20 Z" 
          fill="#ff8800" opacity="0.6">
      <animateTransform attributeName="transform" 
        type="scale" 
        values="1 1;0.9 1.1;1 1" 
        dur="0.3s" 
        repeatCount="indefinite" />
    </path>
  </svg>
);

export default {
  SnakeSegment,
  FoodItem,
  getRandomFoodType,
  LavaWall,
  FireWall
};
