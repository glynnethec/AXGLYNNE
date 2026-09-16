"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { supabaseGoogle, signOut } from '@/lib/supabaseClient';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close the menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Auth listener
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data } = await supabaseGoogle.auth.getSession();
        setIsLoggedIn(!!data?.session);
      } catch (e) {
        console.error(e);
      }
    };
    checkSession();

    const { data: { subscription } } = supabaseGoogle.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

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

  const handleLogout = async () => {
    await signOut();
  };

  const handleMouseEnter = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 700) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 150);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
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

        .mobile-menu-btn {
          display: none;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px;
          margin-left: 4px;
          z-index: 10000;
          color: #111111;
        }

        @media (max-width: 700px) {
          .mobile-menu-btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .mega-menu-grid {
            grid-template-columns: 1fr;
            gap: 20px;
            width: 100%;
          }
          .glynne-mega-dropdown {
            height: 100dvh;
            overflow-y: auto;
            position: fixed;
          }
          .mega-dropdown-content {
            padding: 110px 24px 40px 24px !important;
            justify-content: flex-start !important;
            min-height: min-content;
          }
          .mega-nav-link {
            font-size: 14px;
            padding: 4px 0;
            margin-bottom: 4px;
          }
          .mega-section-title {
            font-size: 11px;
            margin-bottom: 8px;
          }
        }
      `}</style>

      {/* The Dropdown Menu */}
      <div 
        className={`glynne-mega-dropdown ${isOpen ? 'open' : ''}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <BackgroundWrapper theme="light">
          <div className="mega-dropdown-content" style={{ position: 'relative', zIndex: 1, display: 'flex', justifyContent: 'center', padding: '110px 24px 40px 24px', width: '100%' }}>
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
            <Link href="/contact" className="nav-btn" style={{ textDecoration: 'none' }}>Contact</Link>
            
            {/* Divisor vertical suave */}
            <div style={{ width: '1px', height: '16px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '0 4px' }}></div>

            <Link 
              href={isLoggedIn ? "/Panel" : "/login"} 
              style={{
                padding: isLoggedIn ? '0' : '0.4rem 1.2rem',
                borderRadius: '999px',
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: '#111111',
                border: '1px solid rgba(0,0,0,0.08)',
                fontSize: '0.85rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '34px',
                width: isLoggedIn ? '34px' : 'auto',
                minWidth: isLoggedIn ? '34px' : '80px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
              onMouseOver={(e) => { 
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.2)'; 
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'; 
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseOut={(e) => { 
                e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; 
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)'; 
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {isLoggedIn ? <FaUser size={13} color="#333" /> : <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser size={10} color="#888" /> Log In</span>}
            </Link>
            
            {isLoggedIn && (
              <button 
                onClick={handleLogout}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#111111',
                  border: '1px solid rgba(0,0,0,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
                }}
                onMouseOver={(e) => { 
                  e.currentTarget.style.borderColor = 'rgba(220,38,38,0.3)';
                  e.currentTarget.style.backgroundColor = 'rgba(254,242,242,0.8)';
                  e.currentTarget.style.color = '#dc2626';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseOut={(e) => { 
                  e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
                  e.currentTarget.style.color = '#111111';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                title="Log Out"
              >
                <FaSignOutAlt size={13} />
              </button>
            )}
            
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </nav>

      </header>
    </>
  );
}
