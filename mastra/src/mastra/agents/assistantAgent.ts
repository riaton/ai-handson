import { Agent } from "@mastra/core/agent";
import { bedrock } from "@ai-sdk/amazon-bedrock";


//エージェント定義
export const assistantAgent = new Agent({
  name: "assistant",
  instructions: "あなたは親切で経験豊富なAIアシスタントです。ユーザの質問に対して、わかりやすく丁寧に回答してください。",
  model: bedrock("us.amazon.nova-premier-v1:0")
});