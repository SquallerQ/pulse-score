import dotenv from 'dotenv';
import { resolve } from 'node:path';

dotenv.config({
  path: resolve(__dirname, '../../.env'),
});

function getRequiredEnv(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} is not configured`);
  }

  return value;
}

export const env = {
  jwtSecret: getRequiredEnv('JWT_SECRET'),
};
