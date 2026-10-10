import { NextResponse } from 'next/server';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET() {
  const models = [
    {
      id: 'qwen-2.5-coder-32b',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'qwen-2.5-coder-32b',
      parent: null,
      description: 'Alibaba Cloud Qwen 2.5 Coder 32B Instruct Model',
      context_length: 131072,
    },
    {
      id: 'deepseek-r1-reasoning',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'deepseek-r1-reasoning',
      parent: null,
      description: 'DeepSeek R1 Reasoning MoE Model (671B Params)',
      context_length: 65536,
    },
    {
      id: 'deepseek-v3',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'deepseek-v3',
      parent: null,
      description: 'DeepSeek V3 671B Mixture-of-Experts Language Model',
      context_length: 65536,
    },
    {
      id: 'llama-3.3-70b-instruct',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'llama-3.3-70b-instruct',
      parent: null,
      description: 'Meta Llama 3.3 70B High Precision Instruct',
      context_length: 131072,
    },
    {
      id: 'nvidia-nemotron-70b',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'nvidia-nemotron-70b',
      parent: null,
      description: 'NVIDIA Nemotron 70B Accelerated Inference Model',
      context_length: 131072,
    },
    {
      id: 'mistral-nemo-12b',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'mistral-nemo-12b',
      parent: null,
      description: 'Mistral NeMo 12B Ultra Low Latency Model',
      context_length: 131072,
    },
    {
      id: 'phi-4-14b-instruct',
      object: 'model',
      created: 1735689600,
      owned_by: 'glynne-ai',
      permission: [],
      root: 'phi-4-14b-instruct',
      parent: null,
      description: 'Microsoft Phi-4 14B High Logic & Math Model',
      context_length: 65536,
    }
  ];

  return NextResponse.json(
    {
      object: 'list',
      data: models,
    },
    {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'X-Powered-By': 'AXGLYNNE Model Provider Engine',
        'Server': 'GLYNNE-AI-Gateway/1.0',
      },
    }
  );
}
