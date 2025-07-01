import React from 'react';
import './animations.css'; // your CSS from above

export default function BubbleBackground({ count = 20 }) {
  const bubbles = Array.from({ length: count });

  return (
    <div className="bubble-wrapper">
      {bubbles.map((_, i) => {
        const left = Math.random() * 100;
        const size = 10 + Math.random() * 40;
        const duration = 5 + Math.random() * 5;

        return (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
              animationDelay: `${Math.random() * 5}s`,
              background: `rgba(255, 183, 77, ${Math.random() * 0.4 + 0.2})`,
            }}
          />
        );
      })}
    </div>
  );
}
