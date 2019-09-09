import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const client: RedisClient = createClient(6379);

export function set(key: string, val: any): Promise<void> {
  return promisify(client.set).apply(client, [key, val]);
}

export function get(key: string): Promise<any> {
  return promisify(client.get).call(client, key);
}

export function mget(...keys: (string|number)[]): Promise<any[]> {
  return promisify(client.mget).call(client, keys);
}

export async function getOrSet(key: string, setFn: () => Promise<string>): Promise<any> {
  const originalData: any = await get(key);

  if (originalData) return originalData;

  const newData: any = await setFn();
  set(key, newData);
  return newData;
}