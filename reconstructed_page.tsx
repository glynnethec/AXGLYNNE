{"step_index":0,"source":"USER_EXPLICIT","type":"USER_INPUT","status":"DONE","created_at":"2026-09-10T23:59:11Z","content":"<USER_REQUEST>\n\nI would like you to conduct a comprehensive analysis of the project and create a Markdown file containing a summary of everything handled by the agents.\n</USER_REQUEST>\n<ADDITIONAL_METADATA>\nThe current local time is: 2026-09-10T18:59:11-05:00.\n\nThe user's current state is as follows:\nActive Document: /Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/page.tsx (LANGUAGE_TSX)\nCursor is on line: 529\nOther open documents:\n- /Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/page.tsx (LANGUAGE_TSX)\nNo browser pages are currently open.\nRunning terminal commands:\n- npm run dev (in /Users/glynne/Desktop/GLYNNE_SITE_2026, running for 22h20m48s)\n</ADDITIONAL_METADATA>\n<USER_SETTINGS_CHANGE>\nThe user changed setting `Model Selection` from None to Gemini 3.1 Pro (High). No need to comment on this change if the user doesn't ask about it. If reporting what model you are, please use a human readable name instead of the exact string.\n</USER_SETTINGS_CHANGE>"}
{"step_index":1,"source":"SYSTEM","type":"CONVERSATION_HISTORY","status":"DONE","created_at":"2026-09-10T23:59:11Z","content":"# Conversation History\nHere are the conversation IDs, titles, and summaries of your most recent 12 conversations, in reverse chronological order:\n\n<conversation_summaries>\n## Conversation f7dd43ea-178b-4c8f-9c69-00a1c8f2d7a1: Resetting GLYNNE_SITE_2026 Project\n- Created: 2026-09-10T01:25:48Z\n- Last modified: 2026-09-10T23:57:07Z\n\n## Conversation 209f3089-2422-4f89-970c-c5242994706f: Initializing Next.js Project\n- Created: 2026-09-03T01:06:03Z\n- Last modified: 2026-09-10T01:27:20Z\n\n## Conversation c2be351a-8075-4654-9beb-c930ffdd7b18: Standardizing Decimal CSV Formatting\n- Created: 2026-09-02T19:38:21Z\n- Last modified: 2026-09-02T21:21:34Z\n\n## Conversation c6391dda-1751-4570-8e9c-3b28dad1b2ee: Styling File Upload Containers\n- Created: 2026-09-02T04:54:21Z\n- Last modified: 2026-09-02T19:33:19Z\n\n## Conversation a39e2d71-886c-4c9a-a13f-ec6fb87fc290: Fixing CSV Format Compatibility\n- Created: 2026-09-02T01:49:29Z\n- Last modified: 2026-09-02T04:50:06Z\n\n## Conversation 8300eb71-6a30-4245-8c9c-7a6bd2511cc6: Optimizing WBG Data Import Process\n- Created: 2026-08-31T13:04:29Z\n- Last modified: 2026-09-02T01:48:54Z\n\n## Conversation f8eee002-f347-42cf-817f-47bcc118ffd8: Debugging Seating Module Conversion\n- Created: 2026-08-30T15:48:15Z\n- Last modified: 2026-08-31T12:52:02Z\n\n## Conversation fa8760d8-5c4d-4c25-8d8b-4dd0c97e420a: Reverting Project To Commit\n- Created: 2026-08-24T20:32:04Z\n- Last modified: 2026-08-26T14:26:54Z\n\n## Conversation e22763e7-5e68-4144-93ab-555cdcfa40d5: Implementing XML To CSV Converter\n- Created: 2026-08-09T12:55:51Z\n- Last modified: 2026-08-24T20:30:49Z\n\n## Conversation da19fa0c-828c-43da-ab7d-8bb04e1bff9b: Finalizing XML To CSV Converter\n- Created: 2026-08-09T12:56:44Z\n- Last modified: 2026-08-09T12:57:14Z\n\n### USER Objective:\nFinalizing XML To CSV Converter\n\nThe user's goal is to complete the implementation of the `XmlToCsvConverter` component within the `Actualizer_XML_Tables` page. The objective is to finalize the file processing, data flattening logic, and CSV export functionality using PapaParse, ensuring the component is fully functional for the WBT service section while maintaining architectural consistency.\n\n## Conversation 4d9d09e1-2ead-4d18-8149-08d49c91fd32: Developing XML To CSV Converter\n- Created: 2026-08-09T12:21:43Z\n- Last modified: 2026-08-09T12:51:03Z\n\n### USER Objective:\nDeveloping XML To CSV Converter\n\nThe user's primary goal is to implement a new `XmlToCsvConverter` module across multiple service sections (WBT, WBO, WBA, WBS, WBD, WBG, LESRO). This involves creating a reusable React component that enables users to upload XML files, preview the processed data in a table, and download the output as a CSV file using PapaParse. The objective is to achieve this by reusing the existing XML flattening logic without modifying the current `Actualizer_XML_` module, ensuring architectural independence and system stability while maintaining a consistent UI across all defined modules.\n\n## Conversation a91ab7ef-0cf2-4d85-b3d3-4f43d08a7676: XML Table Actualization Development\n- Created: 2026-07-17T19:19:54Z\n- Last modified: 2026-07-30T01:05:35Z\n\n</conversation_summaries>"}


<USER_REQUEST>
Build Error


Module not found: Can't resolve './page.module.css'
./src/app/page.tsx (2:1)

Error: Module not found: Can't resolve './page.module.css'
  1 | import Image from "next/image";
> 2 | import styles from "./page.module.css";
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  3 |
  4 | export default function Home() {
  5 |   return (

https://nextjs.org/docs/messages/module-not-found
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-09-10T19:12:26-05:00.

The user's current state is as follows:
Active Document: /Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/page.tsx (LANGUAGE_TSX)
Cursor is on line: 529
Other open documents:
- /Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/page.tsx (LANGUAGE_TSX)
- /Users/glynne/Desktop/GLYNNE_SITE_2026/src/app/layout.tsx (LANGUAGE_TSX)
Browser State:
  Page 2141A0A47D4F119324411C228827DCCB (Blackbox: The high-trust platform for frontier inference) - https://www.blackbox.ai/ [ACTIVE]
    Viewport: 1200x883, Page Height: 7235
Running terminal commands:
- npm run dev (in /Users/glynne/Desktop/GLYNNE_SITE_2026, running for 12m43s)
</ADDITIONAL_METADATA>
    
    const cx = Math.floor(x / 96);
    const cy = Math.floor(y / 96);

    if (cx !== lastCellRef.current.x || cy !== lastCellRef.current.y) {
      lastCellRef.current = { x: cx, y: cy };
      
      const numNeighbors = Math.floor(Math.random() * 4) + 1; // 1 to 4 random neighbors
      const neighbors = [];
      const possibleOffsets = [
        [-1, 0], [1, 0], [0, -1], [0, 1],
        [-1, -1], [1, -1], [-1, 1], [1, 1],
        [-2, 0], [2, 0], [0, -2], [0, 2]
      ];
      
      const shuffled = possibleOffsets.sort(() => 0.5 - Math.random());
      for (let i = 0; i < numNeighbors; i++) {
        neighbors.push({
          dx: shuffled[i][0],
          dy: shuffled[i][1],
          opacity: (Math.random() * 0.03) + 0.02 // Opacity between 0.02 and 0.05
        });
      }

      const newStep = {
        id: stepIdRef.current++,
        cx,
        cy,
        neighbors
      };

      setHistory(prev => [newStep, ...prev].slice(0, 8)); // Keep last 8 steps for fade out
    }
  };

  const handleMouseLeave = () => {
    setHistory([]);
    lastCellRef.current = { x: -1, y: -1 };
  };

  useEffect(() => {
    // Start fading out the splash after 2.5 seconds
    const fadeTimer = setTimeout(() => setFadeSplash(true), 2500);
    // Remove from DOM after 3.3 seconds (allows CSS transition to finish)
    const removeTimer = setTimeout(() => setShowSplash(false), 3300);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);


  useEffect(() => {
    // Initialize Lenis for buttery smooth momentum scrolling
    const lenis = new Lenis({
      lerp: 0.08, // Fluid, natural momentum
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    gsap.registerPlugin(ScrollTrigger);

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const frameCount = 240;
    const currentFrame = (index: number) =>
      `/GSAPimg/frames/frame_${String(index + 1).padStart(4, '0')}.png`;

    const images: HTMLImageElement[] = [];
    const seq = { frame: 0, xOffset: 25, scaleMultiplier: 1.15 }; // Start shifted right and slightly larger

    // Preload all images
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      images.push(img);
    }

    const render = () => {
      const img = images[Math.round(seq.frame)];
      if (!img || !img.complete) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const isMobile = window.innerWidth <= 768;

      // Use Math.min (contain) to guarantee the entire server is always 100% visible on any screen
      const baseScale = Math.min(canvas.width / img.width, canvas.height / img.height);
      const scale = baseScale * (isMobile ? 0.9 : 0.55) * seq.scaleMultiplier; // Start larger and smoothly scale down

      const baseX = (canvas.width / 2) - (img.width / 2) * scale;
      const y = (canvas.height / 2) - (img.height / 2) * scale;

      // On mobile, ignore xOffset and keep it perfectly centered
      const x = baseX + (isMobile ? 0 : (canvas.width * (seq.xOffset / 100)));

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(img, x, y, img.width * scale, img.height * scale);
    };

    // Render first frame as soon as it loads
    images[0].onload = render;
    window.addEventListener('resize', render);

    const ctx = gsap.context(() => {
      // 2. Set Initial Spatial States
      // Canvas element remains perfectly centered to avoid edge clipping
      gsap.set(canvasRef.current, { xPercent: -50, yPercent: -50, x: 0 });

      // ScrollTrigger timeline for canvas and text
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: '+=300%', // Reduced scroll distance for tighter control (3 viewports)
// MISSING LINE 161
// MISSING LINE 162
// MISSING LINE 163
// MISSING LINE 164
// MISSING LINE 165
// MISSING LINE 166
// MISSING LINE 167
// MISSING LINE 168
// MISSING LINE 169
// MISSING LINE 170
// MISSING LINE 171
// MISSING LINE 172
// MISSING LINE 173
// MISSING LINE 174
// MISSING LINE 175
// MISSING LINE 176
// MISSING LINE 177
// MISSING LINE 178
// MISSING LINE 179
// MISSING LINE 180
// MISSING LINE 181
// MISSING LINE 182
// MISSING LINE 183
// MISSING LINE 184
// MISSING LINE 185
// MISSING LINE 186
// MISSING LINE 187
// MISSING LINE 188
// MISSING LINE 189
// MISSING LINE 190
// MISSING LINE 191
// MISSING LINE 192
// MISSING LINE 193
// MISSING LINE 194
// MISSING LINE 195
// MISSING LINE 196
// MISSING LINE 197
// MISSING LINE 198
// MISSING LINE 199
// MISSING LINE 200
// MISSING LINE 201
// MISSING LINE 202
// MISSING LINE 203
// MISSING LINE 204
// MISSING LINE 205
// MISSING LINE 206
// MISSING LINE 207
// MISSING LINE 208
// MISSING LINE 209
// MISSING LINE 210
// MISSING LINE 211
// MISSING LINE 212
// MISSING LINE 213
// MISSING LINE 214
// MISSING LINE 215
// MISSING LINE 216
// MISSING LINE 217
// MISSING LINE 218
// MISSING LINE 219
// MISSING LINE 220
// MISSING LINE 221
// MISSING LINE 222
// MISSING LINE 223
// MISSING LINE 224
// MISSING LINE 225
// MISSING LINE 226
// MISSING LINE 227
// MISSING LINE 228
// MISSING LINE 229
// MISSING LINE 230
// MISSING LINE 231
// MISSING LINE 232
// MISSING LINE 233
// MISSING LINE 234
// MISSING LINE 235
// MISSING LINE 236
// MISSING LINE 237
// MISSING LINE 238
// MISSING LINE 239
    <main>
      {/* SPLASH SCREEN */}
      {showSplash && (
        <div className={`splash-screen ${fadeSplash ? 'splash-fade-out' : ''}`}>
          <div className="splash-logo" aria-label="GLYNNE Logo" />
        </div>
      )}

      {/* CONTINUOUS BACKGROUND WRAPPER */}
      <div 
        style={{ position: 'relative', width: '100%', backgroundColor: '#ffffff', overflow: 'hidden' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Interactive SVG Grid */}
        <svg 
          width="100%" 
          height="100%" 
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}
        >
          <defs>
            <pattern id="blackbox-grid" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M 96 0 L 0 0 0 96" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blackbox-grid)" />
          
          {history.map((step, index) => {
            const isCurrent = index === 0;
            return (
              <g key={step.id} style={{ animation: 'cellFadeIn 0.25s ease forwards' }}>
                {/* Random Neighbors */}
                {step.neighbors.map((n, i) => (
                  <rect 
                    key={i}
                    x={(step.cx + n.dx) * 96} 
                    y={(step.cy + n.dy) * 96} 
                    width="96" 
                    height="96" 
                    fill={`rgba(0,0,0,${isCurrent ? n.opacity : 0})`} 
                    style={{ transition: 'fill 0.6s ease' }} 
                  />
                ))}
                {/* Center Cell */}
                <rect 
                  x={step.cx * 96} 
                  y={step.cy * 96} 
                  width="96" 
                  height="96" 
                  fill={`rgba(0,0,0,${isCurrent ? 0.07 : 0})`} 
                  style={{ transition: 'fill 0.6s ease' }} 
                />
              </g>
            );
          })}
        </svg>

        {/* SECTION 1: HERO */}
        <section className="intro-hero" style={{ position: 'relative', backgroundColor: 'transparent' }}>
          <div className="hero-titles" style={{ zIndex: 1, pointerEvents: 'none' }}>
            <h1>AXGLYNNE</h1>
            <p className="hero-subtitle">Artificial Intelligence Systems Integration</p>
          </div>
        </section>

        {/* SECTION 2: AI PROMPT */}
        <section style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          backgroundColor: 'transparent', 
          position: 'relative', 
          zIndex: 10,
          padding: '0 1.5rem 12rem',
          marginTop: '-4vh' // Pull up closer to the title
        }}>
        {/* Main Content Wrapper */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          width: '100%', 
          maxWidth: '1080px', 
          backgroundColor: '#ffffff',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,1)',
          borderRadius: '40px',
          padding: '4rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Inner Content Wrapper */}
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          
          {/* Minimalist Social Proof Pill */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            backgroundColor: '#f5f5f7', 
            borderRadius: '999px',
            padding: '6px 16px',
            marginBottom: '32px'
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1d1d1f"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.05em', textTransform: 'uppercase' }}>4.98/5 Average</span>
            <div style={{ width: '3px', height: '3px', borderRadius: '50%', backgroundColor: '#d2d2d7' }} />
            <span style={{ fontSize: '11px', fontWeight: 500, color: '#86868b', letterSpacing: '0.05em', textTransform: 'uppercase' }}>58,980+ Users</span>
          </div>

          {/* Clean Typography Header */}
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: 300, 
            color: '#111111', 
            letterSpacing: '-0.01em',
            margin: '0 0 12px 0',
            textAlign: 'center'
          }}>
            Meet Lin.
          </h2>
          <p style={{ 
            fontSize: '13px', 
            color: '#8f8f96', 
            fontWeight: 300, 
            letterSpacing: '0.02em',
            margin: '0 0 40px 0',
            textAlign: 'center',
            maxWidth: '480px',
            lineHeight: 1.6
          }}>
            The AXGLYNNE AI engine designed to show you who we are and what we are capable of.
          </p>

          {/* Groq-style AI Prompt Box */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '680px',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '16px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
            border: '1px solid rgba(0,0,0,0.06)',
            marginBottom: '80px',
          }}>
            <textarea 
              placeholder="Ask Lin about us..." 
              rows={3}
              style={{
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                color: '#1d1d1f',
                width: '100%',
                padding: '4px',
                fontWeight: 300,
                backgroundColor: 'transparent',
                fontFamily: 'inherit',
                resize: 'none',
                lineHeight: 1.5,
                letterSpacing: '0.01em'
              }}
            />
            
            {/* Tools Row */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginTop: '12px',
            }}>
              {/* Left Tools (Icons) */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {/* Model Selector / Settings */}
                <div style={{ 
                  display: 'flex', alignItems: 'center', gap: '6px', 
                  padding: '6px 12px', backgroundColor: '#f5f5f7', 
                  borderRadius: '16px', cursor: 'pointer', fontSize: '11px', fontWeight: 500, color: '#1d1d1f', letterSpacing: '0.02em', textTransform: 'uppercase'
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                  Lin Core
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
                
                {/* Attachment Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                </button>

                {/* Microphone Icon */}
                <button style={{ background: 'transparent', border: 'none', padding: '6px', cursor: 'pointer', color: '#86868b', display: 'flex' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                </button>
              </div>

              {/* Submit Button (Arrow Icon) */}
              <button style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                width: '32px', 
                height: '32px', 
                backgroundColor: '#111111', 
                borderRadius: '50%', 
                color: '#ffffff',
                cursor: 'pointer',
                border: 'none',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
              </button>
            </div>
          </div>

          </div>
        </div>
        </section>

        {/* SECTION 3: VIDEO SHOWCASE */}
        <section style={{ 
          width: '100%', 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          backgroundColor: 'transparent', 
          position: 'relative', 
          zIndex: 10,
          padding: '0 1.5rem 12rem'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            width: '100%', 
            maxWidth: '1080px', 
            backgroundColor: '#ffffff',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.03)',
            borderRadius: '40px',
            padding: '2rem'
          }}>
            <h3 style={{ fontSize: '16px', fontWeight: 500, color: '#86868b', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Grabación
            </h3>
            <div style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', backgroundColor: '#000000', boxShadow: '0 12px 30px rgba(0,0,0,0.05)' }}>
              <video 
                src="/grabacionp.mov" 
                autoPlay 
                loop 
                muted 
                playsInline 
                onLoadedMetadata={() => ScrollTrigger.refresh()}
                style={{ width: '100%', display: 'block', objectFit: 'cover', minHeight: '300px' }}
              />
            </div>
          </div>
        </section>

      </div>

      <div ref={containerRef} className="hero-container">
        <canvas ref={canvasRef} className="gsap-canvas" />
        <div ref={overlayRef} className="glass-overlay" />

        <div className="overlay-content">

          {/* FASE 01 */}
          <div ref={phase1Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 800px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
              Do you see this black box?
            </h2>
            <p className="body-text" style={{ fontSize: '1.1rem', color: '#1d1d1f', fontWeight: 500, marginTop: '0.75rem', letterSpacing: '-0.01em', overflowWrap: 'break-word' }}>
              We don’t start by building AI. We start by understanding your business.
            </p>
          </div>

          {/* FASE 02 */}
          <div ref={phase2Ref} style={{ width: '100%', maxWidth: 'clamp(320px, 90vw, 750px)', pointerEvents: 'none', boxSizing: 'border-box' }}>
            <h2 className="title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#1d1d1f', margin: 0, overflowWrap: 'break-word' }}>
