"use client";

import Link from "next/link";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import "./PanelFooter.css";

export default function PanelFooter() {
  return (
    <footer className="panel-footer">
      <div className="panel-footer-content">
        
        {/* Brand Section */}
        <div className="panel-footer-brand">
          <div className="panel-footer-logo-container">
            <img src="/logos/GLYNNE.svg" alt="GLYNNE Logo" className="panel-footer-logo" />
          </div>
          <p className="panel-footer-desc">
            Empowering the future through next-generation infrastructure and advanced solutions. 
            We build the tools that shape tomorrow's technology landscape.
          </p>
          
          <div className="panel-footer-socials">
            <a href="#" className="panel-footer-social-btn">
              <FaTwitter size={18} />
            </a>
            <a href="#" className="panel-footer-social-btn">
              <FaLinkedin size={18} />
            </a>
            <a href="#" className="panel-footer-social-btn">
              <FaGithub size={18} />
            </a>
            <a href="#" className="panel-footer-social-btn">
              <FaInstagram size={18} />
            </a>
          </div>
        </div>

        {/* Links Section */}
        <div className="panel-footer-links-col">
          <h4 className="panel-footer-title">Platform</h4>
          <Link href="/Solutions" className="panel-footer-link">Solutions</Link>
          <Link href="/ia_vailable" className="panel-footer-link">AI Available</Link>
          <Link href="/AX_voice" className="panel-footer-link">AX Voice</Link>
          <Link href="/AX_chat" className="panel-footer-link">AX Chat</Link>
          <Link href="/security-data-protection" className="panel-footer-link">Security & Data</Link>
        </div>

        <div className="panel-footer-links-col">
          <h4 className="panel-footer-title">Company</h4>
          <Link href="/About" className="panel-footer-link">About Us</Link>
          <Link href="/contact" className="panel-footer-link">Contact</Link>
          <Link href="/login" className="panel-footer-link">Customer Login</Link>
        </div>

        {/* Newsletter Section */}
        <div className="panel-footer-links-col">
          <h4 className="panel-footer-title">Stay Updated</h4>
          <p className="panel-footer-newsletter-text">
            Subscribe to our newsletter for the latest news and updates.
          </p>
          <div className="panel-footer-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="panel-footer-input"
            />
            <button className="panel-footer-submit">
              Subscribe
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="panel-footer-bottom">
        <p className="panel-footer-copyright">
          © {new Date().getFullYear()} GLYNNE. All rights reserved.
        </p>
        <div className="panel-footer-legal">
          <Link href="/privacy-policy" className="panel-footer-legal-link">Privacy Policy</Link>
          <Link href="/terms-of-service" className="panel-footer-legal-link">Terms of Service</Link>
          <Link href="/cookie-policy" className="panel-footer-legal-link">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
