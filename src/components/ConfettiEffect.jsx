import ReactConfetti from 'react-confetti';
import { useState, useEffect, useCallback } from 'react';

export default function ConfettiEffect({
  active = false,
  duration = 5000,
  numberOfPieces = 500,
  gravity = 0.2,
}) {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (active) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), duration);
      return () => clearTimeout(timer);
    }
  }, [active, duration]);

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  if (!showConfetti) return null;

  return (
    <ReactConfetti
      width={windowSize.width}
      height={windowSize.height}
      recycle={false}
      numberOfPieces={numberOfPieces}
      gravity={gravity}
    />
  );
}
