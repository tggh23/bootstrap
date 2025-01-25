
import GPTController from '../controllers/gptController.js';
import OpenAI from 'openai';


export default class Agent {
    private gptController;
    private id: string;
//   private role: string;
//   private state: 'idle' | 'working' | 'blocked';
    private logs: string[];
//   private inputQueue: any[];
//   private outputQueue: any[];
//   private dependencies: Agent[];

    constructor(id: string,) {
    this.gptController = new GPTController();
    this.id = id;
    // this.role = role;
    // this.state = 'idle';
    this.logs = [];
    // this.inputQueue = [];
    // this.outputQueue = [];
    // this.dependencies = [];
    }
  


  async sendPrompt(messages: any[]): Promise<OpenAI.Chat.ChatCompletionMessage> {
    console.log("Sending prompt: ", JSON.stringify(messages));
    const response = this.gptController.generateResponse(messages);
    return response;
  }

  sendMessage(agent: Agent, message: string): void {
    this.log(`Communicating with ${agent.id}: ${message}`);
    agent.receiveMessage(this, message);
  }

  receiveMessage(sender: Agent, message: string): void {
    this.log(`Received message from ${sender.id}: ${message}`);
  }

  protected log(action: string): void {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${action}`;
    this.logs.push(logEntry);
    console.log(logEntry);
  }
}
