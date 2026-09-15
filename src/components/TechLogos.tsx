import React from 'react';
import { 
  SiGooglegemini, SiLangchain, SiScikitlearn, SiPytorch, SiHuggingface, SiMeta,
  SiPython, SiJavascript, SiTypescript, SiNextdotjs, SiReact, SiNodedotjs, SiFastapi,
  SiSupabase, SiPostgresql, SiMysql, SiRedis,
  SiVercel, SiRender, SiDocker, SiGithub
} from 'react-icons/si';
import { TbBrain, TbRobot, TbApi, TbPlug } from 'react-icons/tb';
import { FaAws, FaDatabase, FaNetworkWired } from 'react-icons/fa';

const techCategories = [
  {
    title: '🧠 AI / LLM',
    techs: [
      { name: 'OpenAI / ChatGPT', Icon: TbBrain },
      { name: 'Google Gemini', Icon: SiGooglegemini },
      { name: 'Groq', Icon: TbBrain },
      { name: 'LangChain', Icon: SiLangchain },
      { name: 'LangGraph', Icon: FaNetworkWired },
      { name: 'scikit-learn', Icon: SiScikitlearn },
      { name: 'PyTorch', Icon: SiPytorch },
      { name: 'Hugging Face', Icon: SiHuggingface },
      { name: 'CrewAI', Icon: TbRobot },
      { name: 'Llama', Icon: SiMeta }
    ]
  },
  {
    title: '⚙️ Desarrollo',
    techs: [
      { name: 'Python', Icon: SiPython },
      { name: 'JavaScript', Icon: SiJavascript },
      { name: 'TypeScript', Icon: SiTypescript },
      { name: 'Next.js', Icon: SiNextdotjs },
      { name: 'React', Icon: SiReact },
      { name: 'Node.js', Icon: SiNodedotjs },
      { name: 'FastAPI', Icon: SiFastapi },
      { name: 'Pydantic', Icon: SiPython },
      { name: 'REST APIs', Icon: TbApi },
      { name: 'WebSockets', Icon: TbPlug }
    ]
  },
  {
    title: '🗄️ Datos / Backend',
    techs: [
      { name: 'Supabase', Icon: SiSupabase },
      { name: 'PostgreSQL', Icon: SiPostgresql },
      { name: 'SQL', Icon: FaDatabase },
      { name: 'MySQL', Icon: SiMysql },
      { name: 'Redis', Icon: SiRedis }
    ]
  },
  {
    title: '☁️ Infraestructura / Deployment',
    techs: [
      { name: 'AWS', Icon: FaAws },
      { name: 'Vercel', Icon: SiVercel },
      { name: 'Render', Icon: SiRender },
      { name: 'Docker', Icon: SiDocker },
      { name: 'GitHub', Icon: SiGithub }
    ]
  }
];

export default function TechLogos() {
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
          color: #111;
          opacity: 0.8;
          padding: 12px 24px;
          width: 100%;
          box-sizing: border-box;
          transition: transform 0.3s ease;
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
            display: contents; /* Display second set on mobile for infinite loop */
          }

          .tech-card {
            flex-direction: column;
            justify-content: center;
            opacity: 1;
            background-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 30px;
            padding: 2rem;
            min-width: 140px;
            height: 140px;
            box-shadow: none;
            cursor: pointer;
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.3s ease, background-color 0.3s ease;
          }

          .tech-card:hover {
            transform: translateY(-8px) scale(1.05);
            box-shadow: 0 15px 30px rgba(0,0,0,0.05);
            background-color: #ffffff;
          }

          .tech-icon {
            width: 44px;
            height: 44px;
            transition: transform 0.3s ease;
          }

          .tech-card:hover .tech-icon {
            transform: scale(1.1);
          }

          .tech-text {
            font-size: 13px;
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
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          marginBottom: '5rem',
          flexWrap: 'wrap',
          gap: '2rem'
        }}>
          <h2 style={{ 
            fontSize: '3.5rem', 
            fontWeight: 500, 
            color: '#111', 
            margin: 0,
            letterSpacing: '-0.03em'
          }}>
            Our Tech Stack
          </h2>
          
          <div style={{ maxWidth: '500px' }}>
            <h4 style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: '#111',
              marginBottom: '1rem'
            }}>
              The AI Ecosystem
            </h4>
            <p style={{ 
              fontSize: '1rem', 
              lineHeight: 1.6, 
              color: '#333',
              margin: 0 
            }}>
              From responsive frontend interfaces to powerful AI agents and scalable data architectures, we leverage the most advanced technologies to build intelligent, high-performance applications that adapt to your business needs.
            </p>
          </div>
        </div>

        <div className="tech-track">
          {/* Main Set */}
          {techCategories.flatMap(c => c.techs).map((tech, index) => (
            <div key={`main-${index}`} className="tech-card">
              <tech.Icon className="tech-icon" />
              <span className="tech-text">{tech.name}</span>
            </div>
          ))}

          {/* Duplicate Set (Only visible on mobile) */}
          <div className="duplicate-set">
            {techCategories.flatMap(c => c.techs).map((tech, index) => (
              <div key={`dup-${index}`} className="tech-card">
                <tech.Icon className="tech-icon" />
                <span className="tech-text">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
