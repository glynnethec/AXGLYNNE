import { NextRequest, NextResponse } from 'next/server';
import { getBackendUrl } from '@/lib/backendFetch';

// Handle CORS Preflight (OPTIONS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-NVIDIA-API-KEY, X-Glynne-User-Token',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const backendBase = getBackendUrl();
    const targetUrl = `${backendBase}/api/v1/chat/completions`;

    // 1. Validar incoming Authorization Header (Client Sub-API Key)
    const authHeader = req.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        {
          error: {
            message: 'Missing or invalid Sub-API authorization key. Expected format: Bearer gly_sub_live_...',
            type: 'invalid_request_error',
            param: null,
            code: 'unauthorized_sub_api_key',
          },
        },
        {
          status: 401,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const clientApiKey = authHeader.replace('Bearer ', '').trim();
    if (!clientApiKey) {
      return NextResponse.json(
        { error: { message: 'Invalid API Key provided.', type: 'invalid_request_error' } },
        {
          status: 401,
          headers: { 'Access-Control-Allow-Origin': '*' },
        }
      );
    }

    const forwardHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': authHeader,
    };

    const nvidiaOverrideKey = req.headers.get('x-nvidia-api-key');
    if (nvidiaOverrideKey) {
      forwardHeaders['x-nvidia-api-key'] = nvidiaOverrideKey;
    }

    const glynneUserToken = req.headers.get('x-glynne-user-token');
    if (glynneUserToken) {
      forwardHeaders['x-glynne-user-token'] = glynneUserToken;
    }

    // 2. Extraer payload JSON
    const body = await req.json();

    // 3. Reenviar al Gateway centralizado de GLYNNE_LOGIC (FastAPI) donde se auditan tokens y cuotas
    const backendResponse = await fetch(targetUrl, {
      method: 'POST',
      headers: forwardHeaders,
      body: JSON.stringify(body),
    });

    const isStream = Boolean(body?.stream);

    // Manejar Streaming SSE transparente
    if (isStream && backendResponse.ok && backendResponse.body) {
      return new NextResponse(backendResponse.body as any, {
        status: backendResponse.status,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'X-Powered-By': 'AXGLYNNE Model Provider Engine (Proxy)',
          'Server': 'GLYNNE-AI-Gateway/1.0',
        },
      });
    }

    // Manejar Respuesta JSON
    const contentType = backendResponse.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await backendResponse.json();
      return NextResponse.json(data, {
        status: backendResponse.status,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-Powered-By': 'AXGLYNNE Model Provider Engine (Proxy)',
          'Server': 'GLYNNE-AI-Gateway/1.0',
        },
      });
    }

    const textData = await backendResponse.text();
    return new NextResponse(textData, {
      status: backendResponse.status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': contentType || 'text/plain',
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/v1/chat/completions proxy:', err);
    return NextResponse.json(
      {
        error: {
          message: err.message || 'GLYNNE AI Gateway Proxy unreachable.',
          type: 'glynne_gateway_exception',
        },
      },
      {
        status: 503,
        headers: { 'Access-Control-Allow-Origin': '*' },
      }
    );
  }
}
