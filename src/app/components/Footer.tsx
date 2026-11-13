"use client";

import Link from "next/link";
import Image from "next/image";
import { FaYoutube, FaLinkedin, FaInstagram, FaShieldAlt } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      
      {/* Corporate Info Pre-Footer */}
      <div className="footer-pre">
        <div className="footer-pre-title">GLYNNE S.A.S.</div>
        <p className="footer-pre-text">Simplified Joint Stock Company (S.A.S.)</p>
        <p className="footer-pre-text">Tax ID (NIT): 901966512</p>
        <p className="footer-pre-text">Carrera 2 A 1 24 Sur — Madrid, Cundinamarca · Colombia</p>
        <p className="footer-pre-text">Phone: +57 312 345 5328</p>
        <p className="footer-pre-text">Email: alexglynne7@gmail.com</p>
        <p className="footer-pre-text" style={{ marginTop: '8px' }}>Registered activity: Engineering activities and other related technical consulting activities.</p>
        
        <a 
          href="https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas" 
          target="_blank" 
          rel="noopener noreferrer"
          className="footer-pre-text"
          style={{ 
            marginTop: '12px', 
            display: 'inline-block', 
            textDecoration: 'underline', 
            color: '#1d1d1f',
            fontWeight: 500 
          }}
        >
          Verify all our registration data ↗
        </a>

        <div className="footer-pre-tags" style={{ marginTop: '20px' }}>
          <span>Technology</span>
          <span>·</span>
          <span>Software</span>
          <span>·</span>
          <span>Artificial Intelligence</span>
        </div>
      </div>

      <div className="footer-content">
        
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo-container">
            <Image src="/logos/GLYNNE.svg" alt="AXGLYNNE Enterprise AI Platform Footer Logo" width={48} height={48} className="footer-logo" />
          </div>
          <p className="footer-desc">
            Empowering the future through next-generation infrastructure and advanced solutions. 
            We build the tools that shape tomorrow's technology landscape.
          </p>
          
          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/company/glynne/posts/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="AXGLYNNE (GLYNNE S.A.S.) Official LinkedIn Company Page"
              title="AXGLYNNE (GLYNNE S.A.S.) Official LinkedIn Company Page"
              className="footer-social-btn"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href="https://www.youtube.com/@AXGLYNNE"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="AXGLYNNE Official YouTube Channel"
              title="AXGLYNNE Official YouTube Channel (@AXGLYNNE)"
              className="footer-social-btn"
            >
              <FaYoutube size={18} />
            </a>
            <a
              href="https://www.instagram.com/axglynne/"
              target="_blank"
              rel="me noopener noreferrer"
              aria-label="AXGLYNNE Official Instagram (@axglynne)"
              title="AXGLYNNE Official Instagram (@axglynne)"
              className="footer-social-btn"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://www.informacolombia.com/directorio-empresas/informacion-empresa/glynne-sas"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GLYNNE S.A.S. Corporate Registration NIT 901966512"
              title="GLYNNE S.A.S. Official Corporate Registry"
              className="footer-social-btn"
            >
              <FaShieldAlt size={17} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links-col">
          <h4 className="footer-title">Platform & Tools</h4>
          <Link href="/TrainModel" className="footer-link">QLoRA Fine-Tuning Studio</Link>
          <Link href="/ia_vailable" className="footer-link">AI Models & Benchmarks</Link>
          <Link href="/Servex_solution" className="footer-link">Enterprise AI (SERVEX)</Link>
          <Link href="/models_provider" className="footer-link">Models Provider & Sub-APIs</Link>
          <Link href="/Librarymodel" className="footer-link">Open-Weights Library</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Company & Engineering</h4>
          <Link href="/Methodology" className="footer-link">AI Research Methodology</Link>
          <Link href="/docs" className="footer-link">Developer Documentation</Link>
          <Link href="/Segurity" className="footer-link">Enterprise Security</Link>
          <Link href="/About" className="footer-link">About AXGLYNNE</Link>
          <Link href="/contact" className="footer-link">Contact Engineering</Link>
        </div>

        {/* Newsletter Section */}
        <div className="footer-links-col">
          <h4 className="footer-title">Stay Updated</h4>
          <p className="footer-newsletter-text">
            Subscribe to our newsletter for the latest news and updates.
          </p>
          <div className="footer-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="footer-input"
            />
            <button className="footer-submit">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          © {new Date().getFullYear()} AXGLYNNE (GLYNNE S.A.S. · NIT 901966512). All rights reserved.
        </p>
        <div className="footer-legal">
          <Link href="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
          <Link href="/terms-of-service" className="footer-legal-link">Terms of Service</Link>
          <Link href="/cookie-policy" className="footer-legal-link">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
