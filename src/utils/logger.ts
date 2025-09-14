import { appendFile } from 'fs';
import { join } from 'path';
import { initPath } from './init-path';

const LOG_FILE = join(__dirname, '..', 'logs', 'server.log');
initPath(LOG_FILE);

export function log(message: string): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(logMessage.trim());

  appendFile(LOG_FILE, logMessage, (err) => {
    if (err) {
      console.error('Failed to write to log:', err);
    }
  });
}
