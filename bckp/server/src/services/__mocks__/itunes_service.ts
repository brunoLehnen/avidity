function itunesData() {
  return {
    id: 1473854035,
    name: 'Apple Events',
    episodeCount: 4,
    lastEpisodeDate: '2020-10-13T19:11:00Z',
    primaryGenre: 'Technology',
    genres: [
      'Technology',
      'Podcasts',
      'News',
      'Tech News'
    ],
    viewURL: 'https://podcasts.apple.com/us/podcast/apple-events/id1473854035?uo=4',
    feedURL: 'https://rss.art19.com/apple-events',
    author: {
      id: 706424103,
      name: 'Apple Inc.',
      url: 'https://podcasts.apple.com/us/artist/apple-inc/706424103?uo=4'
    },
    artwork: {
      small: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/60x60bb.jpg',
      medium: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2a-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/100x100bb.jpg',
      big: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts114/v4/ca/0a/d2/ca0ad2aa-f19e-bc55-14e1-6043f4f6d448/mza_637589258185441623.jpeg/600x600bb.jpg'
    },
  };
}

export const getProviderDataByID = jest.fn().mockResolvedValue(itunesData());