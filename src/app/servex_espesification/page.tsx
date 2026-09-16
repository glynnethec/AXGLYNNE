'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import BackgroundWrapper from '@/components/BackgroundWrapper';
import LinPromptSection from '@/components/LinPromptSection';

export default function ServexSpecification() {
  return (
    <>
      <Header />
      <BackgroundWrapper theme="light">
        <div style={{
          minHeight: '100vh',
          padding: '160px 40px 80px 40px',
          display: 'flex',
          position: 'relative',
          zIndex: 10,
          width: '100%'
        }}>
          {/* Main Layout Container */}
          <div style={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            position: 'relative',
            textAlign: 'left',
            color: '#1d1d1f'
          }}>
            
            <LinPromptSection 
              hideCard={true} 
              hideOrbCard={true} 
              customTitle="Govern AI across your enterprise"
              customDescription="Servex Copilot is the infrastructure layer that integrates artificial intelligence into enterprise systems safely and with total governance. AI shouldn't have unrestricted access. We provide the architecture of control, permissions, and traceability that filters every action—allowing AI to provide autonomous reasoning while you retain absolute security."
              primaryButtonText="Learn more about Servex Copilot"
              primaryButtonUrl="https://axglynne.com/Solutions"
            />

            {/* Autonomous Audit Section */}
            <div style={{
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '24px',
              padding: '40px',
              color: '#1d1d1f',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px',
              margin: '32px 0 64px 0',
              boxShadow: '0 12px 40px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#34C759' }}></div>
                  <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#86868b' }}>
                    Autonomous Audit
                  </span>
                </div>
                
                <h2 style={{ fontSize: '28px', fontWeight: 400, letterSpacing: '-0.01em', margin: 0, color: '#111' }}>
                  Explore Technical Specs
                </h2>
                
                <p style={{ fontSize: '15px', color: '#86868b', lineHeight: 1.6, maxWidth: '600px', margin: 0, fontWeight: 300 }}>
                  We want you to see exactly how we achieved this. Dive into our comprehensive documentation and discover the step-by-step technology behind this solution that completely redefined Servex's operational ecosystem.
                </p>
              </div>

              {/* Links Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                <a href="https://deepwiki.com/aiservex-us/SERVEX_AI" target="_blank" rel="noreferrer" style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: '#111',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    Project Architecture
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#86868b', margin: 0, lineHeight: 1.5 }}>
                    Where the AI lives. The complete structural design of the Servex project and environmental setups.
                  </p>
                </a>
                
                <a href="https://app.devin.ai/org/aiservex-us/wiki/aiservex-us/SERVEX_AI_BACK?branch=main" target="_blank" rel="noreferrer" style={{
                  padding: '20px',
                  backgroundColor: 'rgba(255,255,255,0.8)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  borderRadius: '16px',
                  textDecoration: 'none',
                  color: '#111',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.06)'; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.8)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)'; }}>
                  <h3 style={{ fontSize: '16px', fontWeight: 500, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    AI System Logic
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </h3>
                  <p style={{ fontSize: '13px', color: '#86868b', margin: 0, lineHeight: 1.5 }}>
                    Ultra-detailed documentation of the underlying intelligence backend, logic flows, and processing rules.
                  </p>
                </a>
              </div>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(40px, 6vw, 64px)', 
              fontWeight: 400, 
              color: '#111', 
              margin: '0 0 16px 0', 
              letterSpacing: '-0.02em', 
              lineHeight: 1.1 
            }}>
              About Servex Copilot
            </h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', fontSize: '16px', lineHeight: 1.8, fontWeight: 300 }}>
              
              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Our Mission
                </h2>
                <p>
                  Servex Copilot is an enterprise-grade, mission-critical web platform exclusively designed to centralize, automate, and enhance the management of product catalogs and complex data flows for Servex US.
                </p>
                <p style={{ marginTop: '16px' }}>
                  Our mission is to resolve technical friction in the manipulation of furniture and spatial design databases. Servex Copilot acts as a data translation and assembly engine: it takes complex, monolithic structures (XML trees), destructs them into universal and accessible formats (Excel or CSV) for human editing, and finally reconstructs them with pinpoint accuracy for native integration into production environments like CET Designer and Catalog Creator.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  The AI Paradigm: Architecture as a Digital Factory
                </h2>
                <p>
                  Unlike conventional applications where AI is merely a conversational assistant, Servex Copilot is conceived under a deterministic multi-agent architecture.
                </p>
                <p style={{ marginTop: '16px' }}>
                  To understand the system, imagine our software architecture as a high-tech industrial building, fully equipped with processing machinery, data pipelines, and precision algorithmic tools. Within these facilities, Artificial Intelligence acts as the workforce.
                </p>
                <p style={{ marginTop: '16px' }}>
                  The system distributes software processes among multiple AI Agents, where each agent operates as a highly specialized worker:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'disc' }}>
                  <li>Each agent is assigned to a specific area of operation within the development flow.</li>
                  <li>Each has its own "machinery and software tools" at its workstation.</li>
                  <li>They execute mechanical, mathematical, and logical tasks under strict software engineering, ensuring no "hallucinations" or calculation errors occur. The AI does not guess; it operates the platform's facilities with the precision of an industrial operator.</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  The Core Operational Flow
                </h2>
                <p>
                  The Servex Copilot ecosystem is orchestrated by our agents to cover the entire lifecycle of catalog updates in three exact phases:
                </p>
                <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>1. Destructuring and Ingestion (Reverse Engineering)</h3>
                    <p>The process begins when the system ingests an original XML file (the base catalog). A specialized agent takes this monolithic data tree and, using high-precision parsers, destructs it without losing its relational hierarchy. The result is the automated conversion of this complex XML into multiple types of flat and universal files, such as Excel or CSV.</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>2. Decentralized Editing and Human Control</h3>
                    <p>By transforming the XML into Excel/CSV tables, the platform delivers an accessible and readable base file to the client. At this stage, operational supervisors, manufacturers, or administrators of Servex US can apply their commercial changes (massive price updates, reference modifications, addition of variants) using conventional spreadsheet tools, maintaining total human control over business decisions.</p>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 500, color: '#111', marginBottom: '8px' }}>3. Reconstruction and Assembly for CET (Integration)</h3>
                    <p>Once the client uploads the updated Excel/CSV file, the platform's squad of AI agents retakes control. They collect the new data, validate it against structural integrity rules, and update the original XML file. The AI operates code injectors to reassemble the XML tree with the new commercial values, leaving the file perfectly formatted and ready to be integrated and read by the CET rendering and design software.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Cutting-Edge Infrastructure and Technology
                </h2>
                <p>
                  The Servex Copilot "digital factory" is built on high-performance foundations, designed to scale and support massive processing:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px', listStyleType: 'disc' }}>
                  <li><strong>Modern Web Infrastructure:</strong> Developed on a robust environment (Next.js) that ensures ultra-fast, reactive, and highly available user interfaces.</li>
                  <li><strong>ETL Pipelines (Extract, Transform, and Load):</strong> The heavy algorithmic machinery that allows AI agents to process and cross-reference thousands of items in a matter of seconds.</li>
                  <li><strong>Multi-tenant Database Management:</strong> Advanced relational data architecture that ensures strict isolation (Row-Level Security) between different manufacturers, guaranteeing that each account's information is kept in secure and impenetrable vaults.</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  Security and Corporate Standards
                </h2>
                <p>
                  The integrity of Servex US data flows is our absolute priority. Servex Copilot facilities operate under the strictest security standards in the industry:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px', listStyleType: 'disc' }}>
                  <li><strong>Enterprise Authentication:</strong> Restricted access exclusively through secure corporate integrations (Microsoft Azure OAuth), ensuring that only authorized personnel can enter the platform's workstations.</li>
                  <li><strong>Immutable Traceability (Audit Logging):</strong> Every CSV upload, matrix modification, and XML reconstruction is permanently recorded in the database with timestamps and linked to the user's identity, providing a tamper-proof audit trail.</li>
                </ul>
                <p style={{ marginTop: '32px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.03)', borderRadius: '12px', fontStyle: 'italic', color: '#111' }}>
                  Servex Copilot is the technological infrastructure that enables Servex US to digitize, scale, and maintain absolute control over its catalogs, operating with the speed of Artificial Intelligence and the irrefutable precision of software engineering.
                </p>
              </section>

              {/* --- EXTENDED DOCUMENTATION --- */}
              <section>
                <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.1)', margin: '64px 0' }}></div>
                <h1 style={{ fontSize: '32px', fontWeight: 500, color: '#111', marginBottom: '24px', letterSpacing: '-0.01em' }}>
                  Technical Documentation & Operational Architecture
                </h1>
                
                <div style={{ backgroundColor: 'rgba(0,0,0,0.03)', padding: '24px', borderRadius: '16px', marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111', marginBottom: '12px' }}>Executive Summary</h3>
                  <p>
                    Servex Copilot is an enterprise-grade, mission-critical web platform conceived under a deterministic multi-agent architecture. Its foundational goal is to centralize, automate, and enhance the management of product catalogs and complex data flows for the furniture and spatial design industry at <strong>Servex US</strong>. It functions as a bridge infrastructure that natively integrates human commercial processes with the strict technical requirements of 3D design platforms like <em>CET Designer</em> and <em>Catalog Creator</em>.
                  </p>
                </div>

                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  1. The Business Problem and Technical Friction
                </h2>
                <p>
                  In the commercial and industrial space design industry, furniture catalogs are not simple price lists. They are intricate data models containing cross-references, geometric configuration rules, material mapping, assembly dependencies (hardware), and prices. All this information is typically packaged in monolithic data structures, predominantly <strong>deep, hierarchical XML trees</strong>.
                </p>
                <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginTop: '24px', marginBottom: '12px' }}>The Operational Bottleneck</h3>
                <p>
                  When a manufacturer needs to apply an annual price increase or modify the commercial references of a furniture line, they face a severe technical challenge:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'decimal' }}>
                  <li><strong>Inaccessibility for the Business User:</strong> A commercial manager cannot easily open a 500,000-line XML file in Excel to change prices.</li>
                  <li><strong>Critical Structural Risk:</strong> Updating prices directly by manipulating the XML code or using search-and-replace scripts is highly prone to errors. If a <code>&lt;/item&gt;</code> tag is accidentally deleted, if a closing tag breaks, or if a geometry ID is unlinked, <strong>the entire catalog will collapse</strong> when loaded into the rendering software (CET Designer).</li>
                  <li><strong>Time Friction:</strong> What should be an agile business decision (e.g., "raise ergonomic chairs by 5%") turns into a slow and costly software engineering project to ensure the base catalog does not break.</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  2. The Solution: The Servex Copilot Translation Engine
                </h2>
                <p>
                  Servex Copilot solves this problem by acting as a <strong>"digital factory" and a bidirectional middleware</strong>. It democratizes access to technical information without compromising code integrity.
                </p>
                <p style={{ marginTop: '16px' }}>
                  The platform takes inflexible machine languages (XML), temporarily translates them into formats readable and editable by humans in bulk (spreadsheets like Excel or CSV), and then, using Artificial Intelligence, takes those human changes and re-injects and assembles them with pinpoint accuracy back into the source code.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  3. System Architecture (The Deterministic AI Paradigm)
                </h2>
                <p>
                  Unlike common modern applications where AI is a chatbot conversing with the user, Servex Copilot uses AI as a backend processing engine. It is based on a <strong>Deterministic Multi-Agent schema</strong>.
                </p>
                <p style={{ marginTop: '16px' }}>
                  To understand this, imagine the software architecture as an industrial assembly center. In this center, AI Agents are the specialized workforce:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px', listStyleType: 'disc' }}>
                  <li><strong>Parser Agent:</strong> Exclusively specialized in reading XML code, identifying hierarchical patterns, and mapping logical relationships.</li>
                  <li><strong>Transformation Agent (ETL):</strong> Tasked with taking the extracted data and flattening it to convert it into two-dimensional matrices (CSV tables).</li>
                  <li><strong>Auditor Agent (QA & Risks):</strong> Structurally evaluates the data re-entered by humans to detect discrepancies before they touch the code.</li>
                  <li><strong>Injector Agent (Assembler):</strong> Specialized in rewriting and compiling XML nodes by injecting the updated commercial data.</li>
                </ul>
                <p style={{ marginTop: '16px' }}>
                  <strong>Absence of Hallucinations:</strong> These agents execute mechanical, mathematical, and logical tasks under strict software engineering. The system instructions restrict the AI from "inventing" data. The AI is not probabilistic in this environment; it is deterministic. It operates the platform's tools with the precision of an industrial operator.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  4. Step-by-Step Use Case (The Core Operational Flow)
                </h2>
                <p>
                  The complete lifecycle of a catalog update in Servex Copilot consists of three monolithic phases, orchestrated by the AI agents.
                </p>
                
                <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>PHASE 1: Destructuring and Ingestion (Reverse Engineering)</h3>
                    <p style={{ fontStyle: 'italic', marginBottom: '12px', color: '#86868b' }}>The goal of this phase is to free commercial data from its technical prison.</p>
                    <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Authentication and Flow Initiation:</strong> A Servex US supervisor logs into the platform and selects the manufacturer/catalog they wish to process.</li>
                      <li><strong>Base File Upload:</strong> The user uploads the original XML catalog file to the web interface.</li>
                      <li><strong>Node Mapping (Parser Agent):</strong> The file enters the ingestion pipeline. The AI Agent analyzes the XML tree. It identifies nodes containing human-modifiable information (SKUs, Descriptions, Prices, Finish Options) and temporarily stores the "exact path" (XPath) of where each piece of data came from.</li>
                      <li><strong>Flat Transformation (ETL Agent):</strong> The system converts this tree structure into multiple flat relational formats.</li>
                      <li><strong>Human Output Generation:</strong> The platform consolidates this information and automatically generates universal Excel or CSV files, inserting unique identifiers (hidden IDs or primary keys) to track the geometry without losing it.</li>
                    </ol>
                  </div>

                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.06)' }}></div>

                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>PHASE 2: Decentralized Editing and Human Control</h3>
                    <p style={{ fontStyle: 'italic', marginBottom: '12px', color: '#86868b' }}>The goal of this phase is to return strategic control to the business user.</p>
                    <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Matrix Download:</strong> The catalog administrator or manufacturer downloads the generated CSV file.</li>
                      <li><strong>Offline Commercial Update:</strong> Using their preferred tools (Microsoft Excel, Google Sheets, or their own ERP exports), the human performs strategic changes. They can apply massive mathematical formulas (e.g., <code>NEW_PRICE = OLD_PRICE * 1.05</code>), correct descriptions, and add new color or textile variants.</li>
                      <li><strong>Intact Business Decision:</strong> During this phase, the Servex Copilot system enters an active standby state. The entire business decision process falls 100% on the human, with no risk of the AI autonomously modifying a price.</li>
                    </ol>
                  </div>

                  <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(0,0,0,0.06)' }}></div>

                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginBottom: '12px' }}>PHASE 3: Reconstruction, Auditing, and Assembly (CET Integration)</h3>
                    <p style={{ fontStyle: 'italic', marginBottom: '12px', color: '#86868b' }}>The goal of this phase is to rewrite the technical code ensuring no structural errors exist.</p>
                    <ol style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Update Re-ingestion:</strong> The user uploads their modified Excel/CSV file to the Servex Copilot platform.</li>
                      <li><strong>Integrity Validation (Auditor Agent):</strong> Immediately, the platform quarantines the file and launches an auditing squad:
                        <ul style={{ paddingLeft: '24px', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px', listStyleType: 'circle' }}>
                          <li><em>Key Verification:</em> Checks that primary IDs haven't been altered, guaranteeing a new price is assigned to the correct chair.</li>
                          <li><em>Data Sanitization:</em> Verifies that no corrupt characters exist in a price column.</li>
                          <li><em>Material Validation:</em> Ensures the described finishes exist in the 3D library (Cognitive match for missing materials).</li>
                          <li><em>Structural Integrity:</em> Confirms that links to CAD models are not broken (Structural integrity check on 3D assets).</li>
                        </ul>
                      </li>
                      <li><strong>Code Injection (Injector Agent):</strong> Once validated, the AI regains control of the original XML file. Through precise code injectors, the agent locates the exact nodes mapped in Phase 1 and replaces old values with the processed CSV information, strictly respecting XML tags and hierarchy.</li>
                      <li><strong>Final Export:</strong> The system delivers a new XML file to the user—perfectly assembled, sanitized, updated, and ready to be loaded into industrial-grade rendering software (CET).</li>
                    </ol>
                  </div>
                </div>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  5. Infrastructure, Scalability, and Cutting-Edge Technology
                </h2>
                <p>
                  To support the demands of such intensive data processing without significant latency, Servex Copilot's "digital factory" rests on three technological pillars:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px', listStyleType: 'disc' }}>
                  <li><strong>Modern Web Environment:</strong> The entire interface and routing are built on <strong>Next.js</strong>. This ensures a reactive, ultra-fast user experience free of browser locks, even when the backend processes heavy files.</li>
                  <li><strong>High-Performance ETL Pipelines:</strong> Extraction, Transformation, and Loading (ETL) is not done in the client's browser, but on powerful backend servers. This allows AI agents to process, cross-reference, and transform tens of thousands of commercial references and XML nodes in seconds or minutes—operations that would crash a local machine.</li>
                  <li><strong>Advanced Multitenant Databases:</strong> The ecosystem handles data from multiple competing manufacturers under the Servex umbrella. The platform uses relational databases with <strong>Row-Level Security</strong>. This architecture ensures that Manufacturer 'A' and Manufacturer 'B' data coexist in the same system absolutely isolated and invisible to each other. Each manufacturer has an impenetrable logical "vault".</li>
                </ul>
              </section>

              <section>
                <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111', marginBottom: '16px', letterSpacing: '-0.01em' }}>
                  6. Security, Governance, and Corporate Standards
                </h2>
                <p>
                  Since Servex Copilot manages the commercial heart and proprietary data of Servex US, the platform imposes strict institutional security protocols:
                </p>
                <ul style={{ marginTop: '16px', paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '16px', listStyleType: 'decimal' }}>
                  <li><strong>Closed Enterprise Authentication:</strong> There is no public registration. Access is restricted and guarded by corporate identity systems. Using secure protocols like <strong>Microsoft Azure OAuth</strong>, it is guaranteed that only personnel internally validated by Servex can authenticate and interact with catalogs.</li>
                  <li><strong>Total AI Governance:</strong> The Artificial Intelligence in Servex Copilot lacks unrestricted access. Every action the AI takes passes through pre-established permission filters, ensuring its autonomous reasoning executes within an absolute security perimeter.</li>
                  <li><strong>Immutable Traceability (Audit Logging):</strong> The platform operates as a "black box" for auditing. Every critical action is permanently recorded in the database: who logged in, who uploaded a base catalog, what CSV file was uploaded (at what exact time and by which user), and when the final file was reassembled. These records provide an immutable Audit Trail.</li>
                </ul>
                
                <div style={{ marginTop: '32px', padding: '32px', backgroundColor: '#111', color: '#fff', borderRadius: '16px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '16px' }}>Conclusion</h3>
                  <p style={{ fontWeight: 300, lineHeight: 1.6, color: '#a1a1a6' }}>
                    Servex Copilot is not a simple web interface; it is the technological infrastructure and governance layer that enables Servex US to digitize, scale, and maintain rigorous control over millions of data points. It replaces weeks of manual work and software engineering risk with minutes of high-tech processing, operating with the cognitive speed of Artificial Intelligence and the irrefutable precision of software architecture.
                  </p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <Footer />
    </>
  );
}
