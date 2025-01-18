export default class Env {
    static get(key: string): string {
      const value = process.env[key];
      if (!value) {
        throw new Error(`Environment variable "${key}" is not defined`);
      }
      return value;
    }
  
    static getOptional(key: string, defaultValue?: string): string | undefined {
      return process.env[key] || defaultValue;
    }
  }
  