"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import { FaUser, FaChevronDown, FaCubes, FaRobot, FaBuilding, FaShieldAlt } from 'react-icons/fa';
import { supabaseGoogle, signOut } from '@/lib/supabaseClient';

interface NavItem {
  href: string;
  label: string;
  desc: string;
}

interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'platform',
    label: 'Platform & Solutions',
    icon: <FaCubes size={13} />,
    items: [
      { href: '/', label: 'Main Hub', desc: 'Central control center for the GLYNNE platform' },
      { href: '/Methodology', label: 'Governance Methodology', desc: 'How we transform enterprises into digital systems' },
      { href: '/Solutions', label: 'Servex Case Study (XML BPO)', desc: 'Radical project in schema conversion and data matrices' },
      { href: '/Industries', label: 'B2B Process Automation', desc: 'Industry-tailored workflow and operational automation' },
      { href: '/ia_vailable', label: 'Available AI Models', desc: 'Catalog of frontier LLMs and fine-tuned private models' },
      { href: '/Segurity', label: 'Security & Control', desc: 'Deterministic guardrails and permission layers' }
    ]
  },
  {
    id: 'ai-systems',
    label: 'AI Systems',
    icon: <FaRobot size={13} />,
    items: [
      { href: '/AX_chat', label: 'Chat with AX Assistant', desc: 'Autonomous interaction with reasoning engine' },
      { href: '/AX_voice', label: 'Initiate AX Voice Call', desc: 'Real-time interactive voice communication' }
    ]
  },
  {
    id: 'company',
    label: 'Company & Vision',
    icon: <FaBuilding size={13} />,
    items: [
      { href: '/About', label: 'Vision & Architecture', desc: 'Discover GLYNNE infrastructure principles' },
      { href: '/Blog', label: 'Insights & Blog', desc: 'Engineering articles on enterprise AI' },
      { href: '/faq', label: 'Frequently Asked Questions', desc: 'Clear answers on integration, control, and privacy' },
      { href: '/contact', label: 'Direct Contact', desc: 'Initiate architectural design with our team' },
      { href: '/Support', label: 'Support Center', desc: 'Technical assistance and operational support' }
    ]
  },
  {
    id: 'access-legal',
    label: 'Access & Legal',
    icon: <FaShieldAlt size={13} />,
    items: [
      { href: '/login', label: 'Dashboard Access', desc: 'Manage enterprise nodes and access credentials' },
      { href: '/terms-of-service', label: 'Terms of Service', desc: 'Infrastructure usage terms and conditions' },
      { href: '/privacy-policy', label: 'Privacy Policy', desc: 'Corporate data sovereignty and protection' },
      { href: '/security-data-protection', label: 'Data Security', desc: 'Encryption and regulatory compliance standards' }
    ]
  }
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('platform');
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>('platform');
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
    
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnterCategory = (catId: string) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveTab(catId);
    setIsOpen(true);
  };

  const handleMouseLeaveHeader = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 900) return;
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileAccordion = (catId: string) => {
    setOpenMobileAccordion(openMobileAccordion === catId ? null : catId);
  };

  if (pathname === '/AX_chat' || pathname === '/Panel') {
    return null;
  }

  const currentCategory = NAV_CATEGORIES.find(c => c.id === activeTab) || NAV_CATEGORIES[0];

  return (
    <>
      <style>{`
        .glynne-mega-dropdown {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 9998;
          display: flex;
          flex-direction: column;
          border-bottom: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 20px 40px rgba(0,0,0,0.04);
          opacity: 0;
          transform: translateY(-100%);
          pointer-events: none;
          transition: opacity 0.3s ease, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glynne-mega-dropdown.open {
          opacity: 1;
          transform: translateY(0);
          pointer-events: auto;
        }

        .category-tab-btn {
          background: transparent;
          border: none;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 500;
          color: #555;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .category-tab-btn:hover, .category-tab-btn.active {
          color: #111;
          background: rgba(0,0,0,0.04);
        }

        .subnav-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 16px;
          width: 100%;
          max-width: 1100px;
        }

        .subnav-card-link {
          display: flex;
          flex-direction: column;
          padding: 14px 18px;
          border-radius: 14px;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.03);
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .subnav-card-link:hover {
          background: rgba(0,0,0,0.05);
          border-color: rgba(0,0,0,0.08);
          transform: translateY(-1px);
        }

        .subnav-card-title {
          font-size: 14px;
          font-weight: 600;
          color: #111;
          margin-bottom: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .subnav-card-desc {
          font-size: 12px;
          color: #777;
          font-weight: 300;
          line-height: 1.4;
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

        @media (min-width: 901px) {
          .mobile-only-accordion {
            display: none !important;
          }
        }

        @media (max-width: 900px) {
          .desktop-nav-categories {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
            align-items: center;
            justify-content: center;
          }
          .glynne-mega-dropdown {
            height: 100dvh;
            overflow-y: auto;
            position: fixed;
          }
          .mega-dropdown-content {
            padding: 90px 20px 40px 20px !important;
          }
          .subnav-grid {
            grid-template-columns: 1fr !important;
            gap: 10px;
          }
        }
      `}</style>

      {/* The Mega Dropdown Container */}
      <div 
        className={`glynne-mega-dropdown ${isOpen ? 'open' : ''}`}
        onMouseEnter={() => {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          setIsOpen(true);
        }}
        onMouseLeave={handleMouseLeaveHeader}
      >
        <BackgroundWrapper theme="light">
          <div className="mega-dropdown-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '100px 24px 40px 24px', width: '100%' }}>
            
            {/* Desktop Tabs Header inside Mega Dropdown */}
            <div className="desktop-nav-categories" style={{ display: 'flex', gap: '8px', marginBottom: '28px', borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '14px', width: '100%', maxWidth: '1100px', justifyContent: 'center' }}>
              {NAV_CATEGORIES.map(cat => (
                <button
                  key={cat.id}
                  className={`category-tab-btn ${activeTab === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(cat.id)}
                  onMouseEnter={() => setActiveTab(cat.id)}
                >
                  {cat.icon}
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>

            {/* Sub-items View - Desktop */}
            <div className="desktop-nav-categories" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div className="subnav-grid">
                {currentCategory.items.map(item => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`subnav-card-link ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="subnav-card-title">
                      {item.label}
                      <span style={{ fontSize: '12px', opacity: 0.4 }}>→</span>
                    </span>
                    <span className="subnav-card-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile View - Accordion Sections */}
            <div className="mobile-only-accordion" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {NAV_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ borderBottom: '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
                  <button
                    onClick={() => toggleMobileAccordion(cat.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'transparent',
                      border: 'none',
                      padding: '10px 0',
                      fontSize: '15px',
                      fontWeight: 600,
                      color: '#111',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cat.icon} {cat.label}
                    </span>
                    <FaChevronDown style={{ transform: openMobileAccordion === cat.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} size={12} color="#888" />
                  </button>

                  {openMobileAccordion === cat.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingLeft: '8px' }}>
                      {cat.items.map(item => (
                        <Link
                          key={item.href}
                          href={item.href}
                          style={{
                            padding: '10px 14px',
                            borderRadius: '10px',
                            backgroundColor: 'rgba(0,0,0,0.03)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column'
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          <span style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>{item.label}</span>
                          <span style={{ fontSize: '11px', color: '#777' }}>{item.desc}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </BackgroundWrapper>
      </div>

      {/* Dynamic Floating Navbar Header */}
      <header 
        className={`fixed-header ${isScrolled ? "header-visible" : "header-hidden"}`} 
        style={{ zIndex: 9999 }}
        onMouseLeave={handleMouseLeaveHeader}
      >
        {/* 1. Left: Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <img 
              src="/logos/GLYNNE.svg" 
              alt="AXGLYNNE Enterprise AI Platform Logo" 
              className="header-logo" 
            />
          </Link>
        </div>

        {/* 2. Center: Desktop Category Buttons */}
        <div className="desktop-nav-categories" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
          {NAV_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`category-tab-btn ${isOpen && activeTab === cat.id ? 'active' : ''}`}
              onMouseEnter={() => handleMouseEnterCategory(cat.id)}
              onClick={() => {
                if (isOpen && activeTab === cat.id) {
                  setIsOpen(false);
                } else {
                  setActiveTab(cat.id);
                  setIsOpen(true);
                }
              }}
            >
              <span>{cat.label}</span>
              <FaChevronDown size={10} style={{ transform: isOpen && activeTab === cat.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', opacity: 0.6 }} />
            </button>
          ))}
        </div>

        <nav className="nav-links">
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
            
            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu">
              {isOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
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
