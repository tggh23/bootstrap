import OpenAI from "openai";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const envPath = path.resolve(__dirname, '../../../../.env');
dotenv.config({ path: envPath });

export default class GPTService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI({
        apiKey: process.env.GPT_API_KEY,
    });
  }

  async sendPrompt(messages: any[]): Promise<OpenAI.Chat.ChatCompletion> {
    try {
      const completion = await this.openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: messages
    });

      // console.log(completion.choices[0].message);
      return completion;
    } catch (error: any) {
      console.error('GPT API Error:', error.response?.data || error.message);
      throw new Error('Failed to communicate with GPT API');
    }
  }
}
