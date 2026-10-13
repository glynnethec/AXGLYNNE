'use client';

import { useEffect, useState, useSyncExternalStore } from 'react';

const emptySubscribe = () => () => {};

export default function SplashScreen() {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const alreadySeen = useSyncExternalStore(
    emptySubscribe,
    () => {
      try {
        return typeof window !== 'undefined' && sessionStorage.getItem('hasSeenSplash') === 'true';
      } catch {
        return false;
      }
    },
    () => true
  );
  const [fadeSplash, setFadeSplash] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (alreadySeen) return;

    try {
      sessionStorage.setItem('hasSeenSplash', 'true');
    } catch {
      // ignore storage quota errors
    }
    
    // Start fading out the splash after 2.5 seconds
    const fadeTimer = setTimeout(() => setFadeSplash(true), 2500);
    // Remove from DOM after 3.3 seconds (allows CSS transition to finish)
    const removeTimer = setTimeout(() => setDismissed(true), 3300);
    
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, [alreadySeen]);

  // Prevent hydration mismatch by not rendering anything on the server
  if (!isClient || alreadySeen || dismissed) return null;

  return (
    <div className={`splash-screen ${fadeSplash ? 'splash-fade-out' : ''}`}>
      <div className="splash-logo" aria-label="GLYNNE Logo" />
    </div>
  );
}
