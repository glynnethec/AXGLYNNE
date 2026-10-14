import { useEffect, useRef } from 'react';
import { getAuthToken } from './supabaseClient';

export function getBackendUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
  if (envUrl && envUrl.trim().length > 0) {
    return envUrl.replace(/\/+$/, '');
  }
  return 'https://ax-zyxe.onrender.com';
}

export interface BackendFetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Cliente HTTP unificado hacia GLYNNE_LOGIC_2026.
 * - Inyecta automáticamente el token de autenticación Supabase JWT en el header Authorization.
 * - Soporta AbortSignal para cancelar procesos pendientes cuando el usuario cambia de página.
 */
export async function backendFetch(endpoint: string, options: BackendFetchOptions = {}): Promise<Response> {
  const backendBase = getBackendUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const fullUrl = cleanEndpoint.startsWith('http') ? cleanEndpoint : `${backendBase}${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});

  if (!options.skipAuth && !headers.has('Authorization')) {
    try {
      const token = await getAuthToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    } catch {
      // Continuar sin token (el backend responderá 401 si la ruta es privada)
    }
  }

  return fetch(fullUrl, {
    ...options,
    headers,
  });
}

/**
 * Hook para cancelar peticiones de red y procesos de fondo cuando la página se desmonta
 * o el usuario navega a otra ruta. Garantiza que ningún proceso continúe en segundo plano.
 */
export function usePageAbort() {
  const controllerRef = useRef<AbortController | null>(null);

  if (!controllerRef.current) {
    controllerRef.current = new AbortController();
  }

  useEffect(() => {
    const controller = controllerRef.current;
    return () => {
      if (controller) {
        try {
          controller.abort();
        } catch {
          // Silent
        }
      }
    };
  }, []);

  return controllerRef.current?.signal;
}

/**
 * Envia una señal de cancelación de emergencia al backend (keepalive) cuando se cierra la pestaña
 * o se navega fuera de la vista de entrenamiento.
 */
export async function cancelTrainingOnExit() {
  try {
    const backendBase = getBackendUrl();
    const token = await getAuthToken();
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // fetch con keepalive: true garantiza entrega incluso si la página ya se cerró
    fetch(`${backendBase}/api/train/reset`, {
      method: 'POST',
      headers,
      keepalive: true,
    }).catch(() => null);
  } catch {
    // Silent
  }
}
