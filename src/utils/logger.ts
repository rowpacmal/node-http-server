import { appendFile, mkdir } from 'fs';
import { join, dirname } from 'path';

const LOG_FILE = join(__dirname, '..', 'logs', 'server.log');
mkdir(dirname(LOG_FILE), { recursive: true }, (err) => {
  if (err) {
    console.error('Failed to create log directory:', err);
  }
});

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
