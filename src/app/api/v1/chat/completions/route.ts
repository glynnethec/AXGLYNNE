import { NextRequest, NextResponse } from 'next/server';

// Mapping of GLYNNE public model IDs to build.nvidia.com / NVIDIA NIM model IDs
const MODEL_MAPPING: Record<string, string> = {
  'llama-3.2-11b-vision': 'meta/llama-3.2-11b-vision-instruct',
  'llama-3.2-90b-vision': 'meta/llama-3.2-90b-vision-instruct',
  'deepseek-coder-6.7b': 'deepseek-ai/deepseek-coder-6.7b-instruct',
  'deepseek-v4-flash': 'deepseek-ai/deepseek-v4.1-flash',
  'nvidia-nemotron-70b': 'nvidia/llama-3.1-nemotron-70b-instruct',
  'mistral-nemo-12b': 'nv-mistralai/mistral-nemo-12b-instruct',
  'phi-3.5-moe': 'microsoft/phi-3.5-moe-instruct',
};


const NVIDIA_NIM_BASE_URL = 'https://integrate.api.nvidia.com/v1';

// Handle CORS Preflight (OPTIONS)
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    // 1. Validate incoming Authorization Header (Client Sub-API Key)
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
        { status: 401 }
      );
    }

    const clientApiKey = authHeader.replace('Bearer ', '').trim();
    // Validate Sub-API key prefix or format if desired (e.g., must start with gly_sub_ live_ or be valid)
    if (!clientApiKey) {
      return NextResponse.json(
        { error: { message: 'Invalid API Key provided.', type: 'invalid_request_error' } },
        { status: 401 }
      );
    }

    // 2. Extract Server NVIDIA API Key from Environment or Header Override
    const headerOverrideKey = req.headers.get('x-nvidia-api-key');
    const nvidiaApiKey = headerOverrideKey || process.env.NVIDIA_API_KEY || process.env.NEXT_PUBLIC_NVIDIA_API_KEY;

    if (!nvidiaApiKey) {
      return NextResponse.json(
        {
          error: {
            message: 'GLYNNE AI Provider gateway misconfigured. Server NVIDIA_API_KEY is missing.',
            type: 'server_configuration_error',
            code: 'missing_upstream_provider_credentials',
          },
        },
        { status: 500 }
      );
    }

    // 3. Parse Request Payload
    const body = await req.json();
    const { model, messages, temperature = 0.7, max_tokens = 2048, stream = false, top_p } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: { message: 'Array of "messages" is required.', type: 'invalid_request_error' } },
        { status: 400 }
      );
    }

    // Resolve mapped model or fallback to passed model if already in NVIDIA format
    const targetNvidiaModel = MODEL_MAPPING[model] || model || 'meta/llama-3.3-70b-instruct';

    // 4. Construct Payload for build.nvidia.com
    const nvidiaPayload: Record<string, unknown> = {
      model: targetNvidiaModel,
      messages,
      temperature,
      max_tokens,
      stream,
    };

    if (top_p !== undefined) {
      nvidiaPayload.top_p = top_p;
    }

    // 5. Proxy Request to NVIDIA NIM API
    const nvidiaResponse = await fetch(`${NVIDIA_NIM_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${nvidiaApiKey}`,
        'Accept': stream ? 'text/event-stream' : 'application/json',
      },
      body: JSON.stringify(nvidiaPayload),
    });

    if (!nvidiaResponse.ok) {
      const errorText = await nvidiaResponse.text();
      let parsedError;
      try {
        parsedError = JSON.parse(errorText);
      } catch {
        parsedError = { message: errorText };
      }

      return NextResponse.json(
        {
          error: {
            message: parsedError?.detail || parsedError?.message || 'Upstream GLYNNE AI Provider error',
            type: 'glynne_provider_error',
            code: nvidiaResponse.status,
          },
        },
        { status: nvidiaResponse.status }
      );
    }

    // 6. Handle Streaming SSE (Stream = true)
    if (stream) {
      const nvidiaBody = nvidiaResponse.body;
      if (!nvidiaBody) {
        return NextResponse.json(
          { error: { message: 'Failed to receive stream from AI provider stream pipeline.' } },
          { status: 500 }
        );
      }

      const transformStream = new TransformStream({
        transform(chunk, controller) {
          // Pass-through text event stream chunks intact
          controller.enqueue(chunk);
        },
      });

      const responseStream = nvidiaBody.pipeThrough(transformStream);

      return new NextResponse(responseStream, {
        status: 200,
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache, no-transform',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'X-Powered-By': 'AXGLYNNE Model Provider Engine',
          'Server': 'GLYNNE-AI-Gateway/1.0',
        },
      });
    }

    // 7. Handle Non-Streaming JSON Response
    const data = await nvidiaResponse.json();

    // White-label response: replace model name with user's requested model or GLYNNE branding
    if (data && data.model) {
      data.model = model || data.model;
    }
    if (data && !data.owned_by) {
      data.owned_by = 'axglynne-ai-provider';
    }

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Powered-By': 'AXGLYNNE Model Provider Engine',
        'Server': 'GLYNNE-AI-Gateway/1.0',
      },
    });
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Error in /api/v1/chat/completions:', err);
    return NextResponse.json(
      {
        error: {
          message: err.message || 'Internal GLYNNE AI Gateway Server Error',
          type: 'glynne_gateway_exception',
        },
      },
      { status: 500 }
    );
  }
}
