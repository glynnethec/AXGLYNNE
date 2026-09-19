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
      { name: 'OpenAI / ChatGPT', Icon: TbBrain, url: 'https://openai.com' },
      { name: 'Google Gemini', Icon: SiGooglegemini, url: 'https://gemini.google.com' },
      { name: 'Groq', Icon: TbBrain, url: 'https://groq.com' },
      { name: 'LangChain', Icon: SiLangchain, url: 'https://www.langchain.com' },
      { name: 'LangGraph', Icon: FaNetworkWired, url: 'https://www.langchain.com/langgraph' },
      { name: 'scikit-learn', Icon: SiScikitlearn, url: 'https://scikit-learn.org' },
      { name: 'PyTorch', Icon: SiPytorch, url: 'https://pytorch.org' },
      { name: 'Hugging Face', Icon: SiHuggingface, url: 'https://huggingface.co' },
      { name: 'CrewAI', Icon: TbRobot, url: 'https://www.crewai.com' },
      { name: 'Llama', Icon: SiMeta, url: 'https://llama.meta.com' }
    ]
  },
  {
    title: '⚙️ Desarrollo',
    techs: [
      { name: 'Python', Icon: SiPython, url: 'https://www.python.org' },
      { name: 'JavaScript', Icon: SiJavascript, url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
      { name: 'TypeScript', Icon: SiTypescript, url: 'https://www.typescriptlang.org' },
      { name: 'Next.js', Icon: SiNextdotjs, url: 'https://nextjs.org' },
      { name: 'React', Icon: SiReact, url: 'https://react.dev' },
      { name: 'Node.js', Icon: SiNodedotjs, url: 'https://nodejs.org' },
      { name: 'FastAPI', Icon: SiFastapi, url: 'https://fastapi.tiangolo.com' },
      { name: 'Pydantic', Icon: SiPython, url: 'https://docs.pydantic.dev' },
      { name: 'REST APIs', Icon: TbApi, url: 'https://aws.amazon.com/what-is/restful-api/' },
      { name: 'WebSockets', Icon: TbPlug, url: 'https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API' }
    ]
  },
  {
    title: '🗄️ Datos / Backend',
    techs: [
      { name: 'Supabase', Icon: SiSupabase, url: 'https://supabase.com' },
      { name: 'PostgreSQL', Icon: SiPostgresql, url: 'https://www.postgresql.org' },
      { name: 'SQL', Icon: FaDatabase, url: 'https://en.wikipedia.org/wiki/SQL' },
      { name: 'MySQL', Icon: SiMysql, url: 'https://www.mysql.com' },
      { name: 'Redis', Icon: SiRedis, url: 'https://redis.io' }
    ]
  },
  {
    title: '☁️ Infraestructura / Deployment',
    techs: [
      { name: 'AWS', Icon: FaAws, url: 'https://aws.amazon.com' },
      { name: 'Vercel', Icon: SiVercel, url: 'https://vercel.com' },
      { name: 'Render', Icon: SiRender, url: 'https://render.com' },
      { name: 'Docker', Icon: SiDocker, url: 'https://www.docker.com' },
      { name: 'GitHub', Icon: SiGithub, url: 'https://github.com' }
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
            display: contents; /* Display second set on mobile for infinite loop */
          }

          .tech-card {
            flex-direction: column;
            justify-content: center;
            opacity: 1;
            background-color: transparent;
            border: 1px solid rgba(0, 0, 0, 0.1);
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
            box-shadow: 0 15px 30px rgba(0,0,0,0.05);
            background-color: #ffffff;
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
            color: '#111', 
            margin: 0,
            letterSpacing: '-0.03em'
          }}>
            Our Tech Stack
          </h2>
          
          <div style={{ maxWidth: '500px' }}>
            <h4 className="tech-subtitle" style={{ 
              fontSize: '1rem', 
              fontWeight: 600, 
              color: '#111',
              marginBottom: '1rem'
            }}>
              The AI Ecosystem
            </h4>
            <p className="tech-desc" style={{ 
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
