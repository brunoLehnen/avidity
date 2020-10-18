export declare interface PodcastData {
  id?: number;
  name: string;
  episodeCount?: number;
  genres: string[];
  feedURL?: string;
  viewURL?: string;
  lastEpisodeDate?: string;
  primaryGenre?: string;
  author: {
    url?: string;
    name?: string;
    id?: number;
  };
  artwork: {
    small?: string;
    medium?: string;
    big?: string;
  };
}

export declare interface ResponsePodcastData extends PodcastData {
  additionalInfo?: {
    startDate?: string;
    image?: string;
    summary?: string;
  },
}
