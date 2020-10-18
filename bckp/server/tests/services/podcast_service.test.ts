import { promisify } from 'util';
import * as ItunesService from '../../src/services/itunes_service';

import { getByID, PodcastProvider } from '../../src/services/podcast_service';
import { client } from '../../src/services/redis_service';

afterEach(() => promisify(client.flushall).call(client));
afterAll(() => promisify(client.quit).call(client));

// Get service/__mocks
jest.mock('../../src/services/itunes_service');
jest.mock('../../src/services/feed_service');

describe('Podcast Service', () => {
  describe('Success', () => {
    it('should return the correct Podcast data', () => {
      const promise = getByID('12321', ItunesService);

      return expect(promise)
        .resolves
        .toEqual({
          additionalInfo: {
              image: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg',
              startDate: '2020-06-21T17:00:00.000Z',
              summary: '<p>The Apple Events podcast is home to the latest keynote addresses. Listen to announcements of new products and services and browse the archive of past events to relive revolutionary moments in the history of personal technology.</p>',
            },
            artwork: {
              big: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg',
              medium: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2a-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/100x100bb.jpg',
              small: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/60x60bb.jpg',
            },
            author: {
              id: 706424103,
              name: 'Apple Inc.',
              url: 'https://podcasts.apple.com/us/artist/apple-inc/706424103?uo=4',
            },
            episodeCount: 4,
            feedURL: 'https://rss.art19.com/apple-events',
            genres: [
              'Technology',
              'Podcasts',
              'News',
              'Tech News',
            ],
            id: 1473854035,
            lastEpisodeDate: '2020-10-13T19:11:00Z',
            name: 'Apple Events',
            primaryGenre: 'Technology',
            viewURL: 'https://podcasts.apple.com/us/podcast/apple-events/id1473854035?uo=4',
        });
    });

    describe('Custom provider', () => {
      it('should call getProviderDataByID on custom provider', async () => {
        const mockedProvider: PodcastProvider = {
          getProviderDataByID: jest.fn(),
        };

        await getByID('12313', mockedProvider);

        return expect(mockedProvider.getProviderDataByID).toHaveBeenCalledWith('12313');
      });
    })
  });
});
