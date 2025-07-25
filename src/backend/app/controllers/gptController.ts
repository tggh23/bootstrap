import GPTService from "../services/gptService.js";
import OpenAI from "openai";

export default class GPTController {
  private gptService: GPTService;

  constructor() {
    this.gptService = new GPTService();
  }

  async generateResponse(messages: any[]): Promise<OpenAI.Chat.ChatCompletionMessage> {
    try {
      const completion = await this.gptService.sendPrompt(messages);

      return completion.choices[0].message;
    } catch (error: any) {
      console.error("Controller Error:", error.message);
      throw new Error("Failed to generate response.");
    }
  }
}
