import Parser from 'rss-parser';

import { promisify } from 'util';
import { InvalidInputError } from '../../src/errors/invalid_input_error';
import { ResourceNotFoundError } from '../../src/errors/resource_not_found_error';

import * as FeedService from '../../src/services/feed_service';
import { client as redisClient } from '../../src/services/redis_service';

jest.mock('rss-parser');

const feedData = {
  image: { 
    url: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg'
  },
  items: [{ isoDate: '2020-10-13T19:11:00Z' }],
  description: 'This is a summary about a podcast',
};

afterEach(() => promisify(redisClient.flushall).call(redisClient));
afterAll(() => promisify(redisClient.quit).call(redisClient));

describe('Feed Service', () => {
  describe('Success', () => {
    it('should return the correct RSS feed', () => {
     jest.spyOn(Parser.prototype, 'parseURL').mockResolvedValue(feedData)
      const promise = FeedService.getFeedByURL('http://test.com');

      return expect(promise)
        .resolves.toEqual({
          startDate: '2020-10-13T19:11:00Z',
          image: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg',
          summary: 'This is a summary about a podcast',
        });
    });
  });

  describe('Failure', () => {
    describe('not found', () => {
      it('should throw ResourceNotFoundError when ENOTFOUND is thrown', () => {
        jest.spyOn(Parser.prototype, 'parseURL')
          .mockImplementation(() => {
            interface ErrorWithType extends Error { type?: string } 

            const error: ErrorWithType = new Error('not found');
            error.type = 'ENOTFOUND';
            
            throw error;
          })

        const promise = FeedService.getFeedByURL('http://notfound.com');

        return expect(promise).rejects.toThrowError(ResourceNotFoundError)
      });
    });

    describe('invalid url', () => {
      it('shoud throw', () => {
        const promise = FeedService.getFeedByURL('lasdaslkjd');

        return expect(promise).rejects.toThrowError(InvalidInputError)
      });
    });
  });
});
