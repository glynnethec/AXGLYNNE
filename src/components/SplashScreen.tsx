'use client';

import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [fadeSplash, setFadeSplash] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    let shouldSkip = false;
    try {
      const navEntries = typeof performance !== 'undefined' && performance.getEntriesByType
        ? (performance.getEntriesByType('navigation') as PerformanceNavigationTiming[])
        : [];
      const isReload = navEntries.length > 0 && navEntries[0].type === 'reload';
      if (!isReload && sessionStorage.getItem('hasSeenSplash') === 'true') {
        shouldSkip = true;
      } else {
        document.documentElement.removeAttribute('data-splash-skip');
      }
    } catch {
      // ignore storage errors
    }

    if (shouldSkip) {
      setDismissed(true);
      return;
    }

    // Iniciar el fade-out suave del splash a los 2.2 segundos
    const fadeTimer = setTimeout(() => {
      setFadeSplash(true);
    }, 2200);

    // Desmontar del DOM tras completar la transición CSS (3.0s) y marcar como visto en la sesión
    const removeTimer = setTimeout(() => {
      try {
        sessionStorage.setItem('hasSeenSplash', 'true');
      } catch {
        // ignore storage errors
      }
      setDismissed(true);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (dismissed) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `(function(){try{var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];var r=n&&n.type==='reload';if(!r&&sessionStorage.getItem('hasSeenSplash')==='true'){document.documentElement.setAttribute('data-splash-skip','true');}}catch(e){}})();`,
        }}
      />
      <div className={`splash-screen ${fadeSplash ? 'splash-fade-out' : ''}`}>
        <div className="splash-logo" aria-label="GLYNNE Logo" />
      </div>
    </>
  );
}
