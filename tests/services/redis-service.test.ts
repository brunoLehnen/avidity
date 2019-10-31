import { createClient } from 'redis';
import * as RedisService from '../../src/services/redis-service';

const PORT = 6379;

interface IMockedObject {
  [key: string]: jest.MockedFunction<any>;
}

function resetRedisMockObject(): void {
  const client: { [key: string]: jest.MockedFunction<any> } = createClient(6379);

  [client.set, client.get, client.mget]
    .forEach((f) => f.mockClear());
}

function mockRedis(): IMockedObject {
  function mockedGetCallbackFunction() {
    return jest.fn((...args: any[]) => {
      const [keys, cb] = args.slice(0, 2);
      const mockedValues: Map<string, string> = new Map([
        ['test', 'value'],
        ['test2', 'value2'],
      ]);

      const returnValue = (!Array.isArray(keys))
        ? mockedValues.get(keys) || null
        : keys
          .filter((k) => mockedValues.has(k))
          .map((v) => mockedValues.get(v));

      cb(null, returnValue);
    });
  }

  function mockedSetCallbackFunction(): jest.MockedFunction<any> {
    return jest.fn((...args: any[]) => {
      const [key, value] = args.slice(0, 2);
      const cb = args.pop();
      cb(null, { [key]: value });
    });
  }

  const clientMock: IMockedObject = Object.freeze({
    set: mockedSetCallbackFunction(),
    get: mockedGetCallbackFunction(),
    mget: mockedGetCallbackFunction(),
  });

  return { createClient: jest.fn(() => clientMock) };
}

jest.mock('redis', mockRedis);

describe('Redis Service', () => {
  const client = createClient(6379);

  afterEach(() => {
    resetRedisMockObject();
  });

  test('create client and listen to the correct port', () => {
    expect(createClient).toHaveBeenCalledWith(PORT);
  });

  test('set wrapper should return promise', () => {
    const baseArgs = ['test', 'test', 12];
    const setPromise = RedisService.set.apply(null, baseArgs);
    expect(client.set).toHaveBeenCalledWith('test', 'test', 'EX', 12, expect.anything());
    expect(setPromise).resolves.toStrictEqual({ test: 'test' });
  });

  test('set wrapper should not set expiration time if no exp. argument is passed', () => {
    const baseArgs = ['test', 'test'];
    const setPromise = RedisService.set.apply(null, baseArgs);
    expect(client.set).toHaveBeenCalledWith('test', 'test', expect.anything());
    expect(setPromise).resolves.toStrictEqual({ test: 'test' });
  });

  test('get wrapper should resolve to value if key exists', () => {
    const key = 'test';
    const getPromise = RedisService.get(key);
    expect(client.get).toHaveBeenCalledWith(key, expect.anything());
    expect(getPromise).resolves.toBe('value');
  });

  test('get wrapper should resolve to null if key does not exists', () => {
    const key = 'nonExistingKey';
    const getPromise = RedisService.get(key);
    expect(client.get).toHaveBeenCalledWith(key, expect.anything());
    expect(getPromise).resolves.toBe(null);
  });

  test('mget wrapper should resolve to values if key exists', () => {
    const keys = ['test', 'test2'];
    const mgetPromise = RedisService.mget(...keys);
    expect(client.mget).toHaveBeenCalledWith(keys, expect.anything());
    expect(mgetPromise).resolves.toStrictEqual(['value', 'value2']);
  });

  test('mget wrapper should resolve to empty array if key does not exist', () => {
    const keys = ['nonExisting0', 'nonExisting1'];
    const mgetPromise = RedisService.mget(...keys);
    expect(client.mget).toHaveBeenCalledWith(keys, expect.anything());
    expect(mgetPromise).resolves.toStrictEqual([]);
  });

  test('getOrSet should resolve to value if key exists without calling set', async () => {
    const cb = jest.fn(() => Promise.resolve('value'));
    const key = 'test';
    const getOrSetPromise = await RedisService.getOrSet(key, cb, 12);
    expect(client.set).not.toHaveBeenCalled();
    expect(client.get).toHaveBeenCalledWith(key, expect.anything());
    expect(getOrSetPromise).toBe('value');
  });

  test('getOrSet should set key if does not exist and resolve to value', async () => {
    const newValue = 'newValue';
    const cb = jest.fn(() => Promise.resolve(newValue));
    const key = 'nonExistingKey';
    const getOrSetPromise = await RedisService.getOrSet(key, cb, 12);
    expect(client.set).toHaveBeenCalledWith(key, newValue, 'EX', 12, expect.anything());
    expect(client.get).toHaveBeenCalledWith(key, expect.anything());
    expect(getOrSetPromise).toBe(newValue);
  });

  test('getOrSet should not set expire time if no argument is passed', async () => {
    const newValue = 'newValue';
    const cb = jest.fn(() => Promise.resolve(newValue));
    const key = 'nonExistingKey';
    await RedisService.getOrSet(key, cb);
    expect(client.set).toHaveBeenCalledWith(key, newValue, expect.anything());
  });
});
