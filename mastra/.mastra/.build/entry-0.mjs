import { Mastra } from '@mastra/core';
import { Agent } from '@mastra/core/agent';
import { bedrock } from '@ai-sdk/amazon-bedrock';

const assistantAgent = new Agent({
  name: "assistant",
  instructions: "\u3042\u306A\u305F\u306F\u89AA\u5207\u3067\u7D4C\u9A13\u8C4A\u5BCC\u306AAI\u30A2\u30B7\u30B9\u30BF\u30F3\u30C8\u3067\u3059\u3002\u30E6\u30FC\u30B6\u306E\u8CEA\u554F\u306B\u5BFE\u3057\u3066\u3001\u308F\u304B\u308A\u3084\u3059\u304F\u4E01\u5BE7\u306B\u56DE\u7B54\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  model: bedrock("us.amazon.nova-premier-v1:0")
});

const mastra = new Mastra({
  agents: {
    assistantAgent
  }
});

export { mastra };
