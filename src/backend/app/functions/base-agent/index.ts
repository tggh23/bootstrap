import { APIGatewayEvent } from 'aws-lambda';
import GPTService from '../../services/gptService.js';

const gptService = new GPTService();

export async function main(event: APIGatewayEvent): Promise<{ body: string; statusCode: number }> {
  console.log('region 👉', process.env.REGION);
  console.log('availability zones 👉', process.env.AVAILABILITY_ZONES);

  const messages = [{ role: 'user', content: 'Hello, GPT!' }];
  const response = await gptService.sendPrompt(messages);

  return {
    body: JSON.stringify({ message: 'SUCCESS 🎉', response }),
    statusCode: 200,
  };
}
