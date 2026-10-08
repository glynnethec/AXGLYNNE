'use client';

import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import LinPromptSection from '@/components/LinPromptSection';
import OrbCardSection from '@/components/OrbCardSection';
import ProcessGridSection from '@/components/ProcessGridSection';
import IntegrationCapabilitiesSection from '@/components/IntegrationCapabilitiesSection';
import ModelBestPracticesSection from '@/components/ModelBestPracticesSection';
import PixelModelCatalogSection from '@/components/PixelModelCatalogSection';
import { useTheme } from '@/lib/ThemeContext';

const eliteModels = [
  { name: 'GPT-4o', id: 'gpt-4o', speed: 'High', price: '$5.00 in / $15.00 out', limit: 'Tier dependent', context: '128,000', completion: '4,096' },
  { name: 'Claude 3.5 Sonnet', id: 'claude-3-5-sonnet-20240620', speed: 'Very High', price: '$3.00 in / $15.00 out', limit: 'Tier dependent', context: '200,000', completion: '8,192' },
  { name: 'Claude 3 Opus', id: 'claude-3-opus-20240229', speed: 'Medium', price: '$15.00 in / $75.00 out', limit: 'Tier dependent', context: '200,000', completion: '4,096' },
  { name: 'Gemini 1.5 Pro', id: 'gemini-1.5-pro', speed: 'High', price: '$3.50 in / $10.50 out', limit: 'Tier dependent', context: '2,000,000', completion: '8,192' },
  { name: 'Kimi (Moonshot)', id: 'moonshot-v1-128k', speed: 'High', price: '$3.30 in / $9.90 out', limit: 'Tier dependent', context: '128,000', completion: '4,096' },
  { name: 'Mistral Large 2', id: 'mistral-large-latest', speed: 'High', price: '$3.00 in / $9.00 out', limit: 'Tier dependent', context: '128,000', completion: '8,192' },
];

const productionModels = [
  { name: 'Llama 3.1 8B', id: 'llama-3.1-8b-instant', speed: '560', price: 'Contact Sales', limit: 'Contact Sales', context: '131,072', completion: '131,072' },
  { name: 'Llama 3.3 70B', id: 'llama-3.3-70b-versatile', speed: '280', price: 'Contact Sales', limit: 'Contact Sales', context: '131,072', completion: '32,768' },
  { name: 'GPT OSS 120B', id: 'openai/gpt-oss-120b', speed: '500', price: '$0.15 in / $0.60 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'GPT OSS 20B', id: 'openai/gpt-oss-20b', speed: '1000', price: '$0.075 in / $0.30 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'Whisper Large V3', id: 'whisper-large-v3', speed: '-', price: '$0.111 / hour', limit: '200K ASH / 300 RPM', context: '-', completion: '-' },
  { name: 'Whisper Large V3 Turbo', id: 'whisper-large-v3-turbo', speed: '-', price: '$0.04 / hour', limit: '400K ASH / 400 RPM', context: '-', completion: '-' },
];

const productionSystems = [
  { name: 'Compound', id: 'groq/compound', speed: '450', price: '-', limit: '200K TPM / 200 RPM', context: '131,072', completion: '8,192' },
  { name: 'Compound Mini', id: 'groq/compound-mini', speed: '450', price: '-', limit: '200K TPM / 200 RPM', context: '131,072', completion: '8,192' },
];

const previewModels = [
  { name: 'Canopy Labs Orpheus Arabic', id: 'canopylabs/orpheus-arabic-saudi', speed: '-', price: '$40.00 / 1M chars', limit: '50K TPM / 250 RPM', context: '4,000', completion: '50,000' },
  { name: 'Canopy Labs Orpheus V1 En', id: 'canopylabs/orpheus-v1-english', speed: '-', price: '$22.00 / 1M chars', limit: '50K TPM / 250 RPM', context: '4,000', completion: '50,000' },
  { name: 'Prompt Guard 2 22M', id: 'meta-llama/llama-prompt-guard-2-22m', speed: '-', price: '$0.03 in / $0.03 out', limit: '30K TPM / 100 RPM', context: '512', completion: '512' },
  { name: 'Prompt Guard 2 86M', id: 'meta-llama/llama-prompt-guard-2-86m', speed: '-', price: '$0.04 in / $0.04 out', limit: '30K TPM / 100 RPM', context: '512', completion: '512' },
  { name: 'MiniMax M2.7', id: 'minimaxai/minimax-m2.7', speed: '260', price: 'Contact Sales', limit: 'Contact Sales', context: '196,608', completion: '131,072' },
  { name: 'Safety GPT OSS 20B', id: 'openai/gpt-oss-safeguard-20b', speed: '1000', price: '$0.075 in / $0.30 out', limit: '150K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'Qwen 3.6 27B', id: 'qwen/qwen3.6-27b', speed: '500', price: '$0.60 in / $3.00 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '16,384' },
  { name: 'Qwen 3.8 27B', id: 'qwen/qwen3.8-27b', speed: '450', price: '$0.80 in / $4.00 out', limit: '250K TPM / 1K RPM', context: '131,042', completion: '16,384' },
];

export default function IaAvailablePage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <BackgroundWrapper>
      <style>{`
        .table-wrapper {
          width: 100%;
          overflow-x: auto;
          background-color: ${isDark ? 'rgba(18, 18, 22, 0.85)' : '#ffffff'};
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-radius: 16px;
          border: ${isDark ? '1px solid rgba(255, 255, 255, 0.12)' : '1px solid rgba(0,0,0,0.05)'};
          box-shadow: ${isDark ? '0 12px 40px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.02)'};
          -webkit-overflow-scrolling: touch;
        }
        
        .premium-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 800px;
        }

        .premium-table th {
          padding: 16px 24px;
          font-size: 11px;
          font-weight: 600;
          color: ${isDark ? '#a1a1aa' : '#86868b'};
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0,0,0,0.05)'};
          background-color: ${isDark ? 'rgba(255, 255, 255, 0.03)' : '#fcfcfd'};
        }

        @media (max-width: 700px) {
          .premium-table {
            min-width: 100%;
          }
          .premium-table thead {
            display: none;
          }
          .premium-table tbody {
            display: block;
            padding: 12px;
          }
          .premium-table tr {
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
            border: ${isDark ? '1px solid rgba(255, 255, 255, 0.1) !important' : '1px solid rgba(0,0,0,0.05) !important'};
            border-radius: 12px;
            background-color: ${isDark ? 'rgba(18, 18, 22, 0.85)' : '#ffffff'};
            box-shadow: ${isDark ? '0 4px 20px rgba(0,0,0,0.4)' : '0 2px 12px rgba(0,0,0,0.03)'};
          }
          .premium-table td {
            display: flex;
            flex-direction: column;
            padding: 12px 16px !important;
            border-bottom: ${isDark ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0,0,0,0.03)'};
          }
          .premium-table td:last-child {
            border-bottom: none;
          }
          .premium-table td::before {
            content: attr(data-label);
            font-size: 10px;
            font-weight: 600;
            color: ${isDark ? '#a1a1aa' : '#86868b'};
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-bottom: 6px;
          }
          .table-wrapper {
            background-color: transparent;
            border: none;
            box-shadow: none;
            padding: 0;
          }
        }
      `}</style>

      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>

        {/* Header Section */}
        <section style={{ paddingTop: '160px', paddingBottom: '60px', width: '100%', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: isDark ? '#8f8f96' : '#86868b',
            marginBottom: '24px'
          }}>
            Integration Capabilities
          </div>

          <h1 style={{
            fontSize: 'clamp(40px, 6.5vw, 64px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: isDark ? '#ffffff' : '#111111',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
          }}>
            Available Models
          </h1>

          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: isDark ? '#a1a1aa' : '#86868b',
            fontWeight: 300,
            lineHeight: 1.6,
            letterSpacing: '0.01em',
            maxWidth: '600px',
            margin: 0
          }}>
            Explore the ecosystem of highly capable AI models ready for integration with the GLYNNE autonomous architecture. From lightning-fast production engines to preview systems.
          </p>
        </section>

        {/* 1. Integration Capabilities Section (First - 100vw) */}
        <div style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '0', boxSizing: 'border-box', position: 'relative', zIndex: 5, userSelect: 'text' }}>
          <IntegrationCapabilitiesSection />
        </div>

        {/* 2. LinPromptSection */}
        <div style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '0', boxSizing: 'border-box', position: 'relative', zIndex: 5, userSelect: 'text' }}>
          <LinPromptSection hideCard={true} hideOrbCard={true} lang="en" />
        </div>

        {/* 3. Process Section */}
        <div style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '0', boxSizing: 'border-box', position: 'relative', zIndex: 5, userSelect: 'text' }}>
          <ProcessGridSection />
        </div>

        {/* 4. Model Best Practices Retro Pixel Section */}
        <div style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '0', boxSizing: 'border-box', position: 'relative', zIndex: 5, userSelect: 'text' }}>
          <ModelBestPracticesSection />
        </div>

        {/* 5. Pixel Model Catalog Section (Cards 8-Bit & Pixel Table) */}
        <div style={{ width: '100vw', maxWidth: '100vw', margin: '0', padding: '0', boxSizing: 'border-box', position: 'relative', zIndex: 5, userSelect: 'text' }}>
          <PixelModelCatalogSection />
        </div>

        <section style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
          <OrbCardSection />
        </section>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
