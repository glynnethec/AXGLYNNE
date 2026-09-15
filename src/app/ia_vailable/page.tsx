'use client';

import BackgroundWrapper from '@/components/BackgroundWrapper';
import Footer from '@/app/components/Footer';
import LinPromptSection from '@/components/LinPromptSection';
import OrbCardSection from '@/components/OrbCardSection';

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
  const renderTable = (title: string, desc: string, data: any[]) => (
    <div style={{ marginBottom: '80px', width: '100%' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 500, color: '#111111', marginBottom: '8px' }}>{title}</h2>
        <p style={{ fontSize: '14px', color: '#86868b', lineHeight: 1.5, margin: 0 }}>{desc}</p>
      </div>

      <div style={{ 
        width: '100%', 
        overflowX: 'auto', 
        backgroundColor: '#ffffff', 
        borderRadius: '16px', 
        border: '1px solid rgba(0,0,0,0.05)',
        boxShadow: '0 4px 24px rgba(0,0,0,0.02)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: '#fcfcfd' }}>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Model ID</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Speed (T/s)</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Rate Limits</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Context</th>
              <th style={{ padding: '16px 24px', fontSize: '11px', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Max Comp.</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id} style={{ borderBottom: index === data.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.03)', transition: 'background-color 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fafafa'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: '#111111' }}>{item.name}</div>
                  <div style={{ fontSize: '12px', color: '#86868b', fontFamily: 'monospace', marginTop: '4px' }}>{item.id}</div>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#333333', fontFamily: 'monospace' }}>{item.speed}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#555555' }}>{item.price}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#555555' }}>{item.limit}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#333333', fontFamily: 'monospace' }}>{item.context}</td>
                <td style={{ padding: '16px 24px', fontSize: '13px', color: '#333333', fontFamily: 'monospace' }}>{item.completion}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <BackgroundWrapper>
      <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'transparent' }}>
        
        {/* Header Section */}
        <section style={{ paddingTop: '160px', paddingBottom: '60px', width: '100%', maxWidth: '1000px', margin: '0 auto', paddingLeft: '20px', paddingRight: '20px' }}>
          <div style={{
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: '#1d1d1f',
            marginBottom: '24px'
          }}>
            Integration Capabilities
          </div>
          
          <h1 style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#111111',
            lineHeight: 1.1,
            margin: '0 0 24px 0',
          }}>
            Available Models
          </h1>
          
          <p style={{
            fontSize: 'clamp(14px, 1.5vw, 16px)',
            color: '#86868b',
            fontWeight: 300,
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: 0
          }}>
            Explore the ecosystem of highly capable AI models ready for integration with the GLYNNE autonomous architecture. From lightning-fast production engines to preview systems.
          </p>
        </section>

        <div style={{ padding: '0 20px', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
          <LinPromptSection hideCard={true} hideOrbCard={true} />
        </div>
        
        <div style={{ height: '30vh', width: '100%' }}></div>

        {/* Tables Section */}
        <section style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
          
          {renderTable(
            "Elite Foundation Models",
            "The absolute best-in-class frontier models available via API on the market today. Ideal for complex reasoning, autonomous agent architectures, and high-impact tasks.",
            eliteModels
          )}

          {renderTable(
            "Production Models (Groq Cloud)",
            "Production models are intended for use in your production environments. They meet or exceed high standards for speed, quality, and reliability.",
            productionModels
          )}

          {renderTable(
            "Production Systems",
            "Systems are a collection of models and tools that work together to answer a user query.",
            productionSystems
          )}

          {renderTable(
            "Preview Models",
            "Preview models are intended for evaluation purposes only and should not be used in production environments as they may be discontinued at short notice.",
            previewModels
          )}

        </section>

        <section style={{ width: '100%', maxWidth: '1000px', margin: '0 auto', padding: '0 20px 80px 20px' }}>
          <OrbCardSection />
        </section>

        <Footer />
      </div>
    </BackgroundWrapper>
  );
}
