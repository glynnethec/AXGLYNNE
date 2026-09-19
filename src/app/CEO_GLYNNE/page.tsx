'use client';

import React from 'react';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

export default function AlexanderQuirogaProfile() {
  return (
    <BackgroundWrapper theme="light">
      <div style={{ minHeight: '100vh', width: '100%', display: 'flex', flexDirection: 'column' }}>
        
        {/* Content Container */}
        <div style={{
          flex: '1',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '160px 40px 80px 40px',
          width: '100%',
          position: 'relative',
          zIndex: 10
        }}>
          
          {/* Breadcrumb / Back Link */}
          <Link href="/About" style={{ 
            display: 'inline-block', 
            marginBottom: '40px', 
            fontSize: '13px', 
            color: '#86868b', 
            textDecoration: 'none',
            letterSpacing: '0.02em',
            transition: 'color 0.2s ease'
          }}
          onMouseOver={(e) => e.currentTarget.style.color = '#111'}
          onMouseOut={(e) => e.currentTarget.style.color = '#86868b'}
          >
            ← Back to About
          </Link>

          {/* Profile Header */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '40px', marginBottom: '60px', flexWrap: 'wrap' }}>
            <div style={{ flex: '0 0 200px', width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.1)' }}>
              <img 
                src="/AlexanderCEO.png" 
                alt="Alexander Quiroga" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} 
              />
            </div>
            
            <div style={{ flex: '1', minWidth: '300px', paddingTop: '20px' }}>
              <h1 style={{ fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 400, color: '#111', margin: '0 0 12px 0', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                Alexander Quiroga
              </h1>
              <h2 style={{ fontSize: '16px', fontWeight: 500, color: '#86868b', margin: '0 0 24px 0', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                CEO, Enterprise AI Architect & Lead Researcher
              </h2>
              
              <a href="https://www.linkedin.com/in/alexander-quiroga-a992452b4/" target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                padding: '8px 16px',
                backgroundColor: '#111',
                color: '#fff',
                fontSize: '13px',
                fontWeight: 500,
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease'
              }}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#111'}
              >
                LinkedIn Profile
              </a>
            </div>
          </div>

          {/* Biography Content */}
          <article style={{ fontSize: '17px', lineHeight: 1.6, color: '#1d1d1f', fontWeight: 300 }}>
            <p style={{ marginBottom: '24px' }}>
              <strong>Alexander Quiroga</strong> is a leading Enterprise AI Architect, Lead Researcher, and the CEO of AXGLYNNE, an elite technology architecture firm specializing in Artificial Intelligence and B2B process automation. With over 9 years of experience driving technological innovation across corporate and scientific sectors, his expertise centers on designing complex software architectures, deterministic AI governance, and the seamless integration of Large Language Models (LLMs) into high-stakes enterprise ecosystems.
            </p>
            
            <p style={{ marginBottom: '24px' }}>
              With a rigorous background in scientific research predating the current AI boom, Alexander brings a highly analytical, data-driven approach to autonomous systems. He has architected scalable, high-performance solutions for top-tier companies across North America and Latin America, establishing a strategic mastery of global software development and enterprise-grade automation.
            </p>

            <p style={{ marginBottom: '24px' }}>
              Currently, he spearheads <strong>AXGLYNNE</strong>, his highest-impact venture. Under his technical and executive leadership, the firm engineers autonomous, multi-agent AI ecosystems that transform legacy B2B workflows. His architectural vision ensures that artificial intelligence operates securely within strict deterministic guardrails, advanced orchestration layers, and human-in-the-loop (HITL) validation systems.
            </p>
            
            <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#111', margin: '40px 0 16px 0', letterSpacing: '-0.01em' }}>
              Core Competencies & Technical Expertise
            </h3>
            <ul style={{ paddingLeft: '20px', marginBottom: '40px' }}>
              <li style={{ marginBottom: '12px' }}><strong>Enterprise AI & Deterministic Governance:</strong> Engineering strict guardrails and hallucination-free environments for Large Language Models (LLMs).</li>
              <li style={{ marginBottom: '12px' }}><strong>Autonomous Multi-Agent Orchestration:</strong> Designing specialized agent ecosystems using LangChain, LangGraph, and CrewAI.</li>
              <li style={{ marginBottom: '12px' }}><strong>Advanced Software Architecture:</strong> Full-stack enterprise development, scalable data pipelines, and cloud infrastructure (Next.js, Python, Node.js, Supabase).</li>
              <li style={{ marginBottom: '12px' }}><strong>B2B Process Automation:</strong> End-to-end transformation of complex corporate workflows into autonomous, AI-driven operations.</li>
              <li style={{ marginBottom: '12px' }}><strong>RAG Systems & Data Extraction:</strong> Transforming unstructured corporate data into queryable, high-value intelligence.</li>
            </ul>

            <h3 style={{ fontSize: '20px', fontWeight: 400, color: '#111', margin: '40px 0 16px 0', letterSpacing: '-0.01em' }}>
              Leadership Vision
            </h3>
            <blockquote style={{ 
              borderLeft: '2px solid #111', 
              paddingLeft: '20px', 
              margin: '0 0 40px 0',
              fontStyle: 'italic',
              color: '#333',
              fontSize: '18px'
            }}>
              "Technology shouldn't limit what a company can do; it should expand what it is capable of imagining. In the era of autonomous systems, the ultimate challenge is no longer just generating intelligence, but engineering the deterministic infrastructure required to govern it safely and scale it infinitely."<br />
              <span style={{ display: 'block', marginTop: '12px', fontSize: '15px', fontStyle: 'normal', fontWeight: 500 }}>— Alexander Quiroga</span>
            </blockquote>
            
          </article>

        </div>
        
        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
