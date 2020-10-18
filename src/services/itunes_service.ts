import  ItunesSearch, { ItunesEntityPodcast, ItunesLookupType, ItunesProperties } from "node-itunes-search";
import { getOrSet } from "./redis-service";

export function extractID(url: string): string {
  try {
    const parsedURL = new URL(url);
    const matchData = parsedURL.pathname.match(/\/id([0-9]*)$/)

    if (matchData) {
      return matchData[2];
    } else {
      throw new Error('ID segment not found');
    }

  } catch(e: unknown) {
    console.error(e); 
    
    throw new Error(`Invalid URL`);
  }
}

interface ItunesData {
  name: string;
  author: {
    id?: number;
    name?: string;
  };
  genre?: string;
  url?: string;
}

function mapItunesPropertiesToPodcastData(result: ItunesProperties): ItunesData {
  return {
    name: result.collectionName,
    author: {
      id: result.artistId,
      name: result.artistName,
    },
    genre: result.primaryGenreName,
    url: result.collectionViewUrl
  };
}

export async function getByURL(podcastID: string): Promise<ItunesData | null> {
  const data = await getOrSet(podcastID, async () => {
    const data = await ItunesSearch
      .lookup({
        keys: [podcastID],
        keyType: ItunesLookupType.ID,
        entity: ItunesEntityPodcast.Podcast,
        limit: 1,
      });

    if (data.resultCount == 0) {
      return null;
    }

    return JSON.stringify(
      mapItunesPropertiesToPodcastData(data.results[0]),
    );
  });

  return data && JSON.parse(data);
}
