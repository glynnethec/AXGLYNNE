'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiFileText, FiTarget, FiLayers, FiCpu, 
  FiShield, FiBriefcase, FiUsers, FiActivity, 
  FiTrendingUp, FiCheckCircle 
} from 'react-icons/fi';

const SECTIONS = [
  { id: 'intro', title: 'Introducción', icon: <FiFileText /> },
  { id: 'audit', title: '1. Fundamentos y Auditoría', icon: <FiTarget /> },
  { id: 'architecture', title: '2. Arquitectura y Ecosistema', icon: <FiLayers /> },
  { id: 'rules', title: '3. Reglas e Inteligencia Artificial', icon: <FiCpu /> },
  { id: 'infrastructure', title: '4. Operación y Control', icon: <FiShield /> },
  { id: 'industries', title: '5. Industrias Específicas', icon: <FiBriefcase /> },
  { id: 'agents', title: '6. Agentes y Orquestación', icon: <FiUsers /> },
  { id: 'metrics', title: '7. Observabilidad y Escalabilidad', icon: <FiActivity /> },
  { id: 'control', title: '8. Evolución y Migración', icon: <FiTrendingUp /> },
  { id: 'conclusion', title: '9. Del Proceso Humano al Inteligente', icon: <FiCheckCircle /> }
];

export default function MethodologyManifesto() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .desktop-only-sidebar {
            display: none !important;
          }
        }
        .methodology-article h2 {
          font-size: 28px;
          font-weight: 500;
          color: #111;
          letter-spacing: -0.01em;
          margin: 60px 0 20px 0;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .methodology-article h3 {
          font-size: 22px;
          font-weight: 500;
          color: #111;
          margin: 40px 0 16px 0;
        }
        .methodology-article p {
          margin-bottom: 24px;
        }
        .methodology-article ul {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        .methodology-article li {
          margin-bottom: 8px;
        }
        .methodology-article strong {
          font-weight: 500;
          color: #111;
        }
        .methodology-article .workflow-step {
          display: block;
          margin: 12px 0;
          font-family: monospace;
          background: rgba(0,0,0,0.03);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
        }
      `}</style>
      
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
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
          position: 'relative'
        }}>
          
          {/* Left Spacer - Reserves space for the fixed sidebar */}
          <div className="desktop-only-sidebar" style={{ flex: '0 0 64px' }}></div>
          
          {/* Fixed Island Sidebar - Expands on hover */}
          <aside 
            className="desktop-only-sidebar"
            onMouseEnter={() => setIsSidebarOpen(true)}
            onMouseLeave={() => setIsSidebarOpen(false)}
            style={{
              position: 'fixed',
              top: '50%',
              left: '40px',
              transform: 'translateY(-50%)',
              width: isSidebarOpen ? '280px' : '64px',
              height: 'fit-content',
              maxHeight: 'calc(100vh - 160px)',
              overflowY: 'auto',
              overflowX: 'hidden',
              backgroundColor: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              borderRadius: '24px',
              padding: isSidebarOpen ? '24px 16px' : '24px 0',
              border: '1px solid rgba(0,0,0,0.06)',
              boxShadow: isSidebarOpen ? '0 24px 80px rgba(0,0,0,0.1)' : '0 12px 40px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: isSidebarOpen ? 'flex-start' : 'center',
              gap: '6px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              zIndex: 100 // Ensure it overlaps the content
            }}
          >
                {SECTIONS.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    title={!isSidebarOpen ? section.title : ''}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isSidebarOpen ? 'flex-start' : 'center',
                      width: isSidebarOpen ? '100%' : '40px',
                      minHeight: '40px',
                      background: 'transparent',
                      border: 'none',
                      padding: isSidebarOpen ? '8px 12px' : '0',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: activeSection === section.id ? 500 : 300,
                      color: activeSection === section.id ? '#111' : '#86868b',
                      backgroundColor: activeSection === section.id ? 'rgba(0,0,0,0.04)' : 'transparent',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      whiteSpace: 'nowrap'
                    }}
                    onMouseOver={(e) => {
                      if (activeSection !== section.id) e.currentTarget.style.color = '#111';
                      if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.02)';
                    }}
                    onMouseOut={(e) => {
                      if (activeSection !== section.id) e.currentTarget.style.color = '#86868b';
                      if (activeSection !== section.id) e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <span style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontSize: '16px',
                      marginRight: isSidebarOpen ? '12px' : '0',
                      transition: 'margin 0.3s ease'
                    }}>
                      {section.icon}
                    </span>
                    
                    <span style={{ 
                      opacity: isSidebarOpen ? 1 : 0, 
                      width: isSidebarOpen ? 'auto' : 0, 
                      overflow: 'hidden', 
                      transition: 'opacity 0.2s ease, width 0.3s ease',
                      textAlign: 'left',
                      lineHeight: 1.4
                    }}>
                      {section.title}
                    </span>
                  </button>
                ))}
              </aside>

          {/* Content Container (Perfectly Centered) */}
          <div style={{
            flex: '1',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 0 80px 0',
          }}>
            
            {/* Hero Section */}
            <div style={{ textAlign: 'left', marginBottom: '80px', marginTop: '120px' }}>
              <div style={{ fontSize: '11px', letterSpacing: '0.2em', fontWeight: 600, color: '#86868b', textTransform: 'uppercase', marginBottom: '24px' }}>
                Our Methodology
              </div>
              <h1 style={{ 
                fontSize: 'clamp(32px, 5vw, 48px)', 
                fontWeight: 400, 
                color: '#111111', 
                letterSpacing: '-0.02em', 
                lineHeight: 1.1, 
                maxWidth: '800px',
                margin: '0 0 32px 0' 
              }}>
                Cómo GLYNNE transforma procesos empresariales en ecosistemas tecnológicos inteligentes
              </h1>
            </div>

            <article className="methodology-article" style={{ fontSize: '18px', fontWeight: 300, color: '#333', lineHeight: 1.6 }}>
              
              <section id="intro">
                <p>Las empresas no necesitan simplemente incorporar inteligencia artificial.</p>
                <p>Necesitan <strong>transformar la forma en que sus procesos funcionan</strong>.</p>
                <p>En muchas organizaciones, una parte importante de la operación todavía depende de correos electrónicos, hojas de cálculo, archivos dispersos, sistemas que no se comunican entre sí, procesos manuales, decisiones repetitivas, validaciones humanas y grandes cantidades de información que deben ser interpretadas constantemente por diferentes personas.</p>
                <p>El problema no siempre está en la ausencia de tecnología.</p>
                <p>En muchos casos, el problema está en que la tecnología existente no fue diseñada para trabajar como un ecosistema.</p>
                <p>GLYNNE parte de una premisa diferente:</p>
                <p>
                  <strong>antes de automatizar, entendemos cómo funciona la empresa.<br/>
                  antes de incorporar IA, diseñamos la infraestructura que debe gobernarla.<br/>
                  antes de permitir que un modelo tome una decisión, definimos exactamente qué puede conocer, qué puede hacer y bajo qué condiciones puede hacerlo.</strong>
                </p>
                <p>De esta manera, GLYNNE no se limita a agregar inteligencia artificial sobre un proceso existente.</p>
                <p><strong>Construye la infraestructura tecnológica necesaria para convertir ese proceso en un sistema digital capaz de operar, analizar, decidir, ejecutar y evolucionar.</strong></p>
              </section>

              <section id="audit">
                <h2>01. Entender la empresa antes de construir</h2>
                <p>Cada empresa tiene una estructura particular.</p>
                <p>Incluso dos organizaciones que pertenecen a la misma industria pueden operar de maneras completamente diferentes.</p>
                <p>Por eso GLYNNE no comienza preguntando:</p>
                <p><strong>“¿Qué modelo de inteligencia artificial podemos utilizar?”</strong></p>
                <p>Comienza preguntando:</p>
                <p><strong>“¿Cómo funciona realmente este proceso?”</strong></p>
                <p>El primer paso consiste en estudiar el funcionamiento actual de la organización.</p>
                <p>Esto implica identificar:</p>
                <ul>
                  <li>cómo entra la información;</li>
                  <li>de dónde provienen los datos;</li>
                  <li>quién interviene en cada etapa;</li>
                  <li>qué decisiones deben tomarse;</li>
                  <li>qué reglas existen;</li>
                  <li>qué herramientas utilizan los equipos;</li>
                  <li>qué sistemas almacenan información;</li>
                  <li>qué información se duplica;</li>
                  <li>dónde existen tareas manuales;</li>
                  <li>dónde aparecen errores;</li>
                  <li>qué actividades dependen de conocimiento humano;</li>
                  <li>qué procesos requieren aprobación;</li>
                  <li>qué eventos generan nuevas acciones;</li>
                  <li>qué sistemas necesitan comunicarse;</li>
                  <li>qué información debe permanecer restringida;</li>
                  <li>y cuáles son los puntos donde la operación pierde tiempo, precisión o trazabilidad.</li>
                </ul>
                <p>GLYNNE transforma esta información en una representación técnica del proceso.</p>
                <p>El objetivo no es simplemente documentarlo.</p>
                <p>El objetivo es <strong>comprenderlo como un sistema</strong>.</p>

                <h2>02. Auditar el proceso</h2>
                <p>Una vez comprendida la operación, GLYNNE realiza una auditoría tecnológica y funcional.</p>
                <p>Esta auditoría permite encontrar la diferencia entre:</p>
                <p><strong>cómo debería funcionar el proceso</strong> y <strong>cómo funciona actualmente.</strong></p>
                <p>Aquí aparecen problemas que muchas veces permanecen ocultos durante años.</p>
                <p>Un proceso puede parecer eficiente porque los empleados ya aprendieron a trabajar alrededor de sus limitaciones.</p>
                <p>Una persona descarga un archivo. Otra lo modifica. Una tercera valida la información. Después alguien envía un correo. Otra persona copia los datos a un sistema. Un responsable revisa nuevamente la información. Finalmente alguien toma una decisión.</p>
                <p>Desde el punto de vista humano puede parecer una operación normal.</p>
                <p>Desde el punto de vista tecnológico puede representar una cadena de múltiples puntos de fricción.</p>
                <p>GLYNNE identifica estas dependencias y determina qué actividades pueden convertirse en software, cuáles necesitan automatización, cuáles pueden ser asistidas por IA y cuáles deben permanecer bajo control humano.</p>
              </section>

              <section id="architecture">
                <h2>03. Convertir el proceso empresarial en arquitectura</h2>
                <p>Después de comprender y auditar el proceso, GLYNNE comienza a construir la arquitectura.</p>
                <p>Aquí ocurre una transformación fundamental.</p>
                <p>El proceso deja de ser visto como una secuencia de tareas realizadas por personas y comienza a convertirse en un <strong>ecosistema tecnológico compuesto por servicios, datos, reglas, interfaces, integraciones y mecanismos inteligentes</strong>.</p>
                <p>La arquitectura puede incorporar diferentes componentes dependiendo de las necesidades de la organización:</p>
                <ul>
                  <li>aplicaciones web y aplicaciones internas;</li>
                  <li>APIs y microservicios;</li>
                  <li>bases de datos y sistemas de autenticación;</li>
                  <li>almacenamiento de documentos y colas de procesamiento;</li>
                  <li>sistemas de eventos;</li>
                  <li>integraciones con ERP, CRM y sistemas contables;</li>
                  <li>plataformas de comunicación (correo electrónico, WhatsApp);</li>
                  <li>servicios cloud y motores de búsqueda;</li>
                  <li>sistemas de análisis;</li>
                  <li>modelos de machine learning y agentes de IA;</li>
                  <li>sistemas de observabilidad y capas de seguridad.</li>
                </ul>
                <p>No todas las empresas necesitan los mismos componentes.</p>
                <p>Por eso la infraestructura se diseña <strong>a la medida del proceso</strong>.</p>

                <h2>04. Construir el ecosistema tecnológico</h2>
                <p>GLYNNE no pretende reemplazar indiscriminadamente todos los sistemas existentes.</p>
                <p>Una empresa puede tener años de información, infraestructura, aplicaciones y procesos funcionando.</p>
                <p>El objetivo es determinar qué debe mantenerse, qué debe conectarse, qué debe modernizarse y qué debe reconstruirse.</p>
                <p>GLYNNE puede actuar como una capa tecnológica que conecta diferentes partes de una organización. Por ejemplo:</p>
                <span className="workflow-step">ERP → GLYNNE → Motor de procesos → IA → Sistema operativo</span>
                <span className="workflow-step">CRM → API → GLYNNE → Agente especializado → CRM</span>
                <span className="workflow-step">Correo → Ingesta controlada → Clasificación → Motor de decisión → Sistema empresarial</span>
                <p>De esta manera, GLYNNE puede convertirse en una capa de orquestación entre los sistemas existentes y las nuevas capacidades inteligentes. La empresa no necesita abandonar necesariamente su infraestructura. Puede comenzar a construir sobre ella.</p>

                <h2>05. Centralizar y estructurar la información</h2>
                <p>La automatización no puede ser precisa si los datos están desorganizados.</p>
                <p>Por eso una parte fundamental de la arquitectura consiste en determinar cómo se obtiene, transforma, almacena y utiliza la información.</p>
                <p>GLYNNE puede establecer estructuras de datos específicas para cada proceso.</p>
                
                <h3>Datos de clientes</h3>
                <span className="workflow-step">identificación → historial → productos → transacciones → solicitudes → comportamiento</span>
                
                <h3>Datos operativos</h3>
                <span className="workflow-step">órdenes → estados → responsables → fechas → recursos → incidencias</span>
                
                <h3>Datos financieros</h3>
                <span className="workflow-step">facturas → pagos → costos → presupuestos → movimientos → conciliaciones</span>
                
                <p>La información deja de estar distribuida arbitrariamente entre archivos, correos y sistemas desconectados. Se convierte en información estructurada y accesible mediante software.</p>
              </section>

              <section id="rules">
                <h2>06. Crear reglas determinísticas</h2>
                <p>No todo necesita inteligencia artificial. Esta es una parte fundamental de la arquitectura de GLYNNE.</p>
                <p>Si una decisión puede resolverse mediante una regla determinística, esa regla debe permanecer en software.</p>
                <p>Por ejemplo:</p>
                <p>Si una factura supera determinado valor: <strong>requiere aprobación.</strong></p>
                <p>Si un usuario no tiene determinado permiso: <strong>no puede ejecutar la operación.</strong></p>
                <p>Si un documento no contiene un campo obligatorio: <strong>el proceso no puede continuar.</strong></p>
                <p>Si un pedido pertenece a determinada categoría: <strong>debe enviarse a determinado flujo.</strong></p>
                <p>Estas operaciones no necesitan que un modelo de lenguaje “piense”. Necesitan software.</p>
                <p>GLYNNE utiliza esta separación para construir sistemas más previsibles. La IA se utiliza donde aporta capacidad de interpretación, razonamiento o adaptación. El software tradicional controla aquello que debe ser exacto.</p>

                <h2>07. Incorporar inteligencia artificial donde realmente aporta valor</h2>
                <p>Después de construir la infraestructura, GLYNNE incorpora inteligencia artificial en los puntos donde existe una necesidad real de interpretación o decisión.</p>
                <p>Esto puede incluir comprensión de lenguaje natural, clasificación de información, extracción de datos, análisis documental, reconocimiento de patrones, generación de contenido, interpretación de solicitudes, análisis de contexto, recomendaciones, priorización, detección de anomalías, asistencia operativa, toma de decisiones condicionadas y ejecución de tareas mediante herramientas.</p>
                <p>La IA no se convierte en el sistema completo.</p>
                <p>Se convierte en <strong>una capa inteligente dentro del sistema</strong>.</p>
              </section>

              <section id="infrastructure">
                <h2>08. La IA como operador dentro de la infraestructura</h2>
                <p>Uno de los principios centrales de GLYNNE es que un modelo no debería necesitar acceso indiscriminado a toda la organización para poder ejecutar una tarea.</p>
                <p>La arquitectura puede funcionar de una manera diferente. La empresa tiene sistemas. Los sistemas contienen herramientas. Las herramientas ejecutan operaciones. Los agentes de IA utilizan esas herramientas bajo permisos y reglas previamente definidos.</p>
                <p>En lugar de entregar a un modelo una enorme cantidad de información y pedirle que resuelva todo, GLYNNE puede proporcionar únicamente:</p>
                <p><strong>el contexto necesario + las herramientas necesarias + los permisos necesarios.</strong></p>
                <p>Por ejemplo, un agente encargado de gestionar pedidos puede tener acceso a: <code>consultar_pedido()</code>, <code>validar_stock()</code>, <code>crear_orden()</code>, <code>actualizar_estado()</code>, <code>notificar_cliente()</code>.</p>
                <p>Pero no necesariamente tendrá acceso directo a la base completa de clientes, información financiera global, documentos internos o credenciales administrativas.</p>
                <p>La diferencia es arquitectónica. La IA no controla directamente toda la organización. <strong>Opera dentro de un sistema diseñado para controlar lo que puede hacer.</strong></p>

                <h2>09. Controlar qué información recibe cada modelo</h2>
                <p>Una de las mayores diferencias entre integrar IA directamente y construir una arquitectura controlada está en el manejo del contexto. No toda información debe enviarse a todos los modelos.</p>
                <p>GLYNNE puede establecer una capa de selección y preparación de información.</p>
                <span className="workflow-step">Información empresarial → Clasificación → Validación → Filtrado → Transformación → Contexto mínimo necesario → Modelo de IA</span>
                <p>De esta manera, el modelo recibe solamente la información necesaria para ejecutar una determinada operación. Esto permite reducir la exposición innecesaria de información y establecer límites mucho más claros sobre el flujo de datos.</p>
                <p>La arquitectura puede aplicar políticas diferentes según usuario, departamento, agente, operación, documento, tipo de información, nivel de autorización, sistema de origen y destino, y sensibilidad del dato.</p>

                <h2>10. Separar inteligencia de información</h2>
                <p>Una arquitectura inteligente no necesita que el modelo conozca toda la empresa. Necesita que el modelo pueda <strong>interactuar correctamente con el conocimiento que necesita</strong>.</p>
                <p>Esta distinción es fundamental. GLYNNE puede separar <strong>la inteligencia</strong> de <strong>la información</strong>.</p>
                <p>El modelo proporciona capacidades de razonamiento e interpretación. La infraestructura proporciona los datos. El software proporciona las herramientas. Las reglas proporcionan las restricciones. Los permisos proporcionan el control. Y los sistemas empresariales proporcionan la fuente de verdad.</p>
                <p>Esto crea una arquitectura donde la IA no necesita convertirse en el repositorio central de conocimiento de la organización.</p>

                <h2>11. Transformar tareas manuales en operaciones digitales</h2>
                <p>Una vez construida la infraestructura, GLYNNE identifica qué tareas pueden convertirse en operaciones automatizadas.</p>
                
                <h3>Antes (Manual)</h3>
                <span className="workflow-step">Recibe correo → Descarga archivo → Lee información → Busca datos → Copia información → Valida reglas → Actualiza registro → Envía respuesta</span>
                
                <h3>Con GLYNNE (Automatizado)</h3>
                <span className="workflow-step">Sistema identifica evento → Extrae información → Consulta sistema → Motor valida reglas → IA interpreta → Software ejecuta → Actualiza sistema → Registra ejecución → Genera respuesta</span>
                
                <p>La transformación no consiste únicamente en “poner IA”. Consiste en convertir una secuencia manual en <strong>un proceso digital orquestado</strong>.</p>
              </section>

              <section id="industries">
                <h2>12. Automatización para diferentes industrias</h2>
                <p>La arquitectura de GLYNNE puede adaptarse a diferentes industrias porque el enfoque no parte de una aplicación predeterminada. Parte del proceso.</p>
                <ul>
                  <li><strong>Finanzas:</strong> Procesamiento de facturas, conciliaciones, clasificación documental, validación de información, seguimiento de pagos y generación de reportes. La IA puede interpretar documentos mientras el software controla las reglas.</li>
                  <li><strong>Recursos Humanos:</strong> Gestión de solicitudes internas, clasificación de candidatos, incorporación de empleados y procesamiento documental.</li>
                  <li><strong>Logística:</strong> Conexión de inventario, pedidos, proveedores, transporte, almacenes y clientes mediante sistemas ERP y plataformas de seguimiento.</li>
                  <li><strong>Manufactura:</strong> Integración de producción, inventarios, mantenimiento, calidad, sensores y análisis predictivo. El software mantiene el control sobre las operaciones críticas.</li>
                  <li><strong>Salud:</strong> Automatización de tareas administrativas, programación y procesamiento de solicitudes, manteniendo controles estrictos sobre privacidad y cumplimiento regulatorio.</li>
                  <li><strong>Retail y Comercio Electrónico:</strong> Integración del catálogo, inventario, pedidos, clientes, pagos, logística y marketing.</li>
                  <li><strong>Servicios Profesionales:</strong> Transformación de procesos basados en documentos: recepción, extracción, clasificación, análisis, generación de información, validación y entrega.</li>
                </ul>
              </section>

              <section id="agents">
                <h2>13. Crear agentes especializados</h2>
                <p>GLYNNE no necesita construir un único agente que haga absolutamente todo. Puede crear múltiples agentes especializados.</p>
                <ul>
                  <li><strong>Agent Finance:</strong> Responsable de procesos financieros.</li>
                  <li><strong>Agent Operations:</strong> Responsable de operaciones.</li>
                  <li><strong>Agent Support:</strong> Responsable de atención.</li>
                  <li><strong>Agent Logistics:</strong> Responsable de logística.</li>
                  <li><strong>Agent Documents:</strong> Responsable de procesamiento documental.</li>
                  <li><strong>Agent Analytics:</strong> Responsable de análisis.</li>
                </ul>
                <p>Cada agente puede tener su propio contexto, herramientas, permisos, instrucciones, fuentes de información, reglas, memoria controlada y objetivos específicos. Esto permite construir sistemas distribuidos donde cada componente tiene una responsabilidad clara.</p>

                <h2>14. Orquestar múltiples agentes</h2>
                <p>Cuando un proceso requiere diferentes capacidades, GLYNNE puede construir una arquitectura de agentes coordinados.</p>
                <span className="workflow-step">Solicitud → Agente de recepción → Agente de análisis → Agente de validación → Agente de ejecución → Agente de comunicación</span>
                <p>Cada agente puede realizar una función específica. El sistema controla el flujo. Esto permite construir procesos complejos sin convertir un único modelo en un punto central que tenga que comprender absolutamente todo.</p>

                <h2>15. Mantener al humano donde realmente importa</h2>
                <p>Automatizar no significa eliminar indiscriminadamente la intervención humana. Hay decisiones que deben permanecer bajo supervisión. GLYNNE puede diseñar puntos de aprobación.</p>
                <span className="workflow-step">IA analiza → Sistema valida → Operación supera umbral → Solicitar aprobación humana → Usuario aprueba → Sistema ejecuta</span>
                <p>Esto permite utilizar IA para acelerar procesos sin convertirla automáticamente en autoridad final sobre todas las operaciones.</p>
              </section>

              <section id="metrics">
                <h2>16. Diseñar sistemas observables</h2>
                <p>Un sistema automatizado debe poder explicar qué ocurrió. Por eso GLYNNE puede incorporar mecanismos de trazabilidad.</p>
                <p>Cada operación puede registrar: evento, fecha, usuario, agente, herramienta utilizada, información consultada, operación ejecutada, resultado, errores, validaciones, aprobaciones y estado final.</p>
                <p>La automatización deja de ser una caja negra. Se convierte en un proceso observable.</p>

                <h2>17. Medir el funcionamiento del sistema</h2>
                <p>Después de automatizar, GLYNNE puede establecer métricas para evaluar el proceso. Tiempos de procesamiento, necesidad de intervención humana, porcentaje de errores, capacidad escalable y trazabilidad general.</p>
                <p>Estas métricas permiten que la automatización sea un sistema medible y no solamente una promesa tecnológica.</p>

                <h2>18. Construir infraestructura preparada para crecer</h2>
                <p>Una automatización empresarial no debería depender de un único servidor o de un único proceso monolítico cuando la operación requiere escalar. Por eso GLYNNE puede utilizar arquitecturas modulares.</p>
                <ul>
                  <li><strong>Frontend:</strong> Interfaz para usuarios.</li>
                  <li><strong>Backend:</strong> Lógica empresarial.</li>
                  <li><strong>APIs:</strong> Comunicación entre sistemas.</li>
                  <li><strong>Microservicios:</strong> Funciones independientes.</li>
                  <li><strong>Data Layer:</strong> Información estructurada.</li>
                  <li><strong>AI Layer:</strong> Modelos y agentes.</li>
                  <li><strong>Integration Layer:</strong> Conectores con sistemas externos.</li>
                  <li><strong>Infrastructure Layer:</strong> Cloud, servidores, redes, almacenamiento y observabilidad.</li>
                </ul>

                <h2>19. Integrar diferentes modelos de IA</h2>
                <p>GLYNNE no necesita depender de un único modelo. Dependiendo del proceso, pueden utilizarse diferentes modelos y proveedores: modelos de lenguaje, multimodales, especializados, open source, privados o ejecutados en infraestructura propia.</p>
                <p>La arquitectura puede determinar qué modelo utilizar según costo, velocidad, capacidad, privacidad, contexto, complejidad y requisitos del proceso. De esta manera, la IA se convierte en un componente intercambiable de la infraestructura.</p>

                <h2>20. Diseñar una arquitectura preparada para evolucionar</h2>
                <p>La tecnología cambia constantemente. Un sistema empresarial no debería quedar atado permanentemente a un modelo específico. GLYNNE diseña las integraciones de manera que el ecosistema pueda evolucionar.</p>
                <p>Si mañana aparece un modelo más eficiente, la arquitectura debería permitir incorporarlo. Si una empresa cambia de proveedor cloud, la infraestructura debería poder adaptarse. La arquitectura debe sobrevivir a la evolución tecnológica.</p>
              </section>

              <section id="control">
                <h2>21. Crear una capa de control para la IA</h2>
                <p>Aquí aparece uno de los conceptos centrales de GLYNNE. La inteligencia artificial puede ser extremadamente poderosa, pero una empresa necesita definir <strong>dónde puede operar esa inteligencia</strong>.</p>
                <p>GLYNNE puede funcionar como una capa de control entre los modelos de IA y los sistemas empresariales. La arquitectura determina qué puede ver la IA, qué puede consultar, qué herramientas puede utilizar, qué operaciones requieren aprobación y qué información nunca debe recibir.</p>

                <h2>22. La IA no reemplaza la arquitectura</h2>
                <p>Un error frecuente consiste en pensar: “Tenemos un modelo potente, entonces podemos automatizar el proceso.” Pero un modelo no sustituye una base de datos, una API, un sistema de permisos, un mecanismo de auditoría ni una infraestructura confiable.</p>
                <p>GLYNNE parte de otra idea: <strong>la IA debe vivir dentro del software, no sustituirlo.</strong></p>

                <h2>23. Migrar progresivamente, no destruir la operación</h2>
                <p>La transformación tecnológica no necesariamente debe realizarse de una sola vez. GLYNNE puede diseñar una estrategia de migración progresiva: Auditoría → Mapeo → Diseño arquitectónico → Infraestructura → Integración → Automatización determinística → Incorporación de IA → Supervisión → Optimización → Escalamiento.</p>
                <p>Esto permite que la empresa continúe operando mientras su infraestructura evoluciona.</p>

                <h2>24. Convertir procesos aislados en un ecosistema</h2>
                <p>El verdadero objetivo no es automatizar una tarea. Es conectar los procesos.</p>
                <span className="workflow-step">Ventas → CRM → Operaciones → Inventario → Logística → Facturación → Finanzas → Cliente</span>
                <p>GLYNNE puede construir la arquitectura que conecta estos dominios. La información deja de viajar manualmente. Los sistemas comienzan a comunicarse directamente.</p>

                <h2>25. Construir software alrededor del negocio</h2>
                <p>GLYNNE no parte de una aplicación genérica para luego adaptar la empresa a ella. Parte del problema empresarial y después diseña el software. El software se convierte en una representación tecnológica de la organización.</p>
              </section>

              <section id="conclusion">
                <h2>26. Del proceso humano al proceso inteligente</h2>
                <p>La transformación completa puede entenderse como una evolución en 6 etapas:</p>
                <ol>
                  <li><strong>Proceso manual:</strong> Personas ejecutan tareas.</li>
                  <li><strong>Proceso digital:</strong> Las tareas se trasladan a software.</li>
                  <li><strong>Proceso integrado:</strong> Los sistemas comienzan a comunicarse.</li>
                  <li><strong>Proceso automatizado:</strong> El software ejecuta operaciones automáticamente.</li>
                  <li><strong>Proceso inteligente:</strong> La IA interpreta información y participa en decisiones.</li>
                  <li><strong>Ecosistema inteligente:</strong> Software, datos, automatización e IA funcionan como una infraestructura coordinada.</li>
                </ol>

                <h2>27. La arquitectura como infraestructura natural para la IA</h2>
                <p>La inteligencia artificial no debería ser una herramienta aislada que los empleados utilizan ocasionalmente. Puede convertirse en una capacidad transversal de la infraestructura, integrada mediante arquitectura.</p>

                <h2>28. Un ecosistema diseñado para cada empresa</h2>
                <p>No existe una arquitectura universal capaz de resolver correctamente todos los problemas empresariales. Por eso GLYNNE diseña cada implementación a partir del negocio como punto de partida.</p>

                <h2>29. El resultado: una empresa capaz de operar como sistema</h2>
                <p>Cuando todas estas capas trabajan juntas, la empresa puede pasar de tener múltiples herramientas aisladas a tener un ecosistema tecnológico integrado. El objetivo es construir una empresa cuya infraestructura tecnológica esté preparada para utilizar inteligencia artificial de manera controlada, precisa y escalable.</p>

                <h2>30. GLYNNE: construir la infraestructura detrás de la inteligencia</h2>
                <p>GLYNNE entiende la inteligencia artificial como una capacidad que debe integrarse dentro de una arquitectura empresarial.</p>
                <p>El resultado no es simplemente un chatbot, una automatización aislada o una integración con un modelo de lenguaje. Es un <strong>ecosistema tecnológico diseñado alrededor de la empresa</strong>, donde software, datos, infraestructura, automatización e inteligencia artificial trabajan conjuntamente.</p>
                <p>Porque la verdadera transformación no ocurre cuando una empresa empieza a utilizar IA. Ocurre cuando su infraestructura está diseñada para <strong>hacer algo nuevo con ella</strong>.</p>
              </section>

              <h3 style={{ marginTop: '60px', fontSize: '24px', letterSpacing: '-0.02em', lineHeight: 1.4 }}>
                GLYNNE transforma procesos empresariales en sistemas tecnológicos capaces de operar, interpretar, ejecutar y evolucionar.
              </h3>
              <p style={{ fontSize: '20px', fontWeight: 500 }}>Audita. Indaga. Construye. Crea.</p>
              <p style={{ fontSize: '14px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', marginTop: '40px' }}>IA como infraestructura natural.</p>

            </article>
          </div>
        </div>
      </div>
      
      {/* Footer CTA */}
      <section style={{ 
        width: '100%', 
        paddingTop: '40px', 
        paddingBottom: '160px', 
        textAlign: 'center', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        backgroundColor: '#f5f5f7'
      }}>
        <h2 style={{ 
          fontSize: 'clamp(28px, 4vw, 40px)', 
          fontWeight: 300, 
          color: '#111111', 
          lineHeight: 1.4, 
          maxWidth: '900px', 
          margin: '0 auto 60px auto', 
          padding: '0 24px', 
          letterSpacing: '-0.01em' 
        }}>
          Transforma tu empresa en un ecosistema inteligente
        </h2>

        <Link href="/contact" style={{
          padding: '16px 32px',
          backgroundColor: '#111',
          color: '#fff',
          borderRadius: '30px',
          fontSize: '15px',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'transform 0.2s ease, opacity 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.opacity = '0.8';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.opacity = '1';
        }}>
          Inicia el Diseño Arquitectónico
        </Link>
      </section>

    </>
  );
}
