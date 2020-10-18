import { ResponsePodcastData } from 'api_types';

export interface PodcastState {
  loading: boolean;
  url?: string;
  errors: { message: string } | null;
  podcastData?: ResponsePodcastData
}

export interface ApplicationState {
  podcast: PodcastState;
}
