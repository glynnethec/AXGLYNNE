'use client';

import React from 'react';
import { useTheme } from '@/lib/ThemeContext';

interface ModelItem {
  name: string;
  id: string;
  speed: string;
  price: string;
  limit: string;
  context: string;
  completion: string;
}

interface ModelSectionData {
  title: string;
  badgeText?: string;
  desc: string;
  data: ModelItem[];
}

const eliteModels: ModelItem[] = [
  { name: 'GPT-4o', id: 'gpt-4o', speed: 'High', price: '$5.00 in / $15.00 out', limit: 'Tier dependent', context: '128,000', completion: '4,096' },
  { name: 'Claude 3.5 Sonnet', id: 'claude-3-5-sonnet-20240620', speed: 'Very High', price: '$3.00 in / $15.00 out', limit: 'Tier dependent', context: '200,000', completion: '8,192' },
  { name: 'Claude 3 Opus', id: 'claude-3-opus-20240229', speed: 'Medium', price: '$15.00 in / $75.00 out', limit: 'Tier dependent', context: '200,000', completion: '4,096' },
  { name: 'Gemini 1.5 Pro', id: 'gemini-1.5-pro', speed: 'High', price: '$3.50 in / $10.50 out', limit: 'Tier dependent', context: '2,000,000', completion: '8,192' },
  { name: 'Kimi (Moonshot)', id: 'moonshot-v1-128k', speed: 'High', price: '$3.30 in / $9.90 out', limit: 'Tier dependent', context: '128,000', completion: '4,096' },
  { name: 'Mistral Large 2', id: 'mistral-large-latest', speed: 'High', price: '$3.00 in / $9.00 out', limit: 'Tier dependent', context: '128,000', completion: '8,192' },
];

const productionModels: ModelItem[] = [
  { name: 'Llama 3.1 8B', id: 'llama-3.1-8b-instant', speed: '560 T/s', price: 'Contact Sales', limit: 'Contact Sales', context: '131,072', completion: '131,072' },
  { name: 'Llama 3.3 70B', id: 'llama-3.3-70b-versatile', speed: '280 T/s', price: 'Contact Sales', limit: 'Contact Sales', context: '131,072', completion: '32,768' },
  { name: 'GPT OSS 120B', id: 'openai/gpt-oss-120b', speed: '500 T/s', price: '$0.15 in / $0.60 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'GPT OSS 20B', id: 'openai/gpt-oss-20b', speed: '1000 T/s', price: '$0.075 in / $0.30 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'Whisper Large V3', id: 'whisper-large-v3', speed: '-', price: '$0.111 / hour', limit: '200K ASH / 300 RPM', context: '-', completion: '-' },
  { name: 'Whisper Large V3 Turbo', id: 'whisper-large-v3-turbo', speed: '-', price: '$0.04 / hour', limit: '400K ASH / 400 RPM', context: '-', completion: '-' },
];

const productionSystems: ModelItem[] = [
  { name: 'Compound', id: 'groq/compound', speed: '450 T/s', price: '-', limit: '200K TPM / 200 RPM', context: '131,072', completion: '8,192' },
  { name: 'Compound Mini', id: 'groq/compound-mini', speed: '450 T/s', price: '-', limit: '200K TPM / 200 RPM', context: '131,072', completion: '8,192' },
];

const previewModels: ModelItem[] = [
  { name: 'Canopy Labs Orpheus Arabic', id: 'canopylabs/orpheus-arabic-saudi', speed: '-', price: '$40.00 / 1M chars', limit: '50K TPM / 250 RPM', context: '4,000', completion: '50,000' },
  { name: 'Canopy Labs Orpheus V1 En', id: 'canopylabs/orpheus-v1-english', speed: '-', price: '$22.00 / 1M chars', limit: '50K TPM / 250 RPM', context: '4,000', completion: '50,000' },
  { name: 'Prompt Guard 2 22M', id: 'meta-llama/llama-prompt-guard-2-22m', speed: '-', price: '$0.03 in / $0.03 out', limit: '30K TPM / 100 RPM', context: '512', completion: '512' },
  { name: 'Prompt Guard 2 86M', id: 'meta-llama/llama-prompt-guard-2-86m', speed: '-', price: '$0.04 in / $0.04 out', limit: '30K TPM / 100 RPM', context: '512', completion: '512' },
  { name: 'MiniMax M2.7', id: 'minimaxai/minimax-m2.7', speed: '260 T/s', price: 'Contact Sales', limit: 'Contact Sales', context: '196,608', completion: '131,072' },
  { name: 'Safety GPT OSS 20B', id: 'openai/gpt-oss-safeguard-20b', speed: '1000 T/s', price: '$0.075 in / $0.30 out', limit: '150K TPM / 1K RPM', context: '131,072', completion: '65,536' },
  { name: 'Qwen 3.6 27B', id: 'qwen/qwen3.6-27b', speed: '500 T/s', price: '$0.60 in / $3.00 out', limit: '250K TPM / 1K RPM', context: '131,072', completion: '16,384' },
  { name: 'Qwen 3.8 27B', id: 'qwen/qwen3.8-27b', speed: '450 T/s', price: '$0.80 in / $4.00 out', limit: '250K TPM / 1K RPM', context: '131,042', completion: '16,384' },
];

const sectionsData: ModelSectionData[] = [
  {
    title: 'Elite Foundation Models',
    badgeText: 'FRONTIER API',
    desc: 'The absolute best-in-class frontier models available via API on the market today. Ideal for complex reasoning, autonomous agent architectures, and high-impact tasks.',
    data: eliteModels
  },
  {
    title: 'Production Models (Groq Cloud)',
    badgeText: 'HIGH SPEED',
    desc: 'Designed for use in demanding production environments. They meet or exceed high standards for speed, quality, and reliability.',
    data: productionModels
  },
  {
    title: 'Production Systems',
    badgeText: 'MULTI-AGENT',
    desc: 'A collection of models and tools that collaborate to answer complex user queries in record time.',
    data: productionSystems
  },
  {
    title: 'Preview Models',
    badgeText: 'PREVIEW EVAL',
    desc: 'Preview models are intended for evaluation purposes only and should not be used in direct production environments as they may be discontinued at short notice.',
    data: previewModels
  }
];

export default function PixelModelCatalogSection() {
  const { theme } = useTheme();

  return (
    <section style={{
      width: '100vw',
      maxWidth: '100vw',
      margin: '0',
      padding: '40px 0 80px 0',
      backgroundColor: '#000000',
      color: '#ffffff',
      fontFamily: "'SF Mono', Monaco, 'Courier New', monospace",
      boxSizing: 'border-box',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <style>{`
        .pixel-catalog-container {
          width: 97vw;
          max-width: 97vw;
          margin: 0 auto;
          box-sizing: border-box;
        }

        .pixel-sec-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 24px;
          border-bottom: 1px dashed rgba(255, 255, 255, 0.2);
          padding-bottom: 20px;
        }

        .pixel-sec-badge {
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 16px;
          font-size: clamp(18px, 2.5vw, 24px);
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background-color: #000000;
          color: #ffffff;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
          margin-bottom: 12px;
        }

        /* PIXEL TABLE LAYOUT */
        .pixel-table-box {
          width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.6);
          background-color: #000000;
        }

        .pixel-table-elem {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          min-width: 800px;
        }

        .pixel-table-elem th {
          background-color: rgba(255, 255, 255, 0.05);
          color: #ffffff;
          padding: 14px 18px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          border-right: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .pixel-table-elem th:last-child {
          border-right: none;
        }

        .pixel-table-elem td {
          padding: 14px 18px;
          font-size: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          color: #ffffff;
        }

        .pixel-table-elem td:last-child {
          border-right: none;
        }

        .pixel-table-elem tr:last-child td {
          border-bottom: none;
        }

        .pixel-table-elem tr:hover td {
          background-color: #111111;
        }
      `}</style>

      <div className="pixel-catalog-container">
        {/* SECTIONS MAP */}
        {sectionsData.map((sec, idx) => (
          <div key={idx} style={{ marginBottom: '60px' }}>
            <div className="pixel-sec-header">
              {sec.badgeText && (
                <div style={{ fontSize: '11px', letterSpacing: '0.12em', color: '#aaaaaa', textTransform: 'uppercase', marginBottom: '6px' }}>
                  /// {sec.badgeText}
                </div>
              )}
              <div className="pixel-sec-badge">
                {sec.title}
              </div>
              <p style={{ fontSize: '12px', opacity: 0.85, margin: '8px 0 0 0', lineHeight: 1.5, textTransform: 'uppercase', maxWidth: '800px' }}>
                {sec.desc}
              </p>
            </div>

            {/* TABLA PIXEL */}
            <div className="pixel-table-box">
              <table className="pixel-table-elem">
                <thead>
                  <tr>
                    <th>Model ID</th>
                    <th>Speed (T/s)</th>
                    <th>Price</th>
                    <th>Rate Limits</th>
                    <th>Context</th>
                    <th>Max Comp.</th>
                  </tr>
                </thead>
                <tbody>
                  {sec.data.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div style={{ fontWeight: 700, textTransform: 'uppercase' }}>{item.name}</div>
                        <div style={{ fontSize: '10px', color: '#aaaaaa', marginTop: '2px' }}>{item.id}</div>
                      </td>
                      <td style={{ fontWeight: 700 }}>{item.speed}</td>
                      <td style={{ fontSize: '11px', color: '#dddddd' }}>{item.price}</td>
                      <td style={{ fontSize: '11px', color: '#dddddd' }}>{item.limit}</td>
                      <td style={{ fontWeight: 700 }}>{item.context}</td>
                      <td style={{ fontWeight: 700 }}>{item.completion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
