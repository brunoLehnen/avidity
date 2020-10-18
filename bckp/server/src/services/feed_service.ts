import Parser from 'rss-parser';

import { InvalidInputError } from '../errors/invalid_input_error';
import { ResourceNotFoundError } from '../errors/resource_not_found_error';
import { getOrSet } from './redis_service';

interface FeedData {
  startDate?: string;
  image?: string;
  summary?: string;
}

async function getParserData(url: string) {
  try {
    new URL(url);
    const parser = new Parser();
    const parserData = await parser.parseURL(url);
    return parserData;
  } catch(e) {
    if (e.type) {
      switch (e.type) {
        case 'ERR_INVALID_URL':
          throw new InvalidInputError('Feed URL is not valid');
        case 'ENOTFOUND':
        case 'ECONNREFUSED':
          throw new ResourceNotFoundError('Feed not found');
      }
    }

    throw new InvalidInputError('Invalid Feed');
  }
}

export async function getFeedByURL(url: string): Promise<FeedData> {
  const data = await getOrSet(url, async (): Promise<string> => {
    const parserData = await getParserData(url);
    const firstEpisode = parserData.items?.pop();

    return JSON.stringify({
      startDate: firstEpisode?.isoDate,
      summary: parserData.description,
      image: parserData.image?.url,
    });
  });


  return data && JSON.parse(data);
}
