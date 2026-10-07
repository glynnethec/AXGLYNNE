import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://axglynne.com';

  const publicRoutes = [
    '',
    '/precios',
    '/integraciones',
    '/integraciones/whatsapp',
    '/integraciones/supabase',
    '/integraciones/twilio',
    '/integraciones/hubspot',
    '/integraciones/python-sdk',
    '/integraciones/rest-api',
    '/docs',
    '/comparar',
    '/caracteristicas',
    '/novedades',
    '/status',
    '/About',
    '/Solutions',
    '/Industries',
    '/industrias/atencion-al-cliente',
    '/industrias/salud-y-clinicas',
    '/industrias/e-commerce',
    '/industrias/finanzas',
    '/industrias/educacion',
    '/ia_vailable',
    '/modelos/qwen-2-5',
    '/modelos/llama-3-2',
    '/modelos/phi-3-5',
    '/modelos/ax-voice-v1',
    '/Methodology',
    '/Blog',
    '/blog/que-es-qlora-fine-tuning',
    '/blog/latencia-agentes-de-voz',
    '/blog/ia-privada-empresarial',
    '/contact',
    '/faq',
    '/Segurity',
    '/cookie-policy',
    '/privacy-policy',
    '/security-data-protection',
    '/servex_espesification',
    '/terms-of-service',
    '/login'
  ];

  return publicRoutes.map((route) => {
    let priority = 0.7;
    if (route === '') priority = 1.0;
    else if (['/precios', '/integraciones', '/docs', '/Solutions', '/ia_vailable'].includes(route)) priority = 0.9;
    else if (['/comparar', '/caracteristicas', '/novedades'].includes(route)) priority = 0.8;
    else if (route.includes('/policy') || route.includes('terms')) priority = 0.3;

    return {
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'daily' : 'weekly',
      priority
    };
  });
}
