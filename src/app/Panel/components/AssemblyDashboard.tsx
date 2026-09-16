'use client';

import React, { useState } from 'react';
import { 
  FaChevronLeft, FaChevronRight, FaPen, FaEraser, FaMousePointer, 
  FaShareAlt, FaEye, FaPlus, FaCheckCircle, FaCube
} from 'react-icons/fa';
import './AssemblyDashboard.css';

export default function AssemblyDashboard() {
  const [activeStep, setActiveStep] = useState(3);
  
  return (
    <div className="assembly-dashboard-container">
      {/* TOP BAR */}
      <div className="ad-topbar">
        <div className="ad-topbar-left">
          <button className="ad-icon-btn"><FaChevronLeft size={10} style={{ marginRight: '6px' }} /> Back</button>
          <span className="ad-draft-badge">Draft</span>
          <span className="ad-title">Assembly steps <span className="ad-chevron-down">v</span></span>
        </div>
        
        <div className="ad-toolbar">
          <button className="ad-tool-btn active"><FaPen size={12} /></button>
          <button className="ad-tool-btn"><FaEraser size={12} /></button>
          <button className="ad-tool-btn"><FaMousePointer size={12} /></button>
          <div className="ad-divider"></div>
          <span className="ad-speed">Speed <span className="ad-speed-controls">- 1.0 +</span></span>
          <div className="ad-divider"></div>
          <button className="ad-tool-btn text-btn"><FaShareAlt size={12} style={{ marginRight: '6px' }} /> Share</button>
          <button className="ad-export-btn">Export</button>
        </div>

        <div className="ad-topbar-right">
          <span className="ad-user-email">alexglynne7@gmail.com</span>
          <div className="ad-user-avatar">
            <img src="/logos/GLYNNE.svg" alt="User" />
          </div>
        </div>
      </div>

      <div className="ad-main-layout">
        
        {/* CENTER 3D VIEWER */}
        <div className="ad-viewer">
          <div className="ad-viewer-grid"></div>
          
          {/* Floating Widget: Hide Parts */}
          <div className="ad-hide-parts">
            <div className="ad-hide-header">
              <FaEye size={12} /> Hide Parts
            </div>
            <div className="ad-part-preview">
              <div className="ad-cylinder-mini"></div>
            </div>
            <div className="ad-part-footer">
              <button className="ad-cube-btn"><FaCube size={10}/></button>
              <span>Part 1</span>
              <button className="ad-cube-btn"><FaCube size={10}/></button>
            </div>
          </div>
          
          {/* Mock 3D Center Object */}
          <div className="ad-3d-object">
            <div className="ad-cylinder-layer layer-top"></div>
            <div className="ad-cylinder-layer layer-mid"></div>
            <div className="ad-cylinder-layer layer-base"></div>
            
            <div className="ad-gizmo">
              <div className="gizmo-axis axis-x"></div>
              <div className="gizmo-axis axis-y"></div>
              <div className="gizmo-axis axis-z"></div>
              <div className="gizmo-center"></div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="ad-sidebar">
          <div className="ad-sidebar-nav">
            <button className="ad-nav-btn"><FaChevronLeft size={10}/> Prev</button>
            <button className="ad-nav-btn active">Next <FaChevronRight size={10}/></button>
          </div>
          
          <div className="ad-info-row">
            <span className="ad-info-label">Step</span>
            <span className="ad-info-value">03</span>
          </div>
          <div className="ad-info-row divider">
            <span className="ad-info-label">Subassembly</span>
            <span className="ad-info-value">01</span>
          </div>

          <div className="ad-section">
            <h4 className="ad-section-title">Name</h4>
            <p className="ad-section-text">Add part 10 to the assembly / ball 1 inch /</p>
          </div>

          <div className="ad-section">
            <h4 className="ad-section-title">Notes <span className="ad-badge">3</span></h4>
            
            <div className="ad-note-item">
              <div className="ad-note-bullet"></div>
              <p>Check that the distances are set evenly</p>
              <div className="ad-note-circle"><FaCheckCircle size={10} color="#34d399"/></div>
            </div>
            <div className="ad-note-item">
              <div className="ad-note-bullet"></div>
              <p>Check that the distances are set evenly</p>
              <div className="ad-note-circle"><FaCheckCircle size={10} color="#34d399"/></div>
            </div>
            <div className="ad-note-item">
              <div className="ad-note-bullet"></div>
              <p>Check that the distances are set evenly</p>
              <div className="ad-note-circle"><FaCheckCircle size={10} color="#34d399"/></div>
            </div>
            
            <button className="ad-add-note-btn">Add note <FaPlus size={10} style={{ marginLeft: '4px' }} /></button>
          </div>
        </div>
      </div>

      {/* BOTTOM TIMELINE */}
      <div className="ad-timeline-container">
        <div className="ad-timeline-controls">
          <span className="ad-view-label">View:</span>
          <div className="ad-view-toggle">
            <span className="active">L</span>
            <span>M</span>
            <span>S</span>
          </div>
          <div className="ad-timeline-slider">
            <div className="ad-slider-track">
              <div className="ad-slider-thumb"></div>
            </div>
          </div>
        </div>

        <div className="ad-timeline-cards">
          {[1,2,3,4,5,6,7].map(num => (
            <div key={num} className={`ad-card ${activeStep === num ? 'active' : ''}`} onClick={() => setActiveStep(num)}>
              {num % 3 === 1 && (
                <div className="ad-card-subassembly">Subassembly 0{Math.ceil(num/3)}</div>
              )}
              <div className="ad-card-inner">
                <div className="ad-card-header">
                  <span className="ad-card-num">0{num}</span>
                  <span className="ad-card-dots">...</span>
                </div>
                <div className="ad-card-preview">
                  <div className="ad-cylinder-mini card-mini"></div>
                </div>
                <div className="ad-card-desc">
                  {num === 1 ? 'Start with part 1' : `Add part ${num + 2} to the assembly`}
                </div>
                <div className="ad-card-footer">
                  <div className="ad-note-indicator"></div>
                  <span>{num % 3 + 1} notes</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
