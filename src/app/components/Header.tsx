"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import {
  FaUser,
  FaChevronDown,
  FaCubes,
  FaRobot,
  FaBuilding,
  FaShieldAlt,
  FaBrain,
  FaMicrochip,
  FaComments,
  FaMicrophone,
  FaHdd,
  FaBolt,
  FaBriefcase,
  FaLock,
  FaChartLine,
  FaBook
} from 'react-icons/fa';
import { supabaseGoogle } from '@/lib/supabaseClient';
import { useTheme } from '@/lib/ThemeContext';

interface NavItem {
  href: string;
  label: string;
  desc: string;
  badge?: string;
  icon?: React.ReactNode;
}

interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: NavItem[];
}

const NAV_CATEGORIES: NavCategory[] = [
  {
    id: 'ai-tools',
    label: 'AI Tools',
    icon: <FaRobot size={13} />,
    items: [
      {
        href: '/models_provider',
        label: 'Model APIs for Development',
        badge: 'FREE INTEGRATION',
        desc: 'Connect open-source models (Llama, DeepSeek, NVIDIA NIM) to your dev applications without paying high commercial API fees while building.',
        icon: <FaMicrochip size={14} />
      },
      {
        href: '/TrainModel',
        label: 'Custom QLoRA Fine-Tuning',
        badge: 'COMPUTE SAVINGS',
        desc: 'Adapt open-weights models with proprietary business knowledge, reducing compute expenses by up to 90% through efficient fine-tuning.',
        icon: <FaBrain size={14} />
      },
      {
        href: '/Librarymodel',
        label: 'Open Source Offline Models',
        badge: '100% LOCAL',
        desc: 'Download and run open-source models directly on local hardware privately, securely, and completely offline.',
        icon: <FaHdd size={14} />
      },
      {
        href: '/AX_chat',
        label: 'AX Conversational Assistant',
        badge: 'LIVE DEMO',
        desc: 'Test our real-time conversational chat: inspect reasoning, query operational data, and interact immediately.',
        icon: <FaComments size={14} />
      },
      {
        href: '/AX_voice',
        label: 'Live Real-Time Voice Agent',
        badge: 'NATURAL VOICE',
        desc: 'Ultra-low latency spoken dialogues with natural tone to test voice interactions directly with autonomous AI.',
        icon: <FaMicrophone size={14} />
      },
      {
        href: '/ia_vailable',
        label: 'Model Catalog & Benchmarks',
        badge: 'BENCHMARK',
        desc: 'Compare technical specs, throughput, latency, and resource footprint across all available models for your project.',
        icon: <FaCubes size={14} />
      }
    ]
  },
  {
    id: 'solutions',
    label: 'Solutions & Cases',
    icon: <FaCubes size={13} />,
    items: [
      {
        href: '/Servex_solution',
        label: 'Enterprise AI Solutions',
        badge: 'HIGH IMPACT',
        desc: 'Transform manual processes into high-efficiency automated pipelines that multiply team productivity.',
        icon: <FaBriefcase size={14} />
      },
      {
        href: '/Industries',
        label: 'Industry-Tailored AI',
        badge: 'TAILORED',
        desc: 'Custom strategies and solutions tailored for your industry: Healthcare, Finance, Legal, Commerce, and Smart Manufacturing.',
        icon: <FaBuilding size={14} />
      },
      {
        href: '/',
        label: 'Platform Overview',
        desc: 'Discover how GLYNNE unites frontier AI research and operational engineering to transform modern enterprises.',
        icon: <FaBolt size={14} />
      },
      {
        href: '/precios',
        label: 'Transparent Plans & Pricing',
        badge: 'FLEXIBLE',
        desc: 'Clear, predictable pricing structured to scale with your project growth, with zero hidden fees and measurable ROI.',
        icon: <FaChartLine size={14} />
      }
    ]
  },
  {
    id: 'company',
    label: 'Company & Vision',
    icon: <FaBuilding size={13} />,
    items: [
      {
        href: '/About',
        label: 'About Us & Our Mission',
        desc: 'Meet the team of AI scientists and engineers exploring the frontier of machine intelligence and neural modeling.',
        icon: <FaBuilding size={14} />
      },
      {
        href: '/contact',
        label: 'Discuss Your Project',
        badge: 'DIRECT CONTACT',
        desc: 'Book a discovery session with our specialists to design the AI solution that will elevate your business.',
        icon: <FaComments size={14} />
      },
      {
        href: '/CEO_GLYNNE',
        label: 'Leadership & Strategic Vision',
        desc: 'Learn about the architectural vision and innovation philosophy of founder and chief architect Alexander Quiroga.',
        icon: <FaUser size={14} />
      },
      {
        href: '/docs',
        label: 'Documentation & Quickstart',
        badge: 'DEV HUB',
        desc: 'Quickstart guides, endpoints, and code examples to integrate our full suite of tools in minutes.',
        icon: <FaBook size={14} />
      }
    ]
  },
  {
    id: 'access-legal',
    label: 'Access & Security',
    icon: <FaShieldAlt size={13} />,
    items: [
      {
        href: '/login',
        label: 'Log In / Control Console',
        badge: 'YOUR WORKSPACE',
        desc: 'Access your private administration console to monitor models, access keys, and active projects.',
        icon: <FaLock size={14} />
      },
      {
        href: '/terms-of-service',
        label: 'Terms of Service',
        desc: 'Total transparency: review our terms of use, licensing, and enterprise service level agreements with complete peace of mind.',
        icon: <FaShieldAlt size={14} />
      },
      {
        href: '/privacy-policy',
        label: 'Privacy & Data Shielding',
        badge: '100% SECURE',
        desc: 'Your data is strictly yours. Enterprise-grade protection, rigorous encryption, and guaranteed confidentiality.',
        icon: <FaShieldAlt size={14} />
      }
    ]
  }
];

export default function Header() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('ai-tools');
  const [openMobileAccordion, setOpenMobileAccordion] = useState<string | null>('ai-tools');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Close the menu when navigating
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(false);
    }, 0);
    return () => clearTimeout(timer);
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
    }, 350);
  };

  const toggleMobileMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileAccordion = (catId: string) => {
    setOpenMobileAccordion(openMobileAccordion === catId ? null : catId);
  };

  if (pathname === '/AX_chat' || pathname === '/Panel' || pathname?.startsWith('/models_provider')) {
    return null;
  }

  const currentCategory = NAV_CATEGORIES.find(c => c.id === activeTab) || NAV_CATEGORIES[0];

  return (
    <>
      <style>{`
        .fixed-header {
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1), transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }

        .fixed-header.header-hidden {
          opacity: 0 !important;
          pointer-events: none !important;
          transform: translate(-50%, -24px) !important;
        }

        .fixed-header.header-visible {
          opacity: 1 !important;
          pointer-events: auto !important;
          transform: translate(-50%, 0) !important;
        }

        .glynne-mega-dropdown {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          background: ${isDark ? 'rgba(10, 10, 14, 0.96)' : 'rgba(255, 255, 255, 0.96)'};
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          z-index: 9998;
          display: flex;
          flex-direction: column;
          border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0,0,0,0.06)'};
          box-shadow: ${isDark ? '0 20px 40px rgba(0,0,0,0.5)' : '0 20px 40px rgba(0,0,0,0.04)'};
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
          grid-template-columns: repeat(auto-fill, minmax(310px, 1fr));
          gap: 14px;
          width: 100%;
          max-width: 1100px;
        }

        .subnav-card-link {
          display: flex;
          flex-direction: column;
          padding: 13px 16px;
          border-radius: 14px;
          background: rgba(0,0,0,0.02);
          border: 1px solid rgba(0,0,0,0.04);
          text-decoration: none;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .subnav-card-link:hover {
          background: rgba(0,0,0,0.05);
          border-color: rgba(0,0,0,0.09);
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(0,0,0,0.05);
        }

        .subnav-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .subnav-card-title-group {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .subnav-card-icon-box {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0,0,0,0.04);
          color: #111111;
          font-size: 13px;
          flex-shrink: 0;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .subnav-card-link:hover .subnav-card-icon-box {
          background: rgba(0,0,0,0.08);
          transform: scale(1.08);
        }

        .subnav-card-title {
          font-size: 13.5px;
          font-weight: 600;
          color: #111;
          display: flex;
          align-items: center;
          letter-spacing: -0.01em;
        }

        .subnav-card-badge {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          padding: 2px 7px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.05);
          color: #333333;
          border: 1px solid rgba(0, 0, 0, 0.08);
          white-space: nowrap;
        }

        .subnav-card-arrow {
          font-size: 12px;
          opacity: 0.35;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .subnav-card-link:hover .subnav-card-arrow {
          transform: translateX(3px);
          opacity: 0.8;
        }

        .subnav-card-desc {
          font-size: 11.5px;
          color: #555555;
          font-weight: 400;
          line-height: 1.45;
          margin-left: 37px;
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
          .subnav-card-desc {
            margin-left: 0;
          }
        }

        [data-theme="dark"] .glynne-mega-dropdown {
          background: rgba(10, 10, 14, 0.96);
          border-bottom-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
        }

        [data-theme="dark"] .category-tab-btn {
          color: #a1a1aa;
        }

        [data-theme="dark"] .category-tab-btn:hover,
        [data-theme="dark"] .category-tab-btn.active {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
        }

        [data-theme="dark"] .subnav-card-link {
          background: rgba(255, 255, 255, 0.035);
          border-color: rgba(255, 255, 255, 0.06);
        }

        [data-theme="dark"] .subnav-card-link:hover {
          background: rgba(255, 255, 255, 0.075);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
        }

        [data-theme="dark"] .subnav-card-icon-box {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        [data-theme="dark"] .subnav-card-link:hover .subnav-card-icon-box {
          background: rgba(255, 255, 255, 0.14);
        }

        [data-theme="dark"] .subnav-card-title {
          color: #ffffff;
        }

        [data-theme="dark"] .subnav-card-desc {
          color: #cbd5e1;
        }

        [data-theme="dark"] .subnav-card-badge {
          background: rgba(255, 255, 255, 0.1);
          color: #f4f4f5;
          border-color: rgba(255, 255, 255, 0.16);
        }

        [data-theme="dark"] .mobile-menu-btn {
          color: #ffffff;
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
        <BackgroundWrapper>
          <div className="mega-dropdown-content" style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '118px 24px 44px 24px', width: '100%' }}>

            {/* Sub-items View - Desktop */}
            <div className="desktop-nav-categories" style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <div className="subnav-grid">
                {currentCategory.items.map(item => (
                  <Link
                    key={item.href + item.label}
                    href={item.href}
                    className={`subnav-card-link ${pathname === item.href ? 'active' : ''}`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="subnav-card-header">
                      <div className="subnav-card-title-group">
                        {item.icon && (
                          <div className="subnav-card-icon-box">
                            {item.icon}
                          </div>
                        )}
                        <span className="subnav-card-title">
                          {item.label}
                        </span>
                      </div>
                      {item.badge ? (
                        <span className="subnav-card-badge">{item.badge}</span>
                      ) : (
                        <span className="subnav-card-arrow">→</span>
                      )}
                    </div>
                    <span className="subnav-card-desc">{item.desc}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Mobile View - Accordion Sections */}
            <div className="mobile-only-accordion" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {NAV_CATEGORIES.map(cat => (
                <div key={cat.id} style={{ borderBottom: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.06)', paddingBottom: '12px' }}>
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
                      color: isDark ? '#ffffff' : '#111111',
                      cursor: 'pointer'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {cat.icon} {cat.label}
                    </span>
                    <FaChevronDown style={{ transform: openMobileAccordion === cat.id ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease' }} size={12} color={isDark ? '#a1a1aa' : '#888888'} />
                  </button>

                  {openMobileAccordion === cat.id && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingLeft: '4px' }}>
                      {cat.items.map(item => (
                        <Link
                          key={item.href + item.label}
                          href={item.href}
                          style={{
                            padding: '12px 14px',
                            borderRadius: '12px',
                            backgroundColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                            border: isDark ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,0,0,0.04)',
                            textDecoration: 'none',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '4px'
                          }}
                          onClick={() => setIsOpen(false)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '13.5px', fontWeight: 600, color: isDark ? '#ffffff' : '#111111', display: 'flex', alignItems: 'center', gap: '8px' }}>
                              {item.icon && <span style={{ opacity: 0.85, display: 'flex', alignItems: 'center' }}>{item.icon}</span>}
                              {item.label}
                            </span>
                            {item.badge && (
                              <span style={{
                                fontSize: '8.5px',
                                fontWeight: 700,
                                textTransform: 'uppercase',
                                padding: '2px 6px',
                                borderRadius: '999px',
                                background: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.05)',
                                color: isDark ? '#d4d4d8' : '#444444'
                              }}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <span style={{ fontSize: '11px', color: isDark ? '#a1a1aa' : '#666666', lineHeight: 1.4 }}>{item.desc}</span>
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
        className={`fixed-header ${(isScrolled || isOpen) ? "header-visible" : "header-hidden"} ${isScrolled ? "scrolled" : ""}`}
        style={{
          zIndex: 9999,
          backgroundColor: isDark ? 'rgba(15, 15, 18, 0.92)' : '#ffffff',
          borderColor: isDark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.08)',
          boxShadow: isDark ? '0 12px 32px rgba(0, 0, 0, 0.5)' : '0 12px 32px rgba(0, 0, 0, 0.08)'
        }}
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
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>

            <Link
              href={isLoggedIn ? "/Panel" : "/login"}
              style={{
                padding: isLoggedIn ? '0' : '0.4rem 1.2rem',
                borderRadius: '999px',
                backgroundColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.5)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                color: theme === 'dark' ? '#ffffff' : '#111111',
                border: theme === 'dark' ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0,0,0,0.08)',
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
            >
              {isLoggedIn ? <FaUser size={13} color={theme === 'dark' ? '#ffffff' : '#333333'} /> : <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FaUser size={10} color={theme === 'dark' ? '#aaa' : '#888'} /> Log In</span>}
            </Link>

            <button className="mobile-menu-btn" onClick={toggleMobileMenu} aria-label="Toggle menu" style={{ color: isDark ? '#ffffff' : '#111111' }}>
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
