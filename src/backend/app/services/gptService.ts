import { GPTConfig, GPTPrompt, GPTResponse } from '../types/gpt.js';
import OpenAI from "openai";

export default class GPTService {
  constructor(private config: GPTConfig) {
    const openai = new OpenAI({
        apiKey: process.env.GPT_API_KEY,
    });
  }

  async sendPrompt(prompts: GPTPrompt[]): Promise<GPTResponse> {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
                role: "user",
                content: prompts,
            },
        ],
    });

      return completion.choices[0].message;
    } catch (error: any) {
      console.error('GPT API Error:', error.response?.data || error.message);
      throw new Error('Failed to communicate with GPT API');
    }
  }
}
