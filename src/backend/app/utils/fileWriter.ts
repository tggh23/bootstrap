import { writeFile } from 'fs/promises';
import { resolve } from 'path';

const ROOT = '/Users/tgmac/Desktop/Repositories/bootstrap/src/backend/app';

const writeToFile = async (content: string, relativePath: string): Promise<void> => {
  const fullPath = resolve(ROOT, relativePath);
  await writeFile(fullPath, content, 'utf-8');
  console.log(`File written successfully to ${fullPath}`);
};

export default writeToFile;