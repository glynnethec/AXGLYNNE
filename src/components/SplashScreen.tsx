'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (sessionStorage.getItem('hasSeenSplash')) {
      setShowSplash(false);
      return;
    }

    sessionStorage.setItem('hasSeenSplash', 'true');
    
    // Start fading out the splash after 2.5 seconds
    const fadeTimer = setTimeout(() => setFadeSplash(true), 2500);
    // Remove from DOM after 3.3 seconds (allows CSS transition to finish)
    const removeTimer = setTimeout(() => setShowSplash(false), 3300);
    
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  // Prevent hydration mismatch by not rendering anything on the server
  if (!mounted) return null;
  if (!showSplash) return null;

  return (
    <div className={`splash-screen ${fadeSplash ? 'splash-fade-out' : ''}`}>
      <div className="splash-logo" aria-label="GLYNNE Logo" />
    </div>
  );
}
