'use client';

import React, { useState } from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import LinPromptSection from '@/components/LinPromptSection';
import PolicyBrandBanner from '@/components/PolicyBrandBanner';
import { useTheme } from '@/lib/ThemeContext';
import {
  FiFileText, FiUser, FiTarget, FiDatabase, FiBriefcase,
  FiSettings, FiMinimize2, FiCpu, FiBookOpen, FiCloud,
  FiGlobe, FiShield, FiLock, FiClock, FiUsers,
  FiHelpCircle, FiAlertTriangle, FiLayout, FiMessageCircle,
  FiExternalLink, FiAlertOctagon, FiEdit3, FiMail
} from 'react-icons/fi';

const SECTIONS = [
  { id: 'intro', title: 'Introduction', icon: <FiFileText /> },
  { id: 'responsable', title: '1. Data Controller', icon: <FiUser /> },
  { id: 'alcance', title: '2. Scope', icon: <FiTarget /> },
  { id: 'info-recopilada', title: '3. Information Collected', icon: <FiDatabase /> },
  { id: 'info-empresarial', title: '4. Business Information', icon: <FiBriefcase /> },
  { id: 'finalidades', title: '5. Purposes of Processing', icon: <FiSettings /> },
  { id: 'minimizacion', title: '6. Data Minimization', icon: <FiMinimize2 /> },
  { id: 'ia-datos', title: '7. AI and Data', icon: <FiCpu /> },
  { id: 'datos-entrenamiento', title: '8. Training Data', icon: <FiBookOpen /> },
  { id: 'proveedores', title: '9. External Providers', icon: <FiCloud /> },
  { id: 'transferencias', title: '10. International Transfers', icon: <FiGlobe /> },
  { id: 'seguridad-info', title: '11. Information Security', icon: <FiShield /> },
  { id: 'seguridad-ia', title: '12. AI Systems Security', icon: <FiLock /> },
  { id: 'conservacion', title: '13. Information Retention', icon: <FiClock /> },
  { id: 'derechos', title: '14. Data Subjects Rights', icon: <FiUsers /> },
  { id: 'procedimiento', title: '15. Rights Procedure', icon: <FiHelpCircle /> },
  { id: 'menores', title: '16. Data of Minors', icon: <FiAlertTriangle /> },
  { id: 'cookies', title: '17. Cookies and Technologies', icon: <FiLayout /> },
  { id: 'comunicaciones', title: '18. Commercial Communications', icon: <FiMessageCircle /> },
  { id: 'enlaces', title: '19. Third-Party Links', icon: <FiExternalLink /> },
  { id: 'incidentes', title: '20. Security Incidents', icon: <FiAlertOctagon /> },
  { id: 'modificaciones', title: '21. Modifications', icon: <FiEdit3 /> },
  { id: 'contacto', title: '22. Contact', icon: <FiMail /> }
];

export default function PrivacyPolicy() {
  const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 700px) {
          .desktop-only-sidebar {
            display: none !important;
          }
        }
        .privacy-content h2 {
          font-size: 20px;
          font-weight: 400;
          color: ${isDark ? '#ffffff' : '#111111'};
          margin-bottom: 16px;
          letter-spacing: -0.01em;
        }
        .privacy-content h3 {
          font-size: 16px;
          font-weight: 600;
          color: ${isDark ? '#ffffff' : '#111111'};
          margin-top: 24px;
          margin-bottom: 8px;
        }
        .privacy-content strong {
          font-weight: 600;
          color: ${isDark ? '#ffffff' : '#111111'};
        }
        .privacy-content a {
          color: ${isDark ? '#ffffff' : '#111111'};
          text-decoration: underline;
        }
      `}</style>
      <Header />
      <BackgroundWrapper>
        {/* Full Width Brand Guidelines Banner matching reference image */}
        <div style={{ width: '100%', position: 'relative', zIndex: 10, paddingTop: '80px' }}>
          <PolicyBrandBanner
            titleLine1="Privacidad"
            titleLine2="Políticas"
            subTitle="Normas de gobernanza para la privacidad de datos y el cumplimiento"
            brandLogoText="AXGLYNNE"
            badgeText="AX"
          />
        </div>

        {/* Full Width 100vw Input Section */}
        <div style={{ width: '100%', position: 'relative', zIndex: 10 }}>
          <LinPromptSection hideCard={true} hideOrbCard={true} />
        </div>

        <div style={{
          minHeight: '100vh',
          padding: '40px 40px 80px 40px',
          display: 'flex',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}>
          {/* Main Layout Container */}
          <div style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
            position: 'relative'
          }}>

            {/* Left Spacer - Reserves space for collapsed sidebar */}
            <div className="desktop-only-sidebar" style={{ flex: '0 0 64px', position: 'relative' }}>
              <div style={{ position: 'sticky', top: '120px' }}>

                {/* Floating Island Sidebar - Expands on hover */}
                <aside
                  onMouseEnter={() => setIsSidebarOpen(true)}
                  onMouseLeave={() => setIsSidebarOpen(false)}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isSidebarOpen ? '280px' : '64px',
                    height: 'fit-content',
                    maxHeight: 'calc(100vh - 160px)',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    backgroundColor: isDark ? 'rgba(18, 18, 22, 0.85)' : 'rgba(255, 255, 255, 0.85)',
                    backdropFilter: 'blur(30px)',
                    WebkitBackdropFilter: 'blur(30px)',
                    borderRadius: '24px',
                    padding: isSidebarOpen ? '24px 16px' : '24px 0',
                    border: isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0,0,0,0.06)',
                    boxShadow: isSidebarOpen ? (isDark ? '0 24px 80px rgba(0,0,0,0.6)' : '0 24px 80px rgba(0,0,0,0.1)') : (isDark ? '0 12px 40px rgba(0,0,0,0.4)' : '0 12px 40px rgba(0,0,0,0.04)'),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isSidebarOpen ? 'flex-start' : 'center',
                    gap: '6px',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    zIndex: 100 // Ensure it overlaps the content
                  }}
                >

                  {SECTIONS.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      title={!isSidebarOpen ? section.title : ''}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                        width: isSidebarOpen ? '100%' : '40px',
                        minHeight: '40px',
                        background: 'transparent',
                        border: 'none',
                        padding: isSidebarOpen ? '8px 12px' : '0',
                        borderRadius: '12px',
                        fontSize: '13px',
                        fontWeight: activeSection === section.id ? 500 : 300,
                        color: activeSection === section.id ? (isDark ? '#ffffff' : '#111111') : (isDark ? '#a1a1aa' : '#86868b'),
                        backgroundColor: activeSection === section.id ? (isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0,0,0,0.04)') : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        whiteSpace: 'nowrap'
                      }}
                      onMouseOver={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.color = isDark ? '#ffffff' : '#111111';
                        if (activeSection !== section.id) e.currentTarget.style.backgroundColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0,0,0,0.02)';
                      }}
                      onMouseOut={(e) => {
                        if (activeSection !== section.id) e.currentTarget.style.color = isDark ? '#a1a1aa' : '#86868b';
                        if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        marginRight: isSidebarOpen ? '12px' : '0',
                        transition: 'margin 0.3s ease'
                      }}>
                        {section.icon}
                      </span>

                      <span style={{
                        opacity: isSidebarOpen ? 1 : 0,
                        width: isSidebarOpen ? 'auto' : 0,
                        overflow: 'hidden',
                        transition: 'opacity 0.2s ease, width 0.3s ease',
                        textAlign: 'left',
                        lineHeight: 1.4
                      }}>
                        {section.title}
                      </span>
                    </button>
                  ))}
                </aside>
              </div>
            </div>

            {/* Content Container (Perfectly Centered) */}
            <div style={{
              flex: '1',
              maxWidth: '800px',
              margin: '0 auto',
              padding: '0 0 80px 0',
            }}>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: isDark ? '#ffffff' : '#111111', margin: '40px 0 16px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Privacy Policy
              </h1>
              <p style={{ fontSize: '12px', color: isDark ? '#a1a1aa' : '#86868b', marginBottom: '48px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Last updated: {currentDate}
              </p>

              <div className="privacy-content" style={{ display: 'flex', flexDirection: 'column', gap: '32px', color: isDark ? '#a1a1aa' : '#1d1d1f', fontSize: '15px', lineHeight: 1.7, fontWeight: 300, letterSpacing: '0.01em' }}>

                <section id="intro">
                  <p>At GLYNNE S.A.S. we recognize that information is one of the most important assets of an organization.</p>
                  <p>For this reason, we design our solutions under principles of security, access control, data minimization, and responsible data processing.</p>
                  <p>This Privacy Policy explains how GLYNNE collects, uses, stores, protects, and, where applicable, shares personal information.</p>
                </section>

                <section id="responsable">
                  <h2>1. Data Controller</h2>
                  <p>The party responsible for the processing of personal data shall be:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Corporate Name:</strong> GLYNNE S.A.S.</li>
                    <li><strong>Tax ID (NIT):</strong> 901966512</li>
                    <li><strong>Country:</strong> Colombia</li>
                    <li><strong>Address:</strong> Carrera 2 A 1 24 Sur — Madrid, Cundinamarca · Colombia</li>
                    <li><strong>Privacy Inquiries:</strong> alexglynne7@gmail.com</li>
                    <li><strong>Website:</strong> <a href="https://glynneai.com">https://glynneai.com</a></li>
                  </ul>
                </section>

                <section id="alcance">
                  <h2>2. Scope</h2>
                  <p>This Policy applies to information collected through:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>GLYNNE websites.</li>
                    <li>Forms.</li>
                    <li>Platforms.</li>
                    <li>Applications.</li>
                    <li>Digital services.</li>
                    <li>Communications.</li>
                    <li>Business processes.</li>
                    <li>Contracted services.</li>
                    <li>Systems developed for clients, when GLYNNE is responsible for the corresponding processing.</li>
                  </ul>
                  <p>When GLYNNE processes information exclusively on behalf of a Client, the processing may be additionally regulated by the contract executed between both parties.</p>
                </section>

                <section id="info-recopilada">
                  <h2>3. Information we may collect</h2>
                  <p>Depending on the relationship with GLYNNE, we may collect:</p>

                  <h3>Identifying Information</h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Name.</li>
                    <li>Last names.</li>
                    <li>Company.</li>
                    <li>Job title.</li>
                    <li>Email address.</li>
                    <li>Phone number.</li>
                    <li>Contact information.</li>
                  </ul>

                  <h3>Commercial Information</h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Affiliated company.</li>
                    <li>Information necessary to prepare proposals.</li>
                    <li>Commercial communications.</li>
                    <li>History of contractual relationship.</li>
                  </ul>

                  <h3>Technical Information</h3>
                  <ul style={{ paddingLeft: '20px', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>IP address.</li>
                    <li>Device type.</li>
                    <li>Browser.</li>
                    <li>Operating system.</li>
                    <li>Connection information.</li>
                    <li>Technical logs.</li>
                    <li>Date and time of access.</li>
                    <li>Security-related events.</li>
                  </ul>

                  <h3>Information provided by the user</h3>
                  <p>We may receive information that the user voluntarily chooses to provide via:</p>
                  <ul style={{ paddingLeft: '20px', margin: '8px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <li>Forms.</li>
                    <li>Emails.</li>
                    <li>Chats.</li>
                    <li>Commercial requests.</li>
                    <li>Technical support.</li>
                    <li>Hiring processes.</li>
                  </ul>
                </section>

                <section id="info-empresarial">
                  <h2>4. Business Information Provided by Clients</h2>
                  <p>In the development of enterprise solutions, GLYNNE may have access to information provided by its Clients.</p>
                  <p>This information may include:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Documents.</li>
                    <li>Databases.</li>
                    <li>Operational information.</li>
                    <li>Process information.</li>
                    <li>Financial information.</li>
                    <li>Commercial information.</li>
                    <li>Employee information.</li>
                    <li>Client's customer information.</li>
                    <li>Technical information.</li>
                    <li>System configurations.</li>
                  </ul>
                  <p>The processing of this information will be carried out in accordance with the scope of the contracted service and the applicable instructions of the Client.</p>
                </section>

                <section id="finalidades">
                  <h2>5. Purposes of Processing</h2>
                  <p>The information may be used to:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Provide services.</li>
                    <li>Develop software.</li>
                    <li>Execute automations.</li>
                    <li>Configure systems.</li>
                    <li>Provide support.</li>
                    <li>Manage commercial relationships.</li>
                    <li>Process requests.</li>
                    <li>Maintain security.</li>
                    <li>Detect fraudulent or abusive activities.</li>
                    <li>Maintain and improve infrastructure.</li>
                    <li>Comply with legal obligations.</li>
                    <li>Manage contracts.</li>
                    <li>Respond to requests from data subjects.</li>
                    <li>Maintain technical records necessary to operate the services.</li>
                  </ul>
                  <p>GLYNNE will not use personal information for purposes incompatible with those informed to the data subject, unless there is a legal basis that allows such processing.</p>
                </section>

                <section id="minimizacion">
                  <h2>6. Principle of Minimization</h2>
                  <p>GLYNNE seeks to limit the processed information to that which is strictly necessary to execute a specific function or service.</p>
                  <p>In architectures that allow it, systems can be designed to prevent a component from having indiscriminate access to all available information.</p>
                </section>

                <section id="ia-datos">
                  <h2>7. Artificial Intelligence and Data</h2>
                  <p>Some of GLYNNE's services may incorporate artificial intelligence technologies.</p>
                  <p>Depending on the architecture, the data may be processed by:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Proprietary models.</li>
                    <li>Third-party models.</li>
                    <li>Artificial intelligence APIs.</li>
                    <li>Information retrieval systems.</li>
                    <li>Classification systems.</li>
                    <li>Processing services.</li>
                  </ul>
                  <p>GLYNNE will endeavor to implement technical mechanisms that allow controlling the information each component can receive.</p>
                  <p>When a project requires the use of an external artificial intelligence provider, the processing of information will be subject to the contractual and technical conditions applicable to the service.</p>
                </section>

                <section id="datos-entrenamiento">
                  <h2>8. Data Used for Training</h2>
                  <p>GLYNNE shall not interpret technical access to Client information as automatic authorization to use such information to train general-purpose artificial intelligence models.</p>
                  <p>When processing of this nature is necessary, there must be a legal basis, authorization, or contractual provision that allows it.</p>

                  <div style={{ marginTop: '16px', padding: '16px', backgroundColor: 'rgba(255, 59, 48, 0.05)', borderLeft: '4px solid #ff3b30', borderRadius: '4px' }}>
                    <p style={{ margin: 0, fontWeight: 500, color: '#ff3b30', fontSize: '13px' }}>[VALIDATE THIS SECTION WITH THE LAWYER AND ADAPT IT TO GLYNNE'S ACTUAL TECHNICAL POLICY.]</p>
                  </div>
                </section>

                <section id="proveedores">
                  <h2>9. External Providers</h2>
                  <p>GLYNNE may use technological providers to deliver its services.</p>
                  <p>These providers may render services related to:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Infrastructure.</li>
                    <li>Storage.</li>
                    <li>Databases.</li>
                    <li>Computing.</li>
                    <li>Artificial intelligence.</li>
                    <li>Authentication.</li>
                    <li>Security.</li>
                    <li>Analytics.</li>
                    <li>Communication.</li>
                    <li>Monitoring.</li>
                    <li>Deployment.</li>
                  </ul>
                  <p>GLYNNE will seek to select appropriate providers for the nature of the service and establish the corresponding contractual and technical measures.</p>
                </section>

                <section id="transferencias">
                  <h2>10. International Transfers and Transmissions</h2>
                  <p>Some technological providers used by GLYNNE may operate infrastructure located outside of Colombia.</p>
                  <p>When it is appropriate to carry out international transfers or transmissions of personal data, GLYNNE will apply the requirements established by Colombian legislation and the corresponding legal and contractual mechanisms.</p>
                </section>

                <section id="seguridad-info">
                  <h2>11. Information Security</h2>
                  <p>GLYNNE adopts reasonable technical and organizational measures aimed at protecting information against:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Unauthorized access.</li>
                    <li>Alteration.</li>
                    <li>Loss.</li>
                    <li>Improper disclosure.</li>
                    <li>Destruction.</li>
                    <li>Unauthorized use.</li>
                  </ul>
                  <p>Security measures may include:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Authentication.</li>
                    <li>Access control.</li>
                    <li>Permission management.</li>
                    <li>Credential protection.</li>
                    <li>Encryption when applicable.</li>
                    <li>Service segmentation.</li>
                    <li>Monitoring.</li>
                    <li>Event logging.</li>
                    <li>Infrastructure management.</li>
                    <li>Component updating.</li>
                    <li>Incident management.</li>
                  </ul>
                  <p>The exact nature of the measures will depend on the service and the information processed.</p>
                </section>

                <section id="seguridad-ia">
                  <h2>12. Security Applied to AI Systems</h2>
                  <p>In projects where GLYNNE integrates artificial intelligence, security can be applied not only to the model but to the entire architecture.</p>
                  <p>A model does not necessarily need direct access to all of an organization's information.</p>
                  <p>Depending on the system, GLYNNE can design mechanisms through which:</p>
                  <p style={{ fontWeight: 500, margin: '16px 0', padding: '16px', backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.03)', color: isDark ? '#ffffff' : '#111111', borderRadius: '8px', textAlign: 'center' }}>
                    Information → permissions → software → tools → model → result
                  </p>
                  <p>This allows controlling what information can be queried, what tools an agent can use, and what actions it can execute.</p>
                  <p>The specific implementation will depend on the contracted project.</p>
                </section>

                <section id="conservacion">
                  <h2>13. Information Retention</h2>
                  <p>GLYNNE will retain the information for the time necessary to fulfill the purpose for which it was collected, fulfill contractual obligations, address legal obligations, or protect its rights.</p>
                  <p>Specific periods may vary depending on:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Type of information.</li>
                    <li>Nature of the service.</li>
                    <li>Contractual relationship.</li>
                    <li>Legal requirements.</li>
                    <li>Security needs.</li>
                    <li>Accounting or tax obligations.</li>
                  </ul>
                  <p>When it is no longer necessary, the information may be deleted, anonymized, or subjected to retention mechanisms when a legal obligation requires it.</p>
                </section>

                <section id="derechos">
                  <h2>14. Rights of Data Subjects</h2>
                  <p>In accordance with applicable Colombian legislation, data subjects may exercise their corresponding rights, including, when applicable:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>To know the processed information.</li>
                    <li>To request updates.</li>
                    <li>To request rectification.</li>
                    <li>To request correction.</li>
                    <li>To request information about the processing.</li>
                    <li>To submit inquiries.</li>
                    <li>To submit complaints.</li>
                    <li>To request deletion when legally applicable.</li>
                    <li>To revoke authorizations when applicable.</li>
                  </ul>
                </section>

                <section id="procedimiento">
                  <h2>15. Procedure to Exercise Rights</h2>
                  <p>Data subjects may submit requests to the email:</p>
                  <p style={{ fontWeight: 500, color: isDark ? '#ffffff' : '#111111' }}>alexglynne7@gmail.com</p>
                  <p style={{ marginTop: '16px' }}>The request must contain, at a minimum:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Name of the data subject.</li>
                    <li>Applicable identification document or mechanism.</li>
                    <li>Description of the request.</li>
                    <li>Information that allows identifying the related data.</li>
                    <li>Contact details to receive a response.</li>
                  </ul>
                  <p>When the request is submitted by a representative, the corresponding authorizations must be accredited.</p>
                  <p>GLYNNE will address the requests within the terms established by applicable legislation.</p>
                </section>

                <section id="menores">
                  <h2>16. Data of Minors</h2>
                  <p>GLYNNE's enterprise services are not specifically designed for minors.</p>
                  <p>GLYNNE does not seek to deliberately collect personal information from minors without the corresponding authorization or applicable legal basis.</p>
                  <p>When GLYNNE participates in an enterprise project involving minors' information, the processing must comply with the special rules applicable to this type of information.</p>
                </section>

                <section id="cookies">
                  <h2>17. Cookies and Similar Technologies</h2>
                  <p>GLYNNE websites and platforms may use cookies and similar technologies to:</p>
                  <ul style={{ paddingLeft: '20px', margin: '16px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li>Maintain functionalities.</li>
                    <li>Remember preferences.</li>
                    <li>Analyze usage.</li>
                    <li>Improve performance.</li>
                    <li>Protect services.</li>
                    <li>Obtain statistics.</li>
                  </ul>
                  <p>The specific use of cookies will depend on the tools implemented on each site.</p>
                  <p>For more information, please refer to our Cookie Policy.</p>
                </section>

                <section id="comunicaciones">
                  <h2>18. Commercial Communications</h2>
                  <p>GLYNNE may send communications related to services, news, products, events, or commercial information when there is a legal basis or authorization that allows it.</p>
                  <p>Users may request to stop receiving certain commercial communications through the mechanisms available in each communication or by contacting GLYNNE.</p>
                </section>

                <section id="enlaces">
                  <h2>19. Third-Party Links</h2>
                  <p>GLYNNE's websites may contain links to external sites.</p>
                  <p>GLYNNE does not control the privacy policies of such sites and recommends reviewing their respective policies before providing personal information.</p>
                </section>

                <section id="incidentes">
                  <h2>20. Security Incidents</h2>
                  <p>GLYNNE has internal procedures aimed at identifying and managing security incidents.</p>
                  <p>When an incident may generate legal notification obligations, GLYNNE will carry out the corresponding communications in accordance with applicable legislation and current contractual obligations.</p>
                </section>

                <section id="modificaciones">
                  <h2>21. Modifications</h2>
                  <p>GLYNNE may update this Privacy Policy to reflect technological, operational, legal, or regulatory changes.</p>
                  <p>The current version will be published indicating the date of update.</p>
                </section>

                <section id="contacto" style={{ marginTop: '24px', paddingTop: '24px', borderTop: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0,0,0,0.1)' }}>
                  <h2>22. Contact</h2>
                  <p>For inquiries related to privacy and data protection:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '16px 0 0 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <li><strong>Corporate Name:</strong> GLYNNE S.A.S.</li>
                    <li><strong>Tax ID (NIT):</strong> 901966512</li>
                    <li><strong>Privacy Email:</strong> alexglynne7@gmail.com</li>
                    <li><strong>Website:</strong> <a href="https://glynneai.com">https://glynneai.com</a></li>
                    <li><strong>Last Updated:</strong> {currentDate}</li>
                  </ul>
                </section>

              </div>
            </div>

            {/* Right Spacer (Matches left sidebar width to keep text perfectly centered on screen) */}
            <div className="desktop-only-sidebar" style={{ flex: '0 0 64px', display: 'block' }}></div>

          </div>
        </div>
        <Footer />
      </BackgroundWrapper>
    </>
  );
}
