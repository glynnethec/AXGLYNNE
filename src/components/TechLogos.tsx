import React from 'react';
import { 
  SiNvidia, SiPytorch, SiHuggingface, SiMeta, SiDeepseek, SiMistralai,
  SiOllama, SiAnthropic, SiGooglegemini, SiLangchain, SiTensorflow,
  SiQdrant, SiPostgresql, SiWeightsandbiases, SiMlflow, SiPolars,
  SiScikitlearn, SiRay, SiFastapi
} from 'react-icons/si';
import { TbBrain, TbRobot, TbCpu, TbLayersIntersect } from 'react-icons/tb';
import { FaNetworkWired } from 'react-icons/fa';
import { useTheme } from '@/lib/ThemeContext';

const techCategories = [
  {
    title: '⚡ Hardware & Aceleración',
    techs: [
      { name: 'NVIDIA (CUDA & NIM)', Icon: SiNvidia, url: 'https://www.nvidia.com' },
      { name: 'PyTorch', Icon: SiPytorch, url: 'https://pytorch.org' },
      { name: 'vLLM Inference', Icon: TbCpu, url: 'https://vllm.ai' },
      { name: 'Unsloth Fast QLoRA', Icon: TbBrain, url: 'https://unsloth.ai' },
      { name: 'TensorFlow', Icon: SiTensorflow, url: 'https://www.tensorflow.org' },
      { name: 'Groq LPU', Icon: TbBrain, url: 'https://groq.com' },
      { name: 'Ray Distributed AI', Icon: SiRay, url: 'https://www.ray.io' }
    ]
  },
  {
    title: '🧠 Modelos & Pesos Abiertos',
    techs: [
      { name: 'Hugging Face', Icon: SiHuggingface, url: 'https://huggingface.co' },
      { name: 'Meta Llama', Icon: SiMeta, url: 'https://llama.meta.com' },
      { name: 'DeepSeek AI', Icon: SiDeepseek, url: 'https://www.deepseek.com' },
      { name: 'Mistral AI', Icon: SiMistralai, url: 'https://mistral.ai' },
      { name: 'Ollama (Local Models)', Icon: SiOllama, url: 'https://ollama.com' },
      { name: 'Anthropic Claude', Icon: SiAnthropic, url: 'https://www.anthropic.com' },
      { name: 'Google Gemini', Icon: SiGooglegemini, url: 'https://gemini.google.com' }
    ]
  },
  {
    title: '🤖 Agentes & Orquestación',
    techs: [
      { name: 'LangChain', Icon: SiLangchain, url: 'https://www.langchain.com' },
      { name: 'LangGraph', Icon: FaNetworkWired, url: 'https://www.langchain.com/langgraph' },
      { name: 'Model Context Protocol (MCP)', Icon: SiAnthropic, url: 'https://modelcontextprotocol.io' },
      { name: 'CrewAI Multi-Agent', Icon: TbRobot, url: 'https://www.crewai.com' },
      { name: 'LlamaIndex', Icon: TbLayersIntersect, url: 'https://www.llamaindex.ai' },
      { name: 'FastAPI AI Gateways', Icon: SiFastapi, url: 'https://fastapi.tiangolo.com' }
    ]
  },
  {
    title: '📊 Embeddings & Vector Stores',
    techs: [
      { name: 'Qdrant Vector DB', Icon: SiQdrant, url: 'https://qdrant.tech' },
      { name: 'pgvector / Postgres', Icon: SiPostgresql, url: 'https://github.com/pgvector/pgvector' },
      { name: 'Weights & Biases', Icon: SiWeightsandbiases, url: 'https://wandb.ai' },
      { name: 'MLflow Model Registry', Icon: SiMlflow, url: 'https://mlflow.org' },
      { name: 'Polars Data Engine', Icon: SiPolars, url: 'https://pola.rs' },
      { name: 'scikit-learn', Icon: SiScikitlearn, url: 'https://scikit-learn.org' }
    ]
  }
];

export default function TechLogos() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'transparent',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <style>{`
        /* --- DESKTOP (Default) --- */
        .tech-container {
          width: 100%;
        }

        .tech-track {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 2rem 1.5rem;
          align-items: center;
          justify-items: center;
        }

        .duplicate-set {
          display: none;
        }

        .tech-card {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: ${isDark ? '#ffffff' : '#111111'};
          opacity: 0.9;
          padding: 12px 24px;
          width: 100%;
          box-sizing: border-box;
          transition: transform 0.3s ease, opacity 0.3s ease;
        }

        .tech-card:hover {
          opacity: 1;
        }

        .tech-icon {
          width: 24px;
          height: 24px;
          pointer-events: none;
        }

        .tech-text {
          font-size: 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          pointer-events: none;
        }

        @media (max-width: 699px) {
          .tech-header-container {
            margin-bottom: 2.5rem !important;
            gap: 1.5rem !important;
            padding: 0 1rem;
          }
          
          .tech-title {
            font-size: 2rem !important;
          }

          .tech-subtitle {
            font-size: 0.9rem !important;
          }

          .tech-desc {
            font-size: 0.85rem !important;
            line-height: 1.5 !important;
          }
          
          .tech-container {
            width: 100%;
            position: relative;
            overflow: hidden;
            padding: 2rem 0;
            mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
            -webkit-mask-image: linear-gradient(to right, transparent, black 15%, black 85%, transparent);
          }

          .tech-track {
            display: flex;
            gap: 1.5rem;
            width: max-content;
            animation: marquee 50s linear infinite;
          }

          .tech-track:hover {
            animation-play-state: paused;
          }

          .duplicate-set {
            display: contents;
          }

          .tech-card {
            flex-direction: column;
            justify-content: center;
            opacity: 1;
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'transparent'};
            border: ${isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'};
            border-radius: 24px;
            padding: 1rem;
            min-width: 110px;
            height: 110px;
            box-shadow: none;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, background-color 0.3s ease;
          }

          .tech-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0,0,0,0.15);
            background-color: ${isDark ? 'rgba(255, 255, 255, 0.12)' : '#ffffff'};
          }

          .tech-icon {
            width: 32px;
            height: 32px;
            transition: transform 0.3s ease;
            margin-bottom: 8px;
          }

          .tech-card:hover .tech-icon {
            transform: scale(1.1);
          }

          .tech-text {
            font-size: 11px;
            font-weight: 500;
            letter-spacing: 0.02em;
            text-align: center;
          }
        }

        @keyframes marquee {
          to {
            transform: translateX(calc(-50% - 0.75rem));
          }
        }
      `}</style>

      <div className="tech-container">
        {/* Restored Header Section */}
        <div className="tech-header-container" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '5rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <h2 className="tech-title" style={{ 
            fontSize: '3.5rem', 
            fontWeight: 500, 
            color: isDark ? '#ffffff' : '#111111', 
            margin: 0,
            letterSpacing: '-0.03em'
          }}>
            Our AI Tech Stack
          </h2>
          
          <div style={{ maxWidth: '500px' }}>
            <h4 className="tech-subtitle" style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: isDark ? '#ffffff' : '#111111',
              marginBottom: '1rem'
            }}>
              Frontier Intelligence & Compute
            </h4>
            <p className="tech-desc" style={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: isDark ? '#a1a1aa' : '#333333',
              margin: 0 
            }}>
              Desde aceleración en hardware NVIDIA y kernels de entrenamiento QLoRA, hasta orquestación de agentes autónomos y bases vectoriales de alta velocidad. Implementamos el estándar técnico más avanzado de inteligencia artificial para entornos corporativos.
            </p>
          </div>
        </div>

        <div className="tech-track">
          {/* Main Set */}
          {techCategories.flatMap(c => c.techs).map((tech, index) => (
            <a 
              key={`main-${index}`} 
              href={tech.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ textDecoration: 'none', display: 'block' }}
            >
              <div className="tech-card">
                <tech.Icon className="tech-icon" />
                <span className="tech-text">{tech.name}</span>
              </div>
            </a>
          ))}

          {/* Duplicate Set (Only visible on mobile) */}
          <div className="duplicate-set">
            {techCategories.flatMap(c => c.techs).map((tech, index) => (
              <a 
                key={`dup-${index}`} 
                href={tech.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ textDecoration: 'none', display: 'block' }}
              >
                <div className="tech-card">
                  <tech.Icon className="tech-icon" />
                  <span className="tech-text">{tech.name}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
