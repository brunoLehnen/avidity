import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const PORT = (process.env.REDIS_PORT !== undefined) ? parseInt(process.env.REDIS_PORT, 10) : 6379;

export const client: RedisClient = createClient(PORT);

export async function set(key: string, val: string, expire: number | null = null): Promise<boolean> {
  if (expire !== null) {
    return !!(await promisify(client.setex).call(client, key, expire, val));
  }

  return !!(await promisify(client.set).call(client, key, val));
}

export function get(key: string): Promise<string | null> {
  return promisify(client.get).call(client, key);
}

export async function getOrSet(key: string, setFn: () => Promise<string | null>, expire: number | null = null): Promise<string | null> {
  const originalData = await get(key);

  if (originalData) {
     return originalData;
  }

  const newData = await setFn();

  if (newData) {
    set(key, newData, expire);
  }
  
  return newData || null;
}
