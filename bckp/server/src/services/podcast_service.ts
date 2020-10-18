import { PodcastData , ResponsePodcastData } from 'api_types';
import * as ItunesService from '../services/itunes_service';
import * as FeedService from '../services/feed_service';

export interface PodcastProvider {
  getProviderDataByID(podcastID: string): Promise<PodcastData>
}

export async function getByID(podcastID: string, provider: PodcastProvider = ItunesService): Promise<ResponsePodcastData> {
  const podcastData = await provider.getProviderDataByID(podcastID);

  if (podcastData?.feedURL) {
    const rssData = await FeedService.getFeedByURL(podcastData.feedURL);

    if (rssData) {
      return {
        ...podcastData,
        additionalInfo: {
          startDate: rssData.startDate,
          image: rssData.image,
          summary: rssData.summary,
        }
      }
    }
  }

  return podcastData;
}
