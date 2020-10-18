import supertest from 'supertest';

import { promisify } from 'util';
import { server } from '../../../src/server/server';
import { client as redisClient } from '../../../src/services/redis_service';

const app = supertest(server);
afterEach(() => promisify(redisClient.flushall).call(redisClient));
afterAll(() =>{
  return Promise.all([
    server.close(),
    promisify(redisClient.quit).call(redisClient)
  ]);
});


describe('GET /podcasts/:id', () => {
  describe('Success', () => {
    it('should respond with 200 status code', async () => {
      const response = await app.get('/podcasts/1330329512');
      expect(response.status).toEqual(200);
    });

    it('should respond with correct podcast', async () => {
      const response = await app.get('/podcasts/1330329512');
      expect(response.body.name).toEqual('CoRecursive with Adam Gordon Bell');
    });
  });

  describe('Error', () => {
    it('should respond with 404 for not found podcast', async () => {
      const response = await app.get('/podcasts/123123');
      expect(response.status).toEqual(404);
    });

    it('should respond with 422 for invalid podcast id', async () => {
      const response = await app.get('/podcasts/inv123valid123');
      expect(response.status).toEqual(422);
    });
  });
});
