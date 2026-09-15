"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close the menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  return (
    <>
      <style>{`
        /* Mega dropdown animated container */
        .glynne-mega-dropdown {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          z-index: 9998; /* Just below the fixed-header which should be 9999 */
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          box-shadow: none;
          
          /* Animation */
          opacity: 0;
          transform: translateY(-100%);
          pointer-events: none;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .glynne-mega-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .mega-menu-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 60px;
          width: 80%;
          max-width: 1400px;
        }

        .mega-section {
          display: flex;
          flex-direction: column;
        }

        .mega-section-title {
          font-size: 11px;
          font-weight: 600;
          color: #86868b;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 20px;
        }

        .mega-nav-link {
          font-size: 15px;
          font-weight: 400;
          color: #111111;
          text-decoration: none;
          margin-bottom: 12px;
          transition: all 0.2s ease;
          display: block;
        }

        .mega-nav-link:hover {
          color: #86868b;
          transform: translateX(4px);
        }

        .mega-nav-link.active {
          font-weight: 600;
        }
          
        .chevron-btn {
          background: transparent;
          border: none;
          box-shadow: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #111;
          margin-left: 8px;
        }
        
        .chevron-btn:hover {
          background: rgba(0,0,0,0.08);
          transform: scale(1.05);
        }

        .chevron-icon {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .chevron-icon.open {
          transform: rotate(180deg);
        }
      `}</style>

      {/* The Dropdown Menu */}
      <div 
        className={`glynne-mega-dropdown ${isOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BackgroundWrapper theme="light">
          <div style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '140px 20px 60px 20px', width: '100%' }}>
            <div className="mega-menu-grid">
          
          {/* Section 1 */}
          <div className="mega-section">
            <span className="mega-section-title">Explore Core Architecture</span>
            <Link href="/" className={`mega-nav-link ${pathname === '/' ? 'active' : ''}`}>Return to Main Hub</Link>
            <Link href="/Solutions" className={`mega-nav-link ${pathname === '/Solutions' ? 'active' : ''}`}>Our Most Radical Project</Link>
            <Link href="/ia_vailable" className={`mega-nav-link ${pathname === '/ia_vailable' ? 'active' : ''}`}>Explore Available AI Models</Link>
            <Link href="/Segurity" className={`mega-nav-link ${pathname === '/Segurity' ? 'active' : ''}`}>Contain and Govern AI Power</Link>
          </div>

          {/* Section 2 */}
          <div className="mega-section">
            <span className="mega-section-title">Interact With AI Systems</span>
            <Link href="/AX_chat" className={`mega-nav-link ${pathname === '/AX_chat' ? 'active' : ''}`}>Chat with AX Assistant</Link>
            <Link href="/AX_voice" className={`mega-nav-link ${pathname === '/AX_voice' ? 'active' : ''}`}>Initiate AX Voice Call</Link>
          </div>

          {/* Section 3 */}
          <div className="mega-section">
            <span className="mega-section-title">Learn About Our Vision</span>
            <Link href="/About" className={`mega-nav-link ${pathname === '/About' ? 'active' : ''}`}>Discover Our Company Vision</Link>
            <Link href="/contact" className={`mega-nav-link ${pathname === '/contact' ? 'active' : ''}`}>Get in Touch Directly</Link>
          </div>

          {/* Section 4 */}
          <div className="mega-section">
            <span className="mega-section-title">Manage Secure Access</span>
            <Link href="/login" className={`mega-nav-link ${pathname === '/login' ? 'active' : ''}`}>Access Your Secure Dashboard</Link>
          </div>

          {/* Section 5 */}
          <div className="mega-section">
            <span className="mega-section-title">Review Legal Policies</span>
            <Link href="/terms-of-service" className={`mega-nav-link ${pathname === '/terms-of-service' ? 'active' : ''}`}>Terms of Service</Link>
            <Link href="/privacy-policy" className={`mega-nav-link ${pathname === '/privacy-policy' ? 'active' : ''}`}>Privacy Policy</Link>
            <Link href="/security-data-protection" className={`mega-nav-link ${pathname === '/security-data-protection' ? 'active' : ''}`}>Security & Data Protection</Link>
          </div>

            </div>
          </div>
        </BackgroundWrapper>
      </div>

      {/* The Dynamic Island Header */}
      <header 
        className={`fixed-header ${isScrolled ? "header-visible" : "header-hidden"}`} 
        style={{ zIndex: 9999 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img 
              src="/logos/GLYNNE.svg" 
              alt="GLYNNE Logo" 
              className="header-logo" 
            />
          </Link>
        </div>

        <nav className="nav-links">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link 
              href="/login" 
              style={{
                padding: '0.4rem 1.2rem',
                borderRadius: '999px',
                backgroundColor: 'transparent',
                color: '#111111',
                border: '1px solid rgba(0,0,0,0.2)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseOver={(e) => { e.currentTarget.style.borderColor = '#111111'; e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.03)' }}
              onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Log In
            </Link>
            <Link href="/contact" className="nav-btn" style={{ textDecoration: 'none' }}>Contact</Link>
          </div>
        </nav>

      </header>
    </>
  );
}
