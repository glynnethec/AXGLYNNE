'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FiFileText, FiTarget, FiLayers, FiCpu, 
  FiShield, FiBriefcase, FiUsers, FiActivity, 
  FiTrendingUp, FiCheckCircle 
} from 'react-icons/fi';

const CATEGORIES = ['La Premisa', 'Sectores', 'Filosofía GLYNNE'];

const SECTIONS = [
  // La Premisa
  { id: 'intro', title: 'La Premisa', category: 'La Premisa', icon: <FiTarget /> },
  
  // Sectores
  { id: 'finanzas', title: '01. Finanzas', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'legal', title: '02. Abogacía y Jurídico', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'salud', title: '03. Salud', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'manufactura', title: '04. Manufactura', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'logistica', title: '05. Logística', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'retail', title: '06. Retail y E-commerce', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'seguros', title: '07. Seguros', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'inmobiliario', title: '08. Inmobiliario', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'educacion', title: '09. Educación', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'rrhh', title: '10. Recursos Humanos', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'ventas', title: '11. Ventas y Comercial', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'marketing', title: '12. Marketing', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'energia', title: '13. Energía y Utilities', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'telecom', title: '14. Telecomunicaciones', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'software', title: '15. Tecnología y Software', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'agro', title: '16. Agroindustria', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'industrial', title: '17. Industrial', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'banca', title: '18. Banca', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'gobierno', title: '19. Gobierno', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'turismo', title: '20. Turismo', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'automocion', title: '21. Automoción', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'farma', title: '22. Farmacéutica', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'outsourcing', title: '23. Outsourcing', category: 'Sectores', icon: <FiBriefcase /> },
  { id: 'support', title: '24. Customer Service', category: 'Sectores', icon: <FiBriefcase /> },
  
  // Filosofía
  { id: 'filosofia-1', title: '25. La Aplicación Real', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-2', title: '26. ¿Qué automatizar?', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-3', title: '27. Adaptabilidad', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-4', title: '28. IA donde tiene sentido', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-5', title: '29. Arquitectura específica', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-6', title: '30. Evolución inteligente', category: 'Filosofía GLYNNE', icon: <FiCpu /> },
  { id: 'filosofia-7', title: '31. Conclusión', category: 'Filosofía GLYNNE', icon: <FiCheckCircle /> }
];

export default function B2BProcessManifesto() {
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
        .methodology-article h1 {
          font-size: 36px;
          font-weight: 500;
          color: #111;
          letter-spacing: -0.02em;
          margin: 0 0 40px 0;
          padding-bottom: 20px;
          border-bottom: 2px solid rgba(0,0,0,0.1);
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
          line-height: 1.7;
        }
        .methodology-article ul {
          margin-bottom: 24px;
          padding-left: 20px;
        }
        .methodology-article li {
          margin-bottom: 8px;
          line-height: 1.6;
        }
        .methodology-article strong {
          font-weight: 600;
          color: #111;
        }
        .methodology-article .workflow-step {
          display: block;
          margin: 16px 0;
          font-family: 'SF Mono', monospace;
          background: rgba(0,0,0,0.03);
          padding: 12px 20px;
          border-radius: 8px;
          font-size: 14px;
          color: #333;
          border: 1px solid rgba(0,0,0,0.05);
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
              width: isSidebarOpen ? '320px' : '64px',
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
                {CATEGORIES.map(category => (
                  <div key={category} style={{ width: '100%', marginBottom: isSidebarOpen ? '16px' : '0' }}>
                    {isSidebarOpen && (
                      <div style={{ 
                        fontSize: '11px', 
                        fontWeight: 600, 
                        color: '#86868b', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.1em',
                        padding: '0 12px 8px 12px',
                        borderBottom: '1px solid rgba(0,0,0,0.05)',
                        marginBottom: '8px'
                      }}>
                        {category}
                      </div>
                    )}
                    {SECTIONS.filter(s => s.category === category).map((section) => (
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
                          color: activeSection === section.id ? '#111' : '#86868b',
                          fontWeight: activeSection === section.id ? 600 : 400,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                          textAlign: 'left',
                          marginBottom: !isSidebarOpen ? '8px' : '2px',
                          position: 'relative'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.color = '#111';
                          if (!isSidebarOpen) {
                            e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
                          }
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.color = activeSection === section.id ? '#111' : '#86868b';
                          if (!isSidebarOpen) {
                            e.currentTarget.style.background = 'transparent';
                          }
                        }}
                      >
                        {/* Dot indicator for collapsed state */}
                        {!isSidebarOpen && activeSection === section.id && (
                          <div style={{
                            position: 'absolute',
                            left: '4px',
                            width: '4px',
                            height: '4px',
                            borderRadius: '50%',
                            backgroundColor: '#111'
                          }} />
                        )}
                        <span style={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          fontSize: '16px',
                          width: '24px',
                          color: activeSection === section.id ? '#111' : '#86868b' 
                        }}>
                          {section.icon}
                        </span>
                        <span style={{ 
                          opacity: isSidebarOpen ? 1 : 0, 
                          width: isSidebarOpen ? 'auto' : 0,
                          overflow: 'hidden',
                          marginLeft: isSidebarOpen ? '12px' : '0',
                          whiteSpace: 'nowrap',
                          transition: 'all 0.3s ease'
                        }}>
                          {section.title}
                        </span>
                      </button>
                    ))}
                  </div>
                ))}
          </aside>

          {/* Right Content Area */}
          <div style={{
            flex: '1',
            maxWidth: '800px',
            margin: '0 auto',
            width: '100%',
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '60px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            border: '1px solid rgba(0,0,0,0.04)'
          }}>
            <article className="methodology-article" style={{ fontSize: '17px', lineHeight: 1.7, color: '#1d1d1f', fontWeight: 300 }}>
              
              <div id="intro">
                <h1>Inteligencia artificial aplicada a industrias reales</h1>
                
                <p>La inteligencia artificial no tiene el mismo propósito en todas las industrias.</p>
                <p>Una empresa financiera no enfrenta los mismos problemas que un despacho jurídico. Una compañía logística no funciona como una organización de salud. Una fábrica no necesita la misma arquitectura que una empresa de servicios profesionales.</p>
                <p>Por eso GLYNNE no comienza con una tecnología.</p>
                <p><strong>Comienza con una industria, un proceso y un problema concreto.</strong></p>
                <p>El objetivo es identificar dónde existe una operación que consume tiempo, requiere grandes cantidades de información, depende de decisiones repetitivas o necesita conectar múltiples sistemas y, a partir de ahí, construir una infraestructura tecnológica capaz de automatizarla.</p>
                
                <span className="workflow-step">
                  La IA puede interpretar información.<br/>
                  El software puede ejecutar reglas.<br/>
                  Los sistemas pueden almacenar y consultar datos.<br/>
                  Los agentes pueden utilizar herramientas.
                </span>
                
                <p>Y GLYNNE puede conectar todos estos componentes dentro de una arquitectura diseñada específicamente para cada organización.</p>
              </div>

              <div id="finanzas">
                <h2>01. Finanzas</h2>
                
                <h3>El problema</h3>
                <p>Las organizaciones financieras trabajan con enormes cantidades de información estructurada y no estructurada. Facturas, extractos, comprobantes, contratos, transacciones, solicitudes, reportes, correos electrónicos y documentos deben ser procesados constantemente.</p>
                <p>Una parte importante de estas operaciones todavía depende de personas que revisan información, comparan datos, clasifican documentos, verifican condiciones y posteriormente introducen resultados en diferentes sistemas. Esto genera operaciones repetitivas y múltiples puntos donde pueden producirse errores.</p>
                
                <h3>¿Dónde puede intervenir GLYNNE?</h3>
                <p>GLYNNE puede construir una infraestructura que conecte:</p>
                
                <span className="workflow-step">
                  Documentos → sistemas financieros → reglas → IA → automatización → auditoría
                </span>
                
                <p>Por ejemplo, una factura puede ingresar automáticamente al ecosistema. El sistema identifica el documento, extrae la información, la estructura, la compara con los registros existentes, verifica reglas, consulta el ERP y detecta inconsistencias.</p>
                
                <p>Y, dependiendo de las condiciones establecidas, puede:</p>
                <ul>
                  <li>registrar la información;</li>
                  <li>solicitar aprobación;</li>
                  <li>clasificar el gasto;</li>
                  <li>generar una alerta;</li>
                  <li>enviar información a otro sistema;</li>
                  <li>o detener el proceso.</li>
                </ul>

                <h3>¿Dónde aporta la IA?</h3>
                <p>La IA puede utilizarse para comprender información que tradicionalmente requeriría lectura humana. Puede ayudar a interpretar documentos, clasificar transacciones, extraer información, detectar patrones, resumir reportes, analizar solicitudes, identificar anomalías para revisión y generar explicaciones o reportes.</p>
                <p>Pero las reglas financieras críticas permanecen en software.</p>
                
                <span className="workflow-step">
                  La IA interpreta.<br/>
                  El sistema valida.<br/>
                  La infraestructura controla.
                </span>

                <h3>¿Por qué es una buena aplicación?</h3>
                <p>Porque las finanzas combinan tres elementos particularmente adecuados para una arquitectura inteligente:</p>
                <p><strong>gran volumen de información + procesos repetitivos + reglas claramente definibles.</strong></p>
                <p>Eso permite utilizar IA donde existe ambigüedad e interpretación, mientras el software mantiene el control sobre las operaciones determinísticas.</p>
              </div>

              <div id="legal">
                <h2>02. Abogacía y servicios jurídicos</h2>
                
                <h3>El problema</h3>
                <p>Los despachos jurídicos trabajan principalmente con información. Contratos, demandas, expedientes, jurisprudencia, comunicaciones, documentos corporativos, normativas y diferentes versiones de archivos pueden convertirse en grandes volúmenes de información difíciles de gestionar manualmente.</p>
                <p>El problema no es únicamente encontrar documentos. Es comprenderlos dentro de un contexto.</p>

                <h3>¿Cómo lo haría GLYNNE?</h3>
                <p>GLYNNE puede construir un ecosistema jurídico donde los documentos sean procesados y estructurados. Por ejemplo:</p>
                
                <span className="workflow-step">
                  Documento → Extracción → Clasificación → Indexación → Búsqueda contextual → Análisis → Revisión profesional
                </span>
                
                <p>El sistema puede identificar: partes, fechas, obligaciones, cláusulas, referencias, riesgos potenciales para revisión, inconsistencias, relaciones entre documentos y elementos relevantes según el proceso configurado.</p>

                <h3>¿Dónde interviene la IA?</h3>
                <p>La IA puede actuar como una capa de análisis documental. Puede ayudar a: resumir documentos, localizar información, comparar versiones, clasificar expedientes, extraer cláusulas, preparar borradores, organizar información y responder preguntas utilizando fuentes autorizadas.</p>
                <p>Pero GLYNNE puede diseñar la arquitectura para que el modelo no tenga acceso indiscriminado a todos los expedientes. Un abogado puede acceder a determinados casos. Un agente puede acceder únicamente a la documentación necesaria. Un proceso puede consultar únicamente una fuente autorizada. Esto permite que la IA funcione dentro de límites definidos.</p>

                <h3>¿Por qué es una buena aplicación?</h3>
                <p>Porque el trabajo jurídico tiene un enorme componente de:</p>
                <p><strong>lectura + análisis + búsqueda + comparación + organización de información.</strong></p>
                <p>La IA puede reducir el trabajo repetitivo de procesamiento de información y permitir que los profesionales concentren más tiempo en el análisis jurídico y la toma de decisiones que requiere criterio profesional. La IA no sustituye el criterio jurídico. <strong>Amplía la capacidad tecnológica alrededor de él.</strong></p>
              </div>

              <div id="salud">
                <h2>03. Salud</h2>
                
                <h3>El problema</h3>
                <p>La salud genera cantidades enormes de información. Historias, documentos administrativos, órdenes, resultados, comunicaciones, citas y diferentes sistemas pueden formar ecosistemas complejos. La dificultad está en integrar información sin comprometer la privacidad, la seguridad ni la responsabilidad profesional.</p>

                <h3>¿Cómo puede intervenir GLYNNE?</h3>
                <p>GLYNNE puede diseñar capas específicas para gestión administrativa, clasificación documental, programación, procesamiento de solicitudes, organización de información, automatización de comunicaciones, gestión de procesos internos y análisis operativo.</p>
                
                <span className="workflow-step">
                  Solicitud de paciente → Clasificación → Identificación del proceso → Consulta de información autorizada → Automatización → Respuesta o escalamiento
                </span>

                <h3>¿Dónde aporta la IA?</h3>
                <p>Puede ayudar a interpretar lenguaje, clasificar documentos, organizar información y asistir determinados procesos administrativos.</p>
                <p>En escenarios clínicos, cualquier uso de IA debe incorporar controles específicos, validación profesional, privacidad, seguridad y cumplimiento de las normas aplicables. GLYNNE puede diseñar la arquitectura para separar claramente:</p>
                
                <span className="workflow-step">
                  información clínica<br/>
                  (de)<br/>
                  procesos administrativos<br/>
                  (y)<br/>
                  capacidades de IA
                </span>

                <h3>¿Por qué es una buena aplicación?</h3>
                <p>Porque existen numerosos procesos administrativos repetitivos que requieren procesamiento de información y coordinación entre sistemas. La oportunidad no consiste en permitir que una IA tome decisiones médicas sin control. Consiste en construir infraestructura que permita <strong>automatizar lo automatizable y mantener las decisiones sensibles bajo supervisión profesional.</strong></p>
              </div>

              <div id="manufactura">
                <h2>04. Manufactura</h2>
                
                <h3>El problema</h3>
                <p>Una fábrica puede contener múltiples sistemas funcionando simultáneamente: ERP, inventario, producción, mantenimiento, calidad, proveedores y logística. Cuando estos sistemas no están correctamente conectados, gran parte de la información debe ser revisada y transferida manualmente.</p>

                <h3>¿Cómo lo haría GLYNNE?</h3>
                <p>GLYNNE puede construir una arquitectura que conecte:</p>
                
                <span className="workflow-step">
                  Producción ↔ Inventario ↔ Mantenimiento ↔ Calidad ↔ ERP ↔ Logística
                </span>
                
                <p>Los eventos de un sistema pueden generar automáticamente acciones en otro. Por ejemplo: una orden de producción cambia de estado → el sistema actualiza inventario → se detecta una necesidad de material → se consulta disponibilidad → se genera una alerta o solicitud → el proceso continúa automáticamente según las reglas configuradas.</p>

                <h3>¿Dónde aporta la IA?</h3>
                <p>La IA puede ayudar a analizar incidencias, reportes, datos históricos, patrones operativos, documentación técnica, solicitudes y anomalías. También puede apoyar procesos predictivos cuando existen datos suficientes y modelos apropiados.</p>

                <h3>¿Por qué es una buena aplicación?</h3>
                <p>Porque la manufactura genera procesos estructurados, eventos constantes y grandes cantidades de datos. Esto permite combinar <strong>automatización determinística + análisis inteligente + sistemas conectados.</strong></p>
              </div>

              <div id="logistica">
                <h2>05. Logística y transporte</h2>
                <h3>El problema</h3>
                <p>La logística es una cadena de decisiones: Pedidos, inventario, rutas, vehículos, proveedores, almacenes, tiempos, incidencias y clientes. Un pequeño retraso puede afectar múltiples etapas posteriores.</p>

                <h3>¿Cómo lo haría GLYNNE?</h3>
                <p>GLYNNE puede crear un sistema que conecte todas las etapas:</p>
                
                <span className="workflow-step">
                  Pedido recibido → Validación → Inventario → Asignación → Transporte → Seguimiento → Entrega → Confirmación
                </span>
                
                <p>Cada evento puede actualizar automáticamente el siguiente componente.</p>

                <h3>¿Dónde interviene la IA?</h3>
                <p>Puede analizar incidencias, solicitudes de clientes, patrones históricos, información logística, clasificación de pedidos, prioridades, documentación y diferentes señales operativas.</p>
                <p>Un agente podría recibir una incidencia y utilizar herramientas para consultar el estado de un pedido, verificar información y generar la acción correspondiente. El agente no necesita acceder directamente a toda la infraestructura. Puede tener herramientas específicas.</p>

                <h3>¿Por qué es una buena aplicación?</h3>
                <p>Porque logística significa coordinar múltiples sistemas y decisiones. La combinación de automatización, integración y análisis inteligente puede reducir la cantidad de intervención manual necesaria para coordinar la operación.</p>
              </div>

              <div id="retail">
                <h2>06. Retail y comercio electrónico</h2>
                <h3>El problema</h3>
                <p>Un comercio necesita coordinar clientes, productos, inventario, pedidos, pagos, logística y atención. Cuando estos sistemas están separados, los equipos terminan actuando como intermediarios entre plataformas.</p>

                <h3>¿Cómo lo haría GLYNNE?</h3>
                <p>GLYNNE puede conectar:</p>
                
                <span className="workflow-step">
                  Cliente → E-commerce → Inventario → Pedidos → Logística → Facturación → Soporte
                </span>
                <p>La arquitectura permite que un evento desencadene automáticamente otros procesos.</p>

                <h3>IA aplicada</h3>
                <p>La IA puede ayudar con clasificación de solicitudes, atención automatizada, análisis de comportamiento, recomendaciones, procesamiento de comentarios, análisis de productos, clasificación de incidencias, generación de contenido y asistencia interna.</p>
                
                <h3>¿Por qué?</h3>
                <p>Porque el comercio genera enormes cantidades de interacciones y operaciones repetitivas. La IA puede encargarse de interpretar gran parte de esa información mientras el software controla las transacciones.</p>
              </div>

              <div id="seguros">
                <h2>07. Seguros</h2>
                <h3>El problema</h3>
                <p>Las aseguradoras procesan grandes volúmenes de documentos, solicitudes, pólizas, comunicaciones y datos. Muchos procesos requieren revisar múltiples fuentes antes de avanzar.</p>

                <h3>GLYNNE puede construir</h3>
                <p>Un sistema donde:</p>
                <span className="workflow-step">
                  Solicitud → Documentos → Extracción → Validación → Reglas → Análisis → Escalamiento o automatización
                </span>
                <p>La IA puede interpretar documentación y detectar información relevante. El motor de software puede aplicar las reglas correspondientes.</p>
                
                <h3>¿Por qué?</h3>
                <p>Porque el sector combina grandes volúmenes de información con procesos altamente estructurados. Es un escenario donde la separación entre IA y reglas de negocio resulta especialmente importante.</p>
              </div>

              <div id="inmobiliario">
                <h2>08. Inmobiliario y construcción</h2>
                <h3>El problema</h3>
                <p>Construcción e inmobiliario combinan contratos, planos, presupuestos, proveedores, materiales, clientes, cronogramas y documentación. La información suele distribuirse entre múltiples actores.</p>
                
                <h3>¿Cómo lo haría GLYNNE?</h3>
                <p>GLYNNE puede crear una plataforma que conecte:</p>
                <span className="workflow-step">
                  Proyecto → documentación → proveedores → presupuesto → materiales → cronograma → avances → incidencias → clientes
                </span>
                <p>La IA puede interpretar documentos, resumir avances, clasificar incidencias y ayudar a localizar información. El software controla estados, permisos, presupuestos y procesos.</p>
              </div>

              <div id="educacion">
                <h2>09. Educación</h2>
                <h3>El problema</h3>
                <p>Las instituciones educativas gestionan estudiantes, docentes, documentos, evaluaciones, comunicaciones, horarios y procesos administrativos. Muchos de estos procesos son repetitivos.</p>

                <h3>GLYNNE puede automatizar</h3>
                <p>Solicitudes, comunicaciones, clasificación documental, procesos administrativos, generación de reportes, gestión de información, programación y asistencia interna.</p>
                <p>La IA puede interpretar solicitudes y ayudar a organizar información. La institución mantiene control sobre los datos y las decisiones.</p>
              </div>

              <div id="rrhh">
                <h2>10. Recursos humanos</h2>
                <h3>El problema</h3>
                <p>RR. HH. recibe constantemente solicitudes, documentos y preguntas. Vacaciones, contratación, incapacidades, documentación, beneficios, procesos internos, consultas.</p>

                <h3>GLYNNE puede construir</h3>
                <p>Un ecosistema donde el empleado pueda iniciar una solicitud y el sistema determine automáticamente:</p>
                <span className="workflow-step">
                  qué proceso corresponde → qué información necesita → qué sistema debe consultar → qué reglas debe aplicar → qué acción puede ejecutar → si requiere aprobación humana
                </span>

                <h3>IA aplicada</h3>
                <p>Puede interpretar solicitudes en lenguaje natural. Por ejemplo: <em>"Necesito saber cuántos días de vacaciones tengo disponibles."</em> El agente puede utilizar una herramienta específica para consultar esa información, sin necesitar acceder a toda la base de datos de empleados.</p>
              </div>

              <div id="ventas">
                <h2>11. Ventas y desarrollo comercial</h2>
                <h3>El problema</h3>
                <p>Los equipos comerciales reciben información desde múltiples canales: Correos, WhatsApp, CRM, Formularios, Reuniones, Documentos, Propuestas. El reto consiste en transformar esa información en acciones.</p>

                <h3>GLYNNE puede construir</h3>
                <span className="workflow-step">
                  Lead → Clasificación → Enriquecimiento → CRM → Prioridad → Seguimiento → Propuesta → Conversión
                </span>
                <p>La IA puede analizar conversaciones y solicitudes. El software actualiza automáticamente el CRM. Un agente puede generar una propuesta utilizando información autorizada. Otro puede preparar un seguimiento.</p>
              </div>

              <div id="marketing">
                <h2>12. Marketing</h2>
                <p>Marketing produce y analiza enormes cantidades de información: campañas, clientes, resultados, contenido, audiencias, interacciones, métricas.</p>
                <p>GLYNNE puede crear una infraestructura que integre las diferentes fuentes y permita automatizar clasificación, análisis, reportes, generación de contenido, segmentación, seguimiento y procesamiento de información. La IA analiza y el software controla publicación y métricas.</p>
              </div>

              <div id="energia">
                <h2>13. Energía y utilities</h2>
                <p>Las empresas energéticas gestionan infraestructura física, consumo, mantenimiento, clientes y grandes cantidades de datos.</p>
                <span className="workflow-step">
                  Sensores → datos → sistemas operativos → analítica → alertas → acciones
                </span>
                <p>La IA puede analizar patrones y ayudar a detectar anomalías. Los sistemas determinísticos mantienen el control de las operaciones críticas.</p>
              </div>

              <div id="telecom">
                <h2>14. Telecomunicaciones</h2>
                <p>Las telecomunicaciones operan enormes infraestructuras y atienden grandes cantidades de solicitudes. Una pequeña incidencia puede generar miles de interacciones.</p>
                <p>GLYNNE puede automatizar clasificación de incidencias, soporte, análisis de solicitudes, gestión de tickets, diagnóstico asistido, documentación y comunicación. Un agente puede interpretar una solicitud y utilizar herramientas para consultar sistemas internos.</p>
              </div>

              <div id="software">
                <h2>15. Tecnología y empresas de software</h2>
                <p>Incluso las empresas tecnológicas tienen procesos manuales: Soporte, QA, DevOps, Documentación, Ventas, Onboarding, Análisis, Incidencias.</p>
                <p>GLYNNE puede convertirse en una capa de automatización interna:</p>
                <span className="workflow-step">
                  GitHub → tickets → documentación → monitorización → bases de datos → agentes → automatización
                </span>
                <p>La IA puede ayudar a analizar incidencias, documentación y código, mientras las herramientas controlan qué operaciones puede ejecutar.</p>
              </div>

              <div id="agro">
                <h2>16. Recursos naturales y agroindustria</h2>
                <p>La agroindustria combina información climática, producción, inventarios, logística, proveedores y operaciones físicas.</p>
                <p>GLYNNE puede integrar información de producción, inventarios, logística, sensores y sistemas administrativos. La IA puede ayudar a interpretar datos y detectar patrones. La infraestructura puede convertir esos análisis en alertas y flujos operativos.</p>
              </div>

              <div id="industrial">
                <h2>17. Energía, petróleo y sectores industriales</h2>
                <p>Las operaciones industriales generan grandes cantidades de datos y requieren procedimientos estrictos. La automatización debe diseñarse con especial cuidado porque algunas operaciones pueden tener consecuencias físicas o económicas importantes.</p>
                <p>GLYNNE puede intervenir en análisis, documentación, mantenimiento, reportes y monitoreo, donde la IA ayuda a interpretar información pero los sistemas determinísticos mantienen el control de operaciones críticas.</p>
              </div>

              <div id="banca">
                <h2>18. Banca y servicios financieros</h2>
                <p>Aunque comparte elementos con finanzas corporativas, la banca tiene una característica adicional: <strong>escala.</strong> Miles o millones de operaciones pueden ejecutarse constantemente.</p>
                <p>GLYNNE puede diseñar capas de automatización, clasificación, atención, detección de anomalías y orquestación. La escala hace que incluso pequeñas mejoras en procesos repetitivos puedan representar grandes diferencias operativas, todo bajo controles de seguridad y cumplimiento sumamente rigurosos.</p>
              </div>

              <div id="gobierno">
                <h2>19. Gobierno y administración</h2>
                <p>Las organizaciones públicas manejan enormes cantidades de solicitudes, documentos y procedimientos. GLYNNE puede ayudar a construir sistemas para gestión documental, automatización administrativa, y seguimiento público. La IA interpreta solicitudes, la infraestructura determina qué información puede utilizarse.</p>
              </div>

              <div id="turismo">
                <h2>20. Hotelería y turismo</h2>
                <p>La industria turística combina reservas, clientes, habitaciones, proveedores, pagos y comunicaciones.</p>
                <p>GLYNNE puede conectar estos sistemas. Un agente puede interpretar una solicitud del cliente. El sistema consulta disponibilidad. Las reglas determinan qué puede ofrecerse. La plataforma registra la operación. Y el cliente recibe una respuesta inmediata y adaptada.</p>
              </div>

              <div id="automocion">
                <h2>21. Automoción</h2>
                <p>En automoción existen procesos de producción, inventario, mantenimiento, ventas, servicio, garantías, proveedores y logística. GLYNNE puede construir una arquitectura que conecte estos procesos. La IA analiza documentación e incidencias, el software controla inventarios y reglas.</p>
              </div>

              <div id="farma">
                <h2>22. Farmacéutica</h2>
                <p>Trabaja con documentación, investigación, producción, distribución y procesos regulatorios. GLYNNE puede utilizarse para trazabilidad, gestión documental y automatización interna, siempre cumpliendo marcos regulatorios (compliance).</p>
              </div>

              <div id="outsourcing">
                <h2>23. Recursos humanos y outsourcing</h2>
                <p>Las compañías que gestionan grandes cantidades de empleados o procesos tercerizados pueden tener cientos de operaciones repetitivas.</p>
                <span className="workflow-step">
                  Empleado → solicitud → validación → reglas → sistema → aprobación → ejecución → trazabilidad
                </span>
                <p>La escala convierte procesos aparentemente pequeños en grandes cargas operativas.</p>
              </div>

              <div id="support">
                <h2>24. Centros de atención y customer service</h2>
                <h3>El problema</h3>
                <p>Los equipos de soporte reciben constantemente preguntas repetitivas. Pero no todas las solicitudes son iguales. Algunas necesitan información, otras necesitan una operación, otras requieren un humano.</p>
                
                <h3>GLYNNE puede diferenciar cada escenario</h3>
                <ul>
                  <li><strong>informativa</strong> → responder.</li>
                  <li><strong>operativa</strong> → utilizar una herramienta.</li>
                  <li><strong>compleja</strong> → recopilar información y escalar.</li>
                  <li><strong>sensible</strong> → detener automatización y solicitar intervención.</li>
                </ul>
                <p>La IA interpreta la intención. El software controla la operación. El humano interviene cuando corresponde. Permite pasar de un simple chatbot a un sistema capaz de <strong>entender y operar dentro de una arquitectura empresarial</strong>.</p>
              </div>

              <div id="filosofia-1">
                <h2>25. La verdadera aplicación de GLYNNE no es una industria</h2>
                <p>Aunque GLYNNE puede aplicarse a múltiples sectores, existe una característica común. No se trata de encontrar industrias donde “la IA esté de moda”.</p>
                <p>Se trata de encontrar procesos donde exista una combinación de:</p>
                <span className="workflow-step">
                  información * reglas * repetición * sistemas * decisiones * acciones
                </span>
                <p>Cuando estos elementos existen, aparece una oportunidad para construir una arquitectura inteligente.</p>
              </div>

              <div id="filosofia-2">
                <h2>26. ¿Cómo determina GLYNNE qué automatizar?</h2>
                <p>GLYNNE puede clasificar cada proceso según diferentes características:</p>
                <ul>
                  <li><strong>Nivel 01 — Automatización determinística:</strong> Procesos completamente definidos. Se automatizan mediante software.</li>
                  <li><strong>Nivel 02 — Automatización asistida:</strong> El sistema ejecuta gran parte del proceso, pero requiere intervención humana.</li>
                  <li><strong>Nivel 03 — Inteligencia artificial:</strong> La IA interpreta información, clasifica, analiza o recomienda.</li>
                  <li><strong>Nivel 04 — Agentes:</strong> La IA puede utilizar herramientas para ejecutar acciones autorizadas.</li>
                  <li><strong>Nivel 05 — Sistemas autónomos controlados:</strong> Diferentes componentes trabajan coordinadamente con reglas, permisos, supervisión y escalamiento.</li>
                </ul>
                <p>No todos los procesos deben llegar al nivel cinco. La arquitectura correcta es la que utiliza <strong>el nivel adecuado para cada problema.</strong></p>
              </div>

              <div id="filosofia-3">
                <h2>27. ¿Por qué GLYNNE puede adaptarse a diferentes industrias?</h2>
                <p>Porque GLYNNE no vende una única automatización. Construye infraestructura. La misma filosofía puede aplicarse a diferentes organizaciones:</p>
                
                <span className="workflow-step">
                  Auditar → Comprender → Diseñar → Construir → Integrar → Automatizar → Incorporar IA → Controlar → Medir → Evolucionar
                </span>
                
                <p>Lo que cambia es la arquitectura específica. En finanzas serán diferentes los datos. En derecho los documentos. En logística los eventos. Pero el principio arquitectónico permanece.</p>
              </div>

              <div id="filosofia-4">
                <h2>28. El objetivo no es poner IA en todas partes</h2>
                <p>GLYNNE no busca colocar inteligencia artificial en cada proceso simplemente porque sea posible. Busca determinar <strong>dónde tiene sentido</strong>.</p>
                <ul>
                  <li>Si una operación puede resolverse con una regla: <strong>software.</strong></li>
                  <li>Si necesita interpretar lenguaje: <strong>IA.</strong></li>
                  <li>Si necesita consultar información: <strong>herramienta.</strong></li>
                  <li>Si necesita una decisión sensible: <strong>supervisión humana.</strong></li>
                  <li>Si necesita coordinación: <strong>orquestación.</strong></li>
                  <li>Si necesita datos: <strong>infraestructura.</strong></li>
                  <li>Si necesita trazabilidad: <strong>observabilidad.</strong></li>
                </ul>
                <p>Esta separación permite construir sistemas más eficientes, controlables y mantenibles.</p>
              </div>

              <div id="filosofia-5">
                <h2>29. Una arquitectura diferente para cada problema</h2>
                <p>Una empresa no necesita simplemente “una IA”. Necesita una arquitectura. Puede requerir:</p>
                <ul>
                  <li><strong>Frontend</strong> para interactuar con el sistema.</li>
                  <li><strong>Backend</strong> para ejecutar la lógica.</li>
                  <li><strong>Database</strong> para gestionar información.</li>
                  <li><strong>APIs</strong> para conectar sistemas.</li>
                  <li><strong>Microservicios</strong> para separar capacidades.</li>
                  <li><strong>AI Layer</strong> para interpretar información.</li>
                  <li><strong>Agent Layer</strong> para ejecutar herramientas.</li>
                  <li><strong>Security Layer</strong> para controlar acceso.</li>
                  <li><strong>Integration Layer</strong> para conectar infraestructura.</li>
                  <li><strong>Observability Layer</strong> para registrar y analizar.</li>
                </ul>
                <p>GLYNNE combina estas capas según las necesidades reales de cada empresa.</p>
              </div>

              <div id="filosofia-6">
                <h2>30. De industria tradicional a ecosistema inteligente</h2>
                <p>La transformación puede representarse de manera sencilla:</p>
                
                <h3>Empresa tradicional</h3>
                <span className="workflow-step">
                  Personas → Herramientas aisladas → Procesos manuales → Información dispersa → Decisiones → Acciones
                </span>
                
                <h3>Empresa evolucionada con GLYNNE</h3>
                <span className="workflow-step">
                  Personas → Ecosistema tecnológico → Datos estructurados → Software → Automatización → IA → Agentes → Herramientas → Reglas → Supervisión → Trazabilidad → Evolución
                </span>
                
                <p>La diferencia no está únicamente en utilizar inteligencia artificial. Está en construir una infraestructura donde esa inteligencia pueda operar de manera controlada.</p>
              </div>

              <div id="filosofia-7">
                <h2>31. GLYNNE no automatiza empresas. Automatiza lo que hace funcionar a una empresa.</h2>
                <p>Cada organización tiene procesos que pueden evolucionar. Algunos son administrativos. Otros financieros. Otros operativos. GLYNNE estudia cada uno de ellos y determina cómo convertirlos en sistemas.</p>
                <p>Porque la automatización real no consiste en agregar un botón que diga: <strong>“Usar IA”.</strong></p>
                <p>Consiste en rediseñar la manera en que la información entra, se procesa, se valida, se transforma y finalmente produce una acción. Ese es el punto donde la inteligencia artificial deja de ser una herramienta aislada. Y empieza a convertirse en infraestructura.</p>
                
                <div style={{
                  marginTop: '80px',
                  padding: '40px',
                  backgroundColor: '#f5f5f7',
                  borderRadius: '16px',
                  border: '1px solid rgba(0,0,0,0.05)'
                }}>
                  <h2 style={{ margin: '0 0 24px 0', border: 'none', padding: 0 }}>AXGLYNNE</h2>
                  <p style={{ fontWeight: 500, fontSize: '18px' }}>
                    Entendemos la industria.<br/>
                    Auditamos el proceso.<br/>
                    Diseñamos la arquitectura.<br/>
                    Construimos la infraestructura.<br/>
                    Integramos los sistemas.<br/>
                    Automatizamos las operaciones.<br/>
                    Incorporamos inteligencia.<br/>
                    Controlamos cada interacción.<br/>
                    Y construimos el ecosistema que la empresa necesita para evolucionar.
                  </p>
                  <p>Porque cada industria tiene problemas diferentes. Pero todas tienen algo en común: <strong>procesos que pueden funcionar mejor.</strong></p>
                  <p>GLYNNE convierte esos procesos en sistemas tecnológicos capaces de comprender información, ejecutar operaciones, conectar infraestructura y utilizar inteligencia artificial de manera controlada.</p>
                  <p style={{ fontSize: '20px', fontWeight: 500, color: '#111', marginTop: '32px' }}>
                    No construimos una IA para tu empresa.<br/>
                    Construimos la infraestructura donde la IA puede trabajar para tu empresa.
                  </p>
                </div>
              </div>

            </article>
          </div>
          
        </div>
      </div>
    </>
  );
}
