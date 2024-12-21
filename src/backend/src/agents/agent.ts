// src/agents/BaseAgent.ts
import { queryChatGPT, Message } from '../services/gptService';

export class BaseAgent {
  private task: string;
  private knowledgeBase: string;
  private apiKey: string;

  constructor(task: string, knowledgeBase: string, apiKey: string) {
    this.task = task;
    this.knowledgeBase = knowledgeBase;
    this.apiKey = apiKey;
  }

  query(prompt: string): Promise<string> {
    const messages: Message[] = [
      { role: 'system', content: this.knowledgeBase },
      { role: 'user', content: prompt },
    ];

    return queryChatGPT(this.apiKey, messages);
  }

  getTask(): string {
    return this.task;
  }
}
