"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
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
        
        <div className="footer-pre-tags">
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
            <img src="/logos/GLYNNE.svg" alt="GLYNNE Logo" className="footer-logo" />
          </div>
          <p className="footer-desc">
            Empowering the future through next-generation infrastructure and advanced solutions. 
            We build the tools that shape tomorrow's technology landscape.
          </p>
          
          <div className="footer-socials">
            <a href="#" className="footer-social-btn">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="footer-social-btn">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="footer-social-btn">
              <FaGithub size={18} />
            </a>
            <a href="#" className="footer-social-btn">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="footer-links-col">
          <h4 className="footer-title">Platform</h4>
          <Link href="/Solutions" className="footer-link">Solutions</Link>
          <Link href="#" className="footer-link">Infrastructure</Link>
          <Link href="#" className="footer-link">Integrations</Link>
          <Link href="#" className="footer-link">API Documentation</Link>
        </div>

        <div className="footer-links-col">
          <h4 className="footer-title">Company</h4>
          <Link href="/About" className="footer-link">About Us</Link>
          <Link href="#" className="footer-link">Careers</Link>
          <Link href="#" className="footer-link">Blog</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
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
          © {new Date().getFullYear()} GLYNNE. All rights reserved.
        </p>
        <div className="footer-legal">
          <Link href="#" className="footer-legal-link">Privacy Policy</Link>
          <Link href="#" className="footer-legal-link">Terms of Service</Link>
          <Link href="#" className="footer-legal-link">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
