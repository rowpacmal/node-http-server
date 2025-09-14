import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

export function initPath(path: string, defaultValue: string = ''): void {
  try {
    if (!existsSync(dirname(path))) {
      mkdirSync(dirname(path), { recursive: true });
    }

    if (!existsSync(path)) {
      writeFileSync(path, defaultValue);
    }
  } catch (err) {
    console.error('Failed to create file:', err);
  }
}
