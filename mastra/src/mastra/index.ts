import { Mastra } from '@mastra/core';
import { assistantAgent } from './agents/assistantAgent';
import { handsonworkflow } from './workflows/workflow';


export const mastra = new Mastra({
  agents: {assistantAgent},
  workflows: { handsonworkflow },
});

