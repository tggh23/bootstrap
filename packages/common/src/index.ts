// Export shared utilities, types, and services
export { default as openai } from 'openai';
export { default as axios } from 'axios';
export { config as dotenv } from 'dotenv';

// You can add shared types, utilities, and constants here
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export const API_ENDPOINTS = {
  GPT: 'https://api.openai.com/v1/chat/completions',
} as const;

// Export any shared utility functions
export function formatResponse<T>(data: T, success = true, message?: string): ApiResponse<T> {
  return { data, success, message };
}
