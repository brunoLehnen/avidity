import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const client: RedisClient = createClient(6379);

export function set(key: string, val: any, expire: number = null): Promise<void> {
  const baseArgs = [key, val];
  const args = (expire !== null) ? [...baseArgs, 'EX', expire] : baseArgs;

  return promisify(client.set).apply(client, args);
}

export function get(key: string): Promise<any> {
  return promisify(client.get).call(client, key);
}

export function mget(...keys: any[]): Promise<any[]> {
  return promisify(client.mget).call(client, keys);
}

export async function getOrSet(key: string, setFn: () => Promise<any>, expire: number = null): Promise<any> {
  const originalData = await get(key);

  if (originalData) {
     return originalData;
  }

  const newData = await setFn();
  set(key, newData, expire);
  return newData;
}
