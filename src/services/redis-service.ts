import { createClient, RedisClient } from 'redis';
import { promisify } from 'util';

const client: RedisClient = createClient(6379);

export function set(key: string, val: any): Promise<void> {
  return promisify(this.client.set)
    .apply(this.client, [key, val]);
}

export function get(key: string): Promise<any> {
  return promisify(this.client.get)
    .call(this.client, key);
}

export function hSet(key: string, val: any): Promise<void> {
  return promisify(this.client.hset)
    .apply(this.client, [key, val]);
}

export function hGet(key: string): Promise<void> {
  return promisify(this.client.hget)
  .call(this.client, key);
}

export function sAdd(key: string, val: any): Promise<void> {
  return promisify(this.client.sadd)
    .apply(this.client, [key, val]);
}

export function sMembers(key: string): Promise<void> {
  return promisify(this.client.smembers)
    .call(this.client, key);
}
